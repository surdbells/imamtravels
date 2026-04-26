/**
 * SEO metadata for a route.
 * All fields except `title` and `description` are optional.
 */
export interface SeoData {
  /** <title> tag — keep to 60–65 characters */
  title: string;

  /** meta description — keep to 150–160 characters */
  description: string;

  /** Path relative to siteUrl, e.g. '/about'. Defaults to '/'. */
  path?: string;

  /** Canonical URL override. If not set, derived from siteUrl + path. */
  canonical?: string;

  /** Open Graph image URL (absolute or root-relative). */
  image?: string;

  /** Open Graph type. Defaults to 'website'. */
  ogType?: 'website' | 'article';

  /** Comma-separated keywords (de-emphasised but harmless). */
  keywords?: string;

  /** Whether the page should be indexed by search engines. Defaults to true. */
  noIndex?: boolean;
}
