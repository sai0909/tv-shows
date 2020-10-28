// Components
import ShowDetail from '@/pages/ShowDetail.vue'
// Custom router
import router from '@/router'
// Utilities
import { appImports } from '../imports'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from '../store/__mocks__/index'

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

  describe('Computed properties', () => {
    it('should return a background image and a poster image', () => {
      expect(wrapper.vm.fullWidthImage).toBe('background.jpg')
      expect(wrapper.vm.posterImage).toBe('poster.jpg')
    })
    it('should return a background image and void poster image', () => {
      storeMocks = createStoreMocks({
        showsGetters: {
          getShowImages: () => [
            {
              type: 'background',
              resolutions: {
                original: {
                  url: 'background.jpg'
                }
              }
            }
          ]
        }
      })
      wrapper = mountFunction({ store: storeMocks.store })
      expect(wrapper.vm.fullWidthImage).toBe('background.jpg')
    })
    it('should return a void background image and a poster image', () => {
      storeMocks = createStoreMocks({
        showsGetters: {
          getShowImages: () => [
            {
              type: 'poster',
              resolutions: {
                original: {
                  url: 'poster.jpg'
                }
              }
            }
          ]
        }
      })
      wrapper = mountFunction({ store: storeMocks.store })
      expect(wrapper.vm.fullWidthImage).toBe('')
      expect(wrapper.vm.posterImage).toBe('poster.jpg')
    })
    it('should return a void background image and void poster image', () => {
      storeMocks = createStoreMocks({
        showsGetters: { getShowImages: () => [] }
      })
      wrapper = mountFunction({ store: storeMocks.store })
      expect(wrapper.vm.fullWidthImage).toBe('')
      expect(wrapper.vm.posterImage).toBe('')
    })
  })
})