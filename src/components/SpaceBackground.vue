<template>
  <!--
    Neural Cosmos / Data Fabric Background
    =====================================
    Canvas particle field with inertial, viscous interaction.
    Mouse and touch gestures inject momentum into nearby nodes instead
    of attracting particles toward the current pointer position.
  -->
  <div ref="containerRef" class="neural-cosmos-container">
    <canvas
      ref="canvasRef"
      class="neural-cosmos-canvas"
      aria-hidden="true"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue';

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  NODE_COUNT: 120,
  NODE_RADIUS: 2,
  MAX_CONNECTION_DISTANCE: 150,
  MAX_CONNECTIONS_PER_NODE: 4,

  // Input behaves like a hand moving through a viscous field.
  MOUSE_INTERACTION_RADIUS: 235,
  MOUSE_IMPULSE_FORCE: 0.085,
  MOUSE_VELOCITY_DECAY: 0.82,
  MAX_INPUT_DELTA: 42,

  BASE_VELOCITY: 0.24,
  VISCOSITY: 0.93,
  RETURN_FORCE: 0.0018,
  SCROLL_DENSITY_MULTIPLIER: 2.5,
  SCROLL_VELOCITY_MULTIPLIER: 1.35,
};

const NetworkState = {
  FREE_FLOAT: 'free_float',
  GRID: 'grid',
  CLUSTER: 'cluster',
  WAVE: 'wave',
};

const state = reactive({
  currentNetworkState: NetworkState.FREE_FLOAT,
  scrollProgress: 0,
  complexityLevel: 1,
  transitionProgress: 0,
});

// ============================================================================
// REFS AND RUNTIME STATE
// ============================================================================

const containerRef = ref(null);
const canvasRef = ref(null);

let ctx = null;
let animationFrameId = null;
let nodes = [];
let lastTime = 0;

// Shared interaction field for mouse and touch.
let mouse = {
  x: -1000,
  y: -1000,
  vx: 0,
  vy: 0,
  active: false,
  hasLastPosition: false,
};

// ============================================================================
// NODE PHYSICS
// ============================================================================

class Node {
  constructor(x, y, canvasWidth, canvasHeight) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;

    const angle = Math.random() * Math.PI * 2;
    const speed = CONFIG.BASE_VELOCITY * (0.5 + Math.random() * 0.5);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.isActive = false;
    this.connections = [];
    this.activationLevel = 0;
  }

  update(deltaTime, mousePos, complexityLevel) {
    const dt = Math.min(deltaTime / 16.67, 2);
    const interactSq = CONFIG.MOUSE_INTERACTION_RADIUS * CONFIG.MOUSE_INTERACTION_RADIUS;

    let distSq = Infinity;
    if (mousePos.active) {
      const dx = mousePos.x - this.x;
      const dy = mousePos.y - this.y;
      distSq = dx * dx + dy * dy;
    }

    if (mousePos.active && distSq < interactSq) {
      const distance = Math.sqrt(distSq);
      const falloff = 1 - distance / CONFIG.MOUSE_INTERACTION_RADIUS;
      const impulse = falloff * CONFIG.MOUSE_IMPULSE_FORCE * dt;

      // Transfer gesture momentum to nearby particles.
      this.vx += mousePos.vx * impulse;
      this.vy += mousePos.vy * impulse;

      const inputSpeed = Math.abs(mousePos.vx) + Math.abs(mousePos.vy);
      this.isActive = inputSpeed > 0.15;
      this.activationLevel = Math.min(1, this.activationLevel + falloff * 0.08);
    } else {
      this.isActive = false;
      this.activationLevel = Math.max(0, this.activationLevel - 0.018 * dt);
    }

    // Soft spring back to the original distribution. This is deliberately
    // weak so the field preserves inertia instead of snapping back.
    const returnDx = this.originX - this.x;
    const returnDy = this.originY - this.y;
    this.vx += returnDx * CONFIG.RETURN_FORCE * dt;
    this.vy += returnDy * CONFIG.RETURN_FORCE * dt;

    const speedMult = 1 + (complexityLevel - 1) * (CONFIG.SCROLL_VELOCITY_MULTIPLIER - 1);
    this.x += this.vx * speedMult * dt;
    this.y += this.vy * speedMult * dt;

    // Frame-rate-independent viscous damping.
    const damping = Math.pow(CONFIG.VISCOSITY, dt);
    this.vx *= damping;
    this.vy *= damping;

    const padding = 50;
    if (this.x < -padding) this.x = this.canvasWidth + padding;
    if (this.x > this.canvasWidth + padding) this.x = -padding;
    if (this.y < -padding) this.y = this.canvasHeight + padding;
    if (this.y > this.canvasHeight + padding) this.y = -padding;
  }

  draw(ctx) {
    const radius = CONFIG.NODE_RADIUS + this.activationLevel * 1.6;
    const alpha = 0.4 + this.activationLevel * 0.6;

    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();

    if (this.activationLevel > 0.1) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, radius + 4 * this.activationLevel, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.activationLevel * 0.1})`;
      ctx.fill();
    }
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function initNodes() {
  nodes = [];
  const width = window.innerWidth;
  const height = window.innerHeight;

  for (let i = 0; i < CONFIG.NODE_COUNT; i++) {
    nodes.push(new Node(Math.random() * width, Math.random() * height, width, height));
  }
}

function resizeCanvas() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  nodes.forEach((node) => {
    node.canvasWidth = width;
    node.canvasHeight = height;
  });
}

// ============================================================================
// PHYSICS AND RENDERING
// ============================================================================

function drawConnections() {
  const maxDist = CONFIG.MAX_CONNECTION_DISTANCE * state.complexityLevel;
  const maxConns = Math.floor(CONFIG.MAX_CONNECTIONS_PER_NODE * state.complexityLevel);

  nodes.forEach((node) => {
    node.connections = [];
  });

  for (let i = 0; i < nodes.length; i++) {
    let connectionCount = 0;

    for (let j = i + 1; j < nodes.length && connectionCount < maxConns; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.2;
        const isActive = nodes[i].isActive || nodes[j].isActive;

        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = isActive
          ? `rgba(255, 255, 255, ${alpha * 2.1})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = isActive ? 1.25 : 0.5;
        ctx.stroke();

        connectionCount++;
      }
    }
  }
}

function animate(currentTime) {
  if (!ctx || !canvasRef.value) return;

  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;
  const dt = Math.min(deltaTime / 16.67, 2);

  const canvas = canvasRef.value;
  const dpr = window.devicePixelRatio || 1;
  ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

  nodes.forEach((node) => {
    node.update(deltaTime, mouse, state.complexityLevel);
  });

  drawConnections();
  nodes.forEach((node) => node.draw(ctx));

  // The gesture itself also loses energy, preventing a pointer from becoming
  // a permanent force source when the user stops moving.
  const inputDamping = Math.pow(CONFIG.MOUSE_VELOCITY_DECAY, dt);
  mouse.vx *= inputDamping;
  mouse.vy *= inputDamping;

  if (Math.abs(mouse.vx) < 0.01) mouse.vx = 0;
  if (Math.abs(mouse.vy) < 0.01) mouse.vy = 0;

  animationFrameId = requestAnimationFrame(animate);
}

// ============================================================================
// INPUT HANDLERS - Mouse + mobile touch use the same momentum field
// ============================================================================

function updateInteractionPoint(x, y, resetVelocity = false) {
  if (resetVelocity || !mouse.hasLastPosition) {
    mouse.vx = 0;
    mouse.vy = 0;
  } else {
    let dx = x - mouse.x;
    let dy = y - mouse.y;
    const magnitude = Math.hypot(dx, dy);

    if (magnitude > CONFIG.MAX_INPUT_DELTA) {
      const scale = CONFIG.MAX_INPUT_DELTA / magnitude;
      dx *= scale;
      dy *= scale;
    }

    // Blend new movement with remaining input momentum for a thick-fluid feel.
    mouse.vx = mouse.vx * 0.3 + dx * 0.7;
    mouse.vy = mouse.vy * 0.3 + dy * 0.7;
  }

  mouse.x = x;
  mouse.y = y;
  mouse.active = true;
  mouse.hasLastPosition = true;
}

function deactivateInteraction() {
  mouse.active = false;
  mouse.hasLastPosition = false;
  mouse.vx = 0;
  mouse.vy = 0;
  mouse.x = -1000;
  mouse.y = -1000;
}

function handleMouseMove(event) {
  updateInteractionPoint(event.clientX, event.clientY);
}

function handleMouseLeave() {
  deactivateInteraction();
}

function handleTouchStart(event) {
  const touch = event.touches[0];
  if (!touch) return;
  updateInteractionPoint(touch.clientX, touch.clientY, true);
}

function handleTouchMove(event) {
  const touch = event.touches[0];
  if (!touch) return;
  updateInteractionPoint(touch.clientX, touch.clientY);
}

function handleTouchEnd(event) {
  if (event.touches.length > 0) {
    const touch = event.touches[0];
    updateInteractionPoint(touch.clientX, touch.clientY, true);
    return;
  }

  deactivateInteraction();
}

function handleScroll() {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

  state.scrollProgress = scrollProgress;
  state.complexityLevel = 1 + scrollProgress * (CONFIG.SCROLL_DENSITY_MULTIPLIER - 1);
}

let resizeTimeout = null;
function handleResize() {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    resizeCanvas();
    initNodes();
  }, 100);
}

// ============================================================================
// LIFECYCLE
// ============================================================================

onMounted(() => {
  requestAnimationFrame(() => {
    resizeCanvas();
    initNodes();
    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(animate);
  });

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  window.addEventListener('mouseout', handleMouseLeave, { passive: true });
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: true });
  window.addEventListener('touchend', handleTouchEnd, { passive: true });
  window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });

  handleScroll();
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseout', handleMouseLeave);
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchmove', handleTouchMove);
  window.removeEventListener('touchend', handleTouchEnd);
  window.removeEventListener('touchcancel', handleTouchEnd);
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);

  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }
});
</script>

<style scoped>
.neural-cosmos-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.neural-cosmos-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: transparent;
}
</style>
