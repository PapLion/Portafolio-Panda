<template>
  <section
    id="hero"
    class="min-h-screen flex items-center justify-center pt-16 border-b border-white/20 relative"
    aria-labelledby="hero-title"
  >
    <!-- Planets and astronauts -->
    <div class="absolute inset-0 z-[1] pointer-events-none">
      <!-- Floating astronaut - PRINCIPAL -->
      <div class="absolute top-[30%] sm:top-[35%] md:top-[40%] left-[5%] sm:left-[8%] md:left-[10%] animate-float-astronaut">
        <Astronaut />
      </div>

      <!-- Additional astronaut on the right -->
      <div class="absolute top-[60%] sm:top-[65%] md:top-[70%] right-[5%] sm:right-[10%] md:right-[15%] animate-float-astronaut hidden md:block" style="animation-delay: 7s">
        <Astronaut />
      </div>
    </div>

    <div class="container mx-auto px-4 text-center relative z-10">
      <div
        ref="frameRef"
        class="manga-frame p-4 sm:p-6 md:p-8 lg:p-12 border-2 border-white inline-block relative glowing-border breathing z-20 w-full max-w-3xl mx-auto overflow-hidden"
        style="opacity: 1"
      >
        <div class="speed-lines"></div>
        <h1 id="hero-title" ref="titleRef" class="mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          {{ t('hero.title') }}
        </h1>
        <div class="w-12 sm:w-16 md:w-20 lg:w-24 h-1 bg-white mx-auto mb-2"></div>
        <h2 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-highlight">
          {{ t('hero.subtitle') }}
        </h2>
        <p 
          class="text-sm sm:text-base md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto px-2"
          aria-live="polite"
          aria-atomic="true"
        >
          {{ typedText }}
          <span 
            :class="`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`"
            aria-hidden="true"
          >|</span>
        </p>
        <div
          ref="buttonContainerRef"
          class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 mt-2 relative z-10 w-full px-4"
        >
          <!-- Fixed: Using button with onclick instead of nested a>button -->
          <button 
            @click="navigateTo('#projects')"
            class="hero-btn group relative overflow-hidden border-2 border-white bg-transparent px-3 py-2 sm:px-4 sm:py-3 transition-all duration-300 hover:bg-white hover:text-black w-full sm:w-auto"
          >
            <span class="relative z-10 flex items-center justify-center text-sm sm:text-base md:text-lg font-medium">
              {{ t('hero.projects') }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span class="absolute bottom-0 left-0 right-0 top-0 -z-10 transform translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0"></span>
          </button>

          <button 
            @click="navigateTo('#contact')"
            class="hero-btn group relative overflow-hidden border-2 border-white bg-transparent px-3 py-2 sm:px-4 sm:py-3 transition-all duration-300 hover:bg-white hover:text-black w-full sm:w-auto"
          >
            <span class="relative z-10 flex items-center justify-center text-sm sm:text-base md:text-lg font-medium">
              {{ t('hero.contact') }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span class="absolute bottom-0 left-0 right-0 top-0 -z-10 transform translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0"></span>
          </button>

          <a 
            href="/danilo-lopez-cv.pdf" 
            download 
            class="hero-btn group relative overflow-hidden border-2 border-white bg-transparent px-3 py-2 sm:px-4 sm:py-3 transition-all duration-300 hover:bg-white hover:text-black w-full sm:w-auto z-10 inline-flex"
          >
            <span class="relative z-10 flex items-center justify-center text-sm sm:text-base md:text-lg font-medium">
              {{ t('hero.cv') }}
              <FileDown class="ml-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 transform transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
            </span>
            <span class="absolute bottom-0 left-0 right-0 top-0 -z-10 transform translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0"></span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, watch } from 'vue';
import { FileDown } from 'lucide-vue-next';
import Astronaut from './Astronaut.vue';

// Provide default to avoid errors in tests
const language = inject('language', { t: (key) => key, currentLanguage: ref('en') });
const { t, currentLanguage } = language;

const titleRef = ref(null);
const buttonContainerRef = ref(null);
const frameRef = ref(null);
const typedText = ref('');
const typingComplete = ref(false);
const showCursor = ref(true);

// Store interval references for cleanup
let typingInterval = null;
let cursorInterval = null;

const navigateTo = (hash) => {
  const element = document.querySelector(hash);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const startTypingAnimation = () => {
  const fullText = t('hero.description');
  let currentIndex = 0;
  
  // Clear previous intervals
  if (typingInterval) clearInterval(typingInterval);
  if (cursorInterval) clearInterval(cursorInterval);
  
  // Reset typing state
  typedText.value = '';
  typingComplete.value = false;
  showCursor.value = true;
  
  // Start typing animation
  typingInterval = setInterval(() => {
    if (currentIndex <= fullText.length) {
      typedText.value = fullText.slice(0, currentIndex);
      currentIndex++;
    } else {
      clearInterval(typingInterval);
      typingInterval = null;
      typingComplete.value = true;
    }
  }, 50);
  
  // Blinking cursor
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value;
  }, 500);
};

// Watch for language changes to restart typing animation
// Using currentLanguage directly instead of t() result for explicit reactivity
watch(currentLanguage, () => {
  startTypingAnimation();
});

onMounted(() => {
  // Start typing animation
  startTypingAnimation();
  
  // Add animation classes with slight delays for sequence
  if (frameRef.value) {
    frameRef.value.classList.add('fade-in');
  }

  if (titleRef.value) {
    setTimeout(() => {
      titleRef.value?.classList.add('slide-up');
    }, 300);
  }

  if (buttonContainerRef.value) {
    setTimeout(() => {
      buttonContainerRef.value?.classList.add('fade-in');
    }, 700);
  }
});

// Proper cleanup at setup level
onUnmounted(() => {
  if (typingInterval) clearInterval(typingInterval);
  if (cursorInterval) clearInterval(cursorInterval);
});
</script>

<style scoped>
/* Add your styles here */
</style>
