import { ref, computed, watch } from 'vue';

const translations = {
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.about": "Sobre Mi",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.cv": "CV",
    "nav.download.cv": "Descargar CV",

    // Hero
    "hero.title": "Danilo Lopez",
    "hero.subtitle": "JavaScript Developer",
    "hero.description": "Creando experiencias digitales que combinan logica, arte y emocion.",
    "hero.projects": "Ver Proyectos",
    "hero.contact": "Contactarme",
    "hero.cv": "Descargar CV",

    // About
    "about.title": "Sobre Mi",
    "about.intro":
      "Soy Danilo Lopez, desarrollador full stack apasionado por crear experiencias digitales que combinan funcionalidad y diseno. Me especializo en tecnologias JavaScript modernas para construir aplicaciones web y moviles.",
    "about.approach":
      "Mi enfoque va mas alla de solo escribir codigo. Creo que el verdadero valor esta en resolver problemas y comunicar soluciones efectivas que generen impacto real para los usuarios.",
    "about.philosophy.title": "Mi filosofia de trabajo",
    "about.philosophy.text":
      "Veo el desarrollo como una mezcla de logica, diseno y emocion. Busco escribir codigo limpio y mantenible que refleje una intencion clara y resuelva necesidades especificas.",
    "about.beyond.title": "Mas alla del codigo",
    "about.beyond.text":
      "Fuera del trabajo, experimento con inteligencias artificiales, diseno sistemas interactivos y exploro nuevas tecnologias que me permitan seguir creciendo como desarrollador.",

    // Skills — domain pillars
    "skills.title": "Mis Conocimientos",
    "skills.pillar.arch.title": "Arquitectura & Ingenieria de Software",
    "skills.pillar.arch.desc": "El nucleo de mi enfoque ingenieril: construir sistemas que escalan, resisten y evolucionan.",
    "skills.pillar.ai.title": "Inteligencia Artificial & Machine Learning",
    "skills.pillar.ai.desc": "Mi mayor especialidad. Desde modelos de lenguaje hasta redes neuronales y ML convencional.",
    "skills.pillar.fullstack.title": "Ecosistemas Fullstack & Multiplataforma",
    "skills.pillar.fullstack.desc": "Produzco en cualquier destino: web, escritorio y movil, eligiendo la herramienta correcta para cada contexto.",
    "skills.pillar.data.title": "Datos, Cloud & Networking",
    "skills.pillar.data.desc": "Persistencia, despliegue y conectividad: el tejido que mantiene todo en produccion.",

    // Case Studies
    "case_studies.title": "Casos de Estudio",
    "case_studies.stack": "Stack Tecnologico",
    "case_studies.overview": "Descripcion",
    "case_studies.highlights": "Puntos Clave",
    "case_studies.prev": "Caso anterior",
    "case_studies.next": "Caso siguiente",
    "case_studies.goto": "Ir al caso",
    "case_studies.nav": "Navegacion de casos de estudio",

    // Technologies (kept for backward compat in other components)
    "tech.title": "Tecnologias Utilizadas",
    "tech.frontend": "Frontend",
    "tech.backend": "Backend",
    "tech.databases": "Bases de Datos",
    "tech.multiplatform": "Multiplataforma",

    // Contact
    "contact.title": "Contacto",
    "contact.form.title": "Enviame un Mensaje",
    "contact.name": "Nombre",
    "contact.name.placeholder": "Tu nombre",
    "contact.name.error": "Por favor ingresa tu nombre",
    "contact.email": "Email",
    "contact.email.placeholder": "tu@email.com",
    "contact.email.error": "Por favor ingresa un email valido",
    "contact.message": "Mensaje",
    "contact.message.placeholder": "Tu mensaje...",
    "contact.message.error": "Por favor ingresa un mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "contact.success": "Mensaje enviado con exito! Gracias por contactarme.",
    "contact.error.generic": "Hubo un error al enviar el mensaje. Por favor, intentalo de nuevo.",
    "contact.social": "Redes Sociales",
    "contact.ready": "Listo para trabajar juntos?",
    "contact.available": "Estoy disponible para proyectos freelance y oportunidades de trabajo a tiempo completo.",
    "contact.download.cv": "Descargar mi CV",

    // Footer
    "footer.developed": "Desarrollado por Dani.Dev",
    "footer.rights": "Todos los derechos reservados.",

    // Language Selector
    "language.select": "Seleccionar idioma",
    "language.en": "English",
    "language.es": "Espanol",

    // Loading Screen
    "loading.message": "Iniciando viaje espacial...",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.cv": "Resume",
    "nav.download.cv": "Download Resume",

    // Hero
    "hero.title": "Danilo Lopez",
    "hero.subtitle": "JavaScript Developer",
    "hero.description": "Creating digital experiences that combine logic, art, and emotion.",
    "hero.projects": "View Projects",
    "hero.contact": "Contact Me",
    "hero.cv": "Download Resume",

    // About
    "about.title": "About Me",
    "about.intro":
      "I'm Danilo Lopez, a full stack developer passionate about creating digital experiences that combine functionality and design. I specialize in modern JavaScript technologies to build web and mobile applications.",
    "about.approach":
      "My approach goes beyond just writing code. I believe that true value lies in solving problems and communicating effective solutions that generate real impact for users.",
    "about.philosophy.title": "My work philosophy",
    "about.philosophy.text":
      "I see development as a mix of logic, design, and emotion. I seek to write clean and maintainable code that reflects a clear intention and solves specific needs.",
    "about.beyond.title": "Beyond coding",
    "about.beyond.text":
      "Outside of work, I experiment with artificial intelligence, design interactive systems, and explore new technologies that allow me to continue growing as a developer.",

    // Skills — domain pillars
    "skills.title": "My Knowledge",
    "skills.pillar.arch.title": "Software Architecture & Engineering",
    "skills.pillar.arch.desc": "The core of my engineering mindset: building systems that scale, endure, and evolve.",
    "skills.pillar.ai.title": "Artificial Intelligence & Machine Learning",
    "skills.pillar.ai.desc": "My deepest speciality. From large language models to neural networks and conventional ML.",
    "skills.pillar.fullstack.title": "Fullstack & Multiplatform Ecosystems",
    "skills.pillar.fullstack.desc": "I ship to any target: web, desktop, and mobile — picking the right tool for each context.",
    "skills.pillar.data.title": "Data, Cloud & Networking",
    "skills.pillar.data.desc": "Persistence, deployment, and connectivity: the fabric that keeps everything running in production.",

    // Case Studies
    "case_studies.title": "Case Studies",
    "case_studies.stack": "Tech Stack",
    "case_studies.overview": "Overview",
    "case_studies.highlights": "Key Highlights",
    "case_studies.prev": "Previous case",
    "case_studies.next": "Next case",
    "case_studies.goto": "Go to case",
    "case_studies.nav": "Case study navigation",

    // Technologies (kept for backward compat in other components)
    "tech.title": "Technologies Used",
    "tech.frontend": "Frontend",
    "tech.backend": "Backend",
    "tech.databases": "Databases",
    "tech.multiplatform": "Multiplatform",

    // Contact
    "contact.title": "Contact",
    "contact.form.title": "Send Me a Message",
    "contact.name": "Name",
    "contact.name.placeholder": "Your name",
    "contact.name.error": "Please enter your name",
    "contact.email": "Email",
    "contact.email.placeholder": "your@email.com",
    "contact.email.error": "Please enter a valid email",
    "contact.message": "Message",
    "contact.message.placeholder": "Your message...",
    "contact.message.error": "Please enter a message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully! Thanks for reaching out.",
    "contact.error.generic": "An error occurred while sending your message. Please try again.",
    "contact.social": "Social Media",
    "contact.ready": "Ready to work together?",
    "contact.available": "I'm available for freelance projects and full-time job opportunities.",
    "contact.download.cv": "Download my Resume",

    // Footer
    "footer.developed": "Developed by Dani.Dev",
    "footer.rights": "All rights reserved.",

    // Language Selector
    "language.select": "Select language",
    "language.en": "English",
    "language.es": "Espanol",

    // Loading Screen
    "loading.message": "Starting space journey...",
  },
};

export function createLanguageProvider() {
  const currentLanguage = ref('en');

  // Translation function - reads reactive ref internally
  const t = (key) => {
    const lang = currentLanguage.value;
    return translations[lang]?.[key] || key;
  };

  // Change language with SSR guard
  const setLanguage = (lang) => {
    if (lang === 'es' || lang === 'en') {
      currentLanguage.value = lang;
      // SSR guard for localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          localStorage.setItem('language', lang);
        } catch (e) {
          // localStorage not available or quota exceeded
          console.warn('Could not save language preference:', e);
        }
      }
    }
  };

  // Load saved language preference with SSR guard
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
        currentLanguage.value = savedLanguage;
      }
    } catch (e) {
      // localStorage not available
      console.warn('Could not load language preference:', e);
    }
  }

  // Return computed for currentLanguage to ensure reactivity in templates
  return {
    currentLanguage: computed(() => currentLanguage.value),
    t,
    setLanguage
  };
}
