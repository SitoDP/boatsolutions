import { ref } from 'vue'
import type { BoatLength } from '../data/programs'

const selectedLength = ref<BoatLength>(30)

export function useProgramSelection() {
  return { selectedLength }
}
