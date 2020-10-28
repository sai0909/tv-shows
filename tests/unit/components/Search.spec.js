import store from '@/store'

import Search from '@/pages/Search.vue'
import Vuetify from 'vuetify'
import { appImports } from '../imports'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const vuetify = new Vuetify()
const localVue = appImports(createLocalVue())

describe('Search.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mountFunction()
  })

  afterEach(() => {
    wrapper.destroy()
    jest.resetModules()
    jest.clearAllMocks()
  })

  const mountFunction = options => {
    return shallowMount(Search, {
      localVue,
      store,
      vuetify,
      ...options,
      data: () => ({ query: '', timeOut: null, loading: false })
    })
  }

  it('check for search component', () => {
    const searchComponent = wrapper.findComponent(Search)
    expect(searchComponent.exists()).toBe(true)
  })

  it('should have a query value of test', done => {
    wrapper.vm.query = 'test'
    wrapper.vm
      .searchShows()
      .then(() => {
        expect(wrapper.vm.query).toMatch('test')
      })
      .catch((error) => { console.log(error) })
      .finally(done)
  })
  it('it should have a search input text field', () => {
    expect(wrapper.find('.search-field')).toBeTruthy()
  })

  it('input Debounce to be called in the searchshow', async () => {
    wrapper.vm.loading = true
    jest.useFakeTimers()
    wrapper.vm.debounceInput()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    jest.runAllTimers()
    wrapper.vm.searchShows()
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500)
  })
})
