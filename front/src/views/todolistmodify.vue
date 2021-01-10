<template>
  <div>
    <b-button :href = "`/todolist/sg/${this.shortgoalname}`"><b-icon icon="arrow-left-square"></b-icon></b-button>
    <todolistmodify/>
  </div>
</template>

<script>
import todolistmodify from '../components/todolistmodify'
export default {
  data: function(){
        return {
          shortgoalname:window.location.pathname.split('/')[3]
          }
    },
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