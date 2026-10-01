<template>
  <div class="yacht-detailing">
    <HeroSection :bg-video="cdnVideo('pulido.mp4')" min-height="65vh" max-width="820px" overlay="strong">
      <p class="hero-label">{{ t.heroLabel }}</p>
      <h1 class="hero-title">{{ t.heroTitle }}</h1>
      <p class="hero-subtitle">{{ t.heroSubtitle }}</p>
      <button class="btn btn-primary" @click="openDetailingRequest()">{{ t.heroBtn }}</button>
    </HeroSection>

    <section class="section levels">
      <div class="container">
        <h2 class="section-title">{{ t.levelsTitle }}</h2>
        <p class="section-subtitle">{{ t.levelsSubtitle }}</p>
        <div class="levels-grid">
          <div class="level-card" :class="{ active: selectedLevel === 'basica' }" @click="selectedLevel = 'basica'">
            <div class="level-badge">01</div>
            <h3>{{ t.l1Title }}</h3>
            <p>{{ t.l1Desc }}</p>
            <ul>
              <li v-for="item in t.l1Items" :key="item">{{ item }}</li>
            </ul>
            <span class="level-from">{{ t.fromLabel }} <strong>{{ prices.basica }}€/m</strong></span>
          </div>

          <div class="level-card" :class="{ active: selectedLevel === 'pulido' }" @click="selectedLevel = 'pulido'">
            <div class="level-badge">02</div>
            <h3>{{ t.l2Title }}</h3>
            <p>{{ t.l2Desc }}</p>
            <ul>
              <li v-for="item in t.l2Items" :key="item">{{ item }}</li>
            </ul>
            <span class="level-from">{{ t.fromLabel }} <strong>{{ prices.pulido }}€/m</strong></span>
          </div>

          <div class="level-card" :class="{ active: selectedLevel === 'completo' }" @click="selectedLevel = 'completo'">
            <div class="level-badge">03</div>
            <h3>{{ t.l3Title }}</h3>
            <p>{{ t.l3Desc }}</p>
            <ul>
              <li v-for="item in t.l3Items" :key="item">{{ item }}</li>
            </ul>
            <span class="level-from">{{ t.fromLabel }} <strong>{{ prices.completo }}€/m</strong></span>
          </div>

          <div class="level-card level-card--premium" :class="{ active: selectedLevel === 'premium' }" @click="selectedLevel = 'premium'">
            <div class="level-badge">04</div>
            <div class="premium-tag">Premium</div>
            <h3>{{ t.l4Title }}</h3>
            <p>{{ t.l4Desc }}</p>
            <ul>
              <li v-for="item in t.l4Items" :key="item">{{ item }}</li>
            </ul>
            <span class="level-from">{{ t.fromLabel }} <strong>{{ prices.premium }}€/m</strong></span>
          </div>
        </div>
      </div>
    </section>

    <!-- Budget Calculator -->
    <section class="section calculator-section">
      <div class="container">
        <div class="calculator-wrap">
          <div class="calculator-header">
            <h2>{{ t.calcTitle }}</h2>
            <p>{{ t.calcSubtitle }}</p>
          </div>
          <div class="calculator-body">
            <div class="calc-form">
              <div class="calc-field">
                <label>{{ t.calcLengthLabel }}</label>
                <div class="slider-wrap">
                  <input type="range" v-model.number="calc.length" min="5" max="30" step="0.5" />
                  <span class="slider-value">{{ calc.length }} m</span>
                </div>
              </div>

              <div class="calc-field">
                <label>{{ t.calcLevelLabel }}</label>
                <div class="level-select-group">
                  <button
                    v-for="(label, key) in t.levelLabels"
                    :key="key"
                    :class="['level-select-btn', { active: calc.level === key }]"
                    @click="calc.level = key as Level"
                  >{{ label }}</button>
                </div>
              </div>

              <div class="calc-field">
                <label>{{ t.calcMaterialLabel }}</label>
                <select v-model="calc.material">
                  <option v-for="(label, key) in t.calcMaterials" :key="key" :value="key">{{ label }}</option>
                </select>
              </div>
            </div>

            <div class="calc-result">
              <p class="result-label">{{ t.resultLabel }}</p>
              <p class="result-price">{{ formattedPrice }}</p>
              <p class="result-detail"><strong>{{ t.levelLabels[calc.level] }}</strong> · {{ calc.length }} m</p>
              <p class="result-note">{{ t.resultNote }}</p>
              <button class="btn btn-primary" @click="openDetailingRequest({ level: calc.level, length: calc.length, material: calc.material })">
                {{ t.calcBtn }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="section process">
      <div class="container">
        <h2 class="section-title">{{ t.processTitle }}</h2>
        <div class="process-steps">
          <div class="process-step">
            <div class="process-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
            <h4>{{ t.p1Title }}</h4>
            <p>{{ t.p1 }}</p>
          </div>
          <div class="process-connector"></div>
          <div class="process-step">
            <div class="process-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
            <h4>{{ t.p2Title }}</h4>
            <p>{{ t.p2 }}</p>
          </div>
          <div class="process-connector"></div>
          <div class="process-step">
            <div class="process-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
            </div>
            <h4>{{ t.p3Title }}</h4>
            <p>{{ t.p3 }}</p>
          </div>
          <div class="process-connector"></div>
          <div class="process-step">
            <div class="process-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h4>{{ t.p4Title }}</h4>
            <p>{{ t.p4 }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section class="section projects">
      <div class="container">
        <h2 class="section-title">{{ t.projectsTitle }}</h2>
        <div class="project-card">
          <div class="project-image">
            <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800,fit=crop/AMqDOgByPghjN30x/img_23233-yxk0N83Y27Icf47I.jpg" alt="Dulcinea detailing" />
          </div>
          <div class="project-info">
            <span class="project-tag">{{ t.dulcinea.tag }}</span>
            <h3>DULCINEA</h3>
            <p class="project-sub">{{ t.dulcinea.sub }}</p>
            <p>{{ t.dulcinea.desc }}</p>
          </div>
        </div>

        <div class="project-card reverse">
          <div class="project-image">
            <img :src="imgMarcela1" alt="Marcela en el mar" />
          </div>
          <div class="project-info">
            <span class="project-tag">{{ t.marcela.tag }}</span>
            <h3>MARCELA</h3>
            <p class="project-sub">{{ t.marcela.sub }}</p>
            <p>{{ t.marcela.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section booking">
      <div class="container">
        <h2 class="section-title">{{ t.bookingTitle }}</h2>
        <p class="section-subtitle">{{ t.bookingSubtitle }}</p>
        <div class="booking-grid">
          <CalendarWidget @select="handleDateSelect" />
          <div class="booking-info">
            <h3>{{ t.bookingInfoTitle }}</h3>
            <p>{{ t.bookingInfoText }}</p>
            <div class="contact-list">
              <a href="mailto:info@boat-solutions.es" class="contact-opt">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                info@boat-solutions.es
              </a>
              <a href="tel:+34676625595" class="contact-opt">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +34 676 625 595
              </a>
            </div>
            <button class="btn btn-primary" @click="openDetailingRequest()">
              {{ t.bookBtn }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCalcConfig } from '../composables/useCalcConfig'
import CalendarWidget from '../components/CalendarWidget.vue'
import HeroSection from '../components/HeroSection.vue'
import { useLanguage } from '../composables/useLanguage'
import { useProgramBooking } from '../composables/useProgramBooking'
import { useDetailingRequest } from '../composables/useDetailingRequest'
import { usePageMeta } from '../composables/useMeta'
import { cdnVideo } from '../config'
import imgMarcela1 from '../assets/marcela1.jpeg'

usePageMeta({
  es: {
    title: 'Yacht Detailing',
    description: 'Restauración estética y protección profesional para tu embarcación. Pulido, abrillantado y detailing premium con garantía.',
  },
  en: {
    title: 'Yacht Detailing',
    description: 'Aesthetic restoration and professional protection for your yacht. Polishing, buffing and premium detailing with warranty.',
  },
})

const { open: openBooking } = useProgramBooking()
const { open: openDetailingRequest } = useDetailingRequest()
const { useT } = useLanguage()
const t = useT('detailing')

type Level = 'basica' | 'pulido' | 'completo' | 'premium'

const calcConfig = useCalcConfig()

const prices = computed(() => calcConfig.value.detailing.prices)
const materialFactor = computed(() => calcConfig.value.detailing.materialFactor)

const selectedLevel = ref<Level>('completo')

const calc = ref({ length: 12, level: 'completo' as Level, material: 'fibra' })

const formattedPrice = computed(() => {
  const pricePerMeter = prices.value[calc.value.level]
  const factor = materialFactor.value[calc.value.material] ?? 1
  const total = Math.round((pricePerMeter * calc.value.length * factor * 1.21) / 50) * 50
  return `${total.toLocaleString('es-ES')} €`
})

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

/* Levels */
.levels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.level-card {
  background: var(--color-light);
  border-radius: 20px;
  padding: 32px 28px;
  box-shadow: 0 6px 28px rgba(0, 0, 0, 0.07);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
}

.level-card:hover { transform: translateY(-3px); border-color: var(--color-primary-light); }

.level-card.active {
  border-color: var(--color-primary);
  box-shadow: 0 12px 40px rgba(66, 104, 135, 0.2);
}

.level-card--premium.active {
  background: var(--color-primary);
  color: white;
}

.level-badge {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary-light);
  margin-bottom: 12px;
}

.level-card--premium.active .level-badge { color: rgba(255,255,255,0.3); }

.premium-tag {
  display: inline-block;
  background: var(--color-primary);
  color: white;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 10px;
}

.level-card--premium.active .premium-tag { background: rgba(255,255,255,0.2); }

.level-card h3 { font-size: 1.15rem; color: var(--color-dark); margin-bottom: 10px; }
.level-card--premium.active h3 { color: white; }

.level-card > p { color: var(--color-gray); font-size: 0.88rem; line-height: 1.6; margin-bottom: 16px; }
.level-card--premium.active > p { color: rgba(255,255,255,0.8); }

.level-card ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }

.level-card li {
  font-size: 0.83rem;
  color: var(--color-gray);
  padding-left: 16px;
  position: relative;
}

.level-card--premium.active li { color: rgba(255,255,255,0.8); }

.level-card li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: 700;
  font-size: 0.75rem;
}

.level-card--premium.active li::before { color: rgba(255,255,255,0.7); }

.level-from {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--color-primary);
  display: block;
}

.level-card--premium.active .level-from { color: rgba(255,255,255,0.9); }

/* Calculator */
.calculator-section { background: var(--color-gray-light); }

.calculator-wrap {
  background: var(--color-light);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 16px 56px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 0 auto;
}

.calculator-header {
  background: var(--color-primary);
  padding: 36px 44px;
  color: white;
}

.calculator-header h2 { font-size: 1.8rem; margin-bottom: 8px; color: white; }
.calculator-header p { opacity: 0.85; font-family: var(--font-body); font-size: 1rem; }

.calculator-body {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
}

.calc-form { padding: 40px 44px; display: flex; flex-direction: column; gap: 28px; }

.calc-field { display: flex; flex-direction: column; gap: 10px; }

.calc-field label {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-dark);
}

.calc-field select {
  padding: 12px 16px;
  border: 2px solid var(--color-gray-border);
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: var(--font-body);
  transition: border-color 0.2s;
}

.calc-field select:focus { outline: none; border-color: var(--color-primary); }

.slider-wrap { display: flex; align-items: center; gap: 16px; }

.slider-wrap input[type="range"] {
  flex: 1;
  appearance: none;
  -webkit-appearance: none;
  height: 4px;
  background: var(--color-gray-border);
  border-radius: 2px;
  outline: none;
}

.slider-wrap input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: var(--color-primary);
  border-radius: 50%;
  cursor: pointer;
}

.slider-value {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--color-primary);
  min-width: 50px;
  text-align: right;
}

.level-select-group { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

.level-select-btn {
  padding: 10px 12px;
  border: 2px solid var(--color-gray-border);
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-gray);
  transition: all 0.2s;
  text-align: center;
}

.level-select-btn.active {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.calc-result {
  background: var(--color-gray-light);
  padding: 40px 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px solid var(--color-gray-border);
}

.result-label {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--color-gray);
  margin-bottom: 12px;
}

.result-price {
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
  line-height: 1;
}

.result-detail {
  font-size: 0.85rem;
  color: var(--color-primary);
  margin-bottom: 12px;
  font-family: var(--font-heading);
}

.result-note {
  font-size: 0.82rem;
  color: var(--color-gray);
  line-height: 1.6;
  margin-bottom: 28px;
}

/* Process */
.process { background: var(--color-gray-light); }

.process-steps {
  display: flex;
  align-items: center;
  gap: 0;
  max-width: 960px;
  margin: 0 auto;
}

.process-step {
  flex: 1;
  text-align: center;
  padding: 32px 20px;
}

.process-icon {
  width: 56px;
  height: 56px;
  background: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 16px;
}

.process-step h4 { font-size: 1rem; color: var(--color-dark); margin-bottom: 8px; }
.process-step p { font-size: 0.85rem; color: var(--color-gray); line-height: 1.6; }

.process-connector {
  width: 40px;
  height: 2px;
  background: var(--color-primary-light);
  flex-shrink: 0;
}

/* Projects */
.projects { background: var(--color-light); }

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

.project-tag {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--color-primary);
  background: var(--color-primary-light);
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 14px;
}

.project-info h3 { font-size: 2rem; color: var(--color-dark); margin-bottom: 6px; }

.project-sub {
  font-size: 0.95rem;
  color: var(--color-primary);
  font-weight: 500;
  margin-bottom: 18px;
  font-family: var(--font-heading);
}

.project-info > p:last-child { color: var(--color-gray); line-height: 1.8; }

/* Booking */
.booking { background: var(--color-gray-light); }

.booking-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  max-width: 1000px;
  margin: 0 auto;
}

.booking-info { display: flex; flex-direction: column; justify-content: center; }
.booking-info h3 { font-size: 1.4rem; color: var(--color-dark); margin-bottom: 14px; }
.booking-info > p { color: var(--color-gray); line-height: 1.7; margin-bottom: 24px; }

.contact-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }

.contact-opt {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-primary);
  font-weight: 500;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.contact-opt:hover { opacity: 0.75; }

@media (max-width: 968px) {
  .calculator-body { grid-template-columns: 1fr; }
  .calc-result { border-left: none; border-top: 1px solid var(--color-gray-border); }
  .project-card { grid-template-columns: 1fr; direction: ltr; }
  .project-card.reverse { direction: ltr; }
  .booking-grid { grid-template-columns: 1fr; }
  .process-steps { flex-direction: column; gap: 8px; }
  .process-connector { width: 2px; height: 24px; }
  .hero-title { font-size: 2rem; }
}

@media (max-width: 600px) {
  .levels-grid { grid-template-columns: 1fr; }
  .level-select-group { grid-template-columns: 1fr 1fr; }
  .calc-form, .calculator-header { padding: 28px 24px; }
}
</style>
