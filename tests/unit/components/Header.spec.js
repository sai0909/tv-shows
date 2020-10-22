// Components
import Header from '@/components/Header.vue'
import Vuetify from 'vuetify'

// Utilities
import { appInit } from '../imports'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = appInit(createLocalVue())

describe('Header.vue', () => {
  let wrapper
  let vuetify
  const mountFunction = options => {
    return shallowMount(Header, {
      localVue,
      vuetify,
      ...options
    })
  }

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mountFunction()
  })

  afterEach(() => {
    wrapper.destroy()
  })

  // Inspect the raw component options
  it('should have data', () => {
    expect(typeof Header.data).toBe('function')
  })
})
