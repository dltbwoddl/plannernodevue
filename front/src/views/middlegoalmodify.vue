<template>
  <div>
    <b-button :href="`/middlegoal/${this.longgoal_id}`"><b-icon icon="arrow-left-square"></b-icon></b-button>
    <middlegoalmodify/>
  </div>
</template>

<script>
import middlegoalmodify from '../components/middlegoalmodify'

export default {
   data: function(){
        return {
          longgoal_id:window.location.pathname.split('/')[3]
          }
    },
    components : {
        middlegoalmodify
    }
}
</script>

<style>

</style>