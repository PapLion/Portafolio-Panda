// Stylized Fantasy RPG — UI Component Library ("Vellum"), the second collection on /ui.
// Every image is a real render of a working component in Roblox Studio (native GUI objects + Luau), captured
// in isolation at 2× on a neutral canvas. No game screens: there is no game behind the components.
// Source: PapLion/Roblox-Scripting-Work → RPG-UI-Library (captures/*.png).
// Files: /images/ui/rpg/<id>-800.webp and <id>-1600.webp (natural aspect ratio; widths below are real).

export const RPG_PATH = '/images/ui/rpg';

export const rpgCategories = [
  { id: 'controls', label: { en: 'Buttons & Controls', es: 'Botones y controles' }, blurb: { en: 'Gilded, leather, ghost, danger and arcane buttons in every state, plus value controls.', es: 'Botones dorados, de cuero, ghost, peligro y arcanos en cada estado, y controles de valor.' } },
  { id: 'inventory', label: { en: 'Inventory', es: 'Inventario' }, blurb: { en: 'Drag-and-drop satchel with filters, search, sorting and comparison tooltips.', es: 'Inventario con arrastrar y soltar, filtros, búsqueda, orden y comparación.' } },
  { id: 'character', label: { en: 'Character & Equipment', es: 'Personaje y equipo' }, blurb: { en: 'Paperdoll, attribute allocation, derived stats, vitals and experience.', es: 'Muñeco de equipo, reparto de atributos, estadísticas, vitales y experiencia.' } },
  { id: 'skills', label: { en: 'Skills & Abilities', es: 'Habilidades' }, blurb: { en: 'Skill tree with prerequisites and ranks, ability bar and ability cards.', es: 'Árbol con requisitos y rangos, barra de habilidades y fichas.' } },
  { id: 'quests', label: { en: 'Quests & Progression', es: 'Misiones y progreso' }, blurb: { en: 'Quest journal, cards, tracker, achievements and level-up.', es: 'Diario de misiones, tarjetas, seguimiento, logros y subida de nivel.' } },
  { id: 'commerce', label: { en: 'Crafting & Commerce', es: 'Artesanía y comercio' }, blurb: { en: 'Crafting station, vendor and purchase confirmation on local state.', es: 'Estación de artesanía, mercader y confirmación de compra con estado local.' } },
  { id: 'feedback', label: { en: 'Feedback & Overlays', es: 'Avisos y overlays' }, blurb: { en: 'Toasts, reward popup, rings, tags, tooltip and context menu.', es: 'Avisos, recompensa, anillos, etiquetas, tooltip y menú contextual.' } },
];

const b = (id, category, w, h, en, es) => ({ id, category, w, h, title: { en: en[0], es: es[0] }, note: { en: en[1], es: es[1] } });

export const rpgBoards = [
  b('skill-tree', 'skills', 1600, 972, ['Skill tree', 'Three branches with prerequisites, row gates and ranks. Inspect a node, learn or unlearn with local points; paths light up as they unlock.'], ['Árbol de habilidades', 'Tres ramas con requisitos, umbrales por fila y rangos. Inspecciona un nodo, aprende o desaprende con puntos locales; los caminos se iluminan al desbloquearse.']),
  b('inventory', 'inventory', 1600, 1485, ['Satchel inventory', 'Drag to move, swap or merge stacks; filter by category, search, sort, and compare against equipped gear in the tooltip.'], ['Inventario', 'Arrastra para mover, intercambiar o juntar montones; filtra por categoría, busca, ordena y compara con lo equipado en el tooltip.']),
  b('equipment', 'character', 1600, 1156, ['Equipment & attributes', 'Paperdoll slots with an item chooser, attribute points with commit and undo, and derived stats that update as gear changes.'], ['Equipo y atributos', 'Huecos del muñeco con selector de objetos, puntos de atributo con confirmar y deshacer, y estadísticas que cambian con el equipo.']),
  b('item-tooltips', 'inventory', 1600, 585, ['Item tooltips', 'Rarity headers, stat comparison against the equipped item, effects, lore, stack value and weight.'], ['Tooltips de objeto', 'Cabecera por rareza, comparación con el objeto equipado, efectos, historia, valor del montón y peso.']),
  b('buttons', 'controls', 1600, 590, ['Button variants × states', 'Gilded primary, leather secondary, ghost, danger and arcane in default, hover, pressed, focus, selected, disabled and loading.'], ['Variantes × estados de botón', 'Primario dorado, secundario de cuero, ghost, peligro y arcano en reposo, hover, pulsado, foco, seleccionado, desactivado y cargando.']),
  b('controls', 'controls', 1600, 751, ['Controls', 'Icon buttons, rune toggles, checks and radios, segmented control, gem sliders, an open dropdown and search.'], ['Controles', 'Botones de icono, interruptores, casillas y radios, segmentado, deslizadores, un desplegable abierto y búsqueda.']),
  b('character-card', 'character', 1140, 1090, ['Character card & vitals', 'Crest portrait with an experience ring, class and points tags, health, mana and stamina bars, and experience.'], ['Ficha de personaje', 'Retrato con anillo de experiencia, clase y puntos, barras de vida, maná y aguante, y experiencia.']),
  b('ability-bar', 'skills', 1600, 486, ['Ability bar', 'Keybound abilities mid-cooldown with countdowns, a toggled ability, mana costs that turn red when short, and a locked slot.'], ['Barra de habilidades', 'Habilidades con tecla en enfriamiento con cuenta atrás, una activada, costes de maná en rojo si falta y un hueco bloqueado.']),
  b('ability-cards', 'skills', 1600, 425, ['Ability cards', 'School and ultimate tags, rank pips, cost, cooldown, cast time and range, and a locked ability.'], ['Fichas de habilidad', 'Escuela y definitiva, rangos, coste, enfriamiento, lanzamiento y alcance, y una habilidad bloqueada.']),
  b('quest-log', 'quests', 1600, 1086, ['Quest journal', 'Active and completed tabs, quest cards in every status, and a parchment page with objectives, rewards and actions.'], ['Diario de misiones', 'Pestañas de activas y completadas, tarjetas en cada estado y una página de pergamino con objetivos, recompensas y acciones.']),
  b('quest-cards', 'quests', 1600, 753, ['Quest cards', 'Tracked, in progress, ready to turn in, completed and locked.'], ['Tarjetas de misión', 'Seguida, en curso, lista para entregar, completada y bloqueada.']),
  b('quest-tracker', 'quests', 990, 965, ['Quest tracker', 'A compact tracking widget whose objectives tick off as they complete.'], ['Seguimiento de misiones', 'Widget compacto cuyos objetivos se marcan al completarse.']),
  b('achievements', 'quests', 1600, 697, ['Achievements', 'Unlocked with a wax seal, in progress, locked and hidden, each with its point value.'], ['Logros', 'Desbloqueados con sello de lacre, en curso, bloqueados y ocultos, con sus puntos.']),
  b('level-up', 'quests', 1540, 1090, ['Level-up presentation', 'Rotating rays, the new level in its keystone frame, a ribbon banner and staggered gains.'], ['Subida de nivel', 'Rayos giratorios, el nuevo nivel en su marco, un estandarte y las mejoras escalonadas.']),
  b('crafting', 'commerce', 1600, 1064, ['Crafting station', 'Recipes with craftable counts, have / need materials, quantity, and timed crafting that can be cancelled.'], ['Estación de artesanía', 'Recetas con cantidad posible, materiales que tienes / necesitas, cantidad y fabricación con tiempo que se puede cancelar.']),
  b('vendor', 'commerce', 1600, 1016, ['Vendor', 'Buy and sell modes, wallet, stock, discounts, sold-out items and prices you cannot afford.'], ['Mercader', 'Comprar y vender, monedero, existencias, descuentos, agotados y precios que no te alcanzan.']),
  b('purchase-dialog', 'commerce', 1540, 1315, ['Purchase confirmation', 'Quantity slider, balance, total and balance after purchase; confirm refuses when gold runs short.'], ['Confirmación de compra', 'Cantidad, saldo, total y saldo tras la compra; confirmar se bloquea si falta oro.']),
  b('loot-reveal', 'feedback', 1490, 1040, ['Reward popup', 'Turning rays, the coffer, and rewards popping in by rarity.'], ['Recompensa', 'Rayos giratorios, el cofre y las recompensas apareciendo por rareza.']),
  b('toasts', 'feedback', 1040, 1280, ['Toast notifications', 'Reward, quest, success, info, warning and error, with item badges.'], ['Avisos', 'Recompensa, misión, éxito, info, aviso y error, con insignias de objeto.']),
  b('feedback-kit', 'feedback', 1600, 668, ['Indicators & overlays', 'Progress rings, loading rune, rarity and status tags, currency, a tooltip and a context menu.'], ['Indicadores y overlays', 'Anillos de progreso, runa de carga, etiquetas de rareza y estado, monedas, un tooltip y un menú contextual.']),
];

export const rpgCover = 'skill-tree';
export const rpgFeatured = ['inventory', 'equipment', 'item-tooltips', 'quest-log'];

export const rpgImage = (board) => {
  const small = Math.min(800, board.w);
  return {
    src: `${RPG_PATH}/${board.id}-1600.webp`,
    srcset: `${RPG_PATH}/${board.id}-800.webp ${small}w, ${RPG_PATH}/${board.id}-1600.webp ${board.w}w`,
    width: board.w,
    height: board.h,
  };
};
