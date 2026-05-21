import os
import urllib.parse
import re

root_dir = r'c:\Users\USER\Desktop\B\2026\UFATHAI\landing-domains\sawan289.br.com'

def decode_and_rename_files(directory):
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if '%' in filename:
                decoded_name = urllib.parse.unquote(filename)
                if decoded_name != filename:
                    src = os.path.join(root, filename)
                    dest = os.path.join(root, decoded_name)
                    if not os.path.exists(dest):
                        os.rename(src, dest)
                        print(f"Renamed: {filename} -> {decoded_name}")
                    else:
                        # If destination exists, just remove the encoded one to avoid duplicates
                        os.remove(src)
                        print(f"Removed Duplicate: {filename}")

def clean_html_links(directory):
    for filename in os.listdir(directory):
        if filename.endswith('.html'):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find all src/srcset that are encoded and decode them
            def decode_match(match):
                attr = match.group(1)
                value = match.group(2)
                decoded_value = urllib.parse.unquote(value)
                return f'{attr}="{decoded_value}"'
            
            new_content = re.sub(r'(src(?:set)?)=\"([^\"]+)\"', decode_match, content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Decoded HTML: {filename}")

uploads_dir = os.path.join(root_dir, 'wp-content', 'uploads')
if os.path.exists(uploads_dir):
    decode_and_rename_files(uploads_dir)

clean_html_links(root_dir)
print("--- Filename and Link Decoding Completed ---")
