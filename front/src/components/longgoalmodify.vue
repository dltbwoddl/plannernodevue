<template>
  <div>
    <b-input-group v-for="i in longgoals" v-bind:key="i.longgoal_id">
      <b-form-input style="margin-top: 10px;" :value=i.longgoal></b-form-input>
    </b-input-group>
    <div id=longgoalgroup></div>
    <b-button>장기목표 추가하기</b-button>
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
        parent.append('<b-form-input style="margin-top: 10px;" placeholder="장기목표 입력"></b-form-input>')
      }
    }
}
</script>

<style>

</style>