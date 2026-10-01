import type { ProgramId } from './programs'
import careImage from '../assets/programs/dulcineaStorage.webp'
import navigationImage from '../assets/programs/dulcineaInSide.webp'
import readyImage from '../assets/programs/pulidoAna.webp'
import completeImage from '../assets/programs/dulcinea1.webp'

export interface ProgramVisual {
  src: string
  width: number
  height: number
}

export const programVisuals: Record<ProgramId, ProgramVisual> = {
  care: {
    src: careImage,
    width: 1200,
    height: 1600,
  },
  navigation: {
    src: navigationImage,
    width: 1200,
    height: 1600,
  },
  ready: {
    src: readyImage,
    width: 1200,
    height: 900,
  },
  complete: {
    src: completeImage,
    width: 900,
    height: 1600,
  },
}
