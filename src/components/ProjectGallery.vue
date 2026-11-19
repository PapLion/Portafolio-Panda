<template>
  <div class="project-gallery">
    <!-- grid: captioned tiles (component libraries); a `span` of 2 or 3 widens a tile on larger screens -->
    <ul v-if="layout === 'grid'" class="gallery-grid" :aria-label="label">
      <li
        v-for="(shot, i) in shots"
        :key="shot.id"
        class="gallery-cell"
        :class="shot.span === 3 ? 'gallery-cell--3' : shot.span === 2 ? 'gallery-cell--2' : ''"
      >
        <button
          type="button"
          class="gallery-tile"
          :aria-label="`${openLabel}: ${shot.caption}`"
          @click="open(i)"
        >
          <img
            :src="thumb(shot)"
            :srcset="`${thumb(shot)} ${shot.thumbW ?? 360}w, ${large(shot)} ${shot.largeW ?? 900}w`"
            :sizes="shot.span ? '(min-width: 1024px) 760px, 92vw' : '(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw'"
            :alt="shot.caption"
            :width="shot.thumbW ?? 360"
            :height="shot.thumbH ?? 779"
            loading="lazy"
            decoding="async"
          />
        </button>
        <p v-if="shot.title" class="gallery-cell-title">{{ shot.title }}</p>
        <p v-if="shot.note" class="gallery-cell-note">{{ shot.note }}</p>
      </li>
    </ul>

    <button
      v-if="layout !== 'grid' && featured && shots.length"
      type="button"
      class="gallery-featured"
      :aria-label="`${openLabel}: ${shots[0].caption}`"
      @click="open(0)"
    >
      <img
        :src="large(shots[0])"
        :srcset="`${thumb(shots[0])} ${shots[0].thumbW ?? 360}w, ${large(shots[0])} ${shots[0].largeW ?? 900}w`"
        sizes="(min-width: 1024px) 640px, 92vw"
        :alt="shots[0].caption"
        :width="shots[0].largeW ?? 900"
        :height="shots[0].largeH ?? 1948"
        loading="lazy"
        decoding="async"
      />
    </button>

    <div v-if="layout !== 'grid'" class="gallery-strip" :class="{ 'mt-3': featured }" role="list" :aria-label="label">
      <button
        v-for="(shot, i) in stripShots"
        :key="shot.id"
        type="button"
        role="listitem"
        class="gallery-thumb"
        :class="{ 'gallery-thumb--wide': shot.wide }"
        :aria-label="`${openLabel}: ${shot.caption}`"
        @click="open(i + stripOffset)"
      >
        <img
          :src="thumb(shot)"
          :alt="shot.caption"
          :width="shot.thumbW ?? 360"
          :height="shot.thumbH ?? 779"
          loading="lazy"
          decoding="async"
        />
      </button>
    </div>

    <Teleport to="body">
      <div
        v-if="active !== null"
        class="gallery-dialog fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col"
        role="dialog"
        aria-modal="true"
        :aria-label="label"
        @click.self="close"
        @keydown="onKey"
      >
        <div class="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/15" @click.self="close">
          <p class="text-xs text-white/60 truncate" aria-live="polite">
            {{ active + 1 }} / {{ shots.length }} · {{ shots[active].caption }}
          </p>
          <div class="flex items-center gap-1.5 shrink-0">
            <button type="button" class="icon-btn" :aria-label="prevLabel" @click="step(-1)">
              <ChevronLeft class="w-4 h-4" aria-hidden="true" />
            </button>
            <button type="button" class="icon-btn" :aria-label="nextLabel" @click="step(1)">
              <ChevronRight class="w-4 h-4" aria-hidden="true" />
            </button>
            <button ref="closeRef" type="button" class="icon-btn ml-1" :aria-label="closeLabel" @click="close">
              <X class="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div class="flex-1 min-h-0 flex items-center justify-center p-3" @click.self="close">
          <img
            :key="shots[active].id"
            :src="large(shots[active])"
            :alt="shots[active].caption"
            class="max-h-full max-w-full object-contain"
            decoding="async"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue';
import { ChevronLeft, ChevronRight, X } from 'lucide-vue-next';

const props = defineProps({
  shots: { type: Array, required: true }, // [{ id, caption }]
  basePath: { type: String, required: true }, // e.g. /images/pucket
  featured: { type: Boolean, default: false },
  layout: { type: String, default: 'strip' }, // 'strip' (thumbnail row) | 'grid' (captioned tiles)
  label: { type: String, default: 'Screenshots' },
  openLabel: { type: String, default: 'Enlarge' },
  prevLabel: { type: String, default: 'Previous' },
  nextLabel: { type: String, default: 'Next' },
  closeLabel: { type: String, default: 'Close' },
});

const active = ref(null);
const closeRef = ref(null);
let opener = null;

const stripOffset = computed(() => (props.featured ? 1 : 0));
const stripShots = computed(() => props.shots.slice(stripOffset.value));
const thumb = (s) => `${props.basePath}/${s.id}-${s.thumbW ?? 360}.webp`;
const large = (s) => `${props.basePath}/${s.id}-${s.largeW ?? 900}.webp`;

function lock(on) {
  if (typeof document !== 'undefined') document.body.style.overflow = on ? 'hidden' : '';
}

async function open(index) {
  opener = document.activeElement;
  active.value = index;
  lock(true);
  await nextTick();
  closeRef.value?.focus();
}

function close() {
  active.value = null;
  lock(false);
  opener?.focus?.();
}

function step(delta) {
  const n = props.shots.length;
  active.value = (active.value + delta + n) % n;
}

function onKey(event) {
  if (event.key === 'Escape') close();
  else if (event.key === 'ArrowLeft') step(-1);
  else if (event.key === 'ArrowRight') step(1);
}

onBeforeUnmount(() => lock(false));
</script>

<style scoped>
.gallery-strip {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-snap-type: x proximity;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.4) transparent;
}
.gallery-thumb {
  flex: 0 0 auto;
  width: 9.5rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: #0a0a0a;
  padding: 0;
  cursor: zoom-in;
  scroll-snap-align: start;
  transition: border-color 0.2s;
}
@media (min-width: 640px) {
  .gallery-thumb {
    width: 11rem;
  }
}
.gallery-thumb--wide {
  width: 14rem;
}
@media (min-width: 640px) {
  .gallery-thumb--wide {
    width: 16rem;
  }
}
.gallery-featured {
  display: block;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: #0a0a0a;
  padding: 0;
  cursor: zoom-in;
}
.gallery-featured:hover,
.gallery-featured:focus-visible {
  border-color: #fff;
}
.gallery-featured img {
  display: block;
  width: 100%;
  height: auto;
}
.gallery-thumb:hover,
.gallery-thumb:focus-visible {
  border-color: #fff;
}
.gallery-thumb img {
  display: block;
  width: 100%;
  height: auto;
}
.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.gallery-cell {
  min-width: 0;
}
.gallery-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: #0a0a0a;
  padding: 0.6rem;
  cursor: zoom-in;
  transition: border-color 0.2s;
}
.gallery-tile:hover,
.gallery-tile:focus-visible {
  border-color: #fff;
}
.gallery-tile img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}
.gallery-cell-title {
  margin-top: 0.55rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
}
.gallery-cell-note {
  margin-top: 0.2rem;
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.5);
}
@media (min-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  /* fixed tile heights so every row lines up; wide tiles span the row */
  .gallery-tile {
    aspect-ratio: 16 / 10;
  }
  .gallery-cell--2,
  .gallery-cell--3 {
    grid-column: span 2;
  }
  .gallery-cell--2 .gallery-tile,
  .gallery-cell--3 .gallery-tile {
    aspect-ratio: 33 / 10;
  }
}
@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .gallery-cell--3 {
    grid-column: span 3;
  }
  .gallery-cell--3 .gallery-tile {
    aspect-ratio: 50 / 10;
  }
}
.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #fff;
  background: transparent;
  cursor: pointer;
}
.icon-btn:hover {
  background: #fff;
  color: #000;
}
</style>
