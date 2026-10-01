import { ref } from 'vue'
import type { BookingContext } from '../types/programBooking'

const isOpen = ref(false)
const context = ref<BookingContext>({ programId: null, length: 30 })

export function useProgramBooking() {
  function open(nextContext: BookingContext) {
    context.value = {
      ...nextContext,
      ...(nextContext.schedule ? { schedule: { ...nextContext.schedule } } : {}),
    }
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, context, open, close }
}
