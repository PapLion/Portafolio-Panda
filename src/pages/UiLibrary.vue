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

      <!-- page intro + collection picker -->
      <header class="grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-7 lg:gap-10 items-start border-t border-white/20 pt-6 sm:pt-8">
        <div class="lg:pt-1">
          <p class="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/40">{{ copy.eyebrow }}</p>
          <h1 id="ui-title" class="mt-3 text-3xl sm:text-4xl md:text-[2.6rem] font-bold manga-text leading-[1.08]">
            {{ copy.title }}<span class="block text-white/80 text-xl sm:text-2xl md:text-[1.7rem] mt-2 font-semibold">{{ copy.subtitle }}</span>
          </h1>
          <p class="mt-5 text-sm sm:text-base text-white/72 leading-relaxed">{{ copy.intro }}</p>
          <dl class="hero-facts mt-6">
            <div><dt>{{ copy.facts.collections }}</dt><dd>2</dd></div>
            <div><dt>{{ copy.facts.boards }}</dt><dd>{{ uiBoards.length + rpgBoards.length }}</dd></div>
            <div><dt>{{ copy.facts.tools }}</dt><dd>Roblox Studio · Luau</dd></div>
          </dl>
        </div>
        <nav class="collection-picker" :aria-label="copy.collectionsLabel">
          <a href="#rpg" class="collection-card is-rpg">
            <img v-bind="rpgImage(rpgBoard(rpgCover))" sizes="(min-width: 1024px) 340px, 50vw" alt="" class="w-full aspect-[16/10] object-cover object-left-top bg-black" fetchpriority="high" decoding="async" />
            <span class="block mt-3 text-[10px] uppercase tracking-[0.22em] rpg-gold">{{ copy.rpg.badge }}</span>
            <span class="block mt-1 text-base font-bold">{{ copy.rpg.short }}</span>
            <span class="block mt-1 text-xs text-white/60 leading-relaxed">{{ copy.rpg.pick }}</span>
          </a>
          <a href="#pivot" class="collection-card">
            <img v-bind="uiImage('hero')" sizes="(min-width: 1024px) 340px, 50vw" alt="" class="w-full aspect-[16/10] object-cover bg-black" decoding="async" />
            <span class="block mt-3 text-[10px] uppercase tracking-[0.22em] text-white/40">{{ copy.pivot.badge }}</span>
            <span class="block mt-1 text-base font-bold">{{ copy.pivot.short }}</span>
            <span class="block mt-1 text-xs text-white/60 leading-relaxed">{{ copy.pivot.pick }}</span>
          </a>
        </nav>
      </header>

      <!-- ===================== Collection 02 · Stylized Fantasy RPG ===================== -->
      <section id="rpg" class="rpg-collection mt-16 sm:mt-20 scroll-mt-6" aria-labelledby="rpg-title">
        <div class="grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-7 lg:gap-10 items-start">
          <div>
            <p class="text-[10px] sm:text-xs uppercase tracking-[0.22em] rpg-gold">{{ copy.rpg.badge }}</p>
            <h2 id="rpg-title" class="mt-3 text-2xl sm:text-3xl md:text-[2.1rem] font-bold leading-[1.12]">
              {{ copy.rpg.title }}<span class="block text-white/75 text-lg sm:text-xl mt-2 font-semibold">{{ copy.rpg.subtitle }}</span>
            </h2>
            <p class="mt-5 text-sm sm:text-base text-white/72 leading-relaxed">{{ copy.rpg.intro }}</p>
            <dl class="hero-facts rpg-facts mt-6">
              <div><dt>{{ copy.facts.boards }}</dt><dd>{{ rpgBoards.length }}</dd></div>
              <div><dt>{{ copy.facts.families }}</dt><dd>{{ rpgCategories.length }}</dd></div>
              <div><dt>{{ copy.facts.engineering }}</dt><dd>{{ copy.rpg.engineering }}</dd></div>
            </dl>
            <ul class="rpg-points mt-6">
              <li v-for="p in copy.rpg.points" :key="p">{{ p }}</li>
            </ul>
          </div>
          <div class="min-w-0">
            <button type="button" class="cover-shot rpg-cover block w-full cursor-zoom-in" :aria-label="`${copy.open}: ${rpgBoard(rpgCover).title[lang]}`" @click="open('rpg', rpgIndex(rpgCover), $event)">
              <img v-bind="rpgImage(rpgBoard(rpgCover))" sizes="(min-width: 1024px) 680px, 100vw" :alt="rpgBoard(rpgCover).title[lang]" class="w-full h-auto bg-black" decoding="async" />
            </button>
            <div class="featured-strip mt-3">
              <button v-for="id in rpgFeatured" :key="id" type="button" class="featured-shot rpg-shot" :aria-label="`${copy.open}: ${rpgBoard(id).title[lang]}`" @click="open('rpg', rpgIndex(id), $event)">
                <img :src="`${RPG_PATH}/${id}-800.webp`" :width="Math.min(800, rpgBoard(id).w)" :height="Math.round(rpgBoard(id).h * Math.min(800, rpgBoard(id).w) / rpgBoard(id).w)" alt="" class="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
              </button>
            </div>
          </div>
        </div>

        <div class="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          <button v-for="cat in rpgCategoryCards" :key="cat.id" type="button" class="rpg-family text-left" :class="rpgActive === cat.id ? 'is-active' : ''" @click="rpgSelect(cat.id, true)">
            <span class="block text-[10px] uppercase tracking-[0.18em] text-white/40">{{ cat.count }} {{ copy.boardsWord }}</span>
            <span class="block mt-1 text-[0.82rem] font-semibold leading-snug">{{ cat.label[lang] }}</span>
          </button>
        </div>

        <div ref="rpgGalleryRef" class="mt-8 scroll-mt-6">
          <div class="filter-bar rpg-filters" role="group" :aria-label="copy.filterLabel">
            <button v-for="f in rpgFilters" :key="f.id" type="button" class="filter-chip" :class="rpgActive === f.id ? 'is-active' : ''" :aria-pressed="rpgActive === f.id" @click="rpgSelect(f.id)">
              {{ f.label }} <span class="opacity-55">{{ f.count }}</span>
            </button>
          </div>
          <ul class="rpg-grid mt-5">
            <li v-for="item in rpgVisible" :key="item.id">
              <button type="button" class="board-card rpg-card" :aria-label="`${copy.open}: ${item.title[lang]}`" @click="open('rpg', rpgBoards.indexOf(item), $event)">
                <img v-bind="rpgImage(item)" sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" alt="" class="w-full h-auto bg-black" loading="lazy" decoding="async" />
                <span class="block px-3.5 pt-3 pb-3.5">
                  <span class="block text-[10px] uppercase tracking-[0.2em] rpg-gold-soft">{{ rpgCatName(item.category) }}</span>
                  <span class="block mt-1 text-sm sm:text-[0.95rem] font-semibold">{{ item.title[lang] }}</span>
                  <span class="block mt-1 text-xs text-white/55 leading-relaxed">{{ item.note[lang] }}</span>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </section>

      <!-- ===================== Collection 01 · PIVOT ===================== -->
      <section id="pivot" class="mt-16 sm:mt-20 border-t border-white/20 pt-8 scroll-mt-6" aria-labelledby="pivot-title">
        <p class="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/40">{{ copy.pivot.badge }}</p>
        <h2 id="pivot-title" class="mt-3 text-2xl sm:text-3xl md:text-[2.1rem] font-bold leading-[1.12]">{{ copy.pivot.title }}</h2>
        <p class="mt-4 max-w-3xl text-sm sm:text-base text-white/70 leading-relaxed">{{ copy.pivot.intro }}</p>

        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button v-for="cat in categoryCards" :key="cat.id" type="button" class="category-card text-left" @click="select(cat.id, true)">
            <img :src="`${UI_PATH}/${cat.preview}-640.webp`" width="640" height="400" alt="" class="w-full aspect-[16/10] object-cover" loading="lazy" decoding="async" />
            <span class="block mt-3 text-[10px] uppercase tracking-[0.22em] text-white/40">{{ cat.count }} {{ copy.boardsWord }}</span>
            <span class="block mt-1 text-base font-bold">{{ cat.label[lang] }}</span>
            <span class="block mt-1.5 text-xs text-white/60 leading-relaxed">{{ cat.blurb[lang] }}</span>
          </button>
        </div>

        <div id="gallery" ref="galleryRef" class="mt-10 scroll-mt-6">
          <h3 class="text-xl sm:text-2xl font-bold">{{ copy.galleryTitle }}</h3>
          <div class="filter-bar mt-4" role="group" :aria-label="copy.filterLabel">
            <button v-for="f in filters" :key="f.id" type="button" class="filter-chip" :class="active === f.id ? 'is-active' : ''" :aria-pressed="active === f.id" @click="select(f.id)">
              {{ f.label }} <span class="opacity-55">{{ f.count }}</span>
            </button>
          </div>
          <ul class="board-grid mt-5">
            <li v-for="item in visible" :key="item.id">
              <button type="button" class="board-card" :aria-label="`${copy.open}: ${item.title[lang]}`" @click="open('pivot', uiBoards.indexOf(item), $event)">
                <img v-bind="uiImage(item.id)" sizes="(min-width: 1024px) 540px, (min-width: 640px) 50vw, 100vw" alt="" class="w-full aspect-[16/10] object-cover bg-black" loading="lazy" decoding="async" />
                <span class="block px-3.5 pt-3 pb-3.5">
                  <span class="block text-[10px] uppercase tracking-[0.2em] text-white/40">{{ catName(item.category) }}</span>
                  <span class="block mt-1 text-sm sm:text-[0.95rem] font-semibold">{{ item.title[lang] }}</span>
                  <span class="block mt-1 text-xs text-white/55 leading-relaxed">{{ item.note[lang] }}</span>
                </span>
              </button>
            </li>
          </ul>
        </div>
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
          <p class="text-xs text-white/65 truncate" aria-live="polite">
            <span class="text-white/40">{{ lightbox.list === 'rpg' ? copy.rpg.short : 'PIVOT' }} · </span>{{ current.title[lang] }}<span v-if="current.note"> — {{ current.note[lang] }}</span>
          </p>
          <div class="flex gap-1.5 shrink-0">
            <button type="button" class="icon-btn" :aria-label="copy.prev" @click="step(-1)">←</button>
            <button type="button" class="icon-btn" :aria-label="copy.next" @click="step(1)">→</button>
            <button ref="closeRef" type="button" class="icon-btn" :aria-label="copy.close" @click="close">✕</button>
          </div>
        </div>
        <div class="flex-1 min-h-0 flex items-center justify-center p-3" @click.self="close">
          <img :key="`${lightbox.list}-${current.id}`" :src="currentSrc" :alt="current.title[lang]" class="max-h-full max-w-full object-contain" decoding="async" />
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
import { RPG_PATH, rpgBoards, rpgCategories, rpgCover, rpgFeatured, rpgImage } from '../data/rpgUiLibrary.js';

const language = inject('language', { currentLanguage: ref('en') });
const currentLanguage = language.currentLanguage ?? ref('en');
const lang = computed(() => (currentLanguage.value === 'es' ? 'es' : 'en'));

const content = {
  en: {
    back: 'Back to Dani.Dev', modeling: '3D Modeling',
    eyebrow: 'UI Engineering · Interface Component Libraries',
    title: 'Roblox UI Systems', subtitle: 'Two component collections',
    intro: 'Interface component libraries I designed and built in Roblox Studio with Luau, each with its own visual identity. Every image is a real render of the working components, shown on its own, not a game screen.',
    facts: { collections: 'Collections', boards: 'Boards', families: 'Families', tools: 'Built with', engineering: 'Engineering' },
    collectionsLabel: 'Collections',
    open: 'Open', boardsWord: 'boards',
    galleryTitle: 'All PIVOT components', filterLabel: 'Filter by family', all: 'All',
    rpg: {
      badge: 'Collection 02 · Vellum',
      short: 'Stylized Fantasy RPG',
      pick: 'Inventory, equipment, skill tree, quests, crafting and commerce components.',
      title: 'Stylized Fantasy RPG', subtitle: 'UI Component Library',
      intro: 'A fantasy RPG interface library: gilt-framed leather panels, parchment pages and jewel-toned rarity, all with original 2D art. The components work on local example state: items drag between slots, filters and sorting change the grid, skill points follow prerequisites, gear changes the stats on display, and crafting and purchases update materials and gold. It is a UI library, not a game: there are no game systems behind it.',
      engineering: 'Reusable Luau modules',
      points: [
        'Custom visual identity: illustrated icons, gilt frames, parchment and rarity, all generated from source.',
        'Interactive inventory and equipment: drag-and-drop, stack merging, comparison tooltips, context menus.',
        'Skill tree and progression: prerequisites, row gates, ranks, quest journal, achievements, level-up.',
        'Component architecture: scoped lifecycles, local stores, one interaction state machine, overlay layers.',
        'Keyboard focus and navigation, reduced motion, layouts that scale to the viewport.',
      ],
    },
    pivot: {
      badge: 'Collection 01 · PIVOT',
      short: 'Competitive Shooter',
      pick: 'Buttons, controls, dialogs, cards, social panels, HUD widgets and notices.',
      title: 'PIVOT — Competitive Shooter UI',
      intro: 'Buttons and their states, controls, dialogs, cards, social panels, HUD widgets and notices, plus their tablet and phone variants. Built with the project’s UI module and shown on a neutral background.',
    },
    notesEyebrow: 'Notes', notesTitle: 'Real pieces, not mockups',
    notes: [
      { title: 'Rendered in Studio', text: 'Every board shows real components running in Roblox Studio, isolated on a neutral canvas. The RPG pieces are captured at 2× from a dedicated component gallery.' },
      { title: 'Every state', text: 'Hover, pressed, focus, selected, disabled and loading are real states of the same components, set the way the interface sets them.' },
      { title: 'Local state only', text: 'Inventories, skill points, quests, gold and materials are local example data. There is no backend, DataStore or game economy behind any collection.' },
      { title: 'Two identities', text: 'PIVOT uses tinted industrial plates for a competitive shooter; the RPG collection uses illuminated-manuscript leather, gilt and parchment. Neither borrows from the other.' },
    ],
    prev: 'Previous', next: 'Next', close: 'Close',
  },
  es: {
    back: 'Volver a Dani.Dev', modeling: 'Modelado 3D',
    eyebrow: 'Ingeniería de UI · Librerías de componentes',
    title: 'Sistemas de UI en Roblox', subtitle: 'Dos colecciones de componentes',
    intro: 'Librerías de componentes de interfaz que diseñé y construí en Roblox Studio con Luau, cada una con su propia identidad visual. Cada imagen es un render real de los componentes funcionando, mostrados por separado, no una pantalla de juego.',
    facts: { collections: 'Colecciones', boards: 'Láminas', families: 'Familias', tools: 'Hecho con', engineering: 'Ingeniería' },
    collectionsLabel: 'Colecciones',
    open: 'Abrir', boardsWord: 'láminas',
    galleryTitle: 'Todos los componentes de PIVOT', filterLabel: 'Filtrar por familia', all: 'Todo',
    rpg: {
      badge: 'Colección 02 · Vellum',
      short: 'RPG de fantasía estilizado',
      pick: 'Inventario, equipo, árbol de habilidades, misiones, artesanía y comercio.',
      title: 'RPG de fantasía estilizado', subtitle: 'Librería de componentes de UI',
      intro: 'Una librería de interfaz para RPG de fantasía: paneles de cuero con marcos dorados, páginas de pergamino y rarezas en tonos de gema, todo con arte 2D original. Los componentes funcionan con estado local de ejemplo: los objetos se arrastran entre huecos, los filtros y el orden cambian la cuadrícula, los puntos de habilidad respetan los requisitos, el equipo cambia las estadísticas mostradas, y la artesanía y las compras actualizan materiales y oro. Es una librería de UI, no un juego: no hay sistemas de juego detrás.',
      engineering: 'Módulos Luau reutilizables',
      points: [
        'Identidad visual propia: iconos ilustrados, marcos dorados, pergamino y rarezas, todo generado desde código.',
        'Inventario y equipo interactivos: arrastrar y soltar, juntar montones, comparación, menús contextuales.',
        'Árbol de habilidades y progreso: requisitos, umbrales por fila, rangos, diario de misiones, logros, subida de nivel.',
        'Arquitectura de componentes: ciclos de vida con scopes, estado local, una máquina de estados de interacción, capas de overlay.',
        'Foco y navegación con teclado, movimiento reducido y layouts que escalan al viewport.',
      ],
    },
    pivot: {
      badge: 'Colección 01 · PIVOT',
      short: 'Shooter competitivo',
      pick: 'Botones, controles, diálogos, tarjetas, paneles sociales, HUD y avisos.',
      title: 'PIVOT — UI de shooter competitivo',
      intro: 'Botones y sus estados, controles, diálogos, tarjetas, paneles sociales, widgets de HUD y avisos, con sus variantes de tablet y móvil. Hechos con el módulo de UI del proyecto y mostrados sobre fondo neutro.',
    },
    notesEyebrow: 'Notas', notesTitle: 'Piezas reales, no mockups',
    notes: [
      { title: 'Renderizadas en Studio', text: 'Cada lámina muestra componentes reales funcionando en Roblox Studio, aislados sobre un fondo neutro. Las piezas del RPG se capturan a 2× desde una galería de componentes dedicada.' },
      { title: 'Todos los estados', text: 'Hover, pulsado, foco, seleccionado, desactivado y cargando son estados reales de los mismos componentes.' },
      { title: 'Solo estado local', text: 'Inventarios, puntos, misiones, oro y materiales son datos locales de ejemplo. No hay backend, DataStore ni economía de juego detrás de ninguna colección.' },
      { title: 'Dos identidades', text: 'PIVOT usa placas industriales teñidas para un shooter competitivo; la colección RPG usa cuero de manuscrito iluminado, oro y pergamino. Ninguna toma prestado de la otra.' },
    ],
    prev: 'Anterior', next: 'Siguiente', close: 'Cerrar',
  },
};
const copy = computed(() => content[lang.value]);

// ---- PIVOT collection
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

// ---- RPG collection
const rpgBoard = (id) => rpgBoards.find((x) => x.id === id);
const rpgIndex = (id) => rpgBoards.findIndex((x) => x.id === id);
const rpgCatName = (id) => rpgCategories.find((c) => c.id === id)?.label[lang.value] ?? '';
const rpgCategoryCards = computed(() => rpgCategories.map((c) => ({ ...c, count: rpgBoards.filter((x) => x.category === c.id).length })));
const rpgActive = ref('all');
const rpgFilters = computed(() => [
  { id: 'all', label: copy.value.all, count: rpgBoards.length },
  ...rpgCategories.map((c) => ({ id: c.id, label: c.label[lang.value], count: rpgBoards.filter((x) => x.category === c.id).length })),
]);
const rpgVisible = computed(() => (rpgActive.value === 'all' ? rpgBoards : rpgBoards.filter((x) => x.category === rpgActive.value)));
const rpgGalleryRef = ref(null);
const rpgSelect = async (id, scroll = false) => {
  rpgActive.value = rpgActive.value === id && scroll ? 'all' : id;
  if (scroll) { await nextTick(); rpgGalleryRef.value?.scrollIntoView({ block: 'start' }); }
};

// ---- shared lightbox: { list: 'pivot' | 'rpg', index } (index -1 on pivot = montage)
const lightbox = ref({ list: 'pivot', index: null });
const closeRef = ref(null);
let opener = null;
const listOf = (name) => (name === 'rpg' ? rpgBoards : uiBoards);
const current = computed(() => {
  const { list, index } = lightbox.value;
  if (index === null) return null;
  if (list === 'pivot' && index === -1) return { ...uiHero, note: null };
  return listOf(list)[index];
});
const currentSrc = computed(() => {
  const c = current.value;
  if (!c) return '';
  return lightbox.value.list === 'rpg' ? `${RPG_PATH}/${c.id}-1600.webp` : `${UI_PATH}/${c.id}-1280.webp`;
});
const open = async (list, i, e) => {
  opener = e?.currentTarget ?? document.activeElement;
  lightbox.value = { list, index: i };
  document.body.style.overflow = 'hidden';
  await nextTick();
  closeRef.value?.focus();
};
const close = () => { lightbox.value = { ...lightbox.value, index: null }; document.body.style.overflow = ''; opener?.focus?.(); };
const step = (d) => {
  const { list, index } = lightbox.value;
  const n = listOf(list).length;
  lightbox.value = { list, index: index === -1 ? 0 : (index + d + n) % n };
};
const onKey = (e) => {
  if (e.key === 'Escape') close();
  else if (e.key === 'ArrowLeft') step(-1);
  else if (e.key === 'ArrowRight') step(1);
};

let previousTitle = '';
onMounted(() => { previousTitle = document.title; document.title = 'Roblox UI Systems · Component Libraries | Dani.Dev'; });
onUnmounted(() => { document.title = previousTitle; document.body.style.overflow = ''; });
</script>

<style scoped>
.hero-facts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid rgba(255,255,255,.18); border-bottom: 1px solid rgba(255,255,255,.18); }
.hero-facts > div { padding: .75rem .75rem .75rem 0; }
.hero-facts > div + div { padding-left: .75rem; border-left: 1px solid rgba(255,255,255,.12); }
.hero-facts dt { font-size: .6rem; text-transform: uppercase; letter-spacing: .2em; color: rgba(255,255,255,.42); }
.hero-facts dd { margin-top: .3rem; font-size: .9rem; font-weight: 600; }
.cover-shot { overflow: hidden; border: 1px solid rgba(255,255,255,.34); padding: 3px; background: #000; clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px); }
.featured-strip { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .5rem; }
.featured-shot { aspect-ratio: 16 / 10; overflow: hidden; border: 1px solid rgba(255,255,255,.2); background: #000; transition: border-color .18s; }
.featured-shot:hover { border-color: rgba(255,255,255,.7); }
.collection-picker { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.collection-card { display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,.3); background: rgba(0,0,0,.6); padding: .6rem .6rem 1rem; box-shadow: 5px 5px 0 rgba(255,255,255,.08); transition: border-color .2s, transform .2s; }
.collection-card:hover { border-color: #fff; transform: translateY(-3px); }
.collection-card.is-rpg { border-color: rgba(212,165,90,.55); box-shadow: 5px 5px 0 rgba(212,165,90,.12); }
.collection-card.is-rpg:hover { border-color: #f3d08a; }
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

/* RPG collection: its own warm-gilt accent, separate from PIVOT's neutral white */
.rpg-collection { position: relative; border-top: 1px solid rgba(212,165,90,.45); padding-top: 2rem; }
.rpg-collection::before { content: ''; position: absolute; inset: 0 -1rem auto; height: 18rem; background: radial-gradient(60% 100% at 30% 0%, rgba(212,165,90,.09), transparent 70%); pointer-events: none; }
.rpg-gold { color: #d4a55a; }
.rpg-gold-soft { color: rgba(212,165,90,.75); }
.rpg-facts { border-color: rgba(212,165,90,.35); }
.rpg-facts > div + div { border-left-color: rgba(212,165,90,.2); }
.rpg-facts dt { color: rgba(212,165,90,.7); }
.rpg-points { display: grid; gap: .55rem; }
.rpg-points li { position: relative; padding-left: 1.1rem; font-size: .8rem; line-height: 1.55; color: rgba(255,255,255,.66); }
.rpg-points li::before { content: ''; position: absolute; left: 0; top: .5rem; width: .45rem; height: .45rem; transform: rotate(45deg); background: #d4a55a; }
.rpg-cover { border-color: rgba(212,165,90,.55); }
.rpg-shot { border-color: rgba(212,165,90,.3); }
.rpg-shot:hover { border-color: #f3d08a; }
.rpg-family { border: 1px solid rgba(212,165,90,.28); background: rgba(20,14,10,.7); padding: .6rem .7rem .7rem; transition: border-color .18s, background-color .18s; }
.rpg-family:hover { border-color: rgba(243,208,138,.8); }
.rpg-family.is-active { border-color: #f3d08a; background: rgba(212,165,90,.14); }
.rpg-filters .filter-chip { border-color: rgba(212,165,90,.3); }
@media (min-width: 1024px) { .rpg-filters { flex-wrap: wrap; overflow: visible; } }
.rpg-filters .filter-chip:hover { border-color: rgba(243,208,138,.8); }
.rpg-filters .filter-chip.is-active { border-color: #f3d08a; background: #f3d08a; color: #1a110b; }
.rpg-grid { columns: 1; column-gap: 1rem; }
@media (min-width: 640px) { .rpg-grid { columns: 2; } }
@media (min-width: 1024px) { .rpg-grid { columns: 3; } }
.rpg-grid > li { break-inside: avoid; margin-bottom: 1rem; }
.rpg-card { border-color: rgba(212,165,90,.25); background: rgba(14,10,8,.75); }
.rpg-card:hover { border-color: rgba(243,208,138,.85); }
@media (prefers-reduced-motion: reduce) { .category-card:hover, .collection-card:hover { transform: none; } }
</style>
