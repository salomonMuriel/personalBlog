export type Empresa = {
  clave: string;
  nombre: string;
  cuando: string;
  texto: string;
  resultado: string;
  tono: "hoy" | "bien" | "mal" | "neutro";
};

export type Frente = {
  etiqueta: string;
  titulo: string;
  resumen: string;
  temasT: string;
  temas: string[];
  paraQuienT: string;
  paraQuien: string;
  respaldoT: string;
  respaldo: string;
};

export const es = {
  meta: {
    title: "Ficha de perfil — Salomón Muriel",
    description:
      "Consultoría, mentoría y charlas de Salomón Muriel: emprendimiento de cero a uno, estrategia y construcción de tecnología, e inteligencia artificial aplicada.",
  },

  barra: {
    rotulo: "Ficha de perfil",
    otroIdioma: "English",
    pdf: "Descargar PDF",
    imprimir: "Imprimir",
  },

  pliego: {
    encabezado: "Ficha de perfil",
    pie: "Bogotá, Colombia",
    actualizada: "Actualizada en septiembre de 2026",
  },

  portada: {
    rotulo: "Consultoría · Mentoría · Charlas",
    ciudad: "Bogotá · Colombia",
    nombre1: "Salomón",
    nombre2: "Muriel",
    oficio: "Emprendedor y constructor de tecnología",
    manuscrita: "cinco empresas, dos vendidas, dos quebradas",
    bajada:
      "Salomón lleva más de diez años fundando empresas y construyendo la tecnología con la que operan. Hoy es cofundador de Ignia, un modelo nuevo de educación superior. En paralelo asesora y da charlas sobre dos temas: cómo arrancar un negocio desde cero, y cómo decidir, construir y corregir la tecnología de una empresa, con la inteligencia artificial adentro.",
    paraQuien:
      "Esta ficha es para agencias de speakers, organizadores de eventos y equipos que lo quieran contratar. Todo lo que dice se puede citar tal cual.",
    fotoAlt: "Retrato de Salomón Muriel, de abrigo verde y brazos cruzados",
    ficha: [
      ["Base", "Bogotá, Colombia"],
      ["Hoy", "Cofundador de Ignia"],
      ["Idiomas", "Español e inglés"],
      ["Modalidad", "Presencial o remoto"],
    ] as [string, string][],
    cifrasT: "En cifras",
    cifras: [
      ["5", "empresas fundadas"],
      ["2", "vendidas, a RED Atlas y a Taurus Capital"],
      ["100.000+", "reportes de valoración generados en Finco"],
      ["~40", "personas a cargo en R5"],
      ["10+", "años construyendo tecnología"],
    ] as [string, string][],
    indiceT: "Contenido",
    indice: [
      ["02", "Consultoría: emprendimiento y tecnología"],
      ["03", "Charlas y talleres"],
      ["04", "Mentoría uno a uno"],
      ["05", "Trayectoria, bio y contacto"],
    ] as [string, string][],
  },

  consultoria: {
    rotulo: "02 · Consultoría",
    nota: "Dos frentes. Los atiende él, sin equipo intermedio.",
    titulo: "En qué asesora",
    frentes: [
      {
        etiqueta: "Frente 01",
        titulo: "Emprendimiento de cero a uno",
        resumen:
          "Para quien está arrancando un negocio, sea de tecnología o no: una empresa propia, una startup, una fundación o una línea nueva dentro de una empresa que ya existe. La meta es pasar de la idea a clientes que pagan.",
        temasT: "Qué trabaja",
        temas: [
          "Validar la idea con clientes reales antes de invertir en ella.",
          "Modelo de negocio y costos reales, con la mano de obra incluida.",
          "Los primeros clientes, y qué hacer con los que no vuelven.",
          "Qué construir primero y qué dejar para después.",
          "Socios, equipo y financiación.",
        ],
        paraQuienT: "Para quién",
        paraQuien:
          "Fundadores en etapa temprana, negocios tradicionales que arrancan, fundaciones e intraemprendimientos.",
        respaldoT: "Respaldo",
        respaldo:
          "Cinco empresas en sectores muy distintos: flores, crédito, blockchain, finca raíz y educación. Dos las vendió y dos quebraron.",
      },
      {
        etiqueta: "Frente 02",
        titulo: "Tecnología: estrategia y construcción",
        resumen:
          "Para empresas que tienen que decidir qué tecnología construir, cómo construirla o qué hacer con la que ya compraron. Salomón define la estrategia y, cuando el proyecto lo pide, escribe el software él mismo.",
        temasT: "Qué trabaja",
        temas: [
          "Qué construir y qué comprar: hoja de ruta tecnológica.",
          "Revisión de la tecnología que ya existe: qué sirve, qué sobra y qué falta conectar.",
          "Software a la medida, conectado con los sistemas que la empresa ya usa.",
          "Inteligencia artificial aplicada: agentes para el trabajo de oficina y desarrollo de software con IA.",
          "Un equipo capaz de mantener y cambiar su propia herramienta.",
        ],
        paraQuienT: "Para quién",
        paraQuien:
          "Empresas tradicionales cuya operación depende de trabajo manual, fundadores sin líder técnico y equipos directivos que van a invertir en tecnología.",
        respaldoT: "Respaldo",
        respaldo:
          "Dirigió datos y producto en R5, donde construyó el pipeline de datos y el sistema de modelación de riesgo. En Ignia construyó la página, la operación de cursos, el CRM y el portal de comunidad.",
      },
    ] as Frente[],
    principiosT: "Cómo trabaja",
    principios: [
      {
        t: "La misma persona decide y construye",
        d: "Lo que se decide un lunes empieza a construirse el martes. No hay un consultor que entrega una presentación y un proveedor que la interpreta.",
      },
      {
        t: "Primero mira cómo se trabaja hoy",
        d: "La herramienta se diseña sobre la operación real y no sobre un programa hecho para otra empresa. Por eso la gente la usa.",
      },
      {
        t: "Construye con inteligencia artificial",
        d: "Programa con agentes de IA en vez de subcontratar, y le enseña al equipo del cliente a usarlos.",
      },
      {
        t: "Todo queda a nombre del cliente",
        d: "El código, las cuentas y los accesos. Nada depende de que él siga en el proyecto.",
      },
    ],
    noHaceT: "Lo que no hace",
    noHace:
      "Escalar empresas grandes, investigación de tecnología nueva e informes largos para juntas directivas.",
  },

  charlas: {
    rotulo: "03 · Charlas y talleres",
    nota: "Conferencias, empresas, universidades y gremios. Presencial o remoto.",
    titulo: "De qué habla en tarima",
    manuscrita: "habla de lo que ha hecho, no de lo que leyó",
    temas: [
      {
        n: "01",
        t: "Emprendimiento sin romanticismo",
        d: "Cinco empresas, dos vendidas y dos quebradas. Qué funcionó, qué no y qué haría distinto si arrancara hoy.",
        publico: "Universidades, aceleradoras y comunidades de emprendimiento",
      },
      {
        n: "02",
        t: "Construir tecnología sin ser empresa de tecnología",
        d: "De Finco a Ignia: qué construir, qué comprar y cómo decidir cuando nadie en la junta es técnico.",
        publico: "Equipos directivos y fundadores",
      },
      {
        n: "03",
        t: "Inteligencia artificial aplicada, con casos reales",
        d: "Agentes para trabajo que no es de programación, mostrados en vivo sobre tareas de producto, operación y ventas.",
        publico: "Empresas y equipos que no son de tecnología",
      },
      {
        n: "04",
        t: "Mentalidad maker",
        d: "Perrenque, curiosidad, resiliencia y creatividad. Construir con lo que hay a la mano.",
        publico: "Estudiantes y equipos que necesitan mover algo ya",
      },
    ],
    talleresT: "Talleres",
    talleres:
      "Los mismos temas en formato práctico. El equipo trabaja sobre sus propios casos y sale con algo funcionando.",
    talleresEjemplos: [
      "IA para equipos no técnicos: cada persona trae una tarea repetitiva y se va con un agente que la hace.",
      "De la idea al primer cliente: una idea de negocio convertida en un plan de validación para la semana siguiente.",
    ],
    formatosT: "Formatos",
    formatos: [
      ["Charla", "Una hora en tarima, con preguntas al final."],
      ["Taller", "Sesión práctica sobre los casos del equipo."],
      ["Panel", "Con moderador o con otros invitados."],
      ["Podcast", "Grabado o en vivo."],
    ] as [string, string][],
    recientesT: "Charlas recientes",
    recientes: [
      [
        "2026",
        "La semana de Laura: Claude Code para Product Managers",
        "Productesas",
      ],
      ["2025", "Claude Code para Product Management", "ConfNodo"],
      ["2024", "Mentalidad maker", "Universidad Católica"],
      ["2023", "Negocios aburridos e innovación", "Podcast Ventaja"],
      ["2022", "Emprendimiento tecnológico", "EIA, EAFIT y Externado"],
    ] as [string, string, string][],
    tarimasT: "Dónde ha hablado",
    tarimas: [
      "ConfNodo",
      "Productesas",
      "EAFIT",
      "EIA",
      "Externado",
      "Universidad Católica",
      "Asociación Colombiana de EdTech",
      "Podcast Ventaja",
    ],
  },

  mentoria: {
    rotulo: "04 · Mentoría",
    nota: "Uno a uno, cada semana.",
    titulo: "Mentoría uno a uno",
    bajada:
      "Para quien está arrancando algo y quiere que alguien le haga seguimiento cada semana. Cada sesión termina con tareas concretas y la siguiente empieza revisándolas.",
    ficha: [
      ["Formato", "Uno a uno, por videollamada"],
      ["Cadencia", "Una hora a la semana"],
      ["Entre sesiones", "WhatsApp abierto"],
      ["Mínimo", "Tres meses"],
      ["Cupo", "Cinco personas a la vez"],
      ["Hasta hoy", "Siete personas acompañadas"],
    ] as [string, string][],
    pasosT: "Una semana de mentoría",
    pasos: [
      ["La sesión", "Una hora sobre el caso de la persona, sin temario."],
      ["La lista", "Sale con tareas concretas para la semana."],
      ["La semana", "Las hace ella. Si se tranca, escribe."],
      ["La revisión", "La siguiente sesión arranca por esa lista."],
    ] as [string, string][],
    reglaT: "La única regla",
    regla:
      "Si pasan dos semanas seguidas sin tareas hechas, la mentoría se suspende.",
    paraQuienT: "Le sirve a",
    paraQuien: [
      "Un negocio propio que todavía no despega.",
      "Una fundación u organización social.",
      "Una startup en sus primeros meses.",
      "Alguien que se está reinventando y tiene algo que sacar adelante.",
    ],
    grupo:
      "Para quien prefiere aprender en grupo, con currículo y con gente en el mismo momento, está el Action Lab de Ignia.",
  },

  personal: {
    rotulo: "Fuera del trabajo",
    fotoAlt:
      "Salomón y sus mellizos, uno en hombros, frente a una torre en Chicago",
    fotoPie: "Franco y Luca, en hombros",
    items: [
      {
        t: "Papá de mellizos",
        d: "Franco y Luca nacieron en 2022 y se llevan casi todo su tiempo libre. Por ellos no trabaja los domingos.",
      },
      {
        t: "Gamer de toda la vida",
        d: "Creció pegado a los videojuegos y aprendió inglés jugando en línea. Sigue jugando.",
      },
      {
        t: "Maker",
        d: "Tiene un taller con herramientas y una impresora 3D. Si algo se puede construir en la casa, lo intenta.",
      },
      {
        t: "Corredor",
        d: "Corrió la media maratón de Bogotá en 2:10 y anda buscando la siguiente meta.",
      },
    ],
  },

  trayectoria: {
    rotulo: "05 · Trayectoria",
    nota: "Incluidas las que no funcionaron.",
    titulo: "Lo que ha construido",
    empresas: [
      {
        clave: "ignia",
        nombre: "Ignia",
        cuando: "2025 · hoy",
        texto:
          "Cofundador. Un modelo nuevo de educación superior para Latinoamérica, rentable desde el primer programa.",
        resultado: "Activa",
        tono: "hoy",
      },
      {
        clave: "r5",
        nombre: "R5",
        cuando: "Ejecutivo",
        texto:
          "Dirigió datos y producto, con unas cuarenta personas a cargo. Construyó el pipeline de datos y el sistema de modelación de riesgo.",
        resultado: "Empleado",
        tono: "neutro",
      },
      {
        clave: "finco",
        nombre: "Finco",
        cuando: "2019 · 2022",
        texto:
          "Valoración inmobiliaria con datos e inteligencia artificial para Latinoamérica.",
        resultado: "Vendida a RED Atlas",
        tono: "bien",
      },
      {
        clave: "prestagente",
        nombre: "PrestaGente",
        cuando: "2017 · 2019",
        texto: "Libranza entre personas. Todavía opera.",
        resultado: "Vendida a Taurus Capital",
        tono: "bien",
      },
      {
        clave: "beriblock",
        nombre: "Beriblock",
        cuando: "2018 · 2019",
        texto:
          "Autenticación de pagarés con blockchain. La tecnología funcionaba; el mercado no existía.",
        resultado: "Quebró",
        tono: "mal",
      },
      {
        clave: "elpalomo",
        nombre: "El Palomo",
        cuando: "2016 · 2017",
        texto: "Flores por suscripción.",
        resultado: "Quebró",
        tono: "mal",
      },
    ] as Empresa[],
    familia: "Su papá y su abuelo también fueron empresarios.",
    bioT: "Bio para el programa",
    bio: "Salomón Muriel es emprendedor y constructor de tecnología en Bogotá. Ha fundado cinco empresas: dos las vendió, dos quebraron y la de hoy es Ignia, un modelo nuevo de educación superior. Antes dirigió datos y producto en R5, con unas cuarenta personas a cargo. Asesora a emprendedores que arrancan de cero y a empresas que necesitan decidir, construir o corregir su tecnología.",
    datosT: "Datos",
    datos: [
      ["Nombre completo", "Luis Salomón Muriel Urbina"],
      ["Foto en alta", "salomonmuriel.com/charlas"],
      ["LinkedIn", "linkedin.com/in/smuriel"],
    ] as [string, string][],
    contactoT: "Para agendarlo",
    contacto:
      "Si tienes una fecha, escríbele con el público, la ciudad y el formato. Contesta él mismo.",
    canales: [
      ["WhatsApp", "+57 313 246 5100"],
      ["Correo", "salomon.muriel@gmail.com"],
      ["Agenda", "cal.com/salomonmuriel"],
      ["Sitio", "salomonmuriel.com"],
    ] as [string, string][],
  },
};

export type CopiaFicha = typeof es;
