import Vue from 'vue'
import Vuex from 'vuex'

// Module imports
import Shows from './modules/shows'
import Search from './modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Shows: Shows,
    Search: Search
  }
})
