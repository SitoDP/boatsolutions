import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import BookingModal from '../BookingModal.vue'

vi.stubGlobal('fetch', vi.fn().mockResolvedValue({}))

const factory = async (props = {}) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', component: { template: '<div />' } }],
  })
  await router.push('/')
  await router.isReady()

  return mount(BookingModal, {
    props: { isOpen: true, isConsulting: false, ...props },
    global: {
      plugins: [router],
      stubs: { Teleport: true },
    },
  })
}

describe('BookingModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the form when open', async () => {
    const wrapper = await factory()
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('shows consulting title when isConsulting is true', () => {
    return factory({ isConsulting: true }).then((wrapper) => {
      expect(wrapper.find('h2').text()).toContain('Consultoría')
    })
  })

  it('shows booking title when isConsulting is false', async () => {
    const wrapper = await factory({ isConsulting: false })
    expect(wrapper.find('h2').text()).toContain('Reserva')
  })

  it('shows validation errors on empty submit', async () => {
    const wrapper = await factory()
    await wrapper.find('form').trigger('submit')
    const errors = wrapper.findAll('.field-error')
    expect(errors.length).toBeGreaterThan(0)
  })

  it('shows name error when name is empty', async () => {
    const wrapper = await factory()
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('nombre es obligatorio')
  })

  it('shows email error when email is invalid', async () => {
    const wrapper = await factory()
    await wrapper.find('#bm-name').setValue('Ana García')
    await wrapper.find('#bm-email').setValue('not-an-email')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('email no es válido')
  })

  it('clears field error on input', async () => {
    const wrapper = await factory()
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('nombre es obligatorio')
    await wrapper.find('#bm-name').setValue('Ana')
    expect(wrapper.text()).not.toContain('nombre es obligatorio')
  })

  it('emits close when close button is clicked', async () => {
    const wrapper = await factory()
    await wrapper.find('.modal-close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('does not render when isOpen is false', async () => {
    const wrapper = await factory({ isOpen: false })
    expect(wrapper.find('form').exists()).toBe(false)
  })
})
