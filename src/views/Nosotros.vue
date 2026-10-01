<template>
  <div class="nosotros-page">
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <p class="hero-label">{{ t.heroLabel }}</p>
        <h1 class="hero-title">{{ t.heroTitle }}</h1>
        <p class="hero-subtitle">{{ t.heroSubtitle }}</p>
      </div>
    </section>

    <section class="section story">
      <div class="container">
        <div class="story-grid">
          <div class="story-text">
            <h2>{{ t.storyTitle }}</h2>
            <p>{{ t.story1 }}</p>
            <p>{{ t.story2 }}</p>
            <p>{{ t.story3 }}</p>
          </div>
          <div class="story-image">
            <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=2800,h=2100,fit=crop/AMqDOgByPghjN30x/img_1431-6JEgmQbvJaE7Loe5.jpg" alt="Boat Solutions fundadores" />
          </div>
        </div>
      </div>
    </section>

    <section class="section founders">
      <div class="container">
        <h2 class="section-title">{{ t.teamTitle }}</h2>
        <div class="founders-grid">
          <div class="founder-card">
            <div class="founder-img-wrap">
              <img :src="alexImg" alt="Alejandro" />
            </div>
            <h3>{{ t.alex }}</h3>
            <p class="founder-role">{{ t.alexRole }}</p>
            <p>{{ t.alexDesc }}</p>
          </div>
          <div class="founder-card">
            <div class="founder-img-wrap">
              <img :src="calixImg" alt="Calixto" />
            </div>
            <h3>{{ t.calixto }}</h3>
            <p class="founder-role">{{ t.calixtoRole }}</p>
            <p>{{ t.calixtoDesc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section values">
      <div class="container">
        <h2 class="section-title">{{ t.valuesTitle }}</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h4>{{ t.value1Title }}</h4>
            <p>{{ t.value1 }}</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h4>{{ t.value2Title }}</h4>
            <p>{{ t.value2 }}</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h4>{{ t.value3Title }}</h4>
            <p>{{ t.value3 }}</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <h4>{{ t.value4Title }}</h4>
            <p>{{ t.value4 }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section mission">
      <div class="container">
        <div class="mission-grid">
          <div class="mission-card mission-card--primary">
            <h3>{{ t.missionTitle }}</h3>
            <p>{{ t.missionText }}</p>
          </div>
          <div class="mission-card">
            <h3>{{ t.visionTitle }}</h3>
            <p>{{ t.visionText }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section cta-section">
      <div class="container">
        <div class="cta-box">
          <h2>{{ t.ctaTitle }}</h2>
          <p>{{ t.ctaText }}</p>
          <button class="btn btn-primary btn-lg" @click="openBooking({ programId: null, length: 30 })">{{ t.ctaBtn }}</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import alexImg from '../assets/alex.png'
import calixImg from '../assets/calix.jpeg'
import { useLanguage } from '../composables/useLanguage'
import { useProgramBooking } from '../composables/useProgramBooking'
import { usePageMeta } from '../composables/useMeta'

usePageMeta({
  es: {
    title: 'Sobre nosotros',
    description: 'Alejandro y Calixto, especialistas en mantenimiento, electrónica, limpieza y coordinación náutica en las Rías Baixas.',
  },
  en: {
    title: 'About us',
    description: 'Alejandro and Calixto, specialists in maintenance, electronics, cleaning and nautical coordination in Galicia, Spain.',
  },
})

const { open: openBooking } = useProgramBooking()
const { useT } = useLanguage()
const t = useT('nosotros')
</script>

<style scoped>
.hero {
  min-height: 65vh;
  display: flex;
  align-items: center;
  position: relative;
  background: var(--color-meteorite-dark);
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: url('https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/AMqDOgByPghjN30x/dji_0773-mk34eQ2g2ZUekG6R.JPG') center/cover no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(8, 16, 24, 0.85) 0%, rgba(66, 104, 135, 0.6) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  color: var(--color-light);
  padding: 140px 20px 80px;
  max-width: 800px;
}

.hero-label {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-primary-light);
  margin-bottom: 20px;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.15rem;
  max-width: 600px;
  opacity: 0.9;
  line-height: 1.8;
  font-family: var(--font-body);
}

/* Story */
.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
}

.story-text h2 {
  color: var(--color-dark);
  font-size: 2rem;
  margin-bottom: 28px;
}

.story-text p {
  color: var(--color-gray);
  line-height: 1.9;
  margin-bottom: 20px;
  font-size: 1.05rem;
}

.story-image img {
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.15);
}

/* Founders */
.founders { background: var(--color-gray-light); }

.founders-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 900px;
  margin: 0 auto;
}

.founder-card {
  background: var(--color-light);
  border-radius: 20px;
  padding: 40px 32px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.07);
}

.founder-img-wrap {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 24px;
  border: 4px solid var(--color-primary-light);
}

.founder-img-wrap img { width: 100%; height: 100%; object-fit: cover; }

.founder-card h3 {
  font-size: 1.5rem;
  color: var(--color-dark);
  margin-bottom: 6px;
}

.founder-role {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.founder-card p:last-child {
  color: var(--color-gray);
  line-height: 1.7;
  font-size: 0.95rem;
}

/* Values */
.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 28px;
}

.value-card {
  padding: 32px 28px;
  background: var(--color-light);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border-top: 3px solid var(--color-primary-light);
  transition: transform 0.2s, border-color 0.2s;
}

.value-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
}

.value-icon {
  width: 52px;
  height: 52px;
  background: var(--color-primary-light);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  margin-bottom: 20px;
}

.value-card h4 {
  font-size: 1.1rem;
  color: var(--color-dark);
  margin-bottom: 10px;
}

.value-card p { color: var(--color-gray); line-height: 1.7; font-size: 0.95rem; }

/* Mission */
.mission { background: var(--color-gray-light); }

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.mission-card {
  background: var(--color-light);
  padding: 44px 40px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.07);
}

.mission-card--primary {
  background: var(--color-primary);
  color: var(--color-light);
}

.mission-card h3 {
  font-size: 1.4rem;
  margin-bottom: 20px;
}

.mission-card--primary h3 { color: white; }
.mission-card:not(.mission-card--primary) h3 { color: var(--color-dark); }

.mission-card--primary p { color: rgba(255,255,255,0.9); line-height: 1.8; }
.mission-card:not(.mission-card--primary) p { color: var(--color-gray); line-height: 1.8; }

/* CTA */
.cta-box {
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
  padding: 60px 40px;
  background: var(--color-meteorite-dark);
  border-radius: 24px;
  color: var(--color-light);
}

.cta-box h2 {
  font-size: 2rem;
  margin-bottom: 16px;
  color: white;
}

.cta-box p {
  font-family: var(--font-body);
  font-size: 1.05rem;
  opacity: 0.85;
  margin-bottom: 32px;
  line-height: 1.7;
}

.btn-lg { padding: 16px 36px; font-size: 1rem; }

@media (max-width: 768px) {
  .story-grid, .founders-grid, .mission-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .hero-title { font-size: 2rem; }
  .cta-box { padding: 40px 24px; }
}
</style>
