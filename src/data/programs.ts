export type BoatLength = 30 | 35 | 40 | 45 | 50

export type ProgramId = 'care' | 'navigation' | 'ready' | 'complete'

export interface Program {
  id: ProgramId
  slug: string
  name: string
  shortName: string
  description: string
  hoursNote?: string
  prices: Record<BoatLength, number>
  includedHours: Record<BoatLength, number>
  highlighted?: boolean
}

export const lengths: BoatLength[] = [30, 35, 40, 45, 50]
export const ADDITIONAL_HOURLY_RATE = 60
export const CLEANING_HOURS_NOTE = 'La hora mensual cubre coordinación y verificación; no incluye las horas del equipo de limpieza externo.'

export const programs: Program[] = [
  {
    id: 'care',
    slug: 'mantenimiento-delegado',
    name: 'Plan Mantenimiento Delegado',
    shortName: 'Mantenimiento delegado',
    description: 'Un responsable pendiente de la planificación, el mantenimiento y los proveedores durante todo el año.',
    prices: { 30: 215, 35: 250, 40: 285, 45: 320, 50: 355 },
    includedHours: { 30: 2, 35: 2.5, 40: 3, 45: 3, 50: 3.5 },
  },
  {
    id: 'navigation',
    slug: 'electronica-asesorada',
    name: 'Plan Electrónica Asesorada',
    shortName: 'Electrónica asesorada',
    description: 'Los sistemas que te orientan y te mantienen conectado, revisados antes de que los necesites.',
    prices: { 30: 130, 35: 150, 40: 170, 45: 190, 50: 215 },
    includedHours: { 30: 1.5, 35: 1.5, 40: 1.5, 45: 2, 50: 2 },
  },
  {
    id: 'ready',
    slug: 'limpieza-detailing',
    name: 'Plan Limpieza y Detailing',
    shortName: 'Limpieza y detailing',
    description: 'El barco impecable al final del verano y preparado para volver al agua al inicio de temporada.',
    hoursNote: CLEANING_HOURS_NOTE,
    prices: { 30: 85, 35: 100, 40: 115, 45: 130, 50: 145 },
    includedHours: { 30: 1, 35: 1, 40: 1, 45: 1, 50: 1 },
  },
  {
    id: 'complete',
    slug: 'listo-para-zarpar',
    name: 'Listo para Zarpar',
    shortName: 'El plan completo',
    description: 'Los tres programas coordinados para que tu barco esté listo cuando tú lo estés.',
    prices: { 30: 360, 35: 420, 40: 480, 45: 540, 50: 600 },
    includedHours: { 30: 4.5, 35: 5, 40: 5.5, 45: 6, 50: 6.5 },
    highlighted: true,
  },
]

export function formatIncludedHours(hours: number): string {
  return `${String(hours).replace('.', ',')} h`
}

export function calculateBundleSavings(length: BoatLength): number {
  const individualTotal = programs
    .filter((program) => program.id !== 'complete')
    .reduce((total, program) => total + program.prices[length], 0)
  const complete = programs.find((program) => program.id === 'complete')

  if (!complete) throw new Error('El programa completo no está configurado')

  return individualTotal - complete.prices[length]
}
