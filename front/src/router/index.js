import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import middlegoal from '../views/middlegoal.vue'
import store from '../store/index.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component : Home,
    beforeEnter : (to, from, next)=> {
      store.dispatch('getlonggoal')
      store.dispatch('gethabit')
      store.dispatch('gettodolist')
      next()
    }
  },  
  {
    path : '/middlegoal/:longgoal_id',
    name : 'middlegoal',
    component : middlegoal,
    beforeEnter:(to, from, next)=>{
    var pathname = window.location.pathname.split( '/' );
    console.log(pathname[2])
    store.dispatch('getmiddlegoal',pathname[2])     
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
