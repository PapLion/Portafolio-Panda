<template>
  <main ref="mainRef" class="min-h-screen text-white overflow-hidden relative">
    <!-- Space Background with stars, planets, and astronauts -->
    <SpaceBackground />

    <!-- Loading screen -->
    <div v-if="isLoading" class="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div class="text-center">
        <div class="text-3xl font-bold manga-text mb-4 animate-pulse">Dani.Dev</div>
        <div class="space-y-2">
          <div class="w-[200px] h-[3px] bg-white/20 rounded-full overflow-hidden">
            <div
              class="h-full bg-white transition-all duration-1000 ease-out loading-bar"
              :style="{ width: loadingProgress + '%' }"
            ></div>
          </div>
          <div class="text-xs text-white/50">{{ t('loading.message') }}</div>
        </div>
      </div>
    </div>

    <!-- Progress indicator -->
    <div class="fixed top-0 left-0 w-full h-1 z-50">
      <div
        class="h-full bg-white transition-all duration-300 ease-out"
        :style="{ width: `${scrollProgress * 100}%` }"
      ></div>
    </div>

    <div :class="`relative z-10 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import About from './components/About.vue';
import Skills from './components/Skills.vue';
import Projects from './components/Projects.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';
import SpaceBackground from './components/SpaceBackground.vue';

// Provide default value to prevent errors in tests or isolated rendering
const language = inject('language', { t: (key) => key });
const { t } = language;

const isLoading = ref(true);
const loadingProgress = ref(0);
const scrollProgress = ref(0);
const mainRef = ref(null);

// Store references for cleanup
let loadingTimer = null;
let progressInterval = null;

const handleScroll = () => {
  if (!mainRef.value) return;

  const totalHeight = document.body.scrollHeight - window.innerHeight;
  // Prevent division by zero and NaN
  if (totalHeight <= 0) {
    scrollProgress.value = 0;
    return;
  }
  const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
  scrollProgress.value = progress;
};

const initializeProgressBars = () => {
  const progressBars = document.querySelectorAll(".skill-progress");
  progressBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    if (width) {
      bar.style.setProperty("--width", width);
    }
  });
};

onMounted(() => {
  // Animate loading progress
  progressInterval = setInterval(() => {
    if (loadingProgress.value < 90) {
      loadingProgress.value += Math.random() * 15;
    }
  }, 100);

  // Complete loading after delay
  loadingTimer = setTimeout(() => {
    loadingProgress.value = 100;
    setTimeout(() => {
      isLoading.value = false;
    }, 200);
  }, 1000);

  // Use passive event listener for better performance
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Execute after DOM is completely loaded
  if (document.readyState === "complete") {
    initializeProgressBars();
  } else {
    window.addEventListener("load", initializeProgressBars);
  }
});

// Proper cleanup - registered at setup level, not nested inside onMounted
onUnmounted(() => {
  if (loadingTimer) clearTimeout(loadingTimer);
  if (progressInterval) clearInterval(progressInterval);
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("load", initializeProgressBars);
});
</script>

<style scoped>
.loading-bar {
  transition: width 0.3s ease-out;
}
</style>
