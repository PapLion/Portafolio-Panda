#!/usr/bin/env node
// Builds the optimized WebP images for the 3D modeling gallery from the original renders.
// The originals stay in the Blender project (never copied into the site).
//
//   RENDERS_DIR=~/path/to/Roblox_Props_Portfolio/renders node scripts/build-3d-images.mjs
//
// Requires ffmpeg with libwebp. Output: public/images/3d/<slug>/<view>-<width>.webp
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { IMAGE_WIDTHS, models } from '../src/data/models3d.js';

const rendersDir = resolve(
  (process.env.RENDERS_DIR ?? '~/Downloads/job/Roblox_Props_Portfolio/renders').replace(/^~/, homedir()),
);
const outRoot = resolve(new URL('../public/images/3d', import.meta.url).pathname);

if (!existsSync(rendersDir)) {
  console.error(`Renders folder not found: ${rendersDir}`);
  process.exit(1);
}

rmSync(outRoot, { recursive: true, force: true });
let count = 0;
let bytes = 0;

for (const model of models) {
  const dir = join(outRoot, model.slug);
  mkdirSync(dir, { recursive: true });
  for (const view of model.views) {
    const source = join(rendersDir, view.src);
    if (!existsSync(source)) throw new Error(`Missing render: ${source}`);
    const widths = IMAGE_WIDTHS[view.shape] ?? IMAGE_WIDTHS.square;
    const ratio = view.shape === 'wide' ? 2 / 3 : 1;
    for (const width of widths) {
      const height = Math.round(width * ratio);
      const filters = [];
      if (view.crop) filters.push(`crop=${view.crop.w}:${view.crop.h}:${view.crop.x}:${view.crop.y}`);
      // cover-fit to the exact target box, then lanczos downscale
      filters.push(`scale=${width}:${height}:force_original_aspect_ratio=increase:flags=lanczos`);
      filters.push(`crop=${width}:${height}`);
      const out = join(dir, `${view.id}-${width}.webp`);
      execFileSync('ffmpeg', [
        '-v', 'error', '-y', '-i', source,
        '-vf', filters.join(','),
        '-c:v', 'libwebp', '-quality', width <= 800 ? '78' : '82', '-compression_level', '6',
        '-preset', 'picture', '-frames:v', '1', out,
      ]);
      count += 1;
      bytes += statSync(out).size;
    }
  }
}

console.log(`${count} images, ${(bytes / 1024 / 1024).toFixed(1)} MB -> ${outRoot}`);
