import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

function readSource(relativePath: string) {
  return readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), 'utf8')
}

describe('legacy frontend removal', () => {
  const appSource = readSource('../App.vue')
  const routerSource = readSource('../router/index.ts')
  const i18nSource = readSource('../i18n/index.ts')

  it('keeps only the shared program booking modal in the app shell', () => {
    expect(appSource.match(/<ProgramBookingModal\b/g)).toHaveLength(1)
    expect(appSource).not.toMatch(/<BookingModal\b/)
    expect(appSource).not.toContain('TransportRequestModal')
    expect(appSource).not.toContain('DetailingRequestModal')
    expect(appSource).not.toContain("./composables/useBooking")
  })

  it('does not import retired yacht views from the redirect-only routes', () => {
    for (const retiredView of [
      'YachtConsulting',
      'YachtManagement',
      'YachtLogistics',
      'YachtDetailing',
    ]) {
      expect(routerSource).not.toContain(retiredView)
    }
  })

  it('does not register retired service translations', () => {
    for (const retiredTranslation of [
      'consulting',
      'management',
      'logistics',
      'detailing',
      'transportRequest',
      'detailingRequest',
    ]) {
      expect(i18nSource).not.toMatch(new RegExp(`(?:from ['\"].*${retiredTranslation}|\\b${retiredTranslation}:)`))
    }
  })
})
