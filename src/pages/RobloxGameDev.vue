<template>
  <section class="min-h-screen py-8 sm:py-10 md:py-12 bg-black/80" aria-labelledby="roblox-gamedev-title">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7 sm:mb-8">
        <a
          href="/"
          class="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors w-fit"
        >
          <span aria-hidden="true">←</span>
          <span>{{ copy.back }}</span>
        </a>

        <span class="text-xs uppercase tracking-[0.3em] text-white/40">Dani.Dev / Roblox & Game Dev</span>
      </div>

      <header class="max-w-3xl mb-7 sm:mb-8">
        <h1 id="roblox-gamedev-title" class="text-3xl sm:text-4xl md:text-[2.75rem] font-bold manga-text">
          {{ copy.title }}
        </h1>
        <p class="mt-3 text-sm sm:text-base text-white/60 leading-relaxed max-w-xl">
          {{ copy.intro }}
        </p>
      </header>


      <section class="flagship-editorial mb-10 sm:mb-12 border-t border-white/20 pt-5 sm:pt-6" aria-labelledby="roblox-flagship-title">
        <div class="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-6 lg:gap-10 items-start">
          <div class="lg:pt-2">
            <p class="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/40">
              {{ flagship.status }} · {{ flagship.role }}
            </p>

            <h2
              id="roblox-flagship-title"
              class="mt-3 text-3xl sm:text-4xl md:text-[2.6rem] font-bold manga-text leading-[1.05]"
            >
              {{ flagship.title }}
            </h2>

            <p class="mt-5 text-sm sm:text-base text-white/72 leading-relaxed">
              {{ flagship.description }}
            </p>

            <p class="mt-5 text-xs sm:text-sm text-white/42 leading-relaxed">
              {{ flagship.scope }}
            </p>

            <blockquote class="mt-7 sm:mt-9 max-w-sm">
              <p class="text-sm text-white/72 leading-relaxed">
                “{{ flagship.quote }}”
              </p>
              <footer class="mt-2 text-[10px] sm:text-[11px] text-white/30">
                — {{ flagship.quoteAuthor }}
              </footer>
            </blockquote>
          </div>

          <div class="min-w-0">
            <button
              v-if="flagshipPrimaryEvidence"
              type="button"
              class="project-shot block w-full text-left cursor-zoom-in"
              :aria-label="flagshipPrimaryEvidence.label"
              @click="openEvidence(0)"
            >
              <img
                :src="flagshipPrimaryEvidence.src"
                :alt="flagshipPrimaryEvidence.alt"
                class="w-full aspect-video object-cover bg-black"
                loading="eager"
              />
            </button>

            <div
              v-if="flagshipSecondaryEvidence.length"
              class="flagship-contact-sheet mt-3"
              aria-label="Project screenshots"
            >
              <button
                v-for="(item, index) in flagshipSecondaryEvidence"
                :key="item.src"
                type="button"
                class="contact-shot cursor-zoom-in"
                :aria-label="item.label"
                @click="openEvidence(index + 1)"
              >
                <img
                  :src="item.src"
                  :alt="item.alt"
                  class="w-full h-full object-cover bg-black"
                  loading="lazy"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="experience-title">
        <div class="mb-4">
          <p class="text-xs uppercase tracking-[0.3em] text-white/40">{{ copy.caseStudiesEyebrow }}</p>
          <h2 id="experience-title" class="mt-2 text-2xl sm:text-3xl font-bold">{{ copy.caseStudiesTitle }}</h2>
        </div>

        <div
          class="manga-panel border border-white/35 p-5 sm:p-6 md:p-8 relative overflow-hidden"
          aria-live="polite"
        >
          <div class="flex items-center gap-3 mb-6">
            <span class="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/45 shrink-0">
              {{ copy.caseStudyLabel }}
            </span>
            <span class="text-[10px] sm:text-xs border border-white/30 px-2 py-1 text-white/60 truncate">
              {{ activeStudy.category }}
            </span>
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

        <div class="experience-selector mt-3 overflow-x-auto pb-2">
          <div class="flex gap-2 min-w-max">
            <button
              v-for="(study, index) in caseStudies"
              :key="study.id"
              type="button"
              class="text-left border min-w-[190px] px-4 py-2.5 transition-colors"
              :class="index === activeIndex
                ? 'border-white bg-white text-black'
                : 'border-white/20 text-white/55 hover:border-white/60 hover:text-white'"
              :aria-pressed="index === activeIndex"
              @click="selectStudy(index)"
            >
              <span class="block text-[9px] uppercase tracking-[0.2em] opacity-60">
                {{ study.category }}
              </span>
              <span class="block mt-1 text-xs sm:text-sm font-medium whitespace-nowrap">
                {{ study.shortTitle || study.title }}
              </span>
            </button>
          </div>
        </div>
      </section>

      <Teleport to="body">
        <div
          v-if="activeEvidence"
          class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          :aria-label="activeEvidence.label"
          @click.self="closeEvidence"
          @keydown.esc="closeEvidence"
          @keydown.left.prevent="previousEvidence"
          @keydown.right.prevent="nextEvidence"
        >
          <div class="w-full max-w-6xl relative" tabindex="-1">
            <button
              type="button"
              class="absolute -top-10 right-0 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white"
              @click="closeEvidence"
            >
              {{ copy.close }}
            </button>

            <div class="relative">
              <button
                type="button"
                class="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 z-10 h-9 w-9 border border-white/30 bg-black/70 hover:bg-white hover:text-black transition-colors"
                :aria-label="copy.previousEvidence"
                @click="previousEvidence"
              >
                ←
              </button>

              <div class="flagship-media-frame bg-black">
                <img
                  :src="activeEvidence.src"
                  :alt="activeEvidence.alt"
                  class="w-full max-h-[78vh] object-contain bg-black"
                />
              </div>

              <button
                type="button"
                class="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 z-10 h-9 w-9 border border-white/30 bg-black/70 hover:bg-white hover:text-black transition-colors"
                :aria-label="copy.nextEvidence"
                @click="nextEvidence"
              >
                →
              </button>
            </div>

            <div class="mt-3 flex items-start justify-between gap-4">
              <p class="text-xs sm:text-sm text-white/50">{{ activeEvidence.label }}</p>
              <p class="text-[10px] sm:text-xs text-white/30 shrink-0">
                {{ activeEvidenceIndex + 1 }} / {{ flagshipEvidence.length }}
              </p>
            </div>
          </div>
        </div>
      </Teleport>

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
const activeIndex = ref(0);
const activeEvidenceIndex = ref(null);

const content = {
  en: {
    back: 'Back to Dani.Dev',
    eyebrow: 'Roblox / Game Development',
    title: 'Roblox / Game Development',
    intro: 'Client work, gameplay systems, and things I have built over the years in Roblox Studio.',
    caseStudiesEyebrow: 'Core capabilities',
    caseStudiesTitle: 'Game Development Experience',
    caseStudyLabel: 'Experience',
    testimonialsTitle: 'Client feedback',
    close: 'Close',
    previousEvidence: 'Previous screenshot',
    nextEvidence: 'Next screenshot',
    stack: ['Luau', 'Roblox Studio', 'Client / Server', 'Gameplay Systems', 'Game Development'],
    flagship: {
      eyebrow: 'Client work',
      status: 'Client work · 2026',
      role: 'Full-stack Roblox developer',
      title: 'Adaptive Tactical AI & Combat Systems',
      description: 'Built and integrated NPC AI, combat, player interaction, feedback, and animation systems inside an existing Roblox project, iterating directly from client testing.',
      quote: "You've exceeded my expectations ... absolutely nailing the request.",
      quoteAuthor: 'Roblox client, after testing the NPC system',
      scope: 'NPC AI · patrol & search · surrender & arrest · FPS combat · weapon interactions · subtitles & audio · ragdoll · animation integration',
      evidence: [
        {
          src: '/images/roblox/flagship/npc-production-map.webp',
          alt: 'NPCs integrated into a more complete industrial Roblox environment.',
          label: 'NPC Integration in Production Map · AI behavior tested inside a more complete environment.',
        },
        {
          src: '/images/roblox/flagship/surrender-arrest.webp',
          alt: 'NPC surrendering while the player receives an arrest interaction prompt.',
          label: 'Surrender & Arrest System · NPC state, dialogue feedback, and player interaction.',
        },
        {
          src: '/images/roblox/flagship/fps-combat.webp',
          alt: 'First-person combat scene with a weapon firing inside an industrial environment.',
          label: 'FPS Combat Integration · Weapon behavior integrated with the project combat loop.',
        },
        {
          src: '/images/roblox/flagship/weapon-optics-hud.webp',
          alt: 'Scoped first-person weapon view with ammo HUD and equipment slots.',
          label: 'Weapon Optics & FPS HUD · Aiming, equipment state, and combat feedback.',
        },
        {
          src: '/images/roblox/flagship/ragdoll-weapon-drop.webp',
          alt: 'Defeated NPC in ragdoll state with its weapon dropped beside it.',
          label: 'Ragdoll & Weapon Drop · NPC defeat state and world-item interaction.',
        },
        {
          src: '/images/roblox/flagship/studio-workflow.webp',
          alt: 'Roblox Studio development view showing NPC setup and animation workflow.',
          label: 'Studio Workflow & Animation Setup · Development and integration inside Roblox Studio.',
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
    title: 'Roblox / Game Development',
    intro: 'Trabajo con clientes, sistemas de gameplay y cosas que he construido durante años en Roblox Studio.',
    caseStudiesEyebrow: 'Capacidades principales',
    caseStudiesTitle: 'Experiencia en desarrollo',
    caseStudyLabel: 'Experiencia',
    testimonialsTitle: 'Opiniones de clientes',
    close: 'Cerrar',
    previousEvidence: 'Captura anterior',
    nextEvidence: 'Captura siguiente',
    stack: ['Luau', 'Roblox Studio', 'Client / Server', 'Sistemas de Gameplay', 'Game Development'],
    flagship: {
      eyebrow: 'Trabajo con cliente',
      status: 'Trabajo con cliente · 2026',
      role: 'Full-stack Roblox developer',
      title: 'IA Táctica Adaptativa y Sistemas de Combate',
      description: 'Construí e integré IA de NPCs, combate, interacción del jugador, feedback y animaciones dentro de un proyecto existente de Roblox, iterando directamente con pruebas del cliente.',
      quote: 'Superaste mis expectativas ... clavaste por completo lo que pedí.',
      quoteAuthor: 'Cliente de Roblox, después de probar el sistema de NPCs',
      scope: 'IA de NPCs · patrol & search · surrender & arrest · combate FPS · interacciones con armas · subtítulos y audio · ragdoll · integración de animaciones',
      evidence: [
        {
          src: '/images/roblox/flagship/npc-production-map.webp',
          alt: 'NPCs integrados dentro de un entorno industrial más completo en Roblox.',
          label: 'Integración de NPCs en mapa de producción · IA probada dentro de un entorno más completo.',
        },
        {
          src: '/images/roblox/flagship/surrender-arrest.webp',
          alt: 'NPC rindiéndose mientras el jugador recibe la interacción para arrestarlo.',
          label: 'Sistema de rendición y arresto · Estado del NPC, feedback de diálogo e interacción del jugador.',
        },
        {
          src: '/images/roblox/flagship/fps-combat.webp',
          alt: 'Escena de combate en primera persona disparando dentro de un entorno industrial.',
          label: 'Integración de combate FPS · Comportamiento del arma integrado al loop de combate del proyecto.',
        },
        {
          src: '/images/roblox/flagship/weapon-optics-hud.webp',
          alt: 'Vista de arma con mira en primera persona, HUD de munición y slots de equipamiento.',
          label: 'Óptica y HUD FPS · Apuntado, estado de equipamiento y feedback de combate.',
        },
        {
          src: '/images/roblox/flagship/ragdoll-weapon-drop.webp',
          alt: 'NPC derrotado en ragdoll con su arma caída a un lado.',
          label: 'Ragdoll y caída de arma · Estado de derrota del NPC e interacción del objeto en el mundo.',
        },
        {
          src: '/images/roblox/flagship/studio-workflow.webp',
          alt: 'Vista de desarrollo en Roblox Studio mostrando setup de NPC y workflow de animación.',
          label: 'Workflow de Studio y animación · Desarrollo e integración dentro de Roblox Studio.',
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
const flagshipEvidence = computed(() => flagship.value.evidence);
const flagshipPrimaryEvidence = computed(() => flagshipEvidence.value[0] ?? null);
const flagshipSecondaryEvidence = computed(() => flagshipEvidence.value.slice(1));
const activeEvidence = computed(() => {
  if (activeEvidenceIndex.value === null) return null;
  return flagshipEvidence.value[activeEvidenceIndex.value] ?? null;
});
const caseStudies = computed(() => copy.value.caseStudies);
const activeStudy = computed(() => caseStudies.value[activeIndex.value] ?? caseStudies.value[0]);

const openEvidence = (index) => {
  activeEvidenceIndex.value = index;
};

const closeEvidence = () => {
  activeEvidenceIndex.value = null;
};

const nextEvidence = () => {
  if (activeEvidenceIndex.value === null || !flagshipEvidence.value.length) return;
  activeEvidenceIndex.value = (activeEvidenceIndex.value + 1) % flagshipEvidence.value.length;
};

const previousEvidence = () => {
  if (activeEvidenceIndex.value === null || !flagshipEvidence.value.length) return;
  activeEvidenceIndex.value = (
    activeEvidenceIndex.value - 1 + flagshipEvidence.value.length
  ) % flagshipEvidence.value.length;
};

const selectStudy = (index) => {
  activeIndex.value = index;
};
</script>


<style scoped>

.flagship-media-frame {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.34);
  background: rgba(0, 0, 0, 0.72);
  padding: 3px;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.06),
    0 10px 30px rgba(0, 0, 0, 0.24);
  clip-path: polygon(
    10px 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    10px 100%,
    0 calc(100% - 10px),
    0 10px
  );
}

.flagship-media-frame::after {
  content: '';
  position: absolute;
  inset: 7px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  pointer-events: none;
}

.project-shot {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.32);
  background: #000;
}

.project-shot img {
  transition: transform 220ms ease, filter 220ms ease;
}

.project-shot:hover img {
  transform: scale(1.008);
  filter: brightness(1.04);
}

.flagship-contact-sheet {
  display: grid;
  grid-template-columns: 1.35fr 0.9fr 1.15fr 0.82fr 1fr;
  gap: 0.45rem;
  align-items: end;
}

.contact-shot {
  overflow: hidden;
  min-width: 0;
  aspect-ratio: 16 / 9;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: #000;
  opacity: 0.7;
  transition: opacity 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.contact-shot:nth-child(2),
.contact-shot:nth-child(4) {
  transform: translateY(0.35rem);
}

.contact-shot:hover {
  opacity: 1;
  border-color: rgba(255, 255, 255, 0.62);
}

.contact-shot:nth-child(2):hover,
.contact-shot:nth-child(4):hover {
  transform: translateY(0.2rem);
}

@media (max-width: 1023px) {
  .flagship-contact-sheet {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.25rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.58) rgba(255, 255, 255, 0.07);
  }

  .contact-shot {
    width: 7rem;
    flex: 0 0 auto;
    transform: none !important;
  }
}

.experience-selector,
.flagship-contact-sheet {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.58) rgba(255, 255, 255, 0.07);
  scrollbar-gutter: stable;
}

.experience-selector::-webkit-scrollbar,
.flagship-contact-sheet::-webkit-scrollbar {
  height: 7px;
}

.experience-selector::-webkit-scrollbar-track,
.flagship-contact-sheet::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.experience-selector::-webkit-scrollbar-thumb,
.flagship-contact-sheet::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.9);
  border-radius: 0;
}

.experience-selector::-webkit-scrollbar-thumb:hover,
.flagship-contact-sheet::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.9);
}

.experience-selector::-webkit-scrollbar-corner,
.flagship-contact-sheet::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
