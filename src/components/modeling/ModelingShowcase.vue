<template>
  <div class="modeling-showcase">
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div class="max-w-xl">
        <p class="text-xs uppercase tracking-[0.3em] text-white/40">{{ copy.eyebrow }}</p>
        <component :is="headingTag" :id="headingId" class="mt-2 text-2xl sm:text-3xl font-bold">{{ copy.title }}</component>
        <p class="mt-3 text-sm text-white/60 leading-relaxed">{{ copy.text }}</p>
      </div>
      <a :href="MODELING_ROUTE" class="showcase-cta shrink-0">{{ copy.cta }} →</a>
    </div>

    <ul class="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
      <li v-for="item in items" :key="item.slug">
        <a :href="modelLink(item.slug)" class="showcase-card block" :aria-label="`${item.name[lang]} — ${copy.open}`">
          <span class="block aspect-square overflow-hidden bg-[#111]">
            <img
              :src="imageFor(item, item.views[0], 'sm').src"
              :srcset="imageFor(item, item.views[0], 'sm').srcset"
              sizes="(min-width: 1024px) 270px, 50vw"
              width="480"
              height="480"
              alt=""
              class="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </span>
          <span class="block px-3 py-2.5">
            <span class="block text-xs sm:text-sm font-semibold leading-snug">{{ item.name[lang] }}</span>
            <span class="block mt-0.5 text-[11px] text-white/45">{{ formatCount(item.stats.tris, lang) }} tris</span>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import { findModel, formatCount, imageFor, MODELING_ROUTE, modelLink } from '../../data/models3d.js';

const props = defineProps({
  slugs: { type: Array, required: true },
  content: { type: Object, required: true }, // { en: {eyebrow,title,text,cta,open}, es: {...} }
  headingTag: { type: String, default: 'h2' },
  headingId: { type: String, default: undefined },
});

const language = inject('language', { currentLanguage: ref('en') });
const currentLanguage = language.currentLanguage ?? ref('en');
const lang = computed(() => (currentLanguage.value === 'es' ? 'es' : 'en'));
const copy = computed(() => props.content[lang.value] ?? props.content.en);
const items = computed(() => props.slugs.map(findModel).filter((m) => m && m.stats));
</script>

<style scoped>
.showcase-cta {
  display: inline-flex;
  align-items: center;
  border: 1px solid #fff;
  padding: 0.5rem 0.9rem;
  font-size: 0.8rem;
  transition: background-color 180ms ease, color 180ms ease;
}

.showcase-cta:hover {
  background: #fff;
  color: #000;
}

.showcase-card {
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(0, 0, 0, 0.65);
  transition: border-color 180ms ease;
}

.showcase-card:hover {
  border-color: rgba(255, 255, 255, 0.8);
}

.showcase-card img {
  transition: transform 260ms ease;
}

.showcase-card:hover img {
  transform: scale(1.025);
}

a:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .showcase-card:hover img {
    transform: none;
  }
}
</style>
