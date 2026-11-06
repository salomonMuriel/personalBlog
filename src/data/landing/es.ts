import type { Falla, Renglon, Sistema } from "./tipos";

export const es = {
  meta: {
    title: "Se arregla lo chinomático · Salomón Muriel, Bogotá",
    description:
      "Te construyo el sistema operativo de tu empresa: el software que reemplaza los Excel que no cuadran y el copiar y pegar, hecho a la medida de cómo ya trabajas. Bogotá.",
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
    manuscrita: "una cajita a la vez, empezando por la que más duele",
    bajada:
      "Te construyo el sistema operativo de tu empresa: el software que reemplaza los Excel que no cuadran y el copiar y pegar, hecho a la medida de cómo ya trabajas.",
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
      ["Quién atiende", "Salomón", false],
      ["Dónde", "Bogotá", false],
      ["Empresas propias", "Cinco, dos vendidas", false],
      ["Quién programa", "Él mismo", true],
    ] as [string, string, boolean][],
    fichaPie: "Si me escribes por WhatsApp, te contesto yo.",
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
    titulo: "Las fallas que más veo",
    etiqueta: "Falla",
    cierre:
      "Si nada de esto te suena, probablemente no soy la persona indicada.",
    ctaTexto:
      "Si sientes que la empresa sigue en la edad de piedra, cuéntame cómo funciona hoy.",
    fallas: [
      {
        n: "01",
        quien: "Lo reporta el dueño",
        antes: "Hay ",
        marcado: "veinte Excel",
        despues: " y ninguno cuadra con el otro.",
        nota: "y cuando no cuadran, gana el que hable más duro en la reunión",
        manuscrita: true,
        giro: "-rotate-[.8deg]",
      },
      {
        n: "02",
        quien: "Lo reporta quien lo hace",
        antes: "La gente se pasa el día ",
        marcado: "copiando y pegando",
        despues: " de un lado a otro.",
        nota: "las cajitas no están conectadas, y el que lo sufre es el que digita",
        manuscrita: true,
        giro: "rotate-[.6deg]",
      },
      {
        n: "03",
        quien: "Lo reporta ventas",
        antes: "Los pedidos llegan por WhatsApp y ",
        marcado: "se pierden en el chat",
        despues: ".",
        nota: "O alguien los pasa a mano a un Excel al final del día.",
        manuscrita: false,
      },
      {
        n: "04",
        quien: "Lo reporta contabilidad",
        antes: "Para saber cuánto se vendió ayer ",
        marcado: "toca preguntarle a alguien",
        despues: ".",
        nota: "El número está en tres lados y cada uno dice algo distinto.",
        manuscrita: false,
      },
      {
        n: "05",
        quien: "Se reporta tarde",
        antes: "Si esa persona renuncia, ",
        marcado: "se lleva el proceso puesto",
        despues: ".",
        nota: "y el que llega lo aprende de oídas",
        manuscrita: true,
        giro: "-rotate-[1deg]",
      },
    ] as Falla[],
  },

  cajitas: {
    rotulo: "Cómo te explico mi trabajo",
    nota: "Es la idea con la que trabajo.",
    titulo: "Una empresa es un sistema de cajitas",
    p1: "Mercadeo manda tráfico a la página y a WhatsApp. Eso le genera leads a ventas. Ventas le devuelve información a mercadeo y le abre trabajo a operaciones y a administración. Cada una es una cajita, y cada cajita tiene su propio sistema.",
    p2: "<b class='font-semibold text-tinta'>Yo construyo esas cajitas y las conecto.</b> El CRM que necesita tu proceso de ventas, el sistema con el que trabaja operaciones, la facturación de administración: te construyo el que te falte, a la medida de cómo ya trabajas, y lo dejo conectado con los demás.",
    estadoSistema: "Estado del sistema",
    btnHoy: "Como está hoy",
    btnQueda: "Como queda",
    leyendaManual: "Paso manual",
    leyendaConectado: "Conectado",
    cajas: {
      mercadeo: {
        titulo: "Mercadeo",
        rotulo: "Por el canal que sea",
        hoy: "Un gestor de campañas por un lado y una hoja de cálculo por otro.",
        queda:
          "El mismo gestor de campañas. Ahora sí sabe qué campaña trajo la venta.",
        orden: "5.ª",
      },
      web: {
        titulo: "Página web",
        rotulo: "El sitio",
        hoy: "Un sistema aparte, de otro proveedor, que le manda correos a alguien.",
        queda:
          "Sigue siendo tu página. Lo que entra por ahí cae donde tiene que caer.",
        orden: "4.ª",
      },
      chat: {
        titulo: "WhatsApp",
        rotulo: "El chat",
        hoy: "El teléfono de una persona. Si esa persona no está, no hay nadie.",
        queda:
          "Lo que se habla por el chat queda registrado sin que nadie lo transcriba.",
        orden: "4.ª",
      },
      ventas: {
        titulo: "Ventas",
        rotulo: "Los leads",
        hoy: "Un CRM caro que se usa a medias, porque llenarlo es doble trabajo.",
        queda:
          "El CRM que te construyo para tu proceso de ventas. Llenarlo dejó de ser trabajo extra.",
        orden: "1.ª",
      },
      ops: {
        titulo: "Operaciones",
        rotulo: "El trabajo",
        hoy: "Un Excel que solo entiende una persona.",
        queda:
          "El sistema de operación que te construyo. El trabajo se abre solo al cerrar la venta.",
        orden: "2.ª",
      },
      opsdos: {
        titulo: "Operaciones",
        titulo2: "(la otra)",
        rotuloHoy: "Dos cajitas para el mismo trabajo",
        rotuloQueda: "Ya no hace falta",
        hoy: "El Notion que montaron, con datos de hace ocho meses. Y les toca llenar los dos.",
        queda:
          "El trabajo vive en una sola. Lo que servía de la otra se pasó antes de apagarla.",
        orden: "Apagada",
      },
      admin: {
        titulo: "Administración",
        rotulo: "Facturación y soportes",
        hoy: "Otro Excel. Y la factura se hace a mano, una por una.",
        queda: "La factura sale sola de la venta, con los datos ya adentro.",
        orden: "3.ª",
      },
    },
    enlaces: {
      mercadeoWeb: [
        "El formulario le llega por correo a alguien",
        "El lead entra solo",
      ],
      mercadeoChat: [
        "La campaña manda al chat y ahí se queda",
        "El chat también deja el lead adentro",
      ],
      webVentas: ["Alguien copia el correo al CRM", "Sin que nadie copie nada"],
      chatVentas: [
        "Alguien transcribe la conversación",
        "Sin que nadie transcriba",
      ],
      ventasOps: [
        "Se avisa por un chat interno",
        "La venta abre el trabajo sola",
      ],
      opsOpsdos: ["Los mismos datos, otra vez", ""],
      ventasAdmin: ["La factura se hace a mano", "La factura sale sola"],
      retorno: [
        "Nadie devuelve el dato",
        "Cada venta le dice a mercadeo de dónde vino",
      ],
    },
    retornoMovil: "Y de vuelta a mercadeo:",
    retornoMovilHoy:
      "hoy nadie devuelve el dato, así que mercadeo no sabe qué campaña trajo la venta.",
    retornoMovilQueda: "cada venta le dice a mercadeo de dónde vino.",
    verdadNoRotulo: "Tres versiones del mismo dato",
    verdadNo:
      "Ninguna cuadra con la otra, y para saber cuál sirve toca preguntarle a alguien.",
    verdadSiRotulo: "El dato en un solo lugar",
    verdadSi:
      "Cuando alguien pregunta cuánto se vendió ayer, todos miran el mismo número.",
    cierreTitulo:
      "Construyo la cajita y la dejo conectada <b class='text-rojo2'>antes</b> de pasar a la siguiente.",
    cierreP1:
      "Lo chinomático aparece en la mitad: alguien saca el dato de una cajita y lo mete en la otra, todos los días. Cuando la conexión queda hecha, esa persona deja de copiar y pegar y vuelve al trabajo para el que la contrataste.",
    cierreP2:
      "En «como queda», los números rojos son el orden de un caso típico. En el tuyo empezamos por donde más duela.",
    cierreManuscrita:
      "si dos cajitas quedan pegadas con una persona en la mitad, quedaron chinomáticas",
    ctaTexto: "Cuéntame cuál de estas cajitas te duele más.",
  },

  sistemas: {
    rotulo: "Obra entregada",
    nota: "Son sistemas que ya funcionan. Las pantallas tienen datos de prueba.",
    titulo: "Sistemas que ya construí para otras empresas",
    bajada:
      "Casi todas funcionaban a punta de Excel, WhatsApp y alguien copiando y pegando.",
    reemplazo: "Reemplazó",
    items: [
      {
        clave: "aura",
        sector: "Tienda de novias",
        nombre: "Aura Novias",
        que: "Su sistema operativo: la agenda de citas, el inventario de vestidos, los contratos, los pagos y los mensajes de WhatsApp a cada novia.",
        reemplazo:
          "la herramienta de reservas, las hojas de cálculo de vestidos, el libro de novias en papel y los mensajes escritos a mano.",
        alt: "Pantalla de Aura OS con las citas del día y los vestidos por mover",
      },
      {
        clave: "guiacolegio",
        sector: "Plataforma de colegios",
        nombre: "Guía Colegio",
        que: "Un CRM hecho para su forma de vender: del primer contacto al cierre, con las tareas del día y de dónde llega cada colegio.",
        reemplazo: "Kommo, los correos y la memoria del equipo.",
        alt: "Tablero de ventas del CRM de Guía Colegio con colegios por etapa",
      },
      {
        clave: "visible",
        sector: "Agencia de marca personal · en construcción",
        nombre: "Visible",
        que: "Su sistema operativo, que estoy construyendo ahora: cada cliente, cada entrega y cada aprobación en un solo lugar, con un portal para el cliente.",
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
        titulo: "Una sola persona.",
        parrafos: [
          "La estrategia y el software los hago yo. No hay un consultor que entrega una presentación y un proveedor que la interpreta a su manera. <b class='font-semibold text-tinta'>Lo que decidimos el lunes lo empiezo a construir el martes.</b>",
        ],
        manuscrita:
          "el que te escucha en la primera llamada es el que programa",
        giroNota: "-rotate-[1deg]",
      },
      {
        giro: "rotate-[4deg]",
        titulo: "Software a la medida, en semanas.",
        parrafos: [
          "Programo con agentes de inteligencia artificial en vez de subcontratar, y eso me deja construir rápido.",
          "También <b class='font-semibold text-tinta'>le enseño a tu gente a usarlos</b> para el trabajo de oficina que hoy hacen a mano.",
        ],
        manuscrita: "esto cambió muchísimo en los últimos dos años",
        giroNota: "rotate-[1deg]",
      },
      {
        giro: "-rotate-[3deg]",
        titulo: "El software se le acomoda a tu empresa.",
        parrafos: [
          "Lo usual es comprar un programa hecho para otra empresa y obligar a tu gente a adaptarse. Yo primero miro cómo se hace el trabajo hoy y construyo sobre eso, y por eso la gente sí lo usa.",
        ],
        manuscrita: "la primera semana me siento con quien lo va a usar",
        giroNota: "-rotate-[1deg]",
      },
    ],
  },

  programa: {
    rotulo: "Programa de obra · 16 semanas",
    nota: "De la primera conversación a tu equipo usándolo.",
    titulo: "Qué pasa si trabajamos juntos",
    barras: ["Entender", "Diagnóstico", "Construir · una cajita a la vez"],
    etapas: [
      {
        cuando: "Semanas 1 a 2",
        titulo: "Entender la operación",
        texto:
          "Hablo con la gente que la hace, no solo contigo, y miro cómo se hace de verdad.",
      },
      {
        cuando: "Semanas 2 a 3",
        titulo: "Diagnóstico",
        texto:
          "Te entrego un plan corto con el cuello de botella que vale la pena atacar primero, y una primera cosa ya funcionando.",
      },
      {
        cuando: "Semanas 4 a 16",
        titulo: "Construir",
        texto:
          "Construyo el sistema y las conexiones entre cajitas, hasta que tu equipo lo esté usando.",
      },
    ],
    garantiaRotulo: "Semana tres",
    garantia:
      "Para entonces ya tienes algo funcionando. Si no te sirve, ahí paramos.",
  },

  entrega: {
    rotulo: "Lista de empaque",
    nota: "Lo que recibes al final del proyecto.",
    titulo: "Qué te queda cuando termino",
    bajada: "Al final no dependes de mí para usarlo ni para cambiarlo.",
    cajaTitulo: "Va en la caja",
    cajaConteo: "04 renglones",
    renglones: [
      {
        n: "01",
        t: "El sistema funcionando, con tus datos reales",
        d: "Y tu gente ya usándolo, con la grabación del entrenamiento para el que llegue después.",
        resaltado: false,
      },
      {
        n: "02",
        t: "Todo a nombre de tu empresa",
        d: "El código, las cuentas, las claves y los accesos. No hay cobro mensual por usuario, y si mañana quieres trabajar con otra persona, te lo llevas completo.",
        resaltado: true,
      },
      {
        n: "03",
        t: "Cómo cambiarlo sin mí",
        d: "Te enseño a ti y a tu equipo a hacer cambios con inteligencia artificial. Para mover un botón no tienes que llamarme.",
        resaltado: true,
      },
      {
        n: "04",
        t: "El tiempo medido y mi WhatsApp",
        d: "Cronometramos el proceso al entrar y al salir, y te entrego el número. Hay dos revisiones, al mes y a los dos meses, y me escribes directamente a mí.",
        resaltado: false,
      },
    ] as Renglon[],
    menudaTitulo: "Lo que no incluye",
    menudaAviso: "Importante",
    menuda:
      "<b class='font-bold'>No</b> cambio la empresa entera: es un proceso a la vez. No armo equipos de tecnología ni vendo licencias. Y si lo que necesitas ya existe y funciona, te lo digo en vez de construirlo.",
    manuscrita: "cuando el primer proceso quede andando, hablamos del segundo",
    tampocoTitulo: "Tampoco hago",
    tampoco: [
      "Escalar empresas que ya son grandes.",
      "Investigación o desarrollo de tecnología nueva.",
      "Informes largos para la junta directiva.",
    ],
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
