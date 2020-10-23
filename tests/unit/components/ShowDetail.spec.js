// Components
import ShowDetail from '@/pages/ShowDetail.vue'

// Custom router
import router from '@/router'
// Utilities
import { appInit } from '../imports'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from '../store/__mocks__/index'

jest.mock('@/store')

const localVue = appInit(createLocalVue())

describe('ShowDetail.vue', () => {
  let storeMocks
  let wrapper

  const mountFunction = options => {
    storeMocks = createStoreMocks()
    const next = jest.fn()
    return shallowMount(ShowDetail, {
      localVue,
      propsData: {
        id: 1
      },
      router,
      store: storeMocks.store,
      next,
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
      expect(wrapper.vm.backgroundImage).toBe('background.jpg')
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
      expect(wrapper.vm.backgroundImage).toBe('background.jpg')
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
      expect(wrapper.vm.backgroundImage).toBe('')
      expect(wrapper.vm.posterImage).toBe('poster.jpg')
    })
    it('should return a void background image and void poster image', () => {
      storeMocks = createStoreMocks({
        showsGetters: { getShowImages: () => [] }
      })
      wrapper = mountFunction({ store: storeMocks.store })
      expect(wrapper.vm.backgroundImage).toBe('')
      expect(wrapper.vm.posterImage).toBe('')
    })
  })

  it('should call the before route update hook', async () => {
    ShowDetail.beforeRouteUpdate.call(
      wrapper.vm,
      {
        params: {
          id: 1
        }
      },
      {}
    )
    await wrapper.vm.$nextTick()

    expect(storeMocks.showsActions.fetchShow).toHaveBeenCalled()
    expect(storeMocks.showsActions.fetchShowImages).toHaveBeenCalled()
  })

  it('should not call the before route update hook', async () => {
    const next = jest.fn()

    ShowDetail.beforeRouteUpdate.call(
      wrapper.vm,
      {
        params: {
          id: '1abc'
        }
      },
      {},
      next
    )
    await wrapper.vm.$nextTick()
    router.push('/404')
  })
})
