<template>
    <div>
        <div v-for="i in longgoals" v-bind:key="i.longgoal_id">
            <b-button v-on:click="setlonggoal_id(i.longgoal_id)" :href="`middlegoal/${i.longgoal_id}`" class="mt-2" block variant="outline-primary">{{i.longgoal}}</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name : 'longbutton',
    computed:{
        longgoals: function(){
            return this.$store.state.longgoal;
        }
    },
    methods:{
        setlonggoal_id: function(longgoal_id){
            console.log(300);
            return this.$store.state = longgoal_id;
        }
    }
}
</script>

<style>

</style>
