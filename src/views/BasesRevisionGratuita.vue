<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { usePageMeta } from '../composables/useMeta'
import { freeInspectionPromotion as promotion } from '../data/programPromotion'
import { i18n } from '../i18n'
import '../styles/programs.css'

const { lang, to, useT } = useLanguage()
const t = useT('promotion')
const durationLabel = computed(() => promotion.durationHours === 1
  ? t.value.durationOne
  : t.value.durationMany.replace('{durationHours}', String(promotion.durationHours)))

const formattedDeadline = computed(() => new Intl.DateTimeFormat(lang.value === 'en' ? 'en-GB' : 'es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${promotion.bookingDeadline}T00:00:00Z`)))

usePageMeta(computed(() => ({
  es: i18n.es.promotion.meta,
  en: i18n.en.promotion.meta,
})))

function text(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce((result, [key, value]) => result.split(`{${key}}`).join(String(value)), template)
}
</script>

<template>
  <main class="programs-surface promotion-terms">
    <header class="promotion-terms__header">
      <p class="section-kicker">{{ t.kicker }}</p>
      <h1>{{ t.title }}</h1>
      <p>{{ t.intro }}</p>
      <p v-if="promotion.requiresLegalReview" class="program-legal-review" data-legal-review role="note">{{ t.legalReview }}</p>
    </header>

    <section aria-labelledby="promotion-conditions-title">
      <h2 id="promotion-conditions-title">{{ t.conditionsTitle }}</h2>
      <ul class="promotion-terms__conditions">
        <li data-promotion-condition>
          {{ text(t.conditions.duration, { durationLabel }) }}
        </li>
        <li data-promotion-condition>
          {{ text(t.conditions.value, { reportValue: promotion.reportValue }) }}
        </li>
        <li data-promotion-condition>
          {{ text(t.conditions.slots, { slotLimit: promotion.slotLimit }) }}
        </li>
        <li data-promotion-condition>
          {{ text(t.conditions.minimumLength, { minimumLength: promotion.minimumLength }) }}
        </li>
        <li data-promotion-condition>
          {{ text(t.conditions.region, { region: promotion.region }) }}
        </li>
        <li data-promotion-condition>
          {{ text(t.conditions.deadline, { deadline: formattedDeadline }) }}
        </li>
        <li v-if="promotion.perOwnerAndBoat" data-promotion-condition>
          {{ t.conditions.onePerOwnerAndBoat }}
        </li>
      </ul>
    </section>

    <section aria-labelledby="promotion-privacy-title">
      <h2 id="promotion-privacy-title">{{ t.privacyTitle }}</h2>
      <p>
        {{ t.privacyPrefix }}
        <RouterLink :to="to('/politica-de-privacidad')">{{ t.privacyLink }}</RouterLink>.
      </p>
    </section>
  </main>
</template>
