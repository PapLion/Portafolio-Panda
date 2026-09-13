<template>
  <section id="real-work" class="py-12 sm:py-16 md:py-20 border-b border-white/20 bg-black" aria-labelledby="real-work-title">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
        <p class="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/50 mb-3">{{ copy.eyebrow }}</p>
        <h2 id="real-work-title" class="text-2xl sm:text-3xl md:text-4xl font-bold section-title">{{ copy.title }}</h2>
        <p class="mt-5 text-sm sm:text-base text-white/65 leading-relaxed">{{ copy.intro }}</p>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        <article
          v-for="project in copy.projects"
          :key="project.id"
          class="manga-panel border-2 border-white p-5 sm:p-7 relative overflow-hidden"
          :class="project.featured ? 'xl:col-span-2' : ''"
        >
          <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div class="lg:w-[38%] flex flex-col justify-between">
              <div>
                <div class="flex flex-wrap items-center gap-2 mb-4">
                  <span class="border border-white/50 px-2 py-1 text-[10px] sm:text-xs uppercase tracking-[0.2em]">{{ project.category }}</span>
                  <span v-if="project.featured" class="bg-white text-black px-2 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em]">{{ copy.featured }}</span>
                </div>
                <h3 class="text-xl sm:text-2xl md:text-3xl font-bold manga-text">{{ project.title }}</h3>
                <p class="mt-3 text-xs sm:text-sm text-white/55">{{ project.role }}</p>
              </div>

              <div class="mt-6 flex flex-wrap gap-2">
                <span v-for="tech in project.stack" :key="tech" class="border border-white/25 px-2.5 py-1 text-xs text-white/75">{{ tech }}</span>
              </div>
            </div>

            <div class="lg:w-[62%] lg:border-l lg:border-white/20 lg:pl-8">
              <p class="text-sm sm:text-base text-white/80 leading-relaxed">{{ project.description }}</p>
              <ul class="mt-5 space-y-3">
                <li v-for="highlight in project.highlights" :key="highlight" class="flex gap-3 text-sm text-white/70 leading-relaxed">
                  <span class="mt-2 block h-1.5 w-1.5 shrink-0 bg-white" aria-hidden="true"></span>
                  <span>{{ highlight }}</span>
                </li>
              </ul>

              <div v-if="project.media?.length" class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a v-for="item in project.media" :key="item.src" :href="item.href || item.src" target="_blank" rel="noreferrer" class="block border border-white/20 overflow-hidden hover:border-white transition-colors">
                  <img :src="item.src" :alt="item.alt" class="w-full aspect-video object-cover" loading="lazy" />
                </a>
              </div>

              <div class="mt-6 flex flex-wrap gap-3">
                <a v-for="link in project.links" :key="link.href" :href="link.href" target="_blank" rel="noreferrer" class="inline-flex items-center border border-white px-3 py-2 text-xs sm:text-sm hover:bg-white hover:text-black transition-colors">
                  {{ link.label }} ↗
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div v-if="testimonials.length" class="mt-10 sm:mt-12">
        <h3 class="text-xl sm:text-2xl font-bold mb-5">{{ copy.testimonialsTitle }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <blockquote v-for="testimonial in testimonials" :key="testimonial.quote" class="border border-white/30 p-5 manga-panel">
            <p class="text-white/80 leading-relaxed">“{{ testimonial.quote }}”</p>
            <footer class="mt-4 text-xs text-white/50">— {{ testimonial.author }}</footer>
          </blockquote>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, inject, ref } from 'vue';

const language = inject('language', { currentLanguage: ref('en') });
const currentLanguage = language.currentLanguage ?? ref('en');

const content = {
  en: {
    eyebrow: 'Delivered work / real clients',
    title: 'Work shipped outside the portfolio',
    intro: 'Selected work that has been maintained, delivered, or used beyond a demo. Existing case studies remain untouched; this section adds concrete evidence from real engagements.',
    featured: 'Featured',
    testimonialsTitle: 'Client feedback',
    projects: [
      {
        id: 'bloxtop',
        featured: true,
        category: 'E-commerce / Automation',
        title: 'BloxTop',
        role: 'Fullstack Developer · Ongoing client work',
        description: 'Ongoing engineering and maintenance for a Shopify Hydrogen storefront focused on digital Roblox items, spanning storefront UX, delivery/claim flows, production fixes, QA, and technical SEO.',
        highlights: [
          'Maintained and extended a Shopify Hydrogen / Remix storefront in production.',
          'Built and hardened claim and delivery flows that connect storefront state with automated item delivery.',
          'Shipped storefront fixes across cart, locale handling, selectors, checkout-facing flows, and technical SEO.',
          'Worked with regression testing and production QA to keep changes safe across an actively maintained store.',
        ],
        stack: ['Shopify Hydrogen', 'Remix', 'TypeScript', 'GraphQL', 'Playwright', 'Oxygen'],
        links: [{ label: 'Visit BloxTop', href: 'https://bloxtop.com' }],
        media: [],
      },
      {
        id: 'roblox-work',
        featured: false,
        category: 'Roblox / Game Development',
        title: 'Roblox Gameplay & NPC Systems',
        role: 'Roblox / Game Developer · Delivered systems and prototypes',
        description: 'A public evidence repository for Roblox work, covering gameplay systems, NPC behavior, camera mechanics, and production-oriented Luau scripting.',
        highlights: [
          'Production-oriented NPC system work with a dedicated production-ready Luau implementation.',
          'Gameplay prototypes and systems grouped as Brainroot-game, NPC-System, and Shoulder-Swap.',
          'Roblox work is kept together with game development instead of being split into artificial portfolio categories.',
        ],
        stack: ['Luau', 'Roblox Studio', 'Gameplay Systems', 'NPC AI', 'QA'],
        links: [{ label: 'View public work', href: 'https://github.com/PapLion/Roblox-Scripting-Work' }],
        media: [],
      },
    ],
  },
  es: {
    eyebrow: 'Trabajo entregado / clientes reales',
    title: 'Trabajo publicado fuera del portafolio',
    intro: 'Una selección de trabajo mantenido, entregado o usado más allá de una demo. Los casos de estudio existentes se conservan intactos; esta sección solo añade evidencia concreta de trabajos reales.',
    featured: 'Destacado',
    testimonialsTitle: 'Opiniones de clientes',
    projects: [
      {
        id: 'bloxtop',
        featured: true,
        category: 'E-commerce / Automatización',
        title: 'BloxTop',
        role: 'Desarrollador Fullstack · Trabajo continuo con cliente',
        description: 'Ingeniería y mantenimiento continuo de una tienda Shopify Hydrogen enfocada en ítems digitales de Roblox, cubriendo UX del storefront, flujos de entrega/claim, fixes de producción, QA y SEO técnico.',
        highlights: [
          'Mantenimiento y extensión de un storefront Shopify Hydrogen / Remix en producción.',
          'Construcción y endurecimiento de flujos de claim y delivery que conectan el estado de la tienda con la entrega automatizada de ítems.',
          'Entrega de fixes en carrito, locales, selectores, flujos cercanos al checkout y SEO técnico.',
          'Uso de pruebas de regresión y QA de producción para mantener cambios seguros en una tienda activa.',
        ],
        stack: ['Shopify Hydrogen', 'Remix', 'TypeScript', 'GraphQL', 'Playwright', 'Oxygen'],
        links: [{ label: 'Visitar BloxTop', href: 'https://bloxtop.com' }],
        media: [],
      },
      {
        id: 'roblox-work',
        featured: false,
        category: 'Roblox / Game Development',
        title: 'Sistemas de Gameplay y NPCs en Roblox',
        role: 'Roblox / Game Developer · Sistemas y prototipos entregados',
        description: 'Repositorio público de evidencia de trabajo en Roblox, incluyendo sistemas de gameplay, comportamiento de NPCs, mecánicas de cámara y scripting Luau orientado a producción.',
        highlights: [
          'Trabajo de NPCs orientado a producción con una implementación Luau dedicada y lista para uso real.',
          'Prototipos y sistemas organizados como Brainroot-game, NPC-System y Shoulder-Swap.',
          'El trabajo de Roblox se mantiene junto con game development en vez de dividirse en categorías artificiales.',
        ],
        stack: ['Luau', 'Roblox Studio', 'Gameplay Systems', 'NPC AI', 'QA'],
        links: [{ label: 'Ver trabajo público', href: 'https://github.com/PapLion/Roblox-Scripting-Work' }],
        media: [],
      },
    ],
  },
};

const testimonials = ref([]);
const copy = computed(() => content[currentLanguage.value] ?? content.en);
</script>
