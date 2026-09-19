import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const appPath = new URL('../src/App.vue', import.meta.url);
const componentPath = new URL('../src/components/RealWork.vue', import.meta.url);
const robloxPagePath = new URL('../src/pages/RobloxGameDev.vue', import.meta.url);
const vercelPath = new URL('../vercel.json', import.meta.url);

test('portfolio keeps the existing Projects and RealWork sections on the home route', () => {
  const app = readFileSync(appPath, 'utf8');
  assert.match(app, /<Projects\s*\/>/);
  assert.ok(existsSync(componentPath), 'RealWork.vue should exist');
  assert.match(app, /import RealWork from '\.\/components\/RealWork\.vue'/);
  assert.match(app, /<RealWork\s*\/>/);
});

test('home real-work section keeps BloxTop but moves Roblox details to a dedicated route', () => {
  const source = readFileSync(componentPath, 'utf8');
  assert.match(source, /BloxTop/);
  assert.match(source, /href="\/roblox-gamedev"/);
  assert.doesNotMatch(source, /Roblox Gameplay & NPC Systems/);
  assert.doesNotMatch(source, /Sistemas de Gameplay y NPCs en Roblox/);
});

test('app renders a dedicated RobloxGameDev page for /roblox-gamedev', () => {
  const app = readFileSync(appPath, 'utf8');
  assert.match(app, /import RobloxGameDev from '\.\/pages\/RobloxGameDev\.vue'/);
  assert.match(app, /isRobloxGameDevRoute/);
  assert.match(app, /\/roblox-gamedev/);
  assert.match(app, /<RobloxGameDev\b[^>]*\/>/);
  assert.ok(existsSync(robloxPagePath), 'RobloxGameDev.vue should exist');
});

test('dedicated Roblox/Game Dev page contains public evidence and data-driven media slots', () => {
  assert.ok(existsSync(robloxPagePath), 'RobloxGameDev.vue should exist');
  const source = readFileSync(robloxPagePath, 'utf8');
  assert.match(source, /Roblox-Scripting-Work/);
  assert.match(source, /media\?\.length/);
  assert.match(source, /testimonials\.length/);
});

test('Vercel rewrites direct /roblox-gamedev visits to the SPA entry point', () => {
  const config = JSON.parse(readFileSync(vercelPath, 'utf8'));
  assert.ok(
    config.rewrites?.some(
      (rewrite) => rewrite.source === '/roblox-gamedev' && rewrite.destination === '/index.html',
    ),
    'vercel.json should rewrite /roblox-gamedev to /index.html',
  );
});


test('home positions BloxTop as concise flagship work and keeps Roblox subtle', () => {
  const source = readFileSync(componentPath, 'utf8');
  const navbar = readFileSync(new URL('../src/components/Navbar.vue', import.meta.url), 'utf8');

  assert.match(source, /Flagship Project/);
  assert.match(source, /Proyecto insignia/);
  assert.match(source, /Production client project/);
  assert.doesNotMatch(source, /Playwright/);
  assert.doesNotMatch(source, /Work shipped outside the portfolio/);
  assert.doesNotMatch(source, /Trabajo publicado fuera del portafolio/);
  assert.doesNotMatch(source, /actively maintain/i);
  assert.doesNotMatch(source, /Ongoing engineering and maintenance/i);

  assert.match(navbar, /href:\s*['"]\/roblox-gamedev['"]/);
  assert.match(navbar, /Roblox \/ Game Dev/);

  assert.match(source, /Looking for Roblox \/ Game Dev\?/);
  assert.match(source, /¿Buscas Roblox \/ Game Dev\?/);
  assert.doesNotMatch(source, /robloxRouteDescription/);
});
