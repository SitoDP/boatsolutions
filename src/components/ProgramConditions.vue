<script setup lang="ts">
import { computed } from 'vue'
import ProgramLengthSelector from './ProgramLengthSelector.vue'
import { useLanguage } from '../composables/useLanguage'
import type { CommercialConditions } from '../data/programCommercialConditions'
import { type BoatLength, type Program } from '../data/programs'

const props = defineProps<{
  program: Program
  length: BoatLength
  lengths: BoatLength[]
  conditions: CommercialConditions
  specificConditions: string[]
}>()

const emit = defineEmits<{
  'update:length': [value: BoatLength]
}>()

const { lang, useT } = useLanguage()
const t = useT('programs')

function render(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce((result, [key, value]) => result.split(`{${key}}`).join(String(value)), template)
}

function hours(value: number) {
  return `${new Intl.NumberFormat(lang.value === 'en' ? 'en-GB' : 'es-ES', { maximumFractionDigits: 1 }).format(value)} h`
}

const contractItems = computed(() => t.value.conditions.contractItems.map((item) => render(item, {
  durationMonths: props.conditions.contract.durationMonths,
  renewalMonths: props.conditions.renewal.durationMonths,
  noticeDays: props.conditions.renewal.noticeDays,
  hourlyRate: props.conditions.additionalHours.hourlyRate,
})))

const serviceItems = computed(() => t.value.conditions.serviceItems.map((item) => render(item, {
  discountPercent: props.conditions.secondBoat.discountPercent,
  businessHours: props.conditions.assistance.onSiteDiagnosisWithinBusinessHours,
  maximumRepeats: props.conditions.guarantee.maximumRepeats,
  claimDeadlineDays: props.conditions.guarantee.claimDeadlineDays,
})))

const withdrawalText = computed(() => render(t.value.conditions.withdrawalBody, {
  periodDays: props.conditions.withdrawal.periodDays,
  contactEmail: props.conditions.withdrawal.contactEmail,
}))
const withdrawalParts = computed(() => withdrawalText.value.split(props.conditions.withdrawal.contactEmail))
</script>

<template>
  <section class="program-conditions" data-detail-conditions aria-labelledby="program-conditions-title">
    <div class="detail-section-heading">
      <p class="section-kicker">{{ t.conditions.kicker }}</p>
      <h2 id="program-conditions-title">{{ t.conditions.title }}</h2>
    </div>
    <div class="program-conditions-price">
      <span>{{ render(t.conditions.upToFeet, { length: props.length }) }}</span>
      <p><strong data-detail-price>{{ props.program.prices[props.length] }} €</strong> <small>{{ t.conditions.perMonth }}</small></p>
      <p data-detail-hours>{{ render(t.conditions.includedHours, { hours: hours(props.program.includedHours[props.length]) }) }}</p>
      <p v-if="props.conditions.allPricesIncludeVat">{{ t.conditions.vatIncluded }}</p>
    </div>
    <ProgramLengthSelector
      :model-value="props.length"
      :lengths="props.lengths"
      @update:model-value="emit('update:length', $event)"
    />
    <div class="program-conditions-grid">
      <article>
        <h3>{{ t.conditions.contractTitle }}</h3>
        <ul>
          <li v-for="item in contractItems" :key="item">{{ item }}</li>
        </ul>
      </article>
      <article>
        <h3>{{ t.conditions.serviceTitle }}</h3>
        <ul>
          <li v-for="item in serviceItems" :key="item">{{ item }}</li>
        </ul>
      </article>
    </div>
    <article class="program-withdrawal-condition">
      <h3>{{ t.conditions.withdrawalTitle }}</h3>
      <p>
        {{ withdrawalParts[0] }}<a :href="`mailto:${props.conditions.withdrawal.contactEmail}`">{{ props.conditions.withdrawal.contactEmail }}</a>{{ withdrawalParts[1] }}
      </p>
      <p>{{ render(t.conditions.refund, { refundDeadlineDays: props.conditions.withdrawal.refundDeadlineDays }) }}</p>
      <p v-if="props.conditions.withdrawal.proportionalChargeForEarlyStart">{{ t.conditions.earlyStart }}</p>
      <p v-if="props.conditions.withdrawal.rightEndsAfterFullPerformance">{{ t.conditions.fullPerformance }}</p>
    </article>
    <div class="program-specific-conditions">
      <h3>{{ t.conditions.specificTitle }}</h3>
      <ul>
        <li v-for="condition in props.specificConditions" :key="condition">{{ condition }}</li>
      </ul>
    </div>
  </section>
</template>
