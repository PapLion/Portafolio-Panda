// Single source of truth for the 3D modeling gallery.
// Used by /3d-modeling, the home teaser and the Roblox / Game Dev preview.
// `src` is the render filename inside the Blender project's renders/ folder;
// scripts/build-3d-images.mjs reads it to generate the optimized web images.
// Triangle, part and material counts come from the verified FBX export
// (export_manifest.json + reimport verify_report.txt, ALL_OK).

export const IMAGE_BASE = '/images/3d';

export const IMAGE_WIDTHS = {
  square: [480, 960, 1600],
  wide: [800, 1280, 2000],
};

export const categories = [
  {
    id: 'environment',
    label: { en: 'Props & environment', es: 'Props y entorno' },
    blurb: {
      en: 'Street, shop and interior props built as reusable pieces, plus a compact car.',
      es: 'Props de calle, tienda e interiores pensados como piezas reutilizables, y un coche compacto.',
    },
  },
  {
    id: 'characters',
    label: { en: 'Characters & creatures', es: 'Personajes y criaturas' },
    blurb: {
      en: 'Stylized characters, enemies and a rideable mount with tack as separate parts.',
      es: 'Personajes estilizados, enemigos y una montura con su equipo en piezas separadas.',
    },
  },
  {
    id: 'shooter',
    label: { en: 'Shooter weapons & gear', es: 'Armas y equipo shooter' },
    blurb: {
      en: 'Original firearms with moving parts split and pivoted for animation.',
      es: 'Armas de fuego originales con las piezas móviles separadas y con pivote para animar.',
    },
  },
  {
    id: 'weapons',
    label: { en: 'Weapons & tools', es: 'Armas y herramientas' },
    blurb: {
      en: 'RPG weapons and tools with the pivot placed at the grip.',
      es: 'Armas y herramientas RPG con el pivote colocado en el agarre.',
    },
  },
];

const V = {
  hero: { en: 'Main view', es: 'Vista principal' },
  detail: { en: 'Detail', es: 'Detalle' },
  side: { en: 'Side', es: 'Lateral' },
  left: { en: 'Profile', es: 'Perfil' },
  back: { en: 'Back', es: 'Posterior' },
  front: { en: 'Front', es: 'Frontal' },
  wireframe: { en: 'Wireframe · real triangle count', es: 'Wireframe · conteo real de triángulos' },
};

const view = (id, src, label = V[id], extra = {}) => ({ id, src, label, shape: 'square', ...extra });

export const models = [
  {
    slug: 'urban-corner',
    kind: 'scene',
    category: 'environment',
    order: 9,
    name: { en: 'Urban corner scene', es: 'Escena de esquina urbana' },
    summary: {
      en: 'The six urban props placed together on a simple floor and walls, with a grey Roblox-style mannequin (1.50 m) for scale.',
      es: 'Los seis props urbanos colocados juntos sobre un suelo y paredes sencillas, con un maniquí gris estilo Roblox (1,50 m) como escala.',
    },
    includes: ['vending-machine', 'shop-shelf', 'waste-container', 'park-bench', 'street-lamp', 'ac-unit'],
    notes: {
      en: ['Presentation scene: the floor, walls and mannequin are not exported.'],
      es: ['Escena de presentación: el suelo, las paredes y el maniquí no se exportan.'],
    },
    views: [
      view('scene', 'urban_scene/urban_corner_scene.png', { en: 'Full scene', es: 'Escena completa' }, {
        shape: 'wide',
        // removes the caption baked into the bottom of the render
        crop: { w: 2835, h: 1890, x: 118, y: 0 },
      }),
    ],
  },
  {
    slug: 'boar-mount',
    category: 'characters',
    order: 1,
    name: { en: 'Boar mount', es: 'Montura jabalí' },
    summary: {
      en: 'Stylized boar with saddle, blanket, harness, reins, stirrups and bedroll as their own pieces, and a defined seat point for a Roblox character.',
      es: 'Jabalí estilizado con silla, manta, arnés, riendas, estribos y petate como piezas propias, y un punto de asiento definido para un personaje Roblox.',
    },
    stats: { tris: 26334, parts: 27, materials: 13 },
    structure: {
      en: 'No rig · four separate legs pivoted at shoulder / hip',
      es: 'Sin rig · cuatro patas separadas con pivote en hombro / cadera',
    },
    notes: {
      en: ['Head and body are one mesh; no animations.', 'Heavier piece: a LOD is advisable for large maps.'],
      es: ['Cabeza y cuerpo son una sola malla; sin animaciones.', 'Pieza pesada: para mapas grandes conviene un LOD.'],
    },
    views: [
      view('hero', 'boarmount/boarmount_hero.png'),
      view('scale', 'boarmount/boarmount_scale.png', { en: 'Scale with a seated R6 mannequin', es: 'Escala con un maniquí R6 sentado' }),
      view('detail', 'boarmount/boarmount_detail.png', { en: 'Detail · head and tusks', es: 'Detalle · cabeza y colmillos' }),
      view('side', 'boarmount/boarmount_side.png'),
      view('wireframe', 'boarmount/boarmount_wireframe.png'),
    ],
  },
  {
    slug: 'vending-machine',
    category: 'environment',
    order: 2,
    name: { en: 'Vending machine', es: 'Máquina expendedora' },
    summary: {
      en: 'Fictional QUENCHO brand machine with products visible behind glass, keypad, payment slot and pickup flap. The 25 drinks are reusable instances.',
      es: 'Máquina de la marca ficticia QUENCHO con productos visibles tras el cristal, botonera, ranura de pago y trampilla de recogida. Las 25 bebidas son instancias reutilizables.',
    },
    stats: { tris: 21478, parts: 19, materials: 13 },
    triNote: { en: '7,898 machine + 13,580 baked stock', es: '7.898 máquina + 13.580 del stock horneado' },
    structure: {
      en: 'Pickup flap pivoted at its hinge · separate glass and emissive sign',
      es: 'Trampilla con pivote en la bisagra · cristal y rótulo emisivo separados',
    },
    notes: {
      en: ['No internal mechanism is modeled.'],
      es: ['No se modela ningún mecanismo interno.'],
    },
    views: [
      view('hero', 'vendingmachine/vendingmachine_hero.png'),
      view('detail', 'vendingmachine/vendingmachine_detail.png', { en: 'Detail · stock, keypad and payment', es: 'Detalle · stock, botonera y pago' }),
      view('side', 'vendingmachine/vendingmachine_side.png'),
      view('wireframe', 'vendingmachine/vendingmachine_wireframe.png'),
    ],
  },
  {
    slug: 'skeleton-warrior',
    category: 'characters',
    order: 3,
    name: { en: 'Skeleton warrior', es: 'Esqueleto guerrero' },
    summary: {
      en: 'Blocky stylized enemy with readable bones, open ribcage, riveted shoulder plates and glowing eyes. Rusty sword and broken buckler are separate assets.',
      es: 'Enemigo estilizado de proporciones de bloque con huesos legibles, costillar abierto, hombrera de láminas remachada y ojos brillantes. La espada oxidada y la rodela rota son assets aparte.',
    },
    stats: { tris: 18390, parts: 23, materials: 6 },
    triNote: { en: '+ sword 364 · buckler 1,682', es: '+ espada 364 · rodela 1.682' },
    structure: {
      en: 'Segmented into 15 R15-style parts pivoted at the joints · no rig',
      es: 'Segmentado en 15 partes estilo R15 con pivote en las articulaciones · sin rig',
    },
    notes: {
      en: ['Not rigged: it needs Motor6D joints or an R15 rig to animate.'],
      es: ['Sin rig: para animarlo hacen falta uniones Motor6D o un rig R15.'],
    },
    views: [
      view('hero', 'skeleton/skeleton_hero.png'),
      view('detail', 'skeleton/skeleton_detail.png', { en: 'Detail · skull', es: 'Detalle · cráneo' }),
      view('front', 'skeleton/skeleton_front.png'),
      view('wireframe', 'skeleton/skeleton_wireframe.png'),
    ],
  },
  {
    slug: 'pump-shotgun',
    category: 'shooter',
    order: 4,
    name: { en: 'Pump shotgun', es: 'Escopeta de corredera' },
    summary: {
      en: 'Original pump shotgun with a sculpted stock and grip, checkering, side shell carrier and a separate pump.',
      es: 'Escopeta de corredera original con culata y empuñadura esculpidas, picado, cartuchera lateral y corredera separada.',
    },
    stats: { tris: 6344, parts: 12, materials: 7 },
    structure: {
      en: 'Pump and bolt split with their own pivots',
      es: 'Corredera y cerrojo separados con pivote propio',
    },
    views: [
      view('hero', 'shotgun/shotgun_hero.png'),
      view('left', 'shotgun/shotgun_left.png'),
      view('detail', 'shotgun/shotgun_detail.png', { en: 'Detail · receiver and shell carrier', es: 'Detalle · cajón y cartuchera' }),
      view('wireframe', 'shotgun/shotgun_wireframe.png'),
    ],
  },
  {
    slug: 'compact-car',
    category: 'environment',
    order: 5,
    name: { en: 'Compact car', es: 'Coche compacto' },
    summary: {
      en: 'Original compact car with curved bodywork, bezel headlights, spoked rims with brake discs and calipers, and a basic interior.',
      es: 'Coche compacto original con carrocería curvada, faros con bisel, llantas de radios con disco y pinza de freno, e interior básico.',
    },
    stats: { tris: 25156, parts: 26, materials: 10 },
    structure: {
      en: 'Four separate wheels pivoted at the hub · separate steering wheel',
      es: 'Cuatro ruedas separadas con pivote en el buje · volante separado',
    },
    notes: {
      en: ['Doors, hood and tailgate are not separate pieces.', 'Model only, no driving system. Heavier piece: a LOD is advisable.'],
      es: ['Puertas, capó y portón no son piezas separadas.', 'Solo el modelo, sin sistema de conducción. Pieza pesada: conviene un LOD.'],
    },
    views: [
      view('hero', 'car/car_hero.png'),
      view('side', 'car/car_side.png'),
      view('detail', 'car/car_detail.png', { en: 'Detail · headlight and wheel', es: 'Detalle · faro y rueda' }),
      view('wireframe', 'car/car_wireframe.png'),
    ],
  },
  {
    slug: 'shop-shelf',
    category: 'environment',
    order: 6,
    name: { en: 'Modular shop shelf', es: 'Estantería modular de tienda' },
    summary: {
      en: 'Shelf unit with four boards, price strips and header, stocked with 58 instances of four reusable products. Colour variants share the same mesh.',
      es: 'Estantería con cuatro baldas, tiras de precios y cartel, llena con 58 instancias de cuatro productos reutilizables. Las variantes de color comparten la misma malla.',
    },
    stats: { tris: 5664, parts: 13, materials: 5 },
    triNote: { en: 'structure only · 32,768 with stock', es: 'solo estructura · 32.768 con stock' },
    structure: {
      en: 'Boards as separate pieces · products exported individually (124–596 tris each)',
      es: 'Baldas como piezas separadas · productos exportados por separado (124–596 tris cada uno)',
    },
    notes: {
      en: ['For large shops, place the structure and individual products instead of the baked stocked version.'],
      es: ['En tiendas grandes conviene usar la estructura y colocar productos sueltos en lugar de la versión con stock horneado.'],
    },
    views: [
      view('hero', 'shelf/shelf_hero.png'),
      view('detail', 'shelf/shelf_detail.png', { en: 'Detail · products on the boards', es: 'Detalle · productos en las baldas' }),
      view('products', 'shelf/shelf_products.png', { en: 'Reusable products', es: 'Productos reutilizables' }),
      view('wireframe', 'shelf/shelf_wireframe.png'),
    ],
  },
  {
    slug: 'guard',
    category: 'characters',
    order: 7,
    name: { en: 'Guard (official R15 body)', es: 'Guardia (cuerpo R15 oficial)' },
    summary: {
      en: 'Original guard outfit (plumed helmet, breastplate with emblem, pauldrons, cape, scarf, belt and face) built on Roblox’s official character reference body. Each outfit piece is weighted to its bone.',
      es: 'Uniforme de guardia original (yelmo con penacho, peto con emblema, hombreras, capa, bufanda, cinturón y cara) sobre el cuerpo de referencia oficial de Roblox. Cada pieza del uniforme está pesada a su hueso.',
    },
    stats: { tris: 12854, parts: 35, materials: 10, bones: 51 },
    structure: {
      en: 'Official Roblox R15 armature (51 bones) · outfit skinned to the rig',
      es: 'Armature R15 oficial de Roblox (51 huesos) · uniforme pesado al rig',
    },
    notes: {
      en: [
        'Body, dynamic head and rig come from Roblox’s official reference files (Creator Hub); the outfit and facial features are my work.',
        'No animations; import as an avatar / NPC in Roblox Studio not yet tested.',
      ],
      es: [
        'El cuerpo, la cabeza dinámica y el rig son los archivos de referencia oficiales de Roblox (Creator Hub); el uniforme y los rasgos de la cara son trabajo propio.',
        'Sin animaciones; la importación como avatar / NPC en Roblox Studio está pendiente de probar.',
      ],
    },
    views: [
      view('hero', 'guard/guard_hero.png'),
      view('detail', 'guard/guard_detail.png', { en: 'Detail · face and helmet', es: 'Detalle · cara y yelmo' }),
      view('back', 'guard/guard_back.png', { en: 'Back · cape', es: 'Posterior · capa' }),
      view('wireframe', 'guard/guard_wireframe.png'),
    ],
  },
  {
    slug: 'waste-container',
    category: 'environment',
    order: 8,
    name: { en: 'Waste container', es: 'Contenedor de residuos' },
    summary: {
      en: 'Wheeled container with ribbed body, side handles, brake pedals and light, controlled wear.',
      es: 'Contenedor con ruedas, cuerpo con nervios, asas laterales, pedales de freno y un desgaste ligero y controlado.',
    },
    stats: { tris: 10404, parts: 14, materials: 8 },
    structure: {
      en: 'Lid pivoted at the rear hinges · four wheels pivoted at the axle',
      es: 'Tapa con pivote en las bisagras traseras · cuatro ruedas con pivote en el eje',
    },
    views: [
      view('hero', 'dumpster/dumpster_hero.png'),
      view('detail', 'dumpster/dumpster_detail.png', { en: 'Detail · caster and brake', es: 'Detalle · rueda y freno' }),
      view('side', 'dumpster/dumpster_side.png'),
      view('wireframe', 'dumpster/dumpster_wireframe.png'),
    ],
  },
  {
    slug: 'slime-boss',
    category: 'characters',
    order: 10,
    name: { en: 'Slime boss', es: 'Slime jefe' },
    summary: {
      en: 'Glossy jelly droplet with simple eyes and mouth projected onto its surface and a broken gold crown sunk into the tip.',
      es: 'Gota de gelatina brillante con ojos y boca sencillos proyectados sobre la superficie y una corona de oro rota hundida en la punta.',
    },
    stats: { tris: 7402, parts: 6, materials: 6 },
    structure: {
      en: 'No rig · eyes, mouth and crown are separate pieces',
      es: 'Sin rig · ojos, boca y corona son piezas separadas',
    },
    notes: {
      en: ['No rig, blendshapes or jelly deformation.'],
      es: ['Sin rig, blendshapes ni deformación de gelatina.'],
    },
    views: [
      view('hero', 'slimeboss/slimeboss_hero.png'),
      view('detail', 'slimeboss/slimeboss_detail.png', { en: 'Detail · face', es: 'Detalle · cara' }),
      view('side', 'slimeboss/slimeboss_side.png'),
      view('wireframe', 'slimeboss/slimeboss_wireframe.png'),
    ],
  },
  {
    slug: 'compact-rifle',
    category: 'shooter',
    order: 11,
    name: { en: 'Compact assault rifle', es: 'Rifle de asalto compacto' },
    summary: {
      en: 'Original two-tone rifle with rounded grip and stock, cheek riser, rail and takedown pins.',
      es: 'Rifle original bicolor con empuñadura y culata redondeadas, carrillera, riel y pasadores.',
    },
    stats: { tris: 5186, parts: 12, materials: 6 },
    structure: {
      en: 'Bolt, magazine, trigger and selector split with their own pivots',
      es: 'Cerrojo, cargador, gatillo y selector separados con pivote propio',
    },
    views: [
      view('hero', 'rifle/rifle_hero.png'),
      view('left', 'rifle/rifle_left.png'),
      view('detail', 'rifle/rifle_detail.png', { en: 'Detail · receiver', es: 'Detalle · cajón de mecanismos' }),
      view('wireframe', 'rifle/rifle_wireframe.png'),
    ],
  },
  {
    slug: 'park-bench',
    category: 'environment',
    order: 12,
    name: { en: 'Park bench', es: 'Banco de parque' },
    summary: {
      en: 'Wooden-slat bench on a cast metal frame with armrests and bolts, sized for Roblox characters.',
      es: 'Banco de listones de madera sobre estructura de fundición con reposabrazos y tornillos, a la medida de personajes Roblox.',
    },
    stats: { tris: 8484, parts: 6, materials: 2 },
    structure: {
      en: 'Static prop · two seat points defined on the root',
      es: 'Prop estático · dos puntos de asiento definidos en la raíz',
    },
    views: [
      view('hero', 'bench/bench_hero.png'),
      view('detail', 'bench/bench_detail.png', { en: 'Detail · armrest and slats', es: 'Detalle · reposabrazos y listones' }),
      view('side', 'bench/bench_side.png'),
      view('wireframe', 'bench/bench_wireframe.png'),
    ],
  },
  {
    slug: 'ac-unit',
    category: 'environment',
    order: 13,
    name: { en: 'Outdoor AC unit', es: 'Aire acondicionado exterior' },
    summary: {
      en: 'Wall-mounted outdoor unit with fan grille, simplified fan, rear fins, brackets and insulated pipes.',
      es: 'Unidad exterior de pared con rejilla, ventilador simplificado, aletas traseras, soportes y tuberías aisladas.',
    },
    stats: { tris: 9372, parts: 11, materials: 8 },
    structure: {
      en: 'Fan as a separate piece pivoted at its centre · pivot on the wall plane',
      es: 'Ventilador como pieza aparte con pivote central · pivote en el plano de la pared',
    },
    views: [
      view('hero', 'acunit/acunit_hero.png'),
      view('detail', 'acunit/acunit_detail.png', { en: 'Detail · fan and grille', es: 'Detalle · ventilador y rejilla' }),
      view('back', 'acunit/acunit_back.png'),
      view('wireframe', 'acunit/acunit_wireframe.png'),
    ],
  },
  {
    slug: 'semi-auto-pistol',
    category: 'shooter',
    order: 14,
    name: { en: 'Semi-auto pistol', es: 'Pistola semiautomática' },
    summary: {
      en: 'Original pistol with a rounded grip, stippled texture and front slide serrations.',
      es: 'Pistola original con empuñadura redondeada, punteado de agarre y estrías delanteras en la corredera.',
    },
    stats: { tris: 3654, parts: 7, materials: 4 },
    structure: {
      en: 'Slide, barrel, magazine and trigger split with their own pivots',
      es: 'Corredera, cañón, cargador y gatillo separados con pivote propio',
    },
    views: [
      view('hero', 'pistol/pistol_hero.png'),
      view('left', 'pistol/pistol_left.png'),
      view('detail', 'pistol/pistol_detail.png', { en: 'Detail · slide and grip', es: 'Detalle · corredera y empuñadura' }),
      view('wireframe', 'pistol/pistol_wireframe.png'),
    ],
  },
  {
    slug: 'shooter-set',
    kind: 'set',
    category: 'shooter',
    order: 18,
    name: { en: 'Shooter set', es: 'Conjunto shooter' },
    summary: {
      en: 'Pistol, rifle, shotgun and ammo box rendered together to show a consistent style across the kit.',
      es: 'Pistola, rifle, escopeta y caja de munición juntas para mostrar un estilo coherente en todo el kit.',
    },
    includes: ['semi-auto-pistol', 'compact-rifle', 'pump-shotgun', 'ammo-box'],
    views: [
      view('set', 'shooter_collection/shooter_collection_beauty.png', { en: 'Set', es: 'Conjunto' }, { shape: 'wide' }),
      view('wireframe', 'shooter_collection/shooter_collection_wireframe.png', V.wireframe, { shape: 'wide' }),
    ],
  },
  {
    slug: 'street-lamp',
    category: 'environment',
    order: 15,
    name: { en: 'Street lamp', es: 'Farola' },
    summary: {
      en: 'Street lamp with a curved arm, access hatch, collars and a modern luminaire with an emissive diffuser.',
      es: 'Farola con brazo curvo, tapa de registro, collarines y una luminaria moderna con difusor emisivo.',
    },
    stats: { tris: 5494, parts: 5, materials: 3 },
    structure: {
      en: 'Static prop · separate emissive diffuser',
      es: 'Prop estático · difusor emisivo separado',
    },
    views: [
      view('hero', 'streetlamp/streetlamp_hero.png'),
      view('detail', 'streetlamp/streetlamp_detail.png', { en: 'Detail · luminaire', es: 'Detalle · luminaria' }),
      view('wireframe', 'streetlamp/streetlamp_wireframe.png'),
    ],
  },
  {
    slug: 'round-shield',
    category: 'weapons',
    order: 16,
    name: { en: 'Round shield', es: 'Escudo redondo' },
    summary: {
      en: 'Plank shield with a riveted steel rim, brass boss, painted star and leather back straps.',
      es: 'Escudo de tablas con aro de acero remachado, umbo de latón, estrella pintada y correas de cuero detrás.',
    },
    stats: { tris: 3340, parts: 6, materials: 6 },
    structure: {
      en: 'Static tool · pivot at the centre of the back handle',
      es: 'Herramienta estática · pivote en el centro del asa trasera',
    },
    views: [
      view('hero', 'shield/shield_hero.png'),
      view('back', 'shield/shield_back.png', { en: 'Back · straps', es: 'Posterior · correas' }),
      view('detail', 'shield/shield_detail.png', { en: 'Detail · boss and rim', es: 'Detalle · umbo y aro' }),
      view('wireframe', 'shield/shield_wireframe.png'),
    ],
  },
  {
    slug: 'adventurer-sword',
    category: 'weapons',
    order: 17,
    name: { en: 'Adventurer sword', es: 'Espada de aventurero' },
    summary: {
      en: 'Longsword with a fullered blade, curved guard, wrapped leather grip and a gem-set pommel.',
      es: 'Espada larga con hoja acanalada, guarda curva, empuñadura de cuero envuelta y pomo con gema.',
    },
    stats: { tris: 3018, parts: 6, materials: 3 },
    structure: {
      en: 'Static tool · pivot at the centre of the grip',
      es: 'Herramienta estática · pivote en el centro de la empuñadura',
    },
    views: [
      view('hero', 'sword/sword_hero.png'),
      view('detail', 'sword/sword_detail.png', { en: 'Detail · hilt', es: 'Detalle · empuñadura' }),
      view('wireframe', 'sword/sword_wireframe.png'),
    ],
  },
  {
    slug: 'rpg-set',
    kind: 'set',
    category: 'weapons',
    order: 23,
    name: { en: 'RPG weapons set', es: 'Conjunto de armas RPG' },
    summary: {
      en: 'Sword, axe, pickaxe, shield, hammer and dagger with sheath rendered together as one kit.',
      es: 'Espada, hacha, pico, escudo, martillo y daga con vaina juntos como un solo kit.',
    },
    includes: ['adventurer-sword', 'lumberjack-axe', 'mining-pickaxe', 'round-shield', 'blacksmith-hammer', 'dagger'],
    views: [
      view('set', 'collection/collection_beauty.png', { en: 'Set', es: 'Conjunto' }, { shape: 'wide' }),
      view('wireframe', 'collection/collection_wireframe.png', V.wireframe, { shape: 'wide' }),
    ],
  },
  {
    slug: 'dagger',
    category: 'weapons',
    order: 19,
    name: { en: 'Dagger & sheath', es: 'Daga y vaina' },
    summary: {
      en: 'Dagger with brass bands, wrapped grip and a gem in the guard, with a matching leather sheath.',
      es: 'Daga con anillos de latón, empuñadura envuelta y gema en la guarda, con su vaina de cuero a juego.',
    },
    stats: { tris: 2682, parts: 8, materials: 4 },
    triNote: { en: 'dagger 2,112 + sheath 570', es: 'daga 2.112 + vaina 570' },
    structure: {
      en: 'Sheath as a separate asset sharing the dagger’s pivot (sheathed when aligned)',
      es: 'Vaina como asset aparte con el mismo pivote que la daga (envainada al alinearlas)',
    },
    views: [
      view('hero', 'dagger/dagger_hero.png'),
      view('front', 'dagger/dagger_front.png', { en: 'With sheath', es: 'Con vaina' }),
      view('detail', 'dagger/dagger_detail.png', { en: 'Detail · grip', es: 'Detalle · empuñadura' }),
      view('wireframe', 'dagger/dagger_wireframe.png'),
    ],
  },
  {
    slug: 'blacksmith-hammer',
    category: 'weapons',
    order: 20,
    name: { en: 'Blacksmith hammer', es: 'Martillo de herrero' },
    summary: {
      en: 'Cross-peen hammer with a faceted head, side straps, copper collar and a tapered handle.',
      es: 'Martillo de peña con cabeza facetada, pletinas laterales, collar de cobre y mango ahusado.',
    },
    stats: { tris: 1378, parts: 6, materials: 4 },
    structure: {
      en: 'Static tool · pivot at the grip',
      es: 'Herramienta estática · pivote en la zona de agarre',
    },
    views: [
      view('hero', 'hammer/hammer_hero.png'),
      view('detail', 'hammer/hammer_detail.png', { en: 'Detail · head', es: 'Detalle · cabeza' }),
      view('wireframe', 'hammer/hammer_wireframe.png'),
    ],
  },
  {
    slug: 'ammo-box',
    category: 'shooter',
    order: 21,
    name: { en: 'Ammo box', es: 'Caja de munición' },
    summary: {
      en: 'Military-style ammo box with ribbed body, folding handle, latch and label plate.',
      es: 'Caja de munición de estilo militar con cuerpo nervado, asa abatible, cierre y placa de etiqueta.',
    },
    stats: { tris: 1768, parts: 8, materials: 5 },
    structure: {
      en: 'Lid, latch and handle split and pivoted on their hinge axes',
      es: 'Tapa, cierre y asa separados con pivote en sus ejes de bisagra',
    },
    views: [
      view('hero', 'ammobox/ammobox_hero.png'),
      view('detail', 'ammobox/ammobox_detail.png', { en: 'Detail · latch and handle', es: 'Detalle · cierre y asa' }),
      view('wireframe', 'ammobox/ammobox_wireframe.png'),
    ],
  },
  {
    slug: 'mining-pickaxe',
    category: 'weapons',
    order: 22,
    name: { en: 'Mining pickaxe', es: 'Pico de minería' },
    summary: {
      en: 'Pickaxe with a curved steel head, riveted socket, wrapped grip and capped handle.',
      es: 'Pico con cabeza de acero curvada, ojo remachado, agarre envuelto y mango con contera.',
    },
    stats: { tris: 2232, parts: 6, materials: 5 },
    structure: {
      en: 'Static tool · pivot at the lower grip',
      es: 'Herramienta estática · pivote en el agarre inferior',
    },
    views: [
      view('hero', 'pickaxe/pickaxe_hero.png'),
      view('detail', 'pickaxe/pickaxe_detail.png', { en: 'Detail · head', es: 'Detalle · cabeza' }),
      view('wireframe', 'pickaxe/pickaxe_wireframe.png'),
    ],
  },
  {
    slug: 'lumberjack-axe',
    category: 'weapons',
    order: 24,
    name: { en: 'Lumberjack axe', es: 'Hacha de leñador' },
    summary: {
      en: 'Single-bit axe with a bevelled steel head, curved wooden haft and leather-wrapped grip.',
      es: 'Hacha de un filo con cabeza de acero biselada, mango de madera curvado y agarre envuelto en cuero.',
    },
    stats: { tris: 2474, parts: 5, materials: 5 },
    structure: {
      en: 'Static tool · pivot at the centre of the leather grip',
      es: 'Herramienta estática · pivote en el centro del agarre de cuero',
    },
    views: [
      view('hero', 'axe/axe_hero.png'),
      view('side', 'axe/axe_side.png'),
      view('wireframe', 'axe/axe_wireframe.png'),
    ],
  },
].sort((a, b) => a.order - b.order);

// Same facts for every exported piece (see the asset README).
export const sharedSpecs = {
  textures: {
    en: 'None · flat colour per material, UVs unwrapped',
    es: 'Ninguna · color plano por material, UVs desplegadas',
  },
  format: {
    en: 'FBX per asset · one material per part (imports as one MeshPart each)',
    es: 'FBX por asset · un material por pieza (se importa como una MeshPart cada una)',
  },
};

// Pieces surfaced on the home page and on /roblox-gamedev.
export const homeHighlights = ['boar-mount', 'vending-machine', 'skeleton-warrior', 'pump-shotgun'];
export const robloxHighlights = ['vending-machine', 'guard', 'pump-shotgun', 'boar-mount'];

export const MODELING_ROUTE = '/3d-modeling';

// 26334 -> "26.334" (es) / "26,334" (en), also for 4-digit numbers.
export function formatCount(n, lang = 'en') {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'es' ? '.' : ',');
}

export function findModel(slug) {
  return models.find((m) => m.slug === slug) ?? null;
}

export function modelsInCategory(categoryId) {
  return models.filter((m) => m.category === categoryId);
}

export function modelLink(slug) {
  return `${MODELING_ROUTE}?model=${encodeURIComponent(slug)}`;
}

// Responsive image attributes for one view of a model.
export function imageFor(model, viewItem, preferred = 'md') {
  const widths = IMAGE_WIDTHS[viewItem.shape] ?? IMAGE_WIDTHS.square;
  const base = `${IMAGE_BASE}/${model.slug}/${viewItem.id}`;
  const index = { sm: 0, md: 1, lg: 2 }[preferred] ?? 1;
  const ratio = viewItem.shape === 'wide' ? 2 / 3 : 1;
  return {
    src: `${base}-${widths[index]}.webp`,
    srcset: widths.map((w) => `${base}-${w}.webp ${w}w`).join(', '),
    width: widths[index],
    height: Math.round(widths[index] * ratio),
    full: `${base}-${widths[widths.length - 1]}.webp`,
  };
}
