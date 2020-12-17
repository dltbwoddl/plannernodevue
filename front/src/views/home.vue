<template>
  <div id="app">
      <longbutton />
      <todolist/>
      <habitlist/>
      <b-button href = '/modify' class="mt-2" block variant="outline-primary">장기목표 수정</b-button>
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
