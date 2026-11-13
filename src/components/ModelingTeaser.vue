<template>
  <section id="modeling" class="py-12 sm:py-16 border-b border-white/20 relative" aria-labelledby="modeling-teaser-title">
    <div class="container mx-auto px-4">
      <ModelingShowcase :slugs="homeHighlights" :content="content" heading-id="modeling-teaser-title" />
    </div>
  </section>
</template>

<script setup>
import ModelingShowcase from './modeling/ModelingShowcase.vue';
import { homeHighlights } from '../data/models3d.js';

const content = {
  en: {
    eyebrow: 'New specialty',
    title: '3D Modeling',
    text: 'Stylized low/mid poly models for games: weapons, props, vehicles and characters, with separate parts and measured triangle counts.',
    cta: 'View 3D gallery',
    open: 'open in the 3D gallery',
  },
  es: {
    eyebrow: 'Nueva especialidad',
    title: 'Modelado 3D',
    text: 'Modelos estilizados low/mid poly para juegos: armas, props, vehículos y personajes, con piezas separadas y triángulos medidos.',
    cta: 'Ver galería 3D',
    open: 'abrir en la galería 3D',
  },
};
</script>
