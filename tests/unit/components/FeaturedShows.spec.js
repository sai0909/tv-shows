// Components
import FeaturedShows from '@/components/FeaturedShows.vue'

// Utilities
import { appImports } from '../imports'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = appImports(createLocalVue())

describe('FeaturedShows.vue', () => {
  let wrapper

  const mountFunction = options => {
    return shallowMount(FeaturedShows, {
      localVue,
      propsData: {
        featuredShows: [
          {
            id: 1,
            name: 'Test data'
          }
        ]
      },
      ...options
    })
  }

  beforeEach(() => {
    wrapper = mountFunction()
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('check for component and props ', () => {
    expect(wrapper.props().featuredShows).toEqual([
      { id: 1, name: 'Test data' }
    ])
  })
})
