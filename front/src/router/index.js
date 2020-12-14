import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import middlegoal from '../views/middlegoal.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component : Home
  },  
  {
    path : '/middlegoal/:longgoal_id',
    name : 'middlegoal',
    component : middlegoal
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
