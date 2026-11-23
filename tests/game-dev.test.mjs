import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import { gameDevMeta, gameDevProjects } from '../src/data/gameDevProjects.js';

const app = readFileSync(new URL('../src/App.vue', import.meta.url), 'utf8');
const navbar = readFileSync(new URL('../src/components/Navbar.vue', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/pages/GameDev.vue', import.meta.url), 'utf8');
const featured = readFileSync(
  new URL('../src/components/gamedev/FeaturedGameProject.vue', import.meta.url),
  'utf8',
);
const roblox = readFileSync(new URL('../src/pages/RobloxGameDev.vue', import.meta.url), 'utf8');
const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

test('/game-dev is its own route, served by Vercel, and linked from navigation', () => {
  assert.match(app, /import GameDev from '\.\/pages\/GameDev\.vue'/);
  assert.match(app, /currentPath === '\/game-dev'/);
  assert.match(app, /<GameDev\b[^>]*\/>/);
  assert.ok(vercel.rewrites.some((r) => r.source === '/game-dev' && r.destination === '/index.html'));
  assert.match(navbar, /href:\s*"\/game-dev"/);
  assert.match(roblox, /href="\/game-dev"/);
});

test('/game-dev positioning is engine-agnostic and preserves bilingual metadata', () => {
  for (const lang of ['en', 'es']) {
    assert.ok(gameDevMeta[lang].title);
    assert.ok(gameDevMeta[lang].intro);
    assert.doesNotMatch(gameDevMeta[lang].title, /Godot/i);
  }
  assert.match(page, /FeaturedGameProject/);
  assert.match(page, /href="\/roblox-gamedev"/);
});

test('all featured game dev projects have valid bilingual copy, repos, and local media files', () => {
  assert.ok(gameDevProjects.length >= 1);
  for (const project of gameDevProjects) {
    assert.ok(project.id && project.engine && project.language);
    assert.match(project.repoUrl, /^https:\/\/github\.com\/PapLion\/Godot-Scripting-Work/);
    for (const lang of ['en', 'es']) {
      assert.ok(project.title[lang] && project.description[lang] && project.scopeNote[lang]);
      assert.ok(project.verification[lang].length >= 1);
    }

    const demoVideo = new URL(`../public${project.mainDemo.src}`, import.meta.url);
    const demoPoster = new URL(`../public${project.mainDemo.poster}`, import.meta.url);
    assert.ok(existsSync(demoVideo), `missing ${project.mainDemo.src}`);
    assert.ok(existsSync(demoPoster), `missing ${project.mainDemo.poster}`);

    for (const clip of project.clips ?? []) {
      const clipVideo = new URL(`../public${clip.src}`, import.meta.url);
      const clipPoster = new URL(`../public${clip.poster}`, import.meta.url);
      assert.ok(existsSync(clipVideo), `missing ${clip.src}`);
      assert.ok(existsSync(clipPoster), `missing ${clip.poster}`);
      assert.ok(clip.title.en && clip.title.es);
    }
  }
});

test('video delivery avoids eager downloading of secondary clips and autoplay with audio', () => {
  assert.match(featured, /preload="metadata"/);
  assert.match(featured, /preload="none"/);
  assert.match(featured, /loading="lazy"/);
  assert.match(featured, /muted/);
  assert.doesNotMatch(featured, /autoplay/i);
  assert.doesNotMatch(featured, /View Source on GitHub|Architecture Docs/);
});
