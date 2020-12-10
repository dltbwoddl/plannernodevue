<template>
  <div id="app">
      <longbutton/>
      <habitlist/>
  </div>
</template>

<script>
import longbutton from '../components/longbutton'
import habitlist from '../components/habitlist'
export default {
  name: 'App',
  components:{
      longbutton,
      habitlist
  }

}
</script>

<style>

</style>
