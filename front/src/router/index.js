import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import middlegoal from '../views/middlegoal.vue'
import longgoalmodify from '../views/modify.vue'
import store from '../store/index.js'
import middlegoalmodify from '../views/middlegoalmodify.vue'
import shortgoal from "../views/shortgoal.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      store.dispatch('getlonggoal')
      store.dispatch('gethabit')
      store.dispatch('gettodolist')
      next()
    }
  },
  {
    path:'/middlegoal/modify/:longgoal_id',
    name: 'middlegoalmodify',
    component: middlegoalmodify,
    beforeEnter:(to,from, next)=>{
      var pathname = window.location.pathname.split('/')[3];
      store.dispatch('getmiddlegoal',pathname)
      next();
    }
  },
  {
    path: '/middlegoal/:longgoal_id',
    name: 'middlegoal',
    component: middlegoal,
    beforeEnter: (to, from, next) => {
      var pathname = window.location.pathname.split('/');
      store.dispatch('getmiddlegoal', pathname[2])
      next();
    }
  },
  {
    path :"/shortgoal/:middlegoal_id",
    name : 'shortgoal',
    component:shortgoal,
    beforeEnter:(to,from,next)=>{
      var pathname = window.location.pathname.split('/');
      store.dispatch('getshortgoal', pathname[2])
      next();
    }
  },
  {
    path : '/modify',
    name : longgoalmodify,
    component : longgoalmodify,
    beforeEnter: (to, from, next) => {
      store.dispatch('getlonggoal')
      next();
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
