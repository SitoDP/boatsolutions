<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import ProgramBookingCalendar from './ProgramBookingCalendar.vue'
import { lengths, programs, type BoatLength, type ProgramId } from '../data/programs'
import { freeInspectionPromotion } from '../data/programPromotion'
import { useProgramBooking } from '../composables/useProgramBooking'
import { useLanguage } from '../composables/useLanguage'
import { isBookableDate, parseIsoDate } from '../lib/programBookingCalendar'
import { optionalEnv } from '../lib/env'
import type { BookingFormData, CalendarSelection } from '../types/programBooking'
import '../styles/programs.css'

const props = defineProps<{ today?: Date }>()
const emit = defineEmits<{ submitted: [payload: BookingFormData] }>()
const booking = useProgramBooking()
const { lang, to, useT } = useLanguage()
const t = useT('programBooking')
const programsT = useT('programs')

const dialog = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
const successPanel = ref<HTMLElement | null>(null)
const success = ref(false)
const isSubmitting = ref(false)
const submitError = ref('')
const submittedData = ref<BookingFormData | null>(null)
const schedule = ref<CalendarSelection>({ date: null, time: null })
const form = reactive({
  programId: '' as ProgramId | '',
  length: 30 as BoatLength,
  name: '',
  email: '',
  phone: '',
  boatType: '',
  comments: '',
  privacyAccepted: false,
})
const errors = reactive<Record<string, string>>({})
let previousFocus: HTMLElement | null = null
let previousOverflow = ''

const selectedProgramName = computed(() => submittedData.value?.programId
  ? programsT.value.programs[submittedData.value.programId].name
  : '')
const promotionDuration = computed(() => freeInspectionPromotion.durationHours === 1
  ? t.value.durationOne
  : t.value.durationMany.replace('{durationHours}', String(freeInspectionPromotion.durationHours)))

function text(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce((result, [key, value]) => result.split(`{${key}}`).join(String(value)), template)
}

function formatLocalizedBookingDate(value: string) {
  return new Intl.DateTimeFormat(lang.value === 'en' ? 'en-GB' : 'es-ES', {
    day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))
}

function resetForm() {
  form.programId = booking.context.value.programId ?? ''
  form.length = booking.context.value.length
  form.name = ''
  form.email = ''
  form.phone = ''
  form.boatType = ''
  form.comments = ''
  form.privacyAccepted = false
  schedule.value = { date: null, time: null }
  submittedData.value = null
  success.value = false
  isSubmitting.value = false
  submitError.value = ''
  Object.keys(errors).forEach((key) => delete errors[key])
}

watch(booking.isOpen, async (opened) => {
  if (opened) {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    resetForm()
    await nextTick()
    closeButton.value?.focus()
  } else {
    document.body.style.overflow = previousOverflow
    await nextTick()
    previousFocus?.focus()
  }
}, { immediate: true })

watch(() => schedule.value.date, (date) => {
  if (date) clearError('date')
})

watch(() => schedule.value.time, (time) => {
  if (time) clearError('time')
})

function close() {
  booking.close()
}

function clearError(field: string) {
  delete errors[field]
}

function validate(): boolean {
  Object.keys(errors).forEach((key) => delete errors[key])
  if (!form.programId) errors.programId = t.value.errors.programId
  if (form.name.trim().length < 2) errors.name = t.value.errors.name
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errors.email = t.value.errors.email
  if (!/^\+?[\d\s().-]{7,}$/.test(form.phone.trim())) errors.phone = t.value.errors.phone
  if (!schedule.value.date) {
    errors.date = t.value.errors.date
  } else {
    const date = parseIsoDate(schedule.value.date)
    if (!date || !isBookableDate(date, props.today ?? new Date())) errors.date = t.value.errors.dateUnavailable
  }
  if (!schedule.value.time) errors.time = t.value.errors.time
  if (!form.privacyAccepted) errors.privacy = t.value.errors.privacy
  return Object.keys(errors).length === 0
}

async function submit() {
  if (isSubmitting.value) return
  if (!validate() || !form.programId || !schedule.value.date || !schedule.value.time) return

  const payload: BookingFormData = {
    programId: form.programId,
    length: form.length,
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    boatType: form.boatType,
    date: schedule.value.date,
    time: schedule.value.time,
    comments: form.comments.trim(),
    privacyAccepted: true,
  }
  const program = programs.find((item) => item.id === payload.programId)
  const endpoint = optionalEnv('VITE_SCRIPT_URL')

  if (!program || !endpoint) {
    submitError.value = t.value.errors.notConfigured
    return
  }

  isSubmitting.value = true
  submitError.value = ''
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      redirect: 'follow',
      signal: controller.signal,
      body: JSON.stringify({
        type: 'program-booking',
        language: lang.value,
        programId: payload.programId,
        programName: programsT.value.programs[program.id].name,
        length: payload.length,
        monthlyPrice: program.prices[payload.length],
        priceIncludesVat: true,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        boatType: payload.boatType,
        date: payload.date,
        time: payload.time,
        comments: payload.comments,
        privacyAccepted: true,
        privacyPolicyVersion: '2026-10',
        consentedAt: new Date().toISOString(),
        source: 'boat-solutions.es',
      }),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const result = await response.json() as { ok?: boolean; error?: string }
    if (result.ok !== true) throw new Error(result.error || 'unknown')
    submittedData.value = payload
    success.value = true
    emit('submitted', payload)
    await nextTick()
    successPanel.value?.focus()
  } catch {
    submitError.value = t.value.errors.submit
  } finally {
    window.clearTimeout(timeout)
    isSubmitting.value = false
  }
}

function onKeydown(event: KeyboardEvent) {
  if (!booking.isOpen.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }
  if (event.key !== 'Tab' || !dialog.value) return

  const focusable = Array.from(dialog.value.querySelectorAll<HTMLElement>(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )).filter((element) => element.offsetParent !== null || element === document.activeElement)
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = previousOverflow
})
</script>

<template>
  <Teleport to="body">
    <div v-if="booking.isOpen.value" class="programs-surface booking-overlay" @click.self="close">
      <section
        ref="dialog"
        class="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <button ref="closeButton" type="button" class="booking-close" :aria-label="t.closeAria" @click="close">×</button>

        <header class="booking-modal-header">
          <p class="section-kicker">{{ text(t.kicker, { duration: promotionDuration }) }}</p>
          <h2 id="booking-title">{{ t.title }}</h2>
          <p data-promotion-summary>
            {{ text(t.promotionSummary, { duration: promotionDuration, reportValue: freeInspectionPromotion.reportValue }) }}
            <a data-promotion-terms :href="to('/bases-revision-gratuita')">{{ t.promotionTerms }}</a>.
          </p>
          <p>{{ t.preferenceIntro }}</p>
          <span class="demo-notice">{{ t.connectedNotice }}</span>
        </header>

        <div
          v-if="success && submittedData"
          ref="successPanel"
          class="booking-success"
          data-booking-success
          role="status"
          aria-live="polite"
          tabindex="-1"
        >
          <span class="success-mark" aria-hidden="true">✓</span>
          <p class="section-kicker">{{ t.success.kicker }}</p>
          <h3>{{ t.success.title }}</h3>
          <dl>
            <div><dt>{{ t.success.program }}</dt><dd>{{ selectedProgramName }}</dd></div>
            <div><dt>{{ t.success.length }}</dt><dd>{{ text(programsT.lengthSelector.upTo, { length: submittedData.length }) }} {{ programsT.lengthSelector.feet }}</dd></div>
            <div><dt>{{ t.success.date }}</dt><dd>{{ formatLocalizedBookingDate(submittedData.date) }}</dd></div>
            <div><dt>{{ t.success.time }}</dt><dd>{{ submittedData.time }}</dd></div>
          </dl>
          <p>{{ t.success.body }}</p>
          <button type="button" class="button button-primary" @click="close">{{ t.success.close }}</button>
        </div>

        <form v-else class="booking-layout" novalidate @submit.prevent="submit">
          <div class="booking-calendar-column" :aria-describedby="errors.date || errors.time ? 'booking-schedule-error' : undefined">
            <ProgramBookingCalendar v-model="schedule" :today="today" />
            <div id="booking-schedule-error">
              <p v-if="errors.date" class="field-error" role="alert">{{ errors.date }}</p>
              <p v-if="errors.time" class="field-error" role="alert">{{ errors.time }}</p>
            </div>
          </div>

          <div class="booking-form-column">
            <div class="booking-field-row">
              <label class="booking-field">
                <span>{{ t.fields.program }}</span>
                <select id="booking-program" v-model="form.programId" :aria-invalid="Boolean(errors.programId)" :aria-describedby="errors.programId ? 'booking-program-error' : undefined" @change="clearError('programId')">
                  <option value="">{{ t.fields.selectProgram }}</option>
                  <option v-for="program in programs" :key="program.id" :value="program.id">{{ programsT.programs[program.id].name }}</option>
                </select>
                <small v-if="errors.programId" id="booking-program-error" class="field-error" role="alert">{{ errors.programId }}</small>
              </label>
              <label class="booking-field">
                <span>{{ t.fields.length }}</span>
                <select id="booking-length" v-model.number="form.length">
                  <option v-for="length in lengths" :key="length" :value="length">{{ text(programsT.lengthSelector.upTo, { length }) }} {{ programsT.lengthSelector.feet }}</option>
                </select>
              </label>
            </div>

            <label class="booking-field">
              <span>{{ t.fields.fullName }}</span>
              <input id="booking-name" v-model="form.name" type="text" autocomplete="name" :aria-invalid="Boolean(errors.name)" :aria-describedby="errors.name ? 'booking-name-error' : undefined" @input="clearError('name')" />
              <small v-if="errors.name" id="booking-name-error" class="field-error" role="alert">{{ errors.name }}</small>
            </label>

            <div class="booking-field-row">
              <label class="booking-field">
                <span>{{ t.fields.email }}</span>
                <input id="booking-email" v-model="form.email" type="email" autocomplete="email" :aria-invalid="Boolean(errors.email)" :aria-describedby="errors.email ? 'booking-email-error' : undefined" @input="clearError('email')" />
                <small v-if="errors.email" id="booking-email-error" class="field-error" role="alert">{{ errors.email }}</small>
              </label>
              <label class="booking-field">
                <span>{{ t.fields.phone }}</span>
                <input id="booking-phone" v-model="form.phone" type="tel" autocomplete="tel" :aria-invalid="Boolean(errors.phone)" :aria-describedby="errors.phone ? 'booking-phone-error' : undefined" @input="clearError('phone')" />
                <small v-if="errors.phone" id="booking-phone-error" class="field-error" role="alert">{{ errors.phone }}</small>
              </label>
            </div>

            <label class="booking-field">
              <span>{{ t.fields.boatType }}</span>
              <select v-model="form.boatType">
                <option value="">{{ t.fields.selectOption }}</option>
                <option value="velero">{{ t.fields.sailboat }}</option>
                <option value="yate">{{ t.fields.yacht }}</option>
                <option value="lancha">{{ t.fields.motorboat }}</option>
                <option value="catamaran">{{ t.fields.catamaran }}</option>
                <option value="otro">{{ t.fields.other }}</option>
              </select>
            </label>

            <label class="booking-field">
              <span>{{ t.fields.comments }}</span>
              <textarea v-model="form.comments" rows="3" :placeholder="t.fields.commentsPlaceholder"></textarea>
            </label>

            <label class="privacy-check">
              <input id="booking-privacy" v-model="form.privacyAccepted" type="checkbox" :aria-describedby="errors.privacy ? 'booking-privacy-error' : undefined" @change="clearError('privacy')" />
              <span>{{ t.fields.privacyPrefix }} <a :href="to('/politica-de-privacidad')" target="_blank" rel="noopener">{{ t.fields.privacyLink }}</a>.</span>
            </label>
            <small v-if="errors.privacy" id="booking-privacy-error" class="field-error" role="alert">{{ errors.privacy }}</small>

            <p v-if="submitError" data-submit-error class="submit-error" role="alert">{{ submitError }}</p>
            <button type="submit" class="button booking-submit" :disabled="isSubmitting">
              {{ isSubmitting ? t.submitting : t.submit }}
            </button>
          </div>
        </form>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.booking-overlay { position: fixed; z-index: 100; inset: 0; display: grid; place-items: center; padding: 24px; background: rgba(8, 18, 26, .78); backdrop-filter: blur(8px); }
.booking-modal { position: relative; width: min(1120px, 100%); max-height: calc(100vh - 48px); overflow-y: auto; background: var(--foam); box-shadow: 0 32px 90px rgba(0,0,0,.35); }
.booking-close { position: absolute; z-index: 2; top: 18px; right: 20px; width: 44px; height: 44px; border: 1px solid rgba(255,255,255,.35); background: transparent; color: var(--white); font-size: 1.8rem; cursor: pointer; }
.booking-modal-header { padding: 38px clamp(28px, 5vw, 60px) 32px; background: var(--ocean-deep); color: var(--white); }
.booking-modal-header h2 { max-width: 760px; margin: 0; font: 700 clamp(2rem, 4vw, 3.5rem)/1.08 'Merriweather', serif; }
.booking-modal-header > p:not(.section-kicker) { margin: 14px 0; color: #d8e2e8; line-height: 1.6; }
.demo-notice { display: inline-block; padding: 7px 10px; border: 1px solid rgba(255,255,255,.3); color: var(--sea-glass); font-size: .7rem; }
.booking-layout { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr); }
.booking-calendar-column, .booking-form-column { padding: clamp(26px, 4vw, 48px); }
.booking-calendar-column { border-right: 1px solid var(--line); background: var(--white); }
.booking-form-column { display: grid; align-content: start; gap: 17px; }
.booking-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.booking-field { display: grid; gap: 7px; color: var(--ocean-deep); font: 600 .72rem 'Montserrat', sans-serif; }
.booking-field input, .booking-field select, .booking-field textarea { width: 100%; min-height: 46px; padding: 11px 12px; border: 1px solid var(--line); border-radius: 0; background: var(--white); color: var(--ink); font: 400 .9rem 'Inter', sans-serif; }
.booking-field textarea { min-height: 86px; resize: vertical; }
.booking-field [aria-invalid="true"] { border-color: #a83b3b; }
.field-error { margin: 5px 0 0; color: #9b2e2e; font-size: .72rem; line-height: 1.4; }
.privacy-check { display: flex; align-items: flex-start; gap: 10px; color: #52616c; font-size: .76rem; line-height: 1.5; }
.privacy-check input { margin-top: 2px; }
.privacy-check a { color: var(--ocean-deep); }
.booking-submit { width: 100%; border: 0; background: var(--ocean-deep); color: var(--white); cursor: pointer; }
.booking-submit:disabled { cursor: wait; opacity: .7; }
.submit-error { margin: 0; padding: 12px 14px; border-left: 3px solid #9b2e2e; background: #fff0f0; color: #7f2424; font-size: .8rem; line-height: 1.5; }
.booking-success { padding: clamp(44px, 7vw, 80px); text-align: center; }
.success-mark { display: grid; place-items: center; width: 58px; height: 58px; margin: 0 auto 20px; border-radius: 50%; background: var(--ocean-deep); color: var(--white); font-size: 1.7rem; }
.booking-success h3 { margin: 0; font: 700 clamp(1.8rem, 3vw, 2.8rem) 'Merriweather', serif; }
.booking-success dl { max-width: 680px; margin: 34px auto; display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--line); }
.booking-success dl div { padding: 18px 12px; }
.booking-success dl div + div { border-left: 1px solid var(--line); }
.booking-success dt { color: #71808a; font-size: .67rem; }
.booking-success dd { margin: 7px 0 0; color: var(--ocean-deep); font-weight: 600; }
.booking-success > p:not(.section-kicker) { color: #52616c; }

@media (max-width: 820px) {
  .booking-overlay { padding: 0; align-items: stretch; }
  .booking-modal { width: 100%; max-height: 100vh; }
  .booking-layout { grid-template-columns: 1fr; }
  .booking-calendar-column { border-right: 0; border-bottom: 1px solid var(--line); }
  .booking-success dl { grid-template-columns: 1fr 1fr; }
  .booking-success dl div:nth-child(3) { border-left: 0; border-top: 1px solid var(--line); }
  .booking-success dl div:nth-child(4) { border-top: 1px solid var(--line); }
}

@media (max-width: 520px) {
  .booking-modal-header { padding: 72px 24px 28px; }
  .booking-calendar-column, .booking-form-column { padding: 28px 20px; }
  .booking-field-row, .booking-success dl { grid-template-columns: 1fr; }
  .booking-success dl div + div { border-top: 1px solid var(--line); border-left: 0; }
}
</style>
