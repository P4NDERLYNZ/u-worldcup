import os
import re

def fix_image_paths_sawan():
    path = r'c:\Users\USER\Desktop\B\2026\UFATHAI\landing-domains\sawan289.br.com'
    
    files = [f for f in os.listdir(path) if f.endswith('.html')]
    
    for file in files:
        file_path = os.path.join(path, file)
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # Remove domain-specific prefixes from internal asset paths
        # Fix /sawan289.beer/wp-content/... -> /wp-content/...
        # Fix /sawan289.br.com/wp-content/... -> /wp-content/...
        content = re.sub(r'/(sawan289\.beer|sawan289\.br\.com)/wp-content/', r'/wp-content/', content)
        
        # Also handle any //wp-content/ or absolute references if they exist
        # Example: src="//wp-content/uploads/..." -> src="/wp-content/uploads/..."
        content = re.sub(r'src="//wp-content/', r'src="/wp-content/', content)
        content = re.sub(r'srcset="//wp-content/', r'srcset="/wp-content/', content)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed image paths in: {file}")

    print("--- Image Path Fix Completed ---")

if __name__ == "__main__":
    fix_image_paths_sawan()
