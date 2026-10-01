import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { beforeAll, describe, expect, it } from 'vitest'

const projectRoot = process.cwd()
const sitemapPath = resolve(projectRoot, 'dist/sitemap.xml')

beforeAll(() => {
  execFileSync(process.execPath, ['node_modules/tsx/dist/cli.mjs', 'scripts/generate-sitemap.ts'], {
    cwd: projectRoot,
    stdio: 'pipe',
  })
})

describe('generated sitemap', () => {
  it('publishes canonical program URLs and localized alternates', () => {
    const xml = readFileSync(sitemapPath, 'utf8')

    for (const path of [
      '/servicios',
      '/programas/mantenimiento-delegado',
      '/programas/electronica-asesorada',
      '/programas/limpieza-detailing',
      '/programas/listo-para-zarpar',
      '/bases-revision-gratuita',
      '/yacht-logistics',
    ]) {
      expect(xml).toContain(`<loc>https://boat-solutions.es${path}</loc>`)
      expect(xml).toContain(`hreflang="en" href="https://boat-solutions.es/en${path}"`)
    }
  })

  it('omits every redirected legacy URL', () => {
    const xml = readFileSync(sitemapPath, 'utf8')

    for (const path of [
      '/yacht-management',
      '/yacht-detailing',
      '/yacht-consulting',
      '/programas/barco-sin-preocupaciones',
      '/programas/navega-seguro',
      '/programas/zarpa-cuando-quieras',
    ]) {
      expect(xml).not.toContain(`<loc>https://boat-solutions.es${path}</loc>`)
    }
  })
})
