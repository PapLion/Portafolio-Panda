// PIVOT — Competitive Shooter UI System (personal project).
// Every image is a real Roblox Studio capture: full screens at 1920×1080, two component sheets rendered
// in Studio from the project's own UI module, crops of those captures, and tablet / phone viewports.
// Files live in /images/roblox/pivot as `${id}-${width}.webp` (480 px thumbnails, up to 1200 px large).

export const PIVOT_PATH = '/images/roblox/pivot';

const size = (thumbH, largeW, largeH) => ({ thumbW: 480, thumbH, largeW, largeH });
const screen = size(270, 1200, 675);

// language-independent image data, in display order
const screens = [
  { id: 'screen-lobby', ...screen, wide: true },
  { id: 'screen-title', ...screen, wide: true },
  { id: 'screen-play', ...screen, wide: true },
  { id: 'screen-armory', ...screen, wide: true },
  { id: 'screen-shop', ...screen, wide: true },
  { id: 'screen-missions', ...screen, wide: true },
  { id: 'screen-match-found', ...screen, wide: true },
  { id: 'screen-hud', ...screen, wide: true },
  { id: 'screen-scoreboard', ...screen, wide: true },
  { id: 'screen-results', ...screen, wide: true },
];

const components = [
  { id: 'component-button-states', ...size(166, 1200, 416), span: 2 },
  { id: 'component-purchase-dialog', ...size(270, 660, 371) },
  { id: 'component-controls', ...size(191, 1200, 478), span: 2 },
  { id: 'component-party', ...size(328, 508, 347) },
  { id: 'component-shop-cards', ...size(253, 1200, 632) },
  { id: 'component-mission-cards', ...size(246, 1200, 614) },
  { id: 'component-loadout', ...size(212, 640, 282) },
  { id: 'component-settings', ...size(126, 1200, 316), span: 2 },
  { id: 'component-hud-score', ...size(209, 522, 227) },
  { id: 'component-scoreboard', ...size(162, 864, 291), span: 2 },
  { id: 'component-results-cards', ...size(476, 714, 708) },
  { id: 'component-hud-vitals', ...size(104, 754, 164), span: 3 },
];

const responsive = [
  { id: 'responsive-tablet-home', ...size(301, 1200, 752) },
  { id: 'responsive-phone-home', ...size(222, 1055, 488) },
  { id: 'responsive-phone-hud', ...size(222, 1055, 488) },
];

const text = {
  en: {
    status: 'Personal project · 2026',
    role: 'UI/UX engineering · Luau',
    title: 'PIVOT — Competitive Shooter UI System',
    description:
      'A complete interface system for a competitive shooter, built in Roblox Studio with native ScreenGuis and Luau: a reusable component kit, a central state store, responsive layouts and the whole menu-to-match flow, from the title screen to the results.',
    note:
      'A portfolio piece about interface engineering, not a released game. Party, matchmaking, shop, match and progression data are simulated on the client to drive every UI state: there is no server, DataStore or real purchase.',
    stack: ['Luau', 'Roblox Studio', 'ScreenGui', 'Component kit', 'Responsive layout', 'State management'],
    highlights: [
      'One component kit drives every screen: buttons with six states, cut-corner panels, segmented controls, toggles, sliders, tags, a single modal and toasts.',
      'Three layout classes (desktop, tablet, phone landscape) picked from the viewport: screens rearrange instead of shrinking, and touch mode swaps key hints for touch controls.',
      'Keyboard navigation with visible focus, focus trapped in dialogs, and state that stays consistent from a purchase to the match results.',
    ],
    screensEyebrow: 'Interface',
    screensTitle: 'Interface screens',
    screensText: 'Real 1920×1080 captures of the full flow: lobby, title, play setup, arsenal, shop, missions, matchmaking, HUD, scoreboard and results.',
    componentsEyebrow: 'UI library',
    componentsTitle: 'Component library',
    componentsText:
      'The reusable pieces behind those screens. The first two sheets are rendered in Studio from the project’s own UI module at desktop size; the rest are crops of the real captures.',
    responsiveEyebrow: 'Responsive',
    responsiveTitle: 'Tablet and phone layouts',
    responsiveText: 'The same lobby and HUD on a tablet viewport (999×626) and a phone in landscape (844×390), both in touch mode.',
    technicalEyebrow: 'Under the hood',
    technicalTitle: 'Technical highlights',
    technical: [
      'Component kit in one Luau module: a single button function covers six variants and six states; panels, tags and slanted buttons come from one 1024 px atlas of 9-slice and 3-slice shapes tinted at runtime.',
      'Central store: screens dispatch actions and re-render from state; rules such as buying once, claiming a reward once and paying a match once live in one place.',
      'Responsive by layout class, not by scaling: narrow cells drop thumbnails or shorten secondary text instead of cutting words, and long names end in an ellipsis.',
      'Keyboard navigation: Q / E switch sections, arrows and Enter move a visible focus, Backspace closes dialogs and the modal keeps focus inside.',
      'Scoped screens: each screen owns its connections, tasks and tweens and cleans them up on exit (21 tab switches left the same 11 listeners and 459 instances).',
      '3D integrated with the UI: the equipped weapon on a lobby stand, rotatable ViewportFrame previews in the arsenal and shop, and a first-person view in the match.',
      'Simulated match and progression: kills, damage, accuracy, rewards, level-ups and mission progress add up from the HUD to the results screen.',
    ],
    gallery: { enlarge: 'Enlarge', prev: 'Previous', next: 'Next', close: 'Close' },
    captions: {
      'screen-lobby': ['Lobby · home', 'Player and party, equipped loadout on a 3D stand, missions and news.'],
      'screen-title': ['Title screen', ''],
      'screen-play': ['Play · mode, map and party', ''],
      'screen-armory': ['Arsenal · stats, finishes and 3D preview', ''],
      'screen-shop': ['Shop · featured item and catalogue', ''],
      'screen-missions': ['Missions · daily and weekly progress', ''],
      'screen-match-found': ['Matchmaking · match found with accept countdown', ''],
      'screen-hud': ['In-match HUD', ''],
      'screen-scoreboard': ['Scoreboard (hold Tab)', ''],
      'screen-results': ['Results · match report and rewards', ''],
      'component-button-states': ['Button variants × states', 'Primary, claim, light, secondary, ghost and danger in default, hover, pressed, focus, disabled and loading.'],
      'component-purchase-dialog': ['Confirmation dialog', 'Single modal with trapped focus; the focused confirm button shows its underline.'],
      'component-controls': ['Controls, tags and notices', 'Segmented controls (one option disabled), toggles, slider with steppers, rarity and status tags, key hints, icon buttons, bars and toasts.'],
      'component-party': ['Party panel', 'Ready state, leader crown, kick actions and long names cut cleanly.'],
      'component-shop-cards': ['Shop cards and filters', 'Category tabs, sorting, owned filter and cards with 3D previews, rarity and lock state.'],
      'component-mission-cards': ['Mission cards', 'Progress, rewards and claim state; a completed mission switches to its claim button.'],
      'component-loadout': ['Loadout and main action', 'Equipped slots with ViewportFrame thumbnails, the mode chip and the ready button with its key hint.'],
      'component-settings': ['Settings rows and live preview', 'Sliders, segmented control, colour swatches and toggles, previewed before they are applied.'],
      'component-hud-score': ['HUD · score, clock and medals', 'Team scores, match clock, objective and stacked medal notices.'],
      'component-scoreboard': ['Scoreboard', 'Built once when it opens; while Tab is held only the values update.'],
      'component-results-cards': ['Results · rewards, level and missions', 'Itemised rewards that add up to the totals, the level-up bar and mission progress.'],
      'component-hud-vitals': ['HUD · vitals and weapon', 'Health and armour segments, magazine and reserve, and the weapon slots (two corner panels of the same capture).'],
      'responsive-tablet-home': ['Tablet · 999×626 · touch', 'Icon navigation with the label on the current section; equipment slots drop their thumbnails when narrow.'],
      'responsive-phone-home': ['Phone landscape · 844×390 · touch', 'Side rail navigation, compact party rows and the main action within thumb reach.'],
      'responsive-phone-hud': ['Phone HUD · touch', 'Touch buttons for fire, aim, reload, swap and support; the weapon card moves to the bottom centre.'],
    },
  },
  es: {
    status: 'Proyecto personal · 2026',
    role: 'Ingeniería de UI/UX · Luau',
    title: 'PIVOT — Sistema de UI para shooter competitivo',
    description:
      'Un sistema de interfaz completo para un shooter competitivo, hecho en Roblox Studio con ScreenGuis nativas y Luau: kit de componentes reutilizable, store de estado central, layouts responsive y todo el recorrido del menú a la partida, de la pantalla de título a los resultados.',
    note:
      'Pieza de portafolio centrada en la ingeniería de interfaz, no un juego publicado. El grupo, el matchmaking, la tienda, la partida y la progresión se simulan en el cliente para mostrar cada estado de la UI: no hay servidor, DataStore ni compras reales.',
    stack: ['Luau', 'Roblox Studio', 'ScreenGui', 'Kit de componentes', 'Layout responsive', 'Gestión de estado'],
    highlights: [
      'Un solo kit de componentes mueve todas las pantallas: botones con seis estados, paneles con esquina cortada, segmentados, interruptores, deslizadores, etiquetas, un modal único y avisos.',
      'Tres clases de layout (escritorio, tablet y móvil horizontal) elegidas según el viewport: las pantallas se reorganizan en vez de encogerse y el modo táctil cambia las teclas por controles táctiles.',
      'Navegación con teclado y foco visible, foco atrapado en los diálogos y un estado que cuadra desde una compra hasta los resultados de la partida.',
    ],
    screensEyebrow: 'Interfaz',
    screensTitle: 'Pantallas de la interfaz',
    screensText: 'Capturas reales a 1920×1080 del recorrido completo: lobby, título, preparación de partida, arsenal, tienda, misiones, matchmaking, HUD, puntuaciones y resultados.',
    componentsEyebrow: 'Librería de UI',
    componentsTitle: 'Librería de componentes',
    componentsText:
      'Las piezas reutilizables detrás de esas pantallas. Las dos primeras láminas se renderizan en Studio con el propio módulo UI del proyecto, a tamaño de escritorio; el resto son recortes de las capturas reales.',
    responsiveEyebrow: 'Responsive',
    responsiveTitle: 'Layouts de tablet y móvil',
    responsiveText: 'El mismo lobby y el mismo HUD en un viewport de tablet (999×626) y en un móvil en horizontal (844×390), los dos en modo táctil.',
    technicalEyebrow: 'Por dentro',
    technicalTitle: 'Puntos técnicos',
    technical: [
      'Kit de componentes en un módulo Luau: una sola función de botón cubre seis variantes y seis estados; paneles, etiquetas y botones inclinados salen de un atlas de 1024 px con piezas 9-slice y 3-slice teñidas en tiempo real.',
      'Store central: las pantallas despachan acciones y se vuelven a pintar desde el estado; reglas como comprar una vez, reclamar una recompensa una vez y cobrar una partida una vez viven en un solo sitio.',
      'Responsive por clase de layout, no por escala: las celdas estrechas quitan miniaturas o acortan el texto secundario en vez de partir palabras, y los nombres largos terminan en puntos suspensivos.',
      'Navegación con teclado: Q / E cambian de sección, las flechas e Intro mueven un foco visible, Retroceso cierra los diálogos y el modal mantiene el foco dentro.',
      'Pantallas con scope: cada pantalla es dueña de sus conexiones, tareas y tweens y los limpia al salir (21 cambios de pestaña dejaron las mismas 11 escuchas y 459 instancias).',
      '3D integrado con la UI: el arma equipada en un expositor del lobby, vistas previas en ViewportFrame que se giran en el arsenal y la tienda, y la vista en primera persona en la partida.',
      'Partida y progresión simuladas: bajas, daño, precisión, recompensas, subidas de nivel y misiones cuadran desde el HUD hasta la pantalla de resultados.',
    ],
    gallery: { enlarge: 'Ampliar', prev: 'Anterior', next: 'Siguiente', close: 'Cerrar' },
    captions: {
      'screen-lobby': ['Lobby · inicio', 'Jugador y grupo, equipamiento en un expositor 3D, misiones y novedades.'],
      'screen-title': ['Pantalla de título', ''],
      'screen-play': ['Jugar · modo, mapa y grupo', ''],
      'screen-armory': ['Arsenal · estadísticas, acabados y vista 3D', ''],
      'screen-shop': ['Tienda · destacado y catálogo', ''],
      'screen-missions': ['Misiones · progreso diario y semanal', ''],
      'screen-match-found': ['Matchmaking · partida encontrada con cuenta atrás', ''],
      'screen-hud': ['HUD de partida', ''],
      'screen-scoreboard': ['Puntuaciones (mantener Tab)', ''],
      'screen-results': ['Resultados · parte de tiro y recompensas', ''],
      'component-button-states': ['Variantes × estados de botón', 'Primary, claim, light, secondary, ghost y danger en default, hover, pressed, focus, disabled y loading.'],
      'component-purchase-dialog': ['Diálogo de confirmación', 'Modal único con el foco atrapado; el botón de confirmar enfocado muestra su subrayado.'],
      'component-controls': ['Controles, etiquetas y avisos', 'Segmentados (con una opción desactivada), interruptores, deslizador con pasos, etiquetas de rareza y estado, teclas, botones de icono, barras y avisos.'],
      'component-party': ['Panel de grupo', 'Estado listo, corona del líder, expulsar y nombres largos cortados con limpieza.'],
      'component-shop-cards': ['Tarjetas y filtros de tienda', 'Pestañas de categoría, orden, filtro de comprados y tarjetas con vista 3D, rareza y bloqueo.'],
      'component-mission-cards': ['Tarjetas de misión', 'Progreso, recompensas y estado; una misión completada pasa a su botón de reclamar.'],
      'component-loadout': ['Equipamiento y acción principal', 'Huecos equipados con miniaturas en ViewportFrame, el chip de modo y el botón de listo con su tecla.'],
      'component-settings': ['Filas de ajustes y vista previa', 'Deslizadores, segmentado, muestras de color e interruptores, que se previsualizan antes de aplicarlos.'],
      'component-hud-score': ['HUD · marcador, reloj y medallas', 'Puntos por equipo, reloj, objetivo y avisos de medallas apilados.'],
      'component-scoreboard': ['Puntuaciones', 'Se construye al abrirse; mientras se mantiene Tab solo cambian los valores.'],
      'component-results-cards': ['Resultados · recompensas, nivel y misiones', 'Recompensas desglosadas que suman los totales, barra de subida de nivel y progreso de misiones.'],
      'component-hud-vitals': ['HUD · vida y arma', 'Segmentos de vida y armadura, cargador y reserva, y los huecos de arma (dos paneles de esquina de la misma captura).'],
      'responsive-tablet-home': ['Tablet · 999×626 · táctil', 'Navegación con iconos y el texto en la sección actual; los huecos de equipamiento quitan la miniatura cuando son estrechos.'],
      'responsive-phone-home': ['Móvil horizontal · 844×390 · táctil', 'Navegación en riel lateral, filas de grupo compactas y la acción principal al alcance del pulgar.'],
      'responsive-phone-hud': ['HUD en móvil · táctil', 'Botones táctiles para disparar, apuntar, recargar, cambiar y usar el apoyo; la tarjeta del arma pasa abajo al centro.'],
    },
  },
};

const withText = (shots, captions) =>
  shots.map((shot) => {
    const [title, note] = captions[shot.id] ?? [shot.id, ''];
    return { ...shot, title, note, caption: note ? `${title} — ${note}` : title };
  });

export function pivotContent(lang) {
  const t = text[lang] ?? text.en;
  return {
    ...t,
    screens: withText(screens, t.captions),
    components: withText(components, t.captions),
    responsive: withText(responsive, t.captions),
  };
}

export const pivotImageIds = [...screens, ...components, ...responsive].map((shot) => ({
  id: shot.id,
  files: [`${shot.id}-${shot.thumbW}.webp`, `${shot.id}-${shot.largeW}.webp`],
}));
