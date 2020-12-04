<template>
    <div>
        <tr v-for="i in longgoals" v-bind:key="i.longgoal_id">
            <b-button variant="primary">{{i.longgoal}}</b-button>
        </tr>
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
