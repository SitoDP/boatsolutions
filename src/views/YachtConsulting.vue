<template>
  <div class="yacht-consulting">
    <HeroSection :bg-image="dulcineaConsulting" min-height="65vh" max-width="820px">
      <p class="hero-label">{{ t.heroLabel }}</p>
      <h1 class="hero-title">{{ t.heroTitle }}</h1>
      <p class="hero-subtitle">{{ t.heroSubtitle }}</p>
      <button class="btn btn-primary" @click="openBooking({ programId: null, length: 30 })">{{ t.heroBtn }}</button>
    </HeroSection>

    <section class="section intro">
      <div class="container intro-inner">
        <p class="intro-text">{{ t.introText }}</p>
      </div>
    </section>

    <section class="section services">
      <div class="container">
        <h2 class="section-title">{{ t.servicesTitle }}</h2>
        <div class="services-list">
          <div class="service-block">
            <div class="service-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <div class="service-content">
              <span class="service-num">{{ t.s1Num }}</span>
              <h3>{{ t.s1Title }}</h3>
              <p>{{ t.s1Desc }}</p>
              <ul>
                <li v-for="item in t.s1Items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>

          <div class="service-block">
            <div class="service-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div class="service-content">
              <span class="service-num">{{ t.s2Num }}</span>
              <h3>{{ t.s2Title }}</h3>
              <p>{{ t.s2Desc }}</p>
              <ul>
                <li v-for="item in t.s2Items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>

          <div class="service-block">
            <div class="service-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <div class="service-content">
              <span class="service-num">{{ t.s3Num }}</span>
              <h3>{{ t.s3Title }}</h3>
              <p>{{ t.s3Desc }}</p>
              <ul>
                <li v-for="item in t.s3Items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section how-it-works">
      <div class="container">
        <h2 class="section-title">{{ t.howTitle }}</h2>
        <div class="steps-grid">
          <div class="step">
            <div class="step-number">1</div>
            <h4>{{ t.step1Title }}</h4>
            <p>{{ t.step1 }}</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">2</div>
            <h4>{{ t.step2Title }}</h4>
            <p>{{ t.step2 }}</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">3</div>
            <h4>{{ t.step3Title }}</h4>
            <p>{{ t.step3 }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section booking" id="cita">
      <div class="container">
        <h2 class="section-title">{{ t.bookingTitle }}</h2>
        <p class="section-subtitle">{{ t.bookingSubtitle }}</p>
        <div class="booking-grid">
          <div class="booking-calendar">
            <CalendarWidget @select="handleDateSelect" />
          </div>
          <div class="booking-info">
            <h3>{{ t.whyTitle }}</h3>
            <div class="reason-list">
              <div v-for="reason in t.reasons" :key="reason" class="reason">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <p>{{ reason }}</p>
              </div>
            </div>
            <div class="contact-options">
              <a href="mailto:info@boat-solutions.es" class="contact-option">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                info@boat-solutions.es
              </a>
              <a href="tel:+34676625595" class="contact-option">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +34 676 625 595
              </a>
            </div>
            <button class="btn btn-primary" @click="openBooking({ programId: null, length: 30 })">
              {{ t.bookBtn }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import CalendarWidget from '../components/CalendarWidget.vue'
import HeroSection from '../components/HeroSection.vue'
import dulcineaConsulting from '../assets/dulcineaConsulting.jpeg'
import { useLanguage } from '../composables/useLanguage'
import { useProgramBooking } from '../composables/useProgramBooking'
import { usePageMeta } from '../composables/useMeta'

usePageMeta({
  es: {
    title: 'Yacht Consulting',
    description: 'Asesoramiento experto en compraventa de embarcaciones, experiencias náuticas en el extranjero y gestión de reparaciones.',
  },
  en: {
    title: 'Yacht Consulting',
    description: 'Expert advice on yacht buying and selling, nautical experiences abroad and repair coordination.',
  },
})

const { open: openBooking } = useProgramBooking()
const { useT } = useLanguage()
const t = useT('consulting')

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
.hero-label {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-primary-light);
  margin-bottom: 16px;
}

.hero-title { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 700; margin-bottom: 20px; }

.hero-subtitle {
  font-size: 1.1rem;
  max-width: 620px;
  opacity: 0.9;
  line-height: 1.8;
  font-family: var(--font-body);
  margin-bottom: 32px;
}

/* Intro */
.intro { background: var(--color-gray-light); }

.intro-inner { text-align: center; }

.intro-text {
  font-size: 1.1rem;
  color: var(--color-gray);
  max-width: 780px;
  margin: 0 auto;
  line-height: 1.9;
}

/* Services */
.services-list { display: flex; flex-direction: column; gap: 48px; }

.service-block {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 32px;
  align-items: start;
  padding: 44px;
  background: var(--color-light);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.07);
  border-left: 4px solid var(--color-primary);
  transition: transform 0.2s;
}

.service-block:hover { transform: translateY(-2px); }

.service-icon {
  width: 64px;
  height: 64px;
  background: var(--color-primary-light);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
}

.service-num {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 2px;
  display: block;
  margin-bottom: 8px;
}

.service-content h3 {
  font-size: 1.4rem;
  color: var(--color-dark);
  margin-bottom: 14px;
}

.service-content > p {
  color: var(--color-gray);
  line-height: 1.8;
  margin-bottom: 20px;
}

.service-content ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.service-content li {
  color: var(--color-gray);
  font-size: 0.9rem;
  padding-left: 18px;
  position: relative;
}

.service-content li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-size: 0.8rem;
}

/* How it works */
.how-it-works { background: var(--color-gray-light); }

.steps-grid {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.step {
  flex: 1;
  text-align: center;
  padding: 32px 24px;
  background: var(--color-light);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.step-number {
  width: 48px;
  height: 48px;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.step h4 { font-size: 1rem; color: var(--color-dark); margin-bottom: 10px; }
.step p { font-size: 0.9rem; color: var(--color-gray); line-height: 1.6; }

.step-arrow {
  font-size: 1.5rem;
  color: var(--color-primary);
  opacity: 0.5;
  flex-shrink: 0;
}

/* Booking */
.booking { background: var(--color-light); }

.booking-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  max-width: 1060px;
  margin: 0 auto;
}

.booking-info { display: flex; flex-direction: column; justify-content: center; }

.booking-info h3 {
  font-size: 1.4rem;
  color: var(--color-dark);
  margin-bottom: 24px;
}

.reason-list { margin-bottom: 28px; display: flex; flex-direction: column; gap: 14px; }

.reason {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.reason svg { color: var(--color-primary); flex-shrink: 0; margin-top: 2px; }
.reason p { color: var(--color-gray); font-size: 0.95rem; line-height: 1.5; margin: 0; }

.contact-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.contact-option {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-primary);
  font-weight: 500;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.contact-option:hover { opacity: 0.75; }
.contact-option svg { flex-shrink: 0; }

@media (max-width: 968px) {
  .service-block { grid-template-columns: 1fr; gap: 20px; padding: 32px 24px; }
  .service-content ul { grid-template-columns: 1fr; }
  .steps-grid { flex-direction: column; }
  .step-arrow { transform: rotate(90deg); }
  .booking-grid { grid-template-columns: 1fr; }
  .hero-title { font-size: 2rem; }
}
</style>
