// @vitest-environment jsdom
import { createHead } from '@unhead/vue/client'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import CalendarWidget from '../../components/CalendarWidget.vue'
import ProgramBookingModal from '../../components/ProgramBookingModal.vue'
import { useProgramBooking } from '../../composables/useProgramBooking'
import { programVisuals } from '../../data/programVisuals'
import type { ProgramId } from '../../data/programs'
import router from '../../router'
import Home from '../Home.vue'

const mountedWrappers: VueWrapper[] = []
const booking = useProgramBooking()

async function visit(path: '/' | '/en') {
  await router.push(path)
  await router.isReady()
  const wrapper = mount(Home, {
    global: { plugins: [router, createHead()] },
  })
  mountedWrappers.push(wrapper)
  await flushPromises()
  await new Promise((resolve) => setTimeout(resolve, 0))
  return wrapper
}

beforeAll(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})

beforeEach(() => {
  document.head.innerHTML = ''
  document.body.innerHTML = ''
  booking.close()
})

afterEach(() => {
  mountedWrappers.splice(0).forEach((wrapper) => wrapper.unmount())
})

const expectedCards: Record<'es' | 'en', Record<ProgramId, { name: string; href: string }>> = {
  es: {
    care: { name: 'Plan Mantenimiento Delegado', href: '/programas/mantenimiento-delegado' },
    navigation: { name: 'Plan Electrónica Asesorada', href: '/programas/electronica-asesorada' },
    ready: { name: 'Plan Limpieza y Detailing', href: '/programas/limpieza-detailing' },
    complete: { name: 'Listo para Zarpar', href: '/programas/listo-para-zarpar' },
  },
  en: {
    care: { name: 'Delegated Maintenance Plan', href: '/en/programas/mantenimiento-delegado' },
    navigation: { name: 'Expert-Guided Electronics Plan', href: '/en/programas/electronica-asesorada' },
    ready: { name: 'Cleaning & Detailing Plan', href: '/en/programas/limpieza-detailing' },
    complete: { name: 'Ready to Cast Off', href: '/en/programas/listo-para-zarpar' },
  },
}

describe('Home program catalog', () => {
  it('opens every commercial CTA in the shared program booking flow', async () => {
    const wrapper = await visit('/')

    for (const button of wrapper.findAll('.hero-buttons button, .contact-info-card button')) {
      booking.close()
      await button.trigger('click')
      expect(booking.isOpen.value).toBe(true)
      expect(booking.context.value).toEqual({ programId: null, length: 30 })
    }
  })

  it('prefills the selected Home schedule and still allows choosing a program afterwards', async () => {
    const wrapper = await visit('/')
    wrapper.getComponent(CalendarWidget).vm.$emit('select', {
      date: { day: 5, month: 9, year: 2026 },
      time: '10:00',
    })
    await flushPromises()

    expect(booking.context.value).toEqual({
      programId: null,
      length: 30,
      schedule: { date: '2026-10-05', time: '10:00' },
    })

    const modal = mount(ProgramBookingModal, {
      props: { today: new Date(2026, 9, 1) },
      global: { plugins: [router], stubs: { Teleport: true } },
    })
    mountedWrappers.push(modal)
    await modal.get('#booking-program').setValue('care')

    expect((modal.get('#booking-program').element as HTMLSelectElement).value).toBe('care')
    expect(modal.get('[data-date="2026-10-05"]').attributes('aria-pressed')).toBe('true')
    expect(modal.get('[data-time="10:00"]').attributes('aria-pressed')).toBe('true')
  })

  it.each([
    ['es', '/'],
    ['en', '/en'],
  ] as const)('renders the four canonical %s program cards from their matching typed sources', async (lang, path) => {
    const wrapper = await visit(path)
    const cards = wrapper.findAll('[data-home-program]')

    expect(cards.map((card) => card.attributes('data-program-id'))).toEqual([
      'care',
      'navigation',
      'ready',
      'complete',
    ])

    for (const [programId, expected] of Object.entries(expectedCards[lang]) as [ProgramId, { name: string; href: string }][]) {
      const card = wrapper.get(`[data-home-program][data-program-id="${programId}"]`)
      expect(card.get('h3').text()).toBe(expected.name)
      expect(card.get('a').attributes('href')).toBe(expected.href)
      expect(card.get('img').attributes('src')).toBe(programVisuals[programId].src)
    }

    expect(wrapper.text()).not.toMatch(/Soluciones a medida|Realce estético|Traslados/)
  })

  it('marks only the complete program to span the full second row', async () => {
    const wrapper = await visit('/')
    const cards = wrapper.findAll('[data-home-program]')
    const completeCard = wrapper.get('[data-home-program][data-program-id="complete"]')

    expect(completeCard.classes()).toContain('service-card--wide')
    expect(cards.filter((card) => card.classes().includes('service-card--wide'))).toHaveLength(1)
  })

  it.each([
    {
      path: '/' as const,
      hero: 'Programas anuales para cuidar tu barco durante todo el año',
      subtitle: 'Mantenimiento, electrónica y limpieza coordinados en Rías Baixas para que disfrutes de tu embarcación sin tareas pendientes.',
      sectionTitle: 'Cuatro programas. Una sola persona coordinándolo todo.',
      sectionSubtitle: 'Empieza con una revisión inicial gratuita y elige el programa anual que mejor encaja con tu barco.',
      contactSubtitle: 'Reserva una revisión inicial gratuita a bordo, con informe escrito y sin compromiso.',
      bookBtn: 'Solicitar revisión gratuita',
      metaTitle: 'Programas para cuidar tu barco',
      metaDescription: 'Programas anuales de mantenimiento, electrónica y limpieza para embarcaciones en Rías Baixas.',
    },
    {
      path: '/en' as const,
      hero: 'Annual plans to care for your boat all year round',
      subtitle: 'Maintenance, electronics and cleaning coordinated in Rías Baixas so you can enjoy your boat without a backlog of tasks.',
      sectionTitle: 'Four plans. One person coordinating everything.',
      sectionSubtitle: 'Start with a free initial inspection and choose the annual plan that best fits your boat.',
      contactSubtitle: 'Book a free initial inspection on board, including a written report and no obligation.',
      bookBtn: 'Request a free inspection',
      metaTitle: 'Boat care plans',
      metaDescription: 'Annual maintenance, electronics and cleaning plans for boats in Rías Baixas.',
    },
  ])('presents annual coordinated programs without legacy standalone offers at $path', async ({ path, hero, subtitle, sectionTitle, sectionSubtitle, contactSubtitle, bookBtn, metaTitle, metaDescription }) => {
    const wrapper = await visit(path)

    expect(wrapper.get('.hero-title').text()).toBe(hero)
    expect(wrapper.get('.hero-subtitle').text()).toBe(subtitle)
    expect(wrapper.get('#servicios .section-title').text()).toBe(sectionTitle)
    expect(wrapper.get('#servicios .section-subtitle').text()).toBe(sectionSubtitle)
    expect(wrapper.get('#contacto .section-subtitle').text()).toBe(contactSubtitle)
    expect(wrapper.get('#contacto .contact-info-card button').text()).toBe(bookBtn)
    expect(document.title).toContain(metaTitle)
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(metaDescription)

    const visibleCopy = wrapper.text()
    expect(visibleCopy).not.toMatch(/consultor[ií]a náutica|nautical consultation|transportes? por mar|transport by sea|trasladamos tu barco|deliver your boat/i)
  })
})
