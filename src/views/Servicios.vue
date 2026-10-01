<script setup lang="ts">
import { computed } from 'vue'
import ProgramLengthSelector from '../components/ProgramLengthSelector.vue'
import ProgramCard from '../components/ProgramCard.vue'
import { useProgramBooking } from '../composables/useProgramBooking'
import { useLanguage } from '../composables/useLanguage'
import { usePageMeta } from '../composables/useMeta'
import { useProgramSelection } from '../composables/useProgramSelection'
import { commercialConditions } from '../data/programCommercialConditions'
import { calculateBundleSavings, lengths, programs } from '../data/programs'
import { programVisuals } from '../data/programVisuals'
import { freeInspectionPromotion } from '../data/programPromotion'
import { programsI18n } from '../i18n/programs'
import '../styles/programs.css'
import '../styles/program-services.css'

const { selectedLength } = useProgramSelection()
const { open } = useProgramBooking()
const { lang, to, useT } = useLanguage()
const t = useT('programs')
const individualPrograms = computed(() => programs.filter((program) => !program.highlighted))
const completeProgram = computed(() => programs.find((program) => program.highlighted)!)
const savings = computed(() => calculateBundleSavings(selectedLength.value))
const promotionDeadline = computed(() => new Intl.DateTimeFormat(lang.value === 'en' ? 'en-GB' : 'es-ES', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${freeInspectionPromotion.bookingDeadline}T00:00:00Z`)))

usePageMeta(computed(() => ({
  es: programsI18n.es.meta.services,
  en: programsI18n.en.meta.services,
})))

function text(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce((result, [key, value]) => result.split(`{${key}}`).join(String(value)), template)
}

function openGeneralBooking() {
  open({ programId: null, length: selectedLength.value })
}

const comparisonRows = computed(() => [
  { label: t.value.comparison.rows.care, values: [t.value.comparison.included, '—', '—', t.value.comparison.included] },
  { label: t.value.comparison.rows.electronics, values: ['—', t.value.comparison.included, '—', t.value.comparison.included] },
  { label: t.value.comparison.rows.cleaning, values: ['—', '—', t.value.comparison.included, t.value.comparison.included] },
  { label: t.value.comparison.rows.preDeparture, values: ['—', t.value.comparison.included, '—', t.value.comparison.included] },
  { label: t.value.comparison.rows.annualReport, values: [t.value.comparison.included, '—', '—', t.value.comparison.included] },
])
</script>

<template>
  <div class="programs-surface">
    <section id="inicio" class="hero-section">
      <div class="hero-copy">
        <p class="campaign-date">{{ t.hero.eyebrow }}</p>
        <h1>{{ t.hero.title }}</h1>
        <p class="hero-lead">{{ t.hero.lead }}</p>
        <div class="hero-actions">
          <a href="#programas" class="button button-primary">{{ t.hero.primaryCta }}</a>
          <a href="#revision" class="text-link">{{ t.hero.secondaryCta }}</a>
        </div>
      </div>
      <div class="hero-visual">
        <img
          :src="programVisuals.complete.src"
          :alt="t.hero.imageAlt"
          :width="programVisuals.complete.width"
          :height="programVisuals.complete.height"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
        <div class="hero-caption">
          <span>{{ t.hero.captionLabel }}</span>
          <strong>{{ t.hero.captionText }}</strong>
        </div>
      </div>
    </section>

    <section id="revision" class="inspection-banner" aria-labelledby="inspection-title" data-promotion>
      <div class="inspection-number" aria-hidden="true">{{ freeInspectionPromotion.durationHours }}h</div>
      <div>
        <p class="section-kicker">{{ t.promotion.kicker }}</p>
        <h2 id="inspection-title">{{ t.promotion.title }}</h2>
        <p>{{ text(t.promotion.summary, { minimumLength: freeInspectionPromotion.minimumLength, region: freeInspectionPromotion.region }) }}</p>
      </div>
      <div class="inspection-value">
        <span>{{ t.promotion.valueLabel }}</span>
        <strong>{{ freeInspectionPromotion.reportValue }} €</strong>
        <em>{{ text(t.promotion.valueMeta, { slotLimit: freeInspectionPromotion.slotLimit }) }}</em>
        <span>{{ text(t.promotion.deadline, { deadline: promotionDeadline }) }}</span>
        <RouterLink :to="to('/bases-revision-gratuita')" data-promotion-terms>{{ t.promotion.termsCta }}</RouterLink>
      </div>
    </section>

    <section id="programas" class="programs-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">{{ t.listing.kicker }}</p>
          <h2>{{ t.listing.title }}</h2>
        </div>
        <p>{{ t.listing.intro }}</p>
      </div>

      <ProgramLengthSelector v-model="selectedLength" :lengths="lengths" />

      <div class="programs-live-region" aria-live="polite">
        <div class="program-grid">
          <ProgramCard
            v-for="program in individualPrograms"
            :key="program.id"
            :program="program"
            :length="selectedLength"
          />
        </div>

        <ProgramCard :program="completeProgram" :length="selectedLength" :savings="savings" />
      </div>

      <p class="pricing-disclaimer">
        {{ t.pricingDisclaimer }}
      </p>
    </section>

    <section class="comparison-section" aria-labelledby="comparison-title">
      <div class="section-heading compact">
        <div>
          <p class="section-kicker">{{ t.comparison.kicker }}</p>
          <h2 id="comparison-title">{{ t.comparison.title }}</h2>
        </div>
        <p>{{ t.comparison.intro }}</p>
      </div>

      <div class="comparison" role="table" :aria-label="t.comparison.ariaLabel">
        <div class="comparison-row comparison-header" role="row">
          <span role="columnheader">{{ t.comparison.need }}</span>
          <span v-for="program in programs" :key="program.id" role="columnheader">{{ t.programs[program.id].name }}</span>
        </div>
        <div v-for="row in comparisonRows" :key="row.label" class="comparison-row" role="row">
          <strong role="rowheader">{{ row.label }}</strong>
          <span
            v-for="(value, index) in row.values"
            :key="index"
            role="cell"
            :data-program-label="t.programs[programs[index].id].name"
            :class="{ included: value === t.comparison.included }"
          >
            {{ value }}
          </span>
        </div>
      </div>
    </section>

    <section class="proof-section">
      <div class="guarantee-panel">
        <span class="guarantee-days">{{ commercialConditions.guarantee.maximumRepeats }}×</span>
        <div>
          <p class="section-kicker">{{ t.guarantee.kicker }}</p>
          <h2>{{ t.guarantee.title }}</h2>
          <p>{{ text(t.guarantee.body, { maximumRepeats: commercialConditions.guarantee.maximumRepeats, claimDeadlineDays: commercialConditions.guarantee.claimDeadlineDays }) }}</p>
        </div>
      </div>

      <figure class="testimonial-panel">
        <img
          :src="programVisuals.care.src"
          :alt="t.guarantee.imageAlt"
          :width="programVisuals.care.width"
          :height="programVisuals.care.height"
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          <blockquote>
            {{ t.case.quote }}
          </blockquote>
          <p><strong>{{ t.case.label }}</strong><br />{{ t.case.caption }}</p>
        </figcaption>
      </figure>
    </section>

    <section id="contacto" class="contact-section">
      <p class="section-kicker">{{ t.finalCta.kicker }}</p>
      <h2>{{ t.finalCta.title }}</h2>
      <p>{{ t.finalCta.body }}</p>
      <button type="button" class="button button-light" data-booking-cta="services-final" @click="openGeneralBooking">
        {{ t.finalCta.button }}
      </button>
      <div class="contact-details">
        <span>boat-solutions.es</span>
        <span>676 625 595</span>
        <span>info@boat-solutions.es</span>
      </div>
    </section>
  </div>
</template>
