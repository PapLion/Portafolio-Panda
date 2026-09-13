import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const backgroundPath = new URL('../src/components/SpaceBackground.vue', import.meta.url);

test('background uses movement impulses instead of cursor attraction', () => {
  const source = readFileSync(backgroundPath, 'utf8');

  assert.match(source, /MOUSE_IMPULSE_FORCE/);
  assert.match(source, /MOUSE_VELOCITY_DECAY/);
  assert.match(source, /mouse\.vx/);
  assert.match(source, /mouse\.vy/);
  assert.doesNotMatch(source, /MOUSE_REPEL_FORCE/);
  assert.doesNotMatch(source, /MOUSE_ATTRACTION_FORCE/);
});

test('background keeps inertia and settles with viscous damping', () => {
  const source = readFileSync(backgroundPath, 'utf8');

  assert.match(source, /VISCOSITY/);
  assert.match(source, /RETURN_FORCE/);
  assert.match(source, /falloff/);
  assert.doesNotMatch(source, /ctx\.arc\(mouse\.x, mouse\.y/);
});

test('mobile touch feeds the same impulse field without blocking page scroll', () => {
  const source = readFileSync(backgroundPath, 'utf8');

  assert.match(source, /function handleTouchStart/);
  assert.match(source, /function handleTouchMove/);
  assert.match(source, /function handleTouchEnd/);
  assert.match(source, /event\.touches\[0\]/);
  assert.match(source, /addEventListener\('touchstart', handleTouchStart, \{ passive: true \}\)/);
  assert.match(source, /addEventListener\('touchmove', handleTouchMove, \{ passive: true \}\)/);
  assert.match(source, /addEventListener\('touchend', handleTouchEnd, \{ passive: true \}\)/);
  assert.doesNotMatch(source, /preventDefault\(/);
});
