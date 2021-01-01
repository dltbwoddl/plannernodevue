<template>
  <div>
    <b-button v-on:click = "goback"><b-icon icon="arrow-left-square"></b-icon></b-button>
    <todolistmodify/>
  </div>
</template>

<script>
import todolistmodify from '../components/todolistmodify'
export default {
  components:{
      todolistmodify
    },
    methods:{
      goback : function(){
        return history.back();
        }
    }
}
</script>

<style>

</style>