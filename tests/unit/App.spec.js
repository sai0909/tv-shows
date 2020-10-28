import { shallowMount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { appImports } from './imports'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

describe('In the App Component App.vue', () => {
  let wrapper

  beforeEach(() => {
    const localVue = appImports(createLocalVue())
    wrapper = shallowMount(App, {
      localVue,
      router,
      store
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('Check for component App', () => {
    const appComponent = wrapper.findComponent(App)
    expect(appComponent.exists()).toBe(true)
  })
  describe('it should load the header component', () => {
    it('it should load header', () => {
      expect(Header).toBeTruthy()
    })
    it('it should have a <header-stub></header-stub>', () => {
      expect(wrapper.html()).toContain('<header-stub></header-stub>')
    })
  })
  describe('it should load the footer component', () => {
    it('it should load footer', () => {
      expect(Footer).toBeTruthy()
    })
    it('it should have a <footer-stub></footer-stub>', () => {
      expect(wrapper.html()).toContain('<footer-stub></footer-stub>')
    })
  })

  it('should call watcher when the route change', async () => {

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$route.name).toMatch('shows')
  })
})
