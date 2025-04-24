<template>
    <section id="contact" class="py-12 sm:py-16 md:py-20 border-b border-white/20 relative">
  
      <!-- Elementos espaciales separados para mejor visibilidad -->
      <div class="absolute inset-0 z-[1] pointer-events-none">
        <!-- Floating astronaut/alien for contact section - PRINCIPAL -->
        <div class="absolute top-[30%] right-[15%] animate-float-astronaut">
          <div class="w-[40px] h-[60px] relative">
            <div class="absolute top-0 left-[10px] w-[20px] h-[20px] rounded-full border-2 border-white bg-black"></div>
            <div class="absolute top-[18px] left-[5px] w-[30px] h-[30px] rounded-md border-2 border-white bg-black"></div>
            <div class="absolute top-[45px] left-[15px] w-[10px] h-[15px] border-2 border-white bg-black"></div>
            <div class="absolute top-[45px] left-[15px] w-[10px] h-[15px] border-2 border-white bg-black ml-[10px]"></div>
            <div class="absolute top-[15px] left-[35px] w-[20px] h-[2px] bg-white"></div>
          </div>
        </div>
  
        <!-- Añadir un astronauta adicional en la parte inferior -->
        <div class="absolute bottom-[20%] left-[25%] animate-float-astronaut" style="animation-delay: 5s">
          <div class="w-[40px] h-[60px] relative">
            <div class="absolute top-0 left-[10px] w-[20px] h-[20px] rounded-full border-2 border-white bg-black"></div>
            <div class="absolute top-[18px] left-[5px] w-[30px] h-[30px] rounded-md border-2 border-white bg-black"></div>
            <div class="absolute top-[45px] left-[15px] w-[10px] h-[15px] border-2 border-white bg-black"></div>
            <div class="absolute top-[45px] left-[15px] w-[10px] h-[15px] border-2 border-white bg-black ml-[10px]"></div>
            <div class="absolute top-[15px] left-[35px] w-[20px] h-[2px] bg-white"></div>
          </div>
        </div>
      </div>
  
      <div class="container mx-auto px-4 relative z-10">
        <div class="flex justify-center w-full mb-6 sm:mb-8">
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center section-title">{{ t('contact.title') }}</h1>
        </div>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          <div class="border-2 border-white p-4 sm:p-6 md:p-8 bg-black/70 backdrop-blur-sm">
            <h3 class="text-lg sm:text-xl font-bold mb-4 sm:mb-6 border-b-2 border-white pb-2">
              {{ t('contact.form.title') }}
            </h3>
  
            <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
              <div>
                <label for="name" class="block mb-1 sm:mb-2 text-sm font-medium">
                  {{ t('contact.name') }}
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  name="name"
                  type="text"
                  :class="`w-full border-2 ${
                    formErrors.name ? 'border-red-500' : 'border-white/50'
                  } bg-transparent focus:border-white p-2 rounded-none`"
                  :placeholder="t('contact.name.placeholder')"
                />
                <p v-if="formErrors.name" class="mt-1 text-xs sm:text-sm text-red-500">{{ t('contact.name.error') }}</p>
              </div>
  
              <div>
                <label for="email" class="block mb-1 sm:mb-2 text-sm font-medium">
                  {{ t('contact.email') }}
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  name="email"
                  type="email"
                  :class="`w-full border-2 ${
                    formErrors.email ? 'border-red-500' : 'border-white/50'
                  } bg-transparent focus:border-white p-2 rounded-none`"
                  :placeholder="t('contact.email.placeholder')"
                />
                <p v-if="formErrors.email" class="mt-1 text-xs sm:text-sm text-red-500">{{ t('contact.email.error') }}</p>
              </div>
  
              <div>
                <label for="message" class="block mb-1 sm:mb-2 text-sm font-medium">
                  {{ t('contact.message') }}
                </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  name="message"
                  :class="`w-full border-2 ${
                    formErrors.message ? 'border-red-500' : 'border-white/50'
                  } bg-transparent focus:border-white p-2 rounded-none min-h-[100px] sm:min-h-[120px]`"
                  :placeholder="t('contact.message.placeholder')"
                ></textarea>
                <p v-if="formErrors.message" class="mt-1 text-xs sm:text-sm text-red-500">{{ t('contact.message.error') }}</p>
              </div>
  
              <div class="flex justify-center">
                <button type="submit" class="bg-white text-black hover:bg-gray-200 border-2 border-white px-6 py-2">
                  {{ t('contact.send') }}
                </button>
              </div>
            </form>
          </div>
  
          <div class="space-y-6 sm:space-y-8">
            <div class="border-2 border-white p-4 sm:p-6 md:p-8 bg-black/70 backdrop-blur-sm">
              <h3 class="text-lg sm:text-xl font-bold mb-4 sm:mb-6 border-b-2 border-white pb-2">
                {{ t('contact.social') }}
              </h3>
  
              <div class="grid grid-cols-2 gap-3 sm:gap-4">
                <a
                  v-for="link in socialLinks"
                  :key="link.label"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border-2 border-white hover:bg-white hover:text-black transition-colors"
                >
                  <component :is="link.icon" />
                  <span class="text-sm sm:text-base">{{ link.label }}</span>
                </a>
              </div>
            </div>
  
            <div class="border-2 border-white p-4 sm:p-6 md:p-8 bg-black/70 backdrop-blur-sm">
              <h3 class="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{{ t('contact.ready') }}</h3>
              <p class="mb-4 sm:mb-6 text-sm sm:text-base">{{ t('contact.available') }}</p>
  
              <a
                href="/danilo-lopez-cv.pdf"
                download
                class="w-full flex items-center justify-center gap-2 py-2 sm:py-3 border-2 border-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 font-medium text-sm sm:text-base"
              >
                <FileDown class="w-4 h-4 sm:w-5 sm:h-5" />
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
  
  const language = inject('language');
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
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    formData.value[name] = value;
  
    // Validate on change
    if (name === 'email' && value) {
      formErrors.value.email = !validateEmail(value);
    } else if (value) {
      formErrors.value[name] = false;
    }
  };
  
  const handleSubmit = () => {
    // Validate all fields
    const errors = {
      name: !formData.value.name,
      email: !formData.value.email || !validateEmail(formData.value.email),
      message: !formData.value.message,
    };
  
    formErrors.value = errors;
  
    // If no errors, submit form
    if (!Object.values(errors).some(Boolean)) {
      // Here you would normally send the form data to your backend
      alert('Mensaje enviado correctamente!');
      formData.value = { name: '', email: '', message: '' };
    }
  };
  
  const socialLinks = [
    { icon: Github, url: 'https://github.com/PapLion', label: 'GitHub' },
    { icon: Twitter, url: 'https://twitter.com/LionPap', label: 'Twitter' },
    { icon: Linkedin, url: '#', label: 'LinkedIn' },
    { icon: MessageSquare, url: 'https://discord.gg/4zGbjav7Bn', label: 'Discord' },
  ];
  </script>