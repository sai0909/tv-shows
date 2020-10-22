// Component imports
import PageNotFound from '@/pages/PageNotFound.vue'

import { appInit } from '../imports'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = appInit(createLocalVue())

describe('404.vue', () => {
  it('should check for component ', () => {
    const wrapper = shallowMount(PageNotFound, {
      localVue
    })
    const notFoundComponent = wrapper.findComponent(PageNotFound)
    expect(notFoundComponent.exists()).toBe(true)
  })
})
