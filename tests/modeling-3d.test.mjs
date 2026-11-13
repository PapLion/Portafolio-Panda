import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { categories, IMAGE_WIDTHS, models, homeHighlights, robloxHighlights, formatCount } from '../src/data/models3d.js';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('app renders a dedicated 3D modeling page for /3d-modeling', () => {
  const app = read('../src/App.vue');
  assert.match(app, /import Modeling3D from '\.\/pages\/Modeling3D\.vue'/);
  assert.match(app, /isModelingRoute = currentPath === '\/3d-modeling'/);
  assert.match(app, /<Modeling3D v-else-if="isModelingRoute"\s*\/>/);
  // existing routes and sections stay
  assert.match(app, /<RobloxGameDev v-if="isRobloxGameDevRoute"\s*\/>/);
  assert.match(app, /<RealWork\s*\/>\s*<ModelingTeaser\s*\/>\s*<Skills\s*\/>/);
});

test('Vercel rewrites direct /3d-modeling visits to the SPA entry point', () => {
  const config = JSON.parse(read('../vercel.json'));
  assert.ok(config.rewrites.some((r) => r.source === '/3d-modeling' && r.destination === '/index.html'));
  assert.ok(config.rewrites.some((r) => r.source === '/roblox-gamedev' && r.destination === '/index.html'));
});

test('navigation and the Roblox page link to the 3D gallery', () => {
  const navbar = read('../src/components/Navbar.vue');
  assert.match(navbar, /href:\s*"\/3d-modeling"/);
  const lang = read('../src/composables/useLanguage.js');
  assert.match(lang, /"nav\.modeling": "Modelado 3D"/);
  assert.match(lang, /"nav\.modeling": "3D Modeling"/);
  const roblox = read('../src/pages/RobloxGameDev.vue');
  assert.match(roblox, /<ModelingShowcase/);
  assert.match(roblox, /href="\/3d-modeling"/);
});

test('model data is the single source: unique slugs, valid categories and links', () => {
  const slugs = new Set();
  for (const model of models) {
    assert.ok(!slugs.has(model.slug), `duplicate slug ${model.slug}`);
    slugs.add(model.slug);
    assert.ok(categories.some((c) => c.id === model.category), `${model.slug} category`);
    for (const lang of ['en', 'es']) {
      assert.ok(model.name[lang] && model.summary[lang], `${model.slug} copy ${lang}`);
      for (const view of model.views) assert.ok(view.label[lang], `${model.slug}/${view.id} label ${lang}`);
    }
    if (!model.kind) {
      assert.ok(Number.isInteger(model.stats.tris) && model.stats.tris > 0, `${model.slug} tris`);
      assert.ok(model.structure.en && model.structure.es, `${model.slug} structure`);
    }
  }
  for (const model of models) for (const slug of model.includes ?? []) assert.ok(slugs.has(slug), `include ${slug}`);
  for (const slug of [...homeHighlights, ...robloxHighlights]) assert.ok(slugs.has(slug), `highlight ${slug}`);
});

test('every gallery view has its optimized images in public/', () => {
  for (const model of models) {
    for (const view of model.views) {
      for (const width of IMAGE_WIDTHS[view.shape]) {
        const file = new URL(`../public/images/3d/${model.slug}/${view.id}-${width}.webp`, import.meta.url);
        assert.ok(existsSync(file), `missing ${model.slug}/${view.id}-${width}.webp`);
      }
    }
  }
});

test('copy stays factual: no inflated or unverified claims', () => {
  const sources = [
    read('../src/data/models3d.js'),
    read('../src/pages/Modeling3D.vue'),
    read('../src/components/ModelingTeaser.vue'),
  ].join('\n');
  for (const banned of [/principiante/i, /beginner/i, /reci[eé]n empezando/i, /\bAAA\b/, /\bsenior\b/i, /years of experience/i, /años de experiencia/i, /game-ready/i, /Roblox[- ]tested/i, /\bclients?\b.*\bmodel/i]) {
    assert.doesNotMatch(sources, banned);
  }
  // the guard is the only rigged piece and its rig is credited to Roblox's reference files
  const guard = models.find((m) => m.slug === 'guard');
  assert.equal(guard.stats.bones, 51);
  assert.match(guard.notes.en[0], /official reference files/);
  assert.ok(models.filter((m) => m.stats?.bones).length === 1);
  assert.match(read('../src/pages/Modeling3D.vue'), /danip\.p/);
});

test('counts are formatted with grouping in both languages', () => {
  assert.equal(formatCount(26334, 'es'), '26.334');
  assert.equal(formatCount(7402, 'en'), '7,402');
  assert.equal(formatCount(364, 'es'), '364');
});
