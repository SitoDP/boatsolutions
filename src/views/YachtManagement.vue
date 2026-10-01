<template>
  <div class="yacht-management">
    <HeroSection :bg-video="cdnVideo('dulcineaManagement.mp4')" max-width="860px">
      <p class="hero-label">{{ t.heroLabel }}</p>
      <h1 class="hero-title">{{ t.heroTitle }}</h1>
      <p class="hero-subtitle">{{ t.heroSubtitle }}</p>
      <button class="btn btn-primary" @click="openBooking({ programId: null, length: 30 })">{{ t.heroBtn }}</button>
    </HeroSection>

    <section class="section intro">
      <div class="container">
        <p class="intro-text">{{ t.introText }}</p>
      </div>
    </section>

    <section class="section services">
      <div class="container">
        <h2 class="section-title">{{ t.servicesTitle }}</h2>

        <div class="services-grid">
          <div class="service-card">
            <div class="service-number">01</div>
            <h3>{{ t.s1Title }}</h3>
            <p>{{ t.s1Desc }}</p>
          </div>
          <div class="service-card">
            <div class="service-number">02</div>
            <h3>{{ t.s2Title }}</h3>
            <p>{{ t.s2Desc }}</p>
          </div>
          <div class="service-card">
            <div class="service-number">03</div>
            <h3>{{ t.s3Title }}</h3>
            <p>{{ t.s3Desc }}</p>
          </div>
          <div class="service-card">
            <div class="service-number">04</div>
            <h3>{{ t.s4Title }}</h3>
            <p>{{ t.s4Desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Yacht Risk Report -->
    <section class="section checklist-section">
      <div class="container">
        <div class="checklist-cta">
          <div class="checklist-cta-text">
            <span class="checklist-tag">{{ t.checklistTag }}</span>
            <h2>{{ t.checklistTitle }}</h2>
            <p>{{ t.checklistDesc }}</p>
            <button class="btn btn-primary" @click="checklistOpen = !checklistOpen">
              {{ checklistOpen ? t.checklistBtnClose : t.checklistBtn }}
              <svg :class="['chevron', { rotated: checklistOpen }]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
          <div class="checklist-badge">
            <span class="badge-number">42</span>
            <span class="badge-label" style="white-space: pre-line">{{ t.checklistBadgeLabel }}</span>
          </div>
        </div>

        <Transition name="checklist">
          <div v-show="checklistOpen" class="checklist-grid">
            <div v-for="category in checklist" :key="category.title" class="checklist-category">
              <div class="category-header">
                <div class="category-icon" v-html="category.icon"></div>
                <h4>{{ category.title }}</h4>
              </div>
              <ul>
                <li v-for="item in category.items" :key="item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <section class="section projects">
      <div class="container">
        <h2 class="section-title">{{ t.projectsTitle }}</h2>

        <div class="project-card">
          <div class="project-image">
            <img :src="dulcineaImg" alt="Dulcinea" />
          </div>
          <div class="project-info">
            <h3>DULCINEA</h3>
            <p class="project-subtitle">{{ t.dulcineaSub }}</p>
            <p>{{ t.dulcineaDesc1 }}</p>
            <p>{{ t.dulcineaDesc2 }}</p>
          </div>
        </div>

        <div class="project-card reverse">
          <div class="project-image">
            <img :src="marcelaImg" alt="Marcela" />
          </div>
          <div class="project-info">
            <h3>MARCELA</h3>
            <p class="project-subtitle">{{ t.marcelaSub }}</p>
            <p>{{ t.marcelaDesc1 }}</p>
            <p>{{ t.marcelaDesc2 }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="contacto" class="section booking">
      <div class="container">
        <h2 class="section-title">{{ t.bookingTitle }}</h2>
        <p class="section-subtitle">{{ t.bookingSubtitle }}</p>

        <div class="booking-grid">
          <div class="booking-calendar">
            <CalendarWidget @select="handleDateSelect" />
          </div>
          <div class="booking-info">
            <h3>{{ t.bookingInfoTitle }}</h3>
            <p>{{ t.bookingInfoText }}</p>

            <div class="contact-details">
              <div class="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:info@boat-solutions.es">info@boat-solutions.es</a>
              </div>
              <div class="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:+34676625595">+34 676 625 595</a>
              </div>
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
import dulcineaImg from '../assets/dulcinea1.jpeg'
import marcelaImg from '../assets/marcela1.jpeg'
import { ref, computed } from 'vue'
import CalendarWidget from '../components/CalendarWidget.vue'
import HeroSection from '../components/HeroSection.vue'
import { useLanguage } from '../composables/useLanguage'
import { useProgramBooking } from '../composables/useProgramBooking'
import { usePageMeta } from '../composables/useMeta'
import { cdnVideo } from '../config'

usePageMeta({
  es: {
    title: 'Yacht Management',
    description: 'Planificación, ejecución y supervisión integral de tu embarcación durante todo el año. Mantenimientos, proveedores y revisiones bajo control.',
  },
  en: {
    title: 'Yacht Management',
    description: 'Year-round planning, execution and supervision for your yacht. Maintenance, suppliers and inspections fully managed.',
  },
})

const { open: openBooking } = useProgramBooking()
const { useT } = useLanguage()
const t = useT('management')
const tc = useT('checklist')

const checklistOpen = ref(false)

const checklistIcons = [
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l6-6 4 4 8-9"/><path d="M21 21H3"/></svg>',
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>',
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="13 2 13 9 22 9"/><polyline points="11 22 11 15 2 15"/><path d="M22 9l-10 6-10-6"/></svg>',
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
]

const checklist = computed(() =>
  tc.value.categories.map((cat, i) => ({ ...cat, icon: checklistIcons[i] ?? '' }))
)

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
  max-width: 700px;
  opacity: 0.9;
  line-height: 1.8;
  font-family: var(--font-body);
  margin-bottom: 32px;
}

.intro { background: var(--color-gray-light); }

.intro-text {
  text-align: center;
  font-size: 1.1rem;
  color: var(--color-gray);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.service-card {
  background: var(--color-light);
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease;
}

.service-card:hover { transform: translateY(-4px); }

.service-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-primary-light);
  margin-bottom: 16px;
  font-family: var(--font-heading);
}

.service-card h3 { color: var(--color-dark); margin-bottom: 12px; font-size: 1.2rem; }
.service-card p { color: var(--color-gray); line-height: 1.7; }

.projects { background: var(--color-gray-light); }

.project-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  margin-bottom: 72px;
}

.project-card:last-child { margin-bottom: 0; }
.project-card.reverse { direction: rtl; }
.project-card.reverse > * { direction: ltr; }

.project-image img {
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.project-info h3 {
  font-size: 2rem;
  color: var(--color-dark);
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.project-subtitle {
  font-size: 1rem;
  color: var(--color-primary);
  font-weight: 500;
  margin-bottom: 20px;
  font-family: var(--font-heading);
}

.project-info p { color: var(--color-gray); margin-bottom: 16px; line-height: 1.8; }

.booking { background: var(--color-light); }

.booking-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  max-width: 1000px;
  margin: 0 auto;
}

.booking-info { display: flex; flex-direction: column; justify-content: center; }

.booking-info h3 {
  font-size: 1.5rem;
  color: var(--color-dark);
  margin-bottom: 16px;
}

.booking-info > p { color: var(--color-gray); margin-bottom: 32px; line-height: 1.7; }

.contact-details { margin-bottom: 24px; }

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  color: var(--color-gray);
}

.contact-item svg { color: var(--color-primary); flex-shrink: 0; }
.contact-item a { color: var(--color-primary); font-weight: 500; font-size: 1rem; }

/* Checklist */
.checklist-section { background: var(--color-gray-light); }

.checklist-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  background: var(--color-meteorite-dark);
  border-radius: 24px;
  padding: 48px 56px;
  margin-bottom: 32px;
}

.checklist-tag {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-primary-light);
  background: rgba(66, 104, 135, 0.3);
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.checklist-cta-text h2 {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 16px;
}

.checklist-cta-text > p {
  color: rgba(255,255,255,0.75);
  line-height: 1.8;
  margin-bottom: 28px;
  font-family: var(--font-body);
  font-size: 1rem;
  max-width: 580px;
}

.chevron { transition: transform 0.25s ease; vertical-align: middle; margin-left: 6px; }
.chevron.rotated { transform: rotate(180deg); }

.checklist-badge {
  flex-shrink: 0;
  text-align: center;
  background: var(--color-primary);
  border-radius: 20px;
  padding: 28px 36px;
}

.badge-number {
  display: block;
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.badge-label {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255,255,255,0.75);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 8px;
}

.checklist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.checklist-category {
  background: var(--color-light);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.category-icon {
  width: 40px;
  height: 40px;
  background: var(--color-primary-light);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
}

.category-header h4 {
  font-size: 0.95rem;
  color: var(--color-dark);
  font-family: var(--font-heading);
  font-weight: 700;
}

.checklist-category ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }

.checklist-category li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--color-gray);
  line-height: 1.4;
}

.checklist-category li svg { color: var(--color-primary); flex-shrink: 0; margin-top: 1px; }

.checklist-enter-active, .checklist-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.checklist-enter-from, .checklist-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@media (max-width: 768px) {
  .hero-title { font-size: 2rem; }
  .project-card { grid-template-columns: 1fr; }
  .project-card.reverse { direction: ltr; }
  .booking-grid { grid-template-columns: 1fr; }
  .checklist-cta { flex-direction: column; padding: 32px 24px; gap: 24px; }
  .checklist-badge { width: 100%; padding: 20px; }
}
</style>
