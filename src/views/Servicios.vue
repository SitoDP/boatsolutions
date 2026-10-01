<script setup lang="ts">
import { computed } from 'vue'
import ProgramLengthSelector from '../components/ProgramLengthSelector.vue'
import ProgramCard from '../components/ProgramCard.vue'
import { useProgramBooking } from '../composables/useProgramBooking'
import { useProgramSelection } from '../composables/useProgramSelection'
import { commercialConditions } from '../data/programCommercialConditions'
import { calculateBundleSavings, lengths, programs } from '../data/programs'
import { programVisuals } from '../data/programVisuals'
import { freeInspectionPromotion } from '../data/programPromotion'
import '../styles/programs.css'
import '../styles/program-services.css'

const { selectedLength } = useProgramSelection()
const { open } = useProgramBooking()
const individualPrograms = computed(() => programs.filter((program) => !program.highlighted))
const completeProgram = computed(() => programs.find((program) => program.highlighted)!)
const savings = computed(() => calculateBundleSavings(selectedLength.value))
const promotionDeadline = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${freeInspectionPromotion.bookingDeadline}T00:00:00Z`))

function openGeneralBooking() {
  open({ programId: null, length: selectedLength.value })
}

const comparisonRows = [
  { label: 'Responsable y seguimiento anual', values: ['Incluido', '—', '—', 'Incluido'] },
  { label: 'Auditoría eléctrica y electrónica', values: ['—', 'Incluido', '—', 'Incluido'] },
  { label: 'Dos limpiezas completas al año', values: ['—', '—', 'Incluido', 'Incluido'] },
  { label: 'Comprobación previa a la salida', values: ['—', 'Incluido', '—', 'Incluido'] },
  { label: 'Informe anual de la embarcación', values: ['Incluido', '—', '—', 'Incluido'] },
]
</script>

<template>
  <main class="programs-surface">
    <section id="inicio" class="hero-section">
      <div class="hero-copy">
        <p class="campaign-date">Programas anuales para cuidar tu embarcación</p>
        <h1>Tú navegas.<br />Nosotros nos ocupamos.</h1>
        <p class="hero-lead">
          Mantenimiento, electrónica y limpieza coordinados en Rías Baixas, con una cuota mensual e IVA incluido.
        </p>
        <div class="hero-actions">
          <a href="#programas" class="button button-primary">Ver programas y precios</a>
          <a href="#revision" class="text-link">Cómo funciona la revisión gratuita</a>
        </div>
      </div>
      <div class="hero-visual">
        <img
          :src="programVisuals.complete.src"
          alt="Velero preparado para navegar por la ría"
          :width="programVisuals.complete.width"
          :height="programVisuals.complete.height"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
        <div class="hero-caption">
          <span>Una sola persona de contacto</span>
          <strong>Todo coordinado para que puedas salir a navegar</strong>
        </div>
      </div>
    </section>

    <section id="revision" class="inspection-banner" aria-labelledby="inspection-title" data-promotion>
      <div class="inspection-number" aria-hidden="true">{{ freeInspectionPromotion.durationHours }}h</div>
      <div>
        <p class="section-kicker">Tu punto de partida</p>
        <h2 id="inspection-title">Una hora de revisión gratuita a bordo</h2>
        <p>
          Recibe un informe escrito, sin obligación de contratar. Para embarcaciones de
          {{ freeInspectionPromotion.minimumLength }} pies o más en {{ freeInspectionPromotion.region }}.
        </p>
      </div>
      <div class="inspection-value">
        <span>Valor del informe</span>
        <strong>{{ freeInspectionPromotion.reportValue }} €</strong>
        <em>IVA incluido · {{ freeInspectionPromotion.slotLimit }} plazas</em>
        <span>Reserva antes del {{ promotionDeadline }}</span>
        <RouterLink to="/bases-revision-gratuita" data-promotion-terms>Consultar las bases</RouterLink>
      </div>
    </section>

    <section id="programas" class="programs-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">Cuota mensual · IVA incluido</p>
          <h2>Elige cuánto quieres delegar</h2>
        </div>
        <p>Empieza por una necesidad concreta o reúne todo el cuidado de tu embarcación en un solo programa.</p>
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
        Cuotas mensuales con IVA incluido para la eslora seleccionada. Los materiales, repuestos y trabajos externos requieren presupuesto y aprobación previa.
      </p>
    </section>

    <section class="comparison-section" aria-labelledby="comparison-title">
      <div class="section-heading compact">
        <div>
          <p class="section-kicker">Comparación rápida</p>
          <h2 id="comparison-title">Una decisión fácil de entender</h2>
        </div>
        <p>Compara las prestaciones principales. Las horas disponibles cambian con la eslora seleccionada.</p>
      </div>

      <div class="comparison" role="table" aria-label="Comparación de programas">
        <div class="comparison-row comparison-header" role="row">
          <span role="columnheader">Qué necesitas</span>
          <span v-for="program in programs" :key="program.id" role="columnheader">{{ program.name }}</span>
        </div>
        <div v-for="row in comparisonRows" :key="row.label" class="comparison-row" role="row">
          <strong role="rowheader">{{ row.label }}</strong>
          <span
            v-for="(value, index) in row.values"
            :key="index"
            role="cell"
            :class="{ included: value === 'Incluido' }"
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
          <p class="section-kicker">Garantía de servicio</p>
          <h2>Repetimos el trabajo si el resultado no cumple.</h2>
          <p>
            La auditoría, limpieza o solución del proveedor afectada puede repetirse hasta
            {{ commercialConditions.guarantee.maximumRepeats }} veces. Comunica la reclamación por escrito dentro de los
            {{ commercialConditions.guarantee.claimDeadlineDays }} días siguientes.
          </p>
        </div>
      </div>

      <figure class="testimonial-panel">
        <img
          :src="programVisuals.care.src"
          alt="Embarcaciones protegidas en un varadero cubierto"
          :width="programVisuals.care.width"
          :height="programVisuals.care.height"
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          <blockquote>
            Un plan de invierno coordinó a varios especialistas, comparó varaderos y permitió elegir una plaza interior con mejor precio y botadura flexible.
          </blockquote>
          <p><strong>Caso real anonimizado</strong><br />Dos embarcaciones, una sola planificación</p>
        </figcaption>
      </figure>
    </section>

    <section id="contacto" class="contact-section">
      <p class="section-kicker">Revisión inicial gratuita · una hora</p>
      <h2>Empieza por conocer el estado real de tu embarcación.</h2>
      <p>Elige una fecha y una hora preferidas. Boat Solutions confirmará personalmente la disponibilidad.</p>
      <button type="button" class="button button-light" data-booking-cta="services-final" @click="openGeneralBooking">
        Solicitar revisión gratuita
      </button>
      <div class="contact-details">
        <span>boat-solutions.es</span>
        <span>676 625 595</span>
        <span>info@boat-solutions.es</span>
      </div>
    </section>
  </main>
</template>
