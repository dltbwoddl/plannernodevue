<template>
    <div>
        <p class="mt-3"><b-icon-clock></b-icon-clock>{{date}}<p/>
        <b-list-group class="mt-1" v-for="i in todolist" v-bind:key="i.id">
            <b-list-group-item><b-icon-dot></b-icon-dot>{{i.do}}</b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
export default {
    name : 'todolist',
    computed:{
        todolist: function(){
            return this.$store.state.todolist;
        },
        date : function(){
            var today = new Date();
            var day = today.getDate();  
            day = day >= 10 ? day : '0' + day;  
            var todaydate = `${today.getMonth()+1}.${day} todolist`
            return todaydate
        }
    }
}
</script>

<style>

</style>
