export const BOOKING_HORIZON_DAYS = 90

export const BOOKING_TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
] as const

function atLocalMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function addCalendarDays(date: Date, days: number): Date {
  const result = atLocalMidnight(date)
  result.setDate(result.getDate() + days)
  return result
}

export function toIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseIsoDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null

  const [, year, month, day] = match
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  if (
    date.getFullYear() !== Number(year)
    || date.getMonth() !== Number(month) - 1
    || date.getDate() !== Number(day)
  ) return null

  return date
}

export function formatBookingDate(value: string): string {
  const date = parseIsoDate(value)
  if (!date) return ''
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function isBookableDate(
  date: Date,
  today = new Date(),
  horizonDays = BOOKING_HORIZON_DAYS,
): boolean {
  const candidate = atLocalMidnight(date)
  const first = atLocalMidnight(today)
  const last = addCalendarDays(first, horizonDays)
  const weekday = candidate.getDay()

  return candidate >= first && candidate <= last && weekday !== 0 && weekday !== 6
}

export function isMonthBookable(
  year: number,
  month: number,
  today = new Date(),
  horizonDays = BOOKING_HORIZON_DAYS,
): boolean {
  const days = new Date(year, month + 1, 0).getDate()
  for (let day = 1; day <= days; day += 1) {
    if (isBookableDate(new Date(year, month, day), today, horizonDays)) return true
  }
  return false
}
