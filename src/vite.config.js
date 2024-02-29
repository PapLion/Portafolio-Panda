import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
    base:"https://paplion.github.io/Portafolio-Panda/src/index.html",
    input: 'main.js'
    }
  }
});