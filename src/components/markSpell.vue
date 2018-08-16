<template>
  <div id="mark-container" :class="$mq == 'md' || $mq =='lg'">
    <v-layout :column="$mq == 'xs' || $mq =='sm'" :reverse="$mq == 'xs' || $mq =='sm'">
      <v-flex class="details" xs12 sm12 md7 lg7>
        <!-- Makes a mark -->
        <div class="skill" v-if="mark.Skill.Name">
          <strong class="title">Marks </strong>
          <v-layout align-center justify-start row fill-height>
            <v-flex class="flex-auto">
              <v-avatar size="60" color="teal">
                <!-- <img :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/skill/'+data.item+'.png'"> -->
                <span>{{mark.Skill.Name | firstLetter}}</span>
              </v-avatar>
            </v-flex>
            <v-flex>
              <h1>{{mark.Skill.Name | swapSpace}}</h1>
            </v-flex>
          </v-layout>

        </div>
        <!-- No Mark, jsut a trigger -->
        <div class="skill" v-else>
          <strong>Triggers</strong>
          <!-- <h1>{{mark.Skill.Name}}</h1> -->
        </div>
      </v-flex>
      <v-flex xs12 sm12 md5 lg5>
        <div class="portrait">
          <img class="" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/heros/'+mark.Hero+'.jpg'">
          <div class="heroName">{{mark.Hero}}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout>

    </v-layout>
    <v-btn  class="close" color="white" fab outline @click="closeCard"><v-icon>close</v-icon></v-btn>
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
    background: #0e1c2e;
    height: 100vh;
    color: #fff;

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
      -webkit-box-shadow: inset 3px -12px 5px 0px rgba(14,28,46,0.75);
      -moz-box-shadow: inset 3px -12px 5px 0px rgba(14,28,46,0.75);
      box-shadow: inset 3px -12px 5px 0px rgba(14,28,46,0.75);
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
      padding: 8px;
      .skill{
        .v-avatar{
          margin: 0 8px;
        }
        h1{
          text-align: left;
        }
      }
    }
    .close{
      position: absolute;
      top: 0;
      right: 0;
    }
    &.desktop{

    }
  }
</style>
