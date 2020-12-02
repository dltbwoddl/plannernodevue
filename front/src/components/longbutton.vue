<template>
    <div>    
        <b-button variant="primary">{{hi}}</b-button>
    </div>
</template>

<script>
export default {
    name : 'longbutton',
    data(){
        return {
            hi:this.$store.state.count
            }
    }
}
</script>

<style>

</style>
