<template>
  <div>
    <b-button v-on:click = "goback"><b-icon icon="arrow-left-square"></b-icon></b-button>
    <shortgoalmodifybutton/>
  </div>
</template>

<script>
import shortgoalmodifybutton from '../components/shortgoalmodifybutton'
export default {
  components:{
      shortgoalmodifybutton
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