import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let title: Title;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
  });

  it('should set the document title', () => {
    service.update({ title: 'About | Imam Travels', description: 'desc' });
    expect(title.getTitle()).toBe('About | Imam Travels');
  });

  it('should set the description meta tag', () => {
    service.update({ title: 't', description: 'A test description for SEO' });
    expect(meta.getTag('name="description"')?.content).toBe(
      'A test description for SEO',
    );
  });

  it('should set OG and Twitter tags', () => {
    service.update({ title: 'Page', description: 'Desc', path: '/page' });
    expect(meta.getTag('property="og:title"')?.content).toBe('Page');
    expect(meta.getTag('property="og:description"')?.content).toBe('Desc');
    expect(meta.getTag('name="twitter:card"')?.content).toBe(
      'summary_large_image',
    );
  });

  it('should set noindex when noIndex flag is true', () => {
    service.update({ title: 't', description: 'd', noIndex: true });
    expect(meta.getTag('name="robots"')?.content).toBe('noindex, nofollow');
  });

  it('should set index/follow by default', () => {
    service.update({ title: 't', description: 'd' });
    expect(meta.getTag('name="robots"')?.content).toBe(
      'index, follow, max-image-preview:large',
    );
  });
});
