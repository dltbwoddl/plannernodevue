import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import middlegoal from '../views/middlegoal.vue'
import longgoalmodify from '../views/modify.vue'
import store from '../store/index.js'
import middlegoalmodify from '../views/middlegoalmodify.vue'
import shortgoal from "../views/shortgoal.vue"
import shortgoalmodify from "../views/shortgoalmodify.vue"
import todolists from'../views/todolists'
import todolistmodify from '../views/todolistmodify.vue'
import habit from '../views/habit.vue'
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
    path :"/shortgoal/:longgoal_id/:middlegoal_id",
    name : 'shortgoal',
    component:shortgoal,
    beforeEnter:(to,from,next)=>{
      var pathname = window.location.pathname.split('/');
      store.dispatch('getshortgoal', pathname[3]);
      next();
    }
  },
  {
    path : '/shortgoalmodify/:longgoal_id/:middlegoal_id',
    name:'shortgoalmodify',
    component : shortgoalmodify,
    beforeEnter:(to,from, next)=>{
      var pathname = window.location.pathname.split('/');
      store.dispatch('getshortgoal', pathname[3])
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
  },
  {
    path : '/todolistmodify/:longgoal_id/:middlegoal_id/:shortgoal',
    name : todolistmodify,
    component : todolistmodify,
    beforeEnter:(to, from, next)=>{
      var pathname = window.location.pathname.split('/');
      store.dispatch('getshortgoaltodolist',pathname[4]);
      next();
    }
  },
  {
    path:'/todolist/sg/:longgoal_id/:middlegoal_id/:shortgoal',
    name : todolists,
    component : todolists,
    beforeEnter:(to, from, next)=>{
      var pathname = window.location.pathname.split('/');
      store.dispatch('getshortgoaltodolist',pathname[5]);
      next();
    }
  },
  {
    path : '/habitmodify',
    name : habit,
    component : habit,
    beforeEnter:(to,from, next)=>{
      store.dispatch('gethabit')
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
