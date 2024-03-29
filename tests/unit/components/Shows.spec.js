// Components
import Shows from '@/pages/Shows.vue'
import Vuetify from 'vuetify'

// Utilities
import { appImports } from '../imports'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from '../store/mocks/index'

jest.mock('@/store')

const vuetify = new Vuetify()
const localVue = appImports(createLocalVue())

describe('Shows.vue', () => {
  let storeMocks
  let wrapper

  const mountFunction = options => {
    return shallowMount(Shows, {
      localVue,
      store: storeMocks.store,
      vuetify,
      ...options
    })
  }

  beforeEach(() => {
    storeMocks = createStoreMocks()
    wrapper = mountFunction()
  })

  afterEach(() => {
    wrapper.destroy()
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('should get 1 result from Drama genre', () => {
    const results = wrapper.vm.showsByGenre('Drama')

    expect(results[0].id).toEqual(1)
  })

  it('should call pullTvShows when getShows is void', () => {
    storeMocks = createStoreMocks({
      showsGetters: {
        getShows: () => []
      }
    })
    wrapper = mountFunction({ store: storeMocks.store })
    expect(storeMocks.showsActions.pullTvShows).toHaveBeenCalled()
  })
})
