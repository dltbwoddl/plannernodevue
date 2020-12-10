<template>
    <div>
        <div v-for="i in longgoals" v-bind:key="i.longgoal_id">
            <b-button class="mt-2" block variant="outline-primary">{{i.longgoal}}</b-button>
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
    }
}
</script>

<style>

</style>
