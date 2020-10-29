// import the api endpoints
import { getAllShows, getShow, getShowImages } from '@/api/shows.api'

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
  getShowFullWidthImg (state) {
    const bgImg = state.showImages.filter(
      image => image.type === 'background'
    )[0]
    return bgImg ? bgImg.resolutions.original.url : ''
  },
  getShowCardImg (state) {
    const cardImg = state.showImages.filter(
      image => image.type === 'poster'
    )[0]
    return cardImg ? cardImg.resolutions.original.url : ''
  }
}

const actions = {
  pullTvShows ({ commit }) {
    return getAllShows().then(response => {
      commit(
        'UPDATE_SHOWS',
        response.data
      )
      commit(
        'UPDATE_GENRES',
        response.data
      )
    })
  },
  pullTvShow ({ commit }, id) {
    return getShow(id).then(response => commit('UPDATE_SHOW_DETAIL', response.data)).catch(error => console.log(error))
  },
  pullTvShowImages ({ commit }, id) {
    return getShowImages(id).then((response) => {
      commit('UPDATE_SHOW_IMGS', response.data)
    }
    ).catch(error => console.log(error))
  }
}

const mutations = {
  UPDATE_SHOWS (state, data) {
    state.shows = data
  },
  UPDATE_GENRES (state, data) {
    state.genres = data
  },
  UPDATE_SHOW_DETAIL (state, data) {
    state.showDetail = data
  },
  UPDATE_SHOW_IMGS (state, data) {
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
