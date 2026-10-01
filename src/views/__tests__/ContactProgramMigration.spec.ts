// @vitest-environment jsdom
import { createHead } from '@unhead/vue/client'
import { flushPromises, mount, type ComponentMountingOptions, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import CalendarWidget from '../../components/CalendarWidget.vue'
import { useProgramBooking } from '../../composables/useProgramBooking'
import router from '../../router'
import Contacto from '../Contacto.vue'
import Nosotros from '../Nosotros.vue'
import Proyectos from '../Proyectos.vue'

const booking = useProgramBooking()
const mountedWrappers: VueWrapper[] = []

beforeAll(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})

beforeEach(async () => {
  await router.push('/')
  await router.isReady()
  booking.close()
  document.head.innerHTML = ''
  document.body.innerHTML = ''
})

afterEach(() => {
  mountedWrappers.splice(0).forEach((wrapper) => wrapper.unmount())
})

type MigratedView = typeof Contacto | typeof Nosotros | typeof Proyectos

function mountView(component: MigratedView, options: ComponentMountingOptions<unknown> = {}) {
  const wrapper = mount(component, {
    ...options,
    global: {
      plugins: [router, createHead()],
      ...options.global,
    },
  })
  mountedWrappers.push(wrapper)
  return wrapper
}

describe('commercial program booking migration', () => {
  it.each([
    {
      path: '/',
      expected: 'Hablemos sobre tu barco. Solicita una revisión inicial gratuita a bordo o escríbenos a info@boat-solutions.es.',
    },
    {
      path: '/en',
      expected: 'Let’s talk about your yacht. Request a free initial on-board inspection or write to info@boat-solutions.es.',
    },
  ] as const)('uses the current inspection offer in Contact metadata at $path', async ({ path, expected }) => {
    await router.push(path)
    mountView(Contacto)
    await flushPromises()
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(expected)
  })

  it.each([
    {
      path: '/',
      text: 'Empieza con una revisión inicial gratuita a bordo, con informe escrito y sin compromiso.',
      button: 'Solicitar revisión gratuita',
    },
    {
      path: '/en',
      text: 'Start with a free initial on-board inspection, including a written report and no obligation.',
      button: 'Request a free inspection',
    },
  ] as const)('uses the current inspection offer in About copy at $path', async ({ path, text, button }) => {
    await router.push(path)
    const about = mountView(Nosotros)
    expect(about.get('.cta-box p').text()).toBe(text)
    expect(about.get('.cta-box button').text()).toBe(button)
  })

  it('describes the current free initial inspection instead of a free meeting', () => {
    const wrapper = mountView(Contacto)

    expect(wrapper.get('.contact-info-section h2').text()).toBe('Reserva tu revisión a bordo')
    expect(wrapper.get('.contact-info-section > p').text()).toBe('Selecciona una fecha y hora para tu revisión inicial gratuita.')
    expect(wrapper.get('.contact-info-section > .btn-outline').text()).toBe('Solicitar revisión gratuita')
  })

  it.each([
    ['Contact', Contacto, '.contact-info-section > .btn-outline'],
    ['Projects', Proyectos, '.btn-large'],
    ['About', Nosotros, '.btn-lg'],
  ] as const)('opens the shared program booking flow from the %s CTA', async (_name, component, selector) => {
    const wrapper = mountView(component)

    await wrapper.get(selector).trigger('click')

    expect(booking.isOpen.value).toBe(true)
    expect(booking.context.value).toEqual({ programId: null, length: 30 })
  })

  it('converts the Contact calendar selection to an ISO schedule', async () => {
    const wrapper = mountView(Contacto)

    wrapper.getComponent(CalendarWidget).vm.$emit('select', {
      date: { day: 7, month: 10, year: 2026 },
      time: '16:00',
    })
    await flushPromises()

    expect(booking.isOpen.value).toBe(true)
    expect(booking.context.value).toEqual({
      programId: null,
      length: 30,
      schedule: { date: '2026-11-07', time: '16:00' },
    })
  })

})
