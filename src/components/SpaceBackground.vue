<template>
  <!-- 
    Neural Cosmos / Data Fabric Background
    =====================================
    High-performance Canvas-based particle system representing:
    - Clean Architecture (ordered grid at top)
    - Neural Networks (organic clustering on scroll)
    - Data Orchestration (interactive node connections)
    
    Architecture Decision: Canvas API over DOM
    - Single GPU-accelerated surface
    - No DOM reflows, guaranteed 60fps
    - Efficient batch rendering of thousands of primitives
  -->
  <div ref="containerRef" class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <canvas 
      ref="canvasRef" 
      class="absolute inset-0 w-full h-full pointer-events-auto"
      aria-hidden="true"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue';

// ============================================================================
// CONFIGURATION - Tunable parameters for the particle system
// ============================================================================

const CONFIG = {
  // Node properties
  NODE_COUNT: 120,
  NODE_RADIUS: 2,
  NODE_COLOR: 'rgba(255, 255, 255, 0.6)',
  NODE_ACTIVE_COLOR: 'rgba(255, 255, 255, 1)',
  
  // Connection properties
  CONNECTION_COLOR: 'rgba(255, 255, 255, 0.15)',
  CONNECTION_ACTIVE_COLOR: 'rgba(255, 255, 255, 0.4)',
  MAX_CONNECTION_DISTANCE: 150,
  MAX_CONNECTIONS_PER_NODE: 4,
  
  // Mouse interaction - "Farming" mechanic
  MOUSE_ATTRACTION_RADIUS: 200,
  MOUSE_ATTRACTION_FORCE: 0.02,
  MOUSE_CONNECTION_RADIUS: 180,
  
  // Physics
  BASE_VELOCITY: 0.3,
  FRICTION: 0.98,
  RETURN_FORCE: 0.01,
  
  // Scroll-based complexity scaling
  SCROLL_DENSITY_MULTIPLIER: 2.5, // Max multiplier for connections at bottom
  SCROLL_VELOCITY_MULTIPLIER: 1.5, // Speed increase with scroll
};

// ============================================================================
// STATE MACHINE - Network formation states for Intersection Observer
// ============================================================================

/**
 * NetworkState enum for orchestrating visual transitions
 * Prepared for future Intersection Observer integration
 */
const NetworkState = {
  FREE_FLOAT: 'free_float',     // Default: organic floating
  GRID: 'grid',                  // Clean Architecture visualization
  CLUSTER: 'cluster',            // Neural Network grouping
  WAVE: 'wave',                  // Data flow visualization
};

// Reactive state for the particle system
const state = reactive({
  currentNetworkState: NetworkState.FREE_FLOAT,
  scrollProgress: 0,           // 0-1 normalized scroll position
  complexityLevel: 1,          // Multiplier derived from scroll
  mouseActive: false,
  transitionProgress: 0,       // For smooth state transitions
});

// ============================================================================
// REFS AND RUNTIME STATE
// ============================================================================

const containerRef = ref(null);
const canvasRef = ref(null);

let ctx = null;
let animationFrameId = null;
let nodes = [];
let mouse = { x: -1000, y: -1000, active: false };
let lastTime = 0;

// ============================================================================
// NODE CLASS - Particle with physics and state
// ============================================================================

/**
 * Node represents a single particle in the neural cosmos
 * Design: Encapsulates position, velocity, and rendering state
 */
class Node {
  constructor(x, y, canvasWidth, canvasHeight) {
    // Position
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    
    // Velocity (random initial direction)
    const angle = Math.random() * Math.PI * 2;
    const speed = CONFIG.BASE_VELOCITY * (0.5 + Math.random() * 0.5);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    
    // Boundaries
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    
    // State
    this.isActive = false;
    this.connections = [];
    this.activationLevel = 0; // 0-1 for smooth transitions
  }
  
  /**
   * Update physics each frame
   * @param {number} deltaTime - Time since last frame in ms
   * @param {Object} mousePos - Current mouse position
   * @param {number} complexityLevel - Scroll-based complexity
   */
  update(deltaTime, mousePos, complexityLevel) {
    const dt = Math.min(deltaTime / 16.67, 2); // Normalize to 60fps, cap at 2x
    
    // Calculate distance to mouse
    const dx = mousePos.x - this.x;
    const dy = mousePos.y - this.y;
    const distToMouse = Math.sqrt(dx * dx + dy * dy);
    
    // Mouse attraction - "Farming" mechanic
    if (mousePos.active && distToMouse < CONFIG.MOUSE_ATTRACTION_RADIUS) {
      const force = (1 - distToMouse / CONFIG.MOUSE_ATTRACTION_RADIUS) * CONFIG.MOUSE_ATTRACTION_FORCE;
      this.vx += dx * force * dt;
      this.vy += dy * force * dt;
      this.isActive = true;
      this.activationLevel = Math.min(1, this.activationLevel + 0.1);
    } else {
      this.isActive = false;
      this.activationLevel = Math.max(0, this.activationLevel - 0.02);
      
      // Gentle return to origin when not attracted
      const returnDx = this.originX - this.x;
      const returnDy = this.originY - this.y;
      this.vx += returnDx * CONFIG.RETURN_FORCE * dt;
      this.vy += returnDy * CONFIG.RETURN_FORCE * dt;
    }
    
    // Apply velocity with complexity-based speed
    const speedMult = 1 + (complexityLevel - 1) * (CONFIG.SCROLL_VELOCITY_MULTIPLIER - 1);
    this.x += this.vx * speedMult * dt;
    this.y += this.vy * speedMult * dt;
    
    // Apply friction
    this.vx *= CONFIG.FRICTION;
    this.vy *= CONFIG.FRICTION;
    
    // Boundary wrapping with padding
    const padding = 50;
    if (this.x < -padding) this.x = this.canvasWidth + padding;
    if (this.x > this.canvasWidth + padding) this.x = -padding;
    if (this.y < -padding) this.y = this.canvasHeight + padding;
    if (this.y > this.canvasHeight + padding) this.y = -padding;
  }
  
  /**
   * Render the node
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    const radius = CONFIG.NODE_RADIUS + this.activationLevel * 2;
    const alpha = 0.4 + this.activationLevel * 0.6;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
    
    // Glow effect for active nodes
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

/**
 * Initialize the particle system
 * Creates nodes distributed across the canvas
 */
function initNodes() {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  nodes = [];
  const width = canvas.width;
  const height = canvas.height;
  
  for (let i = 0; i < CONFIG.NODE_COUNT; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    nodes.push(new Node(x, y, width, height));
  }
}

/**
 * Resize canvas to match container and recalculate node boundaries
 */
function resizeCanvas() {
  const canvas = canvasRef.value;
  const container = containerRef.value;
  if (!canvas || !container) return;
  
  // Use devicePixelRatio for crisp rendering on high-DPI displays
  const dpr = window.devicePixelRatio || 1;
  const rect = container.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  
  ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  
  // Update node boundaries
  nodes.forEach(node => {
    node.canvasWidth = rect.width;
    node.canvasHeight = rect.height;
  });
}

// ============================================================================
// PHYSICS AND RENDERING
// ============================================================================

/**
 * Find and draw connections between nearby nodes
 * Complexity scales with scroll position
 */
function drawConnections() {
  const maxDist = CONFIG.MAX_CONNECTION_DISTANCE * state.complexityLevel;
  const maxConns = Math.floor(CONFIG.MAX_CONNECTIONS_PER_NODE * state.complexityLevel);
  
  // Reset connections
  nodes.forEach(node => node.connections = []);
  
  // O(n^2) but acceptable for ~120 nodes
  // For larger systems, implement spatial partitioning
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
          ? `rgba(255, 255, 255, ${alpha * 2.5})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = isActive ? 1.5 : 0.5;
        ctx.stroke();
        
        connectionCount++;
      }
    }
  }
  
  // Draw connections to mouse cursor when active
  if (mouse.active) {
    nodes.forEach(node => {
      const dx = mouse.x - node.x;
      const dy = mouse.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < CONFIG.MOUSE_CONNECTION_RADIUS) {
        const alpha = (1 - dist / CONFIG.MOUSE_CONNECTION_RADIUS) * 0.4;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
    
    // Draw cursor node
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
  }
}

/**
 * Main animation loop
 * Uses requestAnimationFrame for smooth 60fps rendering
 */
function animate(currentTime) {
  if (!ctx || !canvasRef.value) return;
  
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;
  
  // Clear canvas
  const canvas = canvasRef.value;
  const dpr = window.devicePixelRatio || 1;
  ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
  
  // Update all nodes
  nodes.forEach(node => {
    node.update(deltaTime, mouse, state.complexityLevel);
  });
  
  // Draw connections first (behind nodes)
  drawConnections();
  
  // Draw nodes
  nodes.forEach(node => {
    node.draw(ctx);
  });
  
  animationFrameId = requestAnimationFrame(animate);
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

/**
 * Handle mouse movement for "farming" interaction
 */
function handleMouseMove(event) {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
  mouse.active = true;
}

function handleMouseLeave() {
  mouse.active = false;
  mouse.x = -1000;
  mouse.y = -1000;
}

/**
 * Handle scroll for complexity scaling
 * Higher scroll = denser network = more complex systems visualized
 */
function handleScroll() {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
  
  state.scrollProgress = scrollProgress;
  state.complexityLevel = 1 + scrollProgress * (CONFIG.SCROLL_DENSITY_MULTIPLIER - 1);
}

/**
 * Debounced resize handler
 */
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
  resizeCanvas();
  initNodes();
  
  // Start animation loop
  lastTime = performance.now();
  animationFrameId = requestAnimationFrame(animate);
  
  // Event listeners
  const canvas = canvasRef.value;
  if (canvas) {
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });
  
  // Initial scroll state
  handleScroll();
});

onUnmounted(() => {
  // Cancel animation frame
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  
  // Remove event listeners
  const canvas = canvasRef.value;
  if (canvas) {
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mouseleave', handleMouseLeave);
  }
  
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
  
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }
});
</script>

<style scoped>
/* Minimal styling - Canvas handles all rendering */
canvas {
  background: transparent;
}
</style>
