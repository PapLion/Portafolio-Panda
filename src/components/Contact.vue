<template>
  <section id="contact" class="py-8 sm:py-12 md:py-16 lg:py-20 border-b border-white/20 relative" aria-labelledby="contact-title">
    <!-- Astronaut decorations -->
    <div class="absolute inset-0 z-[1] pointer-events-none">
      <div class="absolute top-[20%] sm:top-[25%] md:top-[30%] right-[5%] sm:right-[10%] md:right-[15%] animate-float-astronaut hidden md:block">
        <Astronaut />
      </div>
      <div class="absolute bottom-[10%] sm:bottom-[15%] md:bottom-[20%] left-[10%] sm:left-[20%] md:left-[25%] animate-float-astronaut hidden lg:block" style="animation-delay: 5s">
        <Astronaut />
      </div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="flex justify-center w-full mb-4 sm:mb-6 md:mb-8">
        <!-- Fixed: Using h2 instead of h1 for section title -->
        <h2 id="contact-title" class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center section-title">{{ t('contact.title') }}</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        <div class="border-2 border-white p-3 sm:p-4 md:p-6 lg:p-8 bg-black/70 backdrop-blur-sm">
          <h3 class="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-6 border-b-2 border-white pb-2">
            {{ t('contact.form.title') }}
          </h3>

          <form @submit.prevent="handleSubmit" class="space-y-3 sm:space-y-4 md:space-y-6" novalidate>
            <!-- Name field -->
            <div>
              <label for="contact-name" class="block mb-1 text-xs sm:text-sm font-medium">
                {{ t('contact.name') }}
              </label>
              <input
                id="contact-name"
                v-model="formData.name"
                name="name"
                type="text"
                :class="`w-full border-2 ${
                  formErrors.name ? 'border-red-500' : 'border-white/50'
                } bg-transparent focus:border-white p-2 rounded-none text-sm sm:text-base transition-colors`"
                :placeholder="t('contact.name.placeholder')"
                :disabled="isLoading"
                :aria-invalid="formErrors.name ? 'true' : 'false'"
                aria-describedby="name-error"
                autocomplete="name"
              />
              <p 
                v-if="formErrors.name" 
                id="name-error" 
                class="mt-1 text-xs text-red-400"
                role="alert"
              >
                {{ t('contact.name.error') }}
              </p>
            </div>

            <!-- Email field -->
            <div>
              <label for="contact-email" class="block mb-1 text-xs sm:text-sm font-medium">
                {{ t('contact.email') }}
              </label>
              <input
                id="contact-email"
                v-model="formData.email"
                name="email"
                type="email"
                :class="`w-full border-2 ${
                  formErrors.email ? 'border-red-500' : 'border-white/50'
                } bg-transparent focus:border-white p-2 rounded-none text-sm sm:text-base transition-colors`"
                :placeholder="t('contact.email.placeholder')"
                :disabled="isLoading"
                :aria-invalid="formErrors.email ? 'true' : 'false'"
                aria-describedby="email-error"
                autocomplete="email"
              />
              <p 
                v-if="formErrors.email" 
                id="email-error" 
                class="mt-1 text-xs text-red-400"
                role="alert"
              >
                {{ t('contact.email.error') }}
              </p>
            </div>

            <!-- Message field -->
            <div>
              <label for="contact-message" class="block mb-1 text-xs sm:text-sm font-medium">
                {{ t('contact.message') }}
              </label>
              <textarea
                id="contact-message"
                v-model="formData.message"
                name="message"
                :class="`w-full border-2 ${
                  formErrors.message ? 'border-red-500' : 'border-white/50'
                } bg-transparent focus:border-white p-2 rounded-none min-h-[80px] sm:min-h-[100px] md:min-h-[120px] text-sm sm:text-base transition-colors resize-y`"
                :placeholder="t('contact.message.placeholder')"
                :disabled="isLoading"
                :aria-invalid="formErrors.message ? 'true' : 'false'"
                aria-describedby="message-error"
              ></textarea>
              <p 
                v-if="formErrors.message" 
                id="message-error" 
                class="mt-1 text-xs text-red-400"
                role="alert"
              >
                {{ t('contact.message.error') }}
              </p>
            </div>

            <!-- Submit button and feedback -->
            <div class="flex flex-col items-center justify-center">
              <button 
                type="submit" 
                class="bg-white text-black hover:bg-gray-200 border-2 border-white px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed mb-2 flex items-center gap-2 transition-colors"
                :disabled="isLoading"
              >
                <!-- Loading spinner -->
                <svg 
                  v-if="isLoading" 
                  class="animate-spin h-4 w-4" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? t('contact.sending') : t('contact.send') }}
              </button>

              <!-- Success message -->
              <div 
                v-if="isSuccess" 
                class="text-green-400 text-sm mt-2 p-3 border border-green-400/50 bg-green-400/10 rounded"
                role="status"
                aria-live="polite"
              >
                {{ t('contact.success') }}
              </div>

              <!-- Error message -->
              <div 
                v-if="errorMessage" 
                class="text-red-400 text-sm mt-2 p-3 border border-red-400/50 bg-red-400/10 rounded"
                role="alert"
                aria-live="assertive"
              >
                {{ errorMessage }}
              </div>
            </div>
          </form>
        </div>

        <div class="space-y-4 sm:space-y-6 md:space-y-8">
          <div class="border-2 border-white p-3 sm:p-4 md:p-6 lg:p-8 bg-black/70 backdrop-blur-sm">
            <h3 class="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-6 border-b-2 border-white pb-2">
              {{ t('contact.social') }}
            </h3>

            <div class="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <a
                v-for="link in socialLinks"
                :key="link.label"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 p-2 sm:p-3 border-2 border-white hover:bg-white hover:text-black transition-colors"
                :aria-label="`${link.label} (opens in new tab)`"
              >
                <component :is="link.icon" class="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span class="text-xs sm:text-sm md:text-base">{{ link.label }}</span>
              </a>
            </div>
          </div>

          <div class="border-2 border-white p-3 sm:p-4 md:p-6 lg:p-8 bg-black/70 backdrop-blur-sm">
            <h3 class="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">{{ t('contact.ready') }}</h3>
            <p class="mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base">{{ t('contact.available') }}</p>

            <a
              href="/danilo-lopez-cv.pdf"
              download
              class="w-full flex items-center justify-center gap-2 py-2 sm:py-3 border-2 border-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 font-medium text-xs sm:text-sm md:text-base"
            >
              <FileDown class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" aria-hidden="true" />
              {{ t('contact.download.cv') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, inject } from 'vue';
import { Github, Twitter, Linkedin, MessageSquare, FileDown } from 'lucide-vue-next';
import Astronaut from './Astronaut.vue';

const language = inject('language', { t: (key) => key });
const { t } = language;

const formData = ref({
  name: '',
  email: '',
  message: '',
});

const formErrors = ref({
  name: false,
  email: false,
  message: false,
});

const isLoading = ref(false);
const isSuccess = ref(false);
const errorMessage = ref('');

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

const validateForm = () => {
  let isValid = true;
  
  // Reset errors
  formErrors.value = {
    name: false,
    email: false,
    message: false,
  };
  
  // Validate name
  if (!formData.value.name.trim()) {
    formErrors.value.name = true;
    isValid = false;
  }
  
  // Validate email
  if (!formData.value.email.trim() || !validateEmail(formData.value.email.trim())) {
    formErrors.value.email = true;
    isValid = false;
  }
  
  // Validate message
  if (!formData.value.message.trim()) {
    formErrors.value.message = true;
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = async () => {
  // Reset states
  errorMessage.value = '';
  isSuccess.value = false;
  
  // Validate form before submission
  if (!validateForm()) {
    return;
  }
  
  isLoading.value = true;

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.value.name.trim(),
        email: formData.value.email.trim(),
        message: formData.value.message.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || t('contact.error.generic') || 'Error sending message');
    }

    // Success - show success message and reset form
    isSuccess.value = true;
    formData.value = { name: '', email: '', message: '' };
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      isSuccess.value = false;
    }, 5000);
  } catch (error) {
    console.error('Error sending message:', error);
    errorMessage.value = error.message || t('contact.error.generic') || 'An error occurred. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const socialLinks = [
  { icon: Github, url: 'https://github.com/PapLion', label: 'GitHub' },
  { icon: Twitter, url: 'https://twitter.com/LionPap', label: 'Twitter' },
  { icon: Linkedin, url: 'https://www.linkedin.com/in/danilo-eduardo-l%C3%B3pez-corozo-0b83a2310/', label: 'LinkedIn' },
  { icon: MessageSquare, url: 'https://discord.gg/4zGbjav7Bn', label: 'Discord' },
];
</script>

<style scoped>
/* Ensure focus states are visible for accessibility */
input:focus,
textarea:focus,
button:focus {
  outline: 2px solid white;
  outline-offset: 2px;
}
</style>
