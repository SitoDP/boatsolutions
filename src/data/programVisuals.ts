import type { ProgramId } from './programs'
import careImage from '../assets/programs/dulcineaStorage.webp'
import navigationImage from '../assets/programs/dulcineaInSide.webp'
import readyImage from '../assets/programs/pulidoAna.webp'
import completeImage from '../assets/programs/dulcinea1.webp'

export interface ProgramVisual {
  src: string
  alt: string
  width: number
  height: number
}

export const programVisuals: Record<ProgramId, ProgramVisual> = {
  care: {
    src: careImage,
    alt: 'Embarcaciones atendidas y protegidas dentro del varadero cubierto',
    width: 1200,
    height: 1600,
  },
  navigation: {
    src: navigationImage,
    alt: 'Velero navegando con su instrumentación y sistemas de cubierta en uso',
    width: 1200,
    height: 1600,
  },
  ready: {
    src: readyImage,
    alt: 'Embarcación con el casco recién pulido durante su puesta a punto en varadero',
    width: 1200,
    height: 900,
  },
  complete: {
    src: completeImage,
    alt: 'Velero navegando con su vela roja, preparado para disfrutar del mar',
    width: 900,
    height: 1600,
  },
}
