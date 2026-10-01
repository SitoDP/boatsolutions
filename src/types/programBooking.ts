import type { BoatLength, ProgramId } from '../data/programs'

export interface BookingContext {
  programId: ProgramId | null
  length: BoatLength
  schedule?: CalendarSelection
}

export interface CalendarSelection {
  date: string | null
  time: string | null
}

export interface BookingFormData {
  programId: ProgramId
  length: BoatLength
  name: string
  email: string
  phone: string
  boatType: string
  date: string
  time: string
  comments: string
  privacyAccepted: true
}
