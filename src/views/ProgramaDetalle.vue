<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProgramConditions from '../components/ProgramConditions.vue'
import ProgramFaq from '../components/ProgramFaq.vue'
import { commercialConditions } from '../data/programCommercialConditions'
import { calculateBundleSavings, lengths, programs, type ProgramId } from '../data/programs'
import { programDetails } from '../data/programDetails'
import { programVisuals } from '../data/programVisuals'
import { useProgramBooking } from '../composables/useProgramBooking'
import { useProgramSelection } from '../composables/useProgramSelection'
import '../styles/programs.css'
import '../styles/program-detail.css'

const props = defineProps<{ programId: ProgramId }>()
const { selectedLength } = useProgramSelection()
const { open } = useProgramBooking()
const programIndex = computed(() => programs.findIndex((item) => item.id === props.programId))
const program = computed(() => programs[programIndex.value])
const detail = computed(() => programDetails[props.programId])
const visual = computed(() => programVisuals[props.programId])
const previous = computed(() => programs[(programIndex.value - 1 + programs.length) % programs.length])
const next = computed(() => programs[(programIndex.value + 1) % programs.length])
const savings = computed(() => props.programId === 'complete' ? calculateBundleSavings(selectedLength.value) : null)

function openProgramBooking() {
  open({ programId: props.programId, length: selectedLength.value })
}
</script>

<template>
  <main class="programs-surface detail-page detail-page-real" :class="`detail-${program.id}`">
    <section class="detail-hero" data-detail-hero>
      <div class="detail-hero-copy">
        <RouterLink to="/servicios#programas" class="back-link">Todos los programas</RouterLink>
        <p class="program-category">{{ program.shortName }}</p>
        <h1>{{ program.name }}</h1>
        <p class="detail-promise">{{ detail.promise }}</p>
        <p class="detail-subtitle">{{ detail.subtitle }}</p>
        <button type="button" class="button button-light" data-booking-cta="detail-hero" @click="openProgramBooking">Reserva tu cita gratis</button>
      </div>
      <div class="detail-hero-visual">
        <img :src="visual.src" :alt="visual.alt" :width="visual.width" :height="visual.height" loading="eager" decoding="async" fetchpriority="high" />
        <div class="detail-marker">
          <span>Programa</span>
          <strong>{{ String(programIndex + 1).padStart(2, '0') }} / 04</strong>
        </div>
      </div>
    </section>

    <section class="detail-problem detail-content-section" data-detail-problem>
      <div>
        <p class="section-kicker">El problema que resolvemos</p>
        <h2>Menos coordinación pendiente. Más tiempo para navegar.</h2>
      </div>
      <p>{{ detail.problem }}</p>
    </section>

    <section class="detail-fit" data-detail-fit>
      <article>
        <p class="section-kicker">Para quién es</p>
        <h2>Encaja contigo si…</h2>
        <ul><li v-for="item in detail.audience" :key="item">{{ item }}</li></ul>
      </article>
      <article>
        <p class="section-kicker">Para quién no es</p>
        <h2>No es la opción adecuada si…</h2>
        <ul><li v-for="item in detail.notFor" :key="item">{{ item }}</li></ul>
      </article>
    </section>

    <section class="detail-included" data-detail-included>
      <div class="detail-included-heading">
        <p class="section-kicker">Prestaciones incluidas</p>
        <h2>Qué reúne este programa</h2>
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
        <p class="section-kicker">Cómo funciona</p>
        <h2>Un proceso fácil de seguir</h2>
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
        <p class="section-kicker">Beneficios</p>
        <h2>El resultado que puedes esperar</h2>
      </div>
      <ul><li v-for="benefit in detail.benefits" :key="benefit">{{ benefit }}</li></ul>
    </section>

    <section class="detail-exclusions detail-list-section" data-detail-exclusions>
      <div class="detail-section-heading">
        <p class="section-kicker">Qué queda fuera</p>
        <h2>Sin letra pequeña</h2>
      </div>
      <ul><li v-for="exclusion in detail.exclusions" :key="exclusion">{{ exclusion }}</li></ul>
    </section>

    <section v-if="detail.caseStudy" class="detail-case" data-detail-case>
      <div class="detail-section-heading">
        <p class="section-kicker">Caso real anonimizado</p>
        <h2>Una situación concreta, gestionada de principio a fin</h2>
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
      <p class="section-kicker">El plan completo</p>
      <h2>Ahorras {{ savings }} € al mes</h2>
      <p>Frente a contratar los tres planes por separado para una embarcación de hasta {{ selectedLength }} pies.</p>
    </section>

    <ProgramFaq :items="detail.faq" />

    <section class="detail-final-cta" data-detail-cta>
      <p class="section-kicker">Empezamos a bordo</p>
      <h2>Cuéntanos qué necesita tu barco</h2>
      <button type="button" class="button button-light" data-booking-cta="detail-final" @click="openProgramBooking">Reserva tu cita gratis</button>
    </section>

    <nav class="program-pagination" aria-label="Cambiar de programa">
      <RouterLink :to="`/programas/${previous.slug}`"><small>Programa anterior</small><strong>{{ previous.name }}</strong></RouterLink>
      <RouterLink :to="`/programas/${next.slug}`"><small>Siguiente programa</small><strong>{{ next.name }}</strong></RouterLink>
    </nav>
  </main>
</template>
