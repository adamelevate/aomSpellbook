<template>
  <div class="">


  <v-layout id="markCard" align-center justify-space-between row wrap v-if="marks != undefined && marks.length > 0" :class="{'desktop':$mq == 'md' || $mq == 'lg' || $mq == 'xl'}">
    <v-flex class="mark flex-auto" v-for="(mark, index) in marks" :key="index" v-if="mark.Name" v-show="imageLoaded" xs6>
      <div class="card elevation-3" @click="showDialog(mark)" :class="{'active': dialogMark == mark}">
        <!-- Show in filters -->
        <!-- <img class="portrait" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/heros/'+mark.Hero+'.jpg'"> -->
        <v-layout class="skill" align-center justify-center column>
          <v-flex class="portrait" xs12>
            <v-avatar size="72" :class="{'loading' : !imageLoaded }">
              <transition name="fade">
                <img  v-on:load="checkImage" v-show="imageLoaded" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/skills/'+mark.Name+'.png'">
              </transition>
            </v-avatar>
          </v-flex>
          <v-flex xs12>
            <div class="skill-name">{{mark.Name | swapSpace}}</div>
            <small class="hero-name">{{mark.Hero | swapSpace}}</small>
          </v-flex>
        </v-layout>
      </div>
    </v-flex>
    <v-dialog v-model="dialog" :width="checkWidth($mq)" :fullscreen="$mq == 'xs' || $mq == 'sm'">
      <v-card v-if="dialog" style="background:transparent">
        <mark-spell :mark="dialogMark" @closeCard="hideDialog"></mark-spell>
      </v-card>
    </v-dialog>
  </v-layout>

  <v-layout class="noResults" align-center justify-center column v-if="marks.length == 0 && oops.length > 0">
    <v-flex xs4>&nbsp;</v-flex>
    <v-flex>
      <img class="portrait" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/Skip_debuff.png'">
    </v-flex>
    <v-flex>
      <h1 class="white--text">Avast, No Marks</h1>
      <p class="white--text">Apparently there are no Marks associated with your filter...</p>
    </v-flex>
  </v-layout>

  </div>
</template>

<script>
import markSpell from '@/components/markSpell.vue'
export default {
  name: 'markCard',
  props: ['marks', 'oops'],
  components:{
    markSpell
  },
  data (){
    return{
      dialog: false,
      dialogMark : [],
      imageLoaded: false,
      // mark: []
    }
  },
  methods: {
    showDialog(mark){
      this.dialog = true;
      this.dialogMark = mark;
    },
    hideDialog(){
      this.dialog = false;
      this.dialogMark = [];
    },
    checkWidth(mq){
      console.log('$mq', mq);
      if(mq=='md'){
          return 800
      }
      else if (mq=='lg') {
        return 1024
      }
    },
    checkImage(){
      this.imageLoaded=true;
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
#markCard{
  color: #fff;
  &.desktop{
    .mark{
      min-width: 175px;
      margin: 10px;
      width: auto;
      max-width: 100%;
    }
  }
  .mark{
    width:45%;
    border-radius: 6px;
    margin: 10px 0;
    &.fade-enter-active {
       transition: opacity .5s ease-in-out;
     }
    &.fade-enter-to {
       opacity: 1;
     }
    &.fade-enter {
       opacity: 0;
     }

    .card{
      width: 100%;
      padding-top:8px;
      background: rgba(26,58,100,.4);
      transition: all .5s ease;
      cursor: pointer;
      &:hover{
        transform: scale(1.2,1.2);
        background: rgba(26,58,100,.8);
        .v-avatar img{
          border:2px solid #fff;
        }
      }
      &.active{
        opacity: .2;
        border: 3px solid #fff;
      }
      .v-avatar{
          margin-right: 5px;
          &.loading{
            background: rgba(255,255,255, .2);
          }
          img{
            transition: all .5s ease;
            border:2px solid transparent;
            &.fade-enter-active {
               transition: opacity .5s ease-in-out;
             }
            &.fade-enter-to {
               opacity: 1;
             }
            &.fade-enter {
               opacity: 0;
             }
          }
      }
      // img{
      //   width: 100%;
      // }
      .skill{
        .skill-name{
          font-weight: bold;
        }
        .hero-name{
          display: block;
          text-align: center;
          font-size: 11px;
          opacity: .75;
          padding-bottom: 5px;
        }
      }
      .campaign{
        width: 30px;
      }
      .hero-name{
        font-size: 18px;
        text-shadow: 1px 1px 0 #000;
      }
    }
  }
}
</style>
