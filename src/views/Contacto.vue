<template>
  <div class="contacto-page">
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <h1 class="hero-title">{{ t.heroTitle }}</h1>
        <p class="hero-subtitle">{{ t.heroSubtitle }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-form-section">
            <h2>{{ t.formTitle }}</h2>
            <p>{{ t.formSubtitle }}</p>

            <form v-if="!success" @submit.prevent="handleSubmit" class="contact-form" novalidate>
              <div class="form-row">
                <div class="form-group">
                  <label for="c-name">{{ t.nameLabel }}</label>
                  <input id="c-name" v-model="form.name" type="text" :placeholder="t.namePlaceholder"
                    :class="{ 'input-error': errors.name }" @input="errors.name = ''" />
                  <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
                </div>
                <div class="form-group">
                  <label for="c-email">{{ t.emailLabel }}</label>
                  <input id="c-email" v-model="form.email" type="email" :placeholder="t.emailPlaceholder"
                    autocomplete="email" inputmode="email"
                    :class="{ 'input-error': errors.email || emailFeedback?.errorCode }"
                    @input="errors.email = ''; emailFeedback = null"
                    @blur="onEmailBlur" />
                  <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
                  <span v-else-if="emailFeedback?.errorCode === 'typo'" class="field-error">
                    {{ t.emailDidYouMean }}
                    <button type="button" class="email-suggestion" @click="applyEmailSuggestion">
                      {{ emailFeedback.suggestion }}</button>?
                  </span>
                  <span v-else-if="emailFeedback?.errorCode" class="field-error">
                    {{ emailErrorMessage }}
                  </span>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="c-phone">{{ t.phoneLabel }}</label>
                  <input id="c-phone" v-model="form.phone" type="tel" :placeholder="t.phonePlaceholder" />
                </div>
                <div class="form-group">
                  <label for="c-boat">{{ t.boatLabel }}</label>
                  <select id="c-boat" v-model="form.boatType">
                    <option value="">{{ t.boatPlaceholder }}</option>
                    <option v-for="(label, key) in t.boatTypes" :key="key" :value="key">{{ label }}</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="c-subject">{{ t.subjectLabel }}</label>
                <select id="c-subject" v-model="form.subject"
                  :class="{ 'input-error': errors.subject }" @change="errors.subject = ''">
                  <option value="">{{ t.subjectPlaceholder }}</option>
                  <option v-for="(label, key) in t.subjects" :key="key" :value="key">{{ label }}</option>
                </select>
                <span v-if="errors.subject" class="field-error">{{ errors.subject }}</span>
              </div>

              <div class="form-group">
                <label for="c-message">{{ t.messageLabel }}</label>
                <textarea id="c-message" v-model="form.message" rows="5"
                  :placeholder="t.messagePlaceholder"
                  :class="{ 'input-error': errors.message }" @input="errors.message = ''"></textarea>
                <span v-if="errors.message" class="field-error">{{ errors.message }}</span>
              </div>

              <div class="form-group checkbox-group">
                <input type="checkbox" id="privacy" v-model="form.privacy"
                  :class="{ 'checkbox-error': errors.privacy }" @change="errors.privacy = ''" />
                <div>
                  <label for="privacy">{{ t.privacyLabel }}</label>
                  <span v-if="errors.privacy" class="field-error">{{ errors.privacy }}</span>
                </div>
              </div>

              <div v-if="submitError" class="error-message">
                <p>{{ t.errorMsg }}</p>
              </div>

              <button type="submit" class="btn btn-primary btn-full" :disabled="submitting">
                {{ submitting ? t.sendingBtn : t.sendBtn }}
              </button>
            </form>

            <div v-if="success" class="success-message">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>
              </svg>
              <p>{{ t.successMsg1 }}</p>
              <p>{{ t.successMsg2 }}</p>
            </div>
          </div>

          <div class="contact-info-section">
            <h2>{{ t.calendarTitle }}</h2>
            <p>{{ t.calendarSubtitle }}</p>

            <div class="calendar-section">
              <CalendarWidget @select="handleDateSelect" />
            </div>

            <div class="contact-details">
              <h3>{{ t.otherContactTitle }}</h3>

              <div class="contact-item">
                <div class="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <span class="label">{{ t.emailLabel }}</span>
                  <a href="mailto:info@boat-solutions.es">info@boat-solutions.es</a>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <span class="label">{{ t.phoneLabel }}</span>
                  <a href="tel:+34676625595">+34 676 625 595</a>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <span class="label">{{ t.locationLabel }}</span>
                  <span>{{ t.locationValue }}</span>
                </div>
              </div>
            </div>

            <button class="btn btn-outline btn-full" @click="openBooking({ programId: null, length: 30 })">
              {{ t.bookBtn }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CalendarWidget from '../components/CalendarWidget.vue'
import { useLanguage } from '../composables/useLanguage'
import { useProgramBooking } from '../composables/useProgramBooking'
import { usePageMeta } from '../composables/useMeta'
import { validateEmail, type EmailValidation } from '../lib/email'

usePageMeta({
  es: {
    title: 'Contacto',
    description: 'Hablemos sobre tu barco. Reserva una cita gratuita o escríbenos a info@boat-solutions.es.',
  },
  en: {
    title: 'Contact',
    description: 'Let’s talk about your yacht. Book a free meeting or write to info@boat-solutions.es.',
  },
})

interface ContactForm {
  name: string; email: string; phone: string; boatType: string
  subject: string; message: string; privacy: boolean
}

interface FormErrors {
  name: string; email: string; subject: string; message: string; privacy: string
}

const { open: openBooking } = useProgramBooking()
const { lang, useT } = useLanguage()
const t = useT('contacto')

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL

const emptyForm = (): ContactForm => ({
  name: '', email: '', phone: '', boatType: '', subject: '', message: '', privacy: false,
})
const emptyErrors = (): FormErrors => ({ name: '', email: '', subject: '', message: '', privacy: '' })

const form = ref<ContactForm>(emptyForm())
const errors = ref<FormErrors>(emptyErrors())
const submitting = ref(false)
const success = ref(false)
const submitError = ref(false)
const emailFeedback = ref<EmailValidation | null>(null)

const emailErrorMessage = computed(() => {
  const code = emailFeedback.value?.errorCode
  if (!code) return ''
  switch (code) {
    case 'empty': return t.value.emailRequired
    case 'format': return t.value.emailInvalid
    case 'localPart': return t.value.emailLocalPart
    case 'domainDots': return t.value.emailDomainDots
    case 'tldShort': return t.value.emailTldShort
    case 'tldInvalid': return t.value.emailTldInvalid
    default: return t.value.emailInvalid
  }
})

const onEmailBlur = () => {
  if (!form.value.email.trim()) { emailFeedback.value = null; return }
  emailFeedback.value = validateEmail(form.value.email)
}

const applyEmailSuggestion = () => {
  const sugg = emailFeedback.value?.suggestion
  if (!sugg) return
  form.value.email = sugg
  emailFeedback.value = null
}

const validate = (): boolean => {
  const e = emptyErrors()
  if (!form.value.name.trim()) e.name = t.value.nameRequired
  else if (form.value.name.trim().length < 2) e.name = t.value.nameMinLength
  const emailCheck = validateEmail(form.value.email)
  if (!emailCheck.valid) {
    if (emailCheck.errorCode === 'empty') e.email = t.value.emailRequired
    else e.email = t.value.emailInvalid
    emailFeedback.value = emailCheck
  } else {
    emailFeedback.value = null
  }
  if (!form.value.subject) e.subject = t.value.subjectRequired
  if (!form.value.message.trim()) e.message = t.value.messageRequired
  else if (form.value.message.trim().length < 10) e.message = t.value.messageTooShort
  if (!form.value.privacy) e.privacy = t.value.privacyRequired
  errors.value = e
  return !Object.values(e).some(Boolean)
}

const handleSubmit = async () => {
  if (!validate()) return
  submitting.value = true
  submitError.value = false
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)
  try {
    // Sin Content-Type para evitar el preflight CORS de Apps Script.
    // El script lee el body crudo desde e.postData.contents.
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ type: 'contacto', language: lang.value, ...form.value }),
      signal: controller.signal,
      redirect: 'follow',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = (await res.json().catch(() => ({ ok: true }))) as { ok?: boolean; error?: string }
    if (json.ok === false) throw new Error(json.error || 'unknown')
    success.value = true
    form.value = emptyForm()
    emailFeedback.value = null
    setTimeout(() => { success.value = false }, 8000)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[Contacto] envío fallido:', err)
    submitError.value = true
  } finally {
    clearTimeout(timeout)
    submitting.value = false
  }
}

const handleDateSelect = (data: { date: { day: number; month: number; year: number } | null; time: string | null }) => {
  if (data.date && data.time) {
    const { day, month, year } = data.date
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    openBooking({
      programId: null,
      length: 30,
      schedule: { date: dateStr, time: data.time },
    })
  }
}
</script>

<style scoped>
.hero {
  min-height: 40vh;
  display: flex;
  align-items: center;
  position: relative;
  background: var(--color-meteorite-dark);
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: url('https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/AMqDOgByPghjN30x/img_1681-zR73hJx3RTqLfd01.jpg') center/cover no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(8, 16, 24, 0.82) 0%, rgba(66, 104, 135, 0.65) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-light);
  padding: 140px 20px 60px;
}

.hero-title { font-size: 3rem; font-weight: 700; margin-bottom: 16px; }
.hero-subtitle { font-size: 1.2rem; opacity: 0.9; font-family: var(--font-body); }

.contact-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 60px;
}

.contact-form-section h2, .contact-info-section h2 {
  color: var(--color-dark);
  font-size: 1.75rem;
  margin-bottom: 8px;
}

.contact-form-section > p, .contact-info-section > p {
  color: var(--color-gray);
  margin-bottom: 32px;
}

.contact-form { display: flex; flex-direction: column; gap: 20px; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.form-group { display: flex; flex-direction: column; gap: 6px; }

.form-group label {
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--color-dark);
  font-family: var(--font-heading);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 14px 16px;
  border: 2px solid var(--color-gray-border);
  border-radius: 8px;
  font-size: 1rem;
  font-family: var(--font-body);
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.input-error { border-color: #dc2626 !important; }
.field-error { font-size: 0.8rem; color: #dc2626; }
.email-suggestion {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}
.email-suggestion:hover { color: var(--color-primary-dark); }

.checkbox-group { flex-direction: row; align-items: flex-start; gap: 12px; }
.checkbox-group input { width: 20px; height: 20px; margin-top: 2px; flex-shrink: 0; }
.checkbox-error { outline: 2px solid #dc2626; outline-offset: 2px; }
.checkbox-group label { font-weight: 400; font-size: 0.875rem; color: var(--color-gray); }

.btn-full { width: 100%; }

.success-message {
  padding: 40px 16px;
  text-align: center;
  color: #008361;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.success-message svg { color: #00b090; }
.success-message p { margin: 0; }

.error-message {
  padding: 14px 16px;
  background: #fef2f2;
  border-radius: 8px;
  border-left: 4px solid #dc2626;
  color: #991b1b;
  font-size: 0.9rem;
}
.error-message p { margin: 0; }

.calendar-section { margin-bottom: 32px; }

.contact-details {
  background: var(--color-gray-light);
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 24px;
}

.contact-details h3 {
  color: var(--color-dark);
  margin-bottom: 20px;
  font-size: 1rem;
  font-family: var(--font-heading);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 18px;
}
.contact-item:last-child { margin-bottom: 0; }

.contact-icon {
  width: 36px;
  height: 36px;
  background: var(--color-primary-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
}

.contact-item .label {
  display: block;
  font-size: 0.7rem;
  color: var(--color-gray);
  margin-bottom: 3px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: var(--font-heading);
}

.contact-item a { color: var(--color-primary); font-weight: 500; font-size: 0.9rem; }

@media (max-width: 968px) {
  .contact-grid { grid-template-columns: 1fr; gap: 48px; }
  .form-row { grid-template-columns: 1fr; }
  .hero-title { font-size: 2rem; }
}
</style>
