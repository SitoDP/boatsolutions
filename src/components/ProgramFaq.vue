<script setup lang="ts">
import { ref, useId } from 'vue'

export interface ProgramFaqItem {
  question: string
  answer: string
}

defineProps<{ items: ProgramFaqItem[] }>()

const openItem = ref<number | null>(null)
const componentId = useId()

function answerId(index: number): string {
  return `${componentId}-faq-answer-${index}`
}

function questionId(index: number): string {
  return `${componentId}-faq-question-${index}`
}

function toggle(index: number) {
  openItem.value = openItem.value === index ? null : index
}
</script>

<template>
  <section class="program-faq" data-detail-faq aria-labelledby="program-faq-title">
    <div class="detail-section-heading">
      <p class="section-kicker">Preguntas frecuentes</p>
      <h2 id="program-faq-title">Lo que conviene saber antes de empezar</h2>
    </div>
    <div class="program-faq-list">
      <article v-for="(item, index) in items" :key="item.question" class="program-faq-item">
        <h3>
          <button :id="questionId(index)" type="button" :aria-expanded="openItem === index" :aria-controls="answerId(index)" @click="toggle(index)">
            <span>{{ item.question }}</span>
            <span aria-hidden="true">{{ openItem === index ? '−' : '+' }}</span>
          </button>
        </h3>
        <div :id="answerId(index)" v-show="openItem === index" class="program-faq-answer" role="region" :aria-labelledby="questionId(index)">
          <p>{{ item.answer }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
