// @vitest-environment jsdom
import { flushPromises, mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import router from '../index'

beforeAll(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})

const canonicalPrograms = [
  ['/programas/mantenimiento-delegado', 'care'],
  ['/programas/electronica-asesorada', 'navigation'],
  ['/programas/limpieza-detailing', 'ready'],
  ['/programas/listo-para-zarpar', 'complete'],
] as const

describe('program routes', () => {
  it('registers every canonical Spanish and English program route with matching props and meta', () => {
    const routes = router.getRoutes()

    for (const [spanishPath, programId] of canonicalPrograms) {
      for (const path of [spanishPath, `/en${spanishPath}`]) {
        const route = routes.find((candidate) => candidate.path === path)
        expect(route, path).toBeDefined()
        expect(route?.props.default, `${path} props`).toEqual({ programId })
        expect(route?.meta.programId, `${path} meta`).toBe(programId)
      }
    }
  })

  it.each([
    ['/servicios', 'services'],
    ['/bases-revision-gratuita', 'promotion-terms'],
    ['/en/servicios', 'services-en'],
    ['/en/bases-revision-gratuita', 'promotion-terms-en'],
  ])('resolves canonical route %s as %s', (path, name) => {
    expect(router.resolve(path).name).toBe(name)
  })

  it.each([
    ['/programas/barco-sin-preocupaciones', '/programas/mantenimiento-delegado'],
    ['/programas/navega-seguro', '/programas/electronica-asesorada'],
    ['/programas/zarpa-cuando-quieras', '/programas/listo-para-zarpar'],
    ['/yacht-management', '/programas/mantenimiento-delegado'],
    ['/yacht-detailing', '/programas/limpieza-detailing'],
    ['/yacht-consulting', '/servicios'],
    ['/en/programas/barco-sin-preocupaciones', '/en/programas/mantenimiento-delegado'],
    ['/en/programas/navega-seguro', '/en/programas/electronica-asesorada'],
    ['/en/programas/zarpa-cuando-quieras', '/en/programas/listo-para-zarpar'],
    ['/en/yacht-management', '/en/programas/mantenimiento-delegado'],
    ['/en/yacht-detailing', '/en/programas/limpieza-detailing'],
    ['/en/yacht-consulting', '/en/servicios'],
  ])('redirects %s to the locale-preserving destination %s', async (from, destination) => {
    await router.push(from)
    await router.isReady()

    expect(router.currentRoute.value.path).toBe(destination)
  })

  it.each([
    ['/yacht-logistics', 'yacht-logistics'],
    ['/en/yacht-logistics', 'yacht-logistics-en'],
  ])('keeps %s as the independent Logistics service route', (path, name) => {
    const resolved = router.resolve(path)
    expect(resolved.name).toBe(name)
    expect(resolved.redirectedFrom).toBeUndefined()
  })

  it('resolves and renders the cleaning detail with its authoritative program', async () => {
    await router.push('/programas/limpieza-detailing')
    await router.isReady()
    const wrapper = mount(defineComponent({
      components: { RouterView },
      template: '<RouterView />',
    }), { global: { plugins: [router] } })
    await flushPromises()

    expect(wrapper.get('h1').text()).toBe('Plan Limpieza y Detailing')
    expect(wrapper.get('[data-detail-price]').text()).toContain('85 €')
  })
})
