<template>
  <div id="app">
      <b-button href="../"><b-icon icon="arrow-left-square"></b-icon></b-button>
      <middlebutton/>
      <b-button :href = '`/middlegoal/modify/${this.longgoal_id}`' class="mt-2" block variant="outline-primary">중기목표 수정</b-button>
  </div>
</template>

<script>
import middlebutton from '../components/middlebutton'
export default {
  name: 'App',
  components:{
    middlebutton
  },
  data: function(){
        return {
          longgoal_id:window.location.pathname.split('/')[2]
          }
      }
}
</script>

<style>

</style>
