<template>
  <div>
    <form :action="`http://localhost:3000/todolist/modify/${this.shortgoal}`" method="post">
    <b-input-group v-for="i in todolists" v-bind:key="i.id">
      <div :id="i.id">
          <b-form-input style="margin-top: 10px;" :value=i.do :name=i.id></b-form-input><b-button variant="danger"  v-on:click="todolistdel(i.id)">del</b-button>
      </div>
    </b-input-group>
    <div id="todolistgoalgroup"></div>
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
          shortgoal : window.location.pathname.split('/')[3]
          }
      },
    computed:{
        todolists: function(){
            return this.$store.state.todolist;
        },
        todolistslens : function(){
          return Object.keys(this.$store.state.todolist).length
        }
    },
    methods:{
      addinput : function(){
        this.i+=1;
        var parent = document.getElementById("todolistgoalgroup")
        var p = document.createElement('input')
        p.setAttribute('type','text')
        p.setAttribute('class','form-control')
        p.setAttribute('id','__BVID__13')
        p.setAttribute('style','margin-top: 10px;')
        if(this.todolists !=0){
          p.setAttribute('name',this.todolists[this.todolistslens-1].id+this.i);
        }else{
          p.setAttribute('name',this.i);
        }
        parent.append(p)
      },
      todolistdel : function(id){
        var el = document.getElementById(id);
        el.remove();
      }
    }
}
</script>

<style>

</style>