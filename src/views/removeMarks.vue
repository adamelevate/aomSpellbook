<template>
  <v-container id="removeMarks">

    <v-layout class="filters" align-center justify-center row v-if="marks != undefined && marks.length > 0">
      <v-flex class="search flex-auto">
        <v-btn v-if="Hero" class="selectedFilter" @click="Hero = ''" flat color="yellow lighten-2">
          <v-avatar class="enlarge" size="40">
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
          <v-avatar :color="checkIcon(Faction) ? 'grey': null">
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
          <v-avatar >
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

<!--
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
    markCard
  },
  data (){
    return{
      markData:[
       {
         "Hero": "Blood_Priest",
         "Class": "Healer ",
         "Faction": "Arekhon_Undead",
         "Campaign": "Dark",
         "Name": "Black_Sacrifice",
         "SkillLvl": "5",
         "HeroLvl": "30",
         "EquipLvl": "4",
         "FactionMark": "",
         "ClassMark": "",
         "Removal": "Friendly",
         "Affects": "All",
         "Description": "This skill removes all Marks from friendly heroes."
       },
       {
         "Hero": "Silver_Moon",
         "Class": "Healer ",
         "Faction": "Barbarians",
         "Campaign": "Light",
         "Name": "Healing_Flow",
         "SkillLvl": "5",
         "HeroLvl": "30",
         "EquipLvl": "5",
         "FactionMark": "",
         "ClassMark": "",
         "Removal": "Friendly",
         "Affects": "All",
         "Description": "Removes all marks from allies."
       },
       {
         "Hero": "Hargrim",
         "Class": "Healer ",
         "Faction": "Dwarves",
         "Campaign": "Light",
         "Name": "Light_of_the_Earth",
         "SkillLvl": "???",
         "HeroLvl": "???",
         "EquipLvl": "???",
         "FactionMark": "",
         "ClassMark": "",
         "Removal": "Friendly",
         "Affects": "All",
         "Description": "The skill removes all faction and class Marks from Hargrim's allies."
       },
       {
         "Hero": "Trorin",
         "Class": "Boss",
         "Faction": "Dwarves",
         "Campaign": "Light",
         "Name": "Mountain_Durability",
         "SkillLvl": "???",
         "HeroLvl": "???",
         "EquipLvl": "???",
         "FactionMark": "",
         "ClassMark": "",
         "Removal": "Friendly?",
         "Affects": "All",
         "Description": "Takes away all faction and class Marks from allied heroes."
       },
       {
         "Hero": "Soothsayer_Zytima",
         "Class": "Caster",
         "Faction": "Kobolds",
         "Campaign": "Dark",
         "Name": "Kobold_Camouflage",
         "SkillLvl": "5",
         "HeroLvl": "30",
         "EquipLvl": "4",
         "FactionMark": "",
         "ClassMark": "V",
         "Removal": "Kobold",
         "Affects": "Kobold",
         "Description": "Removes all Marks from her allies."
       },
       {
         "Hero": "Ra'Archne_Queen",
         "Class": "Boss",
         "Faction": "Ra'Archne",
         "Campaign": "Dark",
         "Name": "Ra'Archne_Taboo",
         "SkillLvl": "???",
         "HeroLvl": "???",
         "EquipLvl": "???",
         "FactionMark": "",
         "ClassMark": "",
         "Removal": "Self",
         "Affects": "Self",
         "Description": "Removes all Marks from her body parts."
       }
     ],
  marks: [],
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
      db.collection('removeMarks').add(this.markData[i])
    }
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
    marks: db.collection('removeMarks').orderBy('Name')
  }
},
}
</script>

<style lang="scss">

#removeMarks{
  min-height: 100vh;

}
</style>
