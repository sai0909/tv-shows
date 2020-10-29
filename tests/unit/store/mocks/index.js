/* eslint-disable no-undef */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const showsGetters = {
  getShows: jest.fn().mockReturnValue([
    {
      id: 1,
      name: 'GOT',
      genres: ['Drama']
    }
  ]),
  getGenres: jest.fn().mockReturnValue(['Drama']),
  getTvShowDetails: jest.fn().mockReturnValue({
    id: 1,
    name: 'GOT'
  }),
  getShowFullWidthImg: jest.fn().mockReturnValue('http://static.tvmaze.com/uploads/images/original_untouched/219/549603.jpg'
  ),
  getShowCardImg: jest.fn().mockReturnValue(
    'http://static.tvmaze.com/uploads/images/original_untouched/1/3059.jpg'
  )
}

export const showsActions = {
  pullTvShows: jest.fn(),
  pullTvShow: jest.fn(),
  pullTvShowImages: jest.fn()
}

export const showsMutations = {
  UPDATE_SHOWS: jest.fn(),
  UPDATE_GENRES: jest.fn(),
  UPDATE_SHOW_DETAIL: jest.fn(),
  UPDATE_SHOW_IMGS: jest.fn()
}

export const showsState = {
  shows: [
    {
      id: 1,
      name: 'Test'
    }
  ],
  genres: ['Drama'],
  showDetail: {
    id: 1,
    name: 'Test'
  },
  showImages: [
    {
      id: 1,
      type: 'background',
      resolutions: {
        original: {
          url: 'background.jpg'
        }
      }
    }
  ]
}

export function __createMocks (
  custom = {
    showsState: {},
    showsGetters: {},
    showsActions: {},
    showsMutations: {}
  }
) {
  const mockShowsState = Object.assign({}, showsState, custom.showsState)
  const mockShowsGetters = Object.assign({}, showsGetters, custom.showsGetters)
  const mockShowsActions = Object.assign({}, showsActions, custom.showsActions)
  const mockShowsMutations = Object.assign(
    {},
    showsMutations,
    custom.showsMutations
  )

  return {
    showsState: mockShowsState,
    showsGetters: mockShowsGetters,
    showsActions: mockShowsActions,
    showsMutations: mockShowsMutations,

    store: new Vuex.Store({
      modules: {
        Shows: {
          namespaced: true,
          state: mockShowsState,
          getters: mockShowsGetters,
          actions: mockShowsActions,
          mutations: mockShowsMutations
        }
      }
    })
  }
}

export const store = __createMocks().store
