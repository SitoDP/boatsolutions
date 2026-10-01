import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { afterEach, describe, expect, it, vi } from 'vitest'

const PROGRAM_CASES = [
  ['care', 'Plan Mantenimiento Delegado', 30, 215],
  ['care', 'Plan Mantenimiento Delegado', 35, 250],
  ['care', 'Plan Mantenimiento Delegado', 40, 285],
  ['care', 'Plan Mantenimiento Delegado', 45, 320],
  ['care', 'Plan Mantenimiento Delegado', 50, 355],
  ['navigation', 'Plan Electrónica Asesorada', 30, 130],
  ['navigation', 'Plan Electrónica Asesorada', 35, 150],
  ['navigation', 'Plan Electrónica Asesorada', 40, 170],
  ['navigation', 'Plan Electrónica Asesorada', 45, 190],
  ['navigation', 'Plan Electrónica Asesorada', 50, 215],
  ['ready', 'Plan Limpieza y Detailing', 30, 85],
  ['ready', 'Plan Limpieza y Detailing', 35, 100],
  ['ready', 'Plan Limpieza y Detailing', 40, 115],
  ['ready', 'Plan Limpieza y Detailing', 45, 130],
  ['ready', 'Plan Limpieza y Detailing', 50, 145],
  ['complete', 'Listo para Zarpar', 30, 360],
  ['complete', 'Listo para Zarpar', 35, 420],
  ['complete', 'Listo para Zarpar', 40, 480],
  ['complete', 'Listo para Zarpar', 45, 540],
  ['complete', 'Listo para Zarpar', 50, 600],
] as const

function loadWebhook() {
  const appendRow = vi.fn()
  const sendEmail = vi.fn()
  const textOutput = { setMimeType: vi.fn().mockReturnThis() }
  const context = vm.createContext({
    console,
    SpreadsheetApp: {
      getActiveSpreadsheet: () => ({ getActiveSheet: () => ({ appendRow }) }),
    },
    GmailApp: { sendEmail },
    Utilities: { formatDate: () => '05/10/2026' },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput: vi.fn(() => textOutput),
    },
    encodeURIComponent,
    Date,
  })

  vm.runInContext(fs.readFileSync(path.resolve(process.cwd(), 'backend/Code.gs'), 'utf8'), context)

  return {
    doPost: context.doPost as (event: { postData: { contents: string } }) => unknown,
    appendRow,
    sendEmail,
  }
}

function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    type: 'program-booking',
    language: 'es',
    programId: 'navigation',
    programName: 'Nombre manipulado',
    length: 40,
    monthlyPrice: 1,
    name: 'Ana García',
    email: 'ana@example.com',
    phone: '+34 600 123 123',
    boatType: 'velero',
    date: '2026-10-05',
    time: '10:00',
    comments: 'Revisar el piloto automático',
    ...overrides,
  }
}

function post(doPost: ReturnType<typeof loadWebhook>['doPost'], payload: Record<string, unknown>) {
  doPost({ postData: { contents: JSON.stringify(payload) } })
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('program-booking webhook', () => {
  it.each(PROGRAM_CASES)(
    'uses authoritative %s mapping: %s at %i ft costs %i',
    (programId, programName, length, monthlyPrice) => {
      const { doPost, appendRow, sendEmail } = loadWebhook()

      post(doPost, validPayload({ programId, length }))

      expect(appendRow).toHaveBeenCalledTimes(1)
      expect(appendRow.mock.calls[0][0][7]).toBe(
        `${programName} · hasta ${length} pies · ${monthlyPrice} €/mes · IVA incluido`,
      )
      expect(appendRow.mock.calls[0][0][9]).toBe(
        `Programa: ${programId} · Eslora: ${length} pies · Cuota: ${monthlyPrice} €/mes · IVA incluido`,
      )
      expect(sendEmail).toHaveBeenCalledTimes(2)
    },
  )

  it('ignores client-supplied program name and price everywhere', () => {
    const { doPost, appendRow, sendEmail } = loadWebhook()

    post(doPost, validPayload({ programName: 'Programa falso', monthlyPrice: 1 }))

    const rowText = appendRow.mock.calls[0][0].join(' ')
    const emailText = sendEmail.mock.calls.map((call) => `${call[1]} ${call[3].htmlBody}`).join(' ')
    expect(`${rowText} ${emailText}`).toContain('Plan Electrónica Asesorada')
    expect(`${rowText} ${emailText}`).toContain('170')
    expect(`${rowText} ${emailText}`).not.toContain('Programa falso')
    expect(`${rowText} ${emailText}`).not.toMatch(/(?:^|\D)1\s*€\/mes/)
  })

  it('states that VAT is included in sheet summaries and both emails', () => {
    const { doPost, appendRow, sendEmail } = loadWebhook()

    post(doPost, validPayload())

    const sheetSummary = `${appendRow.mock.calls[0][0][7]} ${appendRow.mock.calls[0][0][9]}`
    const emailBodies = sendEmail.mock.calls.map((call) => call[3].htmlBody)
    expect(sheetSummary).toContain('IVA incluido')
    expect(emailBodies[0]).toContain('IVA incluido')
    expect(emailBodies[1]).toContain('IVA incluido')
    expect(`${sheetSummary} ${emailBodies.join(' ')}`).not.toContain('+ IVA')
  })

  it('renders VAT included in English without legacy VAT suffixes', () => {
    const { doPost, sendEmail } = loadWebhook()

    post(doPost, validPayload({ language: 'en' }))

    const customerBody = sendEmail.mock.calls[0][3].htmlBody
    const adminBody = sendEmail.mock.calls[1][3].htmlBody
    expect(customerBody).toContain('VAT included')
    expect(customerBody).not.toContain('IVA incluido')
    expect(adminBody).toContain('IVA incluido')
    expect(`${customerBody} ${adminBody}`).not.toMatch(/\+ (?:IVA|VAT)/)
  })

  it('appends one row and sends exactly one customer and one admin email', () => {
    const { doPost, appendRow, sendEmail } = loadWebhook()

    post(doPost, validPayload())

    expect(appendRow).toHaveBeenCalledTimes(1)
    expect(sendEmail).toHaveBeenCalledTimes(2)
    expect(sendEmail.mock.calls[0][0]).toBe('ana@example.com')
    expect(sendEmail.mock.calls[1][0]).toBe('info@boat-solutions.es')
  })

  it.each([
    ['unknown program', { programId: 'unknown' }],
    ['unsupported length', { length: 31 }],
  ])('rejects %s before writing or sending email', (_label, overrides) => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const { doPost, appendRow, sendEmail } = loadWebhook()

    post(doPost, validPayload(overrides))

    expect(appendRow).not.toHaveBeenCalled()
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it.each(['name', 'email', 'date', 'time'])('rejects missing %s before writing or sending email', (field) => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const { doPost, appendRow, sendEmail } = loadWebhook()

    post(doPost, validPayload({ [field]: '   ' }))

    expect(appendRow).not.toHaveBeenCalled()
    expect(sendEmail).not.toHaveBeenCalled()
  })
})
