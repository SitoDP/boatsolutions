import { writeFile } from 'node:fs/promises'

/**
 * Generates dist/sitemap.xml after `vite build`. The list of routes
 * mirrors src/router/index.ts — keep in sync if you add a new route.
 */

const SITE_URL = process.env.VITE_SITE_URL ?? 'https://boat-solutions.es'

const ROUTES_ES = [
  '/',
  '/nosotros',
  '/proyectos',
  '/galeria',
  '/contacto',
  '/servicios',
  '/programas/mantenimiento-delegado',
  '/programas/electronica-asesorada',
  '/programas/limpieza-detailing',
  '/programas/listo-para-zarpar',
  '/bases-revision-gratuita',
  '/politica-de-privacidad',
  '/terminos-y-condiciones',
]

interface UrlEntry {
  loc: string
  alternates: Array<{ hreflang: string; href: string }>
  priority: number
}

const today = new Date().toISOString().split('T')[0]

function buildEntries(): UrlEntry[] {
  return ROUTES_ES.map((path) => {
    const enPath = path === '/' ? '/en' : `/en${path}`
    return {
      loc: `${SITE_URL}${path}`,
      alternates: [
        { hreflang: 'es', href: `${SITE_URL}${path}` },
        { hreflang: 'en', href: `${SITE_URL}${enPath}` },
        { hreflang: 'x-default', href: `${SITE_URL}${path}` },
      ],
      priority: path === '/' ? 1.0 : 0.7,
    }
  })
}

function renderSitemap(entries: UrlEntry[]): string {
  const urls = entries
    .map((entry) => {
      const alts = entry.alternates
        .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`)
        .join('\n')
      return `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${entry.priority.toFixed(1)}</priority>
${alts}
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
}

async function main(): Promise<void> {
  const entries = buildEntries()
  const xml = renderSitemap(entries)
  const out = new URL('../dist/sitemap.xml', import.meta.url)
  await writeFile(out, xml)
  console.log(`Generated dist/sitemap.xml with ${entries.length} URLs`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
