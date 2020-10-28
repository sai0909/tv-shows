// Component imports
import PageNotFound from '@/pages/PageNotFound.vue'

import { appImports } from '../imports'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = appImports(createLocalVue())

describe('404.vue', () => {
  it('should check for component ', () => {
    const wrapper = shallowMount(PageNotFound, {
      localVue
    })
    const notFoundComponent = wrapper.findComponent(PageNotFound)
    expect(notFoundComponent.exists()).toBe(true)
  })
})
