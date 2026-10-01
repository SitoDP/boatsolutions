import type { ProgramId } from '../data/programs'

interface ProgramCopy {
  name: string
  shortName: string
  description: string
  imageAlt: string
  hoursNote?: string
}

interface ProgramsTranslation {
  meta: {
    services: { title: string; description: string }
    details: Record<ProgramId, { title: string; description: string }>
  }
  programs: Record<ProgramId, ProgramCopy>
  hero: Record<'eyebrow' | 'title' | 'lead' | 'primaryCta' | 'secondaryCta' | 'imageAlt' | 'captionLabel' | 'captionText', string>
  promotion: Record<'kicker' | 'title' | 'summary' | 'valueLabel' | 'valueMeta' | 'deadline' | 'termsCta', string>
  listing: Record<'kicker' | 'title' | 'intro', string>
  pricingDisclaimer: string
  lengthSelector: Record<'ariaLabel' | 'question' | 'groupLabel' | 'upTo' | 'feet' | 'otherLengths', string>
  comparison: {
    kicker: string
    title: string
    intro: string
    ariaLabel: string
    need: string
    included: string
    rows: Record<'care' | 'electronics' | 'cleaning' | 'preDeparture' | 'annualReport', string>
  }
  guarantee: Record<'kicker' | 'title' | 'body' | 'imageAlt', string>
  case: Record<'quote' | 'label' | 'caption', string>
  finalCta: Record<'kicker' | 'title' | 'body' | 'button', string>
  card: Record<'recommended' | 'monthlyFee' | 'perMonth' | 'hoursAvailable' | 'savings' | 'view' | 'viewComplete' | 'requestInspection', string>
  detail: {
    backToPrograms: string
    bookFree: string
    programLabel: string
    problem: Record<'kicker' | 'title', string>
    fit: Record<'forWhom' | 'yesTitle' | 'notForWhom' | 'noTitle', string>
    included: Record<'kicker' | 'title', string>
    workflow: Record<'kicker' | 'title', string>
    benefits: Record<'kicker' | 'title', string>
    exclusions: Record<'kicker' | 'title', string>
    case: Record<'kicker' | 'title', string>
    saving: Record<'kicker' | 'title' | 'body', string>
    faq: Record<'kicker' | 'title', string>
    final: Record<'kicker' | 'title', string>
    pagination: Record<'ariaLabel' | 'previous' | 'next', string>
  }
  conditions: {
    kicker: string
    title: string
    upToFeet: string
    perMonth: string
    includedHours: string
    vatIncluded: string
    contractTitle: string
    contractItems: string[]
    serviceTitle: string
    serviceItems: string[]
    withdrawalTitle: string
    legalReview: string
    withdrawalBody: string
    refund: string
    earlyStart: string
    fullPerformance: string
    specificTitle: string
  }
}

export const programsI18n = {
  es: {
    meta: {
      services: { title: 'Programas para cuidar tu barco', description: 'Programas anuales de mantenimiento, electrónica y limpieza para embarcaciones en Rías Baixas.' },
      details: {
        care: { title: 'Plan Mantenimiento Delegado', description: 'Plan anual de coordinación, mantenimiento y seguimiento de proveedores para tu embarcación.' },
        navigation: { title: 'Plan Electrónica Asesorada', description: 'Auditoría, prioridades y comprobación de los sistemas eléctricos y electrónicos de tu embarcación.' },
        ready: { title: 'Plan Limpieza y Detailing', description: 'Dos limpiezas completas al año con coordinación, supervisión y registro fotográfico.' },
        complete: { title: 'Listo para Zarpar', description: 'Mantenimiento, electrónica y limpieza coordinados por una sola persona durante todo el año.' },
      },
    },
    programs: {
      care: { name: 'Plan Mantenimiento Delegado', shortName: 'Mantenimiento delegado', description: 'Un responsable pendiente de la planificación, el mantenimiento y los proveedores durante todo el año.', imageAlt: 'Embarcaciones atendidas y protegidas dentro del varadero cubierto', hoursNote: '' },
      navigation: { name: 'Plan Electrónica Asesorada', shortName: 'Electrónica asesorada', description: 'Los sistemas que te orientan y te mantienen conectado, revisados antes de que los necesites.', imageAlt: 'Velero navegando con su instrumentación y sistemas de cubierta en uso', hoursNote: '' },
      ready: { name: 'Plan Limpieza y Detailing', shortName: 'Limpieza y detailing', description: 'El barco impecable al final del verano y preparado para volver al agua al inicio de temporada.', imageAlt: 'Embarcación con el casco recién pulido durante su puesta a punto en varadero', hoursNote: 'La hora mensual cubre coordinación y verificación; no incluye las horas del equipo de limpieza externo.' },
      complete: { name: 'Listo para Zarpar', shortName: 'El plan completo', description: 'Los tres programas coordinados para que tu barco esté listo cuando tú lo estés.', imageAlt: 'Velero navegando con su vela roja, preparado para disfrutar del mar', hoursNote: '' },
    },
    hero: { eyebrow: 'Programas anuales para cuidar tu embarcación', title: 'Tú navegas. Nosotros nos ocupamos.', lead: 'Mantenimiento, electrónica y limpieza coordinados en Rías Baixas, con una cuota mensual e IVA incluido.', primaryCta: 'Ver programas y precios', secondaryCta: 'Cómo funciona la revisión gratuita', imageAlt: 'Velero preparado para navegar por la ría', captionLabel: 'Una sola persona de contacto', captionText: 'Todo coordinado para que puedas salir a navegar' },
    promotion: { kicker: 'Tu punto de partida', title: 'Una hora de revisión gratuita a bordo', summary: 'Recibe un informe escrito, sin obligación de contratar. Para embarcaciones de {minimumLength} pies o más en {region}.', valueLabel: 'Valor del informe', valueMeta: 'IVA incluido · {slotLimit} plazas', deadline: 'Reserva antes del {deadline}', termsCta: 'Consultar las bases' },
    listing: { kicker: 'Cuota mensual · IVA incluido', title: 'Elige cuánto quieres delegar', intro: 'Empieza por una necesidad concreta o reúne todo el cuidado de tu embarcación en un solo programa.' },
    pricingDisclaimer: 'Cuotas mensuales con IVA incluido para la eslora seleccionada. Los materiales, repuestos y trabajos externos requieren presupuesto y aprobación previa.',
    lengthSelector: { ariaLabel: 'Selecciona la eslora de tu barco', question: '¿Cuánto mide tu barco?', groupLabel: 'Eslora en pies', upTo: 'Hasta {length}', feet: 'pies', otherLengths: 'Otras esloras: diseñamos una propuesta a medida.' },
    comparison: { kicker: 'Comparación rápida', title: 'Una decisión fácil de entender', intro: 'Compara las prestaciones principales. Las horas disponibles cambian con la eslora seleccionada.', ariaLabel: 'Comparación de programas', need: 'Qué necesitas', included: 'Incluido', rows: { care: 'Responsable y seguimiento anual', electronics: 'Auditoría eléctrica y electrónica', cleaning: 'Dos limpiezas completas al año', preDeparture: 'Comprobación previa a la salida', annualReport: 'Informe anual de la embarcación' } },
    guarantee: { kicker: 'Garantía de servicio', title: 'Repetimos el trabajo si el resultado no cumple.', body: 'La auditoría, limpieza o solución del proveedor afectada puede repetirse hasta {maximumRepeats} veces. Comunica la reclamación por escrito dentro de los {claimDeadlineDays} días siguientes.', imageAlt: 'Embarcaciones protegidas en un varadero cubierto' },
    case: { quote: 'Un plan de invierno coordinó a varios especialistas, comparó varaderos y permitió elegir una plaza interior con mejor precio y botadura flexible.', label: 'Caso real anonimizado', caption: 'Dos embarcaciones, una sola planificación' },
    finalCta: { kicker: 'Revisión inicial gratuita · una hora', title: 'Empieza por conocer el estado real de tu embarcación.', body: 'Elige una fecha y una hora preferidas. Boat Solutions confirmará personalmente la disponibilidad.', button: 'Solicitar revisión gratuita' },
    card: { recommended: 'La opción completa', monthlyFee: 'Cuota mensual', perMonth: '/ mes', hoursAvailable: '{hours} disponibles al mes · IVA incluido', savings: 'Ahorras {savings} €/mes frente a contratar los programas por separado.', view: 'Ver programa', viewComplete: 'Ver programa completo', requestInspection: 'Solicitar revisión' },
    detail: {
      backToPrograms: 'Todos los programas', bookFree: 'Reserva tu cita gratis', programLabel: 'Programa',
      problem: { kicker: 'El problema que resolvemos', title: 'Menos coordinación pendiente. Más tiempo para navegar.' },
      fit: { forWhom: 'Para quién es', yesTitle: 'Encaja contigo si…', notForWhom: 'Para quién no es', noTitle: 'No es la opción adecuada si…' },
      included: { kicker: 'Prestaciones incluidas', title: 'Qué reúne este programa' }, workflow: { kicker: 'Cómo funciona', title: 'Un proceso fácil de seguir' }, benefits: { kicker: 'Beneficios', title: 'El resultado que puedes esperar' }, exclusions: { kicker: 'Qué queda fuera', title: 'Sin letra pequeña' }, case: { kicker: 'Caso real anonimizado', title: 'Una situación concreta, gestionada de principio a fin' }, saving: { kicker: 'El plan completo', title: 'Ahorras {savings} € al mes', body: 'Frente a contratar los tres planes por separado para una embarcación de hasta {length} pies.' }, faq: { kicker: 'Preguntas frecuentes', title: 'Lo que conviene saber antes de empezar' }, final: { kicker: 'Empezamos a bordo', title: 'Cuéntanos qué necesita tu barco' }, pagination: { ariaLabel: 'Cambiar de programa', previous: 'Programa anterior', next: 'Siguiente programa' },
    },
    conditions: {
      kicker: 'Cuota y condiciones', title: 'Todo claro desde el principio', upToFeet: 'Hasta {length} pies', perMonth: '/ mes', includedHours: '{hours} incluidas al mes', vatIncluded: 'IVA incluido', contractTitle: 'Contrato y horas',
      contractItems: ['Contrato de {durationMonths} meses con cuota fija.', 'Renovación automática por {renewalMonths} meses salvo aviso escrito con {noticeDays} días de antelación.', 'Enviaremos un recordatorio antes de la renovación.', 'Las horas se acumulan durante el año contractual y caducan al finalizarlo.', 'Horas adicionales: {hourlyRate} €/h, IVA incluido.'],
      serviceTitle: 'Servicio y garantía', serviceItems: ['Materiales, repuestos y trabajos externos requieren presupuesto y aprobación previa.', '{discountPercent} % de descuento para una segunda embarcación del mismo cliente.', 'Asistencia por teléfono o vídeo y diagnóstico presencial en un máximo de {businessHours} horas laborables.', 'La garantía permite repetir hasta {maximumRepeats} veces la auditoría, limpieza o solución de proveedor afectada.', 'La reclamación debe hacerse por escrito dentro de los {claimDeadlineDays} días siguientes.'],
      withdrawalTitle: 'Derecho de desistimiento', legalReview: 'Redacción pendiente de revisión jurídica antes de publicación.', withdrawalBody: 'En contratos a distancia o fuera del establecimiento dispones de {periodDays} días naturales para comunicar el desistimiento a {contactEmail}.', refund: 'La devolución se realizará dentro de los {refundDeadlineDays} días siguientes a la comunicación.', earlyStart: 'Si solicitas que el servicio empiece antes, se aplicará el cobro proporcional de lo ya prestado.', fullPerformance: 'La pérdida del derecho tras la ejecución completa requiere solicitud y reconocimiento expresos.', specificTitle: 'Condiciones específicas de este programa',
    },
  },
  en: {
    meta: {
      services: { title: 'Boat care plans', description: 'Annual maintenance, electronics and cleaning plans for boats in Rías Baixas.' },
      details: {
        care: { title: 'Delegated Maintenance Plan', description: 'Annual coordination, maintenance and supplier follow-up for your boat.' },
        navigation: { title: 'Expert-Guided Electronics Plan', description: 'Audit, priorities and verification for your boat’s electrical and electronic systems.' },
        ready: { title: 'Cleaning & Detailing Plan', description: 'Two full cleanings per year with coordination, supervision and a photographic record.' },
        complete: { title: 'Ready to Cast Off', description: 'Maintenance, electronics and cleaning coordinated by one person throughout the year.' },
      },
    },
    programs: {
      care: { name: 'Delegated Maintenance Plan', shortName: 'Delegated maintenance', description: 'One person looking after planning, maintenance and suppliers throughout the year.', imageAlt: 'Boats serviced and protected inside a covered boatyard', hoursNote: '' },
      navigation: { name: 'Expert-Guided Electronics Plan', shortName: 'Expert-guided electronics', description: 'The systems that guide you and keep you connected, checked before you need them.', imageAlt: 'Sailing boat underway with its instruments and deck systems in use', hoursNote: '' },
      ready: { name: 'Cleaning & Detailing Plan', shortName: 'Cleaning & detailing', description: 'Your boat spotless at the end of summer and ready to return to the water at the start of the season.', imageAlt: 'Boat with a freshly polished hull during preparation in the boatyard', hoursNote: 'The monthly hour covers coordination and verification; it does not include the external cleaning team’s working hours.' },
      complete: { name: 'Ready to Cast Off', shortName: 'The complete plan', description: 'All three plans coordinated so your boat is ready when you are.', imageAlt: 'Sailing boat with a red sail, ready to enjoy the sea', hoursNote: '' },
    },
    hero: { eyebrow: 'Annual plans to care for your boat', title: 'You sail. We take care of the rest.', lead: 'Maintenance, electronics and cleaning coordinated in Rías Baixas, for a monthly fee including VAT.', primaryCta: 'View plans and prices', secondaryCta: 'How the free inspection works', imageAlt: 'Sailing boat ready to navigate the estuary', captionLabel: 'One point of contact', captionText: 'Everything coordinated so you can go sailing' },
    promotion: { kicker: 'Your starting point', title: 'A free one-hour inspection on board', summary: 'Receive a written report, with no obligation to purchase. For boats of {minimumLength} feet or more in {region}.', valueLabel: 'Report value', valueMeta: 'VAT included · {slotLimit} slots', deadline: 'Book before {deadline}', termsCta: 'View the terms' },
    listing: { kicker: 'Monthly fee · VAT included', title: 'Choose how much you want to delegate', intro: 'Start with one specific need or bring all your boat care together in one plan.' },
    pricingDisclaimer: 'Monthly fees include VAT for the selected boat length. Materials, spare parts and external work require a quote and prior approval.',
    lengthSelector: { ariaLabel: 'Select your boat length', question: 'How long is your boat?', groupLabel: 'Length in feet', upTo: 'Up to {length}', feet: 'feet', otherLengths: 'Other lengths: we will design a tailored proposal.' },
    comparison: { kicker: 'Quick comparison', title: 'An easy decision to understand', intro: 'Compare the main services. Available hours change with the selected boat length.', ariaLabel: 'Plan comparison', need: 'What you need', included: 'Included', rows: { care: 'Dedicated contact and annual follow-up', electronics: 'Electrical and electronics audit', cleaning: 'Two full cleanings per year', preDeparture: 'Pre-departure check', annualReport: 'Annual vessel report' } },
    guarantee: { kicker: 'Service guarantee', title: 'We repeat the work if the result does not meet the agreed standard.', body: 'The affected audit, cleaning or supplier-delivered solution may be repeated up to {maximumRepeats} times. Submit the claim in writing within the following {claimDeadlineDays} days.', imageAlt: 'Boats protected in a covered boatyard' },
    case: { quote: 'A coordinated winter plan brought together several specialists, compared boatyards and made it possible to choose an indoor berth with a better price and flexible launch date.', label: 'Anonymised real case', caption: 'Two boats, one plan' },
    finalCta: { kicker: 'Free initial inspection · one hour', title: 'Start by finding out the actual condition of your boat.', body: 'Choose your preferred date and time. Boat Solutions will confirm availability personally.', button: 'Request a free inspection' },
    card: { recommended: 'The complete option', monthlyFee: 'Monthly fee', perMonth: '/ month', hoursAvailable: '{hours} available per month · VAT included', savings: 'Save {savings} €/month compared with purchasing the plans separately.', view: 'View plan', viewComplete: 'View full plan', requestInspection: 'Request an inspection' },
    detail: {
      backToPrograms: 'All plans', bookFree: 'Book your free appointment', programLabel: 'Plan',
      problem: { kicker: 'The problem we solve', title: 'Less coordination to manage. More time to sail.' }, fit: { forWhom: 'Who it is for', yesTitle: 'It is right for you if…', notForWhom: 'Who it is not for', noTitle: 'It is not the right option if…' }, included: { kicker: 'Included services', title: 'What this plan includes' }, workflow: { kicker: 'How it works', title: 'An easy process to follow' }, benefits: { kicker: 'Benefits', title: 'The result you can expect' }, exclusions: { kicker: 'What is not included', title: 'No hidden terms' }, case: { kicker: 'Anonymised real case', title: 'One specific situation, managed from start to finish' }, saving: { kicker: 'The complete plan', title: 'Save {savings} € per month', body: 'Compared with purchasing the three plans separately for a boat up to {length} feet.' }, faq: { kicker: 'Frequently asked questions', title: 'What you should know before getting started' }, final: { kicker: 'We start on board', title: 'Tell us what your boat needs' }, pagination: { ariaLabel: 'Change plan', previous: 'Previous plan', next: 'Next plan' },
    },
    conditions: {
      kicker: 'Fee and conditions', title: 'Clear from the outset', upToFeet: 'Up to {length} feet', perMonth: '/ month', includedHours: '{hours} included per month', vatIncluded: 'VAT included', contractTitle: 'Contract and hours',
      contractItems: ['A {durationMonths}-month contract with a fixed fee.', 'Automatic renewal for {renewalMonths} months unless written notice is given {noticeDays} days in advance.', 'We will send a reminder before renewal.', 'Hours accumulate during the contract year and expire at the end of it.', 'Additional hours: {hourlyRate} €/h, VAT included.'],
      serviceTitle: 'Service and guarantee', serviceItems: ['Materials, spare parts and external work require a quote and prior approval.', '{discountPercent}% discount for a second boat belonging to the same customer.', 'Assistance by phone or video and on-site diagnosis within a maximum of {businessHours} business hours.', 'The guarantee allows the affected audit, cleaning or supplier-delivered solution to be repeated up to {maximumRepeats} times.', 'The claim must be made in writing within the following {claimDeadlineDays} days.'],
      withdrawalTitle: 'Right of withdrawal', legalReview: 'Wording pending legal review before publication.', withdrawalBody: 'For distance or off-premises contracts, you have {periodDays} calendar days to notify your withdrawal at {contactEmail}.', refund: 'The refund will be made within {refundDeadlineDays} days following notification.', earlyStart: 'If you request that the service start earlier, a proportionate charge will apply for the service already provided.', fullPerformance: 'Loss of the right after full performance requires an express request and acknowledgement.', specificTitle: 'Conditions specific to this plan',
    },
  },
} satisfies Record<'es' | 'en', ProgramsTranslation>
