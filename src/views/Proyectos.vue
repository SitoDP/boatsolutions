<template>
  <div class="proyectos-page">
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
        <div class="project-card">
          <div class="project-image">
            <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=1366,fit=crop/AMqDOgByPghjN30x/dji_fly_20250715_135058_892_1752580280260_photo_optimized-pVFBPFMOjxZr06es.JPG" alt="Dulcinea" />
          </div>
          <div class="project-info">
            <div class="project-tag">{{ t.dulcineaTag }}</div>
            <h2>DULCINEA</h2>
            <p class="project-type">Brenta 42</p>
            <p>{{ t.dulcineaDesc1 }}</p>
            <p>{{ t.dulcineaDesc2 }}</p>
            <ul class="project-features">
              <li v-for="item in t.dulcineaItems" :key="item">{{ item }}</li>
            </ul>
            <p>{{ t.dulcineaDesc3 }}</p>
          </div>
        </div>

        <div class="project-card reverse">
          <div class="project-image">
            <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1917,fit=crop/AMqDOgByPghjN30x/img_3592-mp84x25VeJCLqWJL.JPG" alt="Marcela" />
          </div>
          <div class="project-info">
            <div class="project-tag">{{ t.marcelaTag }}</div>
            <h2>MARCELA</h2>
            <p class="project-type">VanDutch 42</p>
            <p>{{ t.marcelaDesc1 }}</p>
            <p>{{ t.marcelaDesc2 }}</p>
            <ul class="project-features">
              <li v-for="item in t.marcelaItems" :key="item">{{ item }}</li>
            </ul>
            <p>{{ t.marcelaDesc3 }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section cta">
      <div class="container">
        <h2>{{ t.ctaTitle }}</h2>
        <p>{{ t.ctaText }}</p>
        <button class="btn btn-primary btn-large" @click="openBooking({ programId: null, length: 30 })">
          {{ t.ctaBtn }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage'
import { useProgramBooking } from '../composables/useProgramBooking'
import { usePageMeta } from '../composables/useMeta'

usePageMeta({
  es: {
    title: 'Proyectos',
    description: 'Casos reales de mantenimiento, electrónica, limpieza y puesta a punto coordinados por Boat Solutions International.',
  },
  en: {
    title: 'Projects',
    description: 'Real maintenance, electronics, cleaning and preparation projects coordinated by Boat Solutions International.',
  },
})

const { open: openBooking } = useProgramBooking()
const { useT } = useLanguage()
const t = useT('proyectos')
</script>

<style scoped>
.hero {
  min-height: 50vh;
  display: flex;
  align-items: center;
  position: relative;
  background: var(--color-meteorite-dark);
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: url('https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/AMqDOgByPghjN30x/img_23233-yxk0N83Y27Icf47I.jpg') center/cover no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(8, 16, 24, 0.8) 0%, rgba(66, 104, 135, 0.6) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-light);
  padding: 140px 20px 60px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
}

.project-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  margin-bottom: 96px;
}

.project-card:last-child { margin-bottom: 0; }

.project-card.reverse { direction: rtl; }
.project-card.reverse > * { direction: ltr; }

.project-image img {
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
}

.project-tag {
  display: inline-block;
  padding: 6px 16px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}

.project-info h2 {
  font-size: 2.5rem;
  color: var(--color-dark);
  margin-bottom: 8px;
  letter-spacing: 2px;
}

.project-type {
  font-size: 1rem;
  color: var(--color-primary);
  font-weight: 500;
  margin-bottom: 24px;
  font-family: var(--font-heading);
}

.project-info p {
  color: var(--color-gray);
  margin-bottom: 16px;
  line-height: 1.8;
}

.project-features {
  list-style: none;
  margin: 20px 0;
  padding: 0;
}

.project-features li {
  padding: 8px 0 8px 28px;
  position: relative;
  color: var(--color-gray);
  line-height: 1.6;
}

.project-features li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 15px;
  width: 10px;
  height: 10px;
  background: var(--color-primary);
  border-radius: 50%;
}

.cta {
  background: var(--color-gray-light);
  text-align: center;
}

.cta h2 { color: var(--color-dark); margin-bottom: 16px; }
.cta p { color: var(--color-gray); margin-bottom: 32px; font-size: 1.1rem; }
.btn-large { padding: 16px 40px; }

@media (max-width: 968px) {
  .project-card { grid-template-columns: 1fr; gap: 32px; }
  .project-card.reverse { direction: ltr; }
  .hero-title { font-size: 2rem; }
}
</style>
