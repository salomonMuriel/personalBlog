import type { Columna, Falla, Nodo, Sistema } from "./tipos";

export const es = {
  meta: {
    title: "Se arregla lo chinomático · Salomón Muriel, Bogotá",
    description:
      "Le construyo a tu empresa su sistema operativo: el software que reemplaza los Excel que no cuadran y el copiar y pegar, hecho a la medida de cómo ya trabajan. Bogotá.",
  },

  cta: {
    cuestionario: "Cuéntame de tu empresa",
    cuestionarioNota: "",
    wa: "Escribirme por WhatsApp",
    waTexto:
      "Hola Salomón, me llamo ______ y tengo una empresa de _____, quiero arreglarle lo chinomático.",
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
        "Dicho de un proceso: que <b class='font-bold'>debería</b> ser automático, pero que lo hace alguien a mano.",
        "Dicho de un sistema: el que está hecho de Excel, WhatsApp y papel.",
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

  clientes: {
    rotulo: "Le he construido tecnología a",
  },

  danos: {
    rotulo: "Registro de fallas",
    nota: "",
    titulo: "Los problemas que más me cuentan",
    etiqueta: "Falla",
    cierre:
      "Si nada de esto te suena, probablemente no soy la persona indicada.",
    ctaTexto:
      "Si tu empresa sigue en la edad de piedra, cuéntame cómo funciona hoy.",
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
    nota: "",
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
    nota: "Todos estos sistemas están en uso menos Visible, que está en construcción. Las pantallas tienen datos de prueba.",
    titulo: "Sistemas operativos que he construido",
    bajada:
      "Casi todas estas empresas funcionaban a punta de Excel y WhatsApp, con alguien copiando y pegando de uno al otro.",
    reemplazo: "Reemplazó",
    items: [
      {
        clave: "aura",
        sector: "Tienda de novias",
        nombre: "Aura Novias",
        que: "Su sistema operativo lleva la agenda de citas, el inventario de vestidos, los contratos, los pagos y los mensajes de WhatsApp a cada novia.",
        reemplazo:
          "la herramienta de reservas, las hojas de cálculo de los vestidos, el libro de novias en papel y los mensajes que se mandaban a mano.",
        alt: "Las citas del día en Aura OS con su estado de pago, y una columna de pendientes con vestidos sin devolver y saldos vencidos",
      },
      {
        clave: "guiacolegio",
        sector: "Plataforma de colegios",
        nombre: "Guía Colegio",
        que: "Un CRM hecho para su forma de vender, del primer contacto al cierre, y un panel donde cada colegio ve las familias que le llegan.",
        reemplazo:
          "Kommo y el seguimiento que el equipo llevaba por correo y de memoria.",
        alt: "Tablero de ventas del CRM de Guía Colegio, con los colegios por etapa",
      },
      {
        clave: "visible",
        sector: "Agencia de marca personal · en construcción",
        nombre: "Visible",
        que: "Su sistema operativo va a juntar los clientes, las entregas y las aprobaciones, y cada cliente va a tener su propio portal.",
        alt: "Diseño propuesto para el portal del cliente de Visible en el celular, con el avance del ciclo y las publicaciones por aprobar",
      },
      {
        clave: "colegio",
        sector: "Colegio",
        nombre: "Comunicaciones y actas",
        que: "Las reuniones con las familias se graban, la inteligencia artificial escribe el borrador del acta y la familia la firma desde el celular. El sistema también convierte los correos del colegio en el plan de la semana de cada familia.",
        reemplazo: "las actas escritas a mano.",
        alt: "Borrador del acta de una reunión con una familia, escrito por la inteligencia artificial y listo para revisar",
      },
      {
        clave: "ignia",
        sector: "Educación",
        nombre: "Ignia",
        que: "Su sistema de admisiones empieza con un diagnóstico que llena cada aspirante. Después, cada caso se sigue en un CRM que confirma y recuerda las citas por WhatsApp.",
        alt: "Tablero del CRM de admisiones de Ignia, con las oportunidades por etapa",
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
        titulo: "El sistema se acomoda a tu empresa.",
        parrafos: [
          "Un programa comprado está hecho para otra empresa, y a tu gente le toca adaptarse a él. Primero miro cómo se hace hoy el trabajo y construyo sobre eso. Por eso la gente sí lo usa.",
        ],
      },
      {
        giro: "rotate-[4deg]",
        titulo: "Construyo con inteligencia artificial.",
        parrafos: [
          "Uso agentes de inteligencia artificial para programar, y eso me deja entregar un sistema a la medida en semanas.",
          "También <b class='font-semibold text-tinta'>le enseño a tu gente a usarlos</b> para el trabajo de oficina que hoy hacen a mano.",
        ],
      },
      {
        giro: "-rotate-[3deg]",
        titulo: "Un solo sistema operativo.",
        parrafos: [
          "Muchas empresas compran un programa por área y terminan con diez que no se hablan. Construyo un sistema que conecta los programas que sirven y reemplaza los que sobran.",
        ],
      },
    ],
  },

  programa: {
    rotulo: "Programa de obra",
    nota: "Las semanas cuentan desde la primera entrevista.",
    titulo: "Qué pasa si trabajamos juntos",
    semanaCorta: "S",
    filas: [
      { nombre: "Entendimiento", desde: 1, hasta: 1, entrega: false },
      { nombre: "Cajita 1", desde: 2, hasta: 3, entrega: true },
      { nombre: "Cajita 2", desde: 4, hasta: 5, entrega: true },
      { nombre: "Cajita 3", desde: 6, hasta: 7, entrega: true },
    ],
    filaAbierta: "Una cada dos semanas",
    notaPrimera: "funcionando en la semana 3",
    etapas: [
      {
        cuando: "Semana 1",
        titulo: "Te entrevisto",
        texto:
          "La primera semana me siento contigo para entender tus procesos de pe a pa.",
      },
      {
        cuando: "Semana 3",
        titulo: "Te entrego la primera cajita",
        texto:
          "Empiezo por la que más duele, y dos semanas después de la entrevista ya funciona con tus datos.",
      },
      {
        cuando: "Cada dos semanas",
        titulo: "Una cajita más",
        texto:
          "Construyo la siguiente y la conecto con las anteriores, hasta que tu equipo use el sistema operativo sin mí.",
      },
    ],
    alt: "Una grúa pone una cajita nueva al lado de otras que ya están conectadas",
  },

  entrega: {
    rotulo: "Lista de empaque",
    nota: "",
    titulo: "Lo que te llevas cuando termino",
    bajada: "",
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
  },

  antes: {
    rotulo: "Historial",
    nota: "",
    titulo: "Antes de esto, monté mis propias empresas",
    enlace: "Leer la historia completa",
  },

  montado: {
    rotulo: "Historial",
    nota: "",
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
        cola: " y sigue operando.",
        remateRojo: false,
      },
      {
        clave: "beriblock",
        nombre: "Beriblock",
        cuando: "2018 a 2019",
        texto: "Autenticación de pagarés con blockchain.",
        remate: "Quebró.",
        cola: " La tecnología funcionaba, pero no había mercado.",
        remateRojo: true,
      },
      {
        clave: "elpalomo",
        nombre: "El Palomo",
        cuando: "2016 a 2017",
        texto: "Flores por suscripción.",
        remate: "Fracasó.",
        cola: "",
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
    rotulo: "Testimonios",
    nota: "",
    titulo: "Lo que dice la gente con la que ya trabajé",
  },
} as const;
