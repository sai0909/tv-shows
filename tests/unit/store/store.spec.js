// Api utilities
import moxios from 'moxios'
import api from '@/api'

// Utilities
import { __createMocks as createStoreMocks } from './mocks/index'
import shows from '@/store/modules/shows'

jest.mock('@/store')

describe('Store management', () => {
  let storeMocks

  beforeEach(() => {
    storeMocks = createStoreMocks()
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  describe('Actions', () => {
    beforeEach(() => {
      moxios.install(api)
    })

    afterEach(() => {
      moxios.uninstall(api)
    })

    it('when pullTvShows is call should commit SET_SHOWS and UPDATE_GENRES mutations', async () => {
      const commit = jest.fn()
      const showsData = [
        {
          id: 2,
          name: 'Love Actually',
          genres: ['Drama', 'Science-Fiction', 'Thriller'],
          rating: { average: 9.5 }
        },
        {
          id: 3,
          name: 'GOT',
          genres: ['Drama', 'Thriller'],
          rating: { average: 8.5 }
        }
      ]
      shows.actions.pullTvShows({ commit }).then(() => {
        expect(commit).toHaveBeenCalledWith('SET_SHOWS', showsData)
        expect(commit).toHaveBeenCalledWith('UPDATE_GENRES', true)
      })
    })

    it('when pullTvShow is call should commit UPDATE_SHOW_DETAIL mutation', async () => {
      const commit = jest.fn()

      shows.actions.pullTvShow({ commit }, 1).then(() => {
        expect(commit).toHaveBeenCalledWith('UPDATE_SHOW_DETAIL', true)
      })
    })

    it('when pullTvShowImages is call should commit UPDATE_SHOW_IMGS mutation', done => {
      const commit = jest.fn()

      shows.actions
        .pullTvShowImages({ commit }, 1)
        .then(() => {
          expect(commit).toHaveBeenCalledWith('UPDATE_SHOW_IMGS', true)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(done())
    })
  })

  describe('Mutations', () => {
    it('should change the shows state', () => {
      shows.mutations.UPDATE_SHOWS(storeMocks.showsState, [
        {
          id: 2,
          name: 'Love Actually',
          genres: ['Drama', 'Science-Fiction', 'Thriller'],
          rating: { average: 6.5 }
        }
      ])
      expect(storeMocks.showsState.shows[0].name).toEqual('Love Actually')
    })

    it('should change the genres state', () => {
      shows.mutations.UPDATE_GENRES(storeMocks.showsState, ['Romance'])
      expect(storeMocks.showsState.genres).toEqual(['Romance'])
    })

    it('should change the show info state', () => {
      shows.mutations.UPDATE_SHOW_DETAIL(storeMocks.showsState, {
        id: 2,
        name: 'Love Actually'
      })
      expect(storeMocks.showsState.showDetail.name).toEqual('Love Actually')
    })

    it('should change the show images state to an empty array', () => {
      shows.mutations.UPDATE_SHOW_IMGS(storeMocks.showsState, [])
      expect(storeMocks.showsState.showImages).toEqual([])
    })
  })

  describe('Getters', () => {
    it('return getShows --> Getters', () => {
      shows.getters.getShows(storeMocks.showsState)
      expect(storeMocks.showsState.shows[0].name).toEqual('Test')
    })
    it('return getTvShowDetails --> Getters', () => {
      shows.getters.getTvShowDetails(storeMocks.showsState)
      expect(storeMocks.showsState.showDetail.name).toEqual('Test')
    })
    it('return getGenre --> Getters', () => {
      shows.getters.getGenres(storeMocks.showsState)
      expect(storeMocks.showsState.genres).toEqual(['Drama'])
    })
    it('return getGenre --> Getters', () => {
      shows.getters.getShowFullWidthImg(storeMocks.showsState)
      expect(storeMocks.showsState.showImages[0].resolutions.original.url).toEqual('background.jpg')
    })
  })
})
