// @vitest-environment jsdom
import { flushPromises, mount } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import ProgramBookingModal from '../ProgramBookingModal.vue'
import ProgramBookingCalendar from '../ProgramBookingCalendar.vue'
import { useProgramBooking } from '../../composables/useProgramBooking'
import { useProgramSelection } from '../../composables/useProgramSelection'
import type { CalendarSelection } from '../../types/programBooking'
import router from '../../router'

const booking = useProgramBooking()
const today = new Date(2026, 8, 29)

beforeAll(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})

describe('program booking flow', () => {
  beforeEach(async () => {
    await router.push('/')
    await router.isReady()
    booking.close()
    useProgramSelection().selectedLength.value = 30
    document.body.innerHTML = ''
    vi.restoreAllMocks()
    vi.stubEnv('VITE_SCRIPT_URL', 'https://script.google.com/macros/s/test/exec')
  })

  it('shares the selected length and preselected booking context', () => {
    useProgramSelection().selectedLength.value = 45
    booking.open({ programId: 'navigation', length: 40 })

    expect(useProgramSelection().selectedLength.value).toBe(45)
    expect(booking.context.value).toEqual({ programId: 'navigation', length: 40 })
    expect(booking.isOpen.value).toBe(true)
  })

  it('prefills the calendar while leaving the program selectable', () => {
    booking.open({
      programId: null,
      length: 30,
      schedule: { date: '2026-10-05', time: '10:00' },
    })
    const wrapper = mount(ProgramBookingModal, {
      props: { today },
      global: { plugins: [router], stubs: { Teleport: true } },
    })

    expect(wrapper.get('[data-date="2026-10-05"]').attributes('aria-pressed')).toBe('true')
    expect(wrapper.get('[data-time="10:00"]').attributes('aria-pressed')).toBe('true')
    expect((wrapper.get('#booking-program').element as HTMLSelectElement).value).toBe('')
  })

  it('enforces weekdays and the 90-day window while emitting ISO date and time', async () => {
    const wrapper = mount(ProgramBookingCalendar, {
      props: { modelValue: { date: '2026-09-30', time: '10:00' }, today },
      global: { plugins: [router] },
    })

    expect(wrapper.get('[data-date="2026-09-28"]').attributes('disabled')).toBeDefined()
    expect(wrapper.get('[data-date="2026-10-03"]').attributes('disabled')).toBeDefined()
    await wrapper.get('[data-date="2026-10-01"]').trigger('click')
    const dateEvents = wrapper.emitted('update:modelValue') ?? []
    const selectedDate = dateEvents[dateEvents.length - 1]?.[0] as CalendarSelection
    expect(selectedDate).toEqual({ date: '2026-10-01', time: null })

    await wrapper.setProps({ modelValue: selectedDate })
    await wrapper.get('[data-time="17:00"]').trigger('click')
    const timeEvents = wrapper.emitted('update:modelValue') ?? []
    expect(timeEvents[timeEvents.length - 1]).toEqual([{ date: '2026-10-01', time: '17:00' }])
  })

  it('mounts the teleported modal inside the isolated programs surface', () => {
    booking.open({ programId: 'care', length: 30 })
    const wrapper = mount(ProgramBookingModal, {
      props: { today },
      global: { plugins: [router], stubs: { Teleport: true } },
    })

    expect(wrapper.get('.booking-overlay').classes()).toContain('programs-surface')
  })

  it('stacks the booking dialog above the fixed header and floating actions', () => {
    const modalSource = fs.readFileSync(path.resolve(process.cwd(), 'src/components/ProgramBookingModal.vue'), 'utf8')
    const headerSource = fs.readFileSync(path.resolve(process.cwd(), 'src/components/Header.vue'), 'utf8')
    const whatsappSource = fs.readFileSync(path.resolve(process.cwd(), 'src/components/WhatsAppButton.vue'), 'utf8')
    const modalLayer = Number(modalSource.match(/\.booking-overlay\s*\{[^}]*z-index:\s*(\d+)/s)?.[1])
    const headerLayer = Number(headerSource.match(/\.header\s*\{[^}]*z-index:\s*(\d+)/s)?.[1])
    const whatsappLayer = Number(whatsappSource.match(/\.whatsapp-btn\s*\{[^}]*z-index:\s*(\d+)/s)?.[1])

    expect(modalLayer).toBeGreaterThan(headerLayer)
    expect(modalLayer).toBeGreaterThan(whatsappLayer)
  })

  it('keeps the close control fixed while the mobile dialog scrolls', () => {
    const modalSource = fs.readFileSync(path.resolve(process.cwd(), 'src/components/ProgramBookingModal.vue'), 'utf8')
    const mobileStyles = modalSource.match(/@media \(max-width: 820px\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''

    expect(mobileStyles).toMatch(/\.booking-close\s*\{[^}]*position:\s*fixed/s)
    expect(mobileStyles).toMatch(/\.booking-close\s*\{[^}]*z-index:\s*3001/s)
  })

  it('opens promotion terms in a new tab without clearing the booking draft', async () => {
    booking.open({ programId: 'navigation', length: 40 })
    const wrapper = mount(ProgramBookingModal, {
      props: { today },
      attachTo: document.body,
      global: { plugins: [router], stubs: { Teleport: true } },
    })

    await wrapper.get('#booking-name').setValue('Ana García')
    await wrapper.get('#booking-email').setValue('ana@example.com')
    await wrapper.get('#booking-phone').setValue('+34 600 123 123')
    await wrapper.findAll('.booking-form-column select')[2].setValue('velero')
    await wrapper.get('.booking-form-column textarea').setValue('Revisar la jarcia antes de salir')
    await wrapper.get('[data-date="2026-09-30"]').trigger('click')
    await wrapper.get('[data-time="10:00"]').trigger('click')

    const terms = wrapper.get('[data-promotion-terms]')
    expect(terms.attributes('target')).toBe('_blank')
    expect(terms.attributes('rel')).toBe('noopener')
    await terms.trigger('click')

    expect(booking.isOpen.value).toBe(true)
    expect(booking.context.value).toEqual({ programId: 'navigation', length: 40 })
    expect((wrapper.get('#booking-program').element as HTMLSelectElement).value).toBe('navigation')
    expect((wrapper.get('#booking-length').element as HTMLSelectElement).value).toBe('40')
    expect(wrapper.get('[data-date="2026-09-30"]').attributes('aria-pressed')).toBe('true')
    expect(wrapper.get('[data-time="10:00"]').attributes('aria-pressed')).toBe('true')
    expect((wrapper.get('#booking-name').element as HTMLInputElement).value).toBe('Ana García')
    expect((wrapper.get('#booking-email').element as HTMLInputElement).value).toBe('ana@example.com')
    expect((wrapper.get('#booking-phone').element as HTMLInputElement).value).toBe('+34 600 123 123')
    expect((wrapper.findAll('.booking-form-column select')[2].element as HTMLSelectElement).value).toBe('velero')
    expect((wrapper.get('.booking-form-column textarea').element as HTMLTextAreaElement).value).toBe('Revisar la jarcia antes de salir')
  })

  it('submits the approved program-booking payload with privacy consent', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    ))
    booking.open({ programId: 'navigation', length: 40 })
    const wrapper = mount(ProgramBookingModal, {
      props: { today },
      attachTo: document.body,
      global: { plugins: [router], stubs: { Teleport: true } },
    })

    await wrapper.get('#booking-name').setValue('Ana García')
    await wrapper.get('#booking-email').setValue('ana@example.com')
    await wrapper.get('#booking-phone').setValue('+34 600 123 123')
    await wrapper.get('[data-date="2026-09-30"]').trigger('click')
    await wrapper.get('[data-time="10:00"]').trigger('click')
    await wrapper.get('#booking-privacy').setValue(true)
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    const [url, request] = fetchSpy.mock.calls[0]
    expect(url).toBe('https://script.google.com/macros/s/test/exec')
    expect(request).toEqual(expect.objectContaining({
      method: 'POST',
      redirect: 'follow',
    }))
    expect(JSON.parse(String(request?.body))).toMatchObject({
      type: 'program-booking',
      language: 'es',
      programId: 'navigation',
      programName: 'Plan Electrónica Asesorada',
      length: 40,
      monthlyPrice: 170,
      priceIncludesVat: true,
      date: '2026-09-30',
      time: '10:00',
      privacyAccepted: true,
      privacyPolicyVersion: '2026-10',
      source: 'boat-solutions.es',
    })
    expect(wrapper.get('[data-booking-success]').text()).toContain('Solicitud enviada')
  })

  it('does not show success when Apps Script rejects the booking', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(
      JSON.stringify({ ok: false, error: 'invalid program booking' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    ))
    booking.open({ programId: 'navigation', length: 40 })
    const wrapper = mount(ProgramBookingModal, {
      props: { today },
      attachTo: document.body,
      global: { plugins: [router], stubs: { Teleport: true } },
    })

    await wrapper.get('#booking-name').setValue('Ana García')
    await wrapper.get('#booking-email').setValue('ana@example.com')
    await wrapper.get('#booking-phone').setValue('+34 600 123 123')
    await wrapper.get('[data-date="2026-09-30"]').trigger('click')
    await wrapper.get('[data-time="10:00"]').trigger('click')
    await wrapper.get('#booking-privacy').setValue(true)
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(wrapper.find('[data-booking-success]').exists()).toBe(false)
    expect(wrapper.get('[data-submit-error]').text()).toContain('No hemos podido enviar')
  })

  it('does not show success for a malformed Apps Script response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(
      '<html>unexpected response</html>',
      { status: 200, headers: { 'Content-Type': 'text/html' } },
    ))
    booking.open({ programId: 'navigation', length: 40 })
    const wrapper = mount(ProgramBookingModal, {
      props: { today },
      attachTo: document.body,
      global: { plugins: [router], stubs: { Teleport: true } },
    })

    await wrapper.get('#booking-name').setValue('Ana García')
    await wrapper.get('#booking-email').setValue('ana@example.com')
    await wrapper.get('#booking-phone').setValue('+34 600 123 123')
    await wrapper.get('[data-date="2026-09-30"]').trigger('click')
    await wrapper.get('[data-time="10:00"]').trigger('click')
    await wrapper.get('#booking-privacy').setValue(true)
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(wrapper.find('[data-booking-success]').exists()).toBe(false)
    expect(wrapper.get('[data-submit-error]').text()).toContain('No hemos podido enviar')
  })

  it.each([
    ['an HTTP error', () => Promise.resolve(new Response(JSON.stringify({ ok: false }), { status: 500 }))],
    ['a network error', () => Promise.reject(new TypeError('offline'))],
  ])('does not show success after %s', async (_label, responseFactory) => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(responseFactory)
    booking.open({ programId: 'navigation', length: 40 })
    const wrapper = mount(ProgramBookingModal, {
      props: { today },
      attachTo: document.body,
      global: { plugins: [router], stubs: { Teleport: true } },
    })

    await wrapper.get('#booking-name').setValue('Ana García')
    await wrapper.get('#booking-email').setValue('ana@example.com')
    await wrapper.get('#booking-phone').setValue('+34 600 123 123')
    await wrapper.get('[data-date="2026-09-30"]').trigger('click')
    await wrapper.get('[data-time="10:00"]').trigger('click')
    await wrapper.get('#booking-privacy').setValue(true)
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(wrapper.find('[data-booking-success]').exists()).toBe(false)
    expect(wrapper.get('[data-submit-error]').text()).toContain('No hemos podido enviar')
  })
})
