<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { usePageMeta } from '../composables/useMeta'
import { useProgramBooking } from '../composables/useProgramBooking'
import { freeInspectionPromotion as promotion } from '../data/programPromotion'
import { i18n } from '../i18n'
import '../styles/programs.css'
import '../styles/promotion-terms.css'

const { lang, to, useT } = useLanguage()
const { open: openBooking } = useProgramBooking()
const t = useT('promotion')
const durationLabel = computed(() => promotion.durationHours === 1
  ? t.value.durationOne
  : t.value.durationMany.replace('{durationHours}', String(promotion.durationHours)))

const formattedDeadline = computed(() => new Intl.DateTimeFormat(lang.value === 'en' ? 'en-GB' : 'es-ES', {
  day: '2-digit',
  month: '2-digit',
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

function requestInspection() {
  openBooking({ programId: null, length: promotion.minimumLength })
}
</script>

<template>
  <div class="programs-surface promotion-terms">
    <header class="promotion-terms__hero" data-promotion-hero>
      <div class="promotion-terms__hero-inner">
        <RouterLink class="promotion-terms__back" :to="to('/servicios')">{{ t.backToPrograms }}</RouterLink>
        <div class="promotion-terms__hero-copy">
          <p class="section-kicker">{{ t.kicker }}</p>
          <h1>{{ t.title }}</h1>
          <p>{{ t.intro }}</p>
        </div>

        <div class="promotion-terms__summary" data-promotion-summary-group :aria-label="t.summaryAria">
          <article data-promotion-summary>
            <strong>{{ durationLabel }}</strong>
            <span>{{ t.summaryDuration }}</span>
          </article>
          <article data-promotion-summary>
            <strong>{{ promotion.reportValue }} €</strong>
            <span>{{ t.summaryValue }}</span>
          </article>
          <article data-promotion-summary>
            <strong>{{ promotion.slotLimit }}</strong>
            <span>{{ t.summarySlots }}</span>
          </article>
        </div>
      </div>
    </header>

    <main class="promotion-terms__layout" data-promotion-layout>
      <section class="promotion-terms__conditions-section" aria-labelledby="promotion-conditions-title">
        <p class="section-kicker">{{ t.kicker }}</p>
        <h2 id="promotion-conditions-title">{{ t.conditionsTitle }}</h2>
        <p class="promotion-terms__conditions-intro">{{ t.conditionsIntro }}</p>
        <ol class="promotion-terms__conditions">
          <li data-promotion-condition>
            <span aria-hidden="true">01</span>
            <p>{{ text(t.conditions.duration, { durationLabel }) }}</p>
          </li>
          <li data-promotion-condition>
            <span aria-hidden="true">02</span>
            <p>{{ text(t.conditions.value, { reportValue: promotion.reportValue }) }}</p>
          </li>
          <li data-promotion-condition>
            <span aria-hidden="true">03</span>
            <p>{{ text(t.conditions.slots, { slotLimit: promotion.slotLimit }) }}</p>
          </li>
          <li data-promotion-condition>
            <span aria-hidden="true">04</span>
            <p>{{ text(t.conditions.minimumLength, { minimumLength: promotion.minimumLength }) }}</p>
          </li>
          <li data-promotion-condition>
            <span aria-hidden="true">05</span>
            <p>{{ text(t.conditions.region, { region: promotion.region }) }}</p>
          </li>
          <li data-promotion-condition>
            <span aria-hidden="true">06</span>
            <p>{{ text(t.conditions.deadline, { deadline: formattedDeadline }) }}</p>
          </li>
          <li v-if="promotion.perOwnerAndBoat" data-promotion-condition>
            <span aria-hidden="true">07</span>
            <p>{{ t.conditions.onePerOwnerAndBoat }}</p>
          </li>
        </ol>
      </section>

      <aside class="promotion-terms__sidebar" aria-labelledby="promotion-sidebar-title">
        <p class="section-kicker">{{ t.sidebarKicker }}</p>
        <h2 id="promotion-sidebar-title">{{ t.sidebarTitle }}</h2>
        <p>{{ t.sidebarIntro }}</p>
        <dl>
          <div>
            <dt>{{ t.deadlineLabel }}</dt>
            <dd>{{ formattedDeadline }}</dd>
          </div>
          <div>
            <dt>{{ t.regionLabel }}</dt>
            <dd>{{ promotion.region }}</dd>
          </div>
          <div>
            <dt>{{ t.minimumLengthLabel }}</dt>
            <dd>{{ text(t.feetOrMore, { minimumLength: promotion.minimumLength }) }}</dd>
          </div>
        </dl>
        <button class="button promotion-terms__booking" type="button" data-booking-cta="promotion-terms" @click="requestInspection">
          {{ t.bookingCta }}
        </button>
      </aside>
    </main>

    <section class="promotion-terms__privacy" aria-labelledby="promotion-privacy-title">
      <div>
        <p class="section-kicker">{{ t.privacyTitle }}</p>
        <h2 id="promotion-privacy-title">{{ t.privacyTitle }}</h2>
      </div>
      <p>
        {{ t.privacyPrefix }}
        <RouterLink :to="to('/politica-de-privacidad')">{{ t.privacyLink }}</RouterLink>.
      </p>
    </section>
  </div>
</template>
