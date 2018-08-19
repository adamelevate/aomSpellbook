<template>
  <div id="mark-container" :class="{'dektop': $mq == 'md' || $mq =='lg'}">
    <v-layout :column="$mq == 'xs' || $mq =='sm'" :reverse="$mq == 'xs' || $mq =='sm'">
      <v-flex class="details" xs12 sm12 md7 lg7>
        <!-- Makes a mark -->
        <div class="skill" v-if="mark.Name">

          <v-layout align-center justify-start row fill-height>
            <v-flex class="flex-auto">
              <v-avatar size="60" color="teal" class="skillMark">
                <img class="portrait"  :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/skills/'+mark.Name+'.png'">
                <!-- <span>{{mark.Name | firstLetter}}</span> -->
              </v-avatar>
            </v-flex>
            <v-flex>
              <h1>{{mark.Name | swapSpace}}</h1>
              <div class="title blue-grey--text text--lighten-1">Marks <strong>{{mark.Affects}}</strong> with <strong>{{mark.ClassMark || mark.FactionMark | swapSpace}}</strong> icon</div>
            </v-flex>
          </v-layout>
          <v-layout class="card" wrap row>
            <v-flex class="markSet">
              <v-layout align-center>
                <v-flex class="flex-auto ">
                  <div class="" v-if="!mark.Removal">
                    <v-avatar size="60" color="gray">
                      <img v-if="mark.ClassMark" class="portrait" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/roles/Icon_Role_'+mark.ClassMark+'.png'">
                      <img v-else-if="mark.FactionMark" class="portrait" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/factions/Icon_Faction_'+mark.FactionMark+'.png'">
                    </v-avatar>
                    <v-icon class="set">arrow_drop_down</v-icon>
                  </div>
                  <div class="" v-if="mark.Removal">
                    <v-avatar size="60" color="gray">
                      <v-icon v-if="mark.Removal == 'Self'">person</v-icon>
                      <img v-else-if="mark.Removal == 'Kobold'" class="portrait" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/factions/Icon_Faction_'+mark.Faction+'.png'">
                      <v-icon v-else>group</v-icon>
                    </v-avatar>
                    <v-icon class="set">arrow_drop_down</v-icon>
                  </div>
                </v-flex>
                <v-flex v-if="mark.Description" class="description" xs12>{{mark.Description}}</v-flex>
                <v-flex v-if="!mark.Description" class="description" xs12>
                  <small><i>no specific modifiers</i></small><br>
                  Places a <strong>{{mark.ClassMark || mark.FactionMark | swapSpace}}</strong> mark that an ally can trigger.
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout wrap>
                <v-flex xs6>Skill Level Required</v-flex>
                <v-flex xs6>{{mark.SkillLvl}}</v-flex>
                <v-flex xs6>Hero Level Required</v-flex>
                <v-flex xs6>{{mark.HeroLvl}}</v-flex>
                <v-flex xs6>Equiment Level Required</v-flex>
                <v-flex xs6>{{mark.EquipLvl}}</v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </div>
        <div class="triggers" v-if="!mark.Removal">
          <br>
            <h3>Skills that "Trigger" this mark:</h3>
            <markTrigger :mark="mark"></markTrigger>
        </div>
      </v-flex>
      <v-flex xs12 sm12 md5 lg5>
        <div class="heroPortrait" :class="{'desktop':$mq == 'md' || $mq == 'lg'}">
          <transition name="fade">
            <img class="" v-on:load="checkImage" v-show="imageLoaded" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/heros/'+mark.Hero+'.jpg'">
          </transition>
          <div class="heroName">{{mark.Hero}}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-btn  class="close" fab @click="closeCard"><v-icon>close</v-icon></v-btn>
  </div>
</template>

<script>

import markTrigger from '@/components/markTrigger.vue'
export default {
  name: 'markSpell',
  components:{
    markTrigger
  },
  props: ['mark'],
  data (){
    return{
      // mark: []
      imageLoaded : false,
    }
  },
  methods: {
    closeCard(){
      this.$emit('closeCard', 'close')
    },
    checkImage(){
      this.imageLoaded=true;
    }
  },
  beforeDestroy(){
    this.imageLoaded = false;
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

    .title{
      // color:rgba(49,49,73,1);
      font-weight: normal;
      strong{
        opacity: 1;
        color: #fff;
      }
    }


    .heroPortrait{
      position: relative;
      min-height: 300px;
      &.desktop{
        min-height: 447px;
      }
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
         &.fade-enter-active {
            transition: opacity 1.5s ease-in-out;
          }
         &.fade-enter-to {
            opacity: 1;
          }
         &.fade-enter {
            opacity: 0;
          }
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
        .v-avatar.skillMark{
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
        .markSet{
          padding-bottom: 5px;
          margin-bottom: 10px;
          border-bottom: 1px solid rgba(20,19,37, 1);

          .v-icon.set{
            margin: 0 auto;
            display: block;
            color: #fff;
            text-align: center;
            font-size: 38px;
            margin-top: -5px;
            line-height: 14px;
            text-shadow: 1px 1px 4px rgba(0,0,0,.7);
          }
          .v-avatar .v-icon{
            font-size: 45px;
            color: #fff;
          }
          .description{
            padding-left: 8px;
          }
        }
      }
    }
    .close{
      position: fixed;
      top: 2%;
      right: 2%;
    }
    &.desktop{
      height: 100vh;
      border: 2px solid rgba(255,255,255,.75);
      .close{
        position: absolute;
      }
    }
  }
</style>
