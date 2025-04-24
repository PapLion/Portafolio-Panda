import { ref, computed, watch } from 'vue';

const translations = {
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.about": "Sobre Mí",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.cv": "CV",
    "nav.download.cv": "Descargar CV",

    // Hero
    "hero.title": "Danilo López",
    "hero.subtitle": "JavaScript Developer",
    "hero.description": "Creando experiencias digitales que combinan lógica, arte y emoción.",
    "hero.projects": "Ver Proyectos",
    "hero.contact": "Contactarme",
    "hero.cv": "Descargar CV",

    // About
    "about.title": "Sobre Mí",
    "about.intro":
      "Soy Danilo López, desarrollador full stack apasionado por crear experiencias digitales que combinan funcionalidad y diseño. Me especializo en tecnologías JavaScript modernas para construir aplicaciones web y móviles.",
    "about.approach":
      "Mi enfoque va más allá de solo escribir código. Creo que el verdadero valor está en resolver problemas y comunicar soluciones efectivas que generen impacto real para los usuarios.",
    "about.philosophy.title": "Mi filosofía de trabajo",
    "about.philosophy.text":
      "Veo el desarrollo como una mezcla de lógica, diseño y emoción. Busco escribir código limpio y mantenible que refleje una intención clara y resuelva necesidades específicas.",
    "about.beyond.title": "Más allá del código",
    "about.beyond.text":
      "Fuera del trabajo, experimento con inteligencias artificiales, diseño sistemas interactivos y exploro nuevas tecnologías que me permitan seguir creciendo como desarrollador.",

    // Skills
    "skills.title": "Mis Conocimientos",
    "skills.languages": "Lenguajes de programación",
    "skills.backend": "Backend",
    "skills.frontend": "Frontend",
    "skills.multiplatform": "Multiplataforma",
    "skills.years": "años",
    "skills.year": "año",

    // Projects
    "projects.title": "Mis Proyectos",
    "projects.view": "Ver Proyecto",

    // Technologies
    "tech.title": "Tecnologías Utilizadas",
    "tech.frontend": "Frontend",
    "tech.backend": "Backend",
    "tech.databases": "Bases de Datos",
    "tech.multiplatform": "Multiplataforma",

    // Contact
    "contact.title": "Contacto",
    "contact.form.title": "Envíame un Mensaje",
    "contact.name": "Nombre",
    "contact.name.placeholder": "Tu nombre",
    "contact.name.error": "Por favor ingresa tu nombre",
    "contact.email": "Email",
    "contact.email.placeholder": "tu@email.com",
    "contact.email.error": "Por favor ingresa un email válido",
    "contact.message": "Mensaje",
    "contact.message.placeholder": "Tu mensaje...",
    "contact.message.error": "Por favor ingresa un mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.social": "Redes Sociales",
    "contact.ready": "¿Listo para trabajar juntos?",
    "contact.available": "Estoy disponible para proyectos freelance y oportunidades de trabajo a tiempo completo.",
    "contact.download.cv": "Descargar mi CV",

    // Footer
    "footer.developed": "Desarrollado por Dani.Dev",
    "footer.rights": "Todos los derechos reservados.",

    // Language Selector
    "language.select": "Seleccionar idioma",
    "language.en": "English",
    "language.es": "Español",
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
    "hero.title": "Danilo López",
    "hero.subtitle": "JavaScript Developer",
    "hero.description": "Creating digital experiences that combine logic, art, and emotion.",
    "hero.projects": "View Projects",
    "hero.contact": "Contact Me",
    "hero.cv": "Download Resume",

    // About
    "about.title": "About Me",
    "about.intro":
      "I'm Danilo López, a full stack developer passionate about creating digital experiences that combine functionality and design. I specialize in modern JavaScript technologies to build web and mobile applications.",
    "about.approach":
      "My approach goes beyond just writing code. I believe that true value lies in solving problems and communicating effective solutions that generate real impact for users.",
    "about.philosophy.title": "My work philosophy",
    "about.philosophy.text":
      "I see development as a mix of logic, design, and emotion. I seek to write clean and maintainable code that reflects a clear intention and solves specific needs.",
    "about.beyond.title": "Beyond coding",
    "about.beyond.text":
      "Outside of work, I experiment with artificial intelligence, design interactive systems, and explore new technologies that allow me to continue growing as a developer.",

    // Skills
    "skills.title": "My Skills",
    "skills.languages": "Programming Languages",
    "skills.backend": "Backend",
    "skills.frontend": "Frontend",
    "skills.multiplatform": "Multiplatform",
    "skills.years": "years",
    "skills.year": "year",

    // Projects
    "projects.title": "My Projects",
    "projects.view": "View Project",

    // Technologies
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
    "language.es": "Español",
  },
};

export function createLanguageProvider() {
  const currentLanguage = ref('es');

  // Función para traducir textos
  const t = (key) => {
    return translations[currentLanguage.value][key] || key;
  };

  // Cambiar idioma
  const setLanguage = (lang) => {
    if (lang === 'es' || lang === 'en') {
      currentLanguage.value = lang;
      localStorage.setItem('language', lang);
    }
  };

  // Cargar preferencia de idioma desde localStorage
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      currentLanguage.value = savedLanguage;
    }
  }

  // Guardar preferencia de idioma en localStorage cuando cambie
  watch(currentLanguage, (newLang) => {
    localStorage.setItem('language', newLang);
  });

  return {
    currentLanguage: computed(() => currentLanguage.value),
    t,
    setLanguage
  };
}