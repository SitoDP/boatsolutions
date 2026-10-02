import type { BoatLength } from './programs'

export interface FreeInspectionPromotion {
  readonly durationHours: number
  readonly reportValue: number
  readonly slotLimit: number
  readonly minimumLength: BoatLength
  readonly region: string
  readonly bookingDeadline: string
  readonly perOwnerAndBoat: boolean
  readonly requiresLegalReview: boolean
}

export const freeInspectionPromotion = Object.freeze({
  durationHours: 1,
  reportValue: 120,
  slotLimit: 10,
  minimumLength: 30,
  region: 'Rías Baixas',
  bookingDeadline: '2026-10-31',
  perOwnerAndBoat: true,
  requiresLegalReview: true,
} satisfies FreeInspectionPromotion)
