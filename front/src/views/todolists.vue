<template>
    <div>
        <b-list-group class="mt-1" v-for="i in todolist" v-bind:key="i.id">
            <b-list-group-item><b-icon-dot></b-icon-dot>{{i.date}}{{i.do}}</b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
export default {
    name : 'todolist',
    computed:{
        todolist: function(){
            return this.$store.state.todolist;
        }
    }
}
</script>

<style>

</style>
