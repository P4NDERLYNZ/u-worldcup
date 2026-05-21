import os
import re

TARGET_DIR = r'c:\Users\USER\Desktop\B\2026\UFATHAI\landing-domains\sawan289.br.com'
TARGET_FILES = [
    'index.html',
    'promotion.html',
    'reviewslot.html',
    'deposit-withdraw.html',
    'articles.html'
]

REG_LINK = "https://lobby.ufathai.biz/register?agentId=ufotx9a&marketingLinkId=9ae18eec-4119-45c9-be3f-3b43c6b32074&openExternalBrowser=1"
HUB_DOMAIN = "https://www.ufathai.biz/"

def audit_and_fix(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Normalize image domains
    # Patterns to match: https://sawan289.beer/wp-content/uploads/ or https://www.ufathai.biz/wp-content/uploads/
    # Also handles i0.wp.com/...
    content = re.sub(r'https?://(?:i[0-9]\.wp\.com/)?(?:www\.)?(?:sawan289\.beer|ufathai\.biz)/wp-content/uploads/', '/wp-content/uploads/', content)

    # 2. Fix registration links
    # Replace any href that looks like a registration link or login link to the hub domain
    # Matching common patterns in these landing pages
    content = re.sub(r'href="https?://(?:lobby|member)\..*?"', f'href="{REG_LINK}"', content)
    
    # Also specifically check for common "register?agentId=" patterns
    content = re.sub(r'href="https?://.*/register\?agentId=.*?"', f'href="{REG_LINK}"', content)

    # 3. Canonical and Meta URLs
    # Base site should point to the target domain
    content = re.sub(r'href="https?://(?:www\.)?sawan289\.beer/"', f'href="{HUB_DOMAIN}"', content)
    content = re.sub(r'content="https?://(?:www\.)?sawan289\.beer/"', f'content="{HUB_DOMAIN}"', content)
    content = re.sub(r'url":"https?://(?:www\.)?(?:sawan289\.beer|ufathai\.biz)/"', f'url":"{HUB_DOMAIN}"', content) # JSON-LD

    # 4. Remove leftover litespeed/jetpack markers if broken
    # (Optional but helps neatness)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Audited and fixed: {file_path}")

if __name__ == "__main__":
    for filename in TARGET_FILES:
        file_path = os.path.join(TARGET_DIR, filename)
        if os.path.exists(file_path):
            audit_and_fix(file_path)
        else:
            print(f"Skipping (not found): {file_path}")
