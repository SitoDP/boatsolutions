interface ProgramBookingTranslation {
  durationOne: string
  durationMany: string
  closeAria: string
  kicker: string
  title: string
  promotionSummary: string
  promotionTerms: string
  preferenceIntro: string
  connectedNotice: string
  success: {
    kicker: string; title: string; program: string; length: string; date: string; time: string; body: string; close: string
  }
  fields: {
    program: string; selectProgram: string; length: string; fullName: string; email: string; phone: string; boatType: string; selectOption: string; sailboat: string; yacht: string; motorboat: string; catamaran: string; other: string; comments: string; commentsPlaceholder: string; privacyPrefix: string; privacyLink: string
  }
  errors: Record<'programId' | 'name' | 'email' | 'phone' | 'date' | 'dateUnavailable' | 'time' | 'privacy' | 'notConfigured' | 'submit', string>
  submitting: string
  submit: string
  calendar: {
    ariaLabel: string; previousMonth: string; nextMonth: string; gridLabel: string; weekdays: string[]; preferredTime: string; availability: string
  }
}

export const programBookingI18n = {
  es: {
    durationOne: 'Una hora', durationMany: '{durationHours} horas', closeAria: 'Cerrar reserva', kicker: 'Revisión inicial gratuita · {duration}', title: 'Reserva tu revisión a bordo', promotionSummary: '{duration} de revisión general a bordo con informe escrito, valorada en {reportValue} €, IVA incluido.', promotionTerms: 'Consulta las bases', preferenceIntro: 'Elige una fecha y una hora preferidas. Confirmaremos la disponibilidad personalmente.', connectedNotice: 'Solicitud conectada con Boat Solutions.',
    success: { kicker: 'Solicitud enviada', title: 'Hemos enviado tu solicitud de revisión a bordo.', program: 'Programa', length: 'Eslora', date: 'Fecha', time: 'Hora preferida', body: 'Boat Solutions confirmará personalmente la disponibilidad de la fecha y hora elegidas. Si no recibes el correo de confirmación, contacta con nosotros.', close: 'Cerrar' },
    fields: { program: 'Programa', selectProgram: 'Selecciona un programa', length: 'Eslora', fullName: 'Nombre completo', email: 'Email', phone: 'Teléfono', boatType: 'Tipo de embarcación', selectOption: 'Selecciona una opción', sailboat: 'Velero', yacht: 'Yate', motorboat: 'Lancha', catamaran: 'Catamarán', other: 'Otro', comments: 'Comentarios opcionales', commentsPlaceholder: 'Cuéntanos brevemente qué necesitas revisar.', privacyPrefix: 'Acepto la', privacyLink: 'política de privacidad' },
    errors: { programId: 'Selecciona un programa', name: 'Introduce tu nombre completo', email: 'Introduce un email válido', phone: 'Introduce un teléfono válido', date: 'Selecciona una fecha', dateUnavailable: 'Selecciona una fecha disponible', time: 'Selecciona una hora preferida', privacy: 'Debes aceptar la política de privacidad', notConfigured: 'La automatización no está configurada. Contacta con Boat Solutions por teléfono.', submit: 'No hemos podido enviar la solicitud. Revisa tu conexión e inténtalo de nuevo.' },
    submitting: 'Enviando solicitud…', submit: 'Solicitar revisión gratuita',
    calendar: { ariaLabel: 'Selecciona fecha y hora preferidas', previousMonth: 'Mes anterior', nextMonth: 'Mes siguiente', gridLabel: 'Calendario de reservas', weekdays: ['L', 'M', 'X', 'J', 'V', 'S', 'D'], preferredTime: 'Hora preferida', availability: 'La disponibilidad definitiva se confirmará contigo.' },
  },
  en: {
    durationOne: 'One hour', durationMany: '{durationHours} hours', closeAria: 'Close booking', kicker: 'Free initial inspection · {duration}', title: 'Book your on-board inspection', promotionSummary: '{duration} general inspection on board with a written report, valued at {reportValue} €, VAT included.', promotionTerms: 'View the terms', preferenceIntro: 'Choose your preferred date and time. We will confirm availability personally.', connectedNotice: 'Request connected to Boat Solutions.',
    success: { kicker: 'Request sent', title: 'We have sent your on-board inspection request.', program: 'Plan', length: 'Length', date: 'Date', time: 'Preferred time', body: 'Boat Solutions will personally confirm availability for your chosen date and time. If you do not receive the confirmation email, please contact us.', close: 'Close' },
    fields: { program: 'Plan', selectProgram: 'Select a plan', length: 'Length', fullName: 'Full name', email: 'Email', phone: 'Phone', boatType: 'Boat type', selectOption: 'Select an option', sailboat: 'Sailing boat', yacht: 'Yacht', motorboat: 'Motorboat', catamaran: 'Catamaran', other: 'Other', comments: 'Optional comments', commentsPlaceholder: 'Briefly tell us what you would like us to inspect.', privacyPrefix: 'I accept the', privacyLink: 'Privacy Policy' },
    errors: { programId: 'Select a plan', name: 'Enter your full name', email: 'Enter a valid email address', phone: 'Enter a valid phone number', date: 'Select a date', dateUnavailable: 'Select an available date', time: 'Select a preferred time', privacy: 'You must accept the Privacy Policy', notConfigured: 'The automation is not configured. Contact Boat Solutions by phone.', submit: 'We could not send your request. Check your connection and try again.' },
    submitting: 'Sending request…', submit: 'Request a free inspection',
    calendar: { ariaLabel: 'Select your preferred date and time', previousMonth: 'Previous month', nextMonth: 'Next month', gridLabel: 'Booking calendar', weekdays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], preferredTime: 'Preferred time', availability: 'Final availability will be confirmed with you.' },
  },
} satisfies Record<'es' | 'en', ProgramBookingTranslation>
