import os
import re

directory = r'c:\Users\USER\Desktop\B\2026\UFATHAI\landing-domains\sawan289.br.com'
patterns = [
    (r'https?://sawan289\.beer/', '/'),
    (r'https?://www\.ufathai\.biz/', '/'),
    (r'https?://i\d+\.wp\.com/sawan289\.beer/', '/'),
    (r'https?://lobby\.ufathai\.biz/wp-content/', '/wp-content/'),
    (r'https?://www\.sawan289\.beer/', '/')
]

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    for pattern, replacement in patterns:
        content = re.sub(pattern, replacement, content)
    
    # Fix double slashes that might occur
    content = content.replace('//wp-content/', '/wp-content/')
    content = content.replace('"//', '"/')
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned: {os.path.basename(filepath)}")

for filename in os.listdir(directory):
    if filename.endswith('.html'):
        clean_file(os.path.join(directory, filename))

print("--- Ultimate Path Fix Completed ---")
