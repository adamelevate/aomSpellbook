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

    <v-menu
          v-model="menu"
          :close-on-content-click="false"
          full-width
          content-class="filters mobile"
          v-if="marks != undefined && marks.length > 0 && ($mq == 'xs' || $mq == 'sm')"
        >
          <v-btn
            slot="activator"
            color="blue-grey lighten-2"
            dark
            outline
            block
          >
            Filter Marks
          </v-btn>

          <v-card>
            <v-card-title class="white--text">
              <h2>Filters</h2>
              <v-spacer></v-spacer>
              <span>
                <v-btn small fab outline dark color="white" @click="menu = false"><v-icon>close</v-icon></v-btn>
              </span>
            </v-card-title>
            <v-layout column class="filters mobile">
              <v-flex class="flex-auto filter-label">Search by:</v-flex>
              <v-flex class="search flex-auto">
                <hr>
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
              <v-flex class="flex-auto filter-label">Filter Marks by:</v-flex>
              <v-flex class="factions flex-auto">
                <hr>
                <v-btn v-if="Faction" class="selectedFilter" @click="Faction = ''" flat color="yellow lighten-2">
                  <v-avatar size="24" :color="checkIcon(Faction) ? 'grey': null">
                    <img v-if="!checkIcon(Faction)" :src="`https://s3.us-east-2.amazonaws.com/aom-spellbook/factions/Icon_Faction_${Faction}.png`">
                    <strong class="white--text headline" v-if="checkIcon(Faction)">F</strong>
                  </v-avatar>
                  <span class="selectText">
                    {{ Faction}}
                  </span>
                  <!-- <v-icon>clear</v-icon> -->
                </v-btn>

                <v-select
                    v-if="!Faction && FactionList.length > 0"
                    outline
                    v-model="Faction"
                    :items.sync="FactionList"
                    dark
                    color="blue-grey lighten-2"
                    label="Faction"
                    item-text="Name"
                    item-value="Name"
                    single-line
                    @change="resetFilter($event, 'Faction')"
                    >
                      <template
                        slot="selection"
                        slot-scope="data"
                        @input="data.parent.selectItem(data.item.Name)"
                      >
                          <v-avatar :color="checkIcon(data.item.Name) ? 'grey': null">
                            <img v-if="!checkIcon(data.item.Name)" :src="`https://s3.us-east-2.amazonaws.com/aom-spellbook/factions/Icon_Faction_${data.item.Name}.png`">
                            <strong class="white--text headline" v-if="checkIcon(data.item.Name)">F</strong>
                          </v-avatar>
                          <span class="selectText">
                            {{ data.item.Name | swapSpace}}
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
                          <v-list-tile-avatar :color="checkIcon(data.item.Name) ? 'grey': null">
                              <img v-if="!checkIcon(data.item.Name)" :src="`https://s3.us-east-2.amazonaws.com/aom-spellbook/factions/Icon_Faction_${data.item.Name}.png`">
                              <strong class="white--text headline" v-if="checkIcon(data.item.Name)">{{data.item.Name | firstLetter}}</strong>
                          </v-list-tile-avatar>
                          <v-list-tile-content >
                            <v-list-tile-title>{{data.item.Name | swapSpace }}</v-list-tile-title>
                            <!-- <v-list-tile-sub-title v-html="data.item.Faction"></v-list-tile-sub-title> -->
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-select>
              </v-flex>


              <v-flex class="campaigns flex-auto">
                <hr>
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
                <hr>
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
            <v-card-actions align-center justify-space-between>
              <v-btn flat dark @click="clearAllFilters">Clear All Filters</v-btn>
              <v-spacer></v-spacer>
              <v-btn small color="white" @click="menu = false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>







    <v-layout class="filters" align-center justify-center row v-if="marks != undefined && marks.length > 0 && $mq != 'xs' && $mq != 'sm'">
      <v-flex class="flex-auto filter-label">Search by:</v-flex>
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

      <v-flex class="flex-auto filter-label">Filter Marks by:</v-flex>

      <v-flex class="factions flex-auto" v-if=" FactionList.length > 0">
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
            v-if="!Faction && FactionList.length > 0"
            outline
            v-model="Faction"
            :items.sync="FactionList"
            dark
            color="blue-grey lighten-2"
            label="Faction"
            item-text="Name"
            item-value="Name"
            single-line
            @change="resetFilter($event, 'Faction')"
            >
              <template
                slot="selection"
                slot-scope="data"
                @input="data.parent.selectItem(data.item.Name)"
              >
                  <v-avatar :color="checkIcon(data.item.Name) ? 'grey': null">
                    <img v-if="!checkIcon(data.item.Name)" :src="`https://s3.us-east-2.amazonaws.com/aom-spellbook/factions/Icon_Faction_${data.item.Name}.png`">
                    <strong class="white--text headline" v-if="checkIcon(data.item.Name)">F</strong>
                  </v-avatar>
                  <span class="selectText">
                    {{ data.item.Name | swapSpace}}
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
                  <v-list-tile-avatar :color="checkIcon(data.item.Name) ? 'grey': null">
                      <img v-if="!checkIcon(data.item.Name)" :src="`https://s3.us-east-2.amazonaws.com/aom-spellbook/factions/Icon_Faction_${data.item.Name}.png`">
                      <strong class="white--text headline" v-if="checkIcon(data.item.Name)">{{data.item.Name | firstLetter}}</strong>
                  </v-list-tile-avatar>
                  <v-list-tile-content >
                    <v-list-tile-title>{{data.item.Name | swapSpace }}</v-list-tile-title>
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
              label="Class"
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

<!-- <v-btn @click="uploadData">upload</v-btn> -->

    <mark-card :marks="filteredMarks" :oops="marks"></mark-card>







</v-container>
</template>

<script>

// @ is an alias to /src
// import { db } from '@/main' //firebase
import markJSON from '@/components/Marks.json'
import markCard from '@/components/markCard.vue'

export default {
  name: 'home',
  components: {
    markCard,
    markJSON
  },
  computed:{
      marks: function(){
        // console.log('this mark', this);
        return this.$store.getters.getMarks
      },
      triggers(){
        return this.$store.getters.getTriggers
      },
    filteredMarks () {
      const { Hero, Faction, Classs, Campaign } = this
      // console.log(Hero, Faction, Role, Campaign, marks);
      return this.marks
        .filter(mark => mark.Hero.toLowerCase().indexOf(Hero.toLowerCase()) > -1)
        .filter(mark => Faction != '' ? mark.FactionMark === Faction : mark)
        .filter(mark => Classs != '' ? mark.ClassMark === Classs : mark)
        .filter(mark => Campaign != '' ? mark.Campaign === Campaign : mark)

      },
  },
  data (){
    return{
  // marks: [], // maybe we don't need firebase
  // triggers: [], // maybe we don't need firebase
  dialog: false,
  dialogMark: [],
  //filters
  Classs: "",
  Hero: "",
  Faction: "",
  Campaign:"",
  ClasssList:['Tank','Melee',	'Ranged',	'Rogue',	'Caster',	'Healer', 'Boss'],
  CampaignList:['Light', 'Dark'],
  // FactionList:['Loading'], // maybe we don't need firebase
  FactionList: [{'Name':'Arekhon_Undead'},{'Name':'Barbarians'},{'Name':'Beastmen'},{'Name':'Changelings'},{'Name':'Dark_Elves'},{'Name':'Demons'},{'Name':'Dragonkin'},{'Name':'Druids'},{'Name':'Dwarves'},
  {'Name':'Elves'},
  {'Name':'Knights_of_the_Council'},{'Name':'Kobolds'},
  {'Name':"Ra'Archne"},{'Name':'Shaggy_Pygmies'},{'Name':'Wild_Elves'}],
  noFactionIcon:['Changelings', 'Dark_Elves', 'Knights_of_the_Council', "Shaggy_Pygmies", "Wild_Elves", "Unaligned"],
  menu:false
}},
methods:{
  uploadData(){
    // for (var i = 0; i < this.markData.length; i++) {
    //   db.collection('marks').add(this.markData[i])
    // }
    // for (var i = 0; i < this.removeMarkData.length; i++) {
    //   db.collection('removeMarks').add(this.removeMarkData[i])
    // }
    // for (var i = 0; i < this.triggerMarkData.length; i++) {
    //   db.collection('triggers').add(this.triggerMarkData[i])
    // }
  },
  checkIcon(e){
    // console.log(e);
    return this.noFactionIcon.includes(e)
  },
  resetFilter(event, section){
    // console.log('cleared', event);
    if(event === undefined){
      this[section] = '';
    }
  },
  clearAllFilters(){
    this.Classs = '';
    this.Hero = '';
    this.Faction = '';
    this.Campaign = '';
    this.menu = false
  },
  checkWidth(mq){
    // console.log('$mq', mq);
    if(mq=='md'){
        return 800
    }
    else if (mq=='lg') {
      return 1024
    }
  }
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
}
  .filters{
    border-bottom:1px solid rgba(255,255,255,.15);
    &.mobile{
      .v-card{
        background: rgba(26,58,100,.9);
      }
    }

    > .flex{
      margin-right: 20px;
    }
    .filter-label{
      color: yellow;
      opacity: .7;
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
    .flex{

      > .v-btn{
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
    }
    // .v-select__slot, {
    //   .v-input__append-inner:last-child{
    //     display: none;
    //   }
    // }
  }


.noResults{
  text-align: center;
  p{
    font-size: 16px;
  }
}



</style>
