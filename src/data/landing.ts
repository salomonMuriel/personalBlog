/**
 * Toda la copia de la página de consultoría, en los dos idiomas.
 *
 * El español es el de `design-directions/direction-36.html`, palabra por
 * palabra: está aprobado por el cliente y no se reescribe. El inglés es
 * traducción, y es el idioma secundario del sitio.
 *
 * Los componentes de `src/components/home/` sólo ponen la estructura; el
 * texto sale de acá.
 */
import type { Lang } from "@i18n/ui";

export type Falla = {
  n: string;
  quien: string;
  antes: string;
  marcado: string;
  despues: string;
  nota: string;
  manuscrita: boolean;
  giro?: string;
};

export type Renglon = { n: string; t: string; d: string; resaltado: boolean };

const es = {
  meta: {
    title: "Se arregla lo chinomático — Salomón Muriel, Bogotá",
    description:
      "Te construyo software hecho a la medida de tu empresa y de como ya trabajas, en vez de que te toque torcer la empresa para caber en un programa que compraste. Sin cobro mensual por usuario. Consultoría, Bogotá.",
  },

  hero: {
    linea1: "Se arregla",
    linea2: "Lo chinomático",
    manuscrita: "sin cambiarte la empresa entera, una cajita a la vez",
    bajada:
      "Te construyo software hecho a la medida de tu empresa y de como ya trabajas, en vez de que a ti te toque torcer la empresa para caber en un programa que compraste.",
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
    ctaPrincipal: "Cuéntame qué tienes montado",
    ctaPrincipalWa:
      "Hola Salomón, tengo una empresa de ___ y quiero contarte qué tengo montado.",
    ctaSecundario: "Ver el sistema de cajitas",
    especificacion:
      "Software propio · Sin cobro mensual por usuario · Lo puedes cambiar después",
    fichaAlt:
      "Retrato de Salomón Muriel, de abrigo verde y brazos cruzados, sobre fondo oscuro",
    ficha: [
      ["Quién atiende", "Salomón", false],
      ["Dónde", "Bogotá", false],
      ["Empresas", "5 · va la quinta", false],
      ["Quién contesta", "También Salomón", true],
    ] as [string, string, boolean][],
    fichaPie:
      "El que te contesta el WhatsApp y el que escribe el código son el mismo. Por eso alcanzo para pocos.",
  },

  cinta: [
    "Lo que dice un Excel no es lo que dice el otro",
    "La misma información, metida dos veces",
    "Un CRM carísimo que se usa a medias",
    "Sistemas que no se hablan",
    "Alguien en la mitad, copiando y pegando",
  ],

  danos: {
    rotulo: "Registro de fallas",
    nota: "Los mismos siete renglones, en empresas que no se conocen entre sí.",
    titulo: "Lo que me reportan, casi siempre lo mismo",
    etiqueta: "Falla",
    cierre:
      "Si nada de esto te sonó, probablemente no te sirvo, y prefiero decírtelo acá y no en la cuarta reunión.",
    fallas: [
      {
        n: "01",
        quien: "Lo reporta el dueño",
        antes: "",
        marcado: "Lo que dice el Excel",
        despues: " no es lo mismo que dice el programa que compraste.",
        nota: "y cuando no cuadran, gana el que hable más duro en la reunión",
        manuscrita: true,
        giro: "-rotate-[.8deg]",
      },
      {
        n: "02",
        quien: "Nadie lo reporta",
        antes: "Alguien montó un sistema nuevo que ",
        marcado: "nadie usa",
        despues: " y que tiene datos de hace ocho meses.",
        nota: "Se quedó a medio llenar y nadie lo dice, porque montarlo costó trabajo.",
        manuscrita: false,
      },
      {
        n: "03",
        quien: "Lo reporta quien lo hace",
        antes: "La gente tiene que meter ",
        marcado: "lo mismo dos veces",
        despues: ", en dos partes.",
        nota: "las cajitas no están conectadas, y el que lo sufre es el que digita",
        manuscrita: true,
        giro: "rotate-[.6deg]",
      },
      {
        n: "04",
        quien: "Lo reporta contabilidad",
        antes: "No hay ",
        marcado: "una sola fuente de verdad",
        despues:
          ": para saber cuánto se vendió ayer toca preguntarle a alguien.",
        nota: "El número está en tres lados y ninguno cuadra con el otro.",
        manuscrita: false,
      },
      {
        n: "05",
        quien: "Lo reporta el dueño",
        antes: "Te vendieron ",
        marcado: "carísimo",
        despues:
          " un programa que por dentro es una lista, un botón y un correo.",
        nota: "Casi siempre viene inflado de módulos que tu empresa nunca va a abrir.",
        manuscrita: false,
      },
      {
        n: "06",
        quien: "No lo reporta nadie",
        antes: "El proceso ",
        marcado: "parece automático",
        despues:
          " y en realidad hay alguien haciéndolo a mano, todos los días.",
        nota: "y lo hace bien, por eso nadie se ha dado cuenta",
        manuscrita: true,
        giro: "-rotate-[1deg]",
      },
      {
        n: "07",
        quien: "Se reporta tarde",
        antes: "Si esa persona se enferma, se para. Si renuncia, ",
        marcado: "se lleva el proceso puesto",
        despues: ".",
        nota: "Y el que llega aprende de oídas, de otro que también aprendió de oídas.",
        manuscrita: false,
      },
    ] as Falla[],
  },

  chinometro: {
    rotulo: "Hoja de chequeo",
    nota: "No pide correo ni guarda nada. Al final te escribe el mensaje y tú decides si me lo mandas.",
    titulo: "El chinómetro",
    bajada: "Diez renglones. Marca los que reconozcas en tu empresa.",
    encabezadoHoja: "Síntomas reportados",
    marcadasDe: "de %s marcadas",
    borrar: "Borrar marcas",
    estimado: "Es un estimado, no una auditoría.",
    lectura: "Lectura",
    indice: "Índice chinomático",
    caratula: "Carátula del chinómetro",
    orden: "Orden de trabajo — borrador",
    items: ["ítem", "ítems"] as [string, string],
    esperando: "Esperando marcación…",
    ctaWa: "Mandarme esto por WhatsApp",
    ctaWaNota:
      "Se abre WhatsApp con el texto ya escrito. Lo corriges y lo mandas. Contesto yo.",
    ctaAgenda: "O agenda cuarenta y cinco minutos",
    sintomas: [
      "Los pedidos llegan por WhatsApp y alguien los pasa a mano a un Excel.",
      "Hay dos sistemas que dicen cosas distintas sobre lo mismo.",
      "Alguien tiene que meter la misma información en dos lados.",
      "Nos vendieron un programa carísimo y hoy casi nadie lo abre.",
      "Hay un archivo que solo una persona sabe mover.",
      "Para saber cuánto vendimos ayer toca preguntarle a alguien.",
      "La facturación se arma a mano, una por una.",
      "Alguien arma el mismo informe todos los lunes, copiando y pegando.",
      "Montamos un sistema nuevo y la gente siguió trabajando en el viejo.",
      "Cuando alguien renuncia, se va con el proceso adentro.",
    ],
    escala: [
      {
        min: 0,
        t: "Sin medir todavía",
        d: "El aparato no funciona en blanco: marca los renglones que reconozcas.",
      },
      {
        min: 10,
        t: "Chinomático leve",
        d: "Hay trabajo a mano, pero todavía está descansado. Se arregla rápido.",
      },
      {
        min: 30,
        t: "Chinomático moderado",
        d: "Tu empresa ya depende de la memoria de alguien y de que dos sistemas cuadren por buena voluntad.",
      },
      {
        min: 60,
        t: "Chinomático alto",
        d: "Buena parte de tu operación es alguien pegando cajitas a mano. Cuando esa persona se va, se te va el proceso.",
      },
      {
        min: 90,
        t: "Chinomático crítico",
        d: "Tu operación se sostiene en un acuerdo tácito entre dos personas y un chat. Escríbeme hoy.",
      },
    ],
    waVacio:
      "Hola Salomón, entré a tu página y quiero contarte cómo está mi operación.",
    waEncabezado: "Hola Salomón. Llené el chinómetro de tu página y me dio",
    waDe100: "de 100.",
    waMarque: "Esto fue lo que marqué:",
    waCierre: "Mi empresa es de ____ y somos ____ personas.",
    waProcedencia: "Llegué por:",
  },

  cajitas: {
    rotulo: "Cómo te explico mi trabajo",
    nota: "Si te llevas una sola cosa de esta página, que sea esta.",
    titulo: "Una empresa es un sistema de cajitas",
    p1: "Mercadeo manda tráfico a la página y a WhatsApp. Eso genera leads para ventas. Ventas le devuelve información a mercadeo y le abre trabajo a operaciones y a administración. Cada una de esas es una cajita, y cada cajita tiene su propio sistema.",
    p2: "<b class='font-semibold text-tinta'>Yo construyo esas cajitas y las conecto.</b> El CRM que necesita tu proceso de ventas, el sistema con el que trabaja operaciones, la facturación de administración: te construyo el que te falte, hecho a la medida de como ya trabajas, y lo dejo hablando con los de al lado.",
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
        hoy: "Sistema aparte, de otro proveedor, que le manda correos a alguien.",
        queda:
          "Sigue siendo tu página. Lo que entra por ahí ya cae donde tiene que caer.",
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
    verdadNoRotulo: "No hay una sola fuente de verdad",
    verdadNo:
      "Hay tres versiones del mismo dato y ninguna cuadra con la otra. Para saber cuál sirve, toca preguntarle a alguien.",
    verdadSiRotulo: "Una sola fuente de verdad",
    verdadSi:
      "El dato vive en un solo lugar. Cuando alguien pregunta cuánto se vendió ayer, todos miran el mismo número.",
    cierreTitulo:
      "Construyo la cajita y la dejo conectada <b class='text-rojo2'>antes</b> de pasar a la siguiente.",
    cierreP1:
      "Lo chinomático aparece en la mitad: alguien saca el dato de una cajita y lo mete en la otra, todos los días. Cuando la conexión queda hecha, ese muchacho deja de copiar y pegar y se pone a atender clientes, que es para lo que lo contrataste.",
    cierreP2:
      "Los numeritos rojos son el orden de un caso típico. El orden real lo decidimos tú y yo, mirando dónde te duele más.",
    cierreManuscrita:
      "si dos cajitas quedan pegadas con una persona en la mitad, quedaron chinomáticas",
  },

  banda: {
    titulo: "Software tuyo, hecho para tu empresa.",
    texto:
      "La herramienta la construyo a la medida de tus procesos. El código queda a nombre de tu empresa y no te queda un cobro mensual por usuario. Antes de bajarme le enseño a tu gente a cambiarlo sin llamarme.",
    rotulo: "Qué te construyo",
  },

  porque: {
    rotulo: "Diagnóstico diferencial",
    nota: "Tres diferencias de cómo está armado el trabajo.",
    titulo: "Por qué conmigo sí pasa",
    razones: [
      {
        giro: "-rotate-[5deg]",
        titulo: "Una sola cabeza.",
        parrafos: [
          "La estrategia y la herramienta las hace la misma persona: yo. No hay un consultor que entrega la presentación bonita y después un proveedor que la interpreta a su manera. <b class='font-semibold text-tinta'>Lo que decidimos el lunes lo estoy construyendo el martes.</b>",
        ],
        manuscrita: "por eso los cupos son cuatro y no cuarenta",
        giroNota: "-rotate-[1deg]",
      },
      {
        giro: "rotate-[4deg]",
        titulo: "Te construyo software a la medida, y rápido.",
        parrafos: [
          "Te construyo la herramienta que tu empresa necesita, hecha para tu manera de trabajar, y la dejo andando rápido. Trabajo apoyado en agentes de inteligencia artificial, no subcontratando.",
          "Y no solo para programar: <b class='font-semibold text-tinta'>le enseño a tu gente a usar esos mismos agentes</b> para el trabajo de oficina que hoy hacen a mano.",
        ],
        manuscrita:
          "esto cambió de verdad hace poco. no es la misma conversación de hace tres años",
        giroNota: "rotate-[1deg]",
      },
      {
        giro: "-rotate-[3deg]",
        titulo:
          "El software se le acomoda a la empresa, no la empresa al software.",
        parrafos: [
          "Casi siempre pasa al revés: compras algo hecho para otra empresa y después te toca torcer a tu gente para que te sirva. Yo primero miro cómo se hace hoy de verdad, no como dice el manual, y construyo encima de eso.",
          "<b class='font-semibold text-tinta'>Por eso la gente lo abre el lunes sin que tengas que estar encima.</b>",
        ],
        manuscrita: "la primera semana me siento con quien lo va a usar",
        giroNota: "-rotate-[1deg]",
      },
    ],
  },

  programa: {
    rotulo: "Programa de obra · 16 semanas",
    nota: "El trabajo lo hago yo. Tú escribes un mensaje y el resto corre por mi cuenta.",
    titulo: "Qué pasa si trabajamos juntos",
    barras: ["Entender", "Diagnóstico", "Construir · una cajita a la vez"],
    etapas: [
      {
        cuando: "Semanas 1 a 2",
        titulo: "Entender la operación",
        texto:
          "Hablo con la gente que la ejecuta, no solo contigo, y miro cómo se hace de verdad.",
      },
      {
        cuando: "Semanas 2 a 3",
        titulo: "Diagnóstico",
        texto:
          "Un plan corto, el cuello de botella que vale la pena atacar primero y una primera cosa ya funcionando. Si no te aporta, ahí paramos.",
      },
      {
        cuando: "Semanas 4 a 16",
        titulo: "Construir",
        texto:
          "Construyo la herramienta, el CRM y las conexiones entre cajitas. Termina con tu equipo usándolo.",
      },
    ],
    bitacoraTitulo: "Una semana cualquiera del diagnóstico",
    bitacoraTexto:
      "Esto es lo que hago yo mientras tú sigues atendiendo tu negocio. No te pido que llenes formatos ni le quito el día a tu equipo.",
    bitacoraPie: "Bitácora de campo · Responsable: Salomón",
    bitacoraEncabezado: "Bitácora — semana 2",
    bitacoraResponsable: "Responsable: Salomón",
    bitacora: [
      ["LUN", "Entrevistar a seis personas del equipo, no solo al dueño"],
      [
        "MAR",
        "Sentarme un día entero en la operación a mirar cómo se hace de verdad",
      ],
      [
        "MIÉ",
        "Dibujar las cajitas que ya existen y marcar dónde hay alguien pegándolas a mano",
      ],
      [
        "JUE",
        "Escribir el cuello de botella en una frase que quepa en un mensaje",
      ],
      [
        "VIE",
        "Dejar prendida la primera conexión entre dos cajitas, ese mismo viernes",
      ],
    ] as [string, string][],
    bitacoraHechas: "5 de 5 hechas",
    bitacoraNinguna: "Ninguna te tocó a ti.",
  },

  entrega: {
    rotulo: "Lista de empaque",
    nota: "Siete renglones que se entregan y se firman, uno por uno.",
    titulo: "Qué te queda cuando yo me bajo",
    bajada:
      "Algo prendido, con tus datos adentro, que tu gente ya está usando el día que yo me bajo.",
    cajaTitulo: "Va en la caja",
    cajaConteo: "07 renglones",
    renglones: [
      {
        n: "01",
        t: "La herramienta funcionando",
        d: "Con tus datos reales cargados, no de ejemplo. El día de la entrega ya se está usando.",
        resaltado: false,
      },
      {
        n: "02",
        t: "El código, a nombre de la empresa",
        d: "El repositorio queda a nombre de tu empresa, no mío. Si mañana quieres trabajar con otra persona, te lo llevas completo.",
        resaltado: true,
      },
      {
        n: "03",
        t: "Te enseño a cambiarlo sin mí, con inteligencia artificial",
        d: "Antes de bajarme me siento contigo y con tu gente a enseñarles cómo pedirle un cambio a la inteligencia artificial y cómo dejarlo andando. Para mover un botón no tienes que llamarme.",
        resaltado: true,
      },
      {
        n: "04",
        t: "Tu gente entrenada",
        d: "Y la grabación del entrenamiento, para el que entre a trabajar dentro de seis meses.",
        resaltado: false,
      },
      {
        n: "05",
        t: "Las cuentas, las claves y los accesos",
        d: "Todo a nombre de la empresa. Ni un dominio ni un usuario queda a nombre mío.",
        resaltado: false,
      },
      {
        n: "06",
        t: "El proceso en una hoja, y el tiempo medido",
        d: "Qué quedó automático y qué quedó manual a propósito. Cronometramos el proceso al entrar y al salir, y te entrego el número.",
        resaltado: false,
      },
      {
        n: "07",
        t: "Dos revisiones y mi WhatsApp",
        d: "Al mes y a los dos meses, para ajustar lo que se haya torcido con el uso real. Me escribes a mí, no a una mesa de ayuda.",
        resaltado: false,
      },
    ] as Renglon[],
    menudaTitulo: "La letra menuda, en grande",
    menudaAviso: "Léela ahora",
    menuda:
      "Y lo que <b class='font-bold'>no</b>: no te cambio la empresa entera, es un proceso a la vez. No te armo el equipo de tecnología, no te vendo licencias de nada y no te queda un cobro mensual por usuario. Si lo que necesitas ya existe y funciona, te lo digo y no te lo construyo.",
    manuscrita: "un proceso a la vez, y cuando ese quede hablamos del segundo",
    tampocoTitulo: "Tampoco hago",
    tampoco: [
      "Escalar una empresa más allá de cierto tamaño. No lo sé hacer.",
      "Inventar tecnología que todavía no existe. Ni investigación, ni patentes.",
      "Documentos de ochenta páginas para mostrarle a la junta. Hay gente que lo hace mejor que yo.",
    ],
  },

  montado: {
    rotulo: "Historial",
    nota: "Los fracasos también están en la tabla.",
    titulo: "Lo que he montado con mis propias manos",
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
        cuando: "2019 — 2022",
        texto:
          "Valoración inmobiliaria con datos e inteligencia artificial para toda Latinoamérica. Cien mil reportes al año.",
        remate: "Vendida a RED Atlas.",
        remateRojo: false,
      },
      {
        clave: "prestagente",
        nombre: "PrestaGente",
        cuando: "2017 — 2019",
        texto: "Libranza entre personas.",
        remate: "Vendida a Taurus Capital",
        cola: " y todavía opera, sin mí.",
        remateRojo: false,
      },
      {
        clave: "beriblock",
        nombre: "Beriblock",
        cuando: "2018 — 2019",
        texto: "Autenticación de pagarés con blockchain.",
        remate: "Quebró.",
        cola: " Tecnología bonita, mercado que no existía.",
        remateRojo: true,
      },
      {
        clave: "elpalomo",
        nombre: "El Palomo",
        cuando: "2016 — 2017",
        texto: "Flores por suscripción.",
        remate: "Fracasó de manera espectacular.",
        cola: " La historia te la cuento en la llamada.",
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
    cierre1a:
      "La primera de la lista es la que me ocupa de lunes a viernes. De esa hablo ",
    cierreEnlace: "más abajo",
    cierre1b: ", cuando te explique por qué hay tan pocos cupos.",
    cierre2:
      "Mi papá y mi abuelo también fueron empresarios. Es lo único que hemos sabido hacer.",
  },

  voces: {
    rotulo: "Lo que dicen",
    nota: "Dueños contando qué cambió.",
    titulo: "Lo que dice la gente con la que ya trabajé",
  },

  cupos: {
    rotulo: "Capacidad instalada",
    nota: "Números reales de hoy. Cuando se llenan, quito el botón.",
    titulo: "Por qué hay tan pocos cupos",
    p1: "Porque esto no es mi trabajo principal y no quiero que lo sea. De lunes a viernes estoy construyendo Ignia, que es mi empresa. Tengo dos mellizos de cuatro años y salgo a correr.",
    p2: "<b class='font-semibold text-tinta'>Prefiero atender pocos y atenderlos bien.</b>",
    actualizado: "Actualizado el",
    fotosRotulo: "Lo que ocupa el resto del tiempo",
    fotos: [
      {
        clave: "chicago",
        alt: "Salomón con uno de sus hijos en hombros, frente a una torre en Chicago",
        pie: "Franco y Luca, en hombros",
      },
      {
        clave: "marathon",
        alt: "Salomón mostrando la medalla al terminar la media maratón de Bogotá",
        pie: "Media maratón · 2:10",
      },
      {
        clave: "bonfire",
        alt: "Fogata encendida al anochecer, fuera de la ciudad",
        pie: "Donde se piensan las cosas",
      },
    ],
    ocupadas: "consultorías ocupadas al tiempo",
    ariaCupos: "%s de %t cupos de consultoría ocupados",
    explicacion:
      "Máximo %t al tiempo, porque construyo yo. Los ocupados son de gente real; no pongo sus nombres hasta que ellos me digan que sí.",
    ctaUno: "Tomar el que queda",
    ctaVarios: "Tomar uno de los %n que quedan",
    ctaWa:
      "Hola Salomón, vi que hay un cupo de consultoría libre y quiero contarte mi caso.",
    sinCupo: "Sin cupo por ahora. Escríbeme y te aviso cuando se libere uno.",
    remateA:
      "Si lo tuyo es más chiquito y apenas estás arrancando, eso lo trabajo por otro lado: ",
    remateEnlace: "mentoría",
    remateB: ".",
  },
} as const;

const en = {
  meta: {
    title: "Fixing the fake-automated — Salomón Muriel, Bogotá",
    description:
      "I build software made to fit your company and the way it already works, instead of you bending the company to fit a program you bought. No monthly per-seat fee. Consulting, Bogotá.",
  },

  hero: {
    linea1: "We fix",
    linea2: "The fake-automated",
    manuscrita: "without changing the whole company — one little box at a time",
    bajada:
      "I build software made to fit your company and the way it already works, instead of you having to bend the company to fit a program you bought.",
    dicc: {
      palabra: "chi·no·má·ti·co, ca",
      categoria: "adj. · Colombian Spanish",
      acepciones: [
        "Said of a process: it <b class='font-bold'>looks</b> automated, but there's someone doing it by hand.",
        "Said of two systems: they don't talk to each other, and someone glues them together by copying and pasting.",
        "Said of a program: the very expensive one nobody opens any more.",
        "Said of a company: yours, probably.",
      ],
    },
    ctaPrincipal: "Tell me what you have running",
    ctaPrincipalWa:
      "Hi Salomón, I run a ___ business and I'd like to tell you what I have running.",
    ctaSecundario: "See the system of little boxes",
    especificacion:
      "Your own software · No monthly per-seat fee · You can change it afterwards",
    fichaAlt:
      "Portrait of Salomón Muriel, in a green coat with folded arms, against a dark background",
    ficha: [
      ["Who takes the call", "Salomón", false],
      ["Where", "Bogotá", false],
      ["Companies", "5 · on the fifth", false],
      ["Who answers", "Also Salomón", true],
    ] as [string, string, boolean][],
    fichaPie:
      "The person who answers WhatsApp and the person who writes the code are the same. That's why I only have room for a few.",
  },

  cinta: [
    "One spreadsheet says one thing, the other says another",
    "The same information, typed in twice",
    "A very expensive CRM that's half used",
    "Systems that don't talk to each other",
    "Someone in the middle, copying and pasting",
  ],

  danos: {
    rotulo: "Fault log",
    nota: "The same seven lines, in companies that have never met each other.",
    titulo: "What gets reported to me — nearly always the same",
    etiqueta: "Fault",
    cierre:
      "If none of that sounded familiar, I'm probably no use to you, and I'd rather say so here than in the fourth meeting.",
    fallas: [
      {
        n: "01",
        quien: "Reported by the owner",
        antes: "",
        marcado: "What the spreadsheet says",
        despues: " isn't what the program you bought says.",
        nota: "and when they disagree, whoever talks loudest in the meeting wins",
        manuscrita: true,
        giro: "-rotate-[.8deg]",
      },
      {
        n: "02",
        quien: "Nobody reports it",
        antes: "Someone set up a new system that ",
        marcado: "nobody uses",
        despues: ", holding data from eight months ago.",
        nota: "It was half filled in and nobody says so, because setting it up was hard work.",
        manuscrita: false,
      },
      {
        n: "03",
        quien: "Reported by whoever does it",
        antes: "People have to enter ",
        marcado: "the same thing twice",
        despues: ", in two places.",
        nota: "the little boxes aren't connected, and the one who suffers is the one typing",
        manuscrita: true,
        giro: "rotate-[.6deg]",
      },
      {
        n: "04",
        quien: "Reported by accounting",
        antes: "There's no ",
        marcado: "single source of truth",
        despues:
          ": to find out how much you sold yesterday, you have to ask someone.",
        nota: "The number lives in three places and none of them match.",
        manuscrita: false,
      },
      {
        n: "05",
        quien: "Reported by the owner",
        antes: "You were sold — ",
        marcado: "for a fortune",
        despues:
          " — a program that on the inside is a list, a button and an email.",
        nota: "It nearly always comes padded with modules your company will never open.",
        manuscrita: false,
      },
      {
        n: "06",
        quien: "Nobody reports it",
        antes: "The process ",
        marcado: "looks automatic",
        despues: " and in fact there's someone doing it by hand, every day.",
        nota: "and they do it well, which is why nobody has noticed",
        manuscrita: true,
        giro: "-rotate-[1deg]",
      },
      {
        n: "07",
        quien: "Reported too late",
        antes: "If that person gets sick, it stops. If they quit, ",
        marcado: "the process walks out with them",
        despues: ".",
        nota: "And whoever comes next learns it by word of mouth, from someone who also learned it that way.",
        manuscrita: false,
      },
    ] as Falla[],
  },

  chinometro: {
    rotulo: "Checklist",
    nota: "It asks for no email and stores nothing. At the end it writes the message and you decide whether to send it.",
    titulo: "The chinómetro",
    bajada: "Ten lines. Tick the ones you recognise in your company.",
    encabezadoHoja: "Reported symptoms",
    marcadasDe: "of %s ticked",
    borrar: "Clear ticks",
    estimado: "It's an estimate, not an audit.",
    lectura: "Reading",
    indice: "Chinomático index",
    caratula: "Chinómetro dial",
    orden: "Work order — draft",
    items: ["item", "items"] as [string, string],
    esperando: "Waiting for input…",
    ctaWa: "Send me this on WhatsApp",
    ctaWaNota:
      "WhatsApp opens with the text already written. You edit it and send it. I'm the one who answers.",
    ctaAgenda: "Or book forty-five minutes",
    sintomas: [
      "Orders arrive on WhatsApp and someone copies them into a spreadsheet by hand.",
      "Two systems say different things about the same thing.",
      "Someone has to enter the same information in two places.",
      "We were sold a very expensive program and hardly anyone opens it now.",
      "There's one file only one person knows how to work.",
      "To find out how much we sold yesterday, we have to ask someone.",
      "Invoices are put together by hand, one at a time.",
      "Someone builds the same report every Monday, copying and pasting.",
      "We set up a new system and people carried on using the old one.",
      "When someone quits, they leave with the process inside their head.",
    ],
    escala: [
      {
        min: 0,
        t: "Nothing measured yet",
        d: "The instrument doesn't work on a blank sheet: tick the lines you recognise.",
      },
      {
        min: 10,
        t: "Mildly chinomático",
        d: "There's manual work, but it's still relaxed. Quick to fix.",
      },
      {
        min: 30,
        t: "Moderately chinomático",
        d: "Your company already depends on someone's memory and on two systems agreeing out of goodwill.",
      },
      {
        min: 60,
        t: "Highly chinomático",
        d: "A good part of your operation is someone gluing boxes together by hand. When that person leaves, the process leaves too.",
      },
      {
        min: 90,
        t: "Critically chinomático",
        d: "Your operation rests on a tacit agreement between two people and a chat thread. Write to me today.",
      },
    ],
    waVacio:
      "Hi Salomón, I found your site and I'd like to tell you how my operation is doing.",
    waEncabezado: "Hi Salomón. I filled in the chinómetro on your site and got",
    waDe100: "out of 100.",
    waMarque: "Here's what I ticked:",
    waCierre: "My company is in ____ and we're ____ people.",
    waProcedencia: "I came from:",
  },

  cajitas: {
    rotulo: "How I explain my work",
    nota: "If you take one thing away from this page, make it this one.",
    titulo: "A company is a system of little boxes",
    p1: "Marketing sends traffic to the website and to WhatsApp. That produces leads for sales. Sales feeds information back to marketing and opens up work for operations and admin. Each of those is a little box, and each box has its own system.",
    p2: "<b class='font-semibold text-tinta'>I build those boxes and connect them.</b> The CRM your sales process needs, the system operations works in, admin's invoicing: I build whichever one is missing, made to fit how you already work, and I leave it talking to the ones next door.",
    estadoSistema: "System state",
    btnHoy: "As it is today",
    btnQueda: "As it ends up",
    leyendaManual: "Manual step",
    leyendaConectado: "Connected",
    cajas: {
      mercadeo: {
        titulo: "Marketing",
        rotulo: "Whatever the channel",
        hoy: "A campaign manager on one side and a spreadsheet on the other.",
        queda:
          "The same campaign manager. Now it actually knows which campaign brought the sale.",
        orden: "5th",
      },
      web: {
        titulo: "Website",
        rotulo: "The site",
        hoy: "A separate system, from another vendor, that emails someone.",
        queda:
          "Still your website. What comes in through it now lands where it should.",
        orden: "4th",
      },
      chat: {
        titulo: "WhatsApp",
        rotulo: "The chat",
        hoy: "One person's phone. If that person isn't around, nobody is.",
        queda:
          "What's said in the chat is recorded without anyone transcribing it.",
        orden: "4th",
      },
      ventas: {
        titulo: "Sales",
        rotulo: "The leads",
        hoy: "An expensive CRM that's half used, because filling it in is double work.",
        queda:
          "The CRM I build for your sales process. Filling it in stopped being extra work.",
        orden: "1st",
      },
      ops: {
        titulo: "Operations",
        rotulo: "The work",
        hoy: "A spreadsheet only one person understands.",
        queda:
          "The operations system I build you. The work opens by itself when the sale closes.",
        orden: "2nd",
      },
      opsdos: {
        titulo: "Operations",
        titulo2: "(the other one)",
        rotuloHoy: "Two boxes for the same work",
        rotuloQueda: "No longer needed",
        hoy: "The Notion someone set up, with data from eight months ago. And they have to fill in both.",
        queda:
          "The work lives in one. Whatever was worth keeping moved across before it was switched off.",
        orden: "Switched off",
      },
      admin: {
        titulo: "Admin",
        rotulo: "Invoicing and paperwork",
        hoy: "Another spreadsheet. And the invoice is made by hand, one at a time.",
        queda:
          "The invoice comes out of the sale by itself, data already in it.",
        orden: "3rd",
      },
    },
    enlaces: {
      mercadeoWeb: ["The form emails someone", "The lead comes in by itself"],
      mercadeoChat: [
        "The campaign sends people to the chat and there it stays",
        "The chat leaves the lead inside too",
      ],
      webVentas: [
        "Someone copies the email into the CRM",
        "Nobody copies anything",
      ],
      chatVentas: [
        "Someone transcribes the conversation",
        "Nobody transcribes",
      ],
      ventasOps: [
        "Word goes out on an internal chat",
        "The sale opens the work by itself",
      ],
      opsOpsdos: ["The same data, all over again", ""],
      ventasAdmin: [
        "The invoice is made by hand",
        "The invoice comes out by itself",
      ],
      retorno: [
        "Nobody feeds the data back",
        "Every sale tells marketing where it came from",
      ],
    },
    retornoMovil: "And back to marketing:",
    retornoMovilHoy:
      "today nobody feeds the data back, so marketing doesn't know which campaign brought the sale.",
    retornoMovilQueda: "every sale tells marketing where it came from.",
    verdadNoRotulo: "There's no single source of truth",
    verdadNo:
      "There are three versions of the same number and none of them agree. To find out which one is right, you have to ask someone.",
    verdadSiRotulo: "A single source of truth",
    verdadSi:
      "The data lives in one place. When someone asks how much was sold yesterday, everyone looks at the same number.",
    cierreTitulo:
      "I build the box and leave it connected <b class='text-rojo2'>before</b> moving to the next one.",
    cierreP1:
      "The fake-automated part shows up in the middle: someone takes data out of one box and puts it into the next, every day. Once the connection is made, that person stops copying and pasting and goes back to serving customers, which is what you hired them for.",
    cierreP2:
      "The little red numbers are the order of a typical case. The real order is something you and I decide together, looking at where it hurts most.",
    cierreManuscrita:
      "if two boxes are held together by a person in the middle, they're chinomáticas",
  },

  banda: {
    titulo: "Your software, built for your company.",
    texto:
      "I build the tool to fit your processes. The code ends up in your company's name and there's no monthly per-seat fee. Before I step off, I teach your people to change it without calling me.",
    rotulo: "What I build you",
  },

  porque: {
    rotulo: "Differential diagnosis",
    nota: "Three differences in how the work is put together.",
    titulo: "Why it actually happens with me",
    razones: [
      {
        giro: "-rotate-[5deg]",
        titulo: "One single head.",
        parrafos: [
          "The strategy and the tool are made by the same person: me. There's no consultant handing over a beautiful deck and then a vendor interpreting it their own way. <b class='font-semibold text-tinta'>What we decide on Monday, I'm building on Tuesday.</b>",
        ],
        manuscrita: "that's why there are four slots and not forty",
        giroNota: "-rotate-[1deg]",
      },
      {
        giro: "rotate-[4deg]",
        titulo: "I build custom software, and fast.",
        parrafos: [
          "I build the tool your company needs, made for the way you work, and I get it running quickly. I work leaning on AI agents, not by subcontracting.",
          "And not just for coding: <b class='font-semibold text-tinta'>I teach your people to use those same agents</b> for the office work they do by hand today.",
        ],
        manuscrita:
          "this genuinely changed recently. it isn't the same conversation as three years ago",
        giroNota: "rotate-[1deg]",
      },
      {
        giro: "-rotate-[3deg]",
        titulo: "The software fits the company, not the company the software.",
        parrafos: [
          "It nearly always goes the other way round: you buy something built for another company and then you have to bend your people to make it work. I start by looking at how it's really done today, not how the manual says, and I build on top of that.",
          "<b class='font-semibold text-tinta'>That's why people open it on Monday without you having to stand over them.</b>",
        ],
        manuscrita:
          "in the first week I sit down with whoever is going to use it",
        giroNota: "-rotate-[1deg]",
      },
    ],
  },

  programa: {
    rotulo: "Works schedule · 16 weeks",
    nota: "I do the work. You write one message and the rest is on me.",
    titulo: "What happens if we work together",
    barras: ["Understand", "Diagnosis", "Build · one box at a time"],
    etapas: [
      {
        cuando: "Weeks 1 to 2",
        titulo: "Understand the operation",
        texto:
          "I talk to the people who run it, not just to you, and I watch how it's really done.",
      },
      {
        cuando: "Weeks 2 to 3",
        titulo: "Diagnosis",
        texto:
          "A short plan, the bottleneck worth attacking first, and one first thing already working. If it isn't worth it to you, we stop there.",
      },
      {
        cuando: "Weeks 4 to 16",
        titulo: "Build",
        texto:
          "I build the tool, the CRM and the connections between boxes. It ends with your team using it.",
      },
    ],
    bitacoraTitulo: "An ordinary week of the diagnosis",
    bitacoraTexto:
      "This is what I do while you carry on running your business. I don't ask you to fill in forms or take a day from your team.",
    bitacoraPie: "Field log · Responsible: Salomón",
    bitacoraEncabezado: "Field log — week 2",
    bitacoraResponsable: "Responsible: Salomón",
    bitacora: [
      ["MON", "Interview six people on the team, not just the owner"],
      [
        "TUE",
        "Sit a whole day inside the operation watching how it's really done",
      ],
      [
        "WED",
        "Draw the boxes that already exist and mark where someone is gluing them by hand",
      ],
      ["THU", "Write the bottleneck in one sentence that fits in a message"],
      [
        "FRI",
        "Leave the first connection between two boxes running, that same Friday",
      ],
    ] as [string, string][],
    bitacoraHechas: "5 of 5 done",
    bitacoraNinguna: "None of them fell to you.",
  },

  entrega: {
    rotulo: "Packing list",
    nota: "Seven lines handed over and signed off, one by one.",
    titulo: "What you're left with when I step off",
    bajada:
      "Something running, with your data inside it, that your people are already using the day I step off.",
    cajaTitulo: "In the box",
    cajaConteo: "07 lines",
    renglones: [
      {
        n: "01",
        t: "The tool, running",
        d: "With your real data loaded, not sample data. On handover day it's already in use.",
        resaltado: false,
      },
      {
        n: "02",
        t: "The code, in the company's name",
        d: "The repository is in your company's name, not mine. If tomorrow you want to work with someone else, you take all of it with you.",
        resaltado: true,
      },
      {
        n: "03",
        t: "I teach you to change it without me, using AI",
        d: "Before I step off I sit down with you and your people to teach them how to ask AI for a change and how to ship it. You don't have to call me to move a button.",
        resaltado: true,
      },
      {
        n: "04",
        t: "Your people trained",
        d: "And a recording of the training, for whoever joins six months from now.",
        resaltado: false,
      },
      {
        n: "05",
        t: "The accounts, the passwords and the access",
        d: "All in the company's name. Not one domain and not one user stays in mine.",
        resaltado: false,
      },
      {
        n: "06",
        t: "The process on one page, and the time measured",
        d: "What ended up automatic and what stayed manual on purpose. We time the process going in and coming out, and I hand you the number.",
        resaltado: false,
      },
      {
        n: "07",
        t: "Two reviews and my WhatsApp",
        d: "At one month and at two, to adjust whatever real use has bent out of shape. You write to me, not to a help desk.",
        resaltado: false,
      },
    ] as Renglon[],
    menudaTitulo: "The small print, in large type",
    menudaAviso: "Read it now",
    menuda:
      "And what I <b class='font-bold'>don't</b> do: I don't change the whole company, it's one process at a time. I don't build you a technology team, I don't sell you licences for anything, and you're left with no monthly per-seat fee. If what you need already exists and works, I'll tell you so and I won't build it.",
    manuscrita:
      "one process at a time, and when that one is settled we'll talk about the second",
    tampocoTitulo: "I also don't do",
    tampoco: [
      "Scaling a company past a certain size. I don't know how.",
      "Inventing technology that doesn't exist yet. No research, no patents.",
      "Eighty-page documents to show the board. There are people who do that better than me.",
    ],
  },

  montado: {
    rotulo: "Track record",
    nota: "The failures are on the table too.",
    titulo: "What I've built with my own hands",
    pieFoto: "The valuation tool I'm showing there is one we built ourselves.",
    fotoAlt:
      "Salomón Muriel showing the Finco platform at a trade fair, next to a teammate",
    empresas: [
      {
        clave: "ignia",
        nombre: "Ignia",
        cuando: "Today",
        texto:
          "A new model for higher education. I built its website, the system the courses run on, the CRM and the community portal.",
      },
      {
        clave: "finco",
        nombre: "Finco",
        cuando: "2019 — 2022",
        texto:
          "Real-estate valuation with data and AI for all of Latin America. A hundred thousand reports a year.",
        remate: "Sold to RED Atlas.",
        remateRojo: false,
      },
      {
        clave: "prestagente",
        nombre: "PrestaGente",
        cuando: "2017 — 2019",
        texto: "Peer-to-peer payroll lending.",
        remate: "Sold to Taurus Capital",
        cola: " and it still runs, without me.",
        remateRojo: false,
      },
      {
        clave: "beriblock",
        nombre: "Beriblock",
        cuando: "2018 — 2019",
        texto: "Promissory-note authentication with blockchain.",
        remate: "Went under.",
        cola: " Beautiful technology, a market that didn't exist.",
        remateRojo: true,
      },
      {
        clave: "elpalomo",
        nombre: "El Palomo",
        cuando: "2016 — 2017",
        texto: "Flowers by subscription.",
        remate: "Failed spectacularly.",
        cola: " I'll tell you that story on the call.",
        remateRojo: true,
      },
      {
        clave: "r5",
        nombre: "R5",
        cuando: "As an employee",
        texto:
          "I led around forty people. I built the entire data pipeline and the risk-modelling system.",
      },
    ],
    cierre1a:
      "The first one on the list is what takes up my Monday to Friday. I talk about that ",
    cierreEnlace: "further down",
    cierre1b: ", when I explain why there are so few slots.",
    cierre2:
      "My father and my grandfather were business owners too. It's the only thing we've ever known how to do.",
  },

  voces: {
    rotulo: "What they say",
    nota: "Owners on what changed.",
    titulo: "What the people I've worked with say",
  },

  cupos: {
    rotulo: "Installed capacity",
    nota: "Real numbers, today. When they fill up, I take the button down.",
    titulo: "Why there are so few slots",
    p1: "Because this isn't my main job and I don't want it to be. Monday to Friday I'm building Ignia, which is my company. I have four-year-old twins and I go running.",
    p2: "<b class='font-semibold text-tinta'>I'd rather take on few and look after them properly.</b>",
    actualizado: "Updated on",
    fotosRotulo: "What the rest of the time goes to",
    fotos: [
      {
        clave: "chicago",
        alt: "Salomón with one of his sons on his shoulders, in front of a tower in Chicago",
        pie: "Franco and Luca, on my shoulders",
      },
      {
        clave: "marathon",
        alt: "Salomón holding up his medal after finishing the Bogotá half marathon",
        pie: "Half marathon · 2:10",
      },
      {
        clave: "bonfire",
        alt: "A bonfire burning at dusk, outside the city",
        pie: "Where things get thought through",
      },
    ],
    ocupadas: "consulting slots taken at once",
    ariaCupos: "%s of %t consulting slots taken",
    explicacion:
      "%t at a time at most, because I'm the one building. The taken ones are real people; I don't put their names up until they tell me it's fine.",
    ctaUno: "Take the one that's left",
    ctaVarios: "Take one of the %n that are left",
    ctaWa:
      "Hi Salomón, I saw there's a consulting slot free and I'd like to tell you about my case.",
    sinCupo:
      "No slots right now. Write to me and I'll let you know when one opens.",
    remateA:
      "If yours is smaller and just getting started, I work on that another way: ",
    remateEnlace: "mentoring",
    remateB: ".",
  },
} as const;

export const landing = { es, en } as const;
export type Copia = typeof es;

export function copia(lang: Lang): Copia {
  return (lang === "en" ? en : es) as unknown as Copia;
}
