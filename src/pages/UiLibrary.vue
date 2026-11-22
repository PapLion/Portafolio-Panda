<template>
  <section class="min-h-screen py-8 sm:py-10 md:py-12 bg-black/80" aria-labelledby="ui-title">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 mb-7 sm:mb-9">
        <a href="/" class="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors w-fit">
          <span aria-hidden="true">←</span><span>{{ copy.back }}</span>
        </a>
        <div class="flex items-center gap-4 sm:gap-5">
          <span class="hidden md:inline text-xs uppercase tracking-[0.3em] text-white/40">Dani.Dev / UI</span>
          <a href="/3d-modeling" class="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">{{ copy.modeling }} →</a>
          <LanguageSelector />
        </div>
      </div>

      <header class="grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-7 lg:gap-10 items-start border-t border-white/20 pt-6 sm:pt-8">
        <div class="lg:pt-1">
          <p class="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/40">{{ copy.eyebrow }}</p>
          <h1 id="ui-title" class="mt-3 text-3xl sm:text-4xl md:text-[2.6rem] font-bold manga-text leading-[1.08]">
            {{ copy.title }}<span class="block text-white/80 text-xl sm:text-2xl md:text-[1.7rem] mt-2 font-semibold">{{ copy.subtitle }}</span>
          </h1>
          <p class="mt-5 text-sm sm:text-base text-white/72 leading-relaxed">{{ copy.intro }}</p>
          <dl class="hero-facts mt-6">
            <div><dt>{{ copy.facts.boards }}</dt><dd>{{ uiBoards.length }}</dd></div>
            <div><dt>{{ copy.facts.families }}</dt><dd>{{ uiCategories.length }}</dd></div>
            <div><dt>{{ copy.facts.tools }}</dt><dd>Roblox Studio · Luau</dd></div>
          </dl>
          <div class="mt-7 flex flex-wrap gap-3">
            <a href="#gallery" class="cta-primary">{{ copy.ctaGallery }}</a>
            <a href="/#contact" class="cta-secondary">{{ copy.ctaContact }}</a>
          </div>
        </div>
        <div class="min-w-0">
          <button type="button" class="cover-shot block w-full cursor-zoom-in" :aria-label="`${copy.open}: ${uiHero.title[lang]}`" @click="open(-1, $event)">
            <img v-bind="uiImage('hero')" sizes="(min-width: 1024px) 680px, 100vw" :alt="uiHero.title[lang]" class="w-full aspect-[16/10] object-cover bg-black" fetchpriority="high" decoding="async" />
          </button>
          <div class="featured-strip mt-3">
            <button v-for="item in featured" :key="item.id" type="button" class="featured-shot" :aria-label="`${copy.open}: ${item.title[lang]}`" @click="open(uiBoards.indexOf(item), $event)">
              <img :src="`${UI_PATH}/${item.id}-640.webp`" width="640" height="400" alt="" class="w-full h-full object-cover" loading="lazy" decoding="async" />
            </button>
          </div>
        </div>
      </header>

      <section class="mt-14 sm:mt-16" aria-labelledby="families-title">
        <p class="text-xs uppercase tracking-[0.3em] text-white/40">{{ copy.familiesEyebrow }}</p>
        <h2 id="families-title" class="mt-2 text-2xl sm:text-3xl font-bold">{{ copy.familiesTitle }}</h2>
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button v-for="cat in categoryCards" :key="cat.id" type="button" class="category-card text-left" @click="select(cat.id, true)">
            <img :src="`${UI_PATH}/${cat.preview}-640.webp`" width="640" height="400" alt="" class="w-full aspect-[16/10] object-cover" loading="lazy" decoding="async" />
            <span class="block mt-3 text-[10px] uppercase tracking-[0.22em] text-white/40">{{ cat.count }} {{ copy.boardsWord }}</span>
            <span class="block mt-1 text-base font-bold">{{ cat.label[lang] }}</span>
            <span class="block mt-1.5 text-xs text-white/60 leading-relaxed">{{ cat.blurb[lang] }}</span>
          </button>
        </div>
      </section>

      <section id="gallery" ref="galleryRef" class="mt-14 sm:mt-16 scroll-mt-6" aria-labelledby="gallery-title">
        <p class="text-xs uppercase tracking-[0.3em] text-white/40">{{ copy.galleryEyebrow }}</p>
        <h2 id="gallery-title" class="mt-2 text-2xl sm:text-3xl font-bold">{{ copy.galleryTitle }}</h2>
        <div class="filter-bar mt-5" role="group" :aria-label="copy.filterLabel">
          <button v-for="f in filters" :key="f.id" type="button" class="filter-chip" :class="active === f.id ? 'is-active' : ''" :aria-pressed="active === f.id" @click="select(f.id)">
            {{ f.label }} <span class="opacity-55">{{ f.count }}</span>
          </button>
        </div>
        <ul class="board-grid mt-5">
          <li v-for="item in visible" :key="item.id">
            <button type="button" class="board-card" :aria-label="`${copy.open}: ${item.title[lang]}`" @click="open(uiBoards.indexOf(item), $event)">
              <img v-bind="uiImage(item.id)" sizes="(min-width: 1024px) 540px, (min-width: 640px) 50vw, 100vw" alt="" class="w-full aspect-[16/10] object-cover bg-black" loading="lazy" decoding="async" />
              <span class="block px-3.5 pt-3 pb-3.5">
                <span class="block text-[10px] uppercase tracking-[0.2em] text-white/40">{{ catName(item.category) }}</span>
                <span class="block mt-1 text-sm sm:text-[0.95rem] font-semibold">{{ item.title[lang] }}</span>
                <span class="block mt-1 text-xs text-white/55 leading-relaxed">{{ item.note[lang] }}</span>
              </span>
            </button>
          </li>
        </ul>
      </section>

      <section class="mt-14 sm:mt-16 border-t border-white/20 pt-6 sm:pt-8 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 lg:gap-10" aria-labelledby="notes-title">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-white/40">{{ copy.notesEyebrow }}</p>
          <h2 id="notes-title" class="mt-2 text-2xl sm:text-3xl font-bold">{{ copy.notesTitle }}</h2>
        </div>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          <li v-for="p in copy.notes" :key="p.title" class="border-l border-white/25 pl-4">
            <p class="text-sm font-semibold">{{ p.title }}</p>
            <p class="mt-1.5 text-xs sm:text-sm text-white/60 leading-relaxed">{{ p.text }}</p>
          </li>
        </ul>
      </section>
    </div>

    <Teleport to="body">
      <div v-if="current" class="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex flex-col" role="dialog" aria-modal="true" :aria-label="current.title[lang]" @click.self="close" @keydown="onKey">
        <div class="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/15">
          <p class="text-xs text-white/65 truncate" aria-live="polite">{{ current.title[lang] }}<span v-if="current.note"> — {{ current.note[lang] }}</span></p>
          <div class="flex gap-1.5 shrink-0">
            <button type="button" class="icon-btn" :aria-label="copy.prev" @click="step(-1)">←</button>
            <button type="button" class="icon-btn" :aria-label="copy.next" @click="step(1)">→</button>
            <button ref="closeRef" type="button" class="icon-btn" :aria-label="copy.close" @click="close">✕</button>
          </div>
        </div>
        <div class="flex-1 min-h-0 flex items-center justify-center p-3" @click.self="close">
          <img :key="current.id" :src="`${UI_PATH}/${current.id}-1280.webp`" :alt="current.title[lang]" class="max-h-full max-w-full object-contain" decoding="async" />
        </div>
      </div>
    </Teleport>
  </section>
  <Footer />
</template>

<script setup>
import { computed, inject, nextTick, onMounted, onUnmounted, ref } from 'vue';
import LanguageSelector from '../components/LanguageSelector.vue';
import Footer from '../components/Footer.vue';
import { UI_PATH, uiBoards, uiCategories, uiHero, uiImage } from '../data/uiLibrary.js';

const language = inject('language', { currentLanguage: ref('en') });
const currentLanguage = language.currentLanguage ?? ref('en');
const lang = computed(() => (currentLanguage.value === 'es' ? 'es' : 'en'));

const content = {
  en: {
    back: 'Back to Dani.Dev', modeling: '3D Modeling',
    eyebrow: 'UI Engineering · Interface Component Library',
    title: 'Roblox UI Systems', subtitle: 'Components, states & layouts',
    intro: 'Interface pieces I designed and built in Roblox Studio with Luau: buttons and their states, controls, dialogs, cards, social panels, HUD widgets and notices, plus their tablet and phone variants. Every board is a real render of the working UI, shown on its own.',
    facts: { boards: 'Boards', families: 'Families', tools: 'Built with' },
    ctaGallery: 'View components', ctaContact: 'Contact', open: 'Open',
    familiesEyebrow: 'Families', familiesTitle: 'Eight component families', boardsWord: 'boards',
    galleryEyebrow: 'Gallery', galleryTitle: 'All components', filterLabel: 'Filter by family', all: 'All',
    notesEyebrow: 'Notes', notesTitle: 'Real pieces, not mockups',
    notes: [
      { title: 'Rendered in Studio', text: 'Each board places real components on a neutral background: built with the project’s UI module or cloned from the running screens.' },
      { title: 'Every state', text: 'Hover, pressed, focus, disabled and loading are real states of the same components, set the way the interface sets them.' },
      { title: 'One atlas, tinted at runtime', text: 'Cut-corner panels, slanted buttons and tags come from a single 9-slice / 3-slice atlas tinted with ImageColor3.' },
      { title: 'Responsive by layout class', text: 'Desktop, tablet and phone rearrange the pieces; touch mode swaps key hints for touch controls.' },
    ],
    prev: 'Previous', next: 'Next', close: 'Close',
  },
  es: {
    back: 'Volver a Dani.Dev', modeling: 'Modelado 3D',
    eyebrow: 'Ingeniería de UI · Librería de componentes',
    title: 'Sistemas de UI en Roblox', subtitle: 'Componentes, estados y layouts',
    intro: 'Piezas de interfaz que diseñé y construí en Roblox Studio con Luau: botones y sus estados, controles, diálogos, tarjetas, paneles sociales, widgets de HUD y avisos, con sus variantes de tablet y móvil. Cada lámina es un render real del UI funcionando, mostrado por separado.',
    facts: { boards: 'Láminas', families: 'Familias', tools: 'Hecho con' },
    ctaGallery: 'Ver componentes', ctaContact: 'Contactar', open: 'Abrir',
    familiesEyebrow: 'Familias', familiesTitle: 'Ocho familias de componentes', boardsWord: 'láminas',
    galleryEyebrow: 'Galería', galleryTitle: 'Todos los componentes', filterLabel: 'Filtrar por familia', all: 'Todo',
    notesEyebrow: 'Notas', notesTitle: 'Piezas reales, no mockups',
    notes: [
      { title: 'Renderizadas en Studio', text: 'Cada lámina coloca componentes reales sobre un fondo neutro: construidos con el módulo UI del proyecto o clonados de las pantallas en marcha.' },
      { title: 'Todos los estados', text: 'Hover, pulsado, foco, desactivado y cargando son estados reales de los mismos componentes.' },
      { title: 'Un atlas teñido en tiempo real', text: 'Paneles con esquina cortada, botones inclinados y etiquetas salen de un único atlas 9-slice / 3-slice teñido con ImageColor3.' },
      { title: 'Responsive por clase de layout', text: 'Escritorio, tablet y móvil reorganizan las piezas; el modo táctil cambia las teclas por controles táctiles.' },
    ],
    prev: 'Anterior', next: 'Siguiente', close: 'Cerrar',
  },
};
const copy = computed(() => content[lang.value]);

const featured = ['buttons-states', 'dialog-purchase', 'mission-cards', 'hud'].map((id) => uiBoards.find((x) => x.id === id));
const categoryCards = computed(() => uiCategories.map((c) => {
  const members = uiBoards.filter((x) => x.category === c.id);
  return { ...c, count: members.length, preview: members[0].id };
}));
const catName = (id) => uiCategories.find((c) => c.id === id)?.label[lang.value] ?? '';
const active = ref('all');
const filters = computed(() => [
  { id: 'all', label: copy.value.all, count: uiBoards.length },
  ...uiCategories.map((c) => ({ id: c.id, label: c.label[lang.value], count: uiBoards.filter((x) => x.category === c.id).length })),
]);
const visible = computed(() => (active.value === 'all' ? uiBoards : uiBoards.filter((x) => x.category === active.value)));
const galleryRef = ref(null);
const select = async (id, scroll = false) => {
  active.value = id;
  if (scroll) { await nextTick(); galleryRef.value?.scrollIntoView({ block: 'start' }); }
};

// lightbox (-1 = hero montage)
const index = ref(null);
const closeRef = ref(null);
let opener = null;
const current = computed(() => (index.value === null ? null : index.value === -1 ? { ...uiHero, note: null } : uiBoards[index.value]));
const open = async (i, e) => {
  opener = e?.currentTarget ?? document.activeElement;
  index.value = i;
  document.body.style.overflow = 'hidden';
  await nextTick();
  closeRef.value?.focus();
};
const close = () => { index.value = null; document.body.style.overflow = ''; opener?.focus?.(); };
const step = (d) => {
  const n = uiBoards.length;
  index.value = index.value === -1 ? 0 : (index.value + d + n) % n;
};
const onKey = (e) => {
  if (e.key === 'Escape') close();
  else if (e.key === 'ArrowLeft') step(-1);
  else if (e.key === 'ArrowRight') step(1);
};

let previousTitle = '';
onMounted(() => { previousTitle = document.title; document.title = 'Roblox UI Systems · Component Library | Dani.Dev'; });
onUnmounted(() => { document.title = previousTitle; document.body.style.overflow = ''; });
</script>

<style scoped>
.hero-facts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid rgba(255,255,255,.18); border-bottom: 1px solid rgba(255,255,255,.18); }
.hero-facts > div { padding: .75rem .75rem .75rem 0; }
.hero-facts > div + div { padding-left: .75rem; border-left: 1px solid rgba(255,255,255,.12); }
.hero-facts dt { font-size: .6rem; text-transform: uppercase; letter-spacing: .2em; color: rgba(255,255,255,.42); }
.hero-facts dd { margin-top: .3rem; font-size: .9rem; font-weight: 600; }
.cta-primary, .cta-secondary { display: inline-flex; align-items: center; border: 2px solid #fff; padding: .55rem 1rem; font-size: .875rem; font-weight: 500; transition: background-color .2s, color .2s; }
.cta-primary { background: #fff; color: #000; }
.cta-primary:hover { background: rgba(255,255,255,.82); }
.cta-secondary:hover { background: #fff; color: #000; }
.cover-shot { overflow: hidden; border: 1px solid rgba(255,255,255,.34); padding: 3px; background: #000; clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px); }
.featured-strip { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .5rem; }
.featured-shot { aspect-ratio: 16 / 10; overflow: hidden; border: 1px solid rgba(255,255,255,.2); background: #000; transition: border-color .18s; }
.featured-shot:hover { border-color: rgba(255,255,255,.7); }
.category-card { display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,.3); background: rgba(0,0,0,.6); padding: .6rem .6rem 1rem; box-shadow: 5px 5px 0 rgba(255,255,255,.08); transition: border-color .2s, transform .2s; }
.category-card:hover { border-color: #fff; transform: translateY(-3px); }
.filter-bar { display: flex; gap: .5rem; overflow-x: auto; padding-bottom: .35rem; scrollbar-width: thin; }
.filter-chip { flex: 0 0 auto; border: 1px solid rgba(255,255,255,.25); padding: .45rem .8rem; font-size: .75rem; color: rgba(255,255,255,.65); white-space: nowrap; }
.filter-chip:hover { border-color: rgba(255,255,255,.7); color: #fff; }
.filter-chip.is-active { border-color: #fff; background: #fff; color: #000; }
.board-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
@media (min-width: 640px) { .board-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.board-card { display: block; width: 100%; height: 100%; text-align: left; border: 1px solid rgba(255,255,255,.22); background: rgba(0,0,0,.65); transition: border-color .18s; }
.board-card:hover { border-color: rgba(255,255,255,.8); }
.icon-btn { width: 2.25rem; height: 2.25rem; border: 1px solid rgba(255,255,255,.4); color: #fff; }
.icon-btn:hover { background: #fff; color: #000; }
a:focus-visible, button:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .category-card:hover { transform: none; } }
</style>
