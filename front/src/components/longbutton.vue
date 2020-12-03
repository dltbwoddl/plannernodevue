<template>
    <div>    
        <b-button variant="primary">{{longgoal}}</b-button>
        
    </div>
</template>

<script>
export default {
    name : 'longbutton',
    data(){
        return {
            longgoal : this.$store.state.longgoal
            }
    },
}
</script>

<style>

</style>
