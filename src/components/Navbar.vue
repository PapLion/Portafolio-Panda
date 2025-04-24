<template>
    <header
      :class="`fixed top-0 left-0 right-0 z-50 header-container transition-all duration-300 ${
        scrolled ? 'bg-black/80 border-b border-white/20 backdrop-blur-sm' : 'bg-transparent'
      }`"
    >
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-3 sm:py-4">
          <div class="text-lg sm:text-xl font-bold header-logo">
            <a href="/" class="hover:text-gray-300 transition-colors">
              Dani.Dev
            </a>
          </div>
  
          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center">
            <ul class="flex space-x-3 lg:space-x-6 mr-4 lg:mr-6">
              <li v-for="item in menuItems" :key="item.name">
                <a
                  :href="item.href"
                  class="nav-link hover:text-gray-300 transition-colors px-1 py-1 text-sm lg:text-base"
                >
                  {{ item.name }}
                </a>
              </li>
            </ul>
  
            <div class="flex items-center gap-3">
              <LanguageSelector />
  
              <a
                href="/danilo-lopez-cv.pdf"
                download
                class="flex items-center gap-1 sm:gap-2 border-2 border-white px-3 py-1 sm:px-4 sm:py-2 transition-all duration-300 hover:bg-white hover:text-black text-sm lg:text-base"
              >
                <FileDown class="w-3 h-3 sm:w-4 sm:h-4" />
                <span class="font-medium">{{ t('nav.cv') }}</span>
              </a>
            </div>
          </nav>
  
          <!-- Mobile Menu Button -->
          <div class="flex items-center gap-2 md:hidden">
            <LanguageSelector />
            <button class="text-white" @click="toggleMenu" aria-label="Toggle menu">
              <X v-if="isOpen" size="24" />
              <Menu v-else size="24" />
            </button>
          </div>
        </div>
      </div>
  
      <!-- Mobile Navigation -->
      <div v-if="isOpen" class="md:hidden bg-black/95 border-t border-white/20">
        <ul class="flex flex-col items-center py-4">
          <li v-for="item in menuItems" :key="item.name" class="py-2">
            <a :href="item.href" class="nav-link hover:text-gray-300 transition-colors" @click="toggleMenu">
              {{ item.name }}
            </a>
          </li>
          <li class="py-2">
            <a
              href="/danilo-lopez-cv.pdf"
              download
              class="flex items-center justify-center gap-2 border-2 border-white px-4 py-2 mt-4 transition-all duration-300 hover:bg-white hover:text-black"
              @click="toggleMenu"
            >
              <FileDown class="w-4 h-4" />
              <span class="font-medium">{{ t('nav.download.cv') }}</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, inject } from 'vue';
  import { Menu, X, FileDown } from 'lucide-vue-next';
  import LanguageSelector from './LanguageSelector.vue';
  
  const language = inject('language');
  const { t } = language;
  
  const isOpen = ref(false);
  const scrolled = ref(false);
  
  const toggleMenu = () => {
    isOpen.value = !isOpen.value;
  };
  
  const menuItems = computed(() => [
    { name: t('nav.home'), href: "#hero" },
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.skills'), href: "#skills" },
    { name: t('nav.projects'), href: "#projects" },
    { name: t('nav.contact'), href: "#contact" },
  ]);
  
  onMounted(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        scrolled.value = true;
      } else {
        scrolled.value = false;
      }
    };
  
    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  });
  </script>