<template>
  <footer class="py-6 sm:py-8 bg-black border-t border-white/20" role="contentinfo">
    <div class="container mx-auto px-4">
      <div class="text-center">
        <p class="mb-2 text-sm sm:text-base">{{ t('footer.developed') }}</p>
        <p class="text-xs sm:text-sm text-gray-400">
          &copy; {{ currentYear }} Danilo Lopez. {{ t('footer.rights') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { inject, computed } from 'vue';

const language = inject('language', { t: (key) => key });
const { t } = language;

// Dynamic year that updates automatically
const currentYear = computed(() => new Date().getFullYear());
</script>
