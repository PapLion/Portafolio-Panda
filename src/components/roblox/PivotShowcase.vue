<template>
  <section class="pivot-showcase border-t border-white/20 pt-5 sm:pt-6" aria-labelledby="pivot-title">
    <!-- 1 · overview + interface screens -->
    <div class="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-6 lg:gap-10 items-start">
      <div class="lg:pt-2">
        <p class="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/40">
          {{ c.status }} · {{ c.role }}
        </p>
        <h2 id="pivot-title" class="mt-3 text-3xl sm:text-4xl md:text-[2.6rem] font-bold manga-text leading-[1.05]">
          {{ c.title }}
        </h2>
        <p class="mt-5 text-sm sm:text-base text-white/72 leading-relaxed">{{ c.description }}</p>

        <ul class="mt-5 flex flex-wrap gap-2" :aria-label="c.role">
          <li v-for="tech in c.stack" :key="tech" class="border border-white/25 px-2.5 py-1 text-xs text-white/70">{{ tech }}</li>
        </ul>

        <ul class="mt-6 space-y-3">
          <li v-for="item in c.highlights" :key="item" class="flex gap-3 text-sm text-white/70 leading-relaxed">
            <span class="mt-2 block h-1.5 w-1.5 shrink-0 bg-white" aria-hidden="true"></span>
            <span>{{ item }}</span>
          </li>
        </ul>

        <p class="mt-6 border border-white/20 bg-white/[0.03] px-3 py-2 text-xs sm:text-sm text-white/60 leading-relaxed">
          {{ c.note }}
        </p>
      </div>

      <div class="min-w-0">
        <p class="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/40 mb-3">
          {{ c.screensTitle }}
        </p>
        <ProjectGallery
          :shots="c.screens"
          :base-path="PIVOT_PATH"
          featured
          :label="`PIVOT — ${c.screensTitle}`"
          :open-label="c.gallery.enlarge"
          :prev-label="c.gallery.prev"
          :next-label="c.gallery.next"
          :close-label="c.gallery.close"
        />
        <p class="mt-2 text-xs text-white/45 leading-relaxed">{{ c.screensText }}</p>
      </div>
    </div>

    <!-- 2 · component library -->
    <div class="mt-10 sm:mt-12">
      <div class="max-w-2xl mb-5">
        <p class="text-xs uppercase tracking-[0.3em] text-white/40">{{ c.componentsEyebrow }}</p>
        <h3 class="mt-2 text-2xl sm:text-3xl font-bold">{{ c.componentsTitle }}</h3>
        <p class="mt-3 text-sm text-white/60 leading-relaxed">{{ c.componentsText }}</p>
      </div>
      <ProjectGallery
        :shots="c.components"
        :base-path="PIVOT_PATH"
        layout="grid"
        :label="`PIVOT — ${c.componentsTitle}`"
        :open-label="c.gallery.enlarge"
        :prev-label="c.gallery.prev"
        :next-label="c.gallery.next"
        :close-label="c.gallery.close"
      />
    </div>

    <!-- 3 · responsive -->
    <div class="mt-10 sm:mt-12">
      <div class="max-w-2xl mb-5">
        <p class="text-xs uppercase tracking-[0.3em] text-white/40">{{ c.responsiveEyebrow }}</p>
        <h3 class="mt-2 text-2xl sm:text-3xl font-bold">{{ c.responsiveTitle }}</h3>
        <p class="mt-3 text-sm text-white/60 leading-relaxed">{{ c.responsiveText }}</p>
      </div>
      <ProjectGallery
        :shots="c.responsive"
        :base-path="PIVOT_PATH"
        layout="grid"
        :label="`PIVOT — ${c.responsiveTitle}`"
        :open-label="c.gallery.enlarge"
        :prev-label="c.gallery.prev"
        :next-label="c.gallery.next"
        :close-label="c.gallery.close"
      />
    </div>

    <!-- 4 · technical highlights -->
    <div class="mt-10 sm:mt-12 border border-white/25 p-5 sm:p-6 md:p-8 manga-panel">
      <p class="text-xs uppercase tracking-[0.3em] text-white/40">{{ c.technicalEyebrow }}</p>
      <h3 class="mt-2 text-2xl sm:text-3xl font-bold">{{ c.technicalTitle }}</h3>
      <ul class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        <li v-for="item in c.technical" :key="item" class="flex gap-3 text-sm text-white/70 leading-relaxed">
          <span class="mt-2 block h-1.5 w-1.5 shrink-0 bg-white" aria-hidden="true"></span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import ProjectGallery from '../ProjectGallery.vue';
import { PIVOT_PATH, pivotContent } from '../../data/pivot.js';

const language = inject('language', { currentLanguage: ref('en') });
const currentLanguage = language.currentLanguage ?? ref('en');
const c = computed(() => pivotContent(currentLanguage.value));
</script>
