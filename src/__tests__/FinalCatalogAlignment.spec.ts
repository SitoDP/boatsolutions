import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { footer } from '../i18n/footer'
import { header } from '../i18n/header'
import { programsI18n } from '../i18n/programs'

function readSource(relativePath: string) {
  return readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), 'utf8')
}

const shellProgramKeys = {
  careProgram: 'care',
  navigationProgram: 'navigation',
  cleaningProgram: 'ready',
  completeProgram: 'complete',
} as const

const historicalRedirects = [
  ['/programas/barco-sin-preocupaciones', '/programas/mantenimiento-delegado'],
  ['/programas/navega-seguro', '/programas/electronica-asesorada'],
  ['/programas/zarpa-cuando-quieras', '/programas/listo-para-zarpar'],
  ['/yacht-management', '/programas/mantenimiento-delegado'],
  ['/yacht-detailing', '/programas/limpieza-detailing'],
  ['/yacht-consulting', '/servicios'],
  ['/yacht-logistics', '/servicios'],
  ['/en/programas/barco-sin-preocupaciones', '/en/programas/mantenimiento-delegado'],
  ['/en/programas/navega-seguro', '/en/programas/electronica-asesorada'],
  ['/en/programas/zarpa-cuando-quieras', '/en/programas/listo-para-zarpar'],
  ['/en/yacht-management', '/en/programas/mantenimiento-delegado'],
  ['/en/yacht-detailing', '/en/programas/limpieza-detailing'],
  ['/en/yacht-consulting', '/en/servicios'],
  ['/en/yacht-logistics', '/en/servicios'],
] as const

describe('final program catalog alignment', () => {
  it.each(['es', 'en'] as const)('keeps %s shell names aligned with the canonical catalog', (language) => {
    for (const [shellKey, programId] of Object.entries(shellProgramKeys)) {
      const canonicalName = programsI18n[language].programs[programId as keyof typeof programsI18n.es.programs].name
      expect(header[language][shellKey as keyof typeof shellProgramKeys]).toBe(canonicalName)
      expect(footer[language][shellKey as keyof typeof shellProgramKeys]).toBe(canonicalName)
    }
  })

  it('does not expose retired service-description keys in the header catalog', () => {
    for (const language of ['es', 'en'] as const) {
      expect(header[language]).not.toHaveProperty('consultingDesc')
      expect(header[language]).not.toHaveProperty('managementDesc')
      expect(header[language]).not.toHaveProperty('detailingDesc')
    }
  })

  it('keeps visual QA coverage for every historical redirect', () => {
    const visualCheck = readSource('../../scripts/visual_check.py')

    for (const [source, destination] of historicalRedirects) {
      expect(visualCheck).toContain(`"${source}": "${destination}"`)
    }
  })

  it('documents the current forms and labels legacy handlers as compatibility-only', () => {
    const backendReadme = readSource('../../backend/README.md')

    expect(backendReadme).toContain('ProgramBookingModal')
    expect(backendReadme).toContain('Contacto')
    expect(backendReadme).toMatch(/compatibilidad hist[oó]rica/i)
    expect(backendReadme).not.toContain('QuoteModal')
  })
})
