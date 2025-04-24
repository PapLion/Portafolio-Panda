<template>
    <section
      id="hero"
      class="min-h-screen flex items-center justify-center pt-16 border-b border-white/20 relative"
    >
      <!-- Stars background for Hero section -->
      <div class="stars-background absolute inset-0 z-0">
        <!-- Stars with clones for infinite scrolling -->
        <div class="star-layer absolute inset-0">
          <div class="stars"></div>
          <div class="stars-clone"></div>
        </div>
        <div class="star-layer absolute inset-0">
          <div class="stars2"></div>
          <div class="stars2-clone"></div>
        </div>
        <div class="star-layer absolute inset-0">
          <div class="stars3"></div>
          <div class="stars3-clone"></div>
        </div>
      </div>
  
      <!-- Planets and astronauts -->
      <div class="absolute inset-0 z-[1] pointer-events-none">
        <!-- Floating astronaut - PRINCIPAL -->
        <div class="absolute top-[40%] left-[10%] animate-float-astronaut">
          <div class="w-[40px] h-[60px] relative">
            <div class="absolute top-0 left-[10px] w-[20px] h-[20px] rounded-full border-2 border-white bg-black"></div>
            <div class="absolute top-[18px] left-[5px] w-[30px] h-[30px] rounded-md border-2 border-white bg-black"></div>
            <div class="absolute top-[45px] left-[15px] w-[10px] h-[15px] border-2 border-white bg-black"></div>
            <div class="absolute top-[45px] left-[15px] w-[10px] h-[15px] border-2 border-white bg-black ml-[10px]"></div>
            <div class="absolute top-[15px] left-[35px] w-[20px] h-[2px] bg-white"></div>
          </div>
        </div>
  
        <!-- Añadir un astronauta adicional en la parte derecha -->
        <div class="absolute top-[70%] right-[15%] animate-float-astronaut" style="animation-delay: 7s">
          <div class="w-[40px] h-[60px] relative">
            <div class="absolute top-0 left-[10px] w-[20px] h-[20px] rounded-full border-2 border-white bg-black"></div>
            <div class="absolute top-[18px] left-[5px] w-[30px] h-[30px] rounded-md border-2 border-white bg-black"></div>
            <div class="absolute top-[45px] left-[15px] w-[10px] h-[15px] border-2 border-white bg-black"></div>
            <div class="absolute top-[45px] left-[15px] w-[10px] h-[15px] border-2 border-white bg-black ml-[10px]"></div>
            <div class="absolute top-[15px] left-[35px] w-[20px] h-[2px] bg-white"></div>
          </div>
        </div>
      </div>
  
      <div class="container mx-auto px-4 text-center relative z-10">
        <div
          ref="frameRef"
          class="manga-frame p-6 sm:p-8 md:p-12 border-2 border-white inline-block relative glowing-border breathing z-20 w-full max-w-3xl mx-auto overflow-hidden"
          style="opacity: 1"
        >
          <div class="speed-lines"></div>
          <h1 ref="titleRef" class="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {{ t('hero.title') }}
          </h1>
          <div class="w-16 sm:w-24 h-1 bg-white mx-auto mb-2"></div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-highlight">
            {{ t('hero.subtitle') }}
          </h2>
          <p class="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            {{ typedText }}
            <span :class="`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`">|</span>
          </p>
          <div
            ref="buttonContainerRef"
            class="flex flex-row justify-center gap-4 sm:gap-6 mt-2 relative z-10 w-full px-4"
          >
            <a href="#projects" class="z-10 relative">
              <button class="hero-btn group relative overflow-hidden border-2 border-white bg-transparent px-4 py-3 transition-all duration-300 hover:bg-white hover:text-black">
                <span class="relative z-10 flex items-center justify-center text-base sm:text-lg font-medium">
                  {{ t('hero.projects') }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="ml-2 h-4 w-4 sm:h-5 sm:w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
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
            </a>
  
            <a href="#contact" class="z-10 relative">
              <button class="hero-btn group relative overflow-hidden border-2 border-white bg-transparent px-4 py-3 transition-all duration-300 hover:bg-white hover:text-black">
                <span class="relative z-10 flex items-center justify-center text-base sm:text-lg font-medium">
                  {{ t('hero.contact') }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="ml-2 h-4 w-4 sm:h-5 sm:w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
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
            </a>
  
            <a href="/danilo-lopez-cv.pdf" download class="z-10 relative">
              <button class="hero-btn group relative overflow-hidden border-2 border-white bg-transparent px-4 py-3 transition-all duration-300 hover:bg-white hover:text-black">
                <span class="relative z-10 flex items-center justify-center text-base sm:text-lg font-medium">
                  {{ t('hero.cv') }}
                  <FileDown class="ml-2 h-4 w-4 sm:h-5 sm:w-5 transform transition-transform duration-300 group-hover:translate-y-1" />
                </span>
                <span class="absolute bottom-0 left-0 right-0 top-0 -z-10 transform translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0"></span>
              </button>
            </a>
          </div>
  
          <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce mt-16">
            <ArrowDown class="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, inject, watch } from 'vue';
  import { ArrowDown, FileDown } from 'lucide-vue-next';
  
  const language = inject('language');
  const { t } = language;
  
  const titleRef = ref(null);
  const buttonContainerRef = ref(null);
  const frameRef = ref(null);
  const typedText = ref('');
  const typingComplete = ref(false);
  const showCursor = ref(true);
  
  let typingInterval = null;
  let cursorInterval = null;
  
  const startTypingAnimation = () => {
    const fullText = t('hero.description');
    let currentIndex = 0;
    
    // Clear previous intervals if they exist
    if (typingInterval) clearInterval(typingInterval);
    if (cursorInterval) clearInterval(cursorInterval);
    
    // Reset typing state
    typedText.value = '';
    typingComplete.value = false;
    
    // Start typing animation
    typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        typedText.value = fullText.slice(0, currentIndex);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        typingComplete.value = true;
      }
    }, 50);
    
    // Blinking cursor
    cursorInterval = setInterval(() => {
      showCursor.value = !showCursor.value;
    }, 500);
  };
  
  // Watch for language changes to restart typing animation
  watch(() => t('hero.description'), () => {
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
        titleRef.value.classList.add('slide-up');
      }, 300);
    }
  
    if (buttonContainerRef.value) {
      setTimeout(() => {
        buttonContainerRef.value.classList.add('fade-in');
      }, 700);
    }
    
    // Clean up intervals on component unmount
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  });
  </script>