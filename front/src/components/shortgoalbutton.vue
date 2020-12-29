<template>
    <div>
        <div v-for="i in shortgoal" v-bind:key="i.id">
            <b-button class="mt-2" block variant="outline-primary" :href = "`/todolist/${i.shortgoal}`">{{i.shortgoal}}</b-button>
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
    }
}
</script>

<style>

</style>
