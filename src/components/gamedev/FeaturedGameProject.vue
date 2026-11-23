<template>
  <article
    class="manga-panel border-2 border-white p-5 sm:p-7 md:p-8 bg-black/90"
    :aria-labelledby="`project-title-${project.id}`"
  >
    <!-- Header & Metadata -->
    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 pb-6 border-b border-white/20">
      <div class="max-w-3xl">
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <span class="bg-white text-black px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em]">
            {{ project.engine }}
          </span>
          <span class="border border-white/50 px-2.5 py-1 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/90">
            {{ project.language }}
          </span>
          <span class="border border-white/25 px-2.5 py-1 text-[10px] sm:text-xs uppercase tracking-[0.16em] text-white/65">
            {{ project.category[lang] }}
          </span>
          <span class="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/45">
            {{ project.status[lang] }}
          </span>
        </div>

        <h2
          :id="`project-title-${project.id}`"
          class="text-2xl sm:text-3xl md:text-4xl font-bold manga-text leading-tight"
        >
          {{ project.title[lang] }}
        </h2>
        <p class="mt-2 text-sm sm:text-base text-white/75 font-medium">
          {{ project.subtitle[lang] }}
        </p>
        <p class="mt-4 text-sm sm:text-base text-white/70 leading-relaxed">
          {{ project.description[lang] }}
        </p>
        <p class="mt-3 text-xs sm:text-sm text-white/45 leading-relaxed">
          {{ project.scopeNote[lang] }}
        </p>
      </div>

      <!-- Verification Summary -->
      <div class="flex flex-col gap-3 lg:w-72 shrink-0">
        <div class="border border-white/20 bg-white/[0.03] p-3">
          <p class="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-2">
            {{ labels.verification }}
          </p>
          <ul class="space-y-1.5">
            <li
              v-for="item in project.verification[lang]"
              :key="item"
              class="flex gap-2 text-xs text-white/75 leading-snug"
            >
              <span class="text-white shrink-0" aria-hidden="true">✓</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Primary Gameplay Showcase Video -->
    <div class="mt-7">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <p class="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-white/45">
            {{ labels.primaryShowcase }}
          </p>
          <h3 class="text-lg sm:text-xl font-bold mt-0.5">
            {{ project.mainDemo.title[lang] }}
          </h3>
        </div>
        <span class="border border-white/30 px-2 py-0.5 text-xs text-white/70">
          {{ project.mainDemo.duration }} · 720p60
        </span>
      </div>

      <div class="border border-white/35 bg-black overflow-hidden">
        <video
          :src="project.mainDemo.src"
          :poster="project.mainDemo.poster"
          controls
          playsinline
          muted
          preload="metadata"
          width="1280"
          height="720"
          class="w-full aspect-video block bg-black"
          :aria-label="project.mainDemo.title[lang]"
        >
          {{ labels.videoFallback }}
        </video>
      </div>
      <p class="mt-2.5 text-xs sm:text-sm text-white/60 leading-relaxed">
        {{ project.mainDemo.caption[lang] }}
      </p>
    </div>

    <!-- Tech Stack Tags -->
    <div class="mt-6 flex flex-wrap gap-2">
      <span
        v-for="tech in project.stack"
        :key="tech"
        class="border border-white/25 px-2.5 py-1 text-xs text-white/80"
      >
        {{ tech }}
      </span>
    </div>

    <!-- Implemented Systems Breakdown -->
    <div class="mt-8 pt-6 border-t border-white/15">
      <p class="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-white/45 mb-2">
        {{ labels.architectureEyebrow }}
      </p>
      <h3 class="text-xl sm:text-2xl font-bold mb-5">
        {{ labels.architectureTitle }}
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="sys in project.systems"
          :key="sys.title.en"
          class="border border-white/25 bg-white/[0.02] p-4 sm:p-5"
        >
          <h4 class="text-sm sm:text-base font-bold text-white">
            {{ sys.title[lang] }}
          </h4>
          <p class="mt-2 text-xs sm:text-sm text-white/65 leading-relaxed">
            {{ sys.detail[lang] }}
          </p>
        </div>
      </div>
    </div>

    <!-- Feature Clips Gallery / Theater -->
    <div v-if="project.clips?.length" class="mt-8 pt-6 border-t border-white/15">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
        <div>
          <p class="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-white/45">
            {{ labels.clipsEyebrow }}
          </p>
          <h3 class="text-xl sm:text-2xl font-bold mt-1">
            {{ labels.clipsTitle }}
          </h3>
        </div>

        <div class="flex flex-wrap gap-2" role="group" :aria-label="labels.filterClips">
          <button
            v-for="tab in clipGroups"
            :key="tab.id"
            type="button"
            @click="selectGroup(tab.id)"
            :class="[
              'px-3 py-1.5 text-xs border transition-colors cursor-pointer',
              selectedGroup === tab.id
                ? 'bg-white text-black border-white font-bold'
                : 'border-white/30 text-white/70 hover:border-white hover:text-white',
            ]"
          >
            {{ tab.label[lang] }}
          </button>
        </div>
      </div>

      <!-- Active Clip Player -->
      <div v-if="activeClip" class="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-5 items-start">
        <div>
          <div class="border border-white/35 bg-black overflow-hidden">
            <video
              :key="activeClip.id"
              :src="activeClip.src"
              :poster="activeClip.poster"
              controls
              playsinline
              muted
              preload="none"
              width="1280"
              height="720"
              class="w-full aspect-video block bg-black"
              :aria-label="activeClip.title[lang]"
            >
              {{ labels.videoFallback }}
            </video>
          </div>
          <div class="mt-3">
            <h4 class="text-base sm:text-lg font-bold text-white">
              {{ activeClip.title[lang] }}
            </h4>
            <p class="mt-1 text-xs sm:text-sm text-white/65 leading-relaxed">
              {{ activeClip.caption[lang] }}
            </p>
          </div>
        </div>

        <!-- Clip Selector List -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 max-h-[440px] lg:overflow-y-auto pr-1">
          <button
            v-for="clip in filteredClips"
            :key="clip.id"
            type="button"
            @click="activeClipId = clip.id"
            :class="[
              'group text-left border p-2 transition-colors flex flex-col sm:flex-col lg:flex-row gap-2.5 items-start cursor-pointer',
              activeClip.id === clip.id
                ? 'border-white bg-white/10'
                : 'border-white/20 bg-black/60 hover:border-white/60',
            ]"
          >
            <div class="relative w-full lg:w-28 shrink-0 aspect-video bg-black overflow-hidden border border-white/15">
              <img
                :src="clip.poster"
                :alt="clip.title[lang]"
                width="1280"
                height="720"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover"
              />
              <span
                class="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1.5 py-0.5 border border-white/30"
                aria-hidden="true"
              >
                ▶
              </span>
            </div>
            <div class="min-w-0">
              <span class="block text-xs font-bold text-white leading-snug">
                {{ clip.title[lang] }}
              </span>
              <span class="hidden lg:block mt-1 text-[11px] text-white/55 line-clamp-2 leading-snug">
                {{ clip.caption[lang] }}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  lang: {
    type: String,
    default: 'en',
  },
});

const selectedGroup = ref('all');
const activeClipId = ref(props.project.clips?.[0]?.id ?? '');

const clipGroups = [
  { id: 'all', label: { en: 'All Clips', es: 'Todos' } },
  { id: 'gunplay', label: { en: 'Gunplay & Reloads', es: 'Armas y Recargas' } },
  { id: 'tactical', label: { en: 'Tactical Mechanics', es: 'Mecánicas Tácticas' } },
  { id: 'ballistics', label: { en: 'Ballistics & VFX', es: 'Balística y VFX' } },
];

const filteredClips = computed(() => {
  const clips = props.project.clips ?? [];
  if (selectedGroup.value === 'all') return clips;
  return clips.filter((c) => c.group === selectedGroup.value);
});

const activeClip = computed(() => {
  const list = filteredClips.value;
  return list.find((c) => c.id === activeClipId.value) ?? list[0] ?? null;
});

const selectGroup = (groupId) => {
  selectedGroup.value = groupId;
  const first = filteredClips.value[0];
  if (first) activeClipId.value = first.id;
};

watch(
  () => props.project.id,
  () => {
    selectedGroup.value = 'all';
    activeClipId.value = props.project.clips?.[0]?.id ?? '';
  }
);

const labels = computed(() =>
  props.lang === 'es'
    ? {
        verification: 'Verificación',
        primaryShowcase: 'Video Principal de Gameplay',
        videoFallback: 'Tu navegador no soporta video HTML5.',
        architectureEyebrow: 'Sistemas Implementados',
        architectureTitle: 'Arquitectura y Mecánicas',
        clipsEyebrow: 'Demostraciones por Funcionalidad',
        clipsTitle: 'Clips Cortos de Sistemas',
        filterClips: 'Filtrar clips por sistema',
      }
    : {
        verification: 'Verification',
        primaryShowcase: 'Primary Gameplay Video',
        videoFallback: 'Your browser does not support HTML5 video.',
        architectureEyebrow: 'Implemented Systems',
        architectureTitle: 'Architecture & Mechanics',
        clipsEyebrow: 'Feature Breakdown',
        clipsTitle: 'Short System Demonstrations',
        filterClips: 'Filter clips by system',
      }
);
</script>
