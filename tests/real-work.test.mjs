import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const appPath = new URL('../src/App.vue', import.meta.url);
const componentPath = new URL('../src/components/RealWork.vue', import.meta.url);

test('portfolio adds the RealWork section without replacing Projects', () => {
  const app = readFileSync(appPath, 'utf8');
  assert.match(app, /<Projects\s*\/>/);
  assert.ok(existsSync(componentPath), 'RealWork.vue should exist');
  assert.match(app, /import RealWork from '\.\/components\/RealWork\.vue'/);
  assert.match(app, /<RealWork\s*\/>/);
});

test('real work section highlights BloxTop and Roblox while keeping evidence slots data-driven', () => {
  assert.ok(existsSync(componentPath), 'RealWork.vue should exist');
  const source = readFileSync(componentPath, 'utf8');
  assert.match(source, /BloxTop/);
  assert.match(source, /Roblox/);
  assert.match(source, /testimonials\.length/);
  assert.match(source, /project\.media\?\.length/);
});
