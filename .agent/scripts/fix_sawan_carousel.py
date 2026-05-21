import os
import re

TARGET_DIR = r'c:\Users\USER\Desktop\B\2026\UFATHAI\landing-domains\sawan289.br.com'
FILES = ['articles.html', 'promotion.html', 'reviewslot.html', 'deposit-withdraw.html', 'index.html']

CAROUSEL_HTML = '''<div class="elementor-image-carousel swiper-wrapper swiper-image-stretch" aria-live="off">
    <div class="swiper-slide" role="group" aria-roledescription="slide" aria-label="1 of 6"><a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="3a422203" href="https://lobby.ufathai.biz/register?agentId=ufotx9a&marketingLinkId=9ae18eec-4119-45c9-be3f-3b43c6b32074&openExternalBrowser=1" target="_blank"><figure class="swiper-slide-inner"><img src="/wp-content/uploads/2024/04/Sawan289-Banner-1-1.png" class="swiper-slide-image" alt="Sawan289 Banner 1" width="2000" height="1000" /></figure></a></div>
    <div class="swiper-slide" role="group" aria-roledescription="slide" aria-label="2 of 6"><a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="3a422203" href="https://lobby.ufathai.biz/register?agentId=ufotx9a&marketingLinkId=9ae18eec-4119-45c9-be3f-3b43c6b32074&openExternalBrowser=1" target="_blank"><figure class="swiper-slide-inner"><img src="/wp-content/uploads/2024/04/Sawan289-Banner-2-1.png" class="swiper-slide-image" alt="Sawan289 Banner 2" width="2000" height="1000" /></figure></a></div>
    <div class="swiper-slide" role="group" aria-roledescription="slide" aria-label="3 of 6"><a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="3a422203" href="https://lobby.ufathai.biz/register?agentId=ufotx9a&marketingLinkId=9ae18eec-4119-45c9-be3f-3b43c6b32074&openExternalBrowser=1" target="_blank"><figure class="swiper-slide-inner"><img src="/wp-content/uploads/2024/04/Sawan289-Banner-3-1.png" class="swiper-slide-image" alt="Sawan289 Banner 3" width="2000" height="1000" /></figure></a></div>
    <div class="swiper-slide" role="group" aria-roledescription="slide" aria-label="4 of 6"><a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="3a422203" href="https://lobby.ufathai.biz/register?agentId=ufotx9a&marketingLinkId=9ae18eec-4119-45c9-be3f-3b43c6b32074&openExternalBrowser=1" target="_blank"><figure class="swiper-slide-inner"><img src="/wp-content/uploads/2024/04/Sawan289-Banner-4-1.png" class="swiper-slide-image" alt="Sawan289 Banner 4" width="2000" height="1000" /></figure></a></div>
    <div class="swiper-slide" role="group" aria-roledescription="slide" aria-label="5 of 6"><a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="3a422203" href="https://lobby.ufathai.biz/register?agentId=ufotx9a&marketingLinkId=9ae18eec-4119-45c9-be3f-3b43c6b32074&openExternalBrowser=1" target="_blank"><figure class="swiper-slide-inner"><img src="/wp-content/uploads/2024/04/Sawan289-Banner-5-1.png" class="swiper-slide-image" alt="Sawan289 Banner 5" width="2000" height="1000" /></figure></a></div>
    <div class="swiper-slide" role="group" aria-roledescription="slide" aria-label="6 of 6"><a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="3a422203" href="https://lobby.ufathai.biz/register?agentId=ufotx9a&marketingLinkId=9ae18eec-4119-45c9-be3f-3b43c6b32074&openExternalBrowser=1" target="_blank"><figure class="swiper-slide-inner"><img src="/wp-content/uploads/2024/04/Sawan289-Banner-6-1.png" class="swiper-slide-image" alt="Sawan289 Banner 6" width="2000" height="1000" /></figure></a></div>
</div>'''

def fix_carousel():
    for f in FILES:
        path = os.path.join(TARGET_DIR, f)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Pattern to match the truncated carousel (even if it has one or more slides)
            # We want to replace the entire <div class="elementor-image-carousel swiper-wrapper ...">...</div> block
            pattern = re.compile(r'<div class="elementor-image-carousel swiper-wrapper swiper-image-stretch" aria-live="off">.*?</div>(?=\s*</div>\s*</div>\s*</div>\s*</div>)', re.DOTALL)
            
            new_content = pattern.sub(CAROUSEL_HTML, content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                print(f'Fixed carousel in {f}')
            else:
                print(f'Carousel pattern match failed in {f}')

if __name__ == "__main__":
    fix_carousel()
