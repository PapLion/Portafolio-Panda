// UI component library (/ui): standalone pieces of the PIVOT Roblox interface.
// Every board is a real render from Roblox Studio: pieces built with the project's Luau UI module or
// cloned from the running screens, placed on a neutral background. No mockups, no game scenes.
// Files: /images/ui/<id>-1280.webp and <id>-640.webp (16:10).

export const UI_ROUTE = '/ui';
export const UI_PATH = '/images/ui';

export const uiCategories = [
  { id: 'buttons', label: { en: 'Buttons & States', es: 'Botones y estados' }, blurb: { en: 'Six variants, six states, sizes, key hints and icon buttons.', es: 'Seis variantes, seis estados, tamaños, teclas e iconos.' } },
  { id: 'controls', label: { en: 'Controls', es: 'Controles' }, blurb: { en: 'Segmented controls, toggles, sliders, tags, tabs and settings rows.', es: 'Segmentados, interruptores, deslizadores, etiquetas, pestañas y ajustes.' } },
  { id: 'dialogs', label: { en: 'Panels & Dialogs', es: 'Paneles y diálogos' }, blurb: { en: 'Confirmations, receipts, pause and danger dialogs with keyboard focus.', es: 'Confirmaciones, comprobantes, pausa y diálogos de peligro con foco de teclado.' } },
  { id: 'cards', label: { en: 'Cards & Progression', es: 'Tarjetas y progreso' }, blurb: { en: 'Shop, mission, loadout, inventory, stat and reward cards.', es: 'Tarjetas de tienda, misiones, equipamiento, inventario, estadísticas y recompensas.' } },
  { id: 'social', label: { en: 'Social / Party', es: 'Social / grupo' }, blurb: { en: 'Player card, party panel, invites and matchmaking states.', es: 'Tarjeta de jugador, grupo, invitaciones y estados de matchmaking.' } },
  { id: 'hud', label: { en: 'HUD Elements', es: 'Elementos de HUD' }, blurb: { en: 'Score, medals, kill feed, vitals, weapon and scoreboard.', es: 'Marcador, medallas, registro de bajas, vida, arma y puntuaciones.' } },
  { id: 'feedback', label: { en: 'Feedback & Notices', es: 'Avisos y feedback' }, blurb: { en: 'Toasts in every tone and empty states.', es: 'Avisos de cada tono y estados vacíos.' } },
  { id: 'responsive', label: { en: 'Responsive Variants', es: 'Variantes responsive' }, blurb: { en: 'Tablet top bar and phone pieces in touch mode.', es: 'Barra de tablet y piezas de móvil en modo táctil.' } },
];

const b = (id, category, en, es) => ({ id, category, title: { en: en[0], es: es[0] }, note: { en: en[1], es: es[1] } });

export const uiBoards = [
  b('buttons-states', 'buttons', ['Button variants × states', 'Primary, claim, light, secondary, ghost and danger in default, hover, pressed, focus, disabled and loading.'], ['Variantes × estados de botón', 'Primary, claim, light, secondary, ghost y danger en default, hover, pressed, focus, disabled y loading.']),
  b('buttons-anatomy', 'buttons', ['Sizes, key hints, icon buttons', 'Small, medium and large; key hints; compact and selected; icon buttons in each state.'], ['Tamaños, teclas y botones de icono', 'Pequeño, medio y grande; teclas; compacto y seleccionado; botones de icono en cada estado.']),
  b('controls', 'controls', ['Segmented, toggle, slider', 'Segmented controls (one option disabled), toggles and sliders with steppers.'], ['Segmentado, interruptor, deslizador', 'Segmentados (una opción desactivada), interruptores y deslizadores con pasos.']),
  b('tags-indicators', 'controls', ['Tags, keycaps & indicators', 'Rarity, status and reward tags, key hints, progress bars, credits and avatars.'], ['Etiquetas, teclas e indicadores', 'Etiquetas de rareza, estado y recompensa, teclas, barras, créditos y avatares.']),
  b('settings', 'controls', ['Settings rows & live preview', 'Slider, segmented, swatch and toggle rows next to the preview they update.'], ['Filas de ajustes y vista previa', 'Filas con deslizador, segmentado, colores e interruptores junto a la vista previa que actualizan.']),
  b('navigation', 'controls', ['Tabs & navigation', 'Top bar with active tab and badge, player status, side group menu and filter bars.'], ['Pestañas y navegación', 'Barra superior con pestaña activa y aviso, estado del jugador, menú lateral y filtros.']),
  b('dialog-purchase', 'dialogs', ['Purchase confirmation', 'Balance before and after; keyboard focus on the confirm button.'], ['Confirmación de compra', 'Saldo antes y después; foco de teclado en el botón de confirmar.']),
  b('dialog-receipt', 'dialogs', ['Purchase receipt', 'Item preview, receipt details and the follow-up action.'], ['Comprobante de compra', 'Vista del artículo, datos del comprobante y la acción siguiente.']),
  b('menus', 'dialogs', ['Pause menu & danger confirmation', 'Pause actions and a destructive confirmation with the safe option focused.'], ['Pausa y confirmación de peligro', 'Acciones de pausa y una confirmación destructiva con la opción segura enfocada.']),
  b('shop-cards', 'cards', ['Inventory & shop cards', 'Weapon, gear, finish, banner and emblem cards with rarity, price and lock state.'], ['Tarjetas de inventario y tienda', 'Armas, equipo, acabados, fondos y emblemas con rareza, precio y bloqueo.']),
  b('mission-cards', 'cards', ['Mission cards', 'Claimable, in progress, item reward and claimed.'], ['Tarjetas de misión', 'Reclamable, en curso, con objeto de recompensa y reclamada.']),
  b('loadout', 'cards', ['Loadout cards & main action', 'Equipped slots, mode selector, ready button and daily missions panel.'], ['Equipamiento y acción principal', 'Huecos equipados, selector de modo, botón de listo y misiones diarias.']),
  b('inventory-stats', 'cards', ['Inventory rows & stat blocks', 'Equipped, priced and locked rows; stat bars and finish picker.'], ['Filas de inventario y estadísticas', 'Filas equipadas, con precio y bloqueadas; barras de estadísticas y acabados.']),
  b('profile', 'cards', ['Career stats & match history', 'Stat tiles and a match history table.'], ['Estadísticas e historial', 'Bloques de estadísticas y tabla de partidas.']),
  b('results-rewards', 'cards', ['Rewards, level-up & missions', 'Itemised rewards with totals, level bar and mission progress.'], ['Recompensas, nivel y misiones', 'Recompensas desglosadas con totales, barra de nivel y progreso de misiones.']),
  b('results-report', 'cards', ['Match report card', 'Printed-paper report with stamp, score and team tables.'], ['Parte de la partida', 'Parte en papel con sello, marcador y tablas por equipo.']),
  b('social', 'social', ['Player card, party & invites', 'Party rows with ready state and an invite dialog with every friend status.'], ['Jugador, grupo e invitaciones', 'Filas de grupo con estado listo y diálogo de invitación con cada estado de amigo.']),
  b('matchmaking', 'social', ['Matchmaking states', 'Ready and searching buttons, mode chip and the match-found dialog.'], ['Estados de matchmaking', 'Botones de listo y buscando, chip de modo y diálogo de partida encontrada.']),
  b('hud', 'hud', ['HUD widgets', 'Score and clock, medals, kill feed, vitals and weapon panel.'], ['Widgets de HUD', 'Marcador y reloj, medallas, registro de bajas, vida y panel de arma.']),
  b('scoreboard', 'hud', ['Scoreboard', 'Team tables with the local player row highlighted.'], ['Puntuaciones', 'Tablas por equipo con la fila del jugador resaltada.']),
  b('feedback', 'feedback', ['Toasts & empty states', 'Reward, level, success, info, warning and error notices; empty states with and without action.'], ['Avisos y estados vacíos', 'Avisos de recompensa, nivel, éxito, info, aviso y error; estados vacíos con y sin acción.']),
  b('responsive', 'responsive', ['Tablet & phone pieces', 'Icon top bar for tablets; side rail, compact rows and touch controls for phones.'], ['Piezas de tablet y móvil', 'Barra de iconos en tablet; riel lateral, filas compactas y controles táctiles en móvil.']),
];

export const uiHero = { id: 'hero', title: { en: 'Component montage', es: 'Montaje de componentes' } };

export const uiImage = (id) => ({
  src: `${UI_PATH}/${id}-1280.webp`,
  srcset: `${UI_PATH}/${id}-640.webp 640w, ${UI_PATH}/${id}-1280.webp 1280w`,
  width: 1280,
  height: 800,
});
