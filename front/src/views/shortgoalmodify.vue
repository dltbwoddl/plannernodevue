<template>
  <div>
    <b-button :href = "`/shortgoal/${this.longgoal_id}/${this.shortgoal_id}`"><b-icon icon="arrow-left-square"></b-icon></b-button>
    <shortgoalmodifybutton/>
  </div>
</template>

<script>
import shortgoalmodifybutton from '../components/shortgoalmodifybutton'
export default {
  data: function(){
        return {
          shortgoal_id:window.location.pathname.split('/')[3],
          longgoal_id : window.location.pathname.split('/')[2]
          }
    },
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