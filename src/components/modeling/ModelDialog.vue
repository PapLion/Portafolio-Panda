<template>
  <Teleport to="body">
    <div
      v-if="model"
      ref="rootRef"
      class="model-dialog fixed inset-0 z-[100] overflow-y-auto bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      @click.self="emit('close')"
    >
      <div class="min-h-full flex items-start lg:items-center justify-center p-3 sm:p-6" @click.self="emit('close')">
        <article class="model-sheet w-full max-w-6xl border border-white/30 bg-black">
          <!-- top bar -->
          <div class="flex items-center justify-between gap-3 border-b border-white/15 px-3 sm:px-5 py-2.5">
            <p class="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/45 truncate">
              <span class="hidden sm:inline">{{ categoryLabel }} · </span>{{ position }}
            </p>
            <div class="flex items-center gap-1.5 shrink-0">
              <button type="button" class="icon-btn" :aria-label="copy.prevModel" @click="emit('navigate', -1)">
                <ChevronLeft class="w-4 h-4" aria-hidden="true" />
              </button>
              <button type="button" class="icon-btn" :aria-label="copy.nextModel" @click="emit('navigate', 1)">
                <ChevronRight class="w-4 h-4" aria-hidden="true" />
              </button>
              <button ref="closeRef" type="button" class="icon-btn ml-1" :aria-label="copy.close" @click="emit('close')">
                <X class="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
            <!-- media -->
            <div class="p-3 sm:p-5 lg:border-r lg:border-white/15 min-w-0">
              <button
                type="button"
                class="media-frame group block w-full cursor-zoom-in"
                :aria-label="`${copy.enlarge}: ${activeAlt}`"
                @click="openZoom"
              >
                <img
                  :key="activeImage.src"
                  :src="activeImage.src"
                  :srcset="activeImage.srcset"
                  :sizes="activeView.shape === 'wide' ? '(min-width: 1024px) 720px, 100vw' : '(min-width: 1024px) 620px, 100vw'"
                  :width="activeImage.width"
                  :height="activeImage.height"
                  :alt="activeAlt"
                  class="media-img mx-auto block w-full object-contain"
                  :class="activeView.shape === 'wide' ? 'aspect-[3/2]' : 'aspect-square max-h-[68vh] lg:max-h-[72vh] w-auto'"
                  decoding="async"
                />
                <span class="zoom-hint" aria-hidden="true">
                  <Maximize2 class="w-3.5 h-3.5" />
                  {{ copy.enlarge }}
                </span>
              </button>

              <div class="mt-3 flex items-start justify-between gap-3">
                <p class="text-xs text-white/55">{{ activeView.label[lang] }}</p>
                <p class="text-[10px] sm:text-xs text-white/30 shrink-0">{{ viewIndex + 1 }} / {{ model.views.length }}</p>
              </div>

              <div v-if="model.views.length > 1" class="view-strip mt-3" role="group" :aria-label="copy.views">
                <button
                  v-for="(item, index) in model.views"
                  :key="item.id"
                  type="button"
                  class="view-thumb"
                  :class="[item.shape === 'wide' ? 'aspect-[3/2] w-[7.5rem]' : 'aspect-square w-20', index === viewIndex ? 'is-active' : '']"
                  :aria-label="item.label[lang]"
                  :aria-pressed="index === viewIndex"
                  @click="viewIndex = index"
                >
                  <img :src="imageFor(model, item, 'sm').src" alt="" class="w-full h-full object-cover" loading="lazy" decoding="async" />
                </button>
              </div>
            </div>

            <!-- info -->
            <div class="p-4 sm:p-6 min-w-0">
              <h2 :id="titleId" class="text-2xl sm:text-3xl font-bold leading-tight">{{ model.name[lang] }}</h2>
              <p class="mt-3 text-sm text-white/70 leading-relaxed">{{ model.summary[lang] }}</p>

              <dl v-if="model.stats" class="spec-list mt-6">
                <div>
                  <dt>{{ copy.specs.tris }}</dt>
                  <dd>
                    {{ format(model.stats.tris) }}
                    <span v-if="model.triNote" class="block text-[11px] text-white/40 mt-0.5">{{ model.triNote[lang] }}</span>
                  </dd>
                </div>
                <div>
                  <dt>{{ copy.specs.parts }}</dt>
                  <dd>{{ model.stats.parts }}</dd>
                </div>
                <div>
                  <dt>{{ copy.specs.materials }}</dt>
                  <dd>{{ model.stats.materials }}</dd>
                </div>
                <div v-if="model.stats.bones">
                  <dt>{{ copy.specs.bones }}</dt>
                  <dd>{{ model.stats.bones }}</dd>
                </div>
                <div class="col-span-full">
                  <dt>{{ copy.specs.structure }}</dt>
                  <dd>{{ model.structure[lang] }}</dd>
                </div>
                <div class="col-span-full">
                  <dt>{{ copy.specs.textures }}</dt>
                  <dd>{{ sharedSpecs.textures[lang] }}</dd>
                </div>
                <div class="col-span-full">
                  <dt>{{ copy.specs.format }}</dt>
                  <dd>{{ sharedSpecs.format[lang] }}</dd>
                </div>
              </dl>

              <div v-if="included.length" class="mt-6">
                <p class="label">{{ copy.includes }}</p>
                <ul class="mt-2 flex flex-wrap gap-2">
                  <li v-for="item in included" :key="item.slug">
                    <button
                      type="button"
                      class="border border-white/25 px-2.5 py-1 text-xs text-white/70 hover:border-white hover:text-white transition-colors"
                      @click="emit('open', item.slug)"
                    >
                      {{ item.name[lang] }}
                    </button>
                  </li>
                </ul>
              </div>

              <div v-if="model.notes?.[lang]?.length" class="mt-6">
                <p class="label">{{ model.kind ? copy.notes : copy.limitations }}</p>
                <ul class="mt-2 space-y-2">
                  <li v-for="note in model.notes[lang]" :key="note" class="flex gap-2.5 text-xs sm:text-sm text-white/60 leading-relaxed">
                    <span class="mt-[0.55rem] block h-1 w-1 shrink-0 bg-white/60" aria-hidden="true"></span>
                    <span>{{ note }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- enlarged image -->
      <div
        v-if="zoomed"
        class="fixed inset-0 z-[110] bg-black flex items-center justify-center cursor-zoom-out"
        role="presentation"
        @click="closeZoom"
      >
        <img
          :src="activeImage.full"
          :alt="activeAlt"
          class="max-w-full max-h-full w-auto h-auto object-contain"
          decoding="async"
        />
        <button
          ref="zoomCloseRef"
          type="button"
          class="icon-btn absolute top-3 right-3"
          :aria-label="copy.closeEnlarged"
          @click.stop="closeZoom"
        >
          <X class="w-4 h-4" aria-hidden="true" />
        </button>
        <p class="absolute bottom-3 left-3 right-3 text-center text-[11px] text-white/45 pointer-events-none">
          {{ activeView.label[lang] }} · {{ copy.zoomHint }}
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-vue-next';
import { categories, findModel, formatCount, imageFor, sharedSpecs } from '../../data/models3d.js';

const props = defineProps({
  model: { type: Object, default: null },
  lang: { type: String, default: 'en' },
  copy: { type: Object, required: true },
  index: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
});
const emit = defineEmits(['close', 'navigate', 'open']);

const rootRef = ref(null);
const closeRef = ref(null);
const zoomCloseRef = ref(null);
const viewIndex = ref(0);
const zoomed = ref(false);
const titleId = 'model-dialog-title';

const activeView = computed(() => props.model?.views[viewIndex.value] ?? props.model?.views[0]);
const activeImage = computed(() => imageFor(props.model, activeView.value, 'md'));
const activeAlt = computed(() => `${props.model.name[props.lang]} — ${activeView.value.label[props.lang]}`);
const categoryLabel = computed(() => categories.find((c) => c.id === props.model?.category)?.label[props.lang] ?? '');
const position = computed(() => `${props.index + 1} / ${props.total}`);
const included = computed(() => (props.model?.includes ?? []).map(findModel).filter(Boolean));

const format = (n) => formatCount(n, props.lang);

const stepView = (delta) => {
  const count = props.model.views.length;
  viewIndex.value = (viewIndex.value + delta + count) % count;
};

const openZoom = async () => {
  zoomed.value = true;
  await nextTick();
  zoomCloseRef.value?.focus();
};

const closeZoom = async () => {
  zoomed.value = false;
  await nextTick();
  closeRef.value?.focus();
};

const focusables = () => Array.from(
  rootRef.value?.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])') ?? [],
).filter((el) => el.offsetParent !== null && (!zoomed.value || el === zoomCloseRef.value));

const onKeydown = (event) => {
  if (!props.model) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    if (zoomed.value) closeZoom();
    else emit('close');
  } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    if (event.target?.closest?.('input, textarea')) return;
    event.preventDefault();
    stepView(event.key === 'ArrowRight' ? 1 : -1);
  } else if (event.key === 'Tab') {
    const items = focusables();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    } else if (!rootRef.value?.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
    }
  }
};

const lockScroll = (locked) => {
  if (typeof document === 'undefined') return;
  document.documentElement.style.overflow = locked ? 'hidden' : '';
};

watch(
  () => props.model?.slug,
  async (slug, previous) => {
    viewIndex.value = 0;
    zoomed.value = false;
    lockScroll(Boolean(slug));
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', onKeydown);
      if (slug) document.addEventListener('keydown', onKeydown);
    }
    if (!slug) return;
    await nextTick();
    // first open, or the focused control disappeared with the previous model
    if (!previous || !rootRef.value?.contains(document.activeElement)) closeRef.value?.focus();
  },
  { immediate: true },
);

onUnmounted(() => {
  lockScroll(false);
  document.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped>
.model-sheet {
  box-shadow: 8px 8px 0 rgba(255, 255, 255, 0.08);
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  width: 2.25rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
}

.icon-btn:hover {
  background: #fff;
  color: #000;
}

.media-frame {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: #0b0b0b;
  padding: 3px;
  clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px);
}

.zoom-hint {
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(0, 0, 0, 0.72);
  padding: 0.3rem 0.55rem;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  opacity: 0.75;
  transition: opacity 160ms ease;
}

.media-frame:hover .zoom-hint,
.media-frame:focus-visible .zoom-hint {
  opacity: 1;
}

.view-strip {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.5) rgba(255, 255, 255, 0.06);
}

.view-thumb {
  flex: 0 0 auto;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.18);
  opacity: 0.6;
  transition: opacity 160ms ease, border-color 160ms ease;
}

.view-thumb:hover,
.view-thumb.is-active {
  opacity: 1;
  border-color: #fff;
}

.label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: rgba(255, 255, 255, 0.42);
}

.spec-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.spec-list > div {
  padding: 0.7rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.spec-list dt {
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.42);
}

.spec-list dd {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.45;
}

button:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}
</style>
