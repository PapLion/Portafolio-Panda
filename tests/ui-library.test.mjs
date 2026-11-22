import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import { UI_PATH, uiBoards, uiCategories } from '../src/data/uiLibrary.js';

const app = readFileSync(new URL('../src/App.vue', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/pages/UiLibrary.vue', import.meta.url), 'utf8');
const roblox = readFileSync(new URL('../src/pages/RobloxGameDev.vue', import.meta.url), 'utf8');
const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
const img = (f) => new URL(`../public${UI_PATH}/${f}`, import.meta.url);

test('/ui is its own route, served by Vercel', () => {
  assert.match(app, /import UiLibrary from '\.\/pages\/UiLibrary\.vue'/);
  assert.match(app, /currentPath === '\/ui'/);
  assert.ok(vercel.rewrites.some((r) => r.source === '/ui' && r.destination === '/index.html'));
});

test('every board exists at both sizes and belongs to a family; every family has boards', () => {
  for (const id of ['hero', ...uiBoards.map((b) => b.id)]) {
    for (const w of [640, 1280]) assert.ok(existsSync(img(`${id}-${w}.webp`)), `${id}-${w}.webp`);
  }
  const ids = uiCategories.map((c) => c.id);
  for (const b of uiBoards) {
    assert.ok(ids.includes(b.category), b.id);
    assert.ok(b.title.en && b.title.es && b.note.en && b.note.es, `${b.id} copy`);
  }
  for (const c of uiCategories) assert.ok(uiBoards.some((b) => b.category === c.id), c.id);
});

test('the page shows only UI pieces: no game screens, scenes or flow narrative', () => {
  const text = page + JSON.stringify(uiBoards);
  assert.doesNotMatch(text, /screen-(lobby|title|hud|shop)|images\/roblox\/pivot/);
  assert.doesNotMatch(text, /from the title screen|gameplay|3D models? (on|showcase)/i);
  assert.match(page, /loading="lazy"/);
});

test('the Roblox page links to /ui instead of showing PIVOT game screens', () => {
  assert.match(roblox, /href="\/ui"/);
  assert.doesNotMatch(roblox, /PivotShowcase|images\/roblox\/pivot/);
});
