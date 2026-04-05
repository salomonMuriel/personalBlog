export const languages = {
  en: "English",
  es: "Español",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "en";

export const ui = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About",
    "nav.now": "Now",
    "nav.companies": "Companies",
    "nav.ideas": "Ideas",
    "nav.resources": "Resources",
    "nav.uses": "Uses",
    "nav.posts": "Posts",
    "nav.talks": "Talks",
    "nav.search": "Search",
    "nav.skipToContent": "Skip to content",
    "nav.openMenu": "Open Menu",
    "nav.closeMenu": "Close Menu",
    "nav.moreStuff": "more stuff here",
    "nav.closeMenuText": "close menu",

    // Hero
    "hero.subtitle": "Serial Entrepreneur and Tech Leader",
    "hero.valueProp":
      "I've founded 4 companies and led Tech, AI & Data teams at scale. I consult with founders and companies, and speak at conferences and corporate events.",
    "hero.cta": "Let's Talk →",
    "hero.connectWith": "Connect with me:",

    // About section
    "about.title": "About Me",
    "about.p1":
      "I've founded 4 companies (building #5 now) and led Tech, AI & Data teams at scale. I combine technical depth with real-world business experience.",
    "about.p2Start": "Beyond business, I'm a dad to twin boys, Luca & Franco",
    "about.p2End":
      ". I write about Entrepreneurship, Education, Tech, Data Science, and Life Balance—most of what I write",
    "about.linkedinLink": "is on LinkedIn",

    // Consultancy
    "consultancy.title": "Work With Me",
    "consultancy.intro":
      "I partner with founders, CTOs, and growing companies to solve their toughest challenges. Whether you need hands-on technical guidance or strategic advice, I bring real experience from building 4 companies and leading teams at scale.",
    "consultancy.aiTitle": "Tech & AI Consulting",
    "consultancy.aiDesc":
      "Navigate AI adoption, build technical roadmaps, and make implementation decisions with confidence.",
    "consultancy.dataTitle": "Data Science",
    "consultancy.dataDesc":
      "Turn your data into actionable insights and build analytics capabilities that drive real business decisions.",
    "consultancy.companyTitle": "Company-Building",
    "consultancy.companyDesc":
      "Learn from hard-won lessons across 4 companies: fundraising, hiring, scaling, and avoiding the mistakes I've already made.",
    "consultancy.mentorTitle": "Mentorship",
    "consultancy.mentorDesc":
      "Ongoing accountability and guidance for founders, data scientists, and tech leaders navigating their next chapter.",
    "consultancy.trust1": "4 companies founded",
    "consultancy.trust2": "10+ years in tech",
    "consultancy.cta": "Book a Free Intro Call →",
    "consultancy.ctaSub":
      "15 minutes to discuss your needs — no pitch, no pressure.",

    // Speaking
    "speaking.title": "Speaking & Workshops",
    "speaking.intro":
      "I speak about AI, data science, and building companies—technical depth meets business reality.",
    "speaking.topicsTitle": "Popular Topics:",
    "speaking.topic1Title": "AI & Tech",
    "speaking.topic1Desc": "Practical applications for business impact",
    "speaking.topic2Title": "Data-Driven Decisions",
    "speaking.topic2Desc": "Building analytics culture in growing companies",
    "speaking.topic3Title": "The Maker's Mindset",
    "speaking.topic3Desc": "From idea to product: lessons from 4 companies",
    "speaking.topic4Title": "Entrepreneurship",
    "speaking.topic4Desc": "Practical strategies for founders and scale-ups",
    "speaking.recentTalk": "Recent Talk:",
    "speaking.viewPresentation": "View Presentation →",
    "speaking.ctaText":
      "Need a speaker who's been in the code AND the boardroom?",
    "speaking.ctaButton": "Book Me to Speak →",
    "speaking.seeAll": "See All Talks",

    // Now section
    "now.title": "Now",
    "now.subtitle": "Updates on what's happening in my life... right now.",
    "now.latestUpdate": "Latest Update",
    "now.previous": "Previous",
    "now.allPrevious": "All Previous Updates",
    "now.lastUpdated": "Last updated",
    "now.whatsHappening": "What's happening in my life right about now.",
    "now.seePrevious": "You can see previous updates here.",

    // Before
    "before.updated": "Updated",
    "before.somethingPast": "Something in my past.",
    "before.seeOther": "You can see other updates here.",

    // Posts
    "posts.title": "Posts",
    "posts.desc": "All the articles I've posted.",
    "posts.goBack": "Go back",
    "posts.backToTop": "Back to Top",

    // Tags
    "tags.title": "Tags",
    "tags.desc": "All the tags used in posts.",
    "tags.prefix": "Tag:",
    "tags.allArticles": "All the articles with the tag",

    // Search
    "search.title": "Search",
    "search.desc": "Search any article ...",
    "search.placeholder": "Search for anything...",
    "search.found": "Found",
    "search.result": "result",
    "search.results": "results",
    "search.for": "for",

    // Talks
    "talks.title": "Talks",
    "talks.desc": "Talks and presentations I've given.",
    "talks.bookIntro": "If you would like to book me for a talk please",
    "talks.bookLink": "schedule a 15 minute call on this link",
    "talks.bookOutro": "to talk details!",
    "talks.downloadPdf": "Download PDF",
    "talks.downloadHtml": "Download Interactive HTML",
    "talks.mobileOnly":
      "Interactive presentation is only available on desktop screens.",
    "talks.mobileDownload":
      "Download the files below to view on mobile or use a desktop device for the best experience.",
    "talks.pdfFallback":
      "It appears you can't preview PDFs in this browser (probably Chrome on Android?)",
    "talks.pdfDownloadHint":
      "Download the PDF to view it with the button below",

    // Ideas
    "ideas.title": "Ideas",
    "ideas.desc": "Ideas on I want to build or have built.",
    "ideas.intro":
      "These are a few of the ideas I have pondered creating over the last few years. If you think any of them are worth pursuing and would like to talk about them please don't hesitate to",
    "ideas.introLink": "schedule a 15 minute call on this link",
    "ideas.introOutro": "to talk about it!",
    "ideas.currentlyWorking": "Currently working on this",

    // Companies
    "companies.currentlyBuilding": "Currently Building",
    "companies.pastVentures": "Past Ventures",

    // Share
    "share.title": "Share this post on:",
    "share.whatsapp": "Share this post via WhatsApp",
    "share.facebook": "Share this post on Facebook",
    "share.twitter": "Tweet this post",
    "share.telegram": "Share this post via Telegram",
    "share.pinterest": "Share this post on Pinterest",
    "share.email": "Share this post via email",

    // Datetime
    "datetime.updated": "Updated:",
    "datetime.published": "Published:",

    // Pagination
    "pagination.prev": "Prev",
    "pagination.next": "Next",

    // Footer
    "footer.copyright": "Copyright",
    "footer.allRights": "All rights reserved.",

    // Breadcrumbs
    "breadcrumbs.home": "Home",

    // 404
    "404.title": "404 Not Found",
    "404.text": "Page Not Found",
    "404.goHome": "Go back home",

    // Reading time
    "readingTime.suffix": "min read",

    // Explore dropdown
    "nav.explore": "Explore",
    "nav.menu": "Menu",
    "nav.close": "Close",

    // 404 improved
    "404.wanderedOff": "This page wandered off somewhere.",
    "404.search": "Search",
    "404.checkOut": "Or check out these:",
    "404.blog": "Blog",
    "404.talks": "Talks",
    "404.now": "Now",
    "404.companies": "Companies",

    // Featured/Recent posts
    "posts.featured": "Featured",
    "posts.recent": "Recent Posts",
    "posts.allPosts": "All Posts",

    // Code blocks
    "code.copy": "Copy",
    "code.copied": "Copied",

    // Social links
    "social.linkedin": "Let's connect on LinkedIn!",
    "social.whatsapp": "Text me on WhatsApp",
    "social.mail": "Shoot me an email",
    "social.github": "Check out my Github",

    // Resources
    "resources.title": "Resources",

    // About page
    "aboutPage.title": "About Me",

    // Uses page
    "usesPage.title": "Uses",

    // Language switcher
    "lang.switch": "ES",
    "lang.switchLabel": "Cambiar a Español",

    // SEO
    "seo.desc": "Salomón's little corner of the internet.",
    "seo.schemaDesc": "Entrepreneur, Data Scientist, Maker",
    "seo.schemaDisambig":
      "Colombian, father of super-twins Franco & Luca, gamer and beer-enthusiast",
  },
  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.about": "Bio",
    "nav.now": "Ahora",
    "nav.companies": "Empresas",
    "nav.ideas": "Ideas",
    "nav.resources": "Recursos",
    "nav.uses": "Stack",
    "nav.posts": "Blog",
    "nav.talks": "Charlas",
    "nav.search": "Buscar",
    "nav.skipToContent": "Ir al contenido",
    "nav.openMenu": "Abrir menú",
    "nav.closeMenu": "Cerrar menú",
    "nav.moreStuff": "menú",
    "nav.closeMenuText": "cerrar menú",

    // Hero
    "hero.subtitle": "Emprendedor Serial y Líder en Tecnología",
    "hero.valueProp":
      "He fundado 4 empresas y liderado equipos de Tecnología, IA y Datos a gran escala. Asesoro a fundadores y empresas, y doy charlas en conferencias y eventos corporativos.",
    "hero.cta": "Hablemos →",
    "hero.connectWith": "Conéctate conmigo:",

    // About section
    "about.title": "Sobre Mí",
    "about.p1":
      "He fundado 4 empresas (construyendo la #5 ahora) y liderado equipos de Tecnología, IA y Datos a gran escala. Combino profundidad técnica con experiencia real de negocios.",
    "about.p2Start":
      "Más allá de los negocios, soy papá de mellizos, Luca y Franco",
    "about.p2End":
      ". Escribo sobre Emprendimiento, Educación, Tecnología, Ciencia de Datos y Balance de Vida—la mayoría de lo que escribo",
    "about.linkedinLink": "está en LinkedIn",

    // Consultancy
    "consultancy.title": "Trabaja Conmigo",
    "consultancy.intro":
      "Colaboro con fundadores, CTOs y empresas en crecimiento para resolver sus mayores desafíos. Ya sea que necesites orientación técnica práctica o asesoría estratégica, traigo experiencia real de construir 4 empresas y liderar equipos a gran escala.",
    "consultancy.aiTitle": "Consultoría en Tecnología e IA",
    "consultancy.aiDesc":
      "Navega la adopción de IA, construye hojas de ruta técnicas y toma decisiones de implementación con confianza.",
    "consultancy.dataTitle": "Ciencia de Datos",
    "consultancy.dataDesc":
      "Convierte tus datos en insights accionables y construye capacidades analíticas que impulsen decisiones reales de negocio.",
    "consultancy.companyTitle": "Construcción de Empresas",
    "consultancy.companyDesc":
      "Aprende de lecciones ganadas con esfuerzo en 4 empresas: levantamiento de capital, contratación, escalamiento y cómo evitar los errores que ya cometí.",
    "consultancy.mentorTitle": "Mentoría",
    "consultancy.mentorDesc":
      "Acompañamiento continuo y orientación para fundadores, científicos de datos y líderes tech navegando su siguiente capítulo.",
    "consultancy.trust1": "4 empresas fundadas",
    "consultancy.trust2": "10+ años en tecnología",
    "consultancy.cta": "Agenda una Llamada Gratis →",
    "consultancy.ctaSub":
      "15 minutos para hablar de tus necesidades — sin pitch, sin presión.",

    // Speaking
    "speaking.title": "Charlas y Talleres",
    "speaking.intro":
      "Hablo sobre IA, ciencia de datos y construcción de empresas—profundidad técnica con realidad de negocios.",
    "speaking.topicsTitle": "Temas Populares:",
    "speaking.topic1Title": "IA y Tecnología",
    "speaking.topic1Desc": "Aplicaciones prácticas para impacto en negocios",
    "speaking.topic2Title": "Decisiones Basadas en Datos",
    "speaking.topic2Desc":
      "Construyendo cultura analítica en empresas en crecimiento",
    "speaking.topic3Title": "La Mentalidad del Maker",
    "speaking.topic3Desc": "De la idea al producto: lecciones de 4 empresas",
    "speaking.topic4Title": "Emprendimiento",
    "speaking.topic4Desc": "Estrategias prácticas para fundadores y scale-ups",
    "speaking.recentTalk": "Charla Reciente:",
    "speaking.viewPresentation": "Ver Presentación →",
    "speaking.ctaText":
      "¿Necesitas un speaker que haya estado en el código Y en la junta directiva?",
    "speaking.ctaButton": "Contratame para una Charla →",
    "speaking.seeAll": "Ver Todas las Charlas",

    // Now section
    "now.title": "Ahora",
    "now.subtitle":
      "Actualizaciones sobre lo que está pasando en mi vida... ahora mismo.",
    "now.latestUpdate": "Última Actualización",
    "now.previous": "Anteriores",
    "now.allPrevious": "Todas las Actualizaciones Anteriores",
    "now.lastUpdated": "Última actualización",
    "now.whatsHappening": "Lo que está pasando en mi vida en este momento.",
    "now.seePrevious": "Puedes ver actualizaciones anteriores aquí.",

    // Before
    "before.updated": "Actualizado",
    "before.somethingPast": "Algo de mi pasado.",
    "before.seeOther": "Puedes ver otras actualizaciones aquí.",

    // Posts
    "posts.title": "Blog",
    "posts.desc": "Todos los artículos que he publicado.",
    "posts.goBack": "Volver",
    "posts.backToTop": "Volver Arriba",

    // Tags
    "tags.title": "Etiquetas",
    "tags.desc": "Todas las etiquetas usadas en los posts.",
    "tags.prefix": "Etiqueta:",
    "tags.allArticles": "Todos los artículos con la etiqueta",

    // Search
    "search.title": "Buscar",
    "search.desc": "Busca cualquier artículo ...",
    "search.placeholder": "Busca lo que quieras...",
    "search.found": "Se encontraron",
    "search.result": "resultado",
    "search.results": "resultados",
    "search.for": "para",

    // Talks
    "talks.title": "Charlas",
    "talks.desc": "Charlas y presentaciones que he dado.",
    "talks.bookIntro": "Si quieres contratarme para una charla, por favor",
    "talks.bookLink": "agenda una llamada de 15 minutos en este enlace",
    "talks.bookOutro": "¡para hablar de los detalles!",
    "talks.downloadPdf": "Descargar PDF",
    "talks.downloadHtml": "Descargar HTML Interactivo",
    "talks.mobileOnly":
      "La presentación interactiva solo está disponible en pantallas de escritorio.",
    "talks.mobileDownload":
      "Descarga los archivos a continuación para verlos en móvil o usa un dispositivo de escritorio para la mejor experiencia.",
    "talks.pdfFallback":
      "Parece que no puedes previsualizar PDFs en este navegador (¿probablemente Chrome en Android?)",
    "talks.pdfDownloadHint": "Descarga el PDF para verlo con el botón de abajo",

    // Ideas
    "ideas.title": "Ideas",
    "ideas.desc": "Ideas que quiero construir o he construido.",
    "ideas.intro":
      "Estas son algunas de las ideas que he pensado crear en los últimos años. Si crees que alguna vale la pena y te gustaría hablar de ellas, no dudes en",
    "ideas.introLink": "agendar una llamada de 15 minutos en este enlace",
    "ideas.introOutro": "¡para conversar!",
    "ideas.currentlyWorking": "Trabajando en esto actualmente",

    // Companies
    "companies.currentlyBuilding": "Construyendo Actualmente",
    "companies.pastVentures": "Empresas Anteriores",

    // Share
    "share.title": "Comparte este post en:",
    "share.whatsapp": "Comparte este post por WhatsApp",
    "share.facebook": "Comparte este post en Facebook",
    "share.twitter": "Tuitea este post",
    "share.telegram": "Comparte este post por Telegram",
    "share.pinterest": "Comparte este post en Pinterest",
    "share.email": "Comparte este post por email",

    // Datetime
    "datetime.updated": "Actualizado:",
    "datetime.published": "Publicado:",

    // Pagination
    "pagination.prev": "Anterior",
    "pagination.next": "Siguiente",

    // Footer
    "footer.copyright": "Derechos de autor",
    "footer.allRights": "Todos los derechos reservados.",

    // Breadcrumbs
    "breadcrumbs.home": "Inicio",

    // 404
    "404.title": "404 No Encontrado",
    "404.text": "Página No Encontrada",
    "404.goHome": "Volver al inicio",

    // Reading time
    "readingTime.suffix": "min de lectura",

    // Explore dropdown
    "nav.explore": "Explorar",
    "nav.menu": "Menú",
    "nav.close": "Cerrar",

    // 404 improved
    "404.wanderedOff": "Esta página se fue a algún lado.",
    "404.search": "Buscar",
    "404.checkOut": "O revisa estos:",
    "404.blog": "Blog",
    "404.talks": "Charlas",
    "404.now": "Ahora",
    "404.companies": "Empresas",

    // Featured/Recent posts
    "posts.featured": "Destacados",
    "posts.recent": "Posts Recientes",
    "posts.allPosts": "Todos los Posts",

    // Code blocks
    "code.copy": "Copiar",
    "code.copied": "Copiado",

    // Social links
    "social.linkedin": "¡Conectemos en LinkedIn!",
    "social.whatsapp": "Escríbeme por WhatsApp",
    "social.mail": "Envíame un correo",
    "social.github": "Mira mi Github",

    // Resources
    "resources.title": "Recursos",

    // About page
    "aboutPage.title": "Sobre Mí",

    // Uses page
    "usesPage.title": "Herramientas",

    // Language switcher
    "lang.switch": "EN",
    "lang.switchLabel": "Switch to English",

    // SEO
    "seo.desc": "El rinconcito de Salomón en internet.",
    "seo.schemaDesc": "Emprendedor, Científico de Datos, Maker",
    "seo.schemaDisambig":
      "Colombiano, papá de los súper-mellizos Franco y Luca, gamer y entusiasta de la cerveza",
  },
} as const;
