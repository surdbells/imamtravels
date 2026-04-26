import { DOCUMENT, inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Manages JSON-LD structured data (schema.org) injection into <head>.
 *
 * SSR-safe — uses DOCUMENT injection token and works on server-rendered
 * HTML, which is what Google's crawler primarily reads.
 *
 * Each page can register one or more schemas via `set(id, schema)`.
 * Re-calling `set` with the same id replaces the previous schema for
 * that id (useful for navigations within an SPA).
 *
 * Common schema types we use:
 *   - TravelAgency / LocalBusiness (per office)
 *   - Service (per service offered)
 *   - BreadcrumbList
 *   - FAQPage
 *   - WebSite (with SearchAction)
 *   - Organization
 */
@Injectable({ providedIn: 'root' })
export class JsonLdService {
  private readonly document = inject(DOCUMENT);
  private readonly siteUrl = environment.siteUrl.replace(/\/$/, '');

  /**
   * Insert or replace a JSON-LD <script> tag identified by `id`.
   */
  set(id: string, schema: Record<string, unknown> | Record<string, unknown>[]): void {
    const elementId = `ld-${id}`;
    let script = this.document.getElementById(elementId) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.id = elementId;
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
  }

  /**
   * Remove a previously-set JSON-LD script.
   */
  remove(id: string): void {
    const el = this.document.getElementById(`ld-${id}`);
    el?.remove();
  }

  /**
   * Convenience: build the canonical Organization schema for Imam Travels.
   * Used on multiple pages; centralised here for consistency.
   */
  buildOrganizationSchema(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      '@id': `${this.siteUrl}/#organization`,
      name: 'Imam Travels & Tours Nig. Ltd.',
      url: this.siteUrl,
      logo: `${this.siteUrl}/assets/images/logo/imam-travels-logo.webp`,
      image: `${this.siteUrl}/assets/images/logo/imam-travels-logo.webp`,
      description:
        "Nigeria's trusted travel agency for Hajj, Umrah, flights, visa processing and bespoke travel packages. Offices in Abuja and Ijebu-Ode.",
      areaServed: { '@type': 'Country', name: 'Nigeria' },
      knowsLanguage: ['en', 'ar', 'yo', 'ha'],
      sameAs: [
        'https://www.facebook.com/imamtravelsandtours',
        'https://www.instagram.com/imamtravelsandtours',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: environment.contact.primaryPhone,
          contactType: 'customer service',
          areaServed: 'NG',
          availableLanguage: ['English'],
        },
      ],
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'Suite A50 H & A Plaza, Olusegun Obasanjo Way, Wuye District',
          addressLocality: 'Abuja',
          addressRegion: 'FCT',
          addressCountry: 'NG',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: '14 Motubo Street, Awokoya Isale',
          addressLocality: 'Ijebu-Ode',
          addressRegion: 'Ogun State',
          addressCountry: 'NG',
        },
      ],
    };
  }

  /**
   * Build a WebSite schema with optional SearchAction (Phase 4 site search if added).
   */
  buildWebsiteSchema(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${this.siteUrl}/#website`,
      url: this.siteUrl,
      name: 'Imam Travels & Tours',
      publisher: { '@id': `${this.siteUrl}/#organization` },
      inLanguage: 'en-NG',
    };
  }

  /**
   * Build a BreadcrumbList schema for a route.
   *
   * @param items Array of { name, path } in order from home → current page.
   *              The home crumb is added automatically; do not include it.
   */
  buildBreadcrumbSchema(items: { name: string; path: string }[]): Record<string, unknown> {
    const elements = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: this.siteUrl },
      ...items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: item.name,
        item: `${this.siteUrl}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
      })),
    ];

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: elements,
    };
  }

  /**
   * Build an FAQPage schema from a list of question/answer pairs.
   */
  buildFaqSchema(faqs: { question: string; answer: string }[]): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }
}
