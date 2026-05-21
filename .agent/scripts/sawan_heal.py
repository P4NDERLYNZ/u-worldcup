import os
import shutil

def heal_sawan_pages():
    path = r'c:\Users\USER\Desktop\B\2026\UFATHAI\landing-domains\sawan289.br.com'
    
    # Mapping of Source (extensionless) -> Target (.html)
    page_map = {
        'articles': 'articles.html',
        'reviewslot': 'reviewslot.html',
        'deposit-withdraw': 'deposit-withdraw.html',
        'index': 'index.html'
    }

    for src, dst in page_map.items():
        src_path = os.path.join(path, src)
        dst_path = os.path.join(path, dst)
        
        if os.path.exists(src_path):
            print(f"Healing {dst} using content from {src}...")
            shutil.copy2(src_path, dst_path)
        else:
            print(f"Warning: Source {src} not found, skipping {dst}")

    print("--- Healing Completed ---")

if __name__ == "__main__":
    heal_sawan_pages()
