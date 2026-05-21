import os
import re

def final_polish_sawan():
    path = r'c:\Users\USER\Desktop\B\2026\UFATHAI\landing-domains\sawan289.br.com'
    
    files = [f for f in os.listdir(path) if f.endswith('.html')]
    
    for file in files:
        file_path = os.path.join(path, file)
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # 1. Fix Double src attribute in images (The "Black Box" issue)
        # Often looks like <img src="data:..." src="/real/path" ...>
        # We want to remove the placeholder src and keep the real one.
        # This regex looks for double src and captures the second one (usually the real one)
        content = re.sub(r'<img\s+src="data:image/[^"]+"([^>]*?)\s+src="([^"]+)"', r'<img src="\2"\1', content)
        
        # 2. Fix the Promotion Menu Link
        # The subagent found it points to the lobby instead of the local page
        # Search for the "โปรโมชั่น" link specifically in the menu structure
        content = re.sub(
            r'<li([^>]*?)><a href="https://lobby\.ufathai\.biz/register[^"]+"([^>]*?)>โปรโมชั่น</a></li>',
            r'<li\1><a href="/promotion.html"\2>โปรโมชั่น</a></li>',
            content
        )

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Polished: {file}")

    print("--- Sawan Final Polish Completed ---")

if __name__ == "__main__":
    final_polish_sawan()
