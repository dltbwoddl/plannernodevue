<template>
  <div>
    <form action="http://localhost:3000/modify" method="post">
    <b-input-group v-for="i in longgoals" v-bind:key="i.longgoal_id">
      <div :id="i.longgoal_id">
          <b-form-input style="margin-top: 10px;" :value=i.longgoal :name=i.longgoal_id></b-form-input><b-button variant="danger"  v-on:click="longgoaldel(i.longgoal_id)">del</b-button>
      </div>
    </b-input-group>
    <div id="longgoalgroup"></div>
    <b-button style="margin-top: 10px;" v-on:click="addinput"><b-icon icon="plus-square"></b-icon></b-button>
    <b-button type="submit" style="margin-top: 10px;"><b-icon icon="arrow-bar-up"></b-icon></b-button>
    </form>
  </div>
</template>

<script>
export default {
      data: function(){
        return {
          i:0
          }
      },
    computed:{
        longgoals: function(){
            return this.$store.state.longgoal;
        },
        longgoalslens : function(){
          return Object.keys(this.$store.state.longgoal).length
        }
    },
    methods:{
      addinput : function(){
        this.i+=1;
        var parent = document.getElementById("longgoalgroup")
        var p = document.createElement('input')
        p.setAttribute('type','text')
        p.setAttribute('class','form-control')
        p.setAttribute('id','__BVID__13')
        p.setAttribute('style','margin-top: 10px;')
        if(this.longgoalslens !=0){
          p.setAttribute('name',this.longgoals[this.longgoalslens-1].longgoal_id+this.i)
        }else{
          p.setAttribute('name',this.i);
        }
        parent.append(p)
      },
      longgoaldel : function(id){
        var el = document.getElementById(id);
        el.remove();
      }
    }
}
</script>

<style>

</style>