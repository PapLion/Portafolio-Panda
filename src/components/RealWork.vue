<template>
  <section id="real-work" class="py-12 sm:py-16 md:py-20 border-b border-white/20 bg-black" aria-labelledby="real-work-title">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
        <p class="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/50 mb-3">{{ copy.eyebrow }}</p>
        <h2 id="real-work-title" class="text-2xl sm:text-3xl md:text-4xl font-bold section-title">{{ copy.title }}</h2>
        <p class="mt-4 text-sm sm:text-base text-white/65 leading-relaxed">{{ copy.intro }}</p>
      </div>

      <article class="manga-panel border-2 border-white p-5 sm:p-7 relative overflow-hidden">
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div class="lg:w-[38%] flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-4">
                <span class="border border-white/50 px-2 py-1 text-[10px] sm:text-xs uppercase tracking-[0.2em]">{{ copy.project.category }}</span>
                <span class="bg-white text-black px-2 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em]">{{ copy.project.badge }}</span>
              </div>
              <h3 class="text-xl sm:text-2xl md:text-3xl font-bold manga-text">{{ copy.project.title }}</h3>
              <p class="mt-3 text-xs sm:text-sm text-white/55">{{ copy.project.role }}</p>
            </div>

            <div class="mt-6 flex flex-wrap gap-2">
              <span v-for="tech in copy.project.stack" :key="tech" class="border border-white/25 px-2.5 py-1 text-xs text-white/75">{{ tech }}</span>
            </div>
          </div>

          <div class="lg:w-[62%] lg:border-l lg:border-white/20 lg:pl-8">
            <p class="text-sm sm:text-base text-white/80 leading-relaxed">{{ copy.project.description }}</p>
            <ul class="mt-5 space-y-3">
              <li v-for="highlight in copy.project.highlights" :key="highlight" class="flex gap-3 text-sm text-white/70 leading-relaxed">
                <span class="mt-2 block h-1.5 w-1.5 shrink-0 bg-white" aria-hidden="true"></span>
                <span>{{ highlight }}</span>
              </li>
            </ul>

            <div v-if="copy.project.media?.length" class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a v-for="item in copy.project.media" :key="item.src" :href="item.href || item.src" target="_blank" rel="noreferrer" class="block border border-white/20 overflow-hidden hover:border-white transition-colors">
                <img :src="item.src" :alt="item.alt" class="w-full aspect-video object-cover" loading="lazy" />
              </a>
            </div>

            <div class="mt-6 flex flex-wrap gap-3">
              <a v-for="link in copy.project.links" :key="link.href" :href="link.href" target="_blank" rel="noreferrer" class="inline-flex items-center border border-white px-3 py-2 text-xs sm:text-sm hover:bg-white hover:text-black transition-colors">
                {{ link.label }} ↗
              </a>
            </div>
          </div>
        </div>
      </article>

      <div class="mt-5 text-center sm:text-right">
        <a
          href="/roblox-gamedev"
          class="text-xs sm:text-sm text-white/45 hover:text-white transition-colors"
        >
          {{ copy.robloxRoutePrompt }}
          <span class="ml-1 text-white/70">{{ copy.robloxRouteCta }} →</span>
        </a>
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
    eyebrow: 'Selected work',
    title: 'Flagship Project',
    intro: 'If you only have time to review one project, start here: real production work with broad contribution across the platform.',
    testimonialsTitle: 'Client feedback',
    robloxRoutePrompt: 'Looking for Roblox / Game Dev?',
    robloxRouteCta: 'Separate portfolio',
    project: {
      category: 'E-commerce / Automation',
      badge: 'Client project',
      title: 'BloxTop',
      role: 'Fullstack Developer · Production client project',
      description: 'Fullstack contributor on a production Shopify Hydrogen platform for digital Roblox items, working across storefront engineering, automated delivery, commerce flows, QA, and technical SEO.',
      highlights: [
        'Production storefront work across UX, cart/locale flows, selectors, and checkout-facing fixes.',
        'Automated claim and delivery flows connecting Shopify state with item delivery.',
        'Production QA and technical SEO improvements for a live storefront.',
      ],
      stack: ['Shopify Hydrogen', 'Remix', 'TypeScript', 'GraphQL', 'Oxygen'],
      links: [{ label: 'Visit BloxTop', href: 'https://bloxtop.com' }],
      media: [],
    },
  },
  es: {
    eyebrow: 'Trabajo seleccionado',
    title: 'Proyecto insignia',
    intro: 'Si solo tienes tiempo de revisar un proyecto, empieza por este: trabajo real en producción con participación transversal en la plataforma.',
    testimonialsTitle: 'Opiniones de clientes',
    robloxRoutePrompt: '¿Buscas Roblox / Game Dev?',
    robloxRouteCta: 'Portafolio aparte',
    project: {
      category: 'E-commerce / Automatización',
      badge: 'Proyecto cliente',
      title: 'BloxTop',
      role: 'Desarrollador Fullstack · Proyecto cliente en producción',
      description: 'Participación fullstack en una plataforma Shopify Hydrogen en producción para ítems digitales de Roblox, cubriendo storefront, entrega automatizada, flujos de comercio, QA y SEO técnico.',
      highlights: [
        'Trabajo de storefront en UX, carrito/locales, selectores y fixes cercanos al checkout.',
        'Flujos automatizados de claim y delivery conectando el estado de Shopify con la entrega de ítems.',
        'QA de producción y mejoras de SEO técnico sobre una tienda en uso real.',
      ],
      stack: ['Shopify Hydrogen', 'Remix', 'TypeScript', 'GraphQL', 'Oxygen'],
      links: [{ label: 'Visitar BloxTop', href: 'https://bloxtop.com' }],
      media: [],
    },
  },
};

const testimonials = ref([]);
const copy = computed(() => content[currentLanguage.value] ?? content.en);
</script>
