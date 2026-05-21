import os
import re

# Domain and Target Configuration
TARGET_DOMAIN = 'sawan289.br.com'
MAIN_DOMAIN_URL = 'https://www.ufathai.biz/'
REGISTRATION_LINK = 'https://lobby.ufathai.biz/register?agentId=ufotx9a&marketingLinkId=9ae18eec-4119-45c9-be3f-3b43c6b32074&openExternalBrowser=1'

# Base directory for the landing page
ROOT_DIR = os.path.join(os.getcwd(), TARGET_DOMAIN)

def fix_content(content):
    # --- 1. Global Authority Push (SEO Consolidation) ---
    # Fix Canonical
    content = re.sub(r'<link rel="canonical" href="[^"]+"', f'<link rel="canonical" href="{MAIN_DOMAIN_URL}"', content)
    # Fix Open Graph URL
    content = re.sub(r'<meta property="og:url" content="[^"]+"', f'<meta property="og:url" content="{MAIN_DOMAIN_URL}"', content)
    # Fix JSON-LD Schema (sawan289.beer or other domain)
    content = content.replace('https://sawan289.beer/', MAIN_DOMAIN_URL)
    content = content.replace('https:\\/\\/sawan289.beer\\/', MAIN_DOMAIN_URL.replace('/', '\\/'))
    
    # --- 2. WP Brain Purge (Site Sanitization) ---
    # Remove wp-json links
    content = re.sub(r'<link rel=\'https://api\.w\.org/\' href=\'[^#]+\'', '', content)
    # Remove XML-RPC manifest
    content = re.sub(r'<link rel="EditURI" type="application/rsd\+xml" title="RSD" href="[^"]+" />', '', content)
    content = re.sub(r'<link rel="wlwmanifest" type="application/wlwmanifest\+xml" href="[^"]+" />', '', content)
    # Remove Feed links
    content = re.sub(r'<link rel="alternate" type="application/rss\+xml" [^>]+>', '', content)
    
    # --- 4. Register/Login (Link Standardization) ---
    # Replace any lobby.ufathai.biz links with the specific one provided by user (ensuring marketingLinkId is correct)
    lobby_pattern = r'href=["\']https?://lobby\.ufathai\.biz/[^"\']*["\']'
    content = re.sub(lobby_pattern, f'href="{REGISTRATION_LINK}"', content)
    
    # Replacement for other register/login/signup patterns that might point to sky1x or old domains
    other_reg_patterns = [
        r'href=["\']https?://play\.sky1x\.com/[^"\']*["\']',
        r'href=["\']https?://sawan289\.beer/register[^"\']*["\']',
        r'href=["\']https?://sawan289\.beer/login[^"\']*["\']'
    ]
    for pattern in other_reg_patterns:
        content = re.sub(pattern, f'href="{REGISTRATION_LINK}"', content)
        
    return content

def process_files():
    if not os.path.exists(ROOT_DIR):
        print(f"❌ Error: Root directory not found: {ROOT_DIR}")
        return

    print(f"[*] Starting White Glove Audit for {TARGET_DOMAIN}...")
    
    count = 0
    for root, dirs, files in os.walk(ROOT_DIR):
        for file in files:
            # Files with extensions and slug-based files (no extension)
            if file.endswith('.html') or '.' not in file:
                file_path = os.path.join(root, file)
                try:
                    # Only process if it's a text-based file
                    with open(file_path, 'rb') as f:
                        header = f.read(1024)
                        if b'\x00' in header: # Skip binary files
                            continue
                            
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    
                    new_content = fix_content(content)
                    
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        # print(f"  [OK] Fixed: {os.path.relpath(file_path, ROOT_DIR)}")
                        count += 1
                except Exception as e:
                    print(f"  [Error] processing {file}: {e}")

    # --- Sanitization: Remove dangerous legacy files ---
    for bad_file in ['xmlrpc.php', 'sitemap_index.xml']:
        target = os.path.join(ROOT_DIR, bad_file)
        if os.path.exists(target):
            os.remove(target)
            print(f"  [Purge] Purged: {bad_file}")

    print(f"\n[Slay] Cleaned {count} files for {TARGET_DOMAIN}. Ready for Production!")

if __name__ == '__main__':
    process_files()
