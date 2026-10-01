// @vitest-environment jsdom
import { mount } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { createHead } from '@unhead/vue/client'
import { useProgramBooking } from '../../composables/useProgramBooking'
import { useProgramSelection } from '../../composables/useProgramSelection'
import BasesRevisionGratuita from '../BasesRevisionGratuita.vue'
import ProgramaDetalle from '../ProgramaDetalle.vue'
import Servicios from '../Servicios.vue'
import router from '../../router'

const RouterLinkStub = defineComponent({
  props: { to: { type: String, required: true } },
  template: '<a :href="to"><slot /></a>',
})

beforeAll(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})

describe('production program views', () => {
  beforeEach(async () => {
    await router.push('/')
    await router.isReady()
    useProgramBooking().close()
    useProgramSelection().selectedLength.value = 30
  })

  it('shows four VAT-inclusive programs and updates quota immediately above the selector', async () => {
    const wrapper = mount(Servicios, { global: { plugins: [router, createHead()], stubs: { RouterLink: RouterLinkStub } } })
    const cards = wrapper.findAll('[data-program]')

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('programs-surface')
    expect(cards.map((card) => card.attributes('data-price'))).toEqual(['215', '130', '85', '360'])
    expect(cards.every((card) => card.text().includes('IVA incluido'))).toBe(true)
    await wrapper.get('[data-length="50"]').trigger('click')
    expect(wrapper.findAll('[data-program]').map((card) => card.attributes('data-price'))).toEqual(['355', '215', '145', '600'])
    expect(wrapper.get('[data-program="complete"]').text()).toContain('Ahorras 115 €/mes')
  })

  it('opens a card booking with the current program and length', async () => {
    const wrapper = mount(Servicios, { global: { plugins: [router, createHead()], stubs: { RouterLink: RouterLinkStub } } })
    await wrapper.get('[data-length="45"]').trigger('click')
    await wrapper.get('[data-booking-cta="card-ready"]').trigger('click')
    expect(useProgramBooking().context.value).toEqual({ programId: 'ready', length: 45 })
  })

  it('keeps the final CTA copy and button without repeating contact details', () => {
    const wrapper = mount(Servicios, { global: { plugins: [router, createHead()], stubs: { RouterLink: RouterLinkStub } } })
    const finalCta = wrapper.get('#contacto')

    expect(finalCta.get('.section-kicker').text()).toBe('Revisión inicial gratuita · una hora')
    expect(finalCta.get('h2').text()).toBe('Empieza por conocer el estado real de tu embarcación.')
    expect(finalCta.get('p:not(.section-kicker)').text()).toBe('Elige una fecha y una hora preferidas. Boat Solutions confirmará personalmente la disponibilidad.')
    expect(finalCta.get('[data-booking-cta="services-final"]').text()).toBe('Solicitar revisión gratuita')
    expect(finalCta.text()).not.toContain('boat-solutions.es')
    expect(finalCta.text()).not.toContain('676 625 595')
    expect(finalCta.text()).not.toContain('info@boat-solutions.es')
  })

  it('renders detail terms with the length selector directly below the quota', () => {
    const wrapper = mount(ProgramaDetalle, {
      props: { programId: 'care' },
      global: { plugins: [router, createHead()], stubs: { RouterLink: RouterLinkStub } },
    })
    const conditions = wrapper.get('[data-detail-conditions]')
    const price = conditions.get('.program-conditions-price').element
    const selector = conditions.get('.length-selector').element

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('programs-surface')
    expect(price.compareDocumentPosition(selector) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(conditions.text()).toContain('IVA incluido')
    expect(conditions.text()).toContain('14 días naturales')
    expect(conditions.find('[data-legal-review]').exists()).toBe(false)
  })

  it('publishes all seven free-inspection conditions and the privacy policy', () => {
    const wrapper = mount(BasesRevisionGratuita, { global: { plugins: [router, createHead()] } })
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('programs-surface')
    expect(wrapper.findAll('[data-promotion-condition]')).toHaveLength(7)
    expect(wrapper.text()).toContain('120 €')
    expect(wrapper.text()).toContain('IVA incluido')
    expect(wrapper.text()).toContain('31/10/2026')
    expect(wrapper.find('[data-legal-review]').exists()).toBe(false)
    expect(wrapper.get('a').attributes('href')).toBe('/politica-de-privacidad')
  })
})
