// Components
import ShowDetail from '@/pages/ShowDetail.vue'
// Custom router
import router from '@/router'
// Utilities
import { appImports } from '../imports'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from '../store/mocks/index'

jest.mock('@/store')

const localVue = appImports(createLocalVue())

describe('ShowDetail.vue', () => {
  let storeMocks
  let wrapper

  const mountFunction = options => {
    storeMocks = createStoreMocks()
    return shallowMount(ShowDetail, {
      localVue,
      propsData: {
        id: 1
      },
      router,
      store: storeMocks.store,
      ...options
    })
  }

  beforeEach(() => {
    wrapper = mountFunction()
  })

  afterEach(() => {
    wrapper.destroy()
    jest.resetModules()
    jest.clearAllMocks()
  })

  describe('in component', () => {
    it('should check for component ', () => {
      const showDetailComponent = wrapper.findComponent(ShowDetail)
      expect(showDetailComponent.exists()).toBe(true)
    })
  })
})
