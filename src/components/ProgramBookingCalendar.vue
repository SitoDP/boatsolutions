<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import {
  addCalendarDays,
  BOOKING_HORIZON_DAYS,
  BOOKING_TIME_SLOTS,
  isBookableDate,
  isMonthBookable,
  parseIsoDate,
  toIsoDate,
} from '../lib/programBookingCalendar'
import type { CalendarSelection } from '../types/programBooking'
import { useLanguage } from '../composables/useLanguage'

const props = withDefaults(defineProps<{
  modelValue: CalendarSelection
  today?: Date
  horizonDays?: number
}>(), {
  today: () => new Date(),
  horizonDays: BOOKING_HORIZON_DAYS,
})

const emit = defineEmits<{
  'update:modelValue': [value: CalendarSelection]
}>()

const { lang, useT } = useLanguage()
const t = useT('programBooking')
const locale = computed(() => lang.value === 'en' ? 'en-GB' : 'es-ES')

const initialDate = parseIsoDate(props.modelValue.date ?? '') ?? props.today
const calendarRoot = ref<HTMLElement | null>(null)
const visibleYear = ref(initialDate.getFullYear())
const visibleMonth = ref(initialDate.getMonth())
const focusedDate = ref(props.modelValue.date ?? '')

watch(() => props.modelValue.date, (value) => {
  const date = parseIsoDate(value ?? '')
  if (!date) return
  visibleYear.value = date.getFullYear()
  visibleMonth.value = date.getMonth()
  focusedDate.value = value ?? ''
})

const monthLabel = computed(() => new Intl.DateTimeFormat(locale.value, {
  month: 'long',
  year: 'numeric',
}).format(new Date(visibleYear.value, visibleMonth.value, 1)))

const calendarDates = computed(() => {
  const first = new Date(visibleYear.value, visibleMonth.value, 1)
  const mondayOffset = (first.getDay() + 6) % 7
  const gridStart = new Date(visibleYear.value, visibleMonth.value, 1 - mondayOffset)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)
    return date
  })
})

const calendarWeeks = computed(() => Array.from({ length: 6 }, (_, index) => (
  calendarDates.value.slice(index * 7, index * 7 + 7)
)))

const fallbackTabStop = computed(() => {
  const inVisibleMonth = calendarDates.value.find((date) => (
    date.getMonth() === visibleMonth.value
    && isBookableDate(date, props.today, props.horizonDays)
  ))
  return inVisibleMonth ? toIsoDate(inVisibleMonth) : ''
})

function adjacentMonth(delta: number) {
  return new Date(visibleYear.value, visibleMonth.value + delta, 1)
}

const canGoPrevious = computed(() => {
  const target = adjacentMonth(-1)
  return isMonthBookable(target.getFullYear(), target.getMonth(), props.today, props.horizonDays)
})

const canGoNext = computed(() => {
  const target = adjacentMonth(1)
  return isMonthBookable(target.getFullYear(), target.getMonth(), props.today, props.horizonDays)
})

function changeMonth(delta: number) {
  const target = adjacentMonth(delta)
  visibleYear.value = target.getFullYear()
  visibleMonth.value = target.getMonth()
  nextTick(() => {
    focusedDate.value = fallbackTabStop.value
  })
}

function selectDate(date: Date) {
  if (!isBookableDate(date, props.today, props.horizonDays)) return
  visibleYear.value = date.getFullYear()
  visibleMonth.value = date.getMonth()
  focusedDate.value = toIsoDate(date)
  emit('update:modelValue', { date: toIsoDate(date), time: null })
}

function selectTime(time: string) {
  if (!props.modelValue.date) return
  emit('update:modelValue', { date: props.modelValue.date, time })
}

function dateLabel(date: Date) {
  return new Intl.DateTimeFormat(locale.value, { dateStyle: 'full' }).format(date)
}

function isTabStop(date: Date): boolean {
  if (!isBookableDate(date, props.today, props.horizonDays)) return false
  return toIsoDate(date) === (focusedDate.value || fallbackTabStop.value)
}

async function moveDayFocus(event: KeyboardEvent, date: Date) {
  const increments: Record<string, number> = {
    ArrowLeft: -1,
    ArrowRight: 1,
    ArrowUp: -7,
    ArrowDown: 7,
  }
  const increment = increments[event.key]
  if (!increment) return
  event.preventDefault()

  let candidate = addCalendarDays(date, increment)
  for (let attempt = 0; attempt < 14; attempt += 1) {
    if (isBookableDate(candidate, props.today, props.horizonDays)) {
      const iso = toIsoDate(candidate)
      focusedDate.value = iso
      visibleYear.value = candidate.getFullYear()
      visibleMonth.value = candidate.getMonth()
      await nextTick()
      calendarRoot.value?.querySelector<HTMLElement>(`[data-date="${iso}"]`)?.focus()
      return
    }
    candidate = addCalendarDays(candidate, increment > 0 ? 1 : -1)
  }
}
</script>

<template>
  <section class="booking-calendar" :aria-label="t.calendar.ariaLabel">
    <div class="calendar-heading">
      <button
        type="button"
        data-month="previous"
        :disabled="!canGoPrevious"
        :aria-label="t.calendar.previousMonth"
        @click="changeMonth(-1)"
      >←</button>
      <h3>{{ monthLabel }}</h3>
      <button
        type="button"
        data-month="next"
        :disabled="!canGoNext"
        :aria-label="t.calendar.nextMonth"
        @click="changeMonth(1)"
      >→</button>
    </div>

    <div class="calendar-weekdays" aria-hidden="true">
      <span v-for="(weekday, index) in t.calendar.weekdays" :key="`${weekday}-${index}`">{{ weekday }}</span>
    </div>

    <div ref="calendarRoot" class="calendar-grid" role="grid" :aria-label="t.calendar.gridLabel">
      <div v-for="(week, weekIndex) in calendarWeeks" :key="weekIndex" class="calendar-row" role="row">
        <div v-for="date in week" :key="toIsoDate(date)" class="calendar-cell" role="gridcell">
          <button
            type="button"
            class="calendar-day"
            :class="{
              outside: date.getMonth() !== visibleMonth,
              selected: modelValue.date === toIsoDate(date),
            }"
            :data-date="toIsoDate(date)"
            :disabled="!isBookableDate(date, today, horizonDays)"
            :tabindex="isTabStop(date) ? 0 : -1"
            :aria-label="dateLabel(date)"
            :aria-pressed="modelValue.date === toIsoDate(date)"
            @focus="focusedDate = toIsoDate(date)"
            @keydown="moveDayFocus($event, date)"
            @click="selectDate(date)"
          >
            {{ date.getDate() }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="modelValue.date" class="time-selection">
      <div>
        <h4>{{ t.calendar.preferredTime }}</h4>
        <p>{{ t.calendar.availability }}</p>
      </div>
      <div class="time-grid">
        <button
          v-for="time in BOOKING_TIME_SLOTS"
          :key="time"
          type="button"
          :data-time="time"
          :class="{ selected: modelValue.time === time }"
          :aria-pressed="modelValue.time === time"
          @click="selectTime(time)"
        >{{ time }}</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.booking-calendar { min-width: 0; }
.calendar-heading { display: grid; grid-template-columns: 42px 1fr 42px; align-items: center; gap: 12px; }
.calendar-heading h3 { margin: 0; color: var(--ocean-deep); font: 700 1.15rem 'Merriweather', serif; text-align: center; text-transform: capitalize; }
.calendar-heading button { width: 42px; height: 42px; border: 1px solid var(--line); background: var(--white); color: var(--ocean-deep); cursor: pointer; }
.calendar-heading button:disabled { opacity: .3; cursor: not-allowed; }
.calendar-weekdays, .calendar-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 5px; }
.calendar-row, .calendar-cell { display: contents; }
.calendar-weekdays { margin: 22px 0 8px; }
.calendar-weekdays span { color: #71808a; font: 600 .68rem 'Montserrat', sans-serif; text-align: center; }
.calendar-day { min-width: 0; aspect-ratio: 1; padding: 0; border: 1px solid transparent; background: transparent; color: var(--ink); cursor: pointer; }
.calendar-day:not(:disabled):hover { border-color: var(--ocean); color: var(--ocean); }
.calendar-day.outside { opacity: .42; }
.calendar-day:disabled { color: #aeb8be; opacity: .5; cursor: not-allowed; }
.calendar-day.selected { background: var(--ocean-deep); color: var(--white); }
.time-selection { margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--line); }
.time-selection h4 { margin: 0; font: 700 1rem 'Merriweather', serif; }
.time-selection p { margin: 6px 0 0; color: #687985; font-size: .72rem; line-height: 1.5; }
.time-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; margin-top: 16px; }
.time-grid button { min-height: 40px; border: 1px solid var(--line); background: var(--white); color: var(--ocean-deep); cursor: pointer; }
.time-grid button.selected { border-color: var(--ocean-deep); background: var(--ocean-deep); color: var(--white); }

@media (max-width: 520px) {
  .calendar-weekdays, .calendar-grid { gap: 3px; }
  .time-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
