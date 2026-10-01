// @vitest-environment jsdom
import { createHead } from '@unhead/vue/client'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import ProgramBookingModal from '../../components/ProgramBookingModal.vue'
import { useProgramBooking } from '../../composables/useProgramBooking'
import router from '../../router'

const RouteHost = defineComponent({
  components: { RouterView },
  template: '<RouterView />',
})

const mountedWrappers: VueWrapper[] = []

async function visit(path: string) {
  await router.push(path)
  await router.isReady()
  const wrapper = mount(RouteHost, {
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
  vi.restoreAllMocks()
  vi.stubEnv('VITE_SCRIPT_URL', 'https://script.google.com/macros/s/test/exec')
  document.head.innerHTML = ''
  document.body.innerHTML = ''
  useProgramBooking().close()
})

afterEach(() => {
  mountedWrappers.splice(0).forEach((wrapper) => wrapper.unmount())
})

const routes = [
  ['/servicios', '/en/servicios', 'Tú navegas.', 'You sail.', 'Programas para cuidar tu barco', 'Boat care plans', 'Programas anuales de mantenimiento, electrónica y limpieza para embarcaciones en Rías Baixas.', 'Annual maintenance, electronics and cleaning plans for boats in Rías Baixas.'],
  ['/programas/mantenimiento-delegado', '/en/programas/mantenimiento-delegado', 'Plan Mantenimiento Delegado', 'Delegated Maintenance Plan', 'Plan Mantenimiento Delegado', 'Delegated Maintenance Plan', 'Plan anual de coordinación, mantenimiento y seguimiento de proveedores para tu embarcación.', 'Annual coordination, maintenance and supplier follow-up for your boat.'],
  ['/programas/electronica-asesorada', '/en/programas/electronica-asesorada', 'Plan Electrónica Asesorada', 'Expert-Guided Electronics Plan', 'Plan Electrónica Asesorada', 'Expert-Guided Electronics Plan', 'Auditoría, prioridades y comprobación de los sistemas eléctricos y electrónicos de tu embarcación.', 'Audit, priorities and verification for your boat’s electrical and electronic systems.'],
  ['/programas/limpieza-detailing', '/en/programas/limpieza-detailing', 'Plan Limpieza y Detailing', 'Cleaning & Detailing Plan', 'Plan Limpieza y Detailing', 'Cleaning & Detailing Plan', 'Dos limpiezas completas al año con coordinación, supervisión y registro fotográfico.', 'Two full cleanings per year with coordination, supervision and a photographic record.'],
  ['/programas/listo-para-zarpar', '/en/programas/listo-para-zarpar', 'Listo para Zarpar', 'Ready to Cast Off', 'Listo para Zarpar', 'Ready to Cast Off', 'Mantenimiento, electrónica y limpieza coordinados por una sola persona durante todo el año.', 'Maintenance, electronics and cleaning coordinated by one person throughout the year.'],
  ['/bases-revision-gratuita', '/en/bases-revision-gratuita', 'Bases de la promoción', 'Promotion terms', 'Bases de la revisión gratuita', 'Free Boat Inspection Terms', 'Bases de la revisión gratuita de una hora a bordo ofrecida por Boat Solutions en Rías Baixas.', 'Terms of the free one-hour on-board inspection offered by Boat Solutions in Rías Baixas.'],
] as const

async function mountEnglishBookingModal(programId: 'care' | null = 'care') {
  await router.push('/en/servicios')
  await router.isReady()
  useProgramBooking().open({ programId, length: 35 })
  const wrapper = mount(ProgramBookingModal, {
    props: { today: new Date(2026, 8, 29) },
    global: { plugins: [router], stubs: { Teleport: true } },
  })
  mountedWrappers.push(wrapper)
  await flushPromises()
  return wrapper
}

describe('program localization routes', () => {
  it.each(routes)('visits %s and %s with localized headings and meta', async (
    esPath,
    enPath,
    esHeading,
    enHeading,
    esTitle,
    enTitle,
    esDescription,
    enDescription,
  ) => {
    const es = await visit(esPath)
    expect(es.get('h1').text()).toContain(esHeading)
    expect(document.title).toContain(esTitle)
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(esDescription)
    expect(document.head.querySelector('link[hreflang="x-default"]')?.getAttribute('href')).toContain(esPath)
    es.unmount()

    const en = await visit(enPath)
    expect(en.get('h1').text()).toContain(enHeading)
    expect(document.title).toContain(enTitle)
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(enDescription)
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toContain(enPath)
    expect(document.head.querySelector('link[hreflang="es"]')?.getAttribute('href')).toContain(esPath)
    expect(document.head.querySelector('link[hreflang="en"]')?.getAttribute('href')).toContain(enPath)
    expect(document.head.querySelector('link[hreflang="x-default"]')?.getAttribute('href')).toContain(esPath)
  })

  it('keeps English service links localized and formats hours, VAT and the deadline for en-GB', async () => {
    const wrapper = await visit('/en/servicios')
    const internalLinks = wrapper.findAll('a[href^="/"]')

    expect(internalLinks.length).toBeGreaterThan(0)
    expect(internalLinks.every((link) => (link.attributes('href') ?? '').startsWith('/en/'))).toBe(true)
    expect(wrapper.text()).toContain('VAT included')
    expect(wrapper.text()).toContain('31/10/2026')
    const comparisonRows = wrapper.findAll('.comparison-row:not(.comparison-header)')
    expect(comparisonRows).toHaveLength(5)
    for (const row of comparisonRows) {
      expect(row.findAll('[role="cell"]').map((cell) => cell.attributes('data-program-label'))).toEqual([
        'Delegated Maintenance Plan',
        'Expert-Guided Electronics Plan',
        'Cleaning & Detailing Plan',
        'Ready to Cast Off',
      ])
    }
    await wrapper.get('[data-length="35"]').trigger('click')
    expect(wrapper.get('[data-program="care"]').text()).toContain('2.5 h')
    expect(wrapper.text()).not.toMatch(/IVA incluido|Consultar las bases|Solicitar revisión|Elige cuánto|Garantía de servicio/)
  })

  it.each(routes.slice(1, 5))('has no Spanish residuals in English detail core copy for %s', async (_esPath, enPath) => {
    const wrapper = await visit(enPath)
    expect(wrapper.text()).toContain('VAT included')
    expect(wrapper.find('[data-legal-review]').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Wording pending legal review before publication.')
    expect(wrapper.text()).not.toMatch(/Todos los programas|Reserva tu cita|Cuota y condiciones|Derecho de desistimiento|Preguntas frecuentes|Programa anterior|Siguiente programa/)
    expect(wrapper.findAll('a[href^="/"]').every((link) => (link.attributes('href') ?? '').startsWith('/en/'))).toBe(true)
  })

  it('localizes the promotion privacy link and conditions', async () => {
    const wrapper = await visit('/en/bases-revision-gratuita')
    expect(wrapper.findAll('[data-promotion-condition]')).toHaveLength(7)
    expect(wrapper.text()).toContain('VAT included')
    expect(wrapper.text()).toContain('31/10/2026')
    expect(wrapper.find('[data-legal-review]').exists()).toBe(false)
    expect(wrapper.get('a').attributes('href')).toBe('/en/politica-de-privacidad')
    expect(wrapper.text()).not.toMatch(/Bases de la promoción|Condiciones de la revisión|Una revisión por propietario|Política de Privacidad/)
  })

  it('renders the booking modal entirely in English and preserves localized legal links', async () => {
    const wrapper = await mountEnglishBookingModal()

    expect(wrapper.get('#booking-title').text()).toBe('Book your on-board inspection')
    expect(wrapper.text()).toContain('VAT included')
    expect(wrapper.get('[data-promotion-terms]').attributes('href')).toBe('/en/bases-revision-gratuita')
    expect(wrapper.get('[data-promotion-terms]').attributes('target')).toBe('_blank')
    expect(wrapper.get('[data-promotion-terms]').attributes('rel')).toBe('noopener')
    expect(wrapper.get('.privacy-check a').attributes('href')).toBe('/en/politica-de-privacidad')
    expect(wrapper.text()).not.toMatch(/Reserva tu revisión|Selecciona un programa|Eslora|Teléfono|Comentarios opcionales|Solicitar revisión gratuita/)
  })

  it('localizes English calendar labels and preferred-time guidance', async () => {
    const wrapper = await mountEnglishBookingModal()

    expect(wrapper.get('.booking-calendar').attributes('aria-label')).toBe('Select your preferred date and time')
    expect(wrapper.get('[data-month="previous"]').attributes('aria-label')).toBe('Previous month')
    expect(wrapper.get('[data-month="next"]').attributes('aria-label')).toBe('Next month')
    expect(wrapper.get('[role="grid"]').attributes('aria-label')).toBe('Booking calendar')
    expect(wrapper.get('.calendar-heading h3').text()).toBe('September 2026')

    await wrapper.get('[data-date="2026-09-30"]').trigger('click')
    expect(wrapper.get('.time-selection h4').text()).toBe('Preferred time')
    expect(wrapper.get('.time-selection p').text()).toBe('Final availability will be confirmed with you.')
  })

  it('shows all required booking validation errors in English', async () => {
    const wrapper = await mountEnglishBookingModal(null)
    await wrapper.get('form').trigger('submit')

    expect(wrapper.text()).toContain('Select a plan')
    expect(wrapper.text()).toContain('Enter your full name')
    expect(wrapper.text()).toContain('Enter a valid email address')
    expect(wrapper.text()).toContain('Enter a valid phone number')
    expect(wrapper.text()).toContain('Select a date')
    expect(wrapper.text()).toContain('Select a preferred time')
    expect(wrapper.text()).toContain('You must accept the Privacy Policy')
    expect(wrapper.text()).not.toMatch(/Selecciona|Introduce|Debes aceptar/)
  })

  it('renders the submitted booking success state in English', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    ))
    const wrapper = await mountEnglishBookingModal()

    await wrapper.get('#booking-name').setValue('Alex Morgan')
    await wrapper.get('#booking-email').setValue('alex@example.com')
    await wrapper.get('#booking-phone').setValue('+44 7700 900123')
    await wrapper.get('[data-date="2026-09-30"]').trigger('click')
    await wrapper.get('[data-time="10:00"]').trigger('click')
    await wrapper.get('#booking-privacy').setValue(true)
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    const success = wrapper.get('[data-booking-success]')
    expect(success.text()).toContain('Request sent')
    expect(success.text()).toContain('We have sent your on-board inspection request.')
    expect(success.text()).toContain('Delegated Maintenance Plan')
    expect(success.text()).toContain('Up to 35 feet')
    expect(success.text()).not.toMatch(/Solicitud enviada|Programa|Eslora|Fecha|Hora preferida/)
  })

  it.each([
    ['/politica-de-privacidad', 'Gestionar la solicitud de reserva y las comunicaciones precontractuales', 'artículo 6.1.b) del RGPD', 'El consentimiento se utilizará únicamente cuando resulte aplicable', ['programa y la franja de eslora', 'fecha y hora preferidas', 'nombre', 'correo electrónico', 'teléfono', 'tipo de embarcación', 'comentarios opcionales', 'marca temporal del consentimiento'], 'Vigo, Pontevedra, España'],
    ['/en/politica-de-privacidad', 'Handle the booking request and pre-contractual communications', 'Article 6(1)(b) GDPR', 'Consent is relied on only where applicable', ['selected program and boat-length band', 'preferred date and time', 'name', 'email address', 'phone number', 'boat type', 'optional comments', 'privacy-consent timestamp'], 'Vigo, Pontevedra, Spain'],
  ] as const)('covers program booking processing at %s', async (path, purpose, legalBasis, consentBasis, fields, location) => {
    const wrapper = await visit(path)
    expect(wrapper.text()).toContain(purpose)
    expect(wrapper.text()).toContain(legalBasis)
    expect(wrapper.text()).toContain(consentBasis)
    expect(wrapper.text()).toMatch(/programa|program/i)
    expect(wrapper.text()).toMatch(/fecha y hora|date and time/i)
    expect(wrapper.text()).toMatch(/marca temporal|timestamp/i)
    expect(wrapper.text()).toMatch(/Google/i)
    expect(wrapper.text()).toMatch(/conservar|retain/i)
    expect(wrapper.text()).toContain('info@boat-solutions.es')
    for (const field of fields) expect(wrapper.text()).toContain(field)
    expect(wrapper.text()).toContain(location)
    if (path.startsWith('/en')) expect(wrapper.text()).not.toContain('España')
  })

  it.each([
    '/en/servicios',
    '/en/programas/mantenimiento-delegado',
    '/en/programas/electronica-asesorada',
    '/en/programas/limpieza-detailing',
    '/en/programas/listo-para-zarpar',
    '/en/bases-revision-gratuita',
    '/en/politica-de-privacidad',
    '/en/terminos-y-condiciones',
  ])('contains no residual Spanish in English program/legal route %s', async (path) => {
    const wrapper = await visit(path)
    expect(wrapper.text()).not.toMatch(/España|[¿¡]|IVA incluido|Todos los programas|Reserva tu|Cuota y condiciones|Eslora|Teléfono|Comentarios opcionales|Derecho de desistimiento|Política de Privacidad|Programa anterior|Siguiente programa|Selecciona una/)
  })
})
