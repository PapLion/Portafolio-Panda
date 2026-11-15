<template>
  <section id="real-work" class="py-12 sm:py-16 md:py-20 border-b border-white/20 bg-black" aria-labelledby="real-work-title">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
        <p class="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/50 mb-3">{{ copy.eyebrow }}</p>
        <h2 id="real-work-title" class="text-2xl sm:text-3xl md:text-4xl font-bold section-title">{{ copy.title }}</h2>
        <p class="mt-4 text-sm sm:text-base text-white/65 leading-relaxed">{{ copy.intro }}</p>
      </div>

      <article v-for="(project, pIndex) in projects" :key="project.title" :class="['manga-panel border-2 border-white p-5 sm:p-7 relative overflow-hidden', pIndex > 0 ? 'mt-6 sm:mt-8' : '']">
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div class="lg:w-[38%] flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-4">
                <span class="border border-white/50 px-2 py-1 text-[10px] sm:text-xs uppercase tracking-[0.2em]">{{ project.category }}</span>
                <span class="bg-white text-black px-2 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em]">{{ project.badge }}</span>
              </div>
              <h3 class="text-xl sm:text-2xl md:text-3xl font-bold manga-text">{{ project.title }}</h3>
              <p class="mt-3 text-xs sm:text-sm text-white/55">{{ project.role }}</p>
            </div>

            <div class="mt-6 flex flex-wrap gap-2">
              <span v-for="tech in project.stack" :key="tech" class="border border-white/25 px-2.5 py-1 text-xs text-white/75">{{ tech }}</span>
            </div>
          </div>

          <div class="lg:w-[62%] lg:border-l lg:border-white/20 lg:pl-8">
            <p class="text-sm sm:text-base text-white/80 leading-relaxed">{{ project.description }}</p>
            <ul class="mt-5 space-y-3">
              <li v-for="highlight in project.highlights" :key="highlight" class="flex gap-3 text-sm text-white/70 leading-relaxed">
                <span class="mt-2 block h-1.5 w-1.5 shrink-0 bg-white" aria-hidden="true"></span>
                <span>{{ highlight }}</span>
              </li>
            </ul>

            <div v-if="project.media?.length" class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a v-for="item in project.media" :key="item.src" :href="item.href || item.src" target="_blank" rel="noreferrer" class="block border border-white/20 overflow-hidden hover:border-white transition-colors">
                <img :src="item.src" :alt="item.alt" class="w-full aspect-video object-cover" loading="lazy" />
              </a>
            </div>

            <p v-if="project.note" class="mt-5 border border-white/20 bg-white/[0.03] px-3 py-2 text-xs sm:text-sm text-white/65 leading-relaxed">{{ project.note }}</p>

            <div v-if="project.gallery?.length" class="mt-6">
              <p class="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/45 mb-3">{{ copy.galleryTitle }}</p>
              <ProjectGallery
                :shots="project.gallery"
                base-path="/images/pucket"
                :label="project.title + ' — ' + copy.galleryTitle"
                :open-label="copy.enlarge"
                :prev-label="copy.prev"
                :next-label="copy.next"
                :close-label="copy.close"
              />
            </div>

            <div class="mt-6 flex flex-wrap gap-3">
              <a v-for="link in project.links" :key="link.href" :href="link.href" target="_blank" rel="noreferrer" class="inline-flex items-center border border-white px-3 py-2 text-xs sm:text-sm hover:bg-white hover:text-black transition-colors">
                {{ link.label }} ↗
              </a>
            </div>
          </div>
        </div>
      </article>

      <div class="mt-5 text-center sm:text-right">
        <a
          href="/roblox-gamedev"
          class="text-xs sm:text-sm text-white/45 hover:text-white transition-colors"
        >
          {{ copy.robloxRoutePrompt }}
          <span class="ml-1 text-white/70">{{ copy.robloxRouteCta }} →</span>
        </a>
      </div>

      <div v-if="testimonials.length" class="mt-10 sm:mt-12">
        <h3 class="text-xl sm:text-2xl font-bold mb-5">{{ copy.testimonialsTitle }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <blockquote v-for="testimonial in testimonials" :key="testimonial.quote" class="border border-white/30 p-5 manga-panel">
            <p class="text-white/80 leading-relaxed">“{{ testimonial.quote }}”</p>
            <footer class="mt-4 text-xs text-white/50">— {{ testimonial.author }}</footer>
          </blockquote>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import ProjectGallery from './ProjectGallery.vue';

const language = inject('language', { currentLanguage: ref('en') });
const currentLanguage = language.currentLanguage ?? ref('en');

const content = {
  en: {
    eyebrow: 'Selected work',
    title: 'Flagship Project',
    intro: 'If you only have time to review one project, start here: real production work with broad contribution across the platform.',
    testimonialsTitle: 'Client feedback',
    robloxRoutePrompt: 'Looking for Roblox / Game Dev?',
    robloxRouteCta: 'Separate portfolio',
    galleryTitle: 'Screenshots',
    enlarge: 'Enlarge',
    prev: 'Previous',
    next: 'Next',
    close: 'Close',
    project: {
      category: 'E-commerce / Automation',
      badge: 'Client project',
      title: 'BloxTop',
      role: 'Fullstack Developer · Production client project',
      description: 'Fullstack contributor on a production Shopify Hydrogen platform for digital Roblox items, working across storefront engineering, automated delivery, commerce flows, QA, and technical SEO.',
      highlights: [
        'Production storefront work across UX, cart/locale flows, selectors, and checkout-facing fixes.',
        'Automated claim and delivery flows connecting Shopify state with item delivery.',
        'Production QA and technical SEO improvements for a live storefront.',
      ],
      stack: ['Shopify Hydrogen', 'Remix', 'TypeScript', 'GraphQL', 'Oxygen'],
      links: [{ label: 'Visit BloxTop', href: 'https://bloxtop.com' }],
      media: [],
    },
    pucket: {
      category: "Mobile / Web3",
      badge: "Personal project",
      title: 'Pucket',
      role: "Mobile and Web3 developer · Solo project",
      description: "Crypto finance app for iOS, Android and web built with Expo and React Native. It combines a self-custody wallet on Ethereum testnets, live market data from CoinGecko and a local exchange ledger that keeps balances consistent.",
      highlights: [
        "On-chain (testnets): BIP-39 wallet creation and import, encrypted key storage, ETH and ERC-20 balances, history, and EIP-1559 transactions prepared, signed on the device and broadcast, with confirmation tracking on Ethereum Sepolia and Base Sepolia.",
        "Live data: top-100 prices, search, asset details and historical charts from CoinGecko, with a bundled snapshot as offline fallback.",
        "Simulated: dollar balance, buy/sell, swap, top-ups, withdrawals and bill payments run on a pure, tested ledger with fictional providers. No real money moves.",
        "Quality: strict TypeScript, 79 unit tests, integration tests against a local EVM and the public testnets, and end-to-end browser tests."
],
      stack: ['Expo', 'React Native', 'TypeScript', 'viem', 'Zustand', 'TanStack Query', 'Ethereum Sepolia'],
      note: "Testnets only: the wallet cannot move real funds. Not yet verified on a physical iOS/Android device; the UI was tested on the web build.",
      gallery: [
        { id: '05-home', caption: "Home: exchange balance, on-chain wallet and daily brief" },
        { id: '07-market', caption: "Market: live top 100 from CoinGecko" },
        { id: '10-asset-chart-1y', caption: "Asset detail with an interactive one-year chart" },
        { id: '13-trade-review', caption: "Order review before confirming (simulated exchange)" },
        { id: '15-swap', caption: "Swap between assets (simulated exchange)" },
        { id: '20-wallet', caption: "Wallet: live Sepolia balances, block and gas (read-only address)" },
        { id: '21-wallet-history', caption: "On-chain transaction history from Blockscout" },
        { id: '22-transaction', caption: "Transaction detail with confirmations, read from Sepolia" },
        { id: '23-networks', caption: "Network switcher: Ethereum Sepolia and Base Sepolia" },
        { id: '24-receive', caption: "Receive with an EIP-681 QR code" },
        { id: '26-account', caption: "Account and settings" },
      ],
      links: [],
      media: [],
    },
  },
  es: {
    eyebrow: 'Trabajo seleccionado',
    title: 'Proyecto insignia',
    intro: 'Si solo tienes tiempo de revisar un proyecto, empieza por este: trabajo real en producción con participación transversal en la plataforma.',
    testimonialsTitle: 'Opiniones de clientes',
    robloxRoutePrompt: '¿Buscas Roblox / Game Dev?',
    robloxRouteCta: 'Portafolio aparte',
    galleryTitle: 'Capturas',
    enlarge: 'Ampliar',
    prev: 'Anterior',
    next: 'Siguiente',
    close: 'Cerrar',
    project: {
      category: 'E-commerce / Automatización',
      badge: 'Proyecto cliente',
      title: 'BloxTop',
      role: 'Desarrollador Fullstack · Proyecto cliente en producción',
      description: 'Participación fullstack en una plataforma Shopify Hydrogen en producción para ítems digitales de Roblox, cubriendo storefront, entrega automatizada, flujos de comercio, QA y SEO técnico.',
      highlights: [
        'Trabajo de storefront en UX, carrito/locales, selectores y fixes cercanos al checkout.',
        'Flujos automatizados de claim y delivery conectando el estado de Shopify con la entrega de ítems.',
        'QA de producción y mejoras de SEO técnico sobre una tienda en uso real.',
      ],
      stack: ['Shopify Hydrogen', 'Remix', 'TypeScript', 'GraphQL', 'Oxygen'],
      links: [{ label: 'Visitar BloxTop', href: 'https://bloxtop.com' }],
      media: [],
    },
    pucket: {
      category: "Móvil / Web3",
      badge: "Proyecto personal",
      title: 'Pucket',
      role: "Desarrollador móvil y Web3 · Proyecto en solitario",
      description: "App de finanzas cripto para iOS, Android y web hecha con Expo y React Native. Combina una wallet de autocustodia sobre testnets de Ethereum, datos de mercado en vivo de CoinGecko y un libro contable de exchange local que mantiene los saldos coherentes.",
      highlights: [
        "On-chain (testnets): creación e importación de wallet BIP-39, claves cifradas, saldos de ETH y ERC-20, historial, y transacciones EIP-1559 preparadas, firmadas en el dispositivo y difundidas, con seguimiento de confirmaciones en Ethereum Sepolia y Base Sepolia.",
        "Datos en vivo: precios del top 100, búsqueda, fichas y gráficos históricos de CoinGecko, con una instantánea incluida como respaldo sin conexión.",
        "Simulado: saldo en dólares, compra/venta, swap, recargas, retiros y pago de servicios sobre un libro contable puro y probado, con proveedores ficticios. No se mueve dinero real.",
        "Calidad: TypeScript estricto, 79 pruebas unitarias, pruebas de integración contra una EVM local y las testnets públicas, y pruebas end-to-end en navegador."
],
      stack: ['Expo', 'React Native', 'TypeScript', 'viem', 'Zustand', 'TanStack Query', 'Ethereum Sepolia'],
      note: "Solo testnets: la wallet no puede mover fondos reales. Aún no verificada en un dispositivo iOS/Android físico; la interfaz se probó en el build web.",
      gallery: [
        { id: '05-home', caption: "Home: saldo del exchange, wallet on-chain y resumen del día" },
        { id: '07-market', caption: "Market: top 100 en vivo desde CoinGecko" },
        { id: '10-asset-chart-1y', caption: "Ficha de activo con gráfico interactivo de un año" },
        { id: '13-trade-review', caption: "Revisión de la orden antes de confirmar (exchange simulado)" },
        { id: '15-swap', caption: "Swap entre activos (exchange simulado)" },
        { id: '20-wallet', caption: "Wallet: saldos, bloque y gas en vivo en Sepolia (dirección de solo lectura)" },
        { id: '21-wallet-history', caption: "Historial on-chain desde Blockscout" },
        { id: '22-transaction', caption: "Detalle de transacción con confirmaciones, leído de Sepolia" },
        { id: '23-networks', caption: "Selector de red: Ethereum Sepolia y Base Sepolia" },
        { id: '24-receive', caption: "Recibir con código QR EIP-681" },
        { id: '26-account', caption: "Cuenta y ajustes" },
      ],
      links: [],
      media: [],
    },
  },
};

const testimonials = ref([]);
const copy = computed(() => content[currentLanguage.value] ?? content.en);
const projects = computed(() => [copy.value.project, copy.value.pucket]);
</script>
