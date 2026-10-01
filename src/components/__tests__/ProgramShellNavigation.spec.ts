// @vitest-environment jsdom
import { mount, shallowMount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import App from '../../App.vue'
import Footer from '../Footer.vue'
import Header from '../Header.vue'
import ProgramBookingModal from '../ProgramBookingModal.vue'

beforeAll(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})

const routes: RouteRecordRaw[] = [
  { path: '/:pathMatch(.*)*', component: defineComponent({ template: '<div />' }) },
]

const programPaths = [
  '/programas/mantenimiento-delegado',
  '/programas/electronica-asesorada',
  '/programas/limpieza-detailing',
  '/programas/listo-para-zarpar',
] as const

async function mountAt(component: typeof Header | typeof Footer, path: string) {
  const testRouter = createRouter({ history: createMemoryHistory(), routes })
  await testRouter.push(path)
  await testRouter.isReady()
  const wrapper = mount(component, { global: { plugins: [testRouter] } })
  return { wrapper, testRouter }
}

describe('program shell navigation', () => {
  it('mounts the shared program booking modal exactly once in the app shell', async () => {
    const testRouter = createRouter({ history: createMemoryHistory(), routes })
    await testRouter.push('/')
    await testRouter.isReady()
    const wrapper = shallowMount(App, { global: { plugins: [testRouter] } })

    expect(wrapper.findAllComponents(ProgramBookingModal)).toHaveLength(1)
  })

  it('limits desktop and mobile program navigation to Services and the four programs', async () => {
    const { wrapper } = await mountAt(Header, '/servicios')
    const hrefs = wrapper.findAll('a').map((link) => link.attributes('href'))

    for (const expected of [
      '/servicios',
      ...programPaths,
    ]) {
      expect(hrefs.filter((href) => href === expected).length, expected).toBe(2)
    }
    expect(hrefs).not.toContain('/yacht-management')
    expect(hrefs).not.toContain('/yacht-detailing')
    expect(hrefs).not.toContain('/yacht-consulting')
    expect(hrefs).not.toContain('/yacht-logistics')
    expect(wrapper.get('[data-services-menu]').element.tagName).toBe('A')
    expect(wrapper.get('[data-services-menu]').attributes('href')).toBe('/servicios')
    expect(wrapper.get('[data-services-menu]').classes()).toContain('active')
  })

  it.each(programPaths)('keeps the Services menu active on %s', async (path) => {
    const { wrapper } = await mountAt(Header, path)
    expect(wrapper.get('[data-services-menu]').classes()).toContain('active')
  })

  it('does not activate Services for an unknown program path', async () => {
    const { wrapper } = await mountAt(Header, '/programas/no-existe')

    expect(wrapper.get('[data-services-menu]').classes()).not.toContain('active')
  })

  it('uses locale-preserving English links in header and footer', async () => {
    const { wrapper: header } = await mountAt(Header, '/en/servicios')
    const { wrapper: footer } = await mountAt(Footer, '/en/servicios')
    const headerHrefs = header.findAll('a').map((link) => link.attributes('href'))
    const footerHrefs = footer.findAll('a').map((link) => link.attributes('href'))

    expect(headerHrefs).toContain('/en/servicios')
    expect(headerHrefs).toContain('/en/programas/listo-para-zarpar')
    expect(headerHrefs).not.toContain('/en/yacht-logistics')
    expect(footerHrefs).toContain('/en/servicios')
    expect(footerHrefs).toContain('/en/programas/mantenimiento-delegado')
    expect(footerHrefs).not.toContain('/en/yacht-logistics')
  })
})
