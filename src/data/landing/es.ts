import type { Columna, Falla, Nodo, Sistema } from "./tipos";

export const es = {
  meta: {
    title: "Se arregla lo chinomático · Salomón Muriel, Bogotá",
    description:
      "Le construyo a tu empresa su sistema operativo: el software que reemplaza los Excel que no cuadran y el copiar y pegar, hecho a la medida de cómo ya trabajan. Bogotá.",
  },

  cta: {
    cuestionario: "Cuéntame de tu empresa",
    cuestionarioNota: "El cuestionario toma unos dos minutos.",
    wa: "Escribirme por WhatsApp",
    waTexto:
      "Hola Salomón, tengo una empresa de ___ y quiero contarte cómo funciona hoy.",
  },

  hero: {
    linea1: "Se arregla",
    linea2: "Lo chinomático",
    manuscrita: "voy cajita por cajita, desde la que más duele",
    bajada:
      "Le construyo a tu empresa su sistema operativo: el software que reemplaza los Excel que no cuadran y el copiar y pegar, hecho a la medida de cómo ya trabajan.",
    dicc: {
      palabra: "chi·no·má·ti·co, ca",
      categoria: "adj.",
      acepciones: [
        "Dicho de un proceso: que <b class='font-bold'>parece</b> automatizado, pero hay alguien haciéndolo a mano.",
        "Dicho de dos sistemas: que no se hablan, y alguien los pega copiando y pegando.",
        "Dicho de un programa: el que te vendieron carísimo y hoy nadie abre.",
        "Dicho de una empresa: la tuya, probablemente.",
      ],
    },
    especificacion: "Para empresas de 5 a 40 personas que ya venden",
    fichaAlt:
      "Retrato de Salomón Muriel, de abrigo verde y brazos cruzados, sobre fondo oscuro",
    ficha: [
      ["Dónde", "Bogotá", false],
      ["Empresas propias", "Cinco, dos vendidas", false],
    ] as [string, string, boolean][],
  },

  cinta: [
    "Sistema operativo para una tienda de novias",
    "CRM para una plataforma de colegios",
    "Actas que la familia firma desde el celular",
    "Recordatorios de WhatsApp que salen solos",
    "La operación de una agencia en un solo lugar",
  ],

  clientes: {
    rotulo: "Le he construido tecnología a",
  },

  danos: {
    rotulo: "Registro de fallas",
    nota: "Se repiten en empresas que no tienen nada que ver entre sí.",
    titulo: "Los problemas que más me cuentan",
    etiqueta: "Falla",
    cierre:
      "Si nada de esto te suena, probablemente no soy la persona indicada.",
    ctaTexto:
      "Si sientes que la empresa sigue en la edad de piedra, cuéntame cómo funciona hoy.",
    fallas: [
      {
        n: "01",
        titulo: "Los Excel no cuadran",
        texto:
          "Hay veinte hojas de cálculo que nadie tiene al día, y cada una dice algo distinto.",
        nota: "y cuando no cuadran, gana el que hable más duro en la reunión",
        imagen: "torre-excel",
        alt: "Una torre de carpetas y hojas de cálculo a punto de caerse",
      },
      {
        n: "02",
        titulo: "Los pedidos se pierden en el chat",
        texto:
          "Llegan por WhatsApp y alguien los pasa a mano a un Excel al final del día.",
        nota: "y si alguien olvida pasarlo, el cliente se queda esperando",
        imagen: "chat-pedidos",
        alt: "Un celular lleno de mensajes de WhatsApp rodeado de cajas y facturas",
      },
      {
        n: "03",
        titulo: "Seguimos en la edad de piedra",
        texto:
          "Para saber cuánto se vendió ayer toca preguntarle a alguien, y si esa persona renuncia se lleva el proceso.",
        nota: "y el que llega lo aprende de oídas",
        imagen: "tabla-piedra",
        alt: "Una hoja de cálculo tallada en una lápida de piedra sobre un escritorio",
      },
    ] as Falla[],
  },

  cajitas: {
    rotulo: "Cómo te explico mi trabajo",
    nota: "Es la idea con la que trabajo.",
    titulo: "Una empresa es un sistema de cajitas",
    texto:
      "Mercadeo trae gente a la página y a WhatsApp, esa gente le llega a ventas, y cada venta le abre trabajo a operaciones y una factura a administración. En casi todas las empresas cada cajita tiene su propio Excel o su propio programa, y alguien pasa los datos de una a otra a mano.",
    texto2:
      "<b class='font-semibold text-tinta'>Cuando las cajitas quedan conectadas, tu empresa tiene su sistema operativo.</b> La información entra una vez y llega sola a donde tiene que llegar. Construyo la cajita que falta y la dejo conectada antes de pasar a la siguiente.",
    marco: "Sistema operativo",
    alt: "Mercadeo lleva a la página web y a WhatsApp, las dos alimentan a ventas, y ventas abre el trabajo de operaciones y la factura de administración. Todo queda dentro del sistema operativo de la empresa.",
    nodos: {
      mercadeo: { titulo: "Mercadeo", sub: "Campañas" },
      web: { titulo: "Página web", sub: "Formularios" },
      chat: { titulo: "WhatsApp", sub: "Conversaciones" },
      ventas: { titulo: "Ventas", sub: "CRM" },
      ops: { titulo: "Operaciones", sub: "Pedidos" },
      admin: { titulo: "Administración", sub: "Facturas" },
    } as Record<string, Nodo>,
    manuscrita:
      "si dos cajitas quedan pegadas con una persona en la mitad, quedaron chinomáticas",
    ctaTexto: "Cuéntame cuál de estas cajitas te duele más.",
  },

  sistemas: {
    rotulo: "Obra entregada",
    nota: "Son sistemas que ya funcionan. Las pantallas tienen datos de prueba.",
    titulo: "Sistemas operativos que ya construí",
    bajada:
      "Casi todas estas empresas funcionaban a punta de Excel, WhatsApp y alguien copiando y pegando.",
    reemplazo: "Reemplazó",
    items: [
      {
        clave: "aura",
        sector: "Tienda de novias",
        nombre: "Aura Novias",
        que: "Su sistema operativo tiene la agenda de citas, el inventario de vestidos, los contratos, los pagos y los mensajes de WhatsApp a cada novia.",
        reemplazo:
          "la herramienta de reservas, las hojas de cálculo de vestidos, el libro de novias en papel y los mensajes escritos a mano.",
        alt: "Pantalla de Aura OS con las citas del día y los vestidos por mover",
      },
      {
        clave: "guiacolegio",
        sector: "Plataforma de colegios",
        nombre: "Guía Colegio",
        que: "Un CRM hecho para su forma de vender, del primer contacto al cierre, con las tareas del día y de dónde llega cada colegio.",
        reemplazo: "Kommo, los correos y la memoria del equipo.",
        alt: "Tablero de ventas del CRM de Guía Colegio con colegios por etapa",
      },
      {
        clave: "visible",
        sector: "Agencia de marca personal · en construcción",
        nombre: "Visible",
        que: "Su sistema operativo, que estoy construyendo ahora, junta los clientes, las entregas y las aprobaciones en un solo lugar, y tiene un portal para el cliente.",
        alt: "Portal del cliente de Visible en el celular, con el avance del ciclo y las publicaciones por aprobar",
      },
      {
        clave: "colegio",
        sector: "Colegio",
        nombre: "Comunicaciones y actas",
        que: "Las reuniones con familias se graban, la inteligencia artificial escribe el borrador del acta y la familia la firma desde el celular. Los correos del colegio se vuelven el plan de la semana.",
        reemplazo: "las actas escritas a mano.",
        alt: "Borrador del acta de una reunión con la familia, escrito por la inteligencia artificial y listo para revisar",
      },
      {
        clave: "ignia",
        sector: "Educación",
        nombre: "Ignia",
        que: "El CRM de admisiones, con un asistente que confirma y recuerda las citas por WhatsApp, y el sistema con el que seguimos a cada fellow.",
        alt: "Tablero de oportunidades del CRM de Ignia",
      },
    ] as Sistema[],
  },

  banda: {
    titulo: "A tu empresa también le puedo construir su sistema operativo.",
    texto: "Cuéntame cómo funciona hoy y te digo por dónde empezaría.",
  },

  porque: {
    rotulo: "Diagnóstico diferencial",
    nota: "Frente a una agencia o un programa comprado.",
    titulo: "Cómo trabajo",
    razones: [
      {
        giro: "-rotate-[5deg]",
        titulo: "Un solo sistema operativo.",
        parrafos: [
          "Muchas empresas compran un programa por área y terminan con diez que no se hablan. Construyo un sistema que conecta los programas que sirven y reemplaza los que sobran.",
        ],
        manuscrita: "muchas veces el programa sirve y solo falta conectarlo",
        giroNota: "-rotate-[1deg]",
      },
      {
        giro: "rotate-[4deg]",
        titulo: "Construyo con inteligencia artificial.",
        parrafos: [
          "Uso agentes de inteligencia artificial para programar, y eso me deja entregar un sistema a la medida en semanas.",
          "También <b class='font-semibold text-tinta'>le enseño a tu gente a usarlos</b> para el trabajo de oficina que hoy hacen a mano.",
        ],
        manuscrita: "esto cambió muchísimo en los últimos dos años",
        giroNota: "rotate-[1deg]",
      },
      {
        giro: "-rotate-[3deg]",
        titulo: "El sistema se acomoda a tu empresa.",
        parrafos: [
          "Un programa comprado está hecho para otra empresa, y a tu gente le toca adaptarse a él. Primero miro cómo se hace el trabajo hoy y construyo sobre eso, y por eso la gente sí lo usa.",
        ],
        manuscrita: "la primera semana me siento con quien lo va a usar",
        giroNota: "-rotate-[1deg]",
      },
    ],
  },

  programa: {
    rotulo: "Programa de obra · 16 semanas",
    nota: "De la primera conversación a tu equipo usándolo.",
    titulo: "Un proyecto de 16 semanas",
    etapas: [
      {
        cuando: "Semanas 1 y 2",
        titulo: "Entender la operación",
        texto: "Hablo contigo y con la gente que hace el trabajo.",
      },
      {
        cuando: "Semanas 2 y 3",
        titulo: "Diagnóstico",
        texto: "Te digo qué atacar primero y te entrego una parte funcionando.",
      },
      {
        cuando: "Semanas 4 a 16",
        titulo: "Construir",
        texto:
          "Armo el sistema operativo cajita por cajita, hasta que tu equipo lo use sin mí.",
      },
    ],
    garantiaRotulo: "Semana tres",
    garantia:
      "Si lo que te entregué en la semana tres no te sirve, ahí paramos.",
    alt: "Una grúa pone una cajita nueva al lado de otras que ya están conectadas",
  },

  entrega: {
    rotulo: "Lista de empaque",
    nota: "Lo que recibes al final del proyecto.",
    titulo: "Lo que te llevas cuando termino",
    bajada: "Al final no dependes de mí para usarlo ni para cambiarlo.",
    alt: "Una caja abierta con un computador y un manual, al lado de un llavero y un candado abierto",
    columnas: [
      {
        t: "Tu sistema operativo funcionando",
        d: "Con tus datos reales, tu gente ya usándolo y el entrenamiento grabado para el que llegue después.",
      },
      {
        t: "Todo a tu nombre",
        d: "El código, las cuentas y los accesos son de tu empresa, y no pagas una mensualidad por usuario.",
      },
      {
        t: "Cómo cambiarlo sin mí",
        d: "Les enseño a ti y a tu equipo a hacer cambios con inteligencia artificial.",
      },
      {
        t: "El tiempo medido",
        d: "Cronometramos el proceso antes y después, y lo revisamos al mes y a los dos meses.",
      },
    ] as Columna[],
    noIncluye:
      "<b class='font-semibold text-tinta'>No incluye</b> cambiar la empresa entera de una vez, armar equipos de tecnología ni vender licencias. Y si lo que necesitas ya existe y funciona, te lo digo antes de construirlo.",
  },

  antes: {
    rotulo: "Historial",
    nota: "Incluidas las que no funcionaron.",
    titulo: "Antes de esto, monté mis propias empresas",
    enlace: "La historia completa, en sobre mí",
  },

  montado: {
    rotulo: "Historial",
    nota: "Incluidas las que no funcionaron.",
    titulo: "Lo que he construido",
    pieFoto:
      "La herramienta de valoración que estoy mostrando ahí la construimos nosotros.",
    fotoAlt:
      "Salomón Muriel mostrando la plataforma de Finco en una feria, junto a un compañero de equipo",
    empresas: [
      {
        clave: "ignia",
        nombre: "Ignia",
        cuando: "Hoy",
        texto:
          "Un modelo nuevo de educación superior. Le construí la página web, el sistema con el que se operan los cursos, el CRM y el portal de comunidad.",
      },
      {
        clave: "finco",
        nombre: "Finco",
        cuando: "2019 a 2022",
        texto:
          "Valoración inmobiliaria con datos e inteligencia artificial para toda Latinoamérica. Cien mil reportes al año.",
        remate: "Vendida a RED Atlas.",
        remateRojo: false,
      },
      {
        clave: "prestagente",
        nombre: "PrestaGente",
        cuando: "2017 a 2019",
        texto: "Libranza entre personas.",
        remate: "Vendida a Taurus Capital",
        cola: " y todavía opera, sin mí.",
        remateRojo: false,
      },
      {
        clave: "beriblock",
        nombre: "Beriblock",
        cuando: "2018 a 2019",
        texto: "Autenticación de pagarés con blockchain.",
        remate: "Quebró.",
        cola: " La tecnología funcionaba; el mercado no existía.",
        remateRojo: true,
      },
      {
        clave: "elpalomo",
        nombre: "El Palomo",
        cuando: "2016 a 2017",
        texto: "Flores por suscripción.",
        remate: "Fracasó.",
        cola: " Si quieres, te cuento la historia.",
        remateRojo: true,
      },
      {
        clave: "r5",
        nombre: "R5",
        cuando: "Como empleado",
        texto:
          "Dirigí unas cuarenta personas. Construí el pipeline de datos completo y el sistema de modelación de riesgo.",
      },
    ],
    cierre2: "Mi papá y mi abuelo también fueron empresarios.",
  },

  voces: {
    rotulo: "Lo que dicen",
    nota: "Dueños contando qué cambió.",
    titulo: "Lo que dice la gente con la que ya trabajé",
  },
} as const;
