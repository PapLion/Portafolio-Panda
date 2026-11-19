import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const htmlPages = { en: read('en/index.html'), es: read('es/index.html') };

for (const [locale, html] of Object.entries(htmlPages)) {
  test(`share metadata for /${locale} is crawlable, correctly localized and text-only`, () => {
    assert.match(html, new RegExp(`<html lang="${locale}">`));
    assert.match(html, new RegExp(`<link rel="canonical" href="https://danipp\\.tech/${locale}">`));
    assert.match(html, new RegExp(`<meta property="og:url" content="https://danipp\\.tech/${locale}">`));
    assert.match(html, new RegExp(`<meta name="twitter:url" content="https://danipp\\.tech/${locale}">`));
    assert.match(html, /<meta name="twitter:card" content="summary">/);
    assert.doesNotMatch(html, /(?:og:image|twitter:image|og-image\.jpg|danidev\.vercel\.app)/);
    assert.match(html, /href="https:\/\/danipp\.tech\/en"/);
    assert.match(html, /href="https:\/\/danipp\.tech\/es"/);
  });
}

test('English and Spanish pages have different personal descriptions', () => {
  assert.match(htmlPages.en, /I&#39;m Danilo|I'm Danilo/);
  assert.match(htmlPages.es, /Soy Danilo/);
  assert.notEqual(htmlPages.en.match(/<meta property="og:description" content="([^"]+)"/)[1], htmlPages.es.match(/<meta property="og:description" content="([^"]+)"/)[1]);
});

test('Vite publishes all three HTML entries and Vercel maps localized paths to them', () => {
  const vite = read('vite.config.js');
  const vercel = JSON.parse(read('vercel.json'));
  assert.match(vite, /en\/index\.html/);
  assert.match(vite, /es\/index\.html/);
  for (const locale of ['en', 'es']) {
    assert.ok(vercel.rewrites.some(r => r.source === '/' + locale && r.destination === '/' + locale + '/index.html'));
  }
});

test('language preference cannot override an explicitly shared locale', () => {
  const provider = read('src/composables/useLanguage.js');
  assert.match(provider, /localeFromPath/);
  assert.match(provider, /!localeFromPath && savedLanguage/);
  assert.match(provider, /window\.location\.assign\(targetPath\)/);
});
