import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description?: string;
  image?: string;
  /** Path-only canonical (e.g. "/about") — service builds the absolute URL. */
  path?: string;
  /** JSON-LD structured data block (Schema.org). Will be replaced or appended. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Override default keywords */
  keywords?: string;
  /** Override default OG type */
  type?: 'website' | 'article' | 'product';
}

const BRAND = 'Tenx IT Solutions';
const SITE = 'https://tenxerp.com';
const DEFAULT_OG_IMAGE = '/images/banner.jpg';
const STRUCTURED_DATA_ID = 'tenx-structured-data';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  set(cfg: SeoConfig): void {
    const fullTitle = this.composeTitle(cfg.title);
    this.title.setTitle(fullTitle);

    const description = cfg.description ?? '';
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ name: 'twitter:description', content: description });
    }

    if (cfg.keywords) {
      this.meta.updateTag({ name: 'keywords', content: cfg.keywords });
    }

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:type', content: cfg.type ?? 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: BRAND });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: '@tenxitsolutions' });

    const image = cfg.image ?? DEFAULT_OG_IMAGE;
    const fullImage = image.startsWith('http') ? image : `${SITE}${image.startsWith('/') ? '' : '/'}${image}`;
    this.meta.updateTag({ property: 'og:image', content: fullImage });
    this.meta.updateTag({ property: 'og:image:width', content: '1280' });
    this.meta.updateTag({ property: 'og:image:height', content: '720' });
    this.meta.updateTag({ name: 'twitter:image', content: fullImage });

    const path = cfg.path ?? this.currentPath();
    const canonical = `${SITE}${path === '/' ? '' : path}`;
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.setLink('canonical', canonical);
    this.setHreflang('en', canonical);
    this.setHreflang('ar', `${canonical}${canonical.includes('?') ? '&' : '?'}lang=ar`);
    this.setHreflang('x-default', canonical);

    if (cfg.jsonLd) {
      this.setStructuredData(cfg.jsonLd);
    }
  }

  /** Compose "Page | Tenx IT Solutions" — but skip the suffix if already branded. */
  private composeTitle(t: string): string {
    if (t.includes(BRAND) || t.includes('TenxERP')) return t;
    return `${t} | ${BRAND}`;
  }

  private currentPath(): string {
    return this.document.location.pathname || '/';
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang
      ? `link[rel="${rel}"][hreflang="${hreflang}"]`
      : `link[rel="${rel}"]:not([hreflang])`;
    let link = this.document.head.querySelector(selector) as HTMLLinkElement | null;
    if (!link) {
      link = this.document.createElement('link');
      link.rel = rel;
      if (hreflang) link.hreflang = hreflang;
      this.document.head.appendChild(link);
    }
    link.href = href;
  }

  private setHreflang(lang: string, href: string): void {
    this.setLink('alternate', href, lang);
  }

  private setStructuredData(data: Record<string, unknown> | Record<string, unknown>[]): void {
    const existing = this.document.getElementById(STRUCTURED_DATA_ID);
    if (existing) existing.remove();

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = STRUCTURED_DATA_ID;
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }
}
