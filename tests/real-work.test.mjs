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

test('dedicated Roblox/Game Dev page presents systems as experience areas without GitHub links', () => {
  assert.ok(existsSync(robloxPagePath), 'RobloxGameDev.vue should exist');
  const source = readFileSync(robloxPagePath, 'utf8');

  assert.match(source, /First-Person Shooter Combat/);
  assert.match(source, /Advanced NPC & AI Systems/);
  assert.match(source, /Cars & Aircraft/);
  assert.match(source, /Quick-Time Events/);
  assert.match(source, /Narrative & Dialogue Systems/);
  assert.match(source, /Simulator Systems/);
  assert.match(source, /Fighting Game Combat/);
  assert.match(source, /Game Development Experience/);
  assert.match(source, /Experiencia en desarrollo/);
  assert.match(source, /caseStudies/);
  assert.match(source, /activeStudy\.media\?\.length/);
  assert.doesNotMatch(source, /github\.com/i);
  assert.doesNotMatch(source, /Roblox-Scripting-Work/);
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


test('flagship project appears before My Knowledge on the home page', () => {
  const app = readFileSync(appPath, 'utf8');
  const flagshipIndex = app.indexOf('<RealWork />');
  const knowledgeIndex = app.indexOf('<Skills />');

  assert.ok(flagshipIndex !== -1, 'RealWork should render on home');
  assert.ok(knowledgeIndex !== -1, 'Skills should render on home');
  assert.ok(flagshipIndex < knowledgeIndex, 'Flagship Project should appear before My Knowledge');
});


test('Roblox/Game Dev experience areas are selectable without numbering or implied order', () => {
  const source = readFileSync(robloxPagePath, 'utf8');

  assert.match(source, /activeIndex/);
  assert.match(source, /activeStudy/);
  assert.match(source, /selectStudy\(index\)/);
  assert.match(source, /aria-live="polite"/);
  assert.doesNotMatch(source, /nextStudy/);
  assert.doesNotMatch(source, /previousStudy/);
  assert.doesNotMatch(source, /activeIndex \+ 1/);
  assert.doesNotMatch(source, /String\(activeIndex \+ 1\)/);
  assert.doesNotMatch(source, /String\(index \+ 1\)/);
});


test('experience selector uses portfolio-styled scrollbar on compact screens', () => {
  const source = readFileSync(robloxPagePath, 'utf8');

  assert.match(source, /experience-selector/);
  assert.match(source, /scrollbar-width:\s*thin/);
  assert.match(source, /scrollbar-color:/);
  assert.match(source, /::-webkit-scrollbar/);
  assert.match(source, /::-webkit-scrollbar-thumb/);
  assert.match(source, /::-webkit-scrollbar-track/);
});


test('Roblox/Game Dev page leads with a compact paid-client flagship backed by six public evidence assets', () => {
  const source = readFileSync(robloxPagePath, 'utf8');
  const assetPaths = [
    '/images/roblox/flagship/npc-production-map.webp',
    '/images/roblox/flagship/surrender-arrest.webp',
    '/images/roblox/flagship/fps-combat.webp',
    '/images/roblox/flagship/weapon-optics-hud.webp',
    '/images/roblox/flagship/ragdoll-weapon-drop.webp',
    '/images/roblox/flagship/studio-workflow.webp',
  ];

  assert.match(source, /Flagship Client Project/);
  assert.match(source, /Adaptive Tactical AI & Combat Systems/);
  assert.match(source, /Full-stack Roblox Game Developer/);
  assert.match(source, /Paid client work/);
  assert.match(source, /flagshipAreas/);
  assert.match(source, /flagshipEvidence/);
  assert.match(source, /flagshipPrimaryEvidence/);
  assert.match(source, /flagshipSecondaryEvidence/);
  assert.match(source, /flagship-evidence-strip/);
  assert.doesNotMatch(source, /activeEvidenceIndex/);
  assert.doesNotMatch(source, /activeEvidence/);
  assert.doesNotMatch(source, /selectEvidence\(index\)/);
  assert.doesNotMatch(source, /previousEvidence/);
  assert.doesNotMatch(source, /nextEvidence/);
  assert.match(source, /Development evidence/);
  assert.match(source, /exceeded my expectations/i);
  assert.doesNotMatch(source, /<details/);
  assert.doesNotMatch(source, /<summary/);

  for (const assetPath of assetPaths) {
    assert.match(source, new RegExp(assetPath.replaceAll('/', '\\/')));
  }

  assert.doesNotMatch(source, /robloxFlagshipMedia/);
  assert.doesNotMatch(source, /data:image\/webp;base64,/);
  assert.doesNotMatch(source, /pdadraJb20o/i);
  assert.doesNotMatch(source, /1,?000\s+Robux/i);
});
