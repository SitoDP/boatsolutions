<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProgramConditions from '../components/ProgramConditions.vue'
import ProgramFaq from '../components/ProgramFaq.vue'
import { commercialConditions } from '../data/programCommercialConditions'
import { calculateBundleSavings, lengths, programs, type ProgramId } from '../data/programs'
import { programVisuals } from '../data/programVisuals'
import { useProgramBooking } from '../composables/useProgramBooking'
import { useLanguage } from '../composables/useLanguage'
import { usePageMeta } from '../composables/useMeta'
import { programsI18n } from '../i18n/programs'
import { useProgramSelection } from '../composables/useProgramSelection'
import '../styles/programs.css'
import '../styles/program-detail.css'

const props = defineProps<{ programId: ProgramId }>()
const { selectedLength } = useProgramSelection()
const { open } = useProgramBooking()
const { to, useT } = useLanguage()
const t = useT('programs')
const details = useT('programDetails')
const programIndex = computed(() => programs.findIndex((item) => item.id === props.programId))
const program = computed(() => programs[programIndex.value])
const programCopy = computed(() => t.value.programs[props.programId])
const detail = computed(() => details.value[props.programId])
const visual = computed(() => programVisuals[props.programId])
const previous = computed(() => programs[(programIndex.value - 1 + programs.length) % programs.length])
const next = computed(() => programs[(programIndex.value + 1) % programs.length])
const savings = computed(() => props.programId === 'complete' ? calculateBundleSavings(selectedLength.value) : null)

usePageMeta(computed(() => ({
  es: {
    title: programsI18n.es.meta.details[props.programId].title,
    description: programsI18n.es.meta.details[props.programId].description,
  },
  en: {
    title: programsI18n.en.meta.details[props.programId].title,
    description: programsI18n.en.meta.details[props.programId].description,
  },
})))

function text(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce((result, [key, value]) => result.split(`{${key}}`).join(String(value)), template)
}

function openProgramBooking() {
  open({ programId: props.programId, length: selectedLength.value })
}
</script>

<template>
  <main class="programs-surface detail-page detail-page-real" :class="`detail-${program.id}`">
    <section class="detail-hero" data-detail-hero>
      <div class="detail-hero-copy">
        <RouterLink :to="to('/servicios#programas')" class="back-link">{{ t.detail.backToPrograms }}</RouterLink>
        <p class="program-category">{{ programCopy.shortName }}</p>
        <h1>{{ programCopy.name }}</h1>
        <p class="detail-promise">{{ detail.promise }}</p>
        <p class="detail-subtitle">{{ detail.subtitle }}</p>
        <button type="button" class="button button-light" data-booking-cta="detail-hero" @click="openProgramBooking">{{ t.detail.bookFree }}</button>
      </div>
      <div class="detail-hero-visual">
        <img :src="visual.src" :alt="programCopy.imageAlt" :width="visual.width" :height="visual.height" loading="eager" decoding="async" fetchpriority="high" />
        <div class="detail-marker">
          <span>{{ t.detail.programLabel }}</span>
          <strong>{{ String(programIndex + 1).padStart(2, '0') }} / 04</strong>
        </div>
      </div>
    </section>

    <section class="detail-problem detail-content-section" data-detail-problem>
      <div>
        <p class="section-kicker">{{ t.detail.problem.kicker }}</p>
        <h2>{{ t.detail.problem.title }}</h2>
      </div>
      <p>{{ detail.problem }}</p>
    </section>

    <section class="detail-fit" data-detail-fit>
      <article>
        <p class="section-kicker">{{ t.detail.fit.forWhom }}</p>
        <h2>{{ t.detail.fit.yesTitle }}</h2>
        <ul><li v-for="item in detail.audience" :key="item">{{ item }}</li></ul>
      </article>
      <article>
        <p class="section-kicker">{{ t.detail.fit.notForWhom }}</p>
        <h2>{{ t.detail.fit.noTitle }}</h2>
        <ul><li v-for="item in detail.notFor" :key="item">{{ item }}</li></ul>
      </article>
    </section>

    <section class="detail-included" data-detail-included>
      <div class="detail-included-heading">
        <p class="section-kicker">{{ t.detail.included.kicker }}</p>
        <h2>{{ t.detail.included.title }}</h2>
      </div>
      <ol>
        <li v-for="(item, index) in detail.included" :key="item">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <strong>{{ item }}</strong>
        </li>
      </ol>
    </section>

    <section class="detail-workflow" data-detail-workflow>
      <div class="detail-section-heading">
        <p class="section-kicker">{{ t.detail.workflow.kicker }}</p>
        <h2>{{ t.detail.workflow.title }}</h2>
      </div>
      <div class="detail-workflow-grid">
        <article v-for="(step, index) in detail.workflow" :key="step.title">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </article>
      </div>
    </section>

    <section class="detail-benefits detail-list-section" data-detail-benefits>
      <div class="detail-section-heading">
        <p class="section-kicker">{{ t.detail.benefits.kicker }}</p>
        <h2>{{ t.detail.benefits.title }}</h2>
      </div>
      <ul><li v-for="benefit in detail.benefits" :key="benefit">{{ benefit }}</li></ul>
    </section>

    <section class="detail-exclusions detail-list-section" data-detail-exclusions>
      <div class="detail-section-heading">
        <p class="section-kicker">{{ t.detail.exclusions.kicker }}</p>
        <h2>{{ t.detail.exclusions.title }}</h2>
      </div>
      <ul><li v-for="exclusion in detail.exclusions" :key="exclusion">{{ exclusion }}</li></ul>
    </section>

    <section v-if="detail.caseStudy" class="detail-case" data-detail-case>
      <div class="detail-section-heading">
        <p class="section-kicker">{{ t.detail.case.kicker }}</p>
        <h2>{{ t.detail.case.title }}</h2>
      </div>
      <div>
        <p>{{ detail.caseStudy.context }}</p>
        <p>{{ detail.caseStudy.action }}</p>
        <p v-if="detail.caseStudy.outcome">{{ detail.caseStudy.outcome }}</p>
      </div>
    </section>

    <ProgramConditions
      v-model:length="selectedLength"
      :program="program"
      :lengths="lengths"
      :conditions="commercialConditions"
      :specific-conditions="detail.specificConditions"
    />

    <section v-if="savings" class="detail-saving-callout" data-detail-savings>
      <p class="section-kicker">{{ t.detail.saving.kicker }}</p>
      <h2>{{ text(t.detail.saving.title, { savings: savings ?? 0 }) }}</h2>
      <p>{{ text(t.detail.saving.body, { length: selectedLength }) }}</p>
    </section>

    <ProgramFaq :items="detail.faq" />

    <section class="detail-final-cta" data-detail-cta>
      <p class="section-kicker">{{ t.detail.final.kicker }}</p>
      <h2>{{ t.detail.final.title }}</h2>
      <button type="button" class="button button-light" data-booking-cta="detail-final" @click="openProgramBooking">{{ t.detail.bookFree }}</button>
    </section>

    <nav class="program-pagination" :aria-label="t.detail.pagination.ariaLabel">
      <RouterLink :to="to(`/programas/${previous.slug}`)"><small>{{ t.detail.pagination.previous }}</small><strong>{{ t.programs[previous.id].name }}</strong></RouterLink>
      <RouterLink :to="to(`/programas/${next.slug}`)"><small>{{ t.detail.pagination.next }}</small><strong>{{ t.programs[next.id].name }}</strong></RouterLink>
    </nav>
  </main>
</template>
