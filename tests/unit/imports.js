// Libs
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import Loader from '@/components/Loader.vue'

import moxios from 'moxios'
import api from '@/api'

function appImports (VueInstance) {
  Vue.use(Vuetify)
  moxios.install(api)
  VueInstance.use(VueRouter)
  VueInstance.use(Vuex)
  VueInstance.component('Loader', Loader)
  Vue.filter('truncate', function (value, limit) {
    if (value.length > limit) {
      value = value.substring(0, limit - 3) + '...'
    }
    return value
  })
  return VueInstance
}

export { appImports }
