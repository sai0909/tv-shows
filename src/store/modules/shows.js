// import the api endpoints
import { getAllShows, getShow, getShowImages } from '@/api/shows.api'

/**
 * Shows state:
 * - shows (Array of Objects)
 * - genres (Array of Strings)
 * - showDetail (Object)
 * - showImages (Array of Objects)
 */
const state = {
  shows: [],
  genres: [],
  showDetail: [],
  showImages: []
}

const getters = {
  getShows (state) {
    return state.shows.sort((prevValue, nextValue) =>
      prevValue.rating.average < nextValue.rating.average ? 1 : -1)
  },
  getGenres (state) {
    return state.genres.reduce((acc, show) => acc.concat(show.genres), [])
      .filter((genre, index, self) => self.indexOf(genre) === index)
  },
  getTvShowDetails (state) {
    return state.showDetail
  },
  getShowImages (state) {
    return state.showImages
  }
}

const actions = {
  async pullTvShows ({ commit }) {
    return getAllShows().then(response => {
      commit(
        'SET_SHOWS',
        response.data
      )
      commit(
        'SET_GENRES',
        response.data
      )
    })
  },
  async pullTvShow ({ commit }, id) {
    return getShow(id).then(response => commit('SET_SHOW_INFO', response.data))
  },
  async pullTvShowImages ({ commit }, id) {
    return getShowImages(id).then((response) => {
      commit('SET_SHOW_IMAGES', response.data)
    }
    )
  }
}

const mutations = {
  SET_SHOWS (state, data) {
    state.shows = data
  },
  SET_GENRES (state, data) {
    state.genres = data
  },
  SET_SHOW_INFO (state, data) {
    state.showDetail = data
  },
  SET_SHOW_IMAGES (state, data) {
    state.showImages = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
