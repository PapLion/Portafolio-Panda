<template>
  <section
    id="projects"
    class="py-12 sm:py-16 md:py-20 border-b border-white/20 bg-black"
    aria-labelledby="case-studies-title"
  >
    <div class="container mx-auto px-4">
      <h2
        id="case-studies-title"
        class="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center section-title"
      >
        {{ t('case_studies.title') }}
      </h2>

      <div ref="containerRef" class="case-study-container opacity-0 border-2 border-white">
        <!-- Slide wrapper -->
        <div
          class="case-study-slide"
          :style="{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning
              ? `translateX(${direction === 'next' ? '-16px' : '16px'})`
              : 'translateX(0)',
          }"
        >
          <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0">
            <!-- LEFT: Identity panel -->
            <div class="case-study-identity p-6 sm:p-8 flex flex-col justify-between border-r border-white/20">
              <div>
                <!-- Category badge -->
                <span class="category-badge">
                  {{ caseStudies[current].category }}
                </span>

                <!-- Title -->
                <h3 class="case-title mt-4">
                  {{ caseStudies[current].title }}
                </h3>

                <!-- Role / Context -->
                <p class="case-role mt-3">
                  {{ caseStudies[current].role }}
                </p>
              </div>

              <!-- Tech stack tags -->
              <div class="mt-6">
                <p class="tech-label mb-2">{{ t('case_studies.stack') }}</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in caseStudies[current].stack"
                    :key="tag"
                    class="tech-tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- RIGHT: Description panel -->
            <div class="case-study-content p-6 sm:p-8 flex flex-col justify-between">
              <!-- Challenge / what was built -->
              <div>
                <p class="content-label mb-3">{{ t('case_studies.overview') }}</p>
                <p class="case-description">
                  {{ caseStudies[current].description }}
                </p>

                <!-- Key highlights -->
                <div v-if="caseStudies[current].highlights?.length" class="mt-6">
                  <p class="content-label mb-3">{{ t('case_studies.highlights') }}</p>
                  <ul class="highlights-list">
                    <li
                      v-for="(h, i) in caseStudies[current].highlights"
                      :key="i"
                      class="highlight-item"
                    >
                      <span class="highlight-dot" aria-hidden="true"></span>
                      {{ h }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Controls -->
              <div class="case-controls mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <!-- Dot indicators -->
                <div
                  class="case-indicators"
                  role="tablist"
                  :aria-label="t('case_studies.nav')"
                >
                  <button
                    v-for="(cs, index) in caseStudies"
                    :key="index"
                    @click="changeTo(index)"
                    :class="['case-dot', { active: current === index }]"
                    :aria-label="`${t('case_studies.goto')} ${index + 1}: ${cs.title}`"
                    :aria-selected="current === index"
                    role="tab"
                    :disabled="isTransitioning"
                  ></button>
                </div>

                <!-- Prev / Next -->
                <div class="flex gap-2">
                  <button
                    @click="prev"
                    :disabled="isTransitioning"
                    class="nav-btn"
                    :aria-label="t('case_studies.prev')"
                  >
                    <ChevronLeft class="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  </button>
                  <button
                    @click="next"
                    :disabled="isTransitioning"
                    class="nav-btn"
                    :aria-label="t('case_studies.next')"
                  >
                    <ChevronRight class="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  </button>
                </div>

                <!-- Counter -->
                <p class="case-counter" aria-live="polite">
                  {{ current + 1 }} / {{ caseStudies.length }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const language = inject('language', { t: (key) => key });
const { t } = language;

// ─── Case Studies Data ────────────────────────────────────────────────────────

const caseStudies = [
  {
    id: 1,
    category: 'AI / Machine Learning',
    title: 'Neo Project — Base LLM',
    role: 'Sole Architect & Researcher · Private / NDA',
    description:
      'Designed and trained a Large Language Model entirely from scratch in PyTorch, making deliberate architectural decisions at every layer — from a custom byte-pair tokenizer (NEtokenizer) to a multi-head attention Transformer (NeoTransformer). Trained on Google Cloud infrastructure. This functions as a private base model from which three to five specialized sub-models will be derived. Currently concluding pre-training; Supervised Fine-Tuning (SFT) is the next milestone.',
    highlights: [
      'Custom tokenizer engineered for vocabulary efficiency and domain coverage',
      'Full Transformer architecture implemented in PyTorch without reliance on Hugging Face training loops',
      'Cloud-scale training pipeline orchestrated on Google Cloud Console',
      'Modular design allows forking into domain-specific sub-models (e.g., AssistenAI)',
    ],
    stack: ['Python', 'PyTorch', 'Google Cloud', 'CUDA', 'NLP'],
  },
  {
    id: 2,
    category: 'Data Engineering / AI',
    title: 'ScraperAI — Intelligent Data Extraction Platform',
    role: 'Lead Engineer · Representative of Multiple Scraping Systems',
    description:
      'Built a portfolio of web scraping pipelines that go beyond raw extraction: each system integrates an AI layer (powered by DeepSeek LLM) to clean, structure, and surface actionable insights from scraped data. The architecture follows a strict ETL pattern — extract via Parsel/Playwright, transform with LLM post-processing, load to a relational store. FastAPI backends were deployed on Railway for reliable production uptime.',
    highlights: [
      'AI-assisted data normalization to eliminate inconsistent formats across sources',
      'Rate-limit–aware crawlers with exponential back-off and proxy rotation',
      'FastAPI microservice architecture enabling horizontal scaling per scraping target',
      'Deliverables shipped for multiple clients under separate NDA agreements',
    ],
    stack: ['Python', 'FastAPI', 'Parsel', 'Playwright', 'DeepSeek LLM', 'Railway', 'PostgreSQL'],
  },
  {
    id: 3,
    category: 'AI / Fullstack',
    title: 'AssistenAI — Deal-Hunting Virtual Assistant',
    role: 'Fullstack Developer · Research Experiment built on Neo Project',
    description:
      'Explored a concrete use case for the Neo Project base model: a virtual shopping assistant capable of analyzing product listings in real time and surfacing optimal deals. The experiment validated the base model\'s instruction-following capacity before SFT, while simultaneously stress-testing a full authentication and real-time communication stack.',
    highlights: [
      'Integrated JWT + HTTP-only cookie auth with WebSocket-based chat interface',
      'LLM inference wrapped in a FastAPI service with async request queuing',
      'MySQL persistence layer for conversation history and user preferences',
      'Dual deployment target: Railway (backend) + Vercel (frontend) for zero-cold-start latency',
    ],
    stack: ['Python', 'FastAPI', 'Neo LLM', 'WebSockets', 'JWT', 'MySQL', 'Railway', 'Vercel'],
  },
  {
    id: 4,
    category: 'Desktop / Healthcare',
    title: 'Centro Médico Arévalo — Telemedicine & Clinic Management',
    role: 'Sole Developer & Architect · Certification Project → Mid-Senior Level',
    description:
      'Sole-authored, fully offline-capable desktop application that consolidated the entire patient lifecycle of a private medical clinic into a single system. Conceptualized and implemented the complete software architecture without external guidance. The project became the milestone that elevated my seniority classification to Mid-Senior Developer.',
    highlights: [
      'Patient management: registration, medical history, prescription tracking, and follow-up scheduling',
      'Integrated real-time chat between doctors and patients within the desktop environment',
      'Telemedicine module powered by WebRTC for video consultations — no third-party service dependency',
      'Medication adherence tracker with reminder logic and dosage history',
      'Offline-first architecture: SQLite embedded storage with zero cloud dependency',
    ],
    stack: ['Electron', 'Vue.js', 'SQLite', 'WebRTC', 'Node.js', 'TailwindCSS'],
  },
  {
    id: 5,
    category: 'Desktop / Productivity',
    title: 'Habit Flows — Privacy-First Life Tracking System',
    role: 'Sole Developer · Local-Only Architecture',
    description:
      'Designed a personal productivity system with a hard constraint: no network calls, no cloud sync, no telemetry. Habit Flows operates as a local-first Electron application that serves as an all-in-one tracker for nutrition, social interactions, and personal CRM. The interface is modular and highly configurable — users compose their own dashboard by dragging and dropping widget panels, enabling a deeply personalized tracking experience.',
    highlights: [
      'Drag-and-drop dashboard built with dnd-kit; layout state persisted locally to SQLite',
      'Social CRM module: track relationships, interactions, and personal notes per contact',
      'Nutrition tracker with custom food entries and historical trend visualization',
      'All data remains on-device — zero external API calls by design',
    ],
    stack: ['Electron', 'React', 'dnd-kit', 'SQLite', 'TypeScript', 'TailwindCSS'],
  },
  {
    id: 6,
    category: 'Blockchain / Mobile',
    title: 'Web3 Crypto Wallets — Pucket & PNK',
    role: 'Frontend Architect & Web3 Integration Lead',
    description:
      'Led the frontend architecture and initial smart contract integration for two production crypto wallet mobile applications. Responsibilities spanned UI component system design, wallet connection flows, and the critical bridge between React Native and on-chain state via Web3 providers. Established the EVM transaction signing pattern that the rest of the team extended.',
    highlights: [
      'Architected the component hierarchy and navigation system for both wallet applications',
      'Implemented Wallet Connect + MetaMask SDK integration for multi-wallet support',
      'Built the initial smart contract event listener layer with ethers.js',
      'Designed secure transaction confirmation UX to minimize user error on irreversible operations',
    ],
    stack: ['React Native', 'ethers.js', 'WalletConnect', 'Solidity (ABI)', 'TypeScript', 'Web3'],
  },
  {
    id: 7,
    category: 'Fullstack / E-commerce',
    title: 'E-commerce Ecosystems — Multi-Platform Suite',
    role: 'Fullstack Developer · 4+ Platforms including HomeStyle',
    description:
      'Delivered end-to-end development across four-plus distinct e-commerce platforms, each with unique business logic around product catalogs, pricing rules, and fulfilment workflows. HomeStyle — a furniture and home appliances marketplace — served as the flagship engagement, requiring a high-performance product exploration experience with server-side filtering and real-time inventory awareness.',
    highlights: [
      'Next.js SSR + ISR for catalog pages: sub-second TTFB on large product sets',
      'FastAPI backend with async product ingestion pipeline handling thousands of SKUs',
      'Multi-tenant architecture: single codebase serving isolated storefronts per client',
      'Checkout flow optimized for conversion: persistent cart, guest checkout, abandoned cart recovery',
    ],
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'Python', 'SQLite', 'TailwindCSS', 'Stripe'],
  },
  {
    id: 8,
    category: 'EdTech / AI',
    title: 'AI Academy — Adaptive Learning Platform',
    role: 'Fullstack Developer · EdTech',
    description:
      'Designed and built a web-based learning environment purpose-built for students navigating AI and technical curricula. The platform removes the friction of passive content consumption by integrating active recall tools, AI-generated study paths, and a flexible course builder — all within a clean, low-distraction interface.',
    highlights: [
      'AI-generated flashcard sets from uploaded course material using LLM summarization',
      'Dynamic study path creation: AI maps prerequisite chains and recommends sequencing',
      'Manual course builder: instructors compose structured modules with rich text, quizzes, and code blocks',
      'Progress analytics dashboard with spaced-repetition scheduling for review sessions',
    ],
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'Python', 'TailwindCSS', 'LLM API'],
  },
  {
    id: 9,
    category: 'Event Tech / EdTech',
    title: 'SoftCo Live — Course Delivery Platform for Limited-Time Events',
    role: 'Frontend Developer · 3-Person Team',
    description:
      'Built a purpose-specific learning platform for a software company that delivered its curriculum through high-energy, time-limited live events — similar in format to community-driven launch events (think OurDev or MiduDev, but for an enterprise software company). Our team of three designed and engineered the full platform from scratch in a compressed timeline, enabling the company to host, stream, and manage live course sessions with real-time attendee interaction.',
    highlights: [
      'Live session streaming with real-time Q&A and moderation tooling',
      'Instructor dashboard for content scheduling and attendee management',
      'Gated access control: purchase → enrollment → time-locked content delivery',
      'Built under aggressive delivery constraints with no prior codebase to reference',
    ],
    stack: ['React', 'Node.js', 'WebSockets', 'PostgreSQL', 'TailwindCSS', 'TypeScript'],
  },
  {
    id: 10,
    category: 'Community / DevTools',
    title: 'A1-DevHub Bot — Multi-Purpose Discord Bot',
    role: 'Team Developer · 3-Person Indie Study Group',
    description:
      'Co-developed a feature-rich Discord bot for a developer community, inspired by the personality and interaction model of companion bots (à la Nekonita). Built collaboratively under an indie-study dynamic — each team member owned a feature domain while maintaining a shared codebase through structured code review and async coordination.',
    highlights: [
      'Modular command handler architecture enabling isolated feature development per team member',
      'Custom embed builder for rich developer-friendly responses and documentation lookups',
      'Async event queue for high-concurrency server interactions without rate-limit violations',
    ],
    stack: ['Node.js', 'Discord.js', 'TypeScript', 'SQLite'],
  },
  {
    id: 11,
    category: 'Consulting / Architecture',
    title: 'Technical Consulting & Architecture Advisory',
    role: 'Independent Consultant · Multiple Clients',
    description:
      'Provided senior-level technical consulting to independent developers and small businesses facing deep architectural debt, critical production bugs, and greenfield web presence needs. Engagements ranged from emergency debugging sessions to full system redesigns, with deliverables that went beyond code — including architectural decision records, refactoring roadmaps, and landing pages built to convert.',
    highlights: [
      'Root-cause analysis and hotfix delivery for race conditions, memory leaks, and broken API contracts',
      'Refactored legacy React and Vue applications to follow maintainable component patterns',
      'Landing page production for indie businesses: from design system to deployed product',
      'Architecture consultations resulting in documented ADRs and migration plans',
    ],
    stack: ['Vue.js', 'React', 'Node.js', 'Python', 'Various Client Stacks'],
  },
];

// ─── Carousel Logic ───────────────────────────────────────────────────────────

const current = ref(0);
const isTransitioning = ref(false);
const direction = ref('next');
const containerRef = ref(null);
let observer = null;

const TRANSITION_MS = 280;

const next = () => {
  if (isTransitioning.value) return;
  direction.value = 'next';
  isTransitioning.value = true;
  setTimeout(() => {
    current.value = current.value === caseStudies.length - 1 ? 0 : current.value + 1;
    isTransitioning.value = false;
  }, TRANSITION_MS);
};

const prev = () => {
  if (isTransitioning.value) return;
  direction.value = 'prev';
  isTransitioning.value = true;
  setTimeout(() => {
    current.value = current.value === 0 ? caseStudies.length - 1 : current.value - 1;
    isTransitioning.value = false;
  }, TRANSITION_MS);
};

const changeTo = (index) => {
  if (isTransitioning.value || current.value === index) return;
  direction.value = index > current.value ? 'next' : 'prev';
  isTransitioning.value = true;
  setTimeout(() => {
    current.value = index;
    isTransitioning.value = false;
  }, TRANSITION_MS);
};

// ─── Intersection Observer (fade-in on scroll) ────────────────────────────────

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        containerRef.value?.classList.add('fade-in');
        observer.unobserve(entries[0].target);
      }
    },
    { threshold: 0.15 }
  );
  if (containerRef.value) observer.observe(containerRef.value);
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<style scoped>
/* ── Slide transition ─────────────────────────────────── */
.case-study-slide {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

/* ── Container fade-in (driven by IntersectionObserver) ─ */
.case-study-container {
  transition: opacity 0.6s ease;
}
.case-study-container.fade-in {
  opacity: 1 !important;
}

/* ── Left identity panel ─────────────────────────────── */
.case-study-identity {
  background: rgba(255, 255, 255, 0.02);
  min-height: 480px;
}

/* ── Category badge ──────────────────────────────────── */
.category-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #000;
  background: #fff;
  padding: 0.25rem 0.6rem;
}

/* ── Title ───────────────────────────────────────────── */
.case-title {
  font-size: clamp(1.15rem, 2.5vw, 1.6rem);
  font-weight: 700;
  line-height: 1.25;
  color: #fff;
}

/* ── Role / context ──────────────────────────────────── */
.case-role {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.02em;
}

/* ── Stack section label ─────────────────────────────── */
.tech-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
}

/* ── Stack tags ──────────────────────────────────────── */
.tech-tag {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.04em;
  transition: background 0.2s, color 0.2s;
}
.tech-tag:hover {
  background: #fff;
  color: #000;
}

/* ── Right content panel ─────────────────────────────── */
.case-study-content {
  background: #000;
}

/* ── Section labels (Overview / Highlights) ──────────── */
.content-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
}

/* ── Description ─────────────────────────────────────── */
.case-description {
  font-size: clamp(0.82rem, 1.2vw, 0.92rem);
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.75);
}

/* ── Highlight list ──────────────────────────────────── */
.highlights-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
}
.highlight-dot {
  flex-shrink: 0;
  margin-top: 0.45rem;
  width: 4px;
  height: 4px;
  background: #fff;
}

/* ── Navigation buttons ──────────────────────────────── */
.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.nav-btn:hover:not(:disabled) {
  background: #fff;
  color: #000;
}
.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ── Dot indicators ──────────────────────────────────── */
.case-indicators {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.case-dot {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  cursor: pointer;
  transition: background 0.25s, transform 0.25s;
  padding: 0;
}
.case-dot.active {
  background: #fff;
  transform: scale(1.4);
}
.case-dot:disabled {
  cursor: not-allowed;
}

/* ── Counter ─────────────────────────────────────────── */
.case-counter {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.35);
  font-variant-numeric: tabular-nums;
}
</style>
