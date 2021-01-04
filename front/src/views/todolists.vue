<template>
    <div>
        <b-list-group class="mt-1" v-for="i in todolist" v-bind:key="i.id">
            <b-list-group-item><b-icon-dot></b-icon-dot>{{i.date}}{{i.do}}</b-list-group-item>
        </b-list-group>
        <b-button :href = '`/todolist/modify/${this.shortgoal}`' class="mt-2" block variant="outline-primary">todolist 수정</b-button>
    </div>
</template>

<script>
export default {
    name : 'todolist',
    computed:{
        todolist: function(){
            return this.$store.state.todolist;
        }
    },
    data: function(){
        return {
          shortgoal:window.location.pathname.split('/')[3]
        }
    }
}
</script>

<style>

</style>
