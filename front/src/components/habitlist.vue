<template>
    <div>
        <div v-for="i in habit" v-bind:key="i.id">
            <b-button class="mt-2" block variant="outline-primary">{{i.habit}}</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name : 'longbutton',
    computed:{
        habit: function(){
            return this.$store.state.habit;
        }
    }
}
</script>

<style>

</style>
