<script setup lang="ts">
import { freeInspectionPromotion as promotion } from '../data/programPromotion'
import '../styles/programs.css'

const durationLabel = promotion.durationHours === 1
  ? 'Una hora'
  : `${promotion.durationHours} horas`

const formattedDeadline = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${promotion.bookingDeadline}T00:00:00Z`))
</script>

<template>
  <main class="programs-surface promotion-terms">
    <header class="promotion-terms__header">
      <p class="section-kicker">Revisión gratuita</p>
      <h1>Bases de la promoción</h1>
      <p>
        Solicita una revisión general de tu embarcación, con informe escrito. Sin obligación de contratar.
      </p>
    </header>

    <section aria-labelledby="promotion-conditions-title">
      <h2 id="promotion-conditions-title">Condiciones de la revisión</h2>
      <ul class="promotion-terms__conditions">
        <li data-promotion-condition>
          {{ durationLabel }} de revisión general a bordo. Al finalizar recibirás un informe escrito.
        </li>
        <li data-promotion-condition>
          El servicio tiene un valor de {{ promotion.reportValue }} €, IVA incluido.
        </li>
        <li data-promotion-condition>
          La promoción está limitada a {{ promotion.slotLimit }} plazas.
        </li>
        <li data-promotion-condition>
          Disponible para embarcaciones de {{ promotion.minimumLength }} pies o más.
        </li>
        <li data-promotion-condition>
          El servicio se presta exclusivamente en {{ promotion.region }}.
        </li>
        <li data-promotion-condition>
          La reserva debe solicitarse antes del {{ formattedDeadline }}.
        </li>
        <li v-if="promotion.perOwnerAndBoat" data-promotion-condition>
          Una revisión por propietario y embarcación.
        </li>
      </ul>
    </section>

    <section aria-labelledby="promotion-privacy-title">
      <h2 id="promotion-privacy-title">Privacidad</h2>
      <p>
        El tratamiento de tus datos se rige por nuestra
        <a href="https://boat-solutions.es/politica-de-privacidad">Política de Privacidad</a>.
      </p>
    </section>
  </main>
</template>
