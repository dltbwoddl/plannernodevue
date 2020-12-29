<template>
  <div>
      <b-button v-on:click = "goback"><b-icon icon="arrow-left-square"></b-icon></b-button>
      <shortbutton/>
      <b-button :href = '`/shortgoal/modify/${this.middlegoal_id}`' class="mt-2" block variant="outline-primary">단기목표 수정</b-button>
  </div>
</template>

<script>
import shortbutton from '../components/shortgoalbutton'
export default {
  components:{
      shortbutton
    },
    methods:{
      goback : function(){
        return history.back();
        }
    },
    data: function(){
        return {
          middlegoal_id:window.location.pathname.split('/')[2]
          }
      }
}
</script>

<style>

</style>