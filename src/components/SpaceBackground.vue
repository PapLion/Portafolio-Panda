<template>
    <div ref="containerRef" class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <!-- Star layers with different parallax speeds -->
      <div class="star-layer absolute inset-0">
        <div ref="starsLayer1" class="stars-container"></div>
        <div ref="starsLayer1Clone" class="stars-container-clone"></div>
      </div>
      <div class="star-layer absolute inset-0">
        <div ref="starsLayer2" class="stars-container"></div>
        <div ref="starsLayer2Clone" class="stars-container-clone"></div>
      </div>
      <div class="star-layer absolute inset-0">
        <div ref="starsLayer3" class="stars-container"></div>
        <div ref="starsLayer3Clone" class="stars-container-clone"></div>
      </div>
  
      <!-- Planets -->
      <div ref="planetsRef" class="absolute inset-0">
        <!-- Planet 1 - Top right -->
        <div class="planet absolute top-[20%] -right-[100px] w-[200px] h-[200px] opacity-30 animate-float-slow">
          <div class="w-full h-full rounded-full border-2 border-white relative overflow-hidden">
            <div class="absolute inset-0 bg-black">
              <div class="absolute top-[10%] left-[20%] w-[30px] h-[30px] rounded-full border border-white opacity-60"></div>
              <div class="absolute top-[40%] left-[60%] w-[20px] h-[20px] rounded-full border border-white opacity-40"></div>
              <div class="absolute top-[70%] left-[30%] w-[15px] h-[15px] rounded-full border border-white opacity-50"></div>
            </div>
          </div>
        </div>
  
        <!-- Planet 2 - Bottom left -->
        <div class="planet absolute top-[60%] -left-[150px] w-[300px] h-[300px] opacity-20 animate-float-medium">
          <div class="w-full h-full rounded-full border-4 border-white relative">
            <div class="absolute inset-0 rounded-full overflow-hidden">
              <div class="absolute top-[20%] left-[10%] w-[40px] h-[40px] rounded-full bg-white opacity-10"></div>
              <div class="absolute top-[50%] left-[70%] w-[60px] h-[60px] rounded-full bg-white opacity-10"></div>
              <div class="absolute top-[80%] left-[40%] w-[30px] h-[30px] rounded-full bg-white opacity-10"></div>
            </div>
            <!-- Rings -->
            <div class="absolute inset-0 rounded-full border-8 border-white opacity-20 scale-[1.2] rotate-12"></div>
          </div>
        </div>
  
        <!-- Planet 3 - Middle right -->
        <div class="planet absolute top-[120%] -right-[80px] w-[160px] h-[160px] opacity-40 animate-float-fast">
          <div class="w-full h-full rounded-full border border-white relative overflow-hidden">
            <div class="absolute inset-0 bg-black">
              <div class="absolute inset-0 opacity-30">
                <div class="absolute top-0 left-0 right-0 h-[20px] bg-white opacity-20"></div>
                <div class="absolute top-[40px] left-0 right-0 h-[15px] bg-white opacity-10"></div>
                <div class="absolute top-[80px] left-0 right-0 h-[25px] bg-white opacity-15"></div>
                <div class="absolute top-[120px] left-0 right-0 h-[10px] bg-white opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Planet 4 - For skills section -->
        <div class="planet absolute top-[180%] -left-[120px] w-[180px] h-[180px] opacity-25 animate-float-medium">
          <div class="w-full h-full rounded-full border-2 border-white relative overflow-hidden">
            <div class="absolute inset-0 bg-black">
              <div class="absolute top-[15%] left-[25%] w-[35px] h-[35px] rounded-full border border-white opacity-50"></div>
              <div class="absolute top-[45%] left-[55%] w-[25px] h-[25px] rounded-full border border-white opacity-30"></div>
              <div class="absolute top-[75%] left-[35%] w-[20px] h-[20px] rounded-full border border-white opacity-40"></div>
            </div>
          </div>
        </div>
  
        <!-- Planet 5 - For contact section -->
        <div class="planet absolute top-[240%] -right-[90px] w-[170px] h-[170px] opacity-35 animate-float-slow">
          <div class="w-full h-full rounded-full border-3 border-white relative">
            <div class="absolute inset-0 rounded-full overflow-hidden">
              <div class="absolute top-[25%] left-[15%] w-[45px] h-[45px] rounded-full bg-white opacity-15"></div>
              <div class="absolute top-[55%] left-[65%] w-[55px] h-[55px] rounded-full bg-white opacity-15"></div>
              <div class="absolute top-[85%] left-[45%] w-[35px] h-[35px] rounded-full bg-white opacity-15"></div>
            </div>
            <!-- Rings -->
            <div class="absolute inset-0 rounded-full border-6 border-white opacity-15 scale-[1.15] rotate-15"></div>
          </div>
        </div>
  
        <!-- Additional planets for longer pages -->
        <div class="planet absolute top-[300%] -left-[100px] w-[200px] h-[200px] opacity-30 animate-float-slow">
          <div class="w-full h-full rounded-full border-2 border-white relative overflow-hidden">
            <div class="absolute inset-0 bg-black">
              <div class="absolute top-[20%] left-[30%] w-[40px] h-[40px] rounded-full border border-white opacity-50"></div>
              <div class="absolute top-[50%] left-[60%] w-[30px] h-[30px] rounded-full border border-white opacity-40"></div>
              <div class="absolute top-[80%] left-[20%] w-[25px] h-[25px] rounded-full border border-white opacity-60"></div>
            </div>
          </div>
        </div>
  
        <div class="planet absolute top-[350%] -right-[120px] w-[240px] h-[240px] opacity-20 animate-float-medium">
          <div class="w-full h-full rounded-full border-4 border-white relative">
            <div class="absolute inset-0 rounded-full overflow-hidden">
              <div class="absolute top-[30%] left-[20%] w-[50px] h-[50px] rounded-full bg-white opacity-10"></div>
              <div class="absolute top-[60%] left-[70%] w-[70px] h-[70px] rounded-full bg-white opacity-10"></div>
              <div class="absolute top-[40%] left-[40%] w-[40px] h-[40px] rounded-full bg-white opacity-10"></div>
            </div>
            <!-- Rings -->
            <div class="absolute inset-0 rounded-full border-8 border-white opacity-20 scale-[1.2] rotate-12"></div>
          </div>
        </div>
  
        <!-- Comet -->
        <div class="absolute animate-comet">
          <div class="w-[3px] h-[3px] bg-white rounded-full relative">
            <div class="absolute top-0 right-0 w-[100px] h-[1px] bg-gradient-to-l from-transparent to-white"></div>
          </div>
        </div>
  
        <!-- Additional comet for longer pages -->
        <div class="absolute top-[150%] left-[80%] animate-comet" style="animation-delay: 8s">
          <div class="w-[3px] h-[3px] bg-white rounded-full relative">
            <div class="absolute top-0 right-0 w-[120px] h-[1px] bg-gradient-to-l from-transparent to-white"></div>
          </div>
        </div>
  
        <!-- Third comet for even longer pages -->
        <div class="absolute top-[300%] left-[30%] animate-comet" style="animation-delay: 15s">
          <div class="w-[3px] h-[3px] bg-white rounded-full relative">
            <div class="absolute top-0 right-0 w-[150px] h-[1px] bg-gradient-to-l from-transparent to-white"></div>
          </div>
        </div>
  
        <!-- Floating astronaut -->
        <div class="absolute top-[200%] left-[10%] animate-float-astronaut">
          <div class="w-[40px] h-[60px] relative">
            <div class="absolute top-0 left-[10px] w-[20px] h-[20px] rounded-full border-2 border-white bg-black"></div>
            <div class="absolute top-[18px] left-[5px] w-[30px] h-[30px] rounded-md border-2 border-white bg-black"></div>
            <div class="absolute top-[45px] left-[15px] w-[10px] h-[15px] border-2 border-white bg-black"></div>
            <div class="absolute top-[45px] left-[15px] w-[10px] h-[15px] border-2 border-white bg-black ml-[10px]"></div>
            <div class="absolute top-[15px] left-[35px] w-[20px] h-[2px] bg-white"></div>
          </div>
        </div>
  
        <!-- Additional astronaut for longer pages -->
        <div class="absolute top-[350%] right-[15%] animate-float-astronaut" style="animation-delay: 10s">
          <div class="w-[40px] h-[60px] relative">
            <div class="absolute top-0 left-[10px] w-[20px] h-[20px] rounded-full border-2 border-white bg-black"></div>
            <div class="absolute top-[18px] left-[5px] w-[30px] h-[30px] rounded-md border-2 border-white bg-black"></div>
            <div class="absolute top-[45px] left-[15px] w-[10px] h-[15px] border-2 border-white bg-black"></div>
            <div class="absolute top-[45px] left-[15px] w-[10px] h-[15px] border-2 border-white bg-black ml-[10px]"></div>
            <div class="absolute top-[15px] left-[35px] w-[20px] h-[2px] bg-white"></div>
          </div>
        </div>
      </div>
  
      <!-- Subtle fog/nebula effect -->
      <div class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-40"></div>
  
      <!-- Animated shooting stars -->
      <div class="shooting-stars"></div>
      <div class="shooting-stars" style="animation-delay: 2s; top: 40%; left: 60%"></div>
      <div class="shooting-stars" style="animation-delay: 5s; top: 70%; left: 20%"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const containerRef = ref(null);
  const planetsRef = ref(null);
  const starsLayer1 = ref(null);
  const starsLayer1Clone = ref(null);
  const starsLayer2 = ref(null);
  const starsLayer2Clone = ref(null);
  const starsLayer3 = ref(null);
  const starsLayer3Clone = ref(null);
  let animationFrameRef = null;
  
  // Función para crear estrellas aleatorias
  const createRandomStars = (container, count, size, opacity) => {
    if (!container) return;
    
    container.innerHTML = '';
    const containerWidth = container.offsetWidth || window.innerWidth;
    const containerHeight = container.offsetHeight || window.innerHeight;
    
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      // Posición completamente aleatoria
      const x = Math.random() * containerWidth;
      const y = Math.random() * containerHeight;
      // Tamaño aleatorio dentro del rango especificado
      const scale = Math.random() * (size.max - size.min) + size.min;
      // Opacidad aleatoria dentro del rango especificado
      const starOpacity = Math.random() * (opacity.max - opacity.min) + opacity.min;
      
      star.className = 'star';
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.width = `${scale}px`;
      star.style.height = `${scale}px`;
      star.style.opacity = starOpacity;
      
      // Añadir efecto de parpadeo a algunas estrellas
      if (Math.random() > 0.7) {
        star.classList.add('twinkling');
        // Retraso aleatorio para que no parpadeen todas al mismo tiempo
        star.style.animationDelay = `${Math.random() * 5}s`;
      }
      
      container.appendChild(star);
    }
  };
  
  // Función para clonar estrellas
  const cloneStars = (source, target) => {
    if (!source || !target) return;
    target.innerHTML = source.innerHTML;
  };
  
  onMounted(() => {
    // Crear estrellas aleatorias para cada capa
    createRandomStars(starsLayer1.value, 150, { min: 1, max: 2.5 }, { min: 0.3, max: 1 });
    createRandomStars(starsLayer2.value, 200, { min: 0.5, max: 1.5 }, { min: 0.2, max: 0.8 });
    createRandomStars(starsLayer3.value, 250, { min: 0.5, max: 1 }, { min: 0.1, max: 0.6 });
    
    // Clonar estrellas para el efecto de desplazamiento infinito
    cloneStars(starsLayer1.value, starsLayer1Clone.value);
    cloneStars(starsLayer2.value, starsLayer2Clone.value);
    cloneStars(starsLayer3.value, starsLayer3Clone.value);
  
    const handleScroll = () => {
      if (!containerRef.value || !planetsRef.value) return;
  
      // Parallax effect for stars
      const scrollY = window.scrollY;
      const stars = containerRef.value.querySelectorAll('.star-layer');
      stars.forEach((star, index) => {
        const speed = 0.2 + index * 0.1;
        const yPos = scrollY * speed;
        star.style.transform = `translateY(-${yPos}px)`;
      });
  
      // Planets movement
      const planets = planetsRef.value.querySelectorAll('.planet');
      planets.forEach((planet, index) => {
        const planetSpeed = 0.05 + index * 0.03;
        const xPos = scrollY * planetSpeed;
        const rotation = scrollY * 0.01 * (index % 2 === 0 ? 1 : -1);
        planet.style.transform = `translateX(${xPos}px) rotate(${rotation}deg)`;
      });
    };
  
    // Use requestAnimationFrame for smoother scrolling
    const onScroll = () => {
      if (animationFrameRef) {
        cancelAnimationFrame(animationFrameRef);
      }
  
      animationFrameRef = requestAnimationFrame(handleScroll);
    };
  
    window.addEventListener('scroll', onScroll, { passive: true });
  
    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll);
      if (animationFrameRef) {
        cancelAnimationFrame(animationFrameRef);
      }
    });
  });
  </script>
  
  <style scoped>
  .stars-container, .stars-container-clone {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .stars-container-clone {
    top: -100%;
  }
  
  .star-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 200%;
    animation: stars-scroll 100s linear infinite;
  }
  
  .star {
    position: absolute;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
  }
  
  /* Efecto de parpadeo para algunas estrellas */
  .twinkling {
    animation: twinkle 4s ease-in-out infinite;
  }
  
  @keyframes twinkle {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.3;
      transform: scale(0.8);
    }
  }
  
  @keyframes stars-scroll {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }
  
  /* Ajustar velocidades para cada capa */
  .star-layer:nth-child(1) {
    animation-duration: 100s;
  }
  
  .star-layer:nth-child(2) {
    animation-duration: 150s;
  }
  
  .star-layer:nth-child(3) {
    animation-duration: 200s;
  }
  
  /* Shooting stars */
  .shooting-stars {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(-45deg);
    opacity: 0.5;
  }
  
  .shooting-stars::before,
  .shooting-stars::after {
    content: "";
    position: absolute;
    width: 100px;
    height: 2px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    border-radius: 999px;
  }
  
  .shooting-stars::before {
    top: 20%;
    left: 10%;
    animation: shooting-star 4s linear infinite;
    animation-delay: 1s;
  }
  
  .shooting-stars::after {
    top: 60%;
    left: 40%;
    animation: shooting-star 5s linear infinite;
    animation-delay: 3s;
  }
  
  @keyframes shooting-star {
    0% {
      transform: translateX(0) translateY(0);
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      transform: translateX(500px) translateY(500px);
      opacity: 0;
    }
  }
  
  /* Animaciones para planetas y astronautas */
  @keyframes float-slow {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(5px, 10px) rotate(1deg);
    }
    50% {
      transform: translate(0, 20px) rotate(0deg);
    }
    75% {
      transform: translate(-5px, 10px) rotate(-1deg);
    }
  }
  
  @keyframes float-medium {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(10px, 15px) rotate(2deg);
    }
    66% {
      transform: translate(-10px, 15px) rotate(-2deg);
    }
  }
  
  @keyframes float-fast {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
    50% {
      transform: translate(15px, -15px) rotate(3deg);
    }
  }
  
  @keyframes float-astronaut {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(30px, -20px) rotate(10deg);
    }
    50% {
      transform: translate(60px, 0) rotate(0deg);
    }
    75% {
      transform: translate(30px, 20px) rotate(-10deg);
    }
  }
  
  @keyframes comet {
    0% {
      top: -50px;
      left: 10%;
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      top: 120%;
      left: 70%;
      opacity: 0;
    }
  }
  
  .animate-float-slow {
    animation: float-slow 20s ease-in-out infinite;
  }
  
  .animate-float-medium {
    animation: float-medium 15s ease-in-out infinite;
  }
  
  .animate-float-fast {
    animation: float-fast 10s ease-in-out infinite;
  }
  
  .animate-float-astronaut {
    animation: float-astronaut 30s ease-in-out infinite;
  }
  
  .animate-comet {
    animation: comet 15s ease-out infinite;
    animation-delay: 5s;
  }
  </style>