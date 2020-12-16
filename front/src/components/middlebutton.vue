<template>
    <div>
        <div v-for="i in middlegoal" v-bind:key="i.id">
            <b-button class="mt-2" block variant="outline-primary">{{i.middlegoal}}</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name : 'longbutton',
    computed:{
        middlegoal: function(){
            return this.$store.state.middlegoal;
        }
    }
}
</script>

<style>

</style>
