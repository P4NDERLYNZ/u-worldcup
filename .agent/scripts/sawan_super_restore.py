import os
import re

def super_restore_sawan():
    path = r'c:\Users\USER\Desktop\B\2026\UFATHAI\landing-domains\sawan289.br.com'
    
    # Correct style restoration (NOT in noscript)
    head_css = """<link rel='stylesheet' id='all-css-sawan-main' href='/wp-content/boost-cache/static/c31b4cb99a.min.css' type='text/css' media='all' />"""
    footer_js = """<script data-optimized="1" type="litespeed/javascript" src="/wp-content/litespeed/js/76774ea2b5d3d03c3f7369a18b0d2357.js"></script>"""

    # Link mapping to fix navigation
    replacements = {
        'href="/promotion/"': 'href="/promotion.html"',
        'href="/reviewslot/"': 'href="/reviewslot.html"',
        'href="/%e0%b8%9a%e0%b8%97%e0%b8%84%e0%b8%a7%e0%b8%b2%e0%b8%a1/"': 'href="/articles.html"',
        'href="/%e0%b8%9d%e0%b8%b2%e0%b8%81-%e0%b8%96%e0%b8%ad%e0%b8%99/"': 'href="/deposit-withdraw.html"',
        'href="/%e0%b8%a3%e0%b8%b5%e0%b8%a7%e0%b8%b4%e0%b8%a7%e0%b9%80%e0%b8%81%e0%b8%a1%e0%b8%aa%e0%b8%a5%e0%b9%87%e0%b8%ad%e0%b8%a7/"': 'href="/reviewslot.html"',
        # Also clean up the noscript accidental messes
        '<noscript><link rel=\'stylesheet\' id=\'all-css-04687ac1770d0d05e3bcb9f035ffed12\' href=\'/wp-content/boost-cache/static/c31b4cb99a.min.css\' type=\'text\/css\' media=\'all\' /></noscript>': head_css
    }

    files = [f for f in os.listdir(path) if f.endswith('.html') or f in ['index', 'feed']]
    
    for file in files:
        file_path = os.path.join(path, file)
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # 1. Fix Styles
        if head_css not in content:
            if '</head>' in content:
                content = content.replace('</head>', f'{head_css}</head>')
        
        if footer_js not in content:
            if '</body>' in content:
                content = content.replace('</body>', f'{footer_js}</body>')

        # 2. Fix Navigation Links
        for old, new in replacements.items():
            content = content.replace(old, new)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed: {file}")

    print("--- Sawan Super Restore Completed ---")

if __name__ == "__main__":
    super_restore_sawan()
