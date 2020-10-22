import Vue from 'vue'
import VueRouter from 'vue-router'
import Shows from '../pages/Shows.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'shows',
    component: Shows
  },
  {
    path: '/404',
    alias: '*',
    name: 'pageNotFound',
    component: () =>
      import(/* webpackChunkName: "notfound" */ '../pages/PageNotFound.vue')
  },
  {
    path: '/show/:id',
    name: 'show',
    component: () =>
      import(/* webpackChunkName: "Show Detail" */ '../pages/ShowDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
