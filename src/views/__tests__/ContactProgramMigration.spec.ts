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
import YachtConsulting from '../YachtConsulting.vue'
import YachtDetailing from '../YachtDetailing.vue'
import YachtManagement from '../YachtManagement.vue'

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

type MigratedView = typeof Contacto | typeof Nosotros | typeof Proyectos | typeof YachtConsulting | typeof YachtDetailing | typeof YachtManagement

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

  it.each([
    ['Management', YachtManagement],
    ['Consulting', YachtConsulting],
  ] as const)('opens the shared flow from all legacy %s booking CTAs', async (_name, component) => {
    const wrapper = mountView(component)
    const buttons = wrapper.findAll('.hero button.btn-primary, .booking-info > button.btn-primary')
    expect(buttons).toHaveLength(2)

    for (const button of buttons) {
      booking.close()
      await button.trigger('click')
      expect(booking.isOpen.value).toBe(true)
      expect(booking.context.value).toEqual({ programId: null, length: 30 })
    }
  })

  it.each([
    ['Management', YachtManagement],
    ['Detailing', YachtDetailing],
    ['Consulting', YachtConsulting],
  ] as const)('converts the legacy %s calendar to the shared ISO schedule', async (_name, component) => {
    const wrapper = mountView(component)

    wrapper.getComponent(CalendarWidget).vm.$emit('select', {
      date: { day: 9, month: 11, year: 2026 },
      time: '14:00',
    })
    await flushPromises()

    expect(booking.context.value).toEqual({
      programId: null,
      length: 30,
      schedule: { date: '2026-12-09', time: '14:00' },
    })
  })
})
