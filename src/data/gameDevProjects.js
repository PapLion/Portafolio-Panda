export const gameDevMeta = {
  en: {
    eyebrow: 'Gameplay Programming · Game Systems · Technical Development',
    title: 'Gameplay Engineering & Interactive Systems',
    intro:
      'Gameplay systems and interactive mechanics developed across game engines, with a focus on reusable architecture, responsive controls, combat systems, and real-world implementation challenges.',
    robloxCallout:
      'Looking for Roblox-specific client work and Luau systems?',
    robloxCta: 'View Roblox Experience',
  },
  es: {
    eyebrow: 'Programación de Gameplay · Sistemas de Juego · Desarrollo Técnico',
    title: 'Ingeniería de Gameplay & Sistemas Interactivos',
    intro:
      'Sistemas de gameplay y mecánicas interactivas desarrolladas en distintos motores, con foco en arquitectura reutilizable, controles responsivos, sistemas de combate y retos reales de implementación.',
    robloxCallout:
      '¿Buscas trabajos específicos para clientes en Roblox y sistemas en Luau?',
    robloxCta: 'Ver experiencia en Roblox',
  },
};

export const gameDevProjects = [
  {
    id: 'advanced-fps-framework',
    engine: 'Godot 4.7.2',
    language: 'Typed GDScript',
    tooling: 'Blender 5.3 · Forward+',
    status: {
      en: 'Completed · Open Source',
      es: 'Completado · Código Abierto',
    },
    category: {
      en: 'Gameplay Framework',
      es: 'Framework de Gameplay',
    },
    title: {
      en: 'Advanced FPS Framework — Godot 4',
      es: 'Framework FPS Avanzado — Godot 4',
    },
    subtitle: {
      en: 'Modular Single-Player First-Person Shooter Architecture',
      es: 'Arquitectura Modular de Shooter en Primera Persona (Single-Player)',
    },
    description: {
      en: 'A modular first-person shooter framework featuring configurable weapons, recoil, aiming, reloading, damage handling, tactical movement, material penetration, and integrated visual feedback. Built in typed GDScript with custom Blender-rigged viewmodels and demonstrated through a playable training environment.',
      es: 'Un framework modular de shooter en primera persona con armas configurables, retroceso, apuntado, recarga, gestión de daño, movimiento táctico, penetración de materiales y retroalimentación visual integrada. Construido en GDScript tipado con viewmodels riggeados en Blender y demostrado en un campo de entrenamiento jugable.',
    },
    scopeNote: {
      en: 'Scope: Single-player gameplay systems framework (no multiplayer/netcode). Built to demonstrate drop-in commission-grade architecture.',
      es: 'Alcance: Framework de sistemas gameplay single-player (sin multijugador/netcode). Diseñado para demostrar arquitectura modular lista para integrar.',
    },
    repoUrl:
      'https://github.com/PapLion/Godot-Scripting-Work/tree/main/Godot-Systems-Lab/01-Advanced-FPS',
    docsUrl:
      'https://github.com/PapLion/Godot-Scripting-Work/blob/main/Godot-Systems-Lab/01-Advanced-FPS/docs/ARCHITECTURE.md',
    stack: [
      'Godot 4.7.2',
      'Typed GDScript',
      'Blender 5.3',
      'GPUParticles3D',
      'Procedural Audio',
    ],
    verification: {
      en: [
        '106 / 106 automated headless test assertions passing',
        '27 / 27 GDScript files validated with 0 errors',
        '3 rigged weapons (AK-47, SPAS-12, AWP) + 4 modular attachments',
      ],
      es: [
        '106 / 106 aserciones de pruebas headless automatizadas aprobadas',
        '27 / 27 archivos GDScript validados con 0 errores',
        '3 armas riggeadas (AK-47, SPAS-12, AWP) + 4 accesorios modulares',
      ],
    },
    mainDemo: {
      src: '/videos/game-dev/fps/fps_framework_main_demo.mp4',
      poster: '/images/game-dev/fps/fps_framework_main_demo-poster.webp',
      duration: '0:38',
      title: {
        en: 'Full Training Range Showcase',
        es: 'Demostración Completa en Campo de Entrenamiento',
      },
      caption: {
        en: 'Live Godot 4.7.2 gameplay capture covering AK-47, SPAS-12, AWP, tactical leaning, shoulder switching, surface penetration, and combat VFX.',
        es: 'Captura real en Godot 4.7.2 mostrando AK-47, SPAS-12, AWP, inclinación táctica, cambio de hombro, penetración de superficies y VFX de combate.',
      },
    },
    systems: [
      {
        title: {
          en: 'Data-Driven Weapons & Attachments',
          es: 'Armas y Accesorios Basados en Datos',
        },
        detail: {
          en: 'WeaponData resources compose live EffectiveWeaponStats across 4 attachment slots (Optic, Muzzle, Extended Mag, Laser) with safe ammo conservation and bone-skinned Blender meshes.',
          es: 'Recursos WeaponData componen estadísticas en vivo mediante EffectiveWeaponStats en 4 ranuras (Óptica, Boca, Cargador Extendido, Láser) con conservación exacta de munición y mallas ligadas a huesos.',
        },
      },
      {
        title: {
          en: 'Orthogonal State Machine & Reloads',
          es: 'Máquina de Estados Ortogonal y Recargas',
        },
        detail: {
          en: 'Independent ActionState (including CYCLING_BOLT), AimState, and SprintState eliminate conflicting flags across tactical/empty magazine reloads, interruptible shotgun shell loading, and weapon switching.',
          es: 'ActionState (incluyendo CYCLING_BOLT), AimState y SprintState independientes evitan banderas contradictorias en recargas tácticas/vacías, carga cartucho a cartucho interrumpible y cambio de arma.',
        },
      },
      {
        title: {
          en: 'Hitscan Ballistics & Surface Penetration',
          es: 'Balística Hitscan y Penetración de Superficies',
        },
        detail: {
          en: 'BallisticSolver evaluates distance falloff, multi-pellet spread, thickness probing, material resistance budgets, and entry/exit impacts across wood, glass, concrete, and metal.',
          es: 'BallisticSolver evalúa caída por distancia, dispersión multi-perdigón, grosor de obstáculos, presupuesto de resistencia por material y puntos de entrada/salida en madera, vidrio, concreto y metal.',
        },
      },
      {
        title: {
          en: 'Tactical Mechanics & Combat VFX',
          es: 'Mecánicas Tácticas y VFX de Combate',
        },
        detail: {
          en: 'AK-47 SAFE/SEMI/AUTO selector (animated selector bone), Right/Left shoulder switching, collision-aware Q/E leaning, decoupled Hitbox/Health armor damage, and bounded GPUParticles3D ImpactFXManager.',
          es: 'Selector SAFE/SEMI/AUTO en AK-47 (hueso animado), cambio de hombro derecho/izquierdo, inclinación Q/E con detección de colisión, daño por hitboxes/armadura y ImpactFXManager con GPUParticles3D acotado.',
        },
      },
    ],
    clips: [
      {
        id: 'ak47-recoil-reload',
        group: 'gunplay',
        src: '/videos/game-dev/fps/clip_01_ak47_recoil_reload.mp4',
        poster: '/images/game-dev/fps/clip_01_ak47_recoil_reload-poster.webp',
        title: {
          en: 'AK-47 Recoil & Reload',
          es: 'AK-47 Retroceso y Recarga',
        },
        caption: {
          en: 'Camera recoil recovery, ADS crossfade, and synchronized first-person magazine reload.',
          es: 'Recuperación de retroceso, transición ADS y recarga sincronizada en primera persona.',
        },
      },
      {
        id: 'spas12-shell-reload',
        group: 'gunplay',
        src: '/videos/game-dev/fps/clip_02_spas12_shell_reload.mp4',
        poster: '/images/game-dev/fps/clip_02_spas12_shell_reload-poster.webp',
        title: {
          en: 'SPAS-12 Shell Reload & Interrupt',
          es: 'SPAS-12 Carga por Cartucho e Interrupción',
        },
        caption: {
          en: 'Incremental 12ga shell insertion with immediate fire-interrupt support.',
          es: 'Inserción incremental de cartuchos 12ga con interrupción inmediata al disparar.',
        },
      },
      {
        id: 'awp-bolt-scope',
        group: 'gunplay',
        src: '/videos/game-dev/fps/clip_03_awp_bolt_scope.mp4',
        poster: '/images/game-dev/fps/clip_03_awp_bolt_scope-poster.webp',
        title: {
          en: 'AWP Bolt-Action & Mil-Dot Scope',
          es: 'AWP Cerrojo y Mira Mil-Dot',
        },
        caption: {
          en: 'CYCLING_BOLT state lock, mid-pull shell ejection, and variable-FOV scope overlay.',
          es: 'Bloqueo de estado CYCLING_BOLT, eyección sincronizada y mira táctica con FOV variable.',
        },
      },
      {
        id: 'switching-ads-attachments',
        group: 'gunplay',
        src: '/videos/game-dev/fps/clip_04_switching_ads_attachments.mp4',
        poster: '/images/game-dev/fps/clip_04_switching_ads_attachments-poster.webp',
        title: {
          en: 'Weapon Switch & Attachments',
          es: 'Cambio de Arma y Accesorios',
        },
        caption: {
          en: 'Live toggling of bone-skinned optic, compensator, extended mag, and laser.',
          es: 'Activación en vivo de óptica, compensador, cargador extendido y láser.',
        },
      },
      {
        id: 'ak47-fire-selector',
        group: 'tactical',
        src: '/videos/game-dev/fps/clip_05_ak47_fire_selector.mp4',
        poster: '/images/game-dev/fps/clip_05_ak47_fire_selector-poster.webp',
        title: {
          en: 'Fire-Mode Selector (B)',
          es: 'Selector de Tiro (B)',
        },
        caption: {
          en: 'Cycles SAFE / SEMI / AUTO with animated receiver selector lever and persistent mode.',
          es: 'Alterna SAFE / SEMI / AUTO con palanca animada y persistencia por instancia.',
        },
      },
      {
        id: 'shoulder-switching',
        group: 'tactical',
        src: '/videos/game-dev/fps/clip_06_shoulder_switching.mp4',
        poster: '/images/game-dev/fps/clip_06_shoulder_switching-poster.webp',
        title: {
          en: 'Shoulder Switching (V)',
          es: 'Cambio de Hombro (V)',
        },
        caption: {
          en: 'Smooth Right/Left viewmodel presentation without negative-scale normal artifacts.',
          es: 'Cambio suave entre hombro derecho e izquierdo sin invertir normales.',
        },
      },
      {
        id: 'tactical-lean-peek',
        group: 'tactical',
        src: '/videos/game-dev/fps/clip_07_tactical_lean_peek.mp4',
        poster: '/images/game-dev/fps/clip_07_tactical_lean_peek-poster.webp',
        title: {
          en: 'Collision-Aware Leaning (Q/E)',
          es: 'Inclinación con Colisión (Q/E)',
        },
        caption: {
          en: 'Corner peeking with lateral wall-probe clamping to prevent camera clipping.',
          es: 'Asomo en esquinas con detección lateral para evitar que la cámara atraviese muros.',
        },
      },
      {
        id: 'surface-penetration',
        group: 'ballistics',
        src: '/videos/game-dev/fps/clip_08_surface_penetration.mp4',
        poster: '/images/game-dev/fps/clip_08_surface_penetration-poster.webp',
        title: {
          en: 'Multi-Surface Penetration',
          es: 'Penetración de Superficies',
        },
        caption: {
          en: 'Wood and glass penetration with damage retention vs. concrete and heavy metal stops.',
          es: 'Penetración en madera y vidrio con retención de daño frente a bloqueo en concreto y metal.',
        },
      },
      {
        id: 'combat-vfx-surfaces',
        group: 'ballistics',
        src: '/videos/game-dev/fps/clip_09_combat_vfx_surfaces.mp4',
        poster: '/images/game-dev/fps/clip_09_combat_vfx_surfaces-poster.webp',
        title: {
          en: 'Surface Impact VFX',
          es: 'VFX de Impacto por Superficie',
        },
        caption: {
          en: 'Material-specific sparks, dust, wood splinters, glass shards, and muzzle flash.',
          es: 'Chispas metálicas, polvo, astillas, vidrio y fogonazo dependientes del material.',
        },
      },
    ],
  },
];
