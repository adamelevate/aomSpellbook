<template>
  <div id="mark-container" :class="{'dektop': $mq == 'md' || $mq =='lg'}">
    <v-layout :column="$mq == 'xs' || $mq =='sm'" :reverse="$mq == 'xs' || $mq =='sm'">
      <v-flex class="details" xs12 sm12 md7 lg7>
        <!-- Makes a mark -->
        <div class="skill" v-if="mark.Name">

          <v-layout align-center justify-start row fill-height>
            <v-flex class="flex-auto">
              <v-avatar size="60" color="teal">
                <img class="portrait" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/skills/'+mark.Name+'.png'">
                <!-- <span>{{mark.Name | firstLetter}}</span> -->
              </v-avatar>
            </v-flex>
            <v-flex>
              <h1>{{mark.Name | swapSpace}}</h1>
              <strong class="title">Marks {{mark.Affects}}</strong>
            </v-flex>
          </v-layout>
          <v-layout class="card" wrap>
            <v-flex v-if="mark.Description" class="description" xs12>{{mark.Description}}</v-flex>
            <v-flex xs6>Skill Level Required</v-flex>
            <v-flex xs6>{{mark.SkillLvl}}</v-flex>
            <v-flex xs6>Hero Level Required</v-flex>
            <v-flex xs6>{{mark.HeroLvl}}</v-flex>
            <v-flex xs6>Equiment Level Required</v-flex>
            <v-flex xs6>{{mark.EquipLvl}}</v-flex>
          </v-layout>
        </div>
        <div class="triggers">
          <br>
            <h3>Heros who "trigger" this mark:</h3>
            <strong class="light-yellow light-yellow--lighten-2">Coming soon!</strong>
        </div>
      </v-flex>
      <v-flex xs12 sm12 md5 lg5>
        <div class="portrait">
          <img class="" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/heros/'+mark.Hero+'.jpg'">
          <div class="heroName">{{mark.Hero}}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-btn  class="close" fab @click="closeCard"><v-icon>close</v-icon></v-btn>
  </div>
</template>

<script>
export default {
  name: 'markSpell',
  props: ['mark'],
  data (){
    return{
      // mark: []
    }
  },
  methods: {
    closeCard(){
      this.$emit('closeCard', 'close')
    }
  },
  filters:{
    swapSpace: function(e){
      // console.log('e',e, this.mark);
      return e.replace(/_/g, " ")
    },
    firstLetter: function(e){
      return e.charAt(0);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #mark-container{
    background: rgba(20,19,37, 1);
    color: #fff;
    border: 2px solid rgba(255,255,255,.75);
    .title{
      opacity: .5;
    }

    .portrait{
      position: relative;
      &:before {
  		content: "";
  		position: absolute;
  		top: 0;
  		bottom: 0;
  		left: 0;
  		right: 0;
  		// box-shadow: inset 0 0 8px rgba(0,0,0,.6);
  		// -moz-box-shadow: inset 0 0 8px rgba(0,0,0,.6);
  		// -webkit-box-shadow: inset 0 0 8px rgba(0,0,0,.6);
      -webkit-box-shadow: inset 3px -12px 5px 0px rgba(20,19,37,0.75);
      -moz-box-shadow: inset 3px -12px 5px 0px rgba(20,19,37,0.75);
      box-shadow: inset 3px -12px 5px 0px rgba(20,19,37,1);
  	   }
       img{
         width: 100%;
       }
       .heroName{
         font-size: 26px;
         opacity: .65;
         font-weight: bold;
         text-shadow: 1px 1px 0 black;
         position: absolute;
         bottom: 18px;
         display: block;
         text-align: center;
         width: 100%;
       }
    }
    .details{
      padding: 8px 16px;
      .skill{
        padding: 5px;
        .v-avatar{
          margin: 0 8px;
          img{border: 2px solid white;}
        }
        h1{
          text-align: left;
          margin-bottom: 0;
          line-height: 1.2em;
        }
        .title{
          font-size: 16px!important;
        }
      }
      .card{
        margin-top: 15px;
        background: rgba(49,49,73,1);
        padding: 8px;
        .flex{
          margin-bottom:5px;
          font-size: 16px;
        }
        .description{
          padding-bottom: 5px;
          margin-bottom: 10px;
          border-bottom: 1px solid rgba(20,19,37, 1);
        }
      }
    }
    .close{
      position: absolute;
      top: 2%;
      right: 2%;
    }
    &.desktop{
      height: 100vh;

    }
  }
</style>
