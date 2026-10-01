<script setup lang="ts">
import ProgramLengthSelector from './ProgramLengthSelector.vue'
import type { CommercialConditions } from '../data/programCommercialConditions'
import { formatIncludedHours, type BoatLength, type Program } from '../data/programs'

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
</script>

<template>
  <section class="program-conditions" data-detail-conditions aria-labelledby="program-conditions-title">
    <div class="detail-section-heading">
      <p class="section-kicker">Cuota y condiciones</p>
      <h2 id="program-conditions-title">Todo claro desde el principio</h2>
    </div>
    <div class="program-conditions-price">
      <span>Hasta {{ props.length }} pies</span>
      <p><strong data-detail-price>{{ props.program.prices[props.length] }} €</strong> <small>/ mes</small></p>
      <p data-detail-hours>{{ formatIncludedHours(props.program.includedHours[props.length]) }} incluidas al mes</p>
      <p v-if="props.conditions.allPricesIncludeVat">IVA incluido</p>
    </div>
    <ProgramLengthSelector
      :model-value="props.length"
      :lengths="props.lengths"
      @update:model-value="emit('update:length', $event)"
    />
    <div class="program-conditions-grid">
      <article>
        <h3>Contrato y horas</h3>
        <ul>
          <li>Contrato de {{ props.conditions.contract.durationMonths }} meses con cuota fija.</li>
          <li>Renovación automática por {{ props.conditions.renewal.durationMonths }} meses salvo aviso escrito con {{ props.conditions.renewal.noticeDays }} días de antelación.</li>
          <li v-if="props.conditions.renewal.reminderBeforeRenewal">Enviaremos un recordatorio antes de la renovación.</li>
          <li>Las horas se acumulan durante el año contractual y caducan al finalizarlo.</li>
          <li>Horas adicionales: {{ props.conditions.additionalHours.hourlyRate }} €/h, IVA incluido.</li>
        </ul>
      </article>
      <article>
        <h3>Servicio y garantía</h3>
        <ul>
          <li>Materiales, repuestos y trabajos externos requieren presupuesto y aprobación previa.</li>
          <li>{{ props.conditions.secondBoat.discountPercent }} % de descuento para una segunda embarcación del mismo cliente.</li>
          <li>Asistencia por teléfono o vídeo y diagnóstico presencial en un máximo de {{ props.conditions.assistance.onSiteDiagnosisWithinBusinessHours }} horas laborables.</li>
          <li>La garantía permite repetir hasta {{ props.conditions.guarantee.maximumRepeats }} veces la auditoría, limpieza o solución de proveedor afectada.</li>
          <li>La reclamación debe hacerse por escrito dentro de los {{ props.conditions.guarantee.claimDeadlineDays }} días siguientes.</li>
        </ul>
      </article>
    </div>
    <article class="program-withdrawal-condition">
      <h3>Derecho de desistimiento</h3>
      <p v-if="props.conditions.withdrawal.requiresLegalReview" class="program-legal-review" data-legal-review role="note">
        Redacción pendiente de revisión jurídica antes de publicación.
      </p>
      <p>
        En contratos a distancia o fuera del establecimiento dispones de
        {{ props.conditions.withdrawal.periodDays }} días naturales para comunicar el desistimiento a
        <a :href="`mailto:${props.conditions.withdrawal.contactEmail}`">{{ props.conditions.withdrawal.contactEmail }}</a>.
      </p>
      <p>La devolución se realizará dentro de los {{ props.conditions.withdrawal.refundDeadlineDays }} días siguientes a la comunicación.</p>
      <p v-if="props.conditions.withdrawal.proportionalChargeForEarlyStart">Si solicitas que el servicio empiece antes, se aplicará el cobro proporcional de lo ya prestado.</p>
      <p v-if="props.conditions.withdrawal.rightEndsAfterFullPerformance">La pérdida del derecho tras la ejecución completa requiere solicitud y reconocimiento expresos.</p>
    </article>
    <div class="program-specific-conditions">
      <h3>Condiciones específicas de este programa</h3>
      <ul>
        <li v-for="condition in props.specificConditions" :key="condition">{{ condition }}</li>
      </ul>
    </div>
  </section>
</template>
