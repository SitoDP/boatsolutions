import { CLEANING_HOURS_NOTE, type ProgramId } from './programs'

export interface ProgramWorkflowStep {
  title: string
  description: string
}

export interface ProgramCaseStudy {
  context: string
  action: string
  outcome: string | null
}

export interface ProgramFaqItem {
  question: string
  answer: string
}

export interface ProgramDetail {
  id: ProgramId
  promise: string
  subtitle: string
  problem: string
  /** Temporary compatibility fields consumed by ProgramDetailView until Task 5. */
  result: string
  rhythm: Array<{ moment: string; action: string }>
  boundary: string
  audience: string[]
  notFor: string[]
  included: string[]
  workflow: ProgramWorkflowStep[]
  benefits: string[]
  exclusions: string[]
  caseStudy: ProgramCaseStudy | null
  faq: ProgramFaqItem[]
  specificConditions: string[]
}

export const programDetails: Record<ProgramId, ProgramDetail> = {
  care: {
    id: 'care',
    promise: 'Tu barco, cuidado todo el año por una sola persona a la que llamar.',
    subtitle: 'Proveedores y presupuestos: tú solo decides.',
    problem: 'Mantener el barco al día exige ordenar revisiones, presupuestos, especialistas y fechas durante todo el año.',
    result: 'Una planificación anual, decisiones informadas y seguimiento documentado desde una única interlocución.',
    rhythm: [
      { moment: 'Planificación', action: 'Revisamos las necesidades y ordenamos el año de mantenimiento.' },
      { moment: 'Seguimiento', action: 'Realizamos la visita mensual y coordinamos las actuaciones aprobadas.' },
      { moment: 'Cierre anual', action: 'Entregamos un informe con el trabajo realizado y las próximas prioridades.' },
    ],
    boundary: 'Materiales, repuestos, trabajos de especialistas, peritaciones e inspecciones obligatorias.',
    audience: ['Propietarios que quieren conservar el control de las decisiones sin encargarse de cada coordinación.'],
    notFor: ['Quien necesita una peritación o una inspección obligatoria en lugar de un servicio continuado de coordinación.'],
    included: [
      'Una persona responsable como interlocutora única.',
      'Visita mensual de una hora con fotografías.',
      'Planificación anual del mantenimiento.',
      'Comparación de presupuestos.',
      'Coordinación y seguimiento de especialistas.',
      'Logística relacionada con las intervenciones aprobadas.',
      'Asistencia diaria por teléfono o vídeo.',
      'Visita y diagnóstico en un máximo de 48 horas laborables.',
      'Informe anual del estado y de las actuaciones.',
    ],
    workflow: [
      { title: 'Planificación', description: 'Revisamos las necesidades y ordenamos el año de mantenimiento.' },
      { title: 'Seguimiento', description: 'Realizamos la visita mensual y coordinamos las actuaciones aprobadas.' },
      { title: 'Cierre anual', description: 'Entregamos un informe con el trabajo realizado y las próximas prioridades.' },
    ],
    benefits: [
      'Un único punto de contacto para saber qué necesita el barco.',
      'Presupuestos comparados antes de decidir.',
      'Seguimiento documentado con fotografías e informe anual.',
    ],
    exclusions: [
      'Materiales, repuestos y trabajos de especialistas.',
      'Peritaciones e inspecciones obligatorias.',
    ],
    caseStudy: {
      context: 'Durante el invierno, un Brenta 42 y un Van Dutch 40 necesitaban un plan con varios especialistas.',
      action: 'Se compararon opciones de varadero para coordinar los trabajos.',
      outcome: 'Se eligió un espacio interior con mejor precio y una botadura flexible.',
    },
    faq: [
      {
        question: '¿El diagnóstico de una avería consume horas de la bolsa?',
        answer: 'No. El diagnóstico de avería no descuenta horas de la bolsa mensual.',
      },
      {
        question: '¿La cuota incluye materiales y trabajos externos?',
        answer: 'No. Se presupuestan y se aprueban antes de realizarse.',
      },
    ],
    specificConditions: [
      'El diagnóstico de avería no descuenta horas de la bolsa.',
      'La visita y el diagnóstico se realizan en un máximo de 48 horas laborables.',
    ],
  },
  navigation: {
    id: 'navigation',
    promise: 'Tu asesor de electrónica, para que todo funcione cuando largues amarras.',
    subtitle: 'Auditamos, recomendamos e instalamos.',
    problem: 'Los sistemas eléctricos y electrónicos necesitan una revisión coordinada para detectar prioridades antes de navegar.',
    result: 'Un informe tipo semáforo, prioridades claras y comprobación de las actuaciones aprobadas.',
    rhythm: [
      { moment: 'Auditoría', action: 'Comprobamos la instalación eléctrica y los equipos electrónicos.' },
      { moment: 'Prioridades', action: 'Entregamos un informe tipo semáforo y una recomendación para cada hallazgo.' },
      { moment: 'Comprobación', action: 'Coordinamos lo aprobado y verificamos el resultado.' },
    ],
    boundary: 'Equipos, cableado, materiales y trabajos externos no aprobados previamente.',
    audience: ['Propietarios que quieren conocer el estado de sus equipos y decidir con una recomendación clara.'],
    notFor: ['Quien busca comprar equipos sin una auditoría previa ni comprobar después su funcionamiento a bordo.'],
    included: [
      'Auditoría eléctrica y electrónica.',
      'Informe tipo semáforo con prioridades.',
      'Recomendaciones de mantenimiento, reparación o actualización.',
      'Coordinación de especialistas.',
      'Suministro e instalación cuando corresponda y exista aprobación previa.',
      'Prueba de mar.',
      'Soporte sobre los equipos instalados.',
      'Comprobación previa a travesías largas.',
    ],
    workflow: [
      { title: 'Auditoría', description: 'Comprobamos la instalación eléctrica y los equipos electrónicos.' },
      { title: 'Prioridades', description: 'Entregamos un informe tipo semáforo y una recomendación para cada hallazgo.' },
      { title: 'Comprobación', description: 'Coordinamos lo aprobado y verificamos el resultado, incluida la prueba de mar cuando corresponda.' },
    ],
    benefits: [
      'Una visión ordenada del estado de los sistemas.',
      'Prioridades comprensibles antes de autorizar gastos.',
      'Comprobación del funcionamiento tras las actuaciones aprobadas.',
    ],
    exclusions: [
      'Equipos, cableado y materiales, que se presupuestan aparte.',
      'Trabajos externos no aprobados previamente.',
    ],
    caseStudy: {
      context: 'Un mismo cliente solicitó una revisión eléctrica para dos embarcaciones.',
      action: 'La revisión eléctrica de ambas embarcaciones se programó para diciembre.',
      outcome: null,
    },
    faq: [
      {
        question: '¿Los equipos y materiales están incluidos?',
        answer: 'No. Los equipos, el cableado y los materiales se presupuestan aparte para su aprobación.',
      },
      {
        question: '¿Se comprueba el resultado de la instalación?',
        answer: 'Sí. El servicio incluye la comprobación y, cuando corresponde, una prueba de mar.',
      },
    ],
    specificConditions: [
      'El suministro y la instalación se realizan únicamente cuando corresponda y tras la aprobación del presupuesto.',
      'El soporte incluido se refiere a los equipos instalados dentro del servicio.',
    ],
  },
  ready: {
    id: 'ready',
    promise: 'Tu barco limpio, toda la temporada.',
    subtitle: 'Limpieza y detailing profesional, en otoño y en primavera.',
    problem: 'La limpieza y la conservación requieren coordinación y supervisión en los momentos clave de la temporada.',
    result: 'Dos limpiezas planificadas al año, supervisión del resultado y registro fotográfico.',
    rhythm: [
      { moment: 'Revisión', action: 'Comprobamos el estado y organizamos la limpieza de temporada.' },
      { moment: 'Limpieza', action: 'Coordinamos y supervisamos el trabajo interior y exterior.' },
      { moment: 'Verificación', action: 'Revisamos el resultado y entregamos fotografías antes y después.' },
    ],
    boundary: 'Pulido, teca, tapicería, reparaciones y materiales especiales requieren presupuesto.',
    audience: ['Propietarios que quieren dos limpiezas completas al año con seguimiento antes y después del trabajo.'],
    notFor: ['Quien necesita reparaciones, tapicería o tratamientos especiales incluidos automáticamente en la cuota.'],
    included: [
      'Dos limpiezas completas al año.',
      'Coordinación y supervisión de los trabajos.',
      'Limpieza interior y exterior.',
      'Revisión de textiles y fundas.',
      'Fotografías antes y después.',
      'Aviso temprano de incidencias detectadas durante la revisión.',
    ],
    workflow: [
      { title: 'Revisión', description: 'Comprobamos el estado y organizamos la limpieza de temporada.' },
      { title: 'Limpieza', description: 'Coordinamos y supervisamos el trabajo interior y exterior.' },
      { title: 'Verificación', description: 'Revisamos el resultado y entregamos fotografías antes y después.' },
    ],
    benefits: [
      'Dos momentos de limpieza planificados durante el año.',
      'Supervisión del resultado y registro fotográfico.',
      'Detección temprana de incidencias visibles.',
    ],
    exclusions: [
      'Pulido de casco y cubierta: Servicio adicional bajo presupuesto.',
      'Teca, tapicería, reparaciones y materiales especiales.',
    ],
    caseStudy: null,
    faq: [
      {
        question: '¿Cuántas limpiezas incluye el programa?',
        answer: 'Incluye dos limpiezas completas al año, una en otoño y otra en primavera.',
      },
      {
        question: '¿El pulido está incluido?',
        answer: 'No. El pulido de casco y cubierta es un Servicio adicional bajo presupuesto.',
      },
    ],
    specificConditions: [
      CLEANING_HOURS_NOTE,
      'Pulido, teca, tapicería, reparaciones y materiales especiales requieren presupuesto.',
    ],
  },
  complete: {
    id: 'complete',
    promise: 'Dinos cuándo quieres salir; del resto nos ocupamos nosotros.',
    subtitle: 'Los tres planes en uno, con asistencia en 48 h e informe anual. Ahorras hasta un 16 %.',
    problem: 'Coordinar mantenimiento, electrónica y limpieza por separado dificulta tener una visión común del estado del barco.',
    result: 'Los tres planes coordinados por una única persona, con una visión anual común de las actuaciones.',
    rhythm: [
      { moment: 'Plan común', action: 'Reunimos mantenimiento, electrónica y limpieza en una planificación anual.' },
      { moment: 'Coordinación', action: 'Una sola persona sigue las actuaciones y comunica las incidencias.' },
      { moment: 'Antes de salir', action: 'Con 48 horas de aviso, realizamos la comprobación previa a la salida.' },
    ],
    boundary: 'Materiales, repuestos, trabajos externos y actuaciones no incluidas en los tres planes.',
    audience: ['Propietarios que quieren reunir los tres planes bajo una sola persona responsable.'],
    notFor: ['Quien solo necesita una actuación aislada sin seguimiento durante el año.'],
    included: [
      'Todas las prestaciones de los tres planes.',
      'Una persona responsable como interlocutora única.',
      'Aviso de incidencias.',
      'Asistencia y diagnóstico en un máximo de 48 horas laborables.',
      'Informe anual.',
      'Comprobación previa a la salida con 48 horas de aviso.',
    ],
    workflow: [
      { title: 'Plan común', description: 'Reunimos mantenimiento, electrónica y limpieza en una planificación anual.' },
      { title: 'Coordinación', description: 'Una sola persona sigue las actuaciones y comunica las incidencias.' },
      { title: 'Antes de salir', description: 'Con 48 horas de aviso, realizamos la comprobación previa a la salida.' },
    ],
    benefits: [
      'Los tres planes coordinados por una única persona.',
      'Una visión anual común del estado y las actuaciones.',
      'Un ahorro mensual de hasta un 16 % frente a contratar los planes por separado.',
    ],
    exclusions: [
      'Materiales, repuestos y trabajos externos sin presupuesto y aprobación previa.',
      'Actuaciones que no estén incluidas en alguno de los tres planes.',
    ],
    caseStudy: null,
    faq: [
      {
        question: '¿Qué reúne Listo para Zarpar?',
        answer: 'Reúne Mantenimiento Delegado, Electrónica Asesorada y Limpieza y Detailing.',
      },
      {
        question: '¿Con cuánto tiempo debo avisar antes de salir?',
        answer: 'La comprobación previa a la salida requiere un aviso de 48 horas.',
      },
    ],
    specificConditions: [
      'La comprobación previa a la salida requiere 48 horas de aviso.',
      'Las condiciones específicas de cada uno de los tres planes siguen siendo aplicables.',
    ],
  },
}
