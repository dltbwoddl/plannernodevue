import Vuex from "vuex"
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        longgoal:[]
    },
    mutations: {
      mutatelonggoaldata(state,data){
        return state.longgoal=data
      }
    },
    actions:{
      getlonggoal(commit){
        axios.get('http://localhost:3000/longgoal')
        .then((res)=>{
          console.log(res)
        commit('mutatelonggoaldata',res)});
      }
    },
    modules:{

    }
  })

export default store