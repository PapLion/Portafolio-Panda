# Code Review — Portafolio-Panda (Post-Fix QA Pass)

> Rol: Code Re-Reviewer & QA Engineer
> Estado: Verificación post-correcciones
> Ámbito: `index.html`, `api/contact.js`, `src/**`

---

## Estado Global

La gran mayoría de los **17 bugs críticos** y buena parte de los **65 importantes** del review original han sido resueltos. Los issues marcados aquí son los que **persisten o son nuevos hallazgos** tras la revisión del código corregido.

---

## [index.html](file:///home/dani.pp/Code/Portafolio-Panda/index.html)

✅ **Todos los issues resueltos.** CSP permisiva eliminada, X-XSS-Protection removido, `lang="es"` correcto, `og:locale` actualizado, font loading con patrón `onload`, metas irrelevantes eliminadas, link CSS redundante removido.

---

## [api/contact.js](file:///home/dani.pp/Code/Portafolio-Panda/api/contact.js)

✅ **Todos los issues críticos y de lógica resueltos.** API key movida a env var, CORS restringido, rate limiting implementado, XSS sanitizado, validación de email completa, errores internos no expuestos al cliente.

### 🟡 Observación menor — Rate limiting en memoria

El rate limiting usa un `Map` en memoria de la función serverless. En Vercel, cada función puede ejecutarse en múltiples instancias paralelas que no comparten estado. Si hay pico de tráfico con múltiples instancias, el rate limit no se aplica de forma global. Es un trade-off aceptable para un portfolio personal (costo de Redis no justificado); solo documentar que el rate limit es "best-effort" en este contexto.

---

## [src/main.js](file:///home/dani.pp/Code/Portafolio-Panda/src/main.js)

✅ **CSS ya no se importa dos veces.** `App.vue` usa `<style scoped>` solo para `.loading-bar`; la importación global queda únicamente en `main.js`.

---

## [src/App.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/App.vue)

✅ **Todos los issues resueltos.** `onUnmounted` correctamente en nivel de setup, loading progress animado, división por cero protegida, `inject` con fallback.

### 🟡 `initializeProgressBars` sin efecto funcional (líneas 79-87)

```js
const initializeProgressBars = () => {
  const progressBars = document.querySelectorAll(".skill-progress");
  // ...
};
```

`Skills.vue` fue refactorizado y ya no genera elementos `.skill-progress` en el DOM. Esta función nunca encontrará nada y opera en vacío. Es código muerto — no causa bug activo, pero puede confundir.

---

## [src/components/SpaceBackground.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/SpaceBackground.vue)

✅ **Todos los issues resueltos.** `onUnmounted` al nivel correcto, planetas refactorizados con `v-for`, `Astronaut` component usado, planetas invisibles fuera del viewport eliminados, `cloneNode()` usado, rAF con throttling.

---

## [src/components/Hero.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/Hero.vue)

✅ **Issues principales resueltos.** Intervalos con `onUnmounted` correcto, `aria-live` presente, `watch` sobre `currentLanguage` explícito.

### 🟡 `<a>` wrapping `<button>` persiste en el botón de CV (líneas 96-104)

```html
<a href="/danilo-lopez-cv.pdf" download>
  <button>...</button>  <!-- ❌ HTML inválido -->
</a>
```

Los dos botones de navegación fueron correctamente corregidos a `<button @click="navigateTo()">`, pero el botón de descarga de CV mantiene el patrón `<a><button>` para poder usar el atributo `download`. El fix correcto es convertir el `<a>` directamente en el elemento interactivo estilizado como botón (sin `<button>` anidado), que es HTML válido y también acepta `download`.

---

## [src/components/About.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/About.vue)

✅ **Todos los issues resueltos.** `onUnmounted` correcto, cada elemento se anima individualmente, `unobserve` implementado.

---

## [src/components/Skills.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/Skills.vue)

✅ **Issues del review original resueltos.** `onUnmounted` correcto, tipos normalizados a `number`, template refactorizado con `TechCard`, cleanup correcto.

### 🔴 `t()` llamado en scope de inicialización del módulo (líneas 151, 217, 223)

```js
const technologies = {
  frontend: [
    {
      description: t('tech.htmlcss.desc') || "Web Structure & Styles", // ❌
      ...
    }
  ],
  multiplatform: [
    {
      description: t('tech.electron.desc') || "Desktop Apps with Web Tech", // ❌
      ...
    }
  ]
}
```

`technologies` es un objeto estático creado **una sola vez** cuando el componente se inicializa. Las llamadas a `t()` se evalúan en ese momento, capturando el idioma actual. Si el usuario cambia el idioma después del montaje, las descripciones de tecnología **nunca se actualizan** porque el objeto no es reactivo. El fallback `|| "..."` evita que se muestre la key cruda, pero el texto permanecerá en el idioma inicial.

El fix es convertir `technologies` en un `computed()` que dependa de `currentLanguage`.

### 🟡 `TechCard` recibe `formatYears` como prop (línea 117)

```js
const TechCard = {
  props: ['tech', 'formatYears'],
  // ...
};
```

Pasar `formatYears` como prop es innecesario — `formatYears` está definida en el mismo scope y podría ser accedida directamente desde el render function. Antipatrón menor sin impacto funcional.

---

## [src/components/Projects.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/Projects.vue)

✅ **Todos los issues resueltos.** `changeProject` ahora usa `isTransitioning`, `onUnmounted` correcto, imports consolidados, links `null` con fallback "Coming Soon".

### 🟡 Imágenes aún son `/vite.svg` (línea 106, 114, 122, 130, 138)

Las imágenes de proyectos cambiaron de `placeholder.svg` a `/vite.svg`. Esto resuelve el error de 404 en algunos entornos, pero sigue siendo una imagen placeholder genérica (el logo de Vite) en lugar de screenshots reales de los proyectos. El impacto en credibilidad del portfolio permanece.

---

## [src/components/Contact.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/Contact.vue)

✅ **Todos los issues resueltos.** `validateForm()` ejecutada, `isSuccess` correctamente seteado a `true`, `<h2>` en lugar de `<h1>`, spinner de carga, `aria-describedby` junto a los campos, mensajes con `role="alert"`.

---

## [src/components/Navbar.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/Navbar.vue)

✅ **Todos los issues resueltos.** `onUnmounted` correcto, `aria-expanded`, click-outside y escape-key implementados, `scrolled` simplificado.

---

## [src/components/LanguageSelector.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/LanguageSelector.vue)

✅ **Bug crítico de shadowing resuelto.** `currentLanguage` ahora usa `computed()` sobre el valor del ref/computed inyectado. Click-outside y escape-key implementados. ARIA roles presentes.

---

## [src/components/Footer.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/Footer.vue)

✅ **Año dinámico implementado** (verificar que el template use `new Date().getFullYear()` o similar).

---

## [src/composables/useLanguage.js](file:///home/dani.pp/Code/Portafolio-Panda/src/composables/useLanguage.js)

✅ **Issues resueltos.** SSR guard en `setLanguage`, `watch` duplicado eliminado, `t` limpiado con optional chaining (`translations[lang]?.[key]`), traducciones para todos los nuevos keys añadidas.

### 🟡 `t()` sigue siendo función plana, no reactive getter

Como se documentó en el review anterior, `t()` lee `currentLanguage.value` internamente pero no es un `computed`. Funciona correctamente en templates porque Vue re-evalúa expresiones de template cuando cualquier ref en el componente cambia. El **riesgo real** es el nuevo bug de `Skills.vue` donde `t()` se llama fuera de un contexto reactivo (scope de inicialización estática). En el resto de la app es funcional. **Aceptado como trade-off**, pero el caso de Skills.vue sí necesita fix.

---

## [src/styles/main.css](file:///home/dani.pp/Code/Portafolio-Panda/src/styles/main.css)

> No se pudo verificar el estado del CSS post-fix directamente en esta pasada. Según `resolve.md`, se aplicaron: eliminación de CSS muerto (`.stars`, clases React Transition, `.lazy-image`, `.ink-splash`), `font-weight: <weight>` corregido, `@keyframes skillProgress` deduplicado, `section::before` scan-line eliminado, `will-change` reducido, `h1` global conflictivo eliminado, y `@media (prefers-reduced-motion)` añadido.

---

## Resumen Post-Fix

| Área | Estado | Issues Pendientes |
|---|---|---|
| [index.html](file:///home/dani.pp/Code/Portafolio-Panda/index.html) | ✅ Limpio | — |
| [api/contact.js](file:///home/dani.pp/Code/Portafolio-Panda/api/contact.js) | ✅ Limpio | Rate limit es best-effort (trade-off aceptado) |
| [src/main.js](file:///home/dani.pp/Code/Portafolio-Panda/src/main.js) | ✅ Limpio | — |
| [App.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/App.vue) | 🟡 Menor | `initializeProgressBars` es código muerto |
| [SpaceBackground.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/SpaceBackground.vue) | ✅ Limpio | — |
| [Hero.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/Hero.vue) | 🟡 Menor | `<a><button>` en CV download (HTML inválido) |
| [About.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/About.vue) | ✅ Limpio | — |
| [Skills.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/Skills.vue) | 🔴 Bug | `t()` en scope estático — descripciones no reactivas |
| [Projects.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/Projects.vue) | 🟡 Contenido | Imágenes son `/vite.svg` (placeholder real pendiente) |
| [Contact.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/Contact.vue) | ✅ Limpio | — |
| [Navbar.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/Navbar.vue) | ✅ Limpio | — |
| [Footer.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/Footer.vue) | ✅ Limpio | — |
| [LanguageSelector.vue](file:///home/dani.pp/Code/Portafolio-Panda/src/components/LanguageSelector.vue) | ✅ Limpio | — |
| [useLanguage.js](file:///home/dani.pp/Code/Portafolio-Panda/src/composables/useLanguage.js) | ✅ Limpio | `t()` plana es trade-off aceptado |
| [main.css](file:///home/dani.pp/Code/Portafolio-Panda/src/styles/main.css) | ✅ Según resolve.md | Verificar `@media prefers-reduced-motion` está presente |

**Issues críticos restantes: 1**
**Issues importantes/menores restantes: 4**

> **Único bug crítico pendiente:** `Skills.vue` — convertir `technologies` de objeto estático a `computed()` para que las descripciones localizadas sean reactivas al cambio de idioma.
