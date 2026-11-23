import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import { RPG_PATH, rpgBoards, rpgCategories, rpgCover, rpgFeatured } from '../src/data/rpgUiLibrary.js';
import { uiBoards } from '../src/data/uiLibrary.js';

const page = readFileSync(new URL('../src/pages/UiLibrary.vue', import.meta.url), 'utf8');
const img = (f) => new URL(`../public${RPG_PATH}/${f}`, import.meta.url);

test('every RPG board exists at both sizes and belongs to a family; every family has boards', () => {
  assert.ok(rpgBoards.length >= 12 && rpgBoards.length <= 20, `curated set of 12-20 (${rpgBoards.length})`);
  const ids = rpgCategories.map((c) => c.id);
  for (const b of rpgBoards) {
    for (const w of [800, 1600]) assert.ok(existsSync(img(`${b.id}-${w}.webp`)), `${b.id}-${w}.webp`);
    assert.ok(ids.includes(b.category), b.id);
    assert.ok(b.w > 0 && b.h > 0, `${b.id} has real dimensions`);
    assert.ok(b.title.en && b.title.es && b.note.en && b.note.es, `${b.id} copy`);
  }
  for (const c of rpgCategories) assert.ok(rpgBoards.some((b) => b.category === c.id), c.id);
  for (const id of [rpgCover, ...rpgFeatured]) assert.ok(rpgBoards.some((b) => b.id === id), id);
});

test('/ui keeps PIVOT and adds the RPG collection as a separate section', () => {
  assert.ok(uiBoards.length > 0, 'PIVOT boards kept');
  assert.match(page, /id="pivot"/);
  assert.match(page, /id="rpg"/);
  assert.match(page, /Stylized Fantasy RPG/);
  assert.match(page, /UI Component Library/);
  assert.doesNotMatch(page, /images\/ui\/rpg[^'"`]*images\/ui\/[a-z-]+-1280/, 'RPG images live under their own path');
  assert.ok(rpgBoards.every((b) => !uiBoards.some((p) => p.id === b.id) || b.id === 'buttons' || b.id === 'controls'), 'no board shared by id except generic names');
});

test('RPG copy is honest: a UI library, no game, backend or multiplayer claims', () => {
  const text = page + JSON.stringify(rpgBoards);
  assert.doesNotMatch(text, /playable|multiplayer|matchmaking server|real purchases|Robux/i);
  assert.match(text, /not a game/i);
});
