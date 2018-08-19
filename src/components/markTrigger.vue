<template>
  <div id="trigger-container" :class="{'dektop': $mq == 'md' || $mq =='lg'}">
    <div class="card">
      <v-layout @click="toggle(trigger)" class="trigger" wrap align-center justify-space-between v-for="(trigger, index) in filteredTriggers" :key="trigger" :class="{'opened':trigger.clicked}">
        <v-flex class="portrait flex-auto">
          <v-avatar size="60" class="skillMark">
            <img class="portrait"  @error="imageLoadError" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/skills/'+trigger.Skill+'.png'">
            <img class="portrait"  @error="imageLoadError" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/skills/'+trigger.Skill+'_'+trigger.Hero+'.png'">
            <!-- <span>{{mark.Name | firstLetter}}</span> -->
          </v-avatar>
        </v-flex>
        <v-flex>
          <h3>{{trigger.Skill | swapSpace}}</h3>
          <small>{{trigger.Hero | swapSpace}}</small>
          <br>
        </v-flex>
        <v-flex class="flex-auto">
          <v-icon v-if="!trigger.clicked" size="30" class="showMore" flat color="white">keyboard_arrow_down</v-icon>
          <v-icon v-if="trigger.clicked" size="30" class="showMore" flat color="white">keyboard_arrow_up</v-icon>
        </v-flex>

        <v-flex v-if="trigger.clicked" xs12 class="additional">
          <v-layout row align-top justify-space-between>
            <v-flex class="hero-portrait flex-auto">
              <v-avatar size="60" class="hero">
                <img class="" v-on:load="checkImage" v-show="imageLoaded" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/heros/'+trigger.Hero+'.jpg'">
              </v-avatar>
            </v-flex>
            <v-flex>
              <div class="">
                <h3>{{trigger.Hero | swapSpace}}</h3>
                <small>{{trigger.Class}} | {{trigger.Faction | swapSpace}}</small>
              </div>
              <div>
                {{trigger.Description}}
              </div>
              <v-layout v-if="trigger.AdditionalEffect" class="AdditionalEffect">
                <v-flex class="flex-auto">
                  <v-avatar size="28" color="gray" class="additionalMark">
                    <img v-if="trigger.TriggerFaction" class="portrait" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/factions/Icon_Faction_'+trigger.TriggerFaction+'.png'">
                    <v-icon v-else color="green">add_circle_outline</v-icon>
                  </v-avatar>
                </v-flex>
                <v-flex>
                  {{trigger.AdditionalEffect}}
                </v-flex>
            </v-layout>
          </v-flex>
            <!-- end addtl -->
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'markTrigger',
  props: ['mark'],
  computed: {
    triggers () {
      return this.$store.getters.triggers
    },
    filteredTriggers () {
      const {} = this
      // console.log('triggers, mark',this.mark);
      return this.triggers
      .filter(trigger => this.mark.ClassMark!='' ? trigger.TriggerClass === this.mark.ClassMark : trigger)
      .filter(trigger => this.mark.FactionMark!='' ? trigger.TriggerFaction === this.mark.FactionMark: trigger)

    },
  },
  data (){
    return{
      // mark: []
      imageLoaded : false,
      imgErrors: [],
      openDetails: []
    }
  },
  methods: {
    closeCard(){
      this.$emit('closeCard', 'close')
    },
    checkImage(){
      this.imageLoaded=true;
    },
    toggle(data) {
      // console.log('toggle data', data);
      if(data.hasOwnProperty('clicked')){
          data.clicked = !data.clicked;
      }else{
          //since its the first time , set the value pf clicked to true to show the subitem
          // data = Object.assign({}, data, {clicked: true});
          this.$set(data, 'clicked', true);
      }

    },
    imageLoadError(){
      // console.log('event.target', event.target);
      // console.log('image error', index, kind);
      event.target.style.display = 'none';
      // this.imgErrors[index + kind] = true
    },
    checkimgErrors(index, kind){
      console.log('check image error', index, kind);
      console.log('check this///', this.imgErrors[index + kind] != undefined);
      this.imgErrors[index + kind] != undefined ? true : false;
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

#trigger-container{
  .portrait{
    img{max-height: 75px;}
  }
  .card{
    margin-top: 15px;
    padding: 0!important;
    background: transparent!important;
    .trigger{
      padding:8px;
      background: rgba(49,49,73,1);
      // border: 2px solid transparent;
      // margin:0 auto 10px;
      margin-bottom: 10px;
      // width:90%;
      transition: .25s all linear;
      &:hover{
        cursor: pointer;
      }
      &.opened{
        background: rgba(26,62,105, .75);
        // width:98%;
      }
      .additional{
        padding-top: 8px;
        h3 {
          margin-top: 12px;
        }
        .additionalMark{
          margin-right: 8px;
        }
        .AdditionalEffect{
          padding-top: 5px;
        }
        .hero-portrait{
          height: 60px;
          overflow: hidden;
          border-radius: 50%;
          margin-right: 8px;
          border:2px solid rgba(255,255,255,.7);
          .hero{
            transform: scale(2,2);
            margin-bottom: -95%;
          }
        }
      }
    }
    .skillMark{
      margin-right: 8px;
    }
    h3{
      line-height: 12px;
    }
    small{
      opacity: .6;
    }
    .showMore{
      color: #fff;
    }
  }
}
.hide{
  display: none;
}

</style>
