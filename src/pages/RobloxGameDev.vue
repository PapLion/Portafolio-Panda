<template>
  <section class="min-h-screen py-10 sm:py-14 md:py-16 bg-black/80" aria-labelledby="roblox-gamedev-title">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <a
          href="/"
          class="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors w-fit"
        >
          <span aria-hidden="true">←</span>
          <span>{{ copy.back }}</span>
        </a>

        <span class="text-xs uppercase tracking-[0.3em] text-white/40">Dani.Dev / Roblox & Game Dev</span>
      </div>

      <header class="max-w-4xl mb-10 sm:mb-14">
        <p class="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/50 mb-3">{{ copy.eyebrow }}</p>
        <h1 id="roblox-gamedev-title" class="text-3xl sm:text-4xl md:text-5xl font-bold manga-text">
          {{ copy.title }}
        </h1>
        <p class="mt-5 text-sm sm:text-base md:text-lg text-white/65 leading-relaxed max-w-3xl">
          {{ copy.intro }}
        </p>
      </header>

      <article class="manga-panel border-2 border-white p-5 sm:p-7 md:p-9 relative overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">
          <div class="flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="border border-white/50 px-2 py-1 text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                  {{ project.category }}
                </span>
                <span class="bg-white text-black px-2 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em]">
                  {{ copy.focus }}
                </span>
              </div>

              <h2 class="text-2xl sm:text-3xl font-bold">{{ project.title }}</h2>
              <p class="mt-3 text-xs sm:text-sm text-white/55">{{ project.role }}</p>
            </div>

            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="tech in project.stack"
                :key="tech"
                class="border border-white/25 px-2.5 py-1 text-xs text-white/75"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <div class="lg:border-l lg:border-white/20 lg:pl-8">
            <p class="text-sm sm:text-base text-white/80 leading-relaxed">{{ project.description }}</p>

            <ul class="mt-6 space-y-3">
              <li
                v-for="highlight in project.highlights"
                :key="highlight"
                class="flex gap-3 text-sm text-white/70 leading-relaxed"
              >
                <span class="mt-2 block h-1.5 w-1.5 shrink-0 bg-white" aria-hidden="true"></span>
                <span>{{ highlight }}</span>
              </li>
            </ul>

            <div v-if="project.media?.length" class="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                v-for="item in project.media"
                :key="item.src"
                :href="item.href || item.src"
                target="_blank"
                rel="noreferrer"
                class="block border border-white/20 overflow-hidden hover:border-white transition-colors"
              >
                <img :src="item.src" :alt="item.alt" class="w-full aspect-video object-cover" loading="lazy" />
              </a>
            </div>

            <div class="mt-7 flex flex-wrap gap-3">
              <a
                v-for="link in project.links"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noreferrer"
                class="inline-flex items-center border border-white px-3 py-2 text-xs sm:text-sm hover:bg-white hover:text-black transition-colors"
              >
                {{ link.label }} ↗
              </a>
            </div>
          </div>
        </div>
      </article>

      <section v-if="testimonials.length" class="mt-10 sm:mt-12" :aria-label="copy.testimonialsTitle">
        <h2 class="text-xl sm:text-2xl font-bold mb-5">{{ copy.testimonialsTitle }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <blockquote
            v-for="testimonial in testimonials"
            :key="testimonial.quote"
            class="border border-white/30 p-5 manga-panel"
          >
            <p class="text-white/80 leading-relaxed">“{{ testimonial.quote }}”</p>
            <footer class="mt-4 text-xs text-white/50">— {{ testimonial.author }}</footer>
          </blockquote>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, inject, ref } from 'vue';

const language = inject('language', { currentLanguage: ref('en') });
const currentLanguage = language.currentLanguage ?? ref('en');

const content = {
  en: {
    back: 'Back to Dani.Dev',
    eyebrow: 'Roblox / Game Development',
    title: 'Roblox & Game Development',
    intro: 'Gameplay systems, NPC behavior, camera mechanics, and production-oriented Luau work kept together as one game-development discipline.',
    focus: 'Dedicated route',
    testimonialsTitle: 'Client feedback',
    project: {
      category: 'Roblox / Game Development',
      title: 'Roblox Gameplay & NPC Systems',
      role: 'Roblox / Game Developer · Delivered systems and prototypes',
      description: 'Public evidence of Roblox work covering gameplay systems, NPC behavior, camera mechanics, and production-oriented Luau scripting.',
      highlights: [
        'Production-oriented NPC system work with a dedicated production-ready Luau implementation.',
        'Gameplay prototypes and systems organized as Brainroot-game, NPC-System, and Shoulder-Swap.',
        'Roblox work stays grouped with game development rather than being split into artificial portfolio categories.',
      ],
      stack: ['Luau', 'Roblox Studio', 'Gameplay Systems', 'NPC AI', 'QA'],
      links: [{ label: 'View public work', href: 'https://github.com/PapLion/Roblox-Scripting-Work' }],
      media: [],
    },
  },
  es: {
    back: 'Volver a Dani.Dev',
    eyebrow: 'Roblox / Game Development',
    title: 'Roblox & Game Development',
    intro: 'Sistemas de gameplay, comportamiento de NPCs, mecánicas de cámara y trabajo en Luau orientado a producción, reunidos como una sola disciplina de desarrollo de videojuegos.',
    focus: 'Ruta dedicada',
    testimonialsTitle: 'Opiniones de clientes',
    project: {
      category: 'Roblox / Game Development',
      title: 'Sistemas de Gameplay y NPCs en Roblox',
      role: 'Roblox / Game Developer · Sistemas y prototipos entregados',
      description: 'Evidencia pública de trabajo en Roblox, incluyendo sistemas de gameplay, comportamiento de NPCs, mecánicas de cámara y scripting Luau orientado a producción.',
      highlights: [
        'Trabajo de NPCs orientado a producción con una implementación Luau dedicada y lista para uso real.',
        'Prototipos y sistemas organizados como Brainroot-game, NPC-System y Shoulder-Swap.',
        'El trabajo de Roblox se mantiene junto con game development en vez de dividirse en categorías artificiales.',
      ],
      stack: ['Luau', 'Roblox Studio', 'Gameplay Systems', 'NPC AI', 'QA'],
      links: [{ label: 'Ver trabajo público', href: 'https://github.com/PapLion/Roblox-Scripting-Work' }],
      media: [],
    },
  },
};

const testimonials = ref([]);
const copy = computed(() => content[currentLanguage.value] ?? content.en);
const project = computed(() => copy.value.project);
</script>
