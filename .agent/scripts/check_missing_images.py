import os
import re

PRJ_ROOT = r'c:\Users\USER\Desktop\B\2026\UFATHAI\landing-domains\sawan289.br.com'
FILES = ['index.html', 'articles.html', 'promotion.html', 'reviewslot.html', 'deposit-withdraw.html']

def check_missing():
    all_missing = set()
    patterns = [
        r'src=["\'](.*?/wp-content/uploads/.*?)["\']',
        r'data-src=["\'](.*?/wp-content/uploads/.*?)["\']',
        r'url\(["\']?(.*?/wp-content/uploads/.*?)["\']?\)',
        r'srcset=["\'](.*?)["\']'
    ]
    
    file_list = []
    for root, dirs, files in os.walk(PRJ_ROOT):
        for f in files:
            if f.endswith(('.html', '.css')):
                file_list.append(os.path.join(root, f))

    for path in file_list:
        with open(path, 'r', encoding='utf-8', errors='ignore') as file:
            content = file.read()
        
        for p in patterns:
            matches = re.findall(p, content)
            for match in matches:
                # Handle srcset which is a comma separated list
                urls = [match]
                if ',' in match: urls = [u.strip().split(' ')[0] for u in match.split(',')]
                
                for img in urls:
                    if '/wp-content/uploads/' not in img: continue
                    local_path = img
                    if 'http' in img:
                        local_path = '/wp-content/uploads/' + img.split('/wp-content/uploads/', 1)[1]
                    
                    full_path = os.path.join(PRJ_ROOT, local_path.lstrip('/'))
                    if not os.path.exists(full_path):
                        all_missing.add(f"{local_path} (found in {os.path.basename(path)})")
    
    if all_missing:
        print("Missing images found:")
        for m in sorted(list(all_missing)):
            print(m)
    else:
        print("No missing images found in project.")

if __name__ == "__main__":
    check_missing()
