<template>
    <div>
        <div v-for="i in shortgoal" v-bind:key="i.id">
            <b-button class="mt-2" block variant="outline-primary" :href = "`/todolist/sg/${longgoal_id}/${middlegoal_id}/${i.shortgoal}`">{{i.shortgoal}}</b-button>
        
    
        </div>
    </div>
</template>

<script>
export default {
    name : 'shortbutton',
    computed:{
        shortgoal: function(){
            return this.$store.state.shortgoal;
        }
    },
    data: function(){
        return {
          middlegoal_id:window.location.pathname.split('/')[3],
          longgoal_id:window.location.pathname.split('/')[2]
          }
      }
}
</script>

<style>

</style>
