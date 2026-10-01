<script setup lang="ts">
import type { BoatLength } from '../data/programs'
import { useLanguage } from '../composables/useLanguage'

defineProps<{
  lengths: BoatLength[]
  modelValue: BoatLength
}>()

const emit = defineEmits<{
  'update:modelValue': [value: BoatLength]
}>()

const { useT } = useLanguage()
const t = useT('programs')

function label(length: BoatLength): string {
  return length === 30 ? t.value.lengthSelector.upTo.replace('{length}', String(length)) : String(length)
}
</script>

<template>
  <div class="length-selector" :aria-label="t.lengthSelector.ariaLabel">
    <p class="selector-label">{{ t.lengthSelector.question }}</p>
    <div class="length-options" role="group" :aria-label="t.lengthSelector.groupLabel">
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
        <small>{{ t.lengthSelector.feet }}</small>
      </button>
    </div>
    <p class="selector-note">{{ t.lengthSelector.otherLengths }}</p>
  </div>
</template>
