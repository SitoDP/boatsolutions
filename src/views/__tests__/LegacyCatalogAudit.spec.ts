// @vitest-environment jsdom
import { mount, type VueWrapper } from '@vue/test-utils'
import { createHead } from '@unhead/vue/client'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Component } from 'vue'
import Galeria from '../Galeria.vue'
import Home from '../Home.vue'
import Nosotros from '../Nosotros.vue'
import Proyectos from '../Proyectos.vue'
import Servicios from '../Servicios.vue'
import router from '../../router'

interface PublicSurface {
  name: string
  component: Component
  esPath: string
  enPath: string
}

const publicSurfaces: PublicSurface[] = [
  { name: 'Inicio', component: Home, esPath: '/', enPath: '/en' },
  { name: 'Servicios', component: Servicios, esPath: '/servicios', enPath: '/en/servicios' },
  { name: 'Nosotros', component: Nosotros, esPath: '/nosotros', enPath: '/en/nosotros' },
  { name: 'Proyectos', component: Proyectos, esPath: '/proyectos', enPath: '/en/proyectos' },
  { name: 'Galería', component: Galeria, esPath: '/galeria', enPath: '/en/galeria' },
]

const obsoleteCatalogCopy = [
  /Yacht (?:Consulting|Management|Logistics)/i,
  /Soluciones a medida/i,
  /Realce estético/i,
  /especialistas en gestión náutica, traslados y detailing/i,
  /experts in yacht management, transport and detailing/i,
  /cada mantenimiento, cada traslado, cada detailing/i,
  /every maintenance, every transfer, every detailing/i,
  /gestión, traslados, detailing y experiencias/i,
  /management, transport, detailing and experiences/i,
  /presupuesto personalizado/i,
  /personalised quote/i,
]

let wrapper: VueWrapper | undefined

beforeAll(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})

beforeEach(() => {
  document.head.innerHTML = ''
})

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

async function renderSurface(surface: PublicSurface, language: 'es' | 'en') {
  await router.push(language === 'es' ? surface.esPath : surface.enPath)
  await router.isReady()
  wrapper = mount(surface.component, {
    global: {
      plugins: [router, createHead()],
      stubs: { RouterLink: true, CalendarWidget: true, HeroSection: { template: '<section><slot /></section>' } },
    },
  })
  await vi.waitFor(() => expect(document.head.querySelector('meta[name="description"]')).not.toBeNull())

  return [
    wrapper.text(),
    ...wrapper.findAll('img').map((image) => image.attributes('alt') ?? ''),
    document.title,
    document.head.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
  ].join('\n')
}

describe('public legacy catalog audit', () => {
  for (const surface of publicSurfaces) {
    for (const language of ['es', 'en'] as const) {
      it(`${surface.name} exposes only the current catalog in ${language.toUpperCase()}`, async () => {
        const publicCopy = await renderSurface(surface, language)

        for (const obsoleteCopy of obsoleteCatalogCopy) {
          expect(publicCopy).not.toMatch(obsoleteCopy)
        }
      })
    }
  }

  it('keeps the current detailing plan and factual technical work descriptions', async () => {
    const services = await renderSurface(publicSurfaces[1], 'es')
    expect(services).toContain('Plan Limpieza y Detailing')
    wrapper?.unmount()

    const projects = await renderSurface(publicSurfaces[3], 'es')
    expect(projects).toContain('Detailing profesional')
    expect(projects).toContain('Coordinación logística con astilleros')
    expect(projects).toContain('Mantenimiento preventivo de sistemas eléctricos e hidráulicos')
  })
})
