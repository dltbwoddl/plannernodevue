<template>
    <div>
        <b-button href='../'><b-icon icon="arrow-left-square"></b-icon></b-button>
        <form :action="`http://localhost:3000/habitmodify`" method="post">
            <b-input-group v-for="i in habitlists" v-bind:key="i.id">
                <div :id="i.id">
                    <b-form-input style="margin-top: 10px;" :value=i.habit :name=i.id></b-form-input><b-button variant="danger"  v-on:click="habitlistdel(i.id)">del</b-button>
                </div>
            </b-input-group>
        <div id="habitlistgoalgroup"></div>
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
        habitlists: function(){
            return this.$store.state.habit;
        },
        habitlistslens : function(){
          return Object.keys(this.$store.state.habit).length
        }
    },
    methods:{
      addinput : function(){
        this.i+=1;
        var parent = document.getElementById("habitlistgoalgroup")
        var p = document.createElement('input')
        p.setAttribute('type','text')
        p.setAttribute('class','form-control')
        p.setAttribute('id','__BVID__13')
        p.setAttribute('style','margin-top: 10px;')
        if(this.habitlists !=0){
          p.setAttribute('name',this.habitlists[this.habitlistslens-1].id+this.i);
        }else{
          p.setAttribute('name',this.i);
        }
        parent.append(p)
      },
      habitlistdel : function(id){
        var el = document.getElementById(id);
        el.remove();
      },
    goback : function(){
        return history.back();
        }
    }
}
</script>

<style>

</style>