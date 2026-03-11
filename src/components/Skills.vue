<template>
  <section
    id="skills"
    class="py-12 sm:py-16 md:py-20 border-b border-white/20 relative"
    aria-labelledby="skills-title"
  >
    <div class="container mx-auto px-4 relative z-10">
      <!-- Section header -->
      <div class="flex justify-center w-full mb-8 sm:mb-12">
        <h2
          id="skills-title"
          class="text-2xl sm:text-3xl md:text-4xl font-bold text-center section-title"
        >
          {{ t('skills.title') }}
        </h2>
      </div>

      <!-- Pillar grid -->
      <div
        ref="skillsRef"
        class="opacity-0 border-2 border-white bg-black/70 backdrop-blur-sm"
      >
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div
            v-for="(pillar, index) in pillars"
            :key="pillar.key"
            class="pillar-card p-6 sm:p-8 opacity-0 relative group"
            :class="[
              index % 2 === 0 ? 'md:border-r-2 md:border-white' : '',
              index < 2 ? 'border-b-2 border-white' : '',
            ]"
          >
            <!-- Corner accent -->
            <span class="absolute top-0 left-0 w-8 h-px bg-white opacity-60 group-hover:w-16 transition-all duration-300"></span>
            <span class="absolute top-0 left-0 h-8 w-px bg-white opacity-60 group-hover:h-16 transition-all duration-300"></span>
            <span class="absolute bottom-0 right-0 w-8 h-px bg-white opacity-60 group-hover:w-16 transition-all duration-300"></span>
            <span class="absolute bottom-0 right-0 h-8 w-px bg-white opacity-60 group-hover:h-16 transition-all duration-300"></span>

            <!-- Icon + Title -->
            <div class="flex items-start gap-3 mb-3">
              <div class="mt-0.5 shrink-0 text-white/70 group-hover:text-white transition-colors duration-200">
                <component :is="pillar.icon" :size="22" />
              </div>
              <div>
                <h3 class="text-base sm:text-lg font-bold leading-tight text-white">
                  {{ t(pillar.titleKey) }}
                </h3>
                <p class="text-xs sm:text-sm text-white/50 mt-1 leading-relaxed">
                  {{ t(pillar.descKey) }}
                </p>
              </div>
            </div>

            <!-- Tool badges -->
            <div class="flex flex-wrap gap-1.5 mt-4 pl-8">
              <span
                v-for="tool in pillar.tools"
                :key="tool"
                class="tool-badge text-xs px-2 py-0.5 border border-white/30 text-white/70
                       hover:border-white hover:text-white transition-all duration-150 cursor-default"
              >
                {{ tool }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from 'vue';
import { BrainCircuit, Layers, Server, Database } from 'lucide-vue-next';

const language = inject('language', { t: (key) => key });
const { t } = language;

const skillsRef = ref(null);
let observer = null;

// Domain pillars — tools listed flat as compact badges
const getPillars = () => [
  {
    key: 'arch',
    titleKey: 'skills.pillar.arch.title',
    descKey: 'skills.pillar.arch.desc',
    icon: BrainCircuit,
    tools: [
      'Design Patterns', 'Data Architecture', 'Algorithms', 'Big O',
      'Clean Code', 'REST API Design', 'UI/UX', 'QA & Testing',
      'DevOps', 'OOP', 'FP', 'Reactive',
    ],
  },
  {
    key: 'ai',
    titleKey: 'skills.pillar.ai.title',
    descKey: 'skills.pillar.ai.desc',
    icon: BrainCircuit,
    tools: [
      'Large Language Models', 'LLM Orchestration', 'RAG', 'Agents',
      'Neural Networks', 'Machine Learning', 'k-Means', 'Decision Trees',
      'Classification', 'Regression', 'NLP',
    ],
  },
  {
    key: 'fullstack',
    titleKey: 'skills.pillar.fullstack.title',
    descKey: 'skills.pillar.fullstack.desc',
    icon: Layers,
    tools: [
      'Next.js', 'Astro', 'Vite', 'React', 'Vue.js',
      'React Native', 'Flutter', 'Electron', 'Tauri',
      'Node.js', 'Express', 'FastAPI', 'Django',
      'JavaScript', 'TypeScript', 'Python',
    ],
  },
  {
    key: 'data',
    titleKey: 'skills.pillar.data.title',
    descKey: 'skills.pillar.data.desc',
    icon: Database,
    tools: [
      'Web Scraping', 'Rotating IPs', 'Network Design',
      'SQL', 'MongoDB', 'Supabase', 'Firebase',
      'Vercel', 'Heroku', 'REST', 'WebSockets',
    ],
  },
];

const pillars = computed(() => getPillars());

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');

          // Stagger pillar cards
          const cards = entry.target.querySelectorAll('.pillar-card') || [];
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('slide-in');
            }, index * 120);
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  if (skillsRef.value) {
    observer.observe(skillsRef.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>
