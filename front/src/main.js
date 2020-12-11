import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import axios from 'axios'
Vue.use(BootstrapVue)
Vue.config.productionTip = false

store.dispatch('getlonggoal')
store.dispatch('gethabit')
store.dispatch('gettodolist')

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
