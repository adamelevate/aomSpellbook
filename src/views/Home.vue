<template>
  <v-container class="home">

    <v-layout class="loading" column align-center justify-center v-if="marks == undefined || marks.length == 0">
      <v-flex>
        <v-progress-circular
          :size="70"
          :width="7"
          color="white"
          indeterminate
        ></v-progress-circular>
      </v-flex>
      <v-flex>
        <h1 class="white--text">Loading Marks...</h1>
      </v-flex>
    </v-layout>

    <v-layout class="filters" align-center justify-center row v-if="marks != undefined && marks.length > 0">
      <v-flex class="search flex-auto">
        <v-btn v-if="Hero" class="selectedFilter" @click="Hero = ''" flat color="yellow lighten-2">
          <v-avatar class="enlarge" size="24">
            <img :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/heros/'+Hero+'.jpg'">
          </v-avatar>
          <span class="selectText">
            {{ Hero | swapSpace}}
          </span>
          <!-- <v-icon>clear</v-icon> -->
        </v-btn>
          <v-autocomplete
                v-if="!Hero"
                v-model="Hero"
                :items="marks"
                dark
                outline
                color="blue-grey lighten-2"
                label="Hero"
                single-line
                item-text="Hero"
                item-value="Hero"
                content-class="searchResults"

              >
                <template
                  slot="selection"
                  slot-scope="data"
                  @input="data.parent.selectItem(data.item)"
                >
                    <v-avatar class="enlarge" size="40">
                      <img :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/heros/'+data.item+'.jpg'">
                    </v-avatar>
                    {{ data.item}}
                </template>
                <template
                  slot="item"
                  slot-scope="data"
                >

                    <v-list-tile-avatar>
                      <img :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/heros/'+data.item.Hero+'.jpg'">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{data.item.Hero | swapSpace}}</v-list-tile-title>
                    </v-list-tile-content>
                  </template>

              </v-autocomplete>
      </v-flex>

      <v-flex class="factions flex-auto">
        <v-btn v-if="Faction" class="selectedFilter" @click="Faction = ''" flat color="yellow lighten-2">
          <v-avatar size="24" :color="checkIcon(Faction) ? 'grey': null">
            <img v-if="!checkIcon(Faction)" :src="require(`@/assets/factions/Icon_Faction_${Faction}.png`)">
            <strong class="white--text headline" v-if="checkIcon(Faction)">F</strong>
          </v-avatar>
          <span class="selectText">
            {{ Faction}}
          </span>
          <!-- <v-icon>clear</v-icon> -->
        </v-btn>

        <v-select
            v-if="!Faction"
            outline
            v-model="Faction"
            :items="FactionList"
            dark
            color="blue-grey lighten-2"
            label="Faction"
            item-text="Faction"
            item-value="Faction"
            single-line
            @change="resetFilter($event, 'Faction')"
            >
              <template
                slot="selection"
                slot-scope="data"
                @input="data.parent.selectItem(data.item)"
              >
                  <v-avatar :color="checkIcon(data.item) ? 'grey': null">
                    <img v-if="!checkIcon(data.item)" :src="require(`@/assets/factions/Icon_Faction_${data.item}.png`)">
                    <strong class="white--text headline" v-if="checkIcon(data.item)">F</strong>
                  </v-avatar>
                  <span class="selectText">
                    {{ data.item | swapSpace}}
                  </span>
              </template>

              <template
                slot="item"
                slot-scope="data"
              >
                <!-- <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content>Item{{data.item}}</v-list-tile-content>
                </template> -->
                <template>
                  <v-list-tile-avatar :color="checkIcon(data.item) ? 'grey': null">
                      <img v-if="!checkIcon(data.item)" :src="require(`@/assets/factions/Icon_Faction_${data.item}.png`)">
                      <strong class="white--text headline" v-if="checkIcon(data.item)">{{data.item | firstLetter}}</strong>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{data.item | swapSpace}}</v-list-tile-title>
                    <!-- <v-list-tile-sub-title v-html="data.item.Faction"></v-list-tile-sub-title> -->
                  </v-list-tile-content>
                </template>
              </template>
            </v-select>
      </v-flex>


      <v-flex class="campaigns flex-auto">
        <v-btn v-if="Campaign" class="selectedFilter" @click="Campaign = ''" flat color="yellow lighten-2">
          <v-avatar size="24" >
            <img :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/campaign/'+Campaign+'.png'">
          </v-avatar>
          <span class="selectText">
            {{ Campaign}}
          </span>
          <!-- <v-icon>clear</v-icon> -->
        </v-btn>
        <v-select
              v-if="!Campaign"
              v-model="Campaign"
              :items="CampaignList"
              dark
              outline
              color="blue-grey lighten-2"
              label="Campaign"
              clearable

              single-line
              @change="resetFilter($event, 'Campaign')"
            >
              <template
                slot="selection"
                slot-scope="data"
                @input="data.parent.selectItem(data.item)"
              >
                  <v-avatar >
                    <img :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/campaign/'+data.item+'.png'">
                  </v-avatar>
                  <span class="selectText">
                    {{ data.item}}
                  </span>
              </template>

              <template
                slot="item"
                slot-scope="data"
              >
                <template>
                  <v-list-tile-avatar>
                      <img :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/campaign/'+data.item+'.png'">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{data.item}}</v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-select>
      </v-flex>




      <v-flex class="roles flex-auto">
        <v-btn v-if="Classs" class="selectedFilter" @click="Classs = ''" flat color="yellow lighten-2">
          <v-avatar size="24">
            <img :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/roles/Icon_Role_'+Classs+'.png'">
          </v-avatar>
          <span class="selectText">
            {{ Classs}}
          </span>
        </v-btn>
        <v-select
              v-if="!Classs"
              v-model="Classs"
              :items="ClasssList"
              dark
              outline
              color="blue-grey lighten-2"
              label="Role"
              clearable

              single-line
              @change="resetFilter($event, 'Classs')"
            >
              <template
                slot="selection"
                slot-scope="data"
                @input="data.parent.selectItem(data.item)"
              >
                  <v-avatar >
                    <img :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/roles/Icon_Role_'+data.item+'.png'">
                  </v-avatar>
                  <span class="selectText">
                    {{ data.item}}
                  </span>
              </template>

              <template
                slot="item"
                slot-scope="data"
              >
                <template>
                  <v-list-tile-avatar>
                      <img :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/roles/Icon_Role_'+data.item+'.png'">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{data.item}}</v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-select>
      </v-flex>

    </v-layout>


<!-- <v-btn @click="uploadData()">Upload</v-btn> -->

    <v-layout class="marks" align-center justify-center row wrap v-if="marks != undefined && marks.length > 0" :class="{'desktop':$mq == 'md' || $mq == 'lg' || $mq == 'xl'}">
      <v-flex class="mark" v-for="(mark, index) in filteredMarks" :key="index" v-if="mark.Name">
        <div class="card elevation-3" @click="showDialog(mark)" :class="{'active': dialogMark == mark}">
          <!-- Show in filters -->
          <!-- <img class="portrait" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/heros/'+mark.Hero+'.jpg'"> -->
          <v-layout class="skill" align-center justify-center column>
          <v-flex class="portrait" xs12>
            <v-avatar size="72">
              <img class="portrait" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/skills/'+mark.Name+'.png'">
            </v-avatar>
          </v-flex>
            <!--<v-flex class="flex-auto">
              <img v-if="mark.Campaign != ''" class="campaign" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/campaign/'+mark.Campaign+'.png'">
              <v-avatar v-else color="grey" size="20">
                <span>?</span>
              </v-avatar>
            </v-flex> -->
            <v-flex xs12>
              <div class="skill-name">{{mark.Name | swapSpace}}</div>
              <small class="hero-name">{{mark.Hero | swapSpace}}</small>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>


    <v-layout class="noResults" align-center justify-center column v-if="filteredMarks.length == 0 && marks.length > 0">
      <v-flex xs4>&nbsp;</v-flex>
      <v-flex>
        <img class="portrait" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/Skip_debuff.png'">
      </v-flex>
      <v-flex>
        <h1 class="white--text">Avast, No Marks</h1>
        <p class="white--text">Apparently there are no Marks associated with your filter...</p>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" :width="checkWidth($mq)" :fullscreen="$mq == 'xs' || $mq == 'sm'">
      <v-card v-if="dialog" style="background:transparent">
        <mark-spell :mark="dialogMark" @closeCard="hideDialog"></mark-spell>
      </v-card>
    </v-dialog>


</v-container>
</template>

<script>
// @ is an alias to /src
import markSpell from '@/components/markSpell.vue'
import { db } from '@/main'

export default {
  name: 'home',
  components: {
    markSpell
  },
  data (){
    return{
  marks: [],
  dialog: false,
  dialogMark: [],
  //filters
  Classs: "",
  ClasssList:['Tank','Melee',	'Ranged',	'Rogue',	'Caster',	'Healer', 'Boss'],
  Campaign:"",
  CampaignList:['Light', 'Dark'],
  Hero: "",
  Faction: "",
  FactionList:['Arekhon_Undead','Barbarians','Beastmen','Changelings', 'Dark_Elves', 'Demons', 'Dragonkin','Druids','Dwarves', 'Elves','Knights_of_the_Council', 'Kobolds',"Ra'Archne", "Shaggy_Pygmies", "Wild_Elves"],
  noFactionIcon:['Changelings', 'Dark_Elves', 'Knights_of_the_Council', "Shaggy_Pygmies", "Wild_Elves", "Unaligned"],

}},
methods:{
  uploadData(){
    for (var i = 0; i < this.markData.length; i++) {
      db.collection('marks').add(this.markData[i])
    }
  },
  showDialog(mark){
    this.dialog = true;
    this.dialogMark = mark;
  },
  hideDialog(){
    this.dialog = false;
    this.dialogMark = [];
  },
  checkIcon(e){
    // console.log(e);
    return this.noFactionIcon.includes(e)
  },
  cardOpen(index){
    if(index == 999){
      this.cardIsOpen = false;
      this.cardOpenIndex = '';
    }
    this.cardIsOpen = true;
    this.cardOpenIndex = index;
  },
  resetFilter(event, section){
    // console.log('cleared', event);
    if(event === undefined){
      this[section] = '';
    }
  },
  checkWidth(mq){
    console.log('$mq', mq);
    if(mq=='md'){
        return 800
    }
    else if (mq=='lg') {
      return 1024
    }
  }
},
computed: {
  filteredMarks () {
    const { Hero, Faction, Classs, Campaign } = this
    // console.log(Hero, Faction, Role, Campaign, marks);
    return this.marks
      .filter(mark => mark.Hero.toLowerCase().indexOf(Hero.toLowerCase()) > -1)
      .filter(mark => Faction != '' ? mark.Faction === Faction : mark)
      .filter(mark => Classs != '' ? mark.Class === Classs : mark)
      .filter(mark => Campaign != '' ? mark.Campaign === Campaign : mark)

    },
},
filters:{
  swapSpace: function(e){
    // console.log('e',e);
    return e.replace(/_/g, " ")
  },
  firstLetter: function(e){
    return e.charAt(0);
  }
},
firestore () {
  return {
    marks: db.collection('marks').orderBy('Name')
  }
},
}
</script>

<style lang="scss">

.searchResults .v-avatar, .enlarge.v-avatar{
  border-radius: 50%;
  overflow: hidden;
  img{
    transform: scale(1.5,1.5);
  }
}
.home{
  min-height: 100vh;
  padding-bottom: 50px;

  .filters{
    border-bottom:1px solid rgba(255,255,255,.15);

    > .flex{
      margin-right: 20px;
    }
    .v-text-field__details{
      display: none;
    }
    .v-input, .v-input__slot{
      margin: 0!important;
      border: none!important;
    }
    .search .v-select__selections{
      max-width: 46px
    }
    .factions .v-select__selections{
      max-width: 46px
    }
    .campaigns .v-select__selections{
      max-width: 43px
    }
    .roles .v-select__selections{
      max-width: 1px
    }
    .v-input__slot{
      padding: 0;

      &:after, &:before{
        display: none!important;
      }
    }
    .v-btn{
      height: 56px;
      padding: 0 5px;
      font-weight: bold;
      font-size: 16px;
      margin: 0;
      .v-avatar{
        margin-right: 5px;
      }
      .v-icon{
        margin-left: 5px;
        opacity: .3;
      }
    }
    // .v-select__slot, {
    //   .v-input__append-inner:last-child{
    //     display: none;
    //   }
    // }
  }

  .marks{
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

      .card{
        width: 175px;
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
            img{
              transition: all .5s ease;
              border:2px solid transparent;
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
.noResults{
  text-align: center;
  p{
    font-size: 16px;
  }
}


}
</style>
