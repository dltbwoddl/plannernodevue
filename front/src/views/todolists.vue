<template>
    <div>
        <b-button :href = "`/shortgoal/${longgoal_id}/${middlegoal_id}`"><b-icon icon="arrow-left-square"></b-icon></b-button>
        <b-list-group class="mt-1" v-for="i in todolist" v-bind:key="i.id">
            <b-list-group-item><b-icon-dot></b-icon-dot>{{i.date}}{{i.do}}</b-list-group-item>
        </b-list-group>
        <b-button :href = '`/todolistmodify/${longgoal_id}/${middlegoal_id}/${this.shortgoal}`' class="mt-2" block variant="outline-primary">todolist 수정</b-button>
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
          shortgoal:window.location.pathname.split('/')[5],
          middlegoal_id : window.location.pathname.split('/')[4],
          longgoal_id : window.location.pathname.split('/')[3]
        }
    },
    methods:{
      goback : function(){
        return history.back();
        }
    }
}
</script>

<style>

</style>
