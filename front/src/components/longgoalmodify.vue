<template>
  <div>
    <form action="post">
    <b-input-group v-for="i in longgoals" v-bind:key="i.longgoal_id">
      <b-form-input style="margin-top: 10px;" :value=i.longgoal></b-form-input>
    </b-input-group>
    <div id="longgoalgroup"></div>
    </form>
    <b-button style="margin-top: 10px;" v-on:click="addinput">장기목표 추가하기</b-button>
  </div>
</template>

<script>
export default {
    computed:{
        longgoals: function(){
            return this.$store.state.longgoal;
        }
    },
    methods:{
      addinput : function(){
        var parent = document.getElementById("longgoalgroup")
        var p = document.createElement('input')
        p.setAttribute('type','text')
        p.setAttribute('class','form-control')
        p.setAttribute('id','__BVID__13')
        p.setAttribute('style','margin-top: 10px;')
        parent.append(p)
      }
    }
}
</script>

<style>

</style>