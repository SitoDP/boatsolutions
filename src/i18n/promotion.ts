interface PromotionTranslation {
  meta: { title: string; description: string }
  kicker: string
  title: string
  intro: string
  backToPrograms: string
  summaryAria: string
  summaryDuration: string
  summaryValue: string
  summarySlots: string
  conditionsTitle: string
  conditionsIntro: string
  durationOne: string
  durationMany: string
  conditions: Record<'duration' | 'value' | 'slots' | 'minimumLength' | 'region' | 'deadline' | 'onePerOwnerAndBoat', string>
  sidebarKicker: string
  sidebarTitle: string
  sidebarIntro: string
  deadlineLabel: string
  regionLabel: string
  minimumLengthLabel: string
  feetOrMore: string
  bookingCta: string
  privacyTitle: string
  privacyPrefix: string
  privacyLink: string
  legalReview: string
}

export const promotionI18n = {
  es: {
    meta: { title: 'Bases de la revisión gratuita', description: 'Bases de la revisión gratuita de una hora a bordo ofrecida por Boat Solutions en Rías Baixas.' },
    kicker: 'Revisión gratuita', title: 'Bases de la promoción', intro: 'Solicita una revisión general de tu embarcación, con informe escrito. Sin obligación de contratar.', backToPrograms: 'Volver a los programas', summaryAria: 'Resumen de la promoción', summaryDuration: 'Duración a bordo', summaryValue: 'Valor del informe', summarySlots: 'Plazas de la promoción', conditionsTitle: 'Condiciones de la revisión', conditionsIntro: 'Todo lo que necesitas saber antes de solicitar tu plaza.', durationOne: 'Una hora', durationMany: '{durationHours} horas',
    conditions: { duration: '{durationLabel} de revisión general a bordo. Al finalizar recibirás un informe escrito.', value: 'El servicio tiene un valor de {reportValue} €, IVA incluido.', slots: 'La promoción está limitada a {slotLimit} plazas.', minimumLength: 'Disponible para embarcaciones de {minimumLength} pies o más.', region: 'El servicio se presta exclusivamente en {region}.', deadline: 'La reserva debe solicitarse antes del {deadline}.', onePerOwnerAndBoat: 'Una revisión por propietario y embarcación.' },
    sidebarKicker: 'Datos clave', sidebarTitle: 'Antes de reservar', sidebarIntro: 'Comprueba que tu embarcación cumple las condiciones principales de la promoción.', deadlineLabel: 'Solicítala antes del', regionLabel: 'Zona de servicio', minimumLengthLabel: 'Eslora mínima', feetOrMore: '{minimumLength} pies o más', bookingCta: 'Solicitar revisión gratuita',
    privacyTitle: 'Privacidad', privacyPrefix: 'El tratamiento de tus datos se rige por nuestra', privacyLink: 'Política de Privacidad', legalReview: 'Redacción pendiente de revisión jurídica antes de publicación.',
  },
  en: {
    meta: { title: 'Free Boat Inspection Terms', description: 'Terms of the free one-hour on-board inspection offered by Boat Solutions in Rías Baixas.' },
    kicker: 'Free inspection', title: 'Promotion terms', intro: 'Request a general inspection of your boat, with a written report. There is no obligation to purchase.', backToPrograms: 'Back to programmes', summaryAria: 'Promotion summary', summaryDuration: 'Time on board', summaryValue: 'Report value', summarySlots: 'Promotion slots', conditionsTitle: 'Inspection conditions', conditionsIntro: 'Everything you need to know before requesting your slot.', durationOne: 'One hour', durationMany: '{durationHours} hours',
    conditions: { duration: '{durationLabel} of general inspection on board. You will receive a written report at the end.', value: 'The service has a value of {reportValue} €, VAT included.', slots: 'The promotion is limited to {slotLimit} slots.', minimumLength: 'Available for boats of {minimumLength} feet or more.', region: 'The service is provided exclusively in {region}.', deadline: 'The booking request must be submitted before {deadline}.', onePerOwnerAndBoat: 'One inspection per owner and boat.' },
    sidebarKicker: 'Key details', sidebarTitle: 'Before booking', sidebarIntro: 'Check that your boat meets the main conditions of the promotion.', deadlineLabel: 'Request before', regionLabel: 'Service area', minimumLengthLabel: 'Minimum length', feetOrMore: '{minimumLength} feet or more', bookingCta: 'Request a free inspection',
    privacyTitle: 'Privacy', privacyPrefix: 'The processing of your data is governed by our', privacyLink: 'Privacy Policy', legalReview: 'Wording pending legal review before publication.',
  },
} satisfies Record<'es' | 'en', PromotionTranslation>
