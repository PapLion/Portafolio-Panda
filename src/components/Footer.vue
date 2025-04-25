<template>
    <footer class="py-6 sm:py-8 bg-black border-t border-white/20">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <p class="mb-2 text-sm sm:text-base">{{ t('footer.developed') }}</p>
          <p class="text-xs sm:text-sm text-gray-400">
            &copy; 2021 Danilo López. {{ t('footer.rights') }}
          </p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { inject } from 'vue';
  
  const language = inject('language');
  const { t } = language;
  </script>