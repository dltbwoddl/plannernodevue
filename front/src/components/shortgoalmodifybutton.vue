<template>
  <div>
    <form :action="`http://localhost:3000/shortgoal/modify/${this.middlegoal_id}`" method="post">
    <b-input-group v-for="i in shortgoals" v-bind:key="i.id">
      <div :id="i.id">
          <b-form-input style="margin-top: 10px;" :value=i.shortgoal :name=i.id></b-form-input><b-button variant="danger"  v-on:click="shortgoaldel(i.id)">del</b-button>
      </div>
    </b-input-group>
    <div id="shortgoalgroup"></div>
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
          middlegoal_id : window.location.pathname.split('/')[3]
          }
      },
    computed:{
        shortgoals: function(){
            return this.$store.state.shortgoal;
        },
        shortgoalslens : function(){
          return Object.keys(this.$store.state.shortgoal).length
        }
    },
    methods:{
      addinput : function(){
        this.i+=1;
        var parent = document.getElementById("shortgoalgroup")
        var p = document.createElement('input')
        p.setAttribute('type','text')
        p.setAttribute('class','form-control')
        p.setAttribute('id','__BVID__13')
        p.setAttribute('style','margin-top: 10px;')
        if(this.shortgoalslens !=0){
          p.setAttribute('name',this.shortgoals[this.shortgoalslens-1].id+this.i);
        }else{
          p.setAttribute('name',this.i);
        }
        parent.append(p)
      },
      shortgoaldel : function(id){
        var el = document.getElementById(id);
        el.remove();
      }
    }
}
</script>

<style>

</style>