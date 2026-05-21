import os
import shutil

src_root = r'c:\Users\USER\Desktop\B\2026\UFATHAI\landing-domains\sawan289.br.com\sawan289.beer\wp-content\uploads'
dest_root = r'c:\Users\USER\Desktop\B\2026\UFATHAI\landing-domains\sawan289.br.com\wp-content\uploads'

def merge_folders(src, dest):
    if not os.path.exists(dest):
        os.makedirs(dest)
    
    for item in os.listdir(src):
        s = os.path.join(src, item)
        d = os.path.join(dest, item)
        if os.path.isdir(s):
            merge_folders(s, d)
        else:
            if not os.path.exists(d):
                shutil.copy2(s, d)
                print(f"Copied: {item}")

if os.path.exists(src_root):
    merge_folders(src_root, dest_root)
    print("--- Uploads Merge Completed ---")
else:
    print("Source uploads folder not found.")
