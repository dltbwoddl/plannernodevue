import Vuex from "vuex"
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        longgoal:new Array(),
        habit:new Array(),
        todolist:new Array()

    },
    mutations: {
      mutatelonggoaldata(state,data){
        return state.longgoal=data
      },
      mutatehabit(state,data){
        return state.habit=data
      },
      mutatetodolist(state,data){
        return state.todolist=data
      }
    },
    actions:{
      getlonggoal({commit}){
        axios.get('http://localhost:3000/longgoal')
        .then((res)=>{
          console.log(res.data)
          commit('mutatelonggoaldata',res.data)
        });
      },
      gethabit({commit}){
        axios.get('http://localhost:3000/habit')
        .then((res)=>{
          console.log(res.data)
          commit('mutatehabit',res.data);
        })
      },
      gettodolist({commit}){
        axios.get('http://localhost:3000/todolist')
        .then((res)=>{
          console.log(res.data)
          commit('mutatetodolist',res.data);
        })
      }
    },
    modules:{

    }
  })

export default store