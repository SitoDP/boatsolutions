<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useProgramBooking } from '../composables/useProgramBooking'
import { programDetails } from '../data/programDetails'
import { formatIncludedHours, type BoatLength, type Program } from '../data/programs'

const props = defineProps<{
  program: Program
  length: BoatLength
  savings?: number
}>()

const includedFeatures = computed(() => programDetails[props.program.id].included.slice(0, 4))
const additionalService = computed(() => (
  props.program.id === 'ready' ? programDetails.ready.exclusions[0] : null
))
const { open } = useProgramBooking()

function openBooking() {
  open({ programId: props.program.id, length: props.length })
}
</script>

<template>
  <article
    class="program-card"
    :class="{ featured: program.highlighted }"
    :data-program="program.id"
    :data-price="program.prices[length]"
    :data-hours="formatIncludedHours(program.includedHours[length])"
    :data-savings="savings"
  >
    <template v-if="program.highlighted">
      <div class="featured-intro" data-featured-intro>
        <p class="program-category">{{ program.shortName }}</p>
        <h3>{{ program.name }}</h3>
        <p class="recommended">La opción completa</p>
        <p class="program-description">{{ program.description }}</p>
      </div>

      <div class="featured-offer" data-featured-offer>
        <div class="price-block">
          <span class="price-prefix">Cuota mensual</span>
          <strong>{{ program.prices[length] }} €</strong>
          <span class="price-period">/ mes</span>
        </div>
        <p class="program-conditions">
          {{ formatIncludedHours(program.includedHours[length]) }} disponibles al mes · IVA incluido
        </p>
        <p v-if="savings" class="savings" data-savings>
          Ahorras {{ savings }} €/mes frente a contratar los programas por separado.
        </p>
      </div>

      <ul data-featured-benefits data-program-included>
        <li v-for="feature in includedFeatures" :key="feature">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" /></svg>
          <span>{{ feature }}</span>
        </li>
      </ul>

      <div class="card-actions">
        <RouterLink :to="`/programas/${program.slug}`" class="card-cta">Ver programa completo</RouterLink>
        <button
          type="button"
          class="card-booking"
          :data-booking-cta="`card-${program.id}`"
          @click="openBooking"
        >
          Solicitar revisión
        </button>
      </div>
    </template>

    <template v-else>
      <div class="card-heading">
        <div>
          <p class="program-category">{{ program.shortName }}</p>
          <h3>{{ program.name }}</h3>
        </div>
      </div>

      <p class="program-description">{{ program.description }}</p>

      <div class="price-block">
        <span class="price-prefix">Cuota mensual</span>
        <strong>{{ program.prices[length] }} €</strong>
        <span class="price-period">/ mes</span>
      </div>
      <p class="program-conditions">
        {{ formatIncludedHours(program.includedHours[length]) }} disponibles al mes · IVA incluido
      </p>
      <p v-if="program.hoursNote" class="program-hours-note" data-program-hours-note>
        {{ program.hoursNote }}
      </p>

      <ul data-program-included>
        <li v-for="feature in includedFeatures" :key="feature">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" /></svg>
          <span>{{ feature }}</span>
        </li>
      </ul>

      <p v-if="additionalService" class="program-additional" data-program-additional>
        {{ additionalService }}
      </p>

      <div class="card-actions">
        <RouterLink :to="`/programas/${program.slug}`" class="card-cta">Ver programa</RouterLink>
        <button
          type="button"
          class="card-booking"
          :data-booking-cta="`card-${program.id}`"
          @click="openBooking"
        >
          Solicitar revisión
        </button>
      </div>
    </template>
  </article>
</template>
