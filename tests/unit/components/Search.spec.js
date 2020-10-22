import store from '@/store'

import Search from '@/components/Search.vue'

import { appInit } from '../imports'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = appInit(createLocalVue())

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
      ...options,
      data: () => ({ query: '', timeOut: null, loading: false })
    })
  }

  it('check for search component', () => {
    const searchComponent = wrapper.findComponent(Search)
    expect(searchComponent.exists()).toBe(true)
  })

  it('should have a <v-dialog-stub></v-dialog-stub>', () => {
    expect(wrapper.contains('v-dialog-stub')).toBe(true)
  })
  it('should have a query value of test', done => {
    wrapper.vm.query = 'test'
    wrapper.vm
      .searchShows()
      .then(() => {
        expect(wrapper.vm.query).toMatch('test')
      })
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
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500)
    wrapper.vm.searchShows()
  })

  it('CloseDialog function -> Should close dialog', () => {
    wrapper.vm.query = 'friends'
    wrapper.vm.closeOverlay()
    expect(wrapper.vm.query).toBe('')
  })
})
