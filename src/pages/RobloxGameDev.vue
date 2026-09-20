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

        <div class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="tech in copy.stack"
            :key="tech"
            class="border border-white/25 px-2.5 py-1 text-xs text-white/70"
          >
            {{ tech }}
          </span>
        </div>
      </header>

      <section aria-labelledby="case-studies-title">
        <div class="flex items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-white/40">{{ copy.caseStudiesEyebrow }}</p>
            <h2 id="case-studies-title" class="mt-2 text-2xl sm:text-3xl font-bold">{{ copy.caseStudiesTitle }}</h2>
          </div>
          <span class="hidden sm:block text-xs text-white/35">{{ caseStudies.length }} {{ copy.systemsLabel }}</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <article
            v-for="(study, index) in caseStudies"
            :key="study.id"
            class="manga-panel border border-white/35 p-5 sm:p-6 md:p-7 relative overflow-hidden"
          >
            <div class="flex items-center justify-between gap-4 mb-5">
              <span class="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/45">
                {{ copy.caseStudyLabel }} {{ String(index + 1).padStart(2, '0') }}
              </span>
              <span class="text-[10px] sm:text-xs border border-white/30 px-2 py-1 text-white/60">
                {{ study.category }}
              </span>
            </div>

            <h3 class="text-xl sm:text-2xl font-bold">{{ study.title }}</h3>
            <p class="mt-3 text-sm text-white/65 leading-relaxed">{{ study.description }}</p>

            <ul v-if="study.highlights?.length" class="mt-5 space-y-2.5">
              <li
                v-for="highlight in study.highlights"
                :key="highlight"
                class="flex gap-3 text-sm text-white/65 leading-relaxed"
              >
                <span class="mt-2 block h-1.5 w-1.5 shrink-0 bg-white" aria-hidden="true"></span>
                <span>{{ highlight }}</span>
              </li>
            </ul>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tag in study.tags"
                :key="tag"
                class="border border-white/20 px-2.5 py-1 text-xs text-white/60"
              >
                {{ tag }}
              </span>
            </div>

            <div v-if="study.media?.length" class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                v-for="item in study.media"
                :key="item.src"
                :href="item.href || item.src"
                target="_blank"
                rel="noreferrer"
                class="block border border-white/20 overflow-hidden hover:border-white transition-colors"
              >
                <img :src="item.src" :alt="item.alt" class="w-full aspect-video object-cover" loading="lazy" />
              </a>
            </div>
          </article>
        </div>
      </section>

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
    title: 'Game Systems Case Studies',
    intro: 'A selection of gameplay systems I have built across years of Roblox and game development. Each case study represents a distinct system or gameplay discipline I have worked on.',
    caseStudiesEyebrow: 'Selected systems',
    caseStudiesTitle: 'Case Studies',
    caseStudyLabel: 'Case Study',
    systemsLabel: 'systems',
    testimonialsTitle: 'Client feedback',
    stack: ['Luau', 'Roblox Studio', 'Gameplay Systems', 'Game Development'],
    caseStudies: [
      {
        id: 'fps-combat',
        category: 'Combat',
        title: 'First-Person Shooter Combat',
        description: 'A first-person shooter combat system built around real-time player interaction and combat gameplay.',
        highlights: [
          'First-person combat and shooter-oriented gameplay logic.',
          'Designed as a reusable gameplay system rather than a one-off scripted sequence.',
        ],
        tags: ['FPS', 'Combat Systems', 'Luau'],
        media: [],
      },
      {
        id: 'advanced-ai',
        category: 'AI',
        title: 'Advanced NPC & AI Systems',
        description: 'Advanced AI and NPC behavior systems created for gameplay-driven environments.',
        highlights: [
          'NPC behavior and decision-oriented gameplay systems.',
          'AI work designed to interact with wider game systems rather than operate in isolation.',
        ],
        tags: ['NPC AI', 'Game AI', 'Behavior Systems'],
        media: [],
      },
      {
        id: 'vehicles',
        category: 'Vehicles',
        title: 'Vehicle Systems — Cars & Aircraft',
        description: 'Driving and control systems built for both ground vehicles and aircraft.',
        highlights: [
          'Vehicle gameplay covering cars and ground movement.',
          'Aircraft control systems as a separate movement and handling problem.',
        ],
        tags: ['Vehicles', 'Cars', 'Aircraft'],
        media: [],
      },
      {
        id: 'qte',
        category: 'Interaction',
        title: 'Quick-Time Events',
        description: 'Quick-time event systems for timed and sequence-based player interactions.',
        highlights: [
          'Timing-sensitive player input sequences.',
          'Reusable interaction logic for scripted gameplay moments.',
        ],
        tags: ['QTE', 'Interaction Systems', 'Gameplay'],
        media: [],
      },
      {
        id: 'narrative-dialogue',
        category: 'Narrative',
        title: 'Narrative & Dialogue Systems',
        description: 'Dialogue and narrative systems built to support story-driven gameplay and character interactions.',
        highlights: [
          'Dialogue flow and player-facing narrative interactions.',
          'Systems intended to support reusable story and conversation structures.',
        ],
        tags: ['Dialogue', 'Narrative Systems', 'UI'],
        media: [],
      },
      {
        id: 'simulator',
        category: 'Game Loop',
        title: 'Simulator Systems',
        description: 'Core systems for Roblox-style simulator gameplay and repeatable progression-oriented game loops.',
        highlights: [
          'Gameplay systems for the simulator genre.',
          'Reusable mechanics designed around repeatable player loops.',
        ],
        tags: ['Simulator', 'Game Loops', 'Gameplay Systems'],
        media: [],
      },
      {
        id: 'fighting-combat',
        category: 'Combat',
        title: 'Fighting Game Combat',
        description: 'Combat systems built for fighting-game style player-versus-player gameplay.',
        highlights: [
          'Close-range fighting-game combat logic.',
          'A separate combat discipline from shooter-oriented gameplay.',
        ],
        tags: ['Fighting Game', 'Combat Systems', 'PvP'],
        media: [],
      },
    ],
  },
  es: {
    back: 'Volver a Dani.Dev',
    eyebrow: 'Roblox / Game Development',
    title: 'Casos de estudio de sistemas de juego',
    intro: 'Una selección de sistemas de gameplay que he construido a lo largo de años desarrollando en Roblox y videojuegos. Cada caso representa un sistema o disciplina de gameplay distinta en la que he trabajado.',
    caseStudiesEyebrow: 'Sistemas seleccionados',
    caseStudiesTitle: 'Casos de estudio',
    caseStudyLabel: 'Caso de estudio',
    systemsLabel: 'sistemas',
    testimonialsTitle: 'Opiniones de clientes',
    stack: ['Luau', 'Roblox Studio', 'Sistemas de Gameplay', 'Game Development'],
    caseStudies: [
      {
        id: 'fps-combat',
        category: 'Combate',
        title: 'Combate Shooter en Primera Persona',
        description: 'Sistema de combate en primera persona orientado a gameplay shooter e interacción en tiempo real.',
        highlights: [
          'Lógica de combate y gameplay orientada a un shooter en primera persona.',
          'Construido como sistema reutilizable y no como una secuencia aislada.',
        ],
        tags: ['FPS', 'Sistemas de Combate', 'Luau'],
        media: [],
      },
      {
        id: 'advanced-ai',
        category: 'IA',
        title: 'Sistemas Avanzados de NPCs e IA',
        description: 'Sistemas avanzados de inteligencia artificial y comportamiento de NPCs para entornos de gameplay.',
        highlights: [
          'Comportamiento de NPCs y sistemas de decisión orientados al juego.',
          'IA diseñada para interactuar con otros sistemas del juego.',
        ],
        tags: ['IA de NPCs', 'Game AI', 'Comportamiento'],
        media: [],
      },
      {
        id: 'vehicles',
        category: 'Vehículos',
        title: 'Sistemas de Vehículos — Coches y Aviones',
        description: 'Sistemas de conducción y control desarrollados tanto para vehículos terrestres como para aeronaves.',
        highlights: [
          'Gameplay de vehículos para coches y movimiento terrestre.',
          'Sistemas de control de aviones como problema independiente de movimiento y manejo.',
        ],
        tags: ['Vehículos', 'Coches', 'Aviones'],
        media: [],
      },
      {
        id: 'qte',
        category: 'Interacción',
        title: 'Quick-Time Events',
        description: 'Sistemas de quick-time events para interacciones temporizadas y secuencias de inputs del jugador.',
        highlights: [
          'Secuencias de entrada sensibles al tiempo.',
          'Lógica reutilizable para momentos de gameplay guiados.',
        ],
        tags: ['QTE', 'Interacción', 'Gameplay'],
        media: [],
      },
      {
        id: 'narrative-dialogue',
        category: 'Narrativa',
        title: 'Sistemas de Narrativa y Diálogo',
        description: 'Sistemas de diálogo y narrativa para gameplay centrado en historias e interacción con personajes.',
        highlights: [
          'Flujos de diálogo e interacción narrativa de cara al jugador.',
          'Estructuras reutilizables para conversaciones e historia.',
        ],
        tags: ['Diálogo', 'Narrativa', 'UI'],
        media: [],
      },
      {
        id: 'simulator',
        category: 'Game Loop',
        title: 'Sistemas de Simuladores',
        description: 'Sistemas base para gameplay de simuladores en Roblox y loops de juego repetibles orientados a progresión.',
        highlights: [
          'Sistemas de gameplay propios del género simulator.',
          'Mecánicas reutilizables alrededor de loops repetibles del jugador.',
        ],
        tags: ['Simulator', 'Game Loops', 'Gameplay'],
        media: [],
      },
      {
        id: 'fighting-combat',
        category: 'Combate',
        title: 'Combate de Juego de Pelea',
        description: 'Sistemas de combate construidos para gameplay jugador contra jugador con enfoque de fighting game.',
        highlights: [
          'Lógica de combate cuerpo a cuerpo orientada a un juego de pelea.',
          'Disciplina de combate distinta al gameplay shooter.',
        ],
        tags: ['Fighting Game', 'Combate', 'PvP'],
        media: [],
      },
    ],
  },
};

const testimonials = ref([]);
const copy = computed(() => content[currentLanguage.value] ?? content.en);
const caseStudies = computed(() => copy.value.caseStudies);
</script>
