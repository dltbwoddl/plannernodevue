<template>
    <div class="mt-2">
        <p class="mt-4"><b-icon-list-ol></b-icon-list-ol>습관 list</p>
        <b-list-group v-for="i in habit" v-bind:key="i.id">
            <b-list-group-item><b-icon-dot></b-icon-dot>{{i.habit}}</b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
export default {
    computed:{
        name : 'habit',
        habit: function(){
            return this.$store.state.habit;
        }
    }
}
</script>

<style>

</style>
