/* Tryla — English / Spanish
 *
 * El sitio esta escrito en ingles. Este script traduce el texto al espanol cuando
 * el visitante lo tiene en espanol (o lo elige con el boton EN | ES) y lo
 * regresa al ingles si cambia de opinion. Funciona recorriendo el DOM y
 * cambiando cada texto cuyo contenido exacto este en DICT; tambien traduce lo
 * que el cotizador va pintando despues (MutationObserver).
 *
 * Para cambiar o agregar una traduccion: edita DICT ("texto en ingles": "texto en espanol").
 * El texto debe ser el contenido EXACTO de un nodo de texto de la pagina.
 */
(function () {
  'use strict';

  var DICT = {
    // ---- Navegacion ----
    'Home': 'Inicio',
    'Why Tryla': 'Por qué Tryla',
    'Trailers': 'Tráileres',
    'Shipping': 'Envíos',
    'Financing': 'Financiamiento',
    'About': 'Nosotros',
    'Contact': 'Contacto',
    'Call Now': 'Llamar ahora',
    'Call Now: +1 (645) 235-3186': 'Llama ahora: +1 (645) 235-3186',
    'Get a Quote': 'Cotizar',
    'Toggle color theme': 'Cambiar tema claro/oscuro',
    'Menu': 'Menú',

    // ---- Hero ----
    'YOUR MOBILE RESTAURANT DREAM STARTS HERE': 'TU SUEÑO DE RESTAURANTE MÓVIL EMPIEZA AQUÍ',
    "We don't just sell you": 'No solo te vendemos',
    'a': 'un',
    'trailer.': 'tráiler.',
    'We help you grow with it. We verify manufacturer quality, insure your delivery across the entire USA and give you the digital tools to make your business a success from day one.':
      'Te ayudamos a crecer con él. Verificamos la calidad del fabricante, aseguramos tu entrega en todo Estados Unidos y te damos las herramientas digitales para que tu negocio sea un éxito desde el primer día.',
    'Quote your trailer →': 'Cotiza tu tráiler →',
    'Contact us': 'Contáctanos',
    'Sizes': 'Tamaños',
    'available': 'disponibles',
    'Scroll': 'Desliza',
    'Tryla food trailer, black with blue LED lighting': 'Food trailer Tryla, negro con luces LED azules',

    // ---- Cifras ----
    'Sizes available': 'Tamaños disponibles',
    'States with delivery coverage': 'Estados con cobertura de entrega',
    '1 yr': '1 año',
    'Warranty included': 'Garantía incluida',
    '4–6 wks': '4–6 sem',
    'Build time': 'Tiempo de construcción',

    // ---- Filosofia ----
    'OUR PHILOSOPHY': 'NUESTRA FILOSOFÍA',
    "We're not just in the trailer business.": 'No solo estamos en el negocio de los tráileres.',
    "We're the business that": 'Somos el negocio que',
    'builds businesses.': 'construye negocios.',
    "Tryla doesn't stop at selling you equipment — we see the opportunity in your market and help you build the business around it. Growth isn't an add-on here. It's the whole point.":
      'Tryla no se queda en venderte equipo: vemos la oportunidad en tu mercado y te ayudamos a construir el negocio alrededor de ella. Aquí el crecimiento no es un extra. Es el objetivo.',

    // ---- Location Intelligence ----
    'LOCATION INTELLIGENCE': 'INTELIGENCIA DE UBICACIÓN',
    "We don't just build the trailer.": 'No solo construimos el tráiler.',
    'We help you find where to park it.': 'Te ayudamos a encontrar dónde estacionarlo.',
    'Every Tryla client gets access to our market study platform — built on real geographic data, so you evaluate a location as an opportunity, not a guess.':
      'Cada cliente de Tryla accede a nuestra plataforma de estudio de mercado, basada en datos geográficos reales, para que evalúes una ubicación como una oportunidad y no como una corazonada.',
    'Foot traffic & demand signals': 'Tráfico peatonal y señales de demanda',
    "Estimated visibility and demand patterns for any address you're considering.":
      'Visibilidad estimada y patrones de demanda para cualquier dirección que estés considerando.',
    'Competitor density': 'Densidad de competencia',
    'See how many similar food businesses already operate nearby — and where the real gaps are.':
      'Mira cuántos negocios de comida similares ya operan cerca, y dónde están los huecos reales.',
    'Demographics fit': 'Ajuste demográfico',
    'Income, population density, and daily commuter flow around a potential spot.':
      'Ingresos, densidad de población y flujo diario de personas alrededor de un posible punto.',
    'Cuisine gap analysis': 'Análisis de huecos de cocina',
    'What kind of food is missing in that market, based on real data — not guesswork.':
      'Qué tipo de comida hace falta en ese mercado, con datos reales y sin adivinar.',
    'OPPORTUNITY SCORE': 'PUNTAJE DE OPORTUNIDAD',
    'High traffic · Low overlap': 'Alto tráfico · Poca competencia',

    // ---- Por que Tryla ----
    'WHY TRYLA': 'POR QUÉ TRYLA',
    "We don't just sell you a trailer.": 'No solo te vendemos un tráiler.',
    "It's a business to grow.": 'Es un negocio para hacer crecer.',
    'We build every unit to one standard — packaged with a sharper, more technical identity for operators who want their rig to look as sharp as it runs.':
      'Construimos cada unidad con un mismo estándar, con una identidad más afilada y técnica para operadores que quieren que su equipo se vea tan bien como funciona.',
    'Verified quality': 'Calidad verificada',
    'NSF-standard equipment, electrical and gas lines checked unit by unit before it leaves the shop.':
      'Equipo con estándar NSF, instalaciones eléctricas y de gas revisadas unidad por unidad antes de salir del taller.',
    'Insured delivery': 'Entrega asegurada',
    'Coverage across all 48 continental states, tracked and insured the whole way.':
      'Cobertura en los 48 estados continentales, con seguimiento y seguro durante todo el trayecto.',
    'Professional wrap & logo': 'Rotulado y logo profesional',
    'Your brand applied at the factory, not patched on later — the trailer rolls out ready to work on day one.':
      'Tu marca aplicada en fábrica, no parchada después: el tráiler sale listo para trabajar desde el primer día.',
    'We advise you on everything': 'Te asesoramos en todo',
    "From permits to equipment to menu layout — we're with you on every decision, not just the sale.":
      'Desde permisos hasta equipo y distribución del menú: estamos contigo en cada decisión, no solo en la venta.',
    'Flexible financing': 'Financiamiento flexible',
    'We work with lenders specialized in commercial equipment so you can start without draining your capital.':
      'Trabajamos con financieras especializadas en equipo comercial para que empieces sin vaciar tu capital.',
    'Built to last': 'Hecho para durar',
    'Chassis and finishes built for daily business use, not just a season.':
      'Chasis y acabados hechos para el uso diario de un negocio, no solo para una temporada.',

    // ---- Cotizador ----
    'ONLINE QUOTE': 'COTIZACIÓN EN LÍNEA',
    'Configure and quote your trailer': 'Configura y cotiza tu tráiler',
    'No sign-up, no calls. Pick a size and equipment, watch the live price, and send it to us in seconds.':
      'Sin registro y sin llamadas. Elige tamaño y equipo, mira el precio en vivo y envíanoslo en segundos.',
    '1 · Size': '1 · Tamaño',
    '2 · Equipment': '2 · Equipo',
    '3 · Your quote': '3 · Tu cotización',
    'Choose your base size': 'Elige tu tamaño base',
    'Pick the model that best fits your business. The price updates instantly.':
      'Elige el modelo que mejor se ajuste a tu negocio. El precio se actualiza al instante.',
    'Add extra equipment': 'Agrega equipo adicional',
    'Your trailer already includes: hood, A/C, sinks, gas lines, water pump and service table. Here you can add kitchen equipment and extras.':
      'Tu tráiler ya incluye: campana, A/C, tarjas, líneas de gas, bomba de agua y mesa de servicio. Aquí puedes agregar equipo de cocina y extras.',
    'Your estimated quote': 'Tu cotización estimada',
    'Review your build and send it to us. We confirm the final price in under 24 hours.':
      'Revisa tu configuración y envíanosla. Confirmamos el precio final en menos de 24 horas.',
    'Who is it for? (optional)': '¿Para quién es? (opcional)',
    'Name': 'Nombre',
    'Your name': 'Tu nombre',
    'Phone / Mobile': 'Teléfono / Celular',
    '← Back': '← Atrás',
    'Next →': 'Siguiente →',
    'Send via WhatsApp': 'Enviar por WhatsApp',
    'Estimate': 'Estimado',
    '* Estimate in USD. Freight not included. Final quote confirmed by the Tryla team within 24 h.':
      '* Estimado en USD. No incluye flete. La cotización final la confirma el equipo de Tryla en menos de 24 h.',
    'Popular': 'Popular',
    'See larger sizes': 'Ver tamaños más grandes',
    'Included': 'Incluido',
    'Size': 'Tamaño',
    'Equipment': 'Equipo',
    'Select a size to see your quote.': 'Elige un tamaño para ver tu cotización.',
    // descripciones de tamano
    'Mini · cart or stand': 'Mini · carrito o puesto',
    'Micro business · ideal for 1': 'Micronegocio · ideal para 1 persona',
    'Compact · to get started': 'Compacto · para empezar',
    'Specialty: tacos, coffee, BBQ': 'Especialidad: tacos, café, BBQ',
    'Versatile · comfortable kitchen': 'Versátil · cocina cómoda',
    'Best seller': 'Más vendido',
    'Spacious kitchen + storage': 'Cocina amplia + almacenaje',
    'Established business': 'Negocio establecido',
    'High volume · premium': 'Alto volumen · premium',
    'Large operation · tandem axle': 'Operación grande · eje tándem',
    'Maximum size · full kitchen': 'Tamaño máximo · cocina completa',
    // incluido
    'Hood + ventilation': 'Campana + ventilación',
    'A/C': 'A/C',
    '3-compartment sink': 'Tarja de 3 compartimentos',
    'Hand wash sink': 'Lavamanos',
    'Water tanks': 'Tanques de agua',
    'Gas lines': 'Líneas de gas',
    'Water pump': 'Bomba de agua',
    'Service table': 'Mesa de servicio',
    // grupos y equipo
    'Kitchen equipment': 'Equipo de cocina',
    'Refrigeration': 'Refrigeración',
    'Branding & extras': 'Imagen y extras',
    'Flat-top grill': 'Plancha',
    'Double fryer': 'Freidora doble',
    '4-burner range': 'Estufa de 4 quemadores',
    'Charbroiler': 'Parrilla de carbón',
    'Pizza oven (Gozney)': 'Horno de pizza (Gozney)',
    'Steam table / bain-marie': 'Mesa de vapor / baño María',
    'Commercial fridge': 'Refrigerador comercial',
    'Freezer': 'Congelador',
    'Prep cooler table': 'Mesa de preparación refrigerada',
    'Heated holding cabinet': 'Gabinete calentador',
    'Full vinyl wrap': 'Rotulado completo en vinil',
    'LED lighting': 'Iluminación LED',
    'Awning': 'Toldo',
    'Diamond-plate floor': 'Piso de diamante',
    'Generator': 'Generador',
    'Sound system': 'Sistema de sonido',

    // ---- Galeria ----
    'TRAILERS': 'TRÁILERES',
    'Delivered trailers': 'Tráileres entregados',
    'Real units built by the Tryla team — the quality we stand behind on every trailer.':
      'Unidades reales construidas por el equipo de Tryla: la calidad que respaldamos en cada tráiler.',
    'Black · Blue LEDs': 'Negro · LEDs azules',
    'Service windows, premium lighting': 'Ventanas de servicio, iluminación premium',
    'Dark Gray · Premium': 'Gris oscuro · Premium',
    'Double window, stairs, tandem axle': 'Ventana doble, escalones, eje tándem',
    'Interior · Full kitchen': 'Interior · Cocina completa',
    'Griddle, fryer, hood, sinks, diamond-plate floor': 'Plancha, freidora, campana, tarjas, piso de diamante',
    'Red · LED Lights': 'Rojo · Luces LED',
    'Panoramic windows, full lighting': 'Ventanas panorámicas, iluminación completa',
    'Interior · Dark finish': 'Interior · Acabado oscuro',
    'Stainless steel, fridges, A/C, fire extinguisher': 'Acero inoxidable, refrigeradores, A/C, extintor',
    'Green · Awning Open': 'Verde · Toldo abierto',
    'Panoramic windows, ready to operate': 'Ventanas panorámicas, listo para operar',
    'Equipment · Griddle & fryer': 'Equipo · Plancha y freidora',
    'Flat-top griddle, double fryer, commercial hood': 'Plancha, freidora doble, campana comercial',
    'Red · Compact with porch': 'Rojo · Compacto con porche',
    'A/C, LEDs, stairs, service window': 'A/C, LEDs, escalones, ventana de servicio',
    'Black trailer with blue LED lights': 'Tráiler negro con luces LED azules',
    'Dark gray trailer in a warehouse': 'Tráiler gris oscuro en una bodega',
    'White kitchen interior with griddle and fryer': 'Interior de cocina blanco con plancha y freidora',
    'Red trailer with LED lights at night': 'Tráiler rojo con luces LED de noche',
    'Dark kitchen interior with stainless steel': 'Interior de cocina oscuro con acero inoxidable',
    'Green trailer with awning open': 'Tráiler verde con toldo abierto',
    'Flat-top griddle and fryer under a hood': 'Plancha y freidora bajo una campana',
    'Compact red trailer with porch and A/C': 'Tráiler rojo compacto con porche y A/C',
    'Close': 'Cerrar',
    'Previous photo': 'Foto anterior',
    'Next photo': 'Foto siguiente',

    // ---- Envios ----
    'LOGISTICS': 'LOGÍSTICA',
    'Your trailer, insured to your door': 'Tu tráiler, asegurado hasta tu puerta',
    'Tryla ships through an established logistics network — insured delivery already completed in 15+ states, from New York to California, from Chicago to Miami, and as far as the Bahamas.':
      'Tryla envía a través de una red logística establecida: ya hemos completado entregas aseguradas en más de 15 estados, de Nueva York a California, de Chicago a Miami y hasta las Bahamas.',
    'Insured shipping to your location': 'Envío asegurado a tu ubicación',
    'We coordinate transport with insurance included to the point you specify. Your unit is covered from departure to arrival.':
      'Coordinamos el transporte con seguro incluido hasta el punto que indiques. Tu unidad está cubierta desde la salida hasta la llegada.',
    'Delivery time: 4–6 weeks': 'Tiempo de entrega: 4–6 semanas',
    'Once your initial deposit is confirmed, we coordinate build and delivery in 4 to 6 weeks depending on size and equipment.':
      'Una vez confirmado tu depósito inicial, coordinamos la construcción y la entrega en 4 a 6 semanas, según el tamaño y el equipo.',
    '1-year warranty': 'Garantía de 1 año',
    'Every trailer includes a 1-year manufacturer warranty against defects. We handle any claim for you directly with the manufacturer.':
      'Cada tráiler incluye una garantía de fábrica de 1 año contra defectos. Nosotros gestionamos cualquier reclamo directamente con el fabricante.',
    'Weekly updates': 'Avances semanales',
    "We send photos and video of your trailer's progress every week so you always know where things stand.":
      'Cada semana te enviamos fotos y video del avance de tu tráiler para que siempre sepas en qué etapa va.',
    'Service centers in Texas': 'Centros de servicio en Texas',
    'After-sales support and warranty work handled from service centers in Houston, Dallas, Austin and San Antonio.':
      'Atención posventa y trabajos de garantía desde centros de servicio en Houston, Dallas, Austin y San Antonio.',
    'Serial number & VIN included': 'Número de serie y VIN incluidos',
    'Every unit ships with a serial number. We provide the VIN from day one so you can process financing before receiving your trailer.':
      'Cada unidad sale con número de serie. Te damos el VIN desde el primer día para que tramites el financiamiento antes de recibir tu tráiler.',
    'NSF & Health Department certified': 'Certificado NSF y del Departamento de Salud',
    "Our trailers meet NSF standards and are built ready to pass your county's Health Department inspection.":
      'Nuestros tráileres cumplen los estándares NSF y están hechos para pasar la inspección del Departamento de Salud de tu condado.',
    'Inspections scheduled during the build': 'Inspecciones programadas durante la construcción',
    'We schedule your inspection appointments and permits while your trailer is being built, so you can start the moment it arrives.':
      'Programamos tus citas de inspección y permisos mientras se construye tu tráiler, para que empieces en cuanto llegue.',
    'Texas-based · Service centers in Houston, Dallas, Austin & San Antonio.':
      'Con sede en Texas · Centros de servicio en Houston, Dallas, Austin y San Antonio.',
    'USA delivery map': 'Mapa de entregas en EE. UU.',
    'Service centers': 'Centros de servicio',
    'Completed deliveries': 'Entregas completadas',
    'New York': 'Nueva York',
    'New Jersey': 'Nueva Jersey',
    'South Dakota': 'Dakota del Sur',
    'S. Dakota': 'Dakota del Sur',
    '+ many more': '+ muchos más',

    // ---- Financiamiento ----
    'FINANCING': 'FINANCIAMIENTO',
    "Don't let money stop your start": 'Que el dinero no frene tu comienzo',
    'Commercial-equipment financing partners, ready to work with Tryla buyers.':
      'Aliados de financiamiento de equipo comercial, listos para trabajar con compradores de Tryla.',
    '24 hrs': '24 hrs',
    'Approval time once your application is submitted.': 'Tiempo de aprobación una vez enviada tu solicitud.',
    '$450/mo': '$450/mes',
    'Estimated monthly payments starting at this amount, based on equipment.':
      'Pagos mensuales estimados desde esta cantidad, según el equipo.',
    'Flexible': 'Flexible',
    'No perfect credit required to apply.': 'No se necesita crédito perfecto para aplicar.',
    'Our financing partners': 'Nuestros aliados de financiamiento',

    // ---- Proteccion ----
    'YOUR MONEY, PROTECTED': 'TU DINERO, PROTEGIDO',
    'How we protect your investment': 'Cómo protegemos tu inversión',
    'Signed contract first': 'Primero, contrato firmado',
    'Before any payment, you sign a contract with specs, price, and dates. Everything in writing.':
      'Antes de cualquier pago firmas un contrato con especificaciones, precio y fechas. Todo por escrito.',
    'Staged payments': 'Pagos por etapas',
    'You never pay 100% upfront. Initial deposit and installments as construction progresses, with a receipt for every payment.':
      'Nunca pagas el 100% por adelantado. Depósito inicial y pagos conforme avanza la construcción, con recibo por cada pago.',
    'Weekly photos & video': 'Fotos y video cada semana',
    'Every week you see the real progress of YOUR trailer in photos and video. You know exactly where your money is going.':
      'Cada semana ves el avance real de TU tráiler en fotos y video. Sabes exactamente a dónde va tu dinero.',
    'Verifiable VIN from day one': 'VIN verificable desde el primer día',
    "We give you your unit's VIN and serial number from the start — verifiable and required for your financing and registration.":
      'Te damos el VIN y el número de serie de tu unidad desde el inicio: verificables y necesarios para tu financiamiento y registro.',
    'Insured shipping': 'Envío asegurado',
    "Your trailer travels with transport insurance to your door. If anything happens on the way, it's covered.":
      'Tu tráiler viaja con seguro de transporte hasta tu puerta. Si algo pasa en el camino, está cubierto.',

    // ---- Sobre / contacto / footer ----
    "WHO'S BEHIND IT": 'QUIÉN ESTÁ DETRÁS',
    "Tryla is built for operators who want their equipment to carry a sharper, higher-performance look. You're buying from a person, not a logo.":
      'Tryla está hecho para operadores que quieren que su equipo tenga una imagen más afilada y de alto rendimiento. Le compras a una persona, no a un logo.',
    'CONTACT': 'CONTACTO',
    "Let's start with a conversation.": 'Empecemos con una conversación.',
    'Phone': 'Teléfono',
    '(xxx) xxx-xxxx': '(xxx) xxx-xxxx',
    'Email': 'Correo',
    'you@email.com': 'tu@correo.com',
    'Size of interest': 'Tamaño de interés',
    'Not sure yet': 'Aún no estoy seguro',
    'Message': 'Mensaje',
    'Tell us about your project': 'Cuéntanos sobre tu proyecto',
    'Send': 'Enviar',
    'Phone / WhatsApp': 'Teléfono / WhatsApp',
    'Dealership': 'Sala de ventas',
    'Prefer to talk directly? Message us on WhatsApp.': '¿Prefieres hablar directo? Escríbenos por WhatsApp.',
    'Open WhatsApp': 'Abrir WhatsApp',
    'Food trailers built like performance equipment. Delivered across the United States.':
      'Food trailers construidos como equipo de alto rendimiento. Entregados en todo Estados Unidos.',
    'Navigation': 'Navegación',
    'Quick Quote': 'Cotización rápida',
    '— All rights reserved.': '— Todos los derechos reservados.',
    'Made in Dallas, TX': 'Hecho en Dallas, TX',
    'Terms of Service': 'Términos de servicio',
    'Service Agreement': 'Contrato de servicio',
    'Tryla — Built to grow': 'Tryla — Hecho para crecer',

    // ---- Mensajes de WhatsApp / formulario (se piden con t()) ----
    "Hi Tryla! I'd like to quote a food trailer:": '¡Hola Tryla! Quisiera cotizar un food trailer:',
    'Size: ': 'Tamaño: ',
    'Includes: Hood, A/C, Sinks, Gas lines, Water pump, Service table': 'Incluye: Campana, A/C, Tarjas, Líneas de gas, Bomba de agua, Mesa de servicio',
    'Color: ': 'Color: ',
    'Extra equipment:': 'Equipo adicional:',
    'Estimate: ': 'Estimado: ',
    'Name: ': 'Nombre: ',
    'WhatsApp: ': 'WhatsApp: ',
    "Hi Tryla! I'd like to get in touch:": '¡Hola Tryla! Quisiera ponerme en contacto:',
    'Phone: ': 'Teléfono: ',
    'Size of interest: ': 'Tamaño de interés: ',
    'Email: ': 'Correo: ',
    'New website inquiry — ': 'Nueva consulta del sitio web — ',
    'Add at least your name and a phone or email.': 'Agrega al menos tu nombre y un teléfono o correo.',
    'Sending...': 'Enviando...',
    'Thank you — we will contact you soon.': 'Gracias — te contactaremos pronto.',
    "Sent, but it couldn't be logged in our system automatically.": 'Se envió, pero no se pudo registrar en nuestro sistema automáticamente.'
  };

  // Textos con numeros u otras partes variables
  var PATTERNS = [
    [/^(\d+) items?$/, function (m) { return m[1] + (m[1] === '1' ? ' artículo' : ' artículos'); }],
    [/^From (\$[\d,]+)$/, function (m) { return 'Desde ' + m[1]; }],
    [/^Base (.+)$/, function (m) { return 'Base ' + m[1]; }]
  ];

  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1 };     // no se traduce nada dentro
  var NO_CHILD_TEXT = { TEXTAREA: 1 };                      // se traducen sus atributos (placeholder) pero no su contenido
  var ATTRS = ['placeholder', 'alt', 'aria-label', 'title'];
  var KEY = 'tryla-lang';

  var lang = 'en';
  var observer = null;
  var textOrig = new WeakMap();   // nodo de texto -> { en, es }
  var attrOrig = new WeakMap();   // elemento -> { attr: { en, es } }

  function normalize(s) { return s.replace(/\s+/g, ' ').trim(); }

  function translateString(text) {
    var key = normalize(text);
    if (!key) return null;
    if (Object.prototype.hasOwnProperty.call(DICT, key)) return DICT[key];
    for (var i = 0; i < PATTERNS.length; i++) {
      var m = key.match(PATTERNS[i][0]);
      if (m) return PATTERNS[i][1](m);
    }
    return null;
  }

  // t('English text') -> texto en el idioma actual (para mensajes que arma el JS)
  function t(en) {
    if (lang !== 'es') return en;
    if (Object.prototype.hasOwnProperty.call(DICT, en)) return DICT[en];   // claves con espacio al final ("Size: ")
    var tr = translateString(en);
    return tr === null ? en : tr;
  }

  function inSkippedZone(el) {
    for (var n = el; n && n.nodeType === 1; n = n.parentNode) {
      if (SKIP_TAGS[n.tagName]) return true;
      if (n.id === 'sqvMount' || n.hasAttribute('data-no-i18n')) return true;
    }
    return false;
  }

  function applyText(node) {
    var rec = textOrig.get(node);
    if (lang === 'es') {
      if (rec && node.nodeValue === rec.es) return;          // ya traducido por nosotros
      var tr = translateString(node.nodeValue);
      if (tr === null) { if (rec) textOrig.delete(node); return; }
      var raw = node.nodeValue;
      var lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
      var out = lead + tr + trail;
      textOrig.set(node, { en: raw, es: out });
      if (out !== raw) node.nodeValue = out;
    } else if (rec) {
      if (node.nodeValue === rec.es) node.nodeValue = rec.en;
      textOrig.delete(node);
    }
  }

  function applyAttrs(el) {
    var store = attrOrig.get(el);
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i];
      if (!el.hasAttribute(a)) continue;
      var cur = el.getAttribute(a);
      var rec = store && store[a];
      if (lang === 'es') {
        if (rec && cur === rec.es) continue;
        var tr = translateString(cur);
        if (tr === null) { if (rec) delete store[a]; continue; }
        if (!store) { store = {}; attrOrig.set(el, store); }
        store[a] = { en: cur, es: tr };
        if (tr !== cur) el.setAttribute(a, tr);
      } else if (rec) {
        if (cur === rec.es) el.setAttribute(a, rec.en);
        delete store[a];
      }
    }
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) {
      if (root.parentNode && !inSkippedZone(root.parentNode) && !NO_CHILD_TEXT[root.parentNode.tagName]) applyText(root);
      return;
    }
    if (root.nodeType !== 1 || inSkippedZone(root)) return;
    applyAttrs(root);
    if (NO_CHILD_TEXT[root.tagName]) return;
    for (var c = root.firstChild; c; c = c.nextSibling) walk(c);
  }

  function startObserver() {
    if (observer || !window.MutationObserver) return;
    observer = new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) {
        var m = list[i];
        if (m.type === 'childList') {
          for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]);
        } else if (m.type === 'characterData') {
          if (m.target.parentNode && !inSkippedZone(m.target.parentNode) && !NO_CHILD_TEXT[m.target.parentNode.tagName]) applyText(m.target);
        } else if (m.type === 'attributes') {
          if (!inSkippedZone(m.target)) applyAttrs(m.target);
        }
      }
    });
    observer.observe(document.documentElement, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ATTRS
    });
  }

  function setTitle() {
    var base = 'Tryla — Built to grow';
    if (location.search.indexOf('quote=') !== -1) return;     // la vista de cotizacion compartida pone su propio titulo
    document.title = lang === 'es' ? DICT[base] : base;
  }

  function apply() {
    document.documentElement.setAttribute('lang', lang);
    if (document.body) walk(document.body);
    else walk(document.documentElement);
    setTitle();
  }

  function detect() {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (saved === 'es' || saved === 'en') return saved;
    var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < list.length; i++) {
      var p = String(list[i] || '').toLowerCase().split('-')[0];
      if (p === 'es') return 'es';
      if (p === 'en') return 'en';
    }
    return 'en';
  }

  function setLang(next, remember) {
    next = next === 'es' ? 'es' : 'en';
    if (remember) { try { localStorage.setItem(KEY, next); } catch (e) {} }
    if (next === lang && document.readyState !== 'loading' && document.documentElement.getAttribute('lang') === next) return;
    lang = next;
    if (lang === 'es') startObserver();
    apply();
    try { document.dispatchEvent(new CustomEvent('tryla:langchange', { detail: { lang: lang } })); } catch (e) {}
  }

  window.TrylaI18n = {
    t: t,
    get lang() { return lang; },
    setLang: function (l) { setLang(l, true); },
    toggle: function () { setLang(lang === 'es' ? 'en' : 'es', true); }
  };

  // ---- Arranque: se ejecuta en <head>, antes de pintar el contenido ----
  lang = detect();
  document.documentElement.setAttribute('lang', lang);
  if (lang === 'es') {
    startObserver();                 // traduce el HTML conforme el navegador lo va leyendo
  }
  document.addEventListener('DOMContentLoaded', function () {
    if (lang === 'es') apply();
    var btn = document.getElementById('langToggle');
    if (btn) btn.addEventListener('click', function () { window.TrylaI18n.toggle(); });
    // Si el visitante no ha elegido y cambia el idioma del navegador, no se re-detecta: la eleccion manual manda.
  });
})();
