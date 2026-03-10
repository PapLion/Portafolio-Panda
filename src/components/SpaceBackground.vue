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

    <!-- Planets - Only visible ones (removed off-screen planets for performance) -->
    <div ref="planetsRef" class="absolute inset-0">
      <!-- Planet 1 - Top right -->
      <div 
        v-for="planet in visiblePlanets" 
        :key="planet.id"
        class="planet absolute"
        :class="planet.animationClass"
        :style="planet.style"
      >
        <div :class="`w-full h-full rounded-full border-${planet.borderWidth} border-white relative overflow-hidden`">
          <div class="absolute inset-0 bg-black">
            <div 
              v-for="(crater, idx) in planet.craters" 
              :key="idx"
              class="absolute rounded-full border border-white"
              :style="crater"
            ></div>
          </div>
        </div>
        <!-- Rings for ringed planets -->
        <div 
          v-if="planet.hasRings" 
          class="absolute inset-0 rounded-full border-8 border-white opacity-20 scale-[1.2] rotate-12"
        ></div>
      </div>

      <!-- Comet -->
      <div class="absolute animate-comet">
        <div class="w-[3px] h-[3px] bg-white rounded-full relative">
          <div class="absolute top-0 right-0 w-[100px] h-[1px] bg-gradient-to-l from-transparent to-white"></div>
        </div>
      </div>

      <!-- Floating astronaut using the Astronaut component -->
      <div class="absolute top-[30%] left-[5%] animate-float-astronaut hidden md:block">
        <Astronaut />
      </div>
    </div>

    <!-- Subtle fog/nebula effect -->
    <div class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-40"></div>

    <!-- Animated shooting stars -->
    <div class="shooting-stars"></div>
    <div class="shooting-stars" style="animation-delay: 2s; top: 40%; left: 60%"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Astronaut from './Astronaut.vue';

const containerRef = ref(null);
const planetsRef = ref(null);
const starsLayer1 = ref(null);
const starsLayer1Clone = ref(null);
const starsLayer2 = ref(null);
const starsLayer2Clone = ref(null);
const starsLayer3 = ref(null);
const starsLayer3Clone = ref(null);

// Store animation frame for cleanup
let animationFrameRef = null;
let lastScrollY = 0;

// Planet configuration - only visible planets
const visiblePlanets = [
  {
    id: 1,
    style: { top: '20%', right: '-100px', width: '200px', height: '200px', opacity: 0.3 },
    animationClass: 'animate-float-slow',
    borderWidth: 2,
    craters: [
      { top: '10%', left: '20%', width: '30px', height: '30px', opacity: 0.6 },
      { top: '40%', left: '60%', width: '20px', height: '20px', opacity: 0.4 },
      { top: '70%', left: '30%', width: '15px', height: '15px', opacity: 0.5 },
    ],
    hasRings: false,
  },
  {
    id: 2,
    style: { top: '60%', left: '-150px', width: '300px', height: '300px', opacity: 0.2 },
    animationClass: 'animate-float-medium',
    borderWidth: 4,
    craters: [
      { top: '20%', left: '10%', width: '40px', height: '40px', opacity: 0.1, background: 'white' },
      { top: '50%', left: '70%', width: '60px', height: '60px', opacity: 0.1, background: 'white' },
    ],
    hasRings: true,
  },
];

// Create stars using DocumentFragment for better performance
const createRandomStars = (container, count, size, opacity) => {
  if (!container) return;
  
  const fragment = document.createDocumentFragment();
  const containerWidth = container.offsetWidth || window.innerWidth;
  const containerHeight = container.offsetHeight || window.innerHeight;
  
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    const x = Math.random() * containerWidth;
    const y = Math.random() * containerHeight;
    const scale = Math.random() * (size.max - size.min) + size.min;
    const starOpacity = Math.random() * (opacity.max - opacity.min) + opacity.min;
    
    star.className = 'star';
    star.style.cssText = `left:${x}px;top:${y}px;width:${scale}px;height:${scale}px;opacity:${starOpacity}`;
    
    // Add twinkling effect to some stars
    if (Math.random() > 0.7) {
      star.classList.add('twinkling');
      star.style.animationDelay = `${Math.random() * 5}s`;
    }
    
    fragment.appendChild(star);
  }
  
  container.innerHTML = '';
  container.appendChild(fragment);
};

// Clone stars using cloneNode for better performance (no innerHTML)
const cloneStars = (source, target) => {
  if (!source || !target) return;
  // Clear target using DOM API instead of innerHTML
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
  // Clone and append children
  const children = source.children;
  for (let i = 0; i < children.length; i++) {
    target.appendChild(children[i].cloneNode(true));
  }
};

const handleScroll = () => {
  if (!containerRef.value || !planetsRef.value) return;

  const scrollY = window.scrollY;
  
  // Skip if scroll hasn't changed significantly (threshold of 2px)
  if (Math.abs(scrollY - lastScrollY) < 2) return;
  lastScrollY = scrollY;

  // Parallax effect for stars - only update transform
  const stars = containerRef.value.querySelectorAll('.star-layer');
  stars.forEach((star, index) => {
    const speed = 0.2 + index * 0.1;
    star.style.transform = `translateY(-${scrollY * speed}px)`;
  });

  // Planets movement
  const planets = planetsRef.value.querySelectorAll('.planet');
  planets.forEach((planet, index) => {
    const planetSpeed = 0.05 + index * 0.03;
    const rotation = scrollY * 0.01 * (index % 2 === 0 ? 1 : -1);
    planet.style.transform = `translateX(${scrollY * planetSpeed}px) rotate(${rotation}deg)`;
  });
};

const onScroll = () => {
  if (animationFrameRef) {
    cancelAnimationFrame(animationFrameRef);
  }
  animationFrameRef = requestAnimationFrame(handleScroll);
};

onMounted(() => {
  // Create stars with reduced count for better performance
  createRandomStars(starsLayer1.value, 100, { min: 1, max: 2.5 }, { min: 0.3, max: 1 });
  createRandomStars(starsLayer2.value, 150, { min: 0.5, max: 1.5 }, { min: 0.2, max: 0.8 });
  createRandomStars(starsLayer3.value, 200, { min: 0.5, max: 1 }, { min: 0.1, max: 0.6 });
  
  // Clone stars for infinite scroll effect
  cloneStars(starsLayer1.value, starsLayer1Clone.value);
  cloneStars(starsLayer2.value, starsLayer2Clone.value);
  cloneStars(starsLayer3.value, starsLayer3Clone.value);

  window.addEventListener('scroll', onScroll, { passive: true });
});

// Proper cleanup at setup level
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  if (animationFrameRef) {
    cancelAnimationFrame(animationFrameRef);
  }
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

/* Twinkling effect */
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

/* Adjust speeds for each layer */
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

/* Float animations */
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

.animate-float-astronaut {
  animation: float-astronaut 30s ease-in-out infinite;
}

.animate-comet {
  animation: comet 15s ease-out infinite;
  animation-delay: 5s;
}
</style>
