import { home } from './home'
import { nosotros } from './nosotros'
import { consulting } from './consulting'
import { management } from './management'
import { logistics } from './logistics'
import { detailing } from './detailing'
import { galeria } from './galeria'
import { proyectos } from './proyectos'
import { contacto } from './contacto'
import { checklist } from './checklist'
import { header } from './header'
import { footer } from './footer'
import { notFound } from './notFound'
import { transportRequest } from './transportRequest'
import { detailingRequest } from './detailingRequest'
import { programsI18n } from './programs'
import { programDetailsI18n } from './programDetails'
import { programBookingI18n } from './programBooking'
import { promotionI18n } from './promotion'

export const i18n = {
  es: {
    home: home.es,
    nosotros: nosotros.es,
    consulting: consulting.es,
    management: management.es,
    logistics: logistics.es,
    detailing: detailing.es,
    galeria: galeria.es,
    proyectos: proyectos.es,
    contacto: contacto.es,
    checklist: checklist.es,
    header: header.es,
    footer: footer.es,
    notFound: notFound.es,
    transportRequest: transportRequest.es,
    detailingRequest: detailingRequest.es,
    programs: programsI18n.es,
    programDetails: programDetailsI18n.es,
    programBooking: programBookingI18n.es,
    promotion: promotionI18n.es,
  },
  en: {
    home: home.en,
    nosotros: nosotros.en,
    consulting: consulting.en,
    management: management.en,
    logistics: logistics.en,
    detailing: detailing.en,
    galeria: galeria.en,
    proyectos: proyectos.en,
    contacto: contacto.en,
    checklist: checklist.en,
    header: header.en,
    footer: footer.en,
    notFound: notFound.en,
    transportRequest: transportRequest.en,
    detailingRequest: detailingRequest.en,
    programs: programsI18n.en,
    programDetails: programDetailsI18n.en,
    programBooking: programBookingI18n.en,
    promotion: promotionI18n.en,
  },
}

export type Lang = keyof typeof i18n
export type PageKey = keyof typeof i18n['es']
