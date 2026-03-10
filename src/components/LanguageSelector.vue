<template>
  <div class="relative" ref="selectorRef">
    <button
      @click="toggleDropdown"
      class="flex items-center gap-1 border-2 border-white px-2 py-1 transition-all duration-300 hover:bg-white hover:text-black"
      :aria-label="t('language.select')"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
    >
      <Globe class="w-4 h-4" aria-hidden="true" />
      <!-- Fixed: Using currentLanguage.value instead of comparing language object -->
      <span class="hidden sm:inline text-sm">{{ currentLanguage === 'es' ? 'ES' : 'EN' }}</span>
    </button>

    <div 
      v-if="isOpen" 
      class="absolute top-full right-0 mt-1 bg-black border-2 border-white z-50 min-w-[120px]"
      role="listbox"
      :aria-label="t('language.select')"
    >
      <button
        @click="changeLanguage('es')"
        :class="`w-full text-left px-3 py-2 text-sm hover:bg-white hover:text-black transition-colors ${
          currentLanguage === 'es' ? 'bg-white/10' : ''
        }`"
        role="option"
        :aria-selected="currentLanguage === 'es'"
      >
        {{ t('language.es') }}
      </button>
      <button
        @click="changeLanguage('en')"
        :class="`w-full text-left px-3 py-2 text-sm hover:bg-white hover:text-black transition-colors ${
          currentLanguage === 'en' ? 'bg-white/10' : ''
        }`"
        role="option"
        :aria-selected="currentLanguage === 'en'"
      >
        {{ t('language.en') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, computed } from 'vue';
import { Globe } from 'lucide-vue-next';

const languageProvider = inject('language', { 
  t: (key) => key, 
  setLanguage: () => {}, 
  currentLanguage: ref('en') 
});

const { t, setLanguage, currentLanguage: currentLanguageRef } = languageProvider;

// Computed to get the actual value from the ref/computed
const currentLanguage = computed(() => {
  // Handle both ref and computed
  return currentLanguageRef?.value ?? currentLanguageRef ?? 'en';
});

const isOpen = ref(false);
const selectorRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const changeLanguage = (lang) => {
  setLanguage(lang);
  isOpen.value = false;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (selectorRef.value && !selectorRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

// Close on escape key
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleEscapeKey);
});
</script>
