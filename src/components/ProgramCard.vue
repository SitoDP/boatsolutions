<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useProgramBooking } from '../composables/useProgramBooking'
import { useLanguage } from '../composables/useLanguage'
import { type BoatLength, type Program } from '../data/programs'

const props = defineProps<{
  program: Program
  length: BoatLength
  savings?: number
}>()

const { lang, to, useT } = useLanguage()
const t = useT('programs')
const details = useT('programDetails')
const copy = computed(() => t.value.programs[props.program.id])
const includedFeatures = computed(() => details.value[props.program.id].included.slice(0, 4))
const additionalService = computed(() => (
  props.program.id === 'ready' ? details.value.ready.exclusions[0] : null
))
const { open } = useProgramBooking()

function openBooking() {
  open({ programId: props.program.id, length: props.length })
}

function hours(value: number) {
  return `${new Intl.NumberFormat(lang.value === 'en' ? 'en-GB' : 'es-ES', { maximumFractionDigits: 1 }).format(value)} h`
}

function text(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce((result, [key, value]) => result.split(`{${key}}`).join(String(value)), template)
}
</script>

<template>
  <article
    class="program-card"
    :class="{ featured: program.highlighted }"
    :data-program="program.id"
    :data-price="program.prices[length]"
    :data-hours="hours(program.includedHours[length])"
    :data-savings="savings"
  >
    <template v-if="program.highlighted">
      <div class="featured-intro" data-featured-intro>
        <p class="program-category">{{ copy.shortName }}</p>
        <h3>{{ copy.name }}</h3>
        <p class="recommended">{{ t.card.recommended }}</p>
        <p class="program-description">{{ copy.description }}</p>
      </div>

      <div class="featured-offer" data-featured-offer>
        <div class="price-block">
          <span class="price-prefix">{{ t.card.monthlyFee }}</span>
          <strong>{{ program.prices[length] }} €</strong>
          <span class="price-period">{{ t.card.perMonth }}</span>
        </div>
        <p class="program-card-conditions">
          {{ text(t.card.hoursAvailable, { hours: hours(program.includedHours[length]) }) }}
        </p>
        <p v-if="savings" class="savings" data-savings>
          {{ text(t.card.savings, { savings: savings ?? 0 }) }}
        </p>
      </div>

      <ul data-featured-benefits data-program-included>
        <li v-for="feature in includedFeatures" :key="feature">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" /></svg>
          <span>{{ feature }}</span>
        </li>
      </ul>

      <div class="card-actions">
        <RouterLink :to="to(`/programas/${program.slug}`)" class="card-cta">{{ t.card.viewComplete }}</RouterLink>
        <button
          type="button"
          class="card-booking"
          :data-booking-cta="`card-${program.id}`"
          @click="openBooking"
        >
          {{ t.card.requestInspection }}
        </button>
      </div>
    </template>

    <template v-else>
      <div class="card-heading">
        <div>
          <p class="program-category">{{ copy.shortName }}</p>
          <h3>{{ copy.name }}</h3>
        </div>
      </div>

      <p class="program-description">{{ copy.description }}</p>

      <div class="price-block">
        <span class="price-prefix">{{ t.card.monthlyFee }}</span>
        <strong>{{ program.prices[length] }} €</strong>
        <span class="price-period">{{ t.card.perMonth }}</span>
      </div>
      <p class="program-card-conditions">
        {{ text(t.card.hoursAvailable, { hours: hours(program.includedHours[length]) }) }}
      </p>
      <p v-if="copy.hoursNote" class="program-hours-note" data-program-hours-note>
        {{ copy.hoursNote }}
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
        <RouterLink :to="to(`/programas/${program.slug}`)" class="card-cta">{{ t.card.view }}</RouterLink>
        <button
          type="button"
          class="card-booking"
          :data-booking-cta="`card-${program.id}`"
          @click="openBooking"
        >
          {{ t.card.requestInspection }}
        </button>
      </div>
    </template>
  </article>
</template>
