<template>
  <section id="skills" class="py-12 sm:py-16 md:py-20 border-b border-white/20 relative" aria-labelledby="skills-title">
    <div class="container mx-auto px-4 relative z-10">
      <div class="flex justify-center w-full mb-8 sm:mb-12">
        <h2 id="skills-title" class="text-2xl sm:text-3xl md:text-4xl font-bold text-center section-title">{{ t('skills.title') }}</h2>
      </div>

      <div ref="skillsRef" class="border-2 border-white p-4 sm:p-6 md:p-8 opacity-0 bg-black/70 backdrop-blur-sm">
        <div class="space-y-8 sm:space-y-12">
          <!-- Programming Languages -->
          <div class="space-y-4 sm:space-y-6">
            <h3 class="text-xl sm:text-2xl font-bold border-b-2 border-white pb-2 mb-4 sm:mb-6">
              {{ t('skills.languages') }}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <TechCard 
                v-for="tech in technologies.value.languages" 
                :key="tech.name" 
                :tech="tech" 
                :formatYears="formatYears"
              />
            </div>
          </div>

          <!-- Frontend -->
          <div class="space-y-4 sm:space-y-6">
            <h3 class="text-xl sm:text-2xl font-bold border-b-2 border-white pb-2 mb-4 sm:mb-6">
              {{ t('skills.frontend') }}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <TechCard 
                v-for="tech in technologies.value.frontend" 
                :key="tech.name" 
                :tech="tech" 
                :formatYears="formatYears"
              />
            </div>
          </div>

          <!-- Backend and Databases side by side -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <!-- Backend section -->
            <div class="space-y-4 sm:space-y-6">
              <h3 class="text-xl sm:text-2xl font-bold border-b-2 border-white pb-2 mb-4 sm:mb-6">
                {{ t('skills.backend') }}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <TechCard 
                  v-for="tech in technologies.value.backend" 
                  :key="tech.name" 
                  :tech="tech" 
                  :formatYears="formatYears"
                />
              </div>
            </div>

            <!-- Databases section -->
            <div class="space-y-4 sm:space-y-6">
              <h3 class="text-xl sm:text-2xl font-bold border-b-2 border-white pb-2 mb-4 sm:mb-6">
                {{ t('tech.databases') }}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <TechCard 
                  v-for="tech in technologies.value.databases" 
                  :key="tech.name" 
                  :tech="tech" 
                  :formatYears="formatYears"
                />
              </div>
            </div>
          </div>

          <!-- Multiplatform section -->
          <div class="space-y-4 sm:space-y-6">
            <h3 class="text-xl sm:text-2xl font-bold border-b-2 border-white pb-2 mb-4 sm:mb-6">
              {{ t('skills.multiplatform') }}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              <TechCard 
                v-for="tech in technologies.value.multiplatform" 
                :key="tech.name" 
                :tech="tech" 
                :formatYears="formatYears"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, h } from 'vue';
import { Layout, Smartphone, Server, FileCode, Globe, Layers, Database as DatabaseIcon, Code2 as Code2Icon } from 'lucide-vue-next';

const language = inject('language', { t: (key) => key });
const { t } = language;

const skillsRef = ref(null);
let observer = null;

// Function to format years - handles both numbers and strings consistently
const formatYears = (years) => {
  // Convert to number, handling strings like "+2" or "1"
  const numYears = typeof years === 'string' ? parseInt(years.replace('+', ''), 10) : years;
  const hasPlus = typeof years === 'string' && years.startsWith('+');
  
  if (numYears === 1) {
    return `${hasPlus ? '+' : ''}1 ${t('skills.year')}`;
  }
  return `${hasPlus ? '+' : ''}${numYears} ${t('skills.years')}`;
};

// Tech card component defined inline to avoid template repetition
const TechCard = {
  props: ['tech', 'formatYears'],
  setup(props) {
    return () => h('div', { class: 'tech-card opacity-0' }, [
      h('div', { class: 'tech-icon' }, [h(props.tech.icon)]),
      h('h4', { class: 'tech-name text-lg sm:text-xl font-bold mb-2' }, props.tech.name),
      h('p', { class: 'tech-description text-sm' }, props.tech.description),
      h('div', { 
        class: 'tech-years mt-2 text-xs sm:text-sm border border-white px-2 py-1 rounded-full inline-block' 
      }, props.formatYears(props.tech.years)),
      h('div', { class: 'absolute top-0 left-0 w-full h-1 bg-white/30' }),
      h('div', { class: 'absolute bottom-0 right-0 w-full h-1 bg-white/30' }),
    ]);
  }
};

// Technology descriptions use i18n keys for proper translation support
// All years are numbers for type consistency
const getTechnologies = () => ({
  languages: [
    {
      name: "JavaScript",
      description: t('tech.javascript.desc'),
      icon: FileCode,
      years: 3,
    },
    {
      name: "TypeScript",
      description: t('tech.typescript.desc'),
      icon: FileCode,
      years: 1,
    },
  ],
  frontend: [
    {
      name: "HTML/CSS",
      description: t('tech.htmlcss.desc'),
      icon: Layout,
      years: 3,
    },
    {
      name: "React",
      description: t('tech.react.desc'),
      icon: Code2Icon,
      years: 2,
    },
    {
      name: "Next.js",
      description: t('tech.nextjs.desc'),
      icon: Code2Icon,
      years: 2,
    },
    {
      name: "Vue.js",
      description: t('tech.vuejs.desc'),
      icon: Code2Icon,
      years: 1,
    },
    {
      name: "TailwindCSS",
      description: t('tech.tailwind.desc'),
      icon: Layout,
      years: 2,
    },
    {
      name: "Vite",
      description: t('tech.vite.desc'),
      icon: Globe,
      years: 1,
    },
  ],
  backend: [
    {
      name: "Node.js",
      description: t('tech.nodejs.desc'),
      icon: Server,
      years: 2,
    },
    {
      name: "Express.js",
      description: t('tech.express.desc'),
      icon: Server,
      years: 2,
    },
  ],
  databases: [
    {
      name: "SQL",
      description: t('tech.sql.desc'),
      icon: DatabaseIcon,
      years: 2,
    },
    {
      name: "Supabase",
      description: t('tech.supabase.desc'),
      icon: DatabaseIcon,
      years: 1,
    },
  ],
  multiplatform: [
    {
      name: "Electron",
      description: t('tech.electron.desc'),
      icon: Layers,
      years: 1,
    },
    {
      name: "React Native",
      description: t('tech.reactnative.desc'),
      icon: Smartphone,
      years: 1,
    },
  ],
});

// Computed to make technologies reactive to language changes
import { computed } from 'vue';
const technologies = computed(() => getTechnologies());

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');

          // Animate tech cards with delay
          const techCards = entry.target.querySelectorAll('.tech-card') || [];
          techCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('slide-in');
            }, index * 100);
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  if (skillsRef.value) {
    observer.observe(skillsRef.value);
  }
});

// Proper cleanup at setup level
onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>
