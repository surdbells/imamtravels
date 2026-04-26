import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { SeoData } from '../models/seo-data.model';

/**
 * Manages per-route SEO metadata: title, description, OG/Twitter tags,
 * canonical URLs, and robots directives.
 *
 * SSR-safe — uses Angular's Meta/Title services and DOCUMENT injection
 * token, all of which work identically on server and browser.
 *
 * Usage in a page component:
 *   private seo = inject(SeoService);
 *   ngOnInit() {
 *     this.seo.update({
 *       title: 'About Us | Imam Travels & Tours',
 *       description: '...',
 *       path: '/about',
 *     });
 *   }
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  private readonly siteUrl = environment.siteUrl.replace(/\/$/, '');
  private readonly defaultImage = '/assets/images/og-default.jpg';

  /**
   * Apply a full set of SEO metadata. Call this from each page's ngOnInit.
   */
  update(data: SeoData): void {
    const path = data.path ?? '/';
    const canonical = data.canonical ?? `${this.siteUrl}${path}`;
    const image = this.absoluteUrl(data.image ?? this.defaultImage);
    const ogType = data.ogType ?? 'website';

    // Title
    this.title.setTitle(data.title);

    // Standard
    this.upsert('name', 'description', data.description);
    if (data.keywords) {
      this.upsert('name', 'keywords', data.keywords);
    }
    this.upsert(
      'name',
      'robots',
      data.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    );

    // Open Graph
    this.upsert('property', 'og:title', data.title);
    this.upsert('property', 'og:description', data.description);
    this.upsert('property', 'og:url', canonical);
    this.upsert('property', 'og:type', ogType);
    this.upsert('property', 'og:image', image);
    this.upsert('property', 'og:site_name', 'Imam Travels & Tours');
    this.upsert('property', 'og:locale', 'en_NG');

    // Twitter
    this.upsert('name', 'twitter:card', 'summary_large_image');
    this.upsert('name', 'twitter:title', data.title);
    this.upsert('name', 'twitter:description', data.description);
    this.upsert('name', 'twitter:image', image);

    // Canonical link
    this.setCanonical(canonical);
  }

  /**
   * Convert a relative URL to absolute. Leaves already-absolute URLs alone.
   */
  private absoluteUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${this.siteUrl}${url.startsWith('/') ? url : `/${url}`}`;
  }

  /**
   * Update or insert a meta tag.
   */
  private upsert(attr: 'name' | 'property', key: string, value: string): void {
    const selector = `${attr}="${key}"`;
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({ [attr]: key, content: value });
    } else {
      this.meta.addTag({ [attr]: key, content: value });
    }
  }

  /**
   * Set or update the canonical <link> in <head>.
   */
  private setCanonical(href: string): void {
    let link = this.document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
