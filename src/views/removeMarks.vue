<template>
  <v-container id="removeMarks">

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
                            {{ data.item.Name }}
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
                            <v-list-tile-title>{{data.item.Name }}</v-list-tile-title>
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


              <!-- <v-flex class="roles flex-auto">
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
              </v-flex> -->

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


          <!-- <v-flex class="roles flex-auto">
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
          </v-flex> -->

        </v-layout>




<!-- <v-btn @click="uploadData()">Upload</v-btn> -->
<mark-card :marks="filteredMarks" :oops="marks"></mark-card>



</v-container>
</template>

<script>
// @ is an alias to /src
import markCard from '@/components/markCard.vue'
import { db } from '@/main'

export default {
  name: 'removeMarks',
  components: {
    markCard,
  },

  data (){
    return{

  menu: false,
  //filters
  Classs: "",
  ClasssList:['Tank','Melee',	'Ranged',	'Rogue',	'Caster',	'Healer', 'Boss'],
  Campaign:"",
  CampaignList:['Light', 'Dark'],
  Hero: "",
  Faction: "",
  // FactionList: ['Loading'],
  FactionList: [{'Name':'Arekhon_Undead'},{'Name':'Barbarians'},{'Name':'Beastmen'},{'Name':'Changelings'},{'Name':'Dark_Elves'},{'Name':'Demons'},{'Name':'Dragonkin'},{'Name':'Druids'},{'Name':'Dwarves'},
  {'Name':'Elves'},
  {'Name':'Knights_of_the_Council'},{'Name':'Kobolds'},
  {'Name':"Ra'Archne"},{'Name':'Shaggy_Pygmies'},{'Name':'Wild_Elves'}],
  noFactionIcon:['Changelings', 'Dark_Elves', 'Knights_of_the_Council', "Shaggy_Pygmies", "Wild_Elves", "Unaligned"],

}},
methods:{
  uploadData(){
    // for (var i = 0; i < this.markData.length; i++) {
    //   db.collection('removeMarks').add(this.markData[i])
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
    this.menu = false;
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
    marks: function(){
      return this.$store.getters.getRemoveMarks
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

#removeMarks{
  min-height: 100vh;

}
</style>
