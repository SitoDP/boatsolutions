// @vitest-environment jsdom
import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ProgramBookingModal from '../ProgramBookingModal.vue'
import ProgramBookingCalendar from '../ProgramBookingCalendar.vue'
import { useProgramBooking } from '../../composables/useProgramBooking'
import { useProgramSelection } from '../../composables/useProgramSelection'
import type { CalendarSelection } from '../../types/programBooking'

const booking = useProgramBooking()
const today = new Date(2026, 8, 29)

describe('program booking flow', () => {
  beforeEach(() => {
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

  it('enforces weekdays and the 90-day window while emitting ISO date and time', async () => {
    const wrapper = mount(ProgramBookingCalendar, {
      props: { modelValue: { date: '2026-09-30', time: '10:00' }, today },
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
      global: { stubs: { Teleport: true } },
    })

    expect(wrapper.get('.booking-overlay').classes()).toContain('programs-surface')
  })

  it('submits the approved program-booking payload with privacy consent', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 200 }))
    booking.open({ programId: 'navigation', length: 40 })
    const wrapper = mount(ProgramBookingModal, {
      props: { today },
      attachTo: document.body,
      global: { stubs: { Teleport: true } },
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
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
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
      privacyPolicyVersion: '2025-01',
      source: 'programas-preview',
    })
    expect(wrapper.get('[data-booking-success]').text()).toContain('Solicitud enviada')
  })
})
