<template>
    <section id="about" class="py-12 sm:py-16 md:py-20 border-b border-white/20 bg-black">
      <div class="container mx-auto px-4">
        <div ref="panelRef" class="manga-panel border-2 border-white p-6 sm:p-8 md:p-12 relative opacity-0">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center section-title">
            {{ t('about.title') }}
          </h2>
  
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div class="manga-frame border-2 border-white p-4 sm:p-6 breathing">
              <div class="space-y-4 sm:space-y-6 text-base sm:text-lg">
                <p
                  ref="textRef1"
                  class="opacity-0 fancy-text border-l-4 border-white pl-3 sm:pl-4"
                >
                  {{ t('about.intro') }}
                </p>
                <p
                  ref="textRef2"
                  class="opacity-0 fancy-text bg-white/5 p-3 sm:p-4 border-r-4 border-white"
                >
                  {{ t('about.approach') }}
                </p>
              </div>
            </div>
  
            <div class="space-y-6 sm:space-y-8">
              <div class="manga-speech-bubble border-2 border-white p-4 sm:p-6 relative animate-float-slow">
                <h3 class="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-highlight-underline">
                  {{ t('about.philosophy.title') }}
                </h3>
                <p ref="textRef3" class="opacity-0 fancy-text text-base sm:text-lg">
                  {{ t('about.philosophy.text') }}
                </p>
                <div class="absolute -bottom-3 -left-3 w-6 h-6 bg-black border-r-2 border-t-2 border-white transform rotate-45"></div>
              </div>
  
              <div class="manga-speech-bubble border-2 border-white p-4 sm:p-6 relative animate-float-medium">
                <h3 class="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-highlight-underline">
                  {{ t('about.beyond.title') }}
                </h3>
                <p ref="textRef4" class="opacity-0 fancy-text text-base sm:text-lg">
                  {{ t('about.beyond.text') }}
                </p>
                <div class="absolute -bottom-3 -left-3 w-6 h-6 bg-black border-r-2 border-t-2 border-white transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, inject } from 'vue';
  
  const language = inject('language');
  const { t } = language;
  
  const panelRef = ref(null);
  const textRef1 = ref(null);
  const textRef2 = ref(null);
  const textRef3 = ref(null);
  const textRef4 = ref(null);
  
  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === panelRef.value) {
              entry.target.classList.add('fade-in');
            } else {
              // Add staggered animation to text elements
              const textRefs = [textRef1.value, textRef2.value, textRef3.value, textRef4.value];
              textRefs.forEach((ref, index) => {
                if (ref) {
                  setTimeout(() => {
                    ref.classList.add('slide-in');
                  }, index * 200);
                }
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );
  
    if (panelRef.value) {
      observer.observe(panelRef.value);
    }
  
    const textRefs = [textRef1.value, textRef2.value, textRef3.value, textRef4.value];
    textRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
  
    return () => observer.disconnect();
  });
  </script>