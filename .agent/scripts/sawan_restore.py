import os
import re

def restore_sawan():
    path = r'c:\Users\USER\Desktop\B\2026\UFATHAI\landing-domains\sawan289.br.com'
    
    # We need to re-add these essential Litespeed/Boost artifacts
    head_restoration = """<noscript><link rel='stylesheet' id='all-css-04687ac1770d0d05e3bcb9f035ffed12' href='/wp-content/boost-cache/static/c31b4cb99a.min.css' type='text/css' media='all' /></noscript>"""
    footer_restoration = """<script data-optimized="1" type="litespeed/javascript" src="/wp-content/litespeed/js/76774ea2b5d3d03c3f7369a18b0d2357.js"></script>"""

    for file in ['index.html', 'promotion.html', 'index', 'feed']:
        file_path = os.path.join(path, file)
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()

            # Restore Head CSS before </head>
            if head_restoration not in content:
                content = content.replace('</head>', f'{head_restoration}</head>')
            
            # Restore Footer JS before </body>
            if footer_restoration not in content:
                content = content.replace('</body>', f'{footer_restoration}</body>')

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Restored heart in: {file}")

    print("--- Sawan Recovery Completed ---")

if __name__ == "__main__":
    restore_sawan()
