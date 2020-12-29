<template>
  <div>
    <form :action="`http://localhost:3000/middlegoal/modify/${this.longgoalid}`" method="post">
    <b-input-group v-for="i in middlegoals" v-bind:key="i.id">
      <div :id="i.id">
          <b-form-input style="margin-top: 10px;" :value=i.middlegoal :name=i.id></b-form-input><b-button variant="danger"  v-on:click="middlegoaldel(i.id)">del</b-button>
      </div>
    </b-input-group>
    <div id="middlegoalgroup"></div>
    <b-button style="margin-top: 10px;" v-on:click="addinput"><b-icon icon="plus-square"></b-icon></b-button>
    <b-button type="submit" style="margin-top: 10px;"><b-icon icon="arrow-bar-up"></b-icon></b-button>
    </form>
  </div>
</template>

<script>
export default {
      data: function(){
        return {
          i:0,
          longgoalid : window.location.pathname.split('/')[3]
          }
      },
    computed:{
        middlegoals: function(){
            return this.$store.state.middlegoal;
        },
        middlegoalslens : function(){
          return Object.keys(this.$store.state.middlegoal).length
        }
    },
    methods:{
      addinput : function(){
        this.i+=1;
        var parent = document.getElementById("middlegoalgroup")
        var p = document.createElement('input')
        p.setAttribute('type','text')
        p.setAttribute('class','form-control')
        p.setAttribute('id','__BVID__13')
        p.setAttribute('style','margin-top: 10px;')
        if(this.middlegoalslens !=0){
          p.setAttribute('name',this.middlegoals[this.middlegoalslens-1].id+this.i);
        }else{
          p.setAttribute('name',this.i);
        }
        parent.append(p)
      },
      middlegoaldel : function(id){
        var el = document.getElementById(id);
        el.remove();
      }
    }
}
</script>

<style>

</style>