import Vue from 'vue'
import Vuex from 'vuex'

// Module imports
import Shows from './modules/shows'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Shows: Shows
  }
})
