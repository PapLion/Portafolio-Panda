<template>
  <div class="project-gallery">
    <div class="gallery-strip" role="list" :aria-label="label">
      <button
        v-for="(shot, index) in shots"
        :key="shot.id"
        type="button"
        role="listitem"
        class="gallery-thumb"
        :aria-label="`${openLabel}: ${shot.caption}`"
        @click="open(index)"
      >
        <img
          :src="thumb(shot)"
          :alt="shot.caption"
          :width="360"
          :height="779"
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
import { nextTick, onBeforeUnmount, ref } from 'vue';
import { ChevronLeft, ChevronRight, X } from 'lucide-vue-next';

const props = defineProps({
  shots: { type: Array, required: true }, // [{ id, caption }]
  basePath: { type: String, required: true }, // e.g. /images/pucket
  label: { type: String, default: 'Screenshots' },
  openLabel: { type: String, default: 'Enlarge' },
  prevLabel: { type: String, default: 'Previous' },
  nextLabel: { type: String, default: 'Next' },
  closeLabel: { type: String, default: 'Close' },
});

const active = ref(null);
const closeRef = ref(null);
let opener = null;

const thumb = (s) => `${props.basePath}/${s.id}-360.webp`;
const large = (s) => `${props.basePath}/${s.id}-900.webp`;

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
.gallery-thumb:hover,
.gallery-thumb:focus-visible {
  border-color: #fff;
}
.gallery-thumb img {
  display: block;
  width: 100%;
  height: auto;
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
