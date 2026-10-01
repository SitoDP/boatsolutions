import { home } from './home'
import { nosotros } from './nosotros'
import { galeria } from './galeria'
import { proyectos } from './proyectos'
import { contacto } from './contacto'
import { checklist } from './checklist'
import { header } from './header'
import { footer } from './footer'
import { notFound } from './notFound'
import { programsI18n } from './programs'
import { programDetailsI18n } from './programDetails'
import { programBookingI18n } from './programBooking'
import { promotionI18n } from './promotion'

export const i18n = {
  es: {
    home: home.es,
    nosotros: nosotros.es,
    galeria: galeria.es,
    proyectos: proyectos.es,
    contacto: contacto.es,
    checklist: checklist.es,
    header: header.es,
    footer: footer.es,
    notFound: notFound.es,
    programs: programsI18n.es,
    programDetails: programDetailsI18n.es,
    programBooking: programBookingI18n.es,
    promotion: promotionI18n.es,
  },
  en: {
    home: home.en,
    nosotros: nosotros.en,
    galeria: galeria.en,
    proyectos: proyectos.en,
    contacto: contacto.en,
    checklist: checklist.en,
    header: header.en,
    footer: footer.en,
    notFound: notFound.en,
    programs: programsI18n.en,
    programDetails: programDetailsI18n.en,
    programBooking: programBookingI18n.en,
    promotion: promotionI18n.en,
  },
}

export type Lang = keyof typeof i18n
export type PageKey = keyof typeof i18n['es']
