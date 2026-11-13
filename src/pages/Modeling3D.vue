<template>
  <section class="min-h-screen py-8 sm:py-10 md:py-12 bg-black/80" aria-labelledby="modeling-title">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- top bar -->
      <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 mb-7 sm:mb-9">
        <a href="/" class="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors w-fit">
          <span aria-hidden="true">←</span>
          <span>{{ copy.back }}</span>
        </a>

        <div class="flex items-center gap-4 sm:gap-5">
          <span class="hidden md:inline text-xs uppercase tracking-[0.3em] text-white/40">Dani.Dev / {{ copy.eyebrow }}</span>
          <a href="/roblox-gamedev" class="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Roblox / Game Dev →</a>
          <LanguageSelector />
        </div>
      </div>

      <!-- intro + featured -->
      <header class="grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-7 lg:gap-10 items-start border-t border-white/20 pt-6 sm:pt-8">
        <div class="lg:pt-1">
          <p class="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/40">{{ copy.eyebrow }} · {{ copy.status }}</p>
          <h1 id="modeling-title" class="mt-3 text-3xl sm:text-4xl md:text-[2.6rem] font-bold manga-text leading-[1.08]">
            3D Modeler<span class="block text-white/80 text-xl sm:text-2xl md:text-[1.7rem] mt-2 font-semibold">Stylized &amp; Low/Mid Poly</span>
          </h1>
          <p class="mt-5 text-sm sm:text-base text-white/72 leading-relaxed">{{ copy.intro }}</p>

          <dl class="hero-facts mt-6">
            <div>
              <dt>{{ copy.facts.models }}</dt>
              <dd>{{ pieceCount }}</dd>
            </div>
            <div>
              <dt>{{ copy.facts.range }}</dt>
              <dd>{{ formatCount(triRange[0], lang) }}–{{ formatCount(triRange[1], lang) }}</dd>
            </div>
            <div>
              <dt>{{ copy.facts.tools }}</dt>
              <dd>Blender · FBX</dd>
            </div>
          </dl>

          <div class="mt-7 flex flex-wrap gap-3">
            <a href="#gallery" class="cta-primary">{{ copy.ctaGallery }}</a>
            <a href="#modeling-contact" class="cta-secondary">{{ copy.ctaContact }}</a>
          </div>
        </div>

        <div class="min-w-0">
          <button
            v-if="coverModel"
            type="button"
            class="cover-shot block w-full text-left cursor-zoom-in"
            :aria-label="`${copy.open}: ${coverModel.name[lang]}`"
            @click="openModel(coverModel.slug, $event)"
          >
            <img
              v-bind="responsive(coverModel, coverModel.views[0], 'md')"
              sizes="(min-width: 1024px) 680px, 100vw"
              :alt="`${coverModel.name[lang]} — ${coverModel.views[0].label[lang]}`"
              class="w-full aspect-[3/2] object-cover bg-black"
              fetchpriority="high"
              decoding="async"
            />
            <span class="cover-caption">{{ coverModel.name[lang] }}</span>
          </button>

          <div class="featured-strip mt-3" :aria-label="copy.featured">
            <button
              v-for="item in featuredModels"
              :key="item.slug"
              type="button"
              class="featured-shot"
              :aria-label="`${copy.open}: ${item.name[lang]}`"
              @click="openModel(item.slug, $event)"
            >
              <img
                v-bind="responsive(item, item.views[0], 'sm')"
                sizes="(min-width: 1024px) 170px, 25vw"
                alt=""
                class="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <span class="featured-label">{{ item.name[lang] }}</span>
            </button>
          </div>
        </div>
      </header>

      <!-- what I model -->
      <section class="mt-14 sm:mt-16" aria-labelledby="services-title">
        <p class="text-xs uppercase tracking-[0.3em] text-white/40">{{ copy.servicesEyebrow }}</p>
        <h2 id="services-title" class="mt-2 text-2xl sm:text-3xl font-bold">{{ copy.servicesTitle }}</h2>

        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            v-for="category in categoryCards"
            :key="category.id"
            type="button"
            class="category-card text-left"
            :aria-label="`${category.label[lang]} · ${category.count} ${copy.modelsWord}`"
            @click="selectCategory(category.id, true)"
          >
            <span class="grid grid-cols-3 gap-1" aria-hidden="true">
              <img
                v-for="item in category.preview"
                :key="item.slug"
                :src="imageFor(item, item.views[0], 'sm').src"
                alt=""
                width="480"
                height="480"
                class="w-full aspect-square object-cover"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span class="block mt-4 text-[10px] uppercase tracking-[0.22em] text-white/40">{{ category.count }} {{ copy.modelsWord }}</span>
            <span class="block mt-1 text-base sm:text-lg font-bold">{{ category.label[lang] }}</span>
            <span class="block mt-2 text-xs sm:text-sm text-white/60 leading-relaxed">{{ category.blurb[lang] }}</span>
            <span class="block mt-4 text-xs text-white/70">{{ copy.seeCategory }} →</span>
          </button>
        </div>
      </section>

      <!-- gallery -->
      <section id="gallery" ref="galleryRef" class="mt-14 sm:mt-16 scroll-mt-6" aria-labelledby="gallery-title">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-white/40">{{ copy.galleryEyebrow }}</p>
            <h2 id="gallery-title" class="mt-2 text-2xl sm:text-3xl font-bold">{{ copy.galleryTitle }}</h2>
          </div>
          <p class="text-xs text-white/40 md:text-right max-w-sm">{{ copy.galleryHint }}</p>
        </div>

        <div class="filter-bar mt-5" role="group" :aria-label="copy.filterLabel">
          <button
            v-for="filter in filters"
            :key="filter.id"
            type="button"
            class="filter-chip"
            :class="activeCategory === filter.id ? 'is-active' : ''"
            :aria-pressed="activeCategory === filter.id"
            @click="selectCategory(filter.id)"
          >
            {{ filter.label }} <span class="opacity-55">{{ filter.count }}</span>
          </button>
        </div>

        <p class="sr-only" aria-live="polite">{{ visibleModels.length }} {{ copy.modelsWord }}</p>

        <ul class="model-grid mt-5">
          <li
            v-for="item in visibleModels"
            :key="item.slug"
            :class="item.kind ? 'is-feature' : ''"
          >
            <button
              type="button"
              class="model-card"
              :class="item.kind ? 'is-wide' : ''"
              :aria-label="`${copy.open}: ${item.name[lang]}`"
              @click="openModel(item.slug, $event)"
            >
              <span class="model-card-media" :class="item.kind ? 'aspect-[3/2] md:w-1/2 md:shrink-0 md:border-b-0 md:border-r' : 'aspect-square'">
                <img
                  v-bind="responsive(item, item.views[0], item.kind ? 'md' : 'sm')"
                  :sizes="item.kind ? '(min-width: 768px) 560px, 100vw' : '(min-width: 1024px) 270px, (min-width: 768px) 33vw, 50vw'"
                  alt=""
                  class="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span v-if="item.kind" class="flex flex-col justify-center p-4 sm:p-6 md:p-8 min-w-0">
                <span class="block text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {{ categoryName(item.category) }} · {{ item.kind === 'scene' ? copy.sceneTag : copy.setTag }}
                </span>
                <span class="block mt-2 text-xl sm:text-2xl font-bold leading-tight">{{ item.name[lang] }}</span>
                <span class="block mt-3 text-sm text-white/65 leading-relaxed">{{ item.summary[lang] }}</span>
                <span class="mt-4 flex flex-wrap gap-1.5">
                  <span
                    v-for="slug in item.includes"
                    :key="slug"
                    class="border border-white/20 px-2 py-0.5 text-[11px] text-white/55"
                  >{{ findModel(slug)?.name[lang] }}</span>
                </span>
                <span class="block mt-5 text-xs text-white/75">{{ copy.openSet }} →</span>
              </span>
              <span v-else class="block px-3 pt-3 pb-3.5">
                <span class="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/40 truncate">{{ categoryName(item.category) }}</span>
                <span class="block mt-1 text-sm sm:text-[0.95rem] font-semibold leading-snug">{{ item.name[lang] }}</span>
                <span class="block mt-1 text-[11px] sm:text-xs text-white/50">
                  {{ formatCount(item.stats.tris, lang) }} tris · {{ item.stats.parts }} {{ copy.partsWord }}<template v-if="item.stats.bones"> · rig R15</template>
                </span>
              </span>
            </button>
          </li>
        </ul>
      </section>

      <!-- how pieces are prepared -->
      <section class="mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 lg:gap-10 border-t border-white/20 pt-6 sm:pt-8" aria-labelledby="process-title">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-white/40">{{ copy.processEyebrow }}</p>
          <h2 id="process-title" class="mt-2 text-2xl sm:text-3xl font-bold">{{ copy.processTitle }}</h2>
          <p class="mt-4 text-xs sm:text-sm text-white/45 leading-relaxed">{{ copy.processNote }}</p>
        </div>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          <li v-for="point in copy.process" :key="point.title" class="border-l border-white/25 pl-4">
            <p class="text-sm font-semibold">{{ point.title }}</p>
            <p class="mt-1.5 text-xs sm:text-sm text-white/60 leading-relaxed">{{ point.text }}</p>
          </li>
        </ul>
      </section>

      <!-- contact -->
      <section id="modeling-contact" class="mt-14 sm:mt-16 scroll-mt-6" aria-labelledby="modeling-contact-title">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div class="border-2 border-white p-5 sm:p-7 bg-black/70 backdrop-blur-sm">
            <h2 id="modeling-contact-title" class="text-lg sm:text-xl font-bold border-b-2 border-white pb-2">{{ copy.contactTitle }}</h2>
            <p class="mt-4 text-sm text-white/70 leading-relaxed">{{ copy.contactText }}</p>
            <ul class="mt-5 space-y-2.5">
              <li v-for="service in copy.services" :key="service" class="flex gap-3 text-sm text-white/75">
                <span class="mt-2 block h-1.5 w-1.5 shrink-0 bg-white" aria-hidden="true"></span>
                <span>{{ service }}</span>
              </li>
            </ul>
          </div>

          <div class="border-2 border-white p-5 sm:p-7 bg-black/70 backdrop-blur-sm flex flex-col">
            <h3 class="text-lg sm:text-xl font-bold border-b-2 border-white pb-2">{{ copy.reachTitle }}</h3>

            <div class="mt-5 border border-white/40 p-4 flex items-center justify-between gap-3">
              <div class="min-w-0">
                <p class="text-[10px] uppercase tracking-[0.22em] text-white/45">Discord</p>
                <p class="mt-1 text-lg font-semibold truncate">{{ discordHandle }}</p>
              </div>
              <button type="button" class="copy-btn" @click="copyDiscord">
                <Check v-if="copied" class="w-4 h-4" aria-hidden="true" />
                <Copy v-else class="w-4 h-4" aria-hidden="true" />
                <span>{{ copied ? copy.copied : copy.copy }}</span>
              </button>
            </div>
            <p class="sr-only" aria-live="polite">{{ copied ? copy.copiedAnnounce : '' }}</p>

            <a href="/#contact" class="mt-3 w-full flex items-center justify-center gap-2 py-2.5 border-2 border-white hover:bg-white hover:text-black transition-colors text-sm font-medium">
              <MessageSquare class="w-4 h-4" aria-hidden="true" />
              {{ copy.formCta }}
            </a>

            <div class="mt-3 grid grid-cols-2 gap-3">
              <a
                v-for="link in socialLinks"
                :key="link.label"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center gap-2 p-2.5 border border-white/50 hover:bg-white hover:text-black transition-colors text-xs sm:text-sm"
                :aria-label="`${link.label} (${copy.newTab})`"
              >
                <component :is="link.icon" class="w-4 h-4" aria-hidden="true" />
                {{ link.label }}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>

    <ModelDialog
      :model="activeModel"
      :lang="lang"
      :copy="copy.dialog"
      :index="activeIndex"
      :total="dialogList.length"
      @close="closeModel"
      @navigate="stepModel"
      @open="(slug) => openModel(slug)"
    />
  </section>
  <Footer />
</template>

<script setup>
import { computed, inject, onMounted, onUnmounted, ref, nextTick } from 'vue';
import { Check, Copy, Linkedin, MessageSquare, Twitter } from 'lucide-vue-next';
import LanguageSelector from '../components/LanguageSelector.vue';
import Footer from '../components/Footer.vue';
import ModelDialog from '../components/modeling/ModelDialog.vue';
import {
  categories,
  findModel,
  formatCount,
  imageFor,
  models,
  modelsInCategory,
  MODELING_ROUTE,
} from '../data/models3d.js';

const language = inject('language', { currentLanguage: ref('en') });
const currentLanguage = language.currentLanguage ?? ref('en');
const lang = computed(() => (currentLanguage.value === 'es' ? 'es' : 'en'));

const discordHandle = 'danip.p';

const content = {
  en: {
    back: 'Back to Dani.Dev',
    eyebrow: '3D Modeling',
    status: 'Personal portfolio collections',
    intro: 'Stylized 3D models for Roblox and other games: weapons, tools, environment props, vehicles and characters. Every piece is built as named, separate parts and exported to FBX with its real triangle count.',
    facts: { models: 'Models', range: 'Triangles per model', tools: 'Tools' },
    ctaGallery: 'View models',
    ctaContact: 'Contact',
    open: 'Open',
    featured: 'Featured models',
    servicesEyebrow: 'What I model',
    servicesTitle: 'Four collections, one style',
    modelsWord: 'models',
    partsWord: 'parts',
    seeCategory: 'See collection',
    galleryEyebrow: 'Gallery',
    galleryTitle: 'All models',
    galleryHint: 'Open any piece for more views, an enlarged image and its technical sheet.',
    filterLabel: 'Filter by collection',
    all: 'All',
    sceneTag: 'Scene',
    openSet: 'Open views',
    setTag: 'Set',
    processEyebrow: 'How each piece is prepared',
    processTitle: 'Built to be used, not just rendered',
    processNote: 'These are personal portfolio pieces. Every export was verified by reimporting it (triangles, size, parts, materials and UVs). Importing into Roblox Studio has not been tested yet.',
    process: [
      { title: 'Separate, named parts', text: 'Lids, wheels, slides, flaps and fans are their own pieces with the pivot on their real axis.' },
      { title: 'One material per part', text: 'Each part carries a single material, following how Roblox imports meshes as MeshParts.' },
      { title: 'Measured triangle counts', text: 'The counts shown come from the exported FBX, not estimates. Geometry goes where it improves the silhouette.' },
      { title: 'Useful pivots and scale', text: 'Floor or wall pivots for props, grip pivots for tools, sizes in real metres. Props and the mount are shown next to a Roblox-style mannequin.' },
    ],
    contactTitle: 'Need models for your game?',
    contactText: 'I can model original pieces in this style for your project:',
    services: [
      'Weapons and tools (RPG, melee, utility)',
      'Shooter weapons and gear with moving parts split for animation',
      'Props and environment pieces for streets, shops and interiors',
      'Stylized vehicles',
      'Stylized characters, enemies and mounts',
    ],
    reachTitle: 'Get in touch',
    copy: 'Copy',
    copied: 'Copied',
    copiedAnnounce: 'Discord username copied',
    formCta: 'Send a message',
    newTab: 'opens in new tab',
    dialog: {
      close: 'Close',
      closeEnlarged: 'Close enlarged image',
      prevModel: 'Previous model',
      nextModel: 'Next model',
      enlarge: 'Enlarge',
      zoomHint: 'click or Esc to close',
      views: 'Views',
      includes: 'Includes',
      notes: 'Notes',
      limitations: 'Limitations',
      specs: {
        tris: 'Triangles',
        parts: 'Parts',
        materials: 'Materials',
        bones: 'Bones',
        structure: 'Structure',
        textures: 'Textures',
        format: 'Export',
      },
    },
  },
  es: {
    back: 'Volver a Dani.Dev',
    eyebrow: 'Modelado 3D',
    status: 'Colecciones personales de portafolio',
    intro: 'Modelos 3D estilizados para Roblox y otros juegos: armas, herramientas, props de entorno, vehículos y personajes. Cada pieza se construye con partes separadas y nombradas, y se exporta a FBX con su conteo real de triángulos.',
    facts: { models: 'Modelos', range: 'Triángulos por modelo', tools: 'Herramientas' },
    ctaGallery: 'Ver modelos',
    ctaContact: 'Contactar',
    open: 'Abrir',
    featured: 'Modelos destacados',
    servicesEyebrow: 'Qué modelo',
    servicesTitle: 'Cuatro colecciones, un mismo estilo',
    modelsWord: 'modelos',
    partsWord: 'piezas',
    seeCategory: 'Ver colección',
    galleryEyebrow: 'Galería',
    galleryTitle: 'Todos los modelos',
    galleryHint: 'Abre cualquier pieza para ver más vistas, la imagen ampliada y su ficha técnica.',
    filterLabel: 'Filtrar por colección',
    all: 'Todo',
    sceneTag: 'Escena',
    openSet: 'Ver imágenes',
    setTag: 'Conjunto',
    processEyebrow: 'Cómo se prepara cada pieza',
    processTitle: 'Pensadas para usarse, no solo para el render',
    processNote: 'Son piezas personales de portafolio. Cada exportación se comprobó reimportándola (triángulos, medidas, piezas, materiales y UVs). La importación en Roblox Studio aún no está probada.',
    process: [
      { title: 'Piezas separadas y nombradas', text: 'Tapas, ruedas, correderas, trampillas y ventiladores son piezas propias con el pivote en su eje real.' },
      { title: 'Un material por pieza', text: 'Cada pieza lleva un solo material, siguiendo cómo Roblox importa las mallas como MeshParts.' },
      { title: 'Triángulos medidos', text: 'Los conteos salen del FBX exportado, no son estimaciones. La geometría se pone donde mejora la silueta.' },
      { title: 'Pivotes y escala útiles', text: 'Pivote en suelo o pared para props y en el agarre para herramientas, con medidas reales en metros. Los props y la montura se muestran junto a un maniquí estilo Roblox.' },
    ],
    contactTitle: '¿Necesitas modelos para tu juego?',
    contactText: 'Puedo modelar piezas originales en este estilo para tu proyecto:',
    services: [
      'Armas y herramientas (RPG, cuerpo a cuerpo, utilidad)',
      'Armas y equipo shooter con las piezas móviles separadas para animar',
      'Props y piezas de entorno para calles, tiendas e interiores',
      'Vehículos estilizados',
      'Personajes, enemigos y monturas estilizados',
    ],
    reachTitle: 'Contacto',
    copy: 'Copiar',
    copied: 'Copiado',
    copiedAnnounce: 'Usuario de Discord copiado',
    formCta: 'Enviar un mensaje',
    newTab: 'se abre en otra pestaña',
    dialog: {
      close: 'Cerrar',
      closeEnlarged: 'Cerrar imagen ampliada',
      prevModel: 'Modelo anterior',
      nextModel: 'Modelo siguiente',
      enlarge: 'Ampliar',
      zoomHint: 'clic o Esc para cerrar',
      views: 'Vistas',
      includes: 'Incluye',
      notes: 'Notas',
      limitations: 'Limitaciones',
      specs: {
        tris: 'Triángulos',
        parts: 'Piezas',
        materials: 'Materiales',
        bones: 'Huesos',
        structure: 'Estructura',
        textures: 'Texturas',
        format: 'Exportación',
      },
    },
  },
};

const copy = computed(() => content[lang.value]);

const socialLinks = [
  { icon: Twitter, url: 'https://x.com/DaniLopezPP', label: 'Twitter' },
  { icon: Linkedin, url: 'https://www.linkedin.com/in/danilo-eduardo-lopez-corozo-5868153b6/', label: 'LinkedIn' },
];

// ---------- derived data ----------
const pieces = models.filter((m) => !m.kind);
const pieceCount = pieces.length;
const triRange = [Math.min(...pieces.map((m) => m.stats.tris)), Math.max(...pieces.map((m) => m.stats.tris))];

const coverModel = findModel('urban-corner');
const featuredModels = ['boar-mount', 'skeleton-warrior', 'vending-machine', 'pump-shotgun'].map(findModel).filter(Boolean);

const categoryOrder = ['environment', 'characters', 'shooter', 'weapons'];
const categoryCards = computed(() => categoryOrder.map((id) => {
  const category = categories.find((c) => c.id === id);
  const members = modelsInCategory(id).filter((m) => !m.kind);
  return { ...category, count: members.length, preview: members.slice(0, 3) };
}));

const categoryName = (id) => categories.find((c) => c.id === id)?.label[lang.value] ?? '';

const activeCategory = ref('all');
const filters = computed(() => [
  { id: 'all', label: copy.value.all, count: models.length },
  ...categoryOrder.map((id) => ({ id, label: categoryName(id), count: modelsInCategory(id).length })),
]);
const visibleModels = computed(() => (activeCategory.value === 'all' ? models : modelsInCategory(activeCategory.value)));

const galleryRef = ref(null);
const selectCategory = async (id, scroll = false) => {
  activeCategory.value = id;
  if (scroll) {
    await nextTick();
    galleryRef.value?.scrollIntoView({ block: 'start' });
  }
};

const responsive = (model, view, size) => {
  const img = imageFor(model, view, size);
  return { src: img.src, srcset: img.srcset, width: img.width, height: img.height };
};

// ---------- dialog ----------
const activeSlug = ref(null);
const dialogList = computed(() => (visibleModels.value.some((m) => m.slug === activeSlug.value) ? visibleModels.value : models));
const activeModel = computed(() => (activeSlug.value ? findModel(activeSlug.value) : null));
const activeIndex = computed(() => Math.max(0, dialogList.value.findIndex((m) => m.slug === activeSlug.value)));
let returnFocus = null;

const syncUrl = (slug) => {
  const url = new URL(window.location.href);
  if (slug) url.searchParams.set('model', slug);
  else url.searchParams.delete('model');
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
};

const openModel = (slug, event) => {
  if (!findModel(slug)) return;
  if (!activeSlug.value) returnFocus = event?.currentTarget ?? document.activeElement;
  activeSlug.value = slug;
  syncUrl(slug);
};

const closeModel = async () => {
  activeSlug.value = null;
  syncUrl(null);
  await nextTick();
  returnFocus?.focus?.();
  returnFocus = null;
};

const stepModel = (delta) => {
  const list = dialogList.value;
  const next = list[(activeIndex.value + delta + list.length) % list.length];
  activeSlug.value = next.slug;
  syncUrl(next.slug);
};

// ---------- contact ----------
const copied = ref(false);
let copiedTimer = null;
const copyDiscord = async () => {
  try {
    await navigator.clipboard.writeText(discordHandle);
  } catch {
    const field = document.createElement('textarea');
    field.value = discordHandle;
    document.body.appendChild(field);
    field.select();
    document.execCommand('copy');
    field.remove();
  }
  copied.value = true;
  clearTimeout(copiedTimer);
  copiedTimer = setTimeout(() => { copied.value = false; }, 2200);
};

let previousTitle = '';
onMounted(() => {
  previousTitle = document.title;
  document.title = '3D Modeler · Stylized & Low/Mid Poly | Dani.Dev';
  const slug = new URLSearchParams(window.location.search).get('model');
  if (slug && findModel(slug)) activeSlug.value = slug;
  if (window.location.pathname.replace(/\/+$/, '') !== MODELING_ROUTE) syncUrl(activeSlug.value);
});

onUnmounted(() => {
  document.title = previousTitle;
  clearTimeout(copiedTimer);
});
</script>

<style scoped>
.hero-facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
}

.hero-facts > div {
  padding: 0.75rem 0.75rem 0.75rem 0;
}

.hero-facts > div + div {
  padding-left: 0.75rem;
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}

.hero-facts dt {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.42);
}

.hero-facts dd {
  margin-top: 0.3rem;
  font-size: 0.9rem;
  font-weight: 600;
}

.cta-primary,
.cta-secondary {
  display: inline-flex;
  align-items: center;
  border: 2px solid #fff;
  padding: 0.55rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 200ms ease, color 200ms ease;
}

.cta-primary {
  background: #fff;
  color: #000;
}

.cta-primary:hover {
  background: rgba(255, 255, 255, 0.82);
}

.cta-secondary:hover {
  background: #fff;
  color: #000;
}

.cover-shot {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.34);
  padding: 3px;
  background: #000;
  clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px);
}

.cover-shot img,
.model-card img,
.featured-shot img {
  transition: transform 260ms ease, filter 260ms ease;
}

.cover-shot:hover img {
  transform: scale(1.01);
}

.cover-caption {
  position: absolute;
  left: 0.9rem;
  bottom: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.78);
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.featured-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.5rem;
}

.featured-shot {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #000;
  transition: border-color 180ms ease;
}

.featured-shot:hover {
  border-color: rgba(255, 255, 255, 0.7);
}

.featured-shot:hover img {
  transform: scale(1.03);
}

.featured-label {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.2rem 0.45rem 0.4rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0));
  font-size: 0.62rem;
  line-height: 1.25;
  text-align: left;
}

.category-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.6);
  padding: 0.75rem 0.75rem 1rem;
  box-shadow: 5px 5px 0 rgba(255, 255, 255, 0.08);
  transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
}

.category-card:hover {
  border-color: #fff;
  transform: translateY(-3px);
  box-shadow: 8px 8px 0 rgba(255, 255, 255, 0.13);
}

.filter-bar {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.35rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.5) rgba(255, 255, 255, 0.06);
}

.filter-chip {
  flex: 0 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.45rem 0.8rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.65);
  white-space: nowrap;
  transition: border-color 160ms ease, color 160ms ease, background-color 160ms ease;
}

.filter-chip:hover {
  border-color: rgba(255, 255, 255, 0.7);
  color: #fff;
}

.filter-chip.is-active {
  border-color: #fff;
  background: #fff;
  color: #000;
}

.model-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-flow: dense;
  gap: 0.75rem;
}

@media (min-width: 768px) {
  .model-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .model-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.model-grid > li.is-feature {
  grid-column: 1 / -1;
}

.model-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(0, 0, 0, 0.65);
  transition: border-color 180ms ease;
}

.model-card:hover {
  border-color: rgba(255, 255, 255, 0.8);
}

@media (min-width: 768px) {
  .model-card.is-wide {
    flex-direction: row;
  }
}

.model-card:hover img {
  transform: scale(1.025);
}

.model-card-media {
  display: block;
  overflow: hidden;
  background: #111;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  border: 1px solid #fff;
  padding: 0.45rem 0.7rem;
  font-size: 0.75rem;
  transition: background-color 160ms ease, color 160ms ease;
}

.copy-btn:hover {
  background: #fff;
  color: #000;
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .category-card:hover,
  .cover-shot:hover img,
  .model-card:hover img,
  .featured-shot:hover img {
    transform: none;
  }
}
</style>
