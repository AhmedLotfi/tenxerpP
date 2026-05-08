import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  set({ title, description, image }: { title: string; description?: string; image?: string }): void {
    const brand = 'Tenx IT Solutions';
    const fullTitle = title.includes(brand) || title.includes('TenxERP') ? title : `${title} | ${brand}`;
    this.title.setTitle(fullTitle);

    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
    }

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    if (image) {
      this.meta.updateTag({ property: 'og:image', content: image });
    }

    const canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const href = this.document.location.href;
    if (canonical) {
      canonical.href = href;
    } else {
      const link = this.document.createElement('link');
      link.rel = 'canonical';
      link.href = href;
      this.document.head.appendChild(link);
    }
  }
}
