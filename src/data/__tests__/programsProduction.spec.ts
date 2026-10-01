import { describe, expect, it } from 'vitest'
import { commercialConditions } from '../programCommercialConditions'
import { programDetailIds } from '../programDetails'
import { freeInspectionPromotion } from '../programPromotion'
import { programDetailsI18n } from '../../i18n/programDetails'
import { programsI18n } from '../../i18n/programs'
import {
  ADDITIONAL_HOURLY_RATE,
  calculateBundleSavings,
  lengths,
  programs,
} from '../programs'

describe('production program catalogue', () => {
  it('publishes the approved length bands, prices, hours and savings', () => {
    expect(lengths).toEqual([30, 35, 40, 45, 50])
    expect(programs.map((program) => programsI18n.es.programs[program.id].name)).toEqual([
      'Plan Mantenimiento Delegado',
      'Plan Electrónica Asesorada',
      'Plan Limpieza y Detailing',
      'Listo para Zarpar',
    ])
    expect(programs.map((program) => lengths.map((length) => program.prices[length]))).toEqual([
      [215, 250, 285, 320, 355],
      [130, 150, 170, 190, 215],
      [85, 100, 115, 130, 145],
      [360, 420, 480, 540, 600],
    ])
    expect(programs.map((program) => lengths.map((length) => program.includedHours[length]))).toEqual([
      [2, 2.5, 3, 3, 3.5],
      [1.5, 1.5, 1.5, 2, 2],
      [1, 1, 1, 1, 1],
      [4.5, 5, 5.5, 6, 6.5],
    ])
    expect(lengths.map(calculateBundleSavings)).toEqual([70, 80, 90, 100, 115])
    expect(ADDITIONAL_HOURLY_RATE).toBe(60)
  })

  it('keeps the approved promotion and commercial terms', () => {
    expect(freeInspectionPromotion).toEqual({
      durationHours: 1,
      reportValue: 120,
      slotLimit: 10,
      minimumLength: 30,
      region: 'Rías Baixas',
      bookingDeadline: '2026-10-31',
      perOwnerAndBoat: true,
      requiresLegalReview: true,
    })
    expect(commercialConditions.allPricesIncludeVat).toBe(true)
    expect(commercialConditions.contract.durationMonths).toBe(12)
    expect(commercialConditions.renewal.noticeDays).toBe(30)
    expect(commercialConditions.additionalHours).toEqual({ hourlyRate: 60, vatIncluded: true })
    expect(commercialConditions.withdrawal.periodDays).toBe(14)
    expect(commercialConditions.withdrawal.requiresLegalReview).toBe(true)
  })

  it('provides complete, evidence-limited content for every program', () => {
    expect(programDetailIds).toEqual(programs.map((program) => program.id))
    for (const language of ['es', 'en'] as const) {
      for (const detail of Object.values(programDetailsI18n[language])) {
        expect(detail.included.length).toBeGreaterThan(0)
        expect(detail.workflow.length).toBeGreaterThan(0)
        expect(detail.faq.length).toBeGreaterThan(0)
        expect(detail.specificConditions.length).toBeGreaterThan(0)
      }
    }
    expect(JSON.stringify(programDetailsI18n)).not.toMatch(/Dulcinea|Marcela|tienda online|mantenimiento integral/i)
    expect(JSON.stringify(programDetailsI18n.es.complete)).toMatch(/hasta un 16\s*%/i)
    expect(JSON.stringify(programDetailsI18n.en.complete)).toMatch(/up to 16%/i)
    expect(programDetailsI18n.es.ready.caseStudy).toBeNull()
    expect(programDetailsI18n.en.complete.caseStudy).toBeNull()
  })
})
