import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { JsonLdService } from './json-ld.service';

describe('JsonLdService', () => {
  let service: JsonLdService;
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonLdService);
    doc = TestBed.inject(DOCUMENT);
    // Cleanup any leftover ld-* scripts between tests
    doc.querySelectorAll('script[id^="ld-"]').forEach((el) => el.remove());
  });

  it('should inject a JSON-LD script tag with the given id', () => {
    service.set('test', { '@type': 'Thing', name: 'Test' });
    const script = doc.getElementById('ld-test') as HTMLScriptElement | null;
    expect(script).toBeTruthy();
    expect(script?.type).toBe('application/ld+json');
    expect(JSON.parse(script!.textContent ?? '{}').name).toBe('Test');
  });

  it('should replace an existing schema with the same id', () => {
    service.set('test', { name: 'First' });
    service.set('test', { name: 'Second' });
    const scripts = doc.querySelectorAll('script[id="ld-test"]');
    expect(scripts.length).toBe(1);
    const json = JSON.parse(scripts[0].textContent ?? '{}');
    expect(json.name).toBe('Second');
  });

  it('should remove a schema by id', () => {
    service.set('test', { name: 'X' });
    expect(doc.getElementById('ld-test')).toBeTruthy();
    service.remove('test');
    expect(doc.getElementById('ld-test')).toBeNull();
  });

  it('should build a valid Organization schema', () => {
    const schema = service.buildOrganizationSchema();
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('TravelAgency');
    expect(Array.isArray((schema as any).address)).toBe(true);
  });

  it('should build a Breadcrumb schema with home prepended', () => {
    const schema = service.buildBreadcrumbSchema([
      { name: 'About', path: '/about' },
    ]);
    const items = (schema as any).itemListElement;
    expect(items.length).toBe(2);
    expect(items[0].name).toBe('Home');
    expect(items[1].name).toBe('About');
  });

  it('should build a FAQPage schema', () => {
    const schema = service.buildFaqSchema([
      { question: 'Q?', answer: 'A.' },
    ]);
    expect((schema as any)['@type']).toBe('FAQPage');
    expect((schema as any).mainEntity[0].acceptedAnswer.text).toBe('A.');
  });
});
