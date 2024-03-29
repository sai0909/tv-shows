import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.filter('truncate', function (value, limit) {
  if (value.length > limit) {
    value = value.substring(0, limit - 3) + '...'
  }
  return value
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
