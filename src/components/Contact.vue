<template>
    <section id="contact" class="py-8 sm:py-12 md:py-16 lg:py-20 border-b border-white/20 relative">
  
      <!-- Elementos espaciales separados para mejor visibilidad -->
      <div class="absolute inset-0 z-[1] pointer-events-none">
        <!-- Floating astronaut/alien for contact section - PRINCIPAL -->
        <div class="absolute top-[20%] sm:top-[25%] md:top-[30%] right-[5%] sm:right-[10%] md:right-[15%] animate-float-astronaut">
          <Astronaut />
        </div>
  
        <!-- Añadir un astronauta adicional en la parte inferior -->
        <div class="absolute bottom-[10%] sm:bottom-[15%] md:bottom-[20%] left-[10%] sm:left-[20%] md:left-[25%] animate-float-astronaut" style="animation-delay: 5s">
          <Astronaut />
        </div>
      </div>
  
      <div class="container mx-auto px-4 relative z-10">
        <div class="flex justify-center w-full mb-4 sm:mb-6 md:mb-8">
          <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center section-title">{{ t('contact.title') }}</h1>
        </div>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <div class="border-2 border-white p-3 sm:p-4 md:p-6 lg:p-8 bg-black/70 backdrop-blur-sm">
            <h3 class="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-6 border-b-2 border-white pb-2">
              {{ t('contact.form.title') }}
            </h3>
  
            <form @submit.prevent="handleSubmit" class="space-y-3 sm:space-y-4 md:space-y-6">
              <div>
                <label for="name" class="block mb-1 text-xs sm:text-sm font-medium">
                  {{ t('contact.name') }}
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  name="name"
                  type="text"
                  :class="`w-full border-2 ${
                    formErrors.name ? 'border-red-500' : 'border-white/50'
                  } bg-transparent focus:border-white p-2 rounded-none text-sm sm:text-base`"
                  :placeholder="t('contact.name.placeholder')"
                  :disabled="isLoading"
                />
                <p v-if="formErrors.name" class="mt-1 text-xs text-red-500">{{ t('contact.name.error') }}</p>
              </div>
  
              <div>
                <label for="email" class="block mb-1 text-xs sm:text-sm font-medium">
                  {{ t('contact.email') }}
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  name="email"
                  type="email"
                  :class="`w-full border-2 ${
                    formErrors.email ? 'border-red-500' : 'border-white/50'
                  } bg-transparent focus:border-white p-2 rounded-none text-sm sm:text-base`"
                  :placeholder="t('contact.email.placeholder')"
                  :disabled="isLoading"
                />
                <p v-if="formErrors.email" class="mt-1 text-xs text-red-500">{{ t('contact.email.error') }}</p>
              </div>
  
              <div>
                <label for="message" class="block mb-1 text-xs sm:text-sm font-medium">
                  {{ t('contact.message') }}
                </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  name="message"
                  :class="`w-full border-2 ${
                    formErrors.message ? 'border-red-500' : 'border-white/50'
                  } bg-transparent focus:border-white p-2 rounded-none min-h-[80px] sm:min-h-[100px] md:min-h-[120px] text-sm sm:text-base`"
                  :placeholder="t('contact.message.placeholder')"
                  :disabled="isLoading"
                ></textarea>
                <p v-if="formErrors.message" class="mt-1 text-xs text-red-500">{{ t('contact.message.error') }}</p>
              </div>
  
              <div class="flex justify-center">
                <button 
                  type="submit" 
                  class="bg-white text-black hover:bg-gray-200 border-2 border-white px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="isLoading"
                >
                  {{ isLoading ? t('contact.sending') : t('contact.send') }}
                </button>
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
                >
                  <component :is="link.icon" class="w-4 h-4 sm:w-5 sm:h-5" />
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
                <FileDown class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
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
  import { Resend } from 'resend';
  
  const language = inject('language');
  const { t } = language;
  
  const resend = new Resend('re_Z9NE8zTx_GJG7N3hBMmPkGYd6bYc7ZyZy');
  
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
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async () => {
    // Validate all fields
    const errors = {
      name: !formData.value.name,
      email: !formData.value.email || !validateEmail(formData.value.email),
      message: !formData.value.message,
    };
  
    formErrors.value = errors;
  
    // If no errors, submit form
    if (!Object.values(errors).some(Boolean)) {
      try {
        isLoading.value = true;
        
        const { data, error } = await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: 'a1danideveloper@gmail.com',
          subject: `Nuevo mensaje de ${formData.value.name}`,
          html: `
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${formData.value.name}</p>
            <p><strong>Email:</strong> ${formData.value.email}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${formData.value.message}</p>
          `,
        });
  
        if (error) {
          throw error;
        }
  
        // Reset form and show success message
        formData.value = { name: '', email: '', message: '' };
        alert(t('contact.success'));
      } catch (error) {
        console.error('Error sending email:', error);
        alert(t('contact.error'));
      } finally {
        isLoading.value = false;
      }
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
/* Add your styles here */
</style>