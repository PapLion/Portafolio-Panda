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
              class="h-full bg-white transition-all duration-300 ease-out"
              :style="{ width: isLoading ? '0%' : '100%' }"
            ></div>
          </div>
          <div class="text-xs text-white/50">Iniciando viaje espacial...</div>
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
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import About from './components/About.vue';
import Skills from './components/Skills.vue';
import Projects from './components/Projects.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';
import SpaceBackground from './components/SpaceBackground.vue';

const isLoading = ref(true);
const scrollProgress = ref(0);
const mainRef = ref(null);

onMounted(() => {
  // Simple performance measurement
  const pageLoadStart = performance.now();

  // Simulate loading for smoother transitions
  const timer = setTimeout(() => {
    isLoading.value = false;

    // Log page load time
    const pageLoadTime = performance.now() - pageLoadStart;
    console.log(`Page loaded in: ${pageLoadTime.toFixed(2)}ms`);
  }, 1200);

  const handleScroll = () => {
    if (!mainRef.value) return;

    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = window.scrollY / totalHeight;
    scrollProgress.value = progress;
  };

  // Use passive event listener for better performance
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Initialize progress bars
  const initializeProgressBars = () => {
    const progressBars = document.querySelectorAll(".skill-progress");
    progressBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      if (width) {
        bar.style.setProperty("--width", width);
      }
    });
  };

  // Execute after DOM is completely loaded
  if (document.readyState === "complete") {
    initializeProgressBars();
  } else {
    window.addEventListener("load", initializeProgressBars);
  }

  // Cleanup
  onUnmounted(() => {
    clearTimeout(timer);
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("load", initializeProgressBars);
  });
});
</script>

<style>
@import './styles/main.css';
</style>