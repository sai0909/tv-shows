// Components
import ShowsCard from '@/components/ShowsCard.vue'
// Utilities
import { appImports } from '../imports'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = appImports(createLocalVue())

describe('ShowsCard.vue', () => {
  let wrapper

  const mountFunction = options => {
    return shallowMount(ShowsCard, {
      localVue,
      propsData: {
        item: {
          id: 1,
          name: 'Test data'
        }
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
  it('check for ShowsCard Component', () => {
    const ShowsCardComponent = wrapper.findComponent(ShowsCard)
    expect(ShowsCardComponent.exists()).toBe(true)
  })
  it('check for component and props ', () => {
    expect(wrapper.props().item).toEqual({ id: 1, name: 'Test data' })
  })
})
