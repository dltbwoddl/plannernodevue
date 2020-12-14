<template>
    <div>
        <div v-for="i in middlegoals" v-bind:key="i.id">
            <b-button :href="i.middlegoal">i.middlegoal</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name : 'longbutton',
    computed:{
        middlegoals: function(){
            return this.$store.state.middlegoals;
        }
    }
}
</script>

<style>

</style>
