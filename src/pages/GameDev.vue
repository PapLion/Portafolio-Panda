<template>
  <section class="min-h-screen py-8 sm:py-10 md:py-12 bg-black/80" aria-labelledby="gamedev-title">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Top Bar -->
      <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 mb-7 sm:mb-9">
        <a
          href="/"
          class="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors w-fit"
        >
          <span aria-hidden="true">←</span>
          <span>{{ copy.back }}</span>
        </a>

        <div class="flex items-center gap-4 sm:gap-5">
          <span class="hidden md:inline text-xs uppercase tracking-[0.3em] text-white/40">
            Dani.Dev / Game Dev
          </span>
          <a href="/roblox-gamedev" class="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
            Roblox / Game Dev →
          </a>
          <a href="/3d-modeling" class="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
            {{ copy.modeling }} →
          </a>
          <LanguageSelector />
        </div>
      </div>

      <!-- Engine-Agnostic Hero -->
      <header class="border-t border-white/20 pt-6 sm:pt-8 mb-10 sm:mb-12">
        <p class="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-white/45">
          {{ meta.eyebrow }}
        </p>

        <h1
          id="gamedev-title"
          class="mt-3 text-3xl sm:text-4xl md:text-[2.75rem] font-bold manga-text leading-[1.08] max-w-4xl"
        >
          {{ meta.title }}
        </h1>

        <p class="mt-4 text-sm sm:text-base text-white/72 leading-relaxed max-w-3xl">
          {{ meta.intro }}
        </p>

        <div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm">
          <div class="flex flex-wrap items-center gap-2 text-white/55">
            <span>{{ meta.robloxCallout }}</span>
            <a href="/roblox-gamedev" class="text-white underline underline-offset-4 hover:text-white/80">
              {{ meta.robloxCta }} →
            </a>
          </div>
        </div>
      </header>

      <!-- Featured Gameplay Projects -->
      <div class="space-y-10 sm:space-y-12">
        <FeaturedGameProject
          v-for="project in gameDevProjects"
          :key="project.id"
          :project="project"
          :lang="lang"
        />
      </div>

      <!-- Footer Links -->
      <footer class="mt-12 sm:mt-16 pt-8 border-t border-white/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex flex-wrap gap-5 text-xs sm:text-sm text-white/65">
          <a href="/roblox-gamedev" class="hover:text-white transition-colors">Roblox / Game Dev →</a>
          <a href="/3d-modeling" class="hover:text-white transition-colors">{{ copy.modeling }} →</a>
          <a href="/ui" class="hover:text-white transition-colors">UI Library →</a>
        </div>
        <a
          href="/#contact"
          class="inline-flex items-center justify-center border border-white px-4 py-2 text-xs sm:text-sm font-medium hover:bg-white hover:text-black transition-colors w-fit"
        >
          {{ copy.contact }}
        </a>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import LanguageSelector from '../components/LanguageSelector.vue';
import FeaturedGameProject from '../components/gamedev/FeaturedGameProject.vue';
import { gameDevMeta, gameDevProjects } from '../data/gameDevProjects.js';

const language = inject('language', { currentLanguage: ref('en') });
const currentLanguage = language.currentLanguage ?? ref('en');
const lang = computed(() => (currentLanguage.value === 'es' ? 'es' : 'en'));

const meta = computed(() => gameDevMeta[lang.value]);

const copy = computed(() =>
  lang.value === 'es'
    ? {
        back: 'Volver al portafolio',
        modeling: 'Modelado 3D',
        contact: 'Contactar para un proyecto',
      }
    : {
        back: 'Back to Portfolio',
        modeling: '3D Modeling',
        contact: 'Discuss a project',
      }
);
</script>
