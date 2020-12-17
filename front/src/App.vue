<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-link to="/modify/:longgoal_id"></router-link>
    <router-link to='/middlegoal/:longgoal_id'></router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components:{
  }

}
</script>

<style>

</style>
