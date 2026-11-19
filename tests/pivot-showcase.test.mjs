import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import { PIVOT_PATH, pivotContent, pivotImageIds } from '../src/data/pivot.js';

const robloxPage = readFileSync(new URL('../src/pages/RobloxGameDev.vue', import.meta.url), 'utf8');
const showcase = readFileSync(new URL('../src/components/roblox/PivotShowcase.vue', import.meta.url), 'utf8');
const gallery = readFileSync(new URL('../src/components/ProjectGallery.vue', import.meta.url), 'utf8');
const publicDir = new URL('../public', import.meta.url);

test('the Roblox page shows PIVOT between the client flagship and the experience areas', () => {
  assert.match(robloxPage, /import PivotShowcase from '\.\.\/components\/roblox\/PivotShowcase\.vue'/);
  const flagship = robloxPage.indexOf('roblox-flagship-title');
  const pivot = robloxPage.indexOf('<PivotShowcase');
  const experience = robloxPage.indexOf('aria-labelledby="experience-title"');
  assert.ok(flagship > -1 && pivot > flagship && experience > pivot, 'PIVOT sits after the flagship and before the case studies');
});

test('PIVOT is framed as a UI system with simulated data, in both languages', () => {
  const en = pivotContent('en');
  const es = pivotContent('es');
  assert.equal(en.title, 'PIVOT — Competitive Shooter UI System');
  assert.match(es.title, /Sistema de UI/);
  for (const c of [en, es]) {
    assert.match(c.note, /simulated|simulan/);
    assert.match(c.note, /DataStore/);
    assert.ok(c.highlights.length >= 3 && c.technical.length >= 5);
  }
  assert.match(en.note, /not a released game/);
  assert.doesNotMatch(JSON.stringify(en), /gamepad|controller support|multiplayer servers/i);
});

test('the showcase has the four sections: screens, component library, responsive, technical', () => {
  assert.match(showcase, /c\.screens/);
  assert.match(showcase, /layout="grid"/);
  assert.match(showcase, /c\.components/);
  assert.match(showcase, /c\.responsive/);
  assert.match(showcase, /c\.technical/);
  const en = pivotContent('en');
  assert.equal(en.screens.length, 10);
  assert.ok(en.components.length >= 10, 'component library has at least ten pieces');
  assert.equal(en.responsive.length, 3);
  assert.ok(en.components.some((s) => s.id === 'component-button-states'));
});

test('every PIVOT image exists at its thumbnail and large size, and every shot has a caption', () => {
  for (const { id, files } of pivotImageIds) {
    for (const file of files) {
      assert.ok(existsSync(new URL(`.${PIVOT_PATH}/${file}`, publicDir.href + '/')), `${file} should exist`);
    }
    for (const lang of ['en', 'es']) {
      const c = pivotContent(lang);
      const shot = [...c.screens, ...c.components, ...c.responsive].find((s) => s.id === id);
      assert.ok(shot?.title && shot.title !== id, `${id} needs a ${lang} title`);
    }
  }
});

test('the shared gallery keeps its strip layout by default and lazy-loads grid tiles', () => {
  assert.match(gallery, /layout: \{ type: String, default: 'strip' \}/);
  assert.match(gallery, /layout === 'grid'/);
  const grid = gallery.slice(gallery.indexOf('gallery-grid'), gallery.indexOf('</ul>'));
  assert.match(grid, /loading="lazy"/);
  assert.match(grid, /srcset=/);
});

test('the Roblox page still links no repositories', () => {
  assert.doesNotMatch(robloxPage + showcase, /github\.com/i);
  assert.doesNotMatch(robloxPage + showcase, /Roblox-Scripting-Work/);
});
