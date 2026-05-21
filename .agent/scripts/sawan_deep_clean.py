import os
import re

def fix_sawan_deep():
    path = r'c:\Users\USER\Desktop\B\2026\UFATHAI\landing-domains\sawan289.br.com'
    
    # 1. Image and Link replacements (Fixing 404s from i0.wp.com and sawan289.beer)
    replacements = {
        # Logo and Favicon replacements (even if entities or strange params are present)
        r'https://i0\.wp\.com/[^"]*cropped-sw289-bg\.png[^"]*': '/wp-content/uploads/2025/09/cropped-sw289-bg.png',
        r'https://i0\.wp\.com/sawan289\.beer/[^"]*SAWAN289\.png[^"]*': '/wp-content/uploads/2024/04/SAWAN289.png',
        
        # Elementor JSON Config - Replacing hardcoded URLs in JS objects
        r'https:\\/\\/www\.ufathai\.biz\\/wp-content\\/plugins\\/elementor\\/assets\\/': '/wp-content/plugins/elementor/assets/',
        r'https:\\/\\/www\.ufathai\.biz\\/wp-admin\\/admin-ajax\.php': '/wp-admin/admin-ajax.php',
        r'https:\\/\\/www\.ufathai\.biz\\/wp-content\\/uploads': '/wp-content/uploads',
        
        # General Jetpack/CDN cleanup
        r'https://i0\.wp\.com/': '/',
        r'\?fit=[^"\' ]*': '',
        r'\?resize=[^"\' ]*': '',
        r'\?ssl=1': '',
        r'&#038;ssl=1': '',
    }

    # 2. Scripts cleanup
    script_patterns_to_remove = [
        # Remove scripts loading from www.ufathai.biz (which cause 404)
        r'<script[^>]*src="https://www\.ufathai\.biz/[^"]*"[^>]*></script>',
        r'<link[^>]*href="https://www\.ufathai\.biz/[^"]*"[^>]*>',
        
        # Remove Cloudflare RUM
        r'<script[^>]*src="https://static\.cloudflareinsights\.com/beacon\.min\.js/[^"]*"[^>]*></script>',
        
        # We RE-ENABLE litespeed/boost cache artifacts because they are the primary styles!
        # r'<script data-optimized="1" type="litespeed/javascript" src="/wp-content/litespeed/js/[a-f0-9]+\.js"></script>',
        # r'<link rel=\'stylesheet\' id=\'all-css-[a-f0-9]+\' href=\'/wp-content/boost-cache/static/[a-f0-9]+\.min\.css\' type=\'text/css\' media=\'all\' />',
        
        # Remove Guest Mode / Vary scripts ONLY if they are definitely broken
        # r'<script data-no-optimize="1">var litespeed_vary.*?</script>',
        # r'fetch\("/wp-content/plugins/litespeed-cache/guest\.vary\.php".*?\)\.then\(.*?\)',
    ]

    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith('.html') or file == 'index' or file == 'feed':
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()

                original_content = content

                # Apply replacements
                for pattern, replacement in replacements.items():
                    content = re.sub(pattern, replacement, content)

                # Remove broken scripts
                for pattern in script_patterns_to_remove:
                    content = re.sub(pattern, '', content)

                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Fixed assets in: {file}")

    # 3. Purge specific 404 scripts if they exist as physical files but are invalid
    # Actually, they are likely virtual references in the minified HTML.

    print("--- Sawan Deep Clean Completed ---")

if __name__ == "__main__":
    fix_sawan_deep()
