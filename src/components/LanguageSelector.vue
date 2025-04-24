<template>
    <div class="relative">
      <button
        @click="toggleDropdown"
        class="flex items-center gap-1 border-2 border-white px-2 py-1 transition-all duration-300 hover:bg-white hover:text-black"
        :aria-label="t('language.select')"
      >
        <Globe class="w-4 h-4" />
        <span class="hidden sm:inline text-sm">{{ language === 'es' ? 'ES' : 'EN' }}</span>
      </button>
  
      <div v-if="isOpen" class="absolute top-full right-0 mt-1 bg-black border-2 border-white z-50 min-w-[120px]">
        <button
          @click="changeLanguage('es')"
          :class="`w-full text-left px-3 py-2 text-sm hover:bg-white hover:text-black transition-colors ${
            language === 'es' ? 'bg-white/10' : ''
          }`"
        >
          {{ t('language.es') }}
        </button>
        <button
          @click="changeLanguage('en')"
          :class="`w-full text-left px-3 py-2 text-sm hover:bg-white hover:text-black transition-colors ${
            language === 'en' ? 'bg-white/10' : ''
          }`"
        >
          {{ t('language.en') }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, inject } from 'vue';
  import { Globe } from 'lucide-vue-next';
  
  const language = inject('language');
  const { t, setLanguage, currentLanguage } = language;
  
  const isOpen = ref(false);
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const changeLanguage = (lang) => {
    setLanguage(lang);
    isOpen.value = false;
  };
  </script>