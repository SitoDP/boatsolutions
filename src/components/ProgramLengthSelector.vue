<script setup lang="ts">
import type { BoatLength } from '../data/programs'

defineProps<{
  lengths: BoatLength[]
  modelValue: BoatLength
}>()

const emit = defineEmits<{
  'update:modelValue': [value: BoatLength]
}>()

function label(length: BoatLength): string {
  return length === 30 ? 'Hasta 30' : String(length)
}
</script>

<template>
  <div class="length-selector" aria-label="Selecciona la eslora de tu barco">
    <p class="selector-label">¿Cuánto mide tu barco?</p>
    <div class="length-options" role="group" aria-label="Eslora en pies">
      <button
        v-for="length in lengths"
        :key="length"
        type="button"
        class="length-option"
        :class="{ active: modelValue === length }"
        :aria-pressed="modelValue === length"
        :data-length="length"
        @click="emit('update:modelValue', length)"
      >
        <span>{{ label(length) }}</span>
        <small>pies</small>
      </button>
    </div>
    <p class="selector-note">Otras esloras: diseñamos una propuesta a medida.</p>
  </div>
</template>
