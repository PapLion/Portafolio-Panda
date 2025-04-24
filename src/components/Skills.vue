<template>
    <section id="skills" class="py-12 sm:py-16 md:py-20 border-b border-white/20 relative">
  
      <div class="container mx-auto px-4 relative z-10">
        <div class="flex justify-center w-full mb-8 sm:mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center section-title">{{ t('skills.title') }}</h2>
        </div>
  
        <div ref="skillsRef" class="border-2 border-white p-4 sm:p-6 md:p-8 opacity-0 bg-black/70 backdrop-blur-sm">
          <div class="space-y-8 sm:space-y-12">
            <!-- Lenguajes de programación -->
            <div class="space-y-4 sm:space-y-6">
              <h3 class="text-xl sm:text-2xl font-bold border-b-2 border-white pb-2 mb-4 sm:mb-6">
                {{ t('skills.languages') }}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div v-for="tech in technologies.languages" :key="tech.name" class="tech-card opacity-0">
                  <div class="tech-icon">
                    <component :is="tech.icon" />
                  </div>
                  <h3 class="tech-name text-lg sm:text-xl font-bold mb-2">{{ tech.name }}</h3>
                  <p class="tech-description text-sm">{{ tech.description }}</p>
                  <div class="tech-years mt-2 text-xs sm:text-sm border border-white px-2 py-1 rounded-full inline-block">
                    {{ formatYears(tech.years) }}
                  </div>
                  <div class="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
                  <div class="absolute bottom-0 right-0 w-full h-1 bg-white/30"></div>
                </div>
              </div>
            </div>
  
            <!-- Frontend -->
            <div class="space-y-4 sm:space-y-6">
              <h3 class="text-xl sm:text-2xl font-bold border-b-2 border-white pb-2 mb-4 sm:mb-6">
                {{ t('skills.frontend') }}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div v-for="tech in technologies.frontend" :key="tech.name" class="tech-card opacity-0">
                  <div class="tech-icon">
                    <component :is="tech.icon" />
                  </div>
                  <h3 class="tech-name text-lg sm:text-xl font-bold mb-2">{{ tech.name }}</h3>
                  <p class="tech-description text-sm">{{ tech.description }}</p>
                  <div class="tech-years mt-2 text-xs sm:text-sm border border-white px-2 py-1 rounded-full inline-block">
                    {{ formatYears(tech.years) }}
                  </div>
                  <div class="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
                  <div class="absolute bottom-0 right-0 w-full h-1 bg-white/30"></div>
                </div>
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
                  <div v-for="tech in technologies.backend" :key="tech.name" class="tech-card opacity-0">
                    <div class="tech-icon">
                      <component :is="tech.icon" />
                    </div>
                    <h3 class="tech-name text-lg sm:text-xl font-bold mb-2">{{ tech.name }}</h3>
                    <p class="tech-description text-sm">{{ tech.description }}</p>
                    <div class="tech-years mt-2 text-xs sm:text-sm border border-white px-2 py-1 rounded-full inline-block">
                      {{ formatYears(tech.years) }}
                    </div>
                    <div class="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-white/30"></div>
                  </div>
                </div>
              </div>
  
              <!-- Databases section -->
              <div class="space-y-4 sm:space-y-6">
                <h3 class="text-xl sm:text-2xl font-bold border-b-2 border-white pb-2 mb-4 sm:mb-6">
                  {{ t('tech.databases') }}
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div v-for="tech in technologies.databases" :key="tech.name" class="tech-card opacity-0">
                    <div class="tech-icon">
                      <component :is="tech.icon" />
                    </div>
                    <h3 class="tech-name text-lg sm:text-xl font-bold mb-2">{{ tech.name }}</h3>
                    <p class="tech-description text-sm">{{ tech.description }}</p>
                    <div class="tech-years mt-2 text-xs sm:text-sm border border-white px-2 py-1 rounded-full inline-block">
                      {{ formatYears(tech.years) }}
                    </div>
                    <div class="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-white/30"></div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Multiplataforma section -->
            <div class="space-y-4 sm:space-y-6">
              <h3 class="text-xl sm:text-2xl font-bold border-b-2 border-white pb-2 mb-4 sm:mb-6">
                {{ t('skills.multiplatform') }}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <div v-for="tech in technologies.multiplatform" :key="tech.name" class="tech-card opacity-0">
                  <div class="tech-icon">
                    <component :is="tech.icon" />
                  </div>
                  <h3 class="tech-name text-lg sm:text-xl font-bold mb-2">{{ tech.name }}</h3>
                  <p class="tech-description text-sm">{{ tech.description }}</p>
                  <div class="tech-years mt-2 text-xs sm:text-sm border border-white px-2 py-1 rounded-full inline-block">
                    {{ formatYears(tech.years) }}
                  </div>
                  <div class="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
                  <div class="absolute bottom-0 right-0 w-full h-1 bg-white/30"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, inject } from 'vue';
  import { Layout, Smartphone, Server, FileCode, Globe, Layers, Database as DatabaseIcon, Code2 as Code2Icon } from 'lucide-vue-next';
  
  const language = inject('language');
  const { t } = language;
  
  const skillsRef = ref(null);
  
  // Función para mostrar años o año según el valor
  const formatYears = (years) => {
    if (years === 1) {
      return `1 ${t('skills.year')}`;
    }
    return `${years} ${t('skills.years')}`;
  };
  
  const technologies = {
    languages: [
      {
        name: "JavaScript",
        description: "ECMAScript 6+",
        icon: FileCode,
        years: 3,
      },
      {
        name: "TypeScript",
        description: "Typed JavaScript",
        icon: FileCode,
        years: 1,
      },
    ],
    frontend: [
      {
        name: "HTML/CSS",
        description: "Estructura y Estilos Web",
        icon: Layout,
        years: 3,
      },
      {
        name: "React",
        description: "Frontend Library",
        icon: Code2Icon,
        years: "+2",
      },
      {
        name: "Next.js",
        description: "React Framework",
        icon: Code2Icon,
        years: 2,
      },
      {
        name: "Vue.js",
        description: "Progressive Framework",
        icon: Code2Icon,
        years: 1,
      },
      {
        name: "TailwindCSS",
        description: "Utility-first CSS Framework",
        icon: Layout,
        years: 2,
      },
      {
        name: "Vite",
        description: "Frontend Build Tool",
        icon: Globe,
        years: "+1",
      },
    ],
    backend: [
      {
        name: "Node.js",
        description: "JavaScript Runtime",
        icon: Server,
        years: "+2",
      },
      {
        name: "Express.js",
        description: "Web Framework for Node.js",
        icon: Server,
        years: 2,
      },
    ],
    databases: [
      {
        name: "SQL",
        description: "Structured Query Language",
        icon: DatabaseIcon,
        years: "+2",
      },
      {
        name: "Supabase",
        description: "Open Source Firebase Alternative",
        icon: DatabaseIcon,
        years: "1",
      },
    ],
    multiplatform: [
      {
        name: "Electron",
        description: "Desktop Apps con Web Tech",
        icon: Layers,
        years: "1",
      },
      {
        name: "React Native",
        description: "Mobile Apps con React",
        icon: Smartphone,
        years: 1,
      },
    ],
  };
  
  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
  
            // Animate tech cards with delay
            const techCards = entry.target.querySelectorAll('.tech-card') || [];
            techCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('slide-in');
              }, index * 100); // Stagger the animations
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
  
    return () => observer.disconnect();
  });
  </script>