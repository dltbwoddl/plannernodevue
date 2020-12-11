<template>
    <div class="mt-5">
        <b-list-group v-for="i in todolist" v-bind:key="i.id">
            <b-list-group-item active class="text-center">{{i.habit}}</b-list-group-item>
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
