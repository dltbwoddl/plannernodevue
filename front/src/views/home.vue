<template>
  <div id="app">
      <longbutton />
      <todolist/>
      <habitlist/>
      
  </div>
</template>

<script>
import longbutton from '../components/longbutton'
import habitlist from '../components/habitlist'
import todolist from '../components/todolist'
export default {
  name: 'App',
  components:{
      longbutton,
      habitlist,
      todolist
  }

}
</script>

<style>

</style>
