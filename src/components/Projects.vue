<template>
    <section id="projects" class="py-12 sm:py-16 md:py-20 border-b border-white/20 bg-black">

      <div class="container mx-auto px-4">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center section-title">
          {{ t('projects.title') }}
        </h2>
  
        <div ref="projectContainerRef" class="project-container opacity-0 border-2 border-white">
          <div
            class="project-slide"
            :style="{
              opacity: isTransitioning ? 0.5 : 1,
              transform: isTransitioning ? `translateX(${direction === 'next' ? '-10px' : '10px'})` : 'translateX(0)',
            }"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div class="project-image-container relative h-[400px] md:h-full">
                <div class="speed-lines"></div>
                <img
                  :src="projects[currentProject].image || '/placeholder.svg'"
                  :alt="projects[currentProject].title"
                  class="object-cover w-full h-full"
                  loading="eager"
                />
              </div>
  
              <div class="project-content p-4 sm:p-6">
                <h3 class="project-title text-xl sm:text-2xl">{{ projects[currentProject].title }}</h3>
                <p class="project-description text-sm sm:text-base mt-2 sm:mt-4">
                  {{ projects[currentProject].description }}
                </p>
  
                <div class="project-controls mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div class="project-nav flex gap-2">
                    <button
                      @click="prevProject"
                      class="project-nav-button w-8 h-8 sm:w-10 sm:h-10"
                      :disabled="isTransitioning"
                      aria-label="Proyecto anterior"
                    >
                      <ChevronLeft class="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      @click="nextProject"
                      class="project-nav-button w-8 h-8 sm:w-10 sm:h-10"
                      :disabled="isTransitioning"
                      aria-label="Proyecto siguiente"
                    >
                      <ChevronRight class="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
  
                  <a
                    :href="projects[currentProject].link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link text-sm sm:text-base w-full sm:w-auto text-center"
                  >
                    {{ t('projects.view') }} <ExternalLink class="h-3 w-3 sm:h-4 sm:w-4 inline-block" />
                  </a>
                </div>
  
                <div class="project-indicators mt-4 sm:mt-6">
                  <button
                    v-for="(_, index) in projects"
                    :key="index"
                    @click="changeProject(index)"
                    :class="`project-indicator ${currentProject === index ? 'active' : ''}`"
                    :aria-label="`Ver proyecto ${index + 1}`"
                    :disabled="isTransitioning"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-vue-next';
  import { inject } from 'vue';
  
  const language = inject('language');
  const { t } = language;
  
  const projects = [
    {
      id: 1,
      title: "ScraperAI",
      description:
        "AI-Powered Product Scraper for AliExpress. Developed web scraping pipeline using Parsel to extract and process product data. Leveraged DeepSeek LLM to deliver optimized product recommendations. Built and deployed FastAPI-based backend on Railway for reliable hosting.",
      image: "/placeholder.svg?height=600&width=400",
      link: "https://scraperia-production.up.railway.app",
    },
    {
      id: 2,
      title: "AssistenAI",
      description:
        "AI-Driven Shopping Assistant (In Development). Developing LLM-powered platform to identify optimal online deals. Integrating JWT, cookies, WebSockets, and MySQL for secure and dynamic functionality. Targeting deployment on Railway and Vercel for robust scalability.",
      image: "/placeholder.svg?height=600&width=400",
      link: "#",
    },
    {
      id: 3,
      title: "Akemi IA",
      description:
        "Conversational AI Fine-Tuned with JavaScript (In Constant Development). Creating a personalized AI inspired by Yui from SAO and Neuro-sama. Focused on developing emotional awareness, evolving memory, and contextual learning. Fine-tuning LLMs and integrating backend in JavaScript for dynamic personality growth.",
      image: "/placeholder.svg?height=600&width=400",
      link: "#",
    },
    {
      id: 4,
      title: "HomeStyle",
      description:
        "Revolutionary e-commerce platform for furniture and home appliances. Built using Next.js, TypeScript, TailwindCSS for frontend. Integrated FastAPI, Python, and SQLite in the backend. Enabled seamless user experience and streamlined product management.",
      image: "/placeholder.svg?height=600&width=400",
      link: "#",
    },
    {
      id: 5,
      title: "AI Academy",
      description:
        "Web-based AI learning platform with interactive content. Developed full-stack platform using Next.js, TypeScript, TailwindCSS. Integrated FastAPI and Python to support dynamic course delivery and real-world simulations. Focused on accessibility and modern UI/UX for AI education.",
      image: "/placeholder.svg?height=600&width=400",
      link: "#",
    },
  ];
  
  const currentProject = ref(0);
  const isTransitioning = ref(false);
  const direction = ref('next');
  const projectContainerRef = ref(null);
  
  const nextProject = () => {
    if (isTransitioning.value) return;
  
    direction.value = 'next';
    isTransitioning.value = true;
  
    setTimeout(() => {
      currentProject.value = currentProject.value === projects.length - 1 ? 0 : currentProject.value + 1;
      isTransitioning.value = false;
    }, 300);
  };
  
  const prevProject = () => {
    if (isTransitioning.value) return;
  
    direction.value = 'prev';
    isTransitioning.value = true;
  
    setTimeout(() => {
      currentProject.value = currentProject.value === 0 ? projects.length - 1 : currentProject.value - 1;
      isTransitioning.value = false;
    }, 300);
  };
  
  const changeProject = (index) => {
    if (isTransitioning.value || currentProject.value === index) return;
    
    direction.value = index > currentProject.value ? 'next' : 'prev';
    currentProject.value = index;
  };
  
  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (projectContainerRef.value) {
            projectContainerRef.value.classList.add('fade-in');
          }
        }
      },
      { threshold: 0.2 }
    );
  
    if (projectContainerRef.value) {
      observer.observe(projectContainerRef.value);
    }
  
    return () => observer.disconnect();
  });
  </script>