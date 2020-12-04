import Vuex from "vuex"
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        longgoal:new Array()
    },
    mutations: {
      mutatelonggoaldata(state,data){
        // var datas=new Array()
        // var i
        // for(i=0 ; i<data.length; i++){
        //   console.log(i)
        //   console.log(data.length)
        //   console.log(data[i].longgoal)
        //   datas.push(data[i].longgoal)
        // }
        // console.log(datas)
        return state.longgoal=data
      }
    },
    actions:{
      getlonggoal({commit}){
        axios.get('http://localhost:3000/longgoal')
        .then((res)=>{
          console.log(res.data)
        commit('mutatelonggoaldata',res.data)});
      }
    },
    modules:{

    }
  })

export default store