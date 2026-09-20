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

      <header class="max-w-4xl mb-10 sm:mb-12">
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


      <section class="mb-10 sm:mb-12" aria-labelledby="roblox-flagship-title">
        <article class="manga-panel border border-white/35 overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
            <div class="p-5 sm:p-6 md:p-8">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-white/50">
                  {{ flagship.eyebrow }}
                </span>
                <span class="border border-white/25 px-2 py-1 text-[10px] sm:text-xs text-white/55">
                  {{ flagship.status }}
                </span>
              </div>

              <p class="mt-5 text-xs uppercase tracking-[0.2em] text-white/45">{{ flagship.role }}</p>
              <h2 id="roblox-flagship-title" class="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold max-w-2xl">
                {{ flagship.title }}
              </h2>
              <p class="mt-4 text-sm sm:text-base text-white/65 leading-relaxed max-w-2xl">
                {{ flagship.description }}
              </p>

              <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-px border border-white/15 bg-white/15">
                <div
                  v-for="area in flagshipAreas"
                  :key="area.title"
                  class="bg-black/90 p-4"
                >
                  <h3 class="text-sm font-semibold text-white/90">{{ area.title }}</h3>
                  <p class="mt-2 text-xs sm:text-sm text-white/55 leading-relaxed">{{ area.description }}</p>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="tag in flagship.tags"
                  :key="tag"
                  class="border border-white/20 px-2.5 py-1 text-xs text-white/55"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="border-t lg:border-t-0 lg:border-l border-white/20 bg-white/[0.025]">
              <figure v-if="flagshipEvidence.length" class="relative border-b border-white/15">
                <img
                  :src="flagshipEvidence[0].src"
                  :alt="flagshipEvidence[0].alt"
                  class="w-full aspect-[16/10] object-cover"
                  loading="eager"
                />
                <figcaption class="px-4 py-3 text-[11px] sm:text-xs text-white/45">
                  {{ flagshipEvidence[0].label }}
                </figcaption>
              </figure>

              <blockquote class="p-5 sm:p-6 border-b border-white/15">
                <p class="text-sm sm:text-base text-white/80 leading-relaxed">
                  “{{ flagship.quote }}”
                </p>
                <footer class="mt-3 text-[11px] sm:text-xs text-white/40">
                  — {{ flagship.quoteAuthor }}
                </footer>
              </blockquote>

              <details class="group">
                <summary class="cursor-pointer list-none px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm text-white/65 hover:text-white transition-colors">
                  <span>{{ flagship.evidenceSummary }}</span>
                  <span aria-hidden="true" class="text-white/40 group-open:rotate-45 transition-transform">+</span>
                </summary>

                <div class="px-5 sm:px-6 pb-5 sm:pb-6">
                  <div
                    v-for="item in flagshipEvidence.slice(1)"
                    :key="item.label"
                    class="border border-white/15 overflow-hidden"
                  >
                    <img
                      :src="item.src"
                      :alt="item.alt"
                      class="w-full aspect-[2.2/1] object-cover"
                      loading="lazy"
                    />
                    <p class="px-3 py-2 text-[11px] sm:text-xs text-white/45">{{ item.label }}</p>
                  </div>

                  <ul class="mt-4 space-y-2">
                    <li
                      v-for="point in flagship.evidencePoints"
                      :key="point"
                      class="flex gap-2 text-xs sm:text-sm text-white/55 leading-relaxed"
                    >
                      <span class="mt-1.5 h-1 w-1 shrink-0 bg-white/60" aria-hidden="true"></span>
                      <span>{{ point }}</span>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </article>
      </section>

      <section aria-labelledby="case-studies-title">
        <div class="flex items-end justify-between gap-4 mb-5">
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-white/40">{{ copy.caseStudiesEyebrow }}</p>
            <h2 id="case-studies-title" class="mt-2 text-2xl sm:text-3xl font-bold">{{ copy.caseStudiesTitle }}</h2>
          </div>
          <span class="text-xs text-white/35">{{ activeIndex + 1 }} / {{ caseStudies.length }}</span>
        </div>

        <div
          class="manga-panel border border-white/35 p-5 sm:p-6 md:p-8 relative overflow-hidden"
          tabindex="0"
          aria-live="polite"
          @keydown.left.prevent="previousStudy"
          @keydown.right.prevent="nextStudy"
        >
          <div class="flex items-center justify-between gap-4 mb-6">
            <div class="flex items-center gap-3 min-w-0">
              <span class="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/45 shrink-0">
                {{ copy.caseStudyLabel }} {{ String(activeIndex + 1).padStart(2, '0') }}
              </span>
              <span class="text-[10px] sm:text-xs border border-white/30 px-2 py-1 text-white/60 truncate">
                {{ activeStudy.category }}
              </span>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <button
                type="button"
                class="h-9 w-9 border border-white/30 hover:border-white hover:bg-white hover:text-black transition-colors"
                :aria-label="copy.previous"
                @click="previousStudy"
              >
                ←
              </button>
              <button
                type="button"
                class="h-9 w-9 border border-white/30 hover:border-white hover:bg-white hover:text-black transition-colors"
                :aria-label="copy.next"
                @click="nextStudy"
              >
                →
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8">
            <div>
              <h3 class="text-2xl sm:text-3xl font-bold">{{ activeStudy.title }}</h3>
              <p class="mt-3 text-sm sm:text-base text-white/65 leading-relaxed">
                {{ activeStudy.description }}
              </p>

              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="tag in activeStudy.tags"
                  :key="tag"
                  class="border border-white/20 px-2.5 py-1 text-xs text-white/60"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="lg:border-l lg:border-white/20 lg:pl-8">
              <ul class="space-y-3">
                <li
                  v-for="highlight in activeStudy.highlights"
                  :key="highlight"
                  class="flex gap-3 text-sm text-white/70 leading-relaxed"
                >
                  <span class="mt-2 block h-1.5 w-1.5 shrink-0 bg-white" aria-hidden="true"></span>
                  <span>{{ highlight }}</span>
                </li>
              </ul>

              <div v-if="activeStudy.media?.length" class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  v-for="item in activeStudy.media"
                  :key="item.src"
                  :href="item.href || item.src"
                  target="_blank"
                  rel="noreferrer"
                  class="block border border-white/20 overflow-hidden hover:border-white transition-colors"
                >
                  <img :src="item.src" :alt="item.alt" class="w-full aspect-video object-cover" loading="lazy" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="case-study-scroller mt-3 overflow-x-auto pb-2">
          <div class="flex gap-2 min-w-max">
            <button
              v-for="(study, index) in caseStudies"
              :key="study.id"
              type="button"
              class="text-left border px-3 py-2 min-w-[150px] sm:min-w-[175px] transition-colors"
              :class="index === activeIndex
                ? 'border-white bg-white text-black'
                : 'border-white/20 text-white/55 hover:border-white/60 hover:text-white'"
              :aria-current="index === activeIndex ? 'true' : undefined"
              @click="selectStudy(index)"
            >
              <span class="block text-[9px] uppercase tracking-[0.2em] opacity-60">
                {{ String(index + 1).padStart(2, '0') }} · {{ study.category }}
              </span>
              <span class="block mt-1 text-xs sm:text-sm font-medium truncate">
                {{ study.shortTitle || study.title }}
              </span>
            </button>
          </div>
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
import { flagshipArrest, flagshipPatrolPoints } from '../data/robloxFlagshipMedia.js';

const language = inject('language', { currentLanguage: ref('en') });
const currentLanguage = language.currentLanguage ?? ref('en');
const activeIndex = ref(0);

const content = {
  en: {
    back: 'Back to Dani.Dev',
    eyebrow: 'Roblox / Game Development',
    title: 'Game Systems Case Studies',
    intro: 'A compact selection of gameplay systems I have built across years of Roblox and game development. Browse them as individual case studies rather than code dumps.',
    caseStudiesEyebrow: 'Selected systems',
    caseStudiesTitle: 'Case Studies',
    caseStudyLabel: 'Case Study',
    previous: 'Previous case study',
    next: 'Next case study',
    testimonialsTitle: 'Client feedback',
    stack: ['Luau', 'Roblox Studio', 'Client / Server', 'Gameplay Systems', 'Game Development'],
    flagship: {
      eyebrow: 'Flagship Client Project',
      status: 'Paid client work · 2026',
      role: 'Full-stack Roblox Game Developer',
      title: 'Adaptive Tactical AI & Combat Systems',
      description: 'A paid Roblox commission that grew from focused NPC improvements into an interconnected gameplay system spanning AI behavior, combat, player interactions, UI/audio feedback, animation integration, and production QA.',
      quote: "You've exceeded my expectations ... absolutely nailing the request.",
      quoteAuthor: 'Roblox client, after testing the NPC system',
      evidenceSummary: 'Development evidence',
      evidencePoints: [
        'Iterative delivery through real client testing, revisions, and follow-up commissions.',
        'Production work inside an existing game and codebase rather than an isolated portfolio demo.',
        'Documented handoff and continued support around the systems delivered.',
      ],
      tags: ['Luau', 'State Machines', 'Pathfinding', 'Combat AI', 'RemoteEvents', 'UI / Audio'],
      areas: [
        {
          title: 'AI & Behaviour',
          description: 'State-driven NPCs with perception, pathfinding, patrol/search, behavior traits, surrender, arrest, and variable tactical decisions.',
        },
        {
          title: 'Combat Systems',
          description: 'Semi, automatic, and spread weapon modes, pre-fire, melee, flashbang/damage reactions, and weapon-state handling.',
        },
        {
          title: 'Player Experience',
          description: 'Intimidation and arrest flows, responsive subtitles, contextual audio, footsteps, ragdoll, and animation-state integration.',
        },
        {
          title: 'Production Integration',
          description: 'Worked inside an existing project, incorporated live client QA, documented the systems, and shipped revisions across the development cycle.',
        },
      ],
      evidence: [
        {
          src: flagshipArrest,
          alt: 'Roblox development build showing an NPC surrender and arrest interaction.',
          label: 'Surrender and arrest interaction in a development build.',
        },
        {
          src: flagshipPatrolPoints,
          alt: 'Roblox Studio showing configurable patrol points for an NPC.',
          label: 'Configurable patrol-point workflow inside Roblox Studio.',
        },
      ],
    },
    caseStudies: [
      {
        id: 'fps-combat',
        category: 'Combat',
        shortTitle: 'FPS Combat',
        title: 'First-Person Shooter Combat',
        description: 'A modular first-person weapon and combat framework covering aiming, weapon feel, camera behavior, feedback, and configurable combat states.',
        highlights: [
          'Recoil, weapon sway, aim/FOV transitions, stance handling, and shoulder/camera behavior.',
          'Tracer, hit feedback, shell ejection, projectile, whizz, crosshair, and weapon-audio modules.',
          'Support for combat equipment states such as laser/IR, suppressors, bipods, flashlights, and sight modes.',
        ],
        tags: ['FPS', 'Weapon Systems', 'Camera', 'Combat'],
        media: [],
      },
      {
        id: 'advanced-ai',
        category: 'AI',
        shortTitle: 'Advanced AI',
        title: 'Advanced NPC & AI Systems',
        description: 'A state-driven NPC combat system designed around perception, navigation, behavior variation, combat decisions, and recovery when contact with the player is lost.',
        highlights: [
          'State machine covering patrol, alert, combat, melee, flee, surrender, arrest, stun, search, and death.',
          'FOV/line-of-sight sensing, last-seen tracking, pathfinding, active search around the last known position, and smooth rotation.',
          'Behavior roles and weapon modes including semi-auto, burst-style automatic fire, spread weapons, pre-fire, and rusher behavior.',
        ],
        tags: ['NPC AI', 'State Machines', 'Pathfinding', 'Combat AI'],
        media: [],
      },
      {
        id: 'vehicles',
        category: 'Vehicles',
        shortTitle: 'Vehicles',
        title: 'Vehicle Systems — Cars & Aircraft',
        description: 'Driving and control systems built for ground vehicles and aircraft, with the repository-backed ground implementation covering the full player-to-vehicle loop.',
        highlights: [
          'Ground vehicle implementation with client/server input separation, acceleration/braking, friction, and smoothed steering.',
          'Custom driving camera, fuel HUD, fuel consumption, refueling interactions, and enter/exit handling.',
          'Separate aircraft-control work built around the different movement and handling requirements of flight.',
        ],
        tags: ['Vehicles', 'Cars', 'Aircraft', 'Controls'],
        media: [],
      },
      {
        id: 'qte',
        category: 'Interaction',
        shortTitle: 'QTE',
        title: 'Quick-Time Events',
        description: 'Quick-time event systems for timing-sensitive and sequence-based player interactions.',
        highlights: [
          'Timed input windows and sequence-driven interaction flow.',
          'Reusable logic designed for scripted gameplay moments rather than one-off hardcoded scenes.',
        ],
        tags: ['QTE', 'Interaction Systems', 'Gameplay'],
        media: [],
      },
      {
        id: 'narrative-dialogue',
        category: 'Narrative',
        shortTitle: 'Dialogue',
        title: 'Narrative & Dialogue Systems',
        description: 'Event-driven dialogue and narrative interaction systems for NPC conversations and gameplay-linked story moments.',
        highlights: [
          'Client dialogue UI driven by server events with NPC name, message, contextual action, and close/continue flow.',
          'Dialogue tied into NPC and world interactions rather than existing as a disconnected UI layer.',
          'Reusable event-based structure suitable for branching into delivery, quest, or interaction-specific actions.',
        ],
        tags: ['Dialogue', 'Narrative Systems', 'Events', 'UI'],
        media: [],
      },
      {
        id: 'simulator',
        category: 'Game Loop',
        shortTitle: 'Simulator',
        title: 'Simulator Systems',
        description: 'Core systems for Roblox-style simulator gameplay and repeatable progression-oriented game loops.',
        highlights: [
          'Gameplay structures built around repeatable actions and progression.',
          'Reusable mechanics intended to support the loop-heavy structure typical of simulator games.',
        ],
        tags: ['Simulator', 'Game Loops', 'Progression'],
        media: [],
      },
      {
        id: 'fighting-combat',
        category: 'Combat',
        shortTitle: 'Fighting Combat',
        title: 'Fighting Game Combat',
        description: 'Combat systems built for close-range player-versus-player gameplay with a fighting-game focus.',
        highlights: [
          'Close-range combat logic built around direct player-versus-player interaction.',
          'A separate combat discipline from shooter systems, with different timing and interaction requirements.',
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
    intro: 'Una selección compacta de sistemas de gameplay que he construido a lo largo de años desarrollando en Roblox y videojuegos. Se recorren como casos de estudio, no como dumps de código.',
    caseStudiesEyebrow: 'Sistemas seleccionados',
    caseStudiesTitle: 'Casos de estudio',
    caseStudyLabel: 'Caso de estudio',
    previous: 'Caso anterior',
    next: 'Caso siguiente',
    testimonialsTitle: 'Opiniones de clientes',
    stack: ['Luau', 'Roblox Studio', 'Client / Server', 'Sistemas de Gameplay', 'Game Development'],
    flagship: {
      eyebrow: 'Proyecto insignia con cliente',
      status: 'Trabajo pagado · 2026',
      role: 'Full-stack Roblox Game Developer',
      title: 'IA Táctica Adaptativa y Sistemas de Combate',
      description: 'Una comisión pagada de Roblox que pasó de mejoras concretas a NPCs a un sistema de gameplay conectado: comportamiento de IA, combate, interacciones del jugador, feedback UI/audio, integración de animaciones y QA de producción.',
      quote: 'Superaste mis expectativas ... clavaste por completo lo que pedí.',
      quoteAuthor: 'Cliente de Roblox, después de probar el sistema de NPCs',
      evidenceSummary: 'Evidencia de desarrollo',
      evidencePoints: [
        'Entrega iterativa con pruebas reales del cliente, revisiones y comisiones posteriores.',
        'Trabajo de producción dentro de un juego y codebase existentes, no una demo aislada de portafolio.',
        'Documentación, handoff y soporte posterior sobre los sistemas entregados.',
      ],
      tags: ['Luau', 'State Machines', 'Pathfinding', 'Combat AI', 'RemoteEvents', 'UI / Audio'],
      areas: [
        {
          title: 'IA y comportamiento',
          description: 'NPCs basados en estados con percepción, pathfinding, patrol/search, traits, surrender, arrest y decisiones tácticas variables.',
        },
        {
          title: 'Sistemas de combate',
          description: 'Armas semi, automáticas y spread, pre-fire, melee, reacciones a flashbang/daño y manejo de estados del arma.',
        },
        {
          title: 'Experiencia del jugador',
          description: 'Flujos de intimidación y arresto, subtítulos responsivos, audio contextual, footsteps, ragdoll e integración de estados de animación.',
        },
        {
          title: 'Integración de producción',
          description: 'Trabajo dentro de un proyecto existente, QA directo del cliente, documentación de sistemas y revisiones durante el ciclo de desarrollo.',
        },
      ],
      evidence: [
        {
          src: flagshipArrest,
          alt: 'Build de desarrollo en Roblox mostrando surrender y una interacción de arresto.',
          label: 'Interacción de surrender y arresto en un build de desarrollo.',
        },
        {
          src: flagshipPatrolPoints,
          alt: 'Roblox Studio mostrando puntos de patrulla configurables para un NPC.',
          label: 'Workflow configurable de patrol points dentro de Roblox Studio.',
        },
      ],
    },
    caseStudies: [
      {
        id: 'fps-combat',
        category: 'Combate',
        shortTitle: 'Combate FPS',
        title: 'Combate Shooter en Primera Persona',
        description: 'Framework modular de armas y combate en primera persona, cubriendo apuntado, sensación del arma, cámara, feedback y estados configurables de combate.',
        highlights: [
          'Recoil, weapon sway, transiciones de aim/FOV, stances y comportamiento de cámara/shoulder.',
          'Módulos para tracers, hit feedback, shell ejection, proyectiles, whizz, crosshair y audio de armas.',
          'Estados y equipamiento como laser/IR, supresores, bipods, flashlights y modos de mira.',
        ],
        tags: ['FPS', 'Sistemas de Armas', 'Cámara', 'Combate'],
        media: [],
      },
      {
        id: 'advanced-ai',
        category: 'IA',
        shortTitle: 'IA Avanzada',
        title: 'Sistemas Avanzados de NPCs e IA',
        description: 'Sistema de combate para NPCs basado en estados, percepción, navegación, variación de comportamiento y recuperación cuando se pierde contacto con el jugador.',
        highlights: [
          'Máquina de estados con patrol, alert, combat, melee, flee, surrender, arrest, stunned, search y death.',
          'FOV/line-of-sight, tracking de última posición vista, pathfinding, búsqueda activa alrededor de esa posición y rotación suavizada.',
          'Roles de comportamiento y armas semi, auto por ráfagas, spread, pre-fire y comportamiento rusher.',
        ],
        tags: ['IA de NPCs', 'State Machines', 'Pathfinding', 'Combat AI'],
        media: [],
      },
      {
        id: 'vehicles',
        category: 'Vehículos',
        shortTitle: 'Vehículos',
        title: 'Sistemas de Vehículos — Coches y Aviones',
        description: 'Sistemas de conducción y control para vehículos terrestres y aeronaves; la implementación terrestre respaldada en el repo cubre el loop completo jugador-vehículo.',
        highlights: [
          'Vehículo terrestre con separación client/server de inputs, aceleración/frenado, fricción y steering suavizado.',
          'Cámara de conducción propia, HUD de combustible, consumo, recarga y manejo de entrada/salida del vehículo.',
          'Trabajo separado en controles de aeronaves adaptado a las necesidades distintas de movimiento y manejo del vuelo.',
        ],
        tags: ['Vehículos', 'Coches', 'Aviones', 'Controles'],
        media: [],
      },
      {
        id: 'qte',
        category: 'Interacción',
        shortTitle: 'QTE',
        title: 'Quick-Time Events',
        description: 'Sistemas de quick-time events para interacciones sensibles al tiempo y secuencias de inputs.',
        highlights: [
          'Ventanas temporizadas de input y flujo basado en secuencias.',
          'Lógica reutilizable para momentos de gameplay guiados, no escenas hardcodeadas aisladas.',
        ],
        tags: ['QTE', 'Interacción', 'Gameplay'],
        media: [],
      },
      {
        id: 'narrative-dialogue',
        category: 'Narrativa',
        shortTitle: 'Diálogo',
        title: 'Sistemas de Narrativa y Diálogo',
        description: 'Sistemas event-driven de diálogo e interacción narrativa para conversaciones con NPCs y momentos de historia conectados al gameplay.',
        highlights: [
          'UI de diálogo en cliente controlada por eventos del servidor con nombre de NPC, mensaje, acción contextual y flujo de cerrar/continuar.',
          'Diálogo conectado a NPCs e interacciones del mundo en lugar de existir como una capa de UI aislada.',
          'Estructura reutilizable basada en eventos para acciones de delivery, quests o interacciones específicas.',
        ],
        tags: ['Diálogo', 'Narrativa', 'Eventos', 'UI'],
        media: [],
      },
      {
        id: 'simulator',
        category: 'Game Loop',
        shortTitle: 'Simulator',
        title: 'Sistemas de Simuladores',
        description: 'Sistemas base para gameplay de simuladores en Roblox y loops repetibles orientados a progresión.',
        highlights: [
          'Estructuras de gameplay alrededor de acciones repetibles y progresión.',
          'Mecánicas reutilizables pensadas para el loop intensivo típico de juegos simulator.',
        ],
        tags: ['Simulator', 'Game Loops', 'Progresión'],
        media: [],
      },
      {
        id: 'fighting-combat',
        category: 'Combate',
        shortTitle: 'Combate Fighting',
        title: 'Combate de Juego de Pelea',
        description: 'Sistemas de combate para gameplay jugador contra jugador a corta distancia con enfoque de fighting game.',
        highlights: [
          'Lógica de combate cercano centrada en interacción directa PvP.',
          'Disciplina de combate separada del shooter, con requisitos distintos de timing e interacción.',
        ],
        tags: ['Fighting Game', 'Combate', 'PvP'],
        media: [],
      },
    ],
  },
};

const testimonials = ref([]);
const copy = computed(() => content[currentLanguage.value] ?? content.en);
const flagship = computed(() => copy.value.flagship);
const flagshipAreas = computed(() => flagship.value.areas);
const flagshipEvidence = computed(() => flagship.value.evidence);
const caseStudies = computed(() => copy.value.caseStudies);
const activeStudy = computed(() => caseStudies.value[activeIndex.value] ?? caseStudies.value[0]);

const selectStudy = (index) => {
  activeIndex.value = index;
};

const nextStudy = () => {
  activeIndex.value = (activeIndex.value + 1) % caseStudies.value.length;
};

const previousStudy = () => {
  activeIndex.value = (activeIndex.value - 1 + caseStudies.value.length) % caseStudies.value.length;
};
</script>


<style scoped>
.case-study-scroller {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.58) rgba(255, 255, 255, 0.07);
  scrollbar-gutter: stable;
}

.case-study-scroller::-webkit-scrollbar {
  height: 7px;
}

.case-study-scroller::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.case-study-scroller::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.9);
  border-radius: 0;
}

.case-study-scroller::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.9);
}

.case-study-scroller::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
