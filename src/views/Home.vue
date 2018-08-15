<template>
  <div class="home">

    <v-layout row align-center justify-space-between class="top">
      <v-flex class="flex-auto navTitle">
        <h1 class="">Marks</h1>
        <span class="subtitle">Extra Damage... if you plan well.</span>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex class="flex-auto">
        <img class="logo" src="@/assets/logo.png" alt="">
      </v-flex>


    </v-layout>

    <v-layout class="filters">
      <v-flex class="search flex-auto">
          <v-autocomplete
                v-model="Hero"
                :items="marks"
                outline
                dark
                clearable
                color="blue-grey lighten-2"
                label="Hero"
                item-text="Hero"
                item-value="Hero"
                single-line
                content-class="searchResults"
                @change="resetFilter($event, 'Hero')"
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >
                    <v-avatar class="enlarge" size="40">
                      <img :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/heros/'+data.item.Hero+'.jpg'">
                    </v-avatar>
                    {{ data.item.Hero }}
                </template>
                <template
                  slot="item"
                  slot-scope="data"
                >
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-avatar>
                      <img :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/heros/'+data.item.Hero+'.jpg'">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.Hero"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="data.item.Class"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
      </v-flex>

      <v-flex>
        <v-layout row>

          <v-flex class="factions">
            <!-- <span style="color:white">{{noFactionIcon.includes('Arekhon_Undead')}}</span> -->
            <v-select
                  v-model="Faction"
                  :items="FactionList"
                  dark
                  clearable
                  color="blue-grey lighten-2"
                  label="Faction"
                  item-text="Faction"
                  item-value="Faction"
                  single-line
                  outline
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
                        <v-list-tile-title>{{data.item | swapSpace }}</v-list-tile-title>
                        <!-- <v-list-tile-sub-title v-html="data.item.Faction"></v-list-tile-sub-title> -->
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-select>
          </v-flex>


          <v-flex class="campaigns">
            <v-select
                  v-model="Campaign"
                  :items="CampaignList"
                  dark
                  color="blue-grey lighten-2"
                  label="Campaign"
                  clearable
                  outline
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
                        {{ data.item | swapSpace}}
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
          <v-flex xs3>

          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>



    <!-- <v-btn @click="uploadData">Upload</v-btn>
    marks:{{marks}} -->
    <v-layout class="marks" row wrap v-if="marks != undefined && marks.length > 0">
      <v-flex class="mark" v-for="(mark, index) in filteredMarks" :key="index">
        <div class="card" :class="{'open': cardOpenIndex == index && cardIsOpen}">
          <!-- Show in filters -->
          <div class="card-collapsed" v-show="cardOpenIndex != index" @click="cardOpen(index)">
            <img class="portrait" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/heros/'+mark.Hero+'.jpg'">
            <v-layout class="text">
              <v-flex>
                <img class="campaign" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/campaign/'+mark.Campaign+'.png'">
              </v-flex>
              <v-flex>
                <strong class="headline">{{mark.Hero}}</strong>
              </v-flex>
            </v-layout>
          </div>
          <!-- Show in expansion -->
          <mark-spell :mark="mark" v-show="cardOpenIndex == index" @closeCard="cardOpen(999)"></mark-spell>
        </div>
      </v-flex>
    </v-layout>

  </div>
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
      markData:[
        {
         "Hero": "Abaddon",
         "Role": "Boss",
         "Faction": "Demons",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "X?",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "O",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "O",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Burning of Souls",
         "Skill Level Required": 3,
         "Hero Lvl Required": 10,
         "Equipment Lvl Required": 2,
         },
         "Faction Mark": "",
         "Role Mark": "V"},
        {
         "Hero": "Abyss Hound",
         "Role": "Melee",
         "Faction": "Demons",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "O",
         "Ranged": "X",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "O",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Assassin of the Abyss",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Akhrasht",
         "Role": "Tank",
         "Faction": "Ra'Archne",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "O",
         "Melee": "",
         "Ranged": "X",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "O",
         "Skill":{
         "Skill Name": "Chitin Shield",
         "Skill Level Required": 4,
         "Hero Lvl Required": 20,
         "Equipment Lvl Required": 3,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Ambror",
         "Role": "Ranged",
         "Faction": "Dwarves",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "X",
         "Ranged": "O",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "O",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Dwarf Bolt",
         "Skill Level Required": 4,
         "Hero Lvl Required": 20,
         "Equipment Lvl Required": 3,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Angrim",
         "Role": "Melee",
         "Faction": "Dwarves",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "O",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "X",
         "Dwarf": "O",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Berserker Rage",
         "Skill Level Required": 4,
         "Hero Lvl Required": 20,
         "Equipment Lvl Required": 3,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Aratar",
         "Role": "Melee",
         "Faction": "Barbarians",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "O",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "O",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Arekhon Axe",
         "Role": "Ranged",
         "Faction": "Arekon Undead",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "O",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "O",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Arekhon Guard",
         "Role": "Tank",
         "Faction": "Arekon Undead",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "O",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "X",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Arekhon Battle Cry",
         "Skill Level Required": 6,
         "Hero Lvl Required": 40,
         "Equipment Lvl Required": 5,
         },
         "Faction Mark": "V",
         "Role Mark": ""
        },
        {
         "Hero": "Arekhon Shadow",
         "Role": "Rogue",
         "Faction": "Arekon Undead",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": " ",
         "Rogue": "XO",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "O",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Shadow Judgement",
         "Skill Level Required": 4,
         "Hero Lvl Required": 20,
         "Equipment Lvl Required": 3,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Arekhon Spear",
         "Role": "Melee",
         "Faction": "Arekon Undead",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "O",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "O",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Atiles",
         "Role": "Tank",
         "Faction": "Barbarians",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "O",
         "Melee": "X",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "O",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Arc of Steel",
         "Skill Level Required": 4,
         "Hero Lvl Required": 20,
         "Equipment Lvl Required": 3,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Azariel",
         "Role": "Healer ",
         "Faction": "Dark Elves",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": " ",
         "Healer": "O",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Bellara",
         "Role": "Caster",
         "Faction": "Barbarians",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": " ",
         "Caster": "O",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": " ",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Swamp Curse",
         "Skill Level Required": 6,
         "Hero Lvl Required": 40,
         "Equipment Lvl Required": 5,
         },
         "Faction Mark": "V",
         "Role Mark": ""
        },
        {
         "Hero": "Blood Emperor",
         "Role": "Boss",
         "Faction": "Arekon Undead",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "O",
         "Dwarf": "",
         "Arekhon": "O",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Mark of Arekhon",
         "Skill Level Required": 4,
         "Hero Lvl Required": 20,
         "Equipment Lvl Required": 3,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Blood Mage",
         "Role": "Caster",
         "Faction": "Arekon Undead",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": " ",
         "Caster": "O",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "X",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Rivers of Blood",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "V",
         "Role Mark": ""
        },
        {
         "Hero": "Blood Priest",
         "Role": "Healer ",
         "Faction": "Arekon Undead",
         "Campaign": "Dark",
         "Removal": "Removes Friendly",
         "Tank": "X",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": " ",
         "Healer": "O",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Cry of the Void",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Cathbad",
         "Role": "Healer ",
         "Faction": "Druids",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "O",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Denaya",
         "Role": "Boss",
         "Faction": "Barbarians",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "O",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "X",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Red Fury",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "V",
         "Role Mark": ""
        },
        {
         "Hero": "Dreverad",
         "Role": "Tank",
         "Faction": "Druids",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "O",
         "Melee": "X",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "X?",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Eraser",
         "Role": "Caster",
         "Faction": "Demons",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "X",
         "Caster": "O",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Dark Flame",
         "Skill Level Required": 4,
         "Hero Lvl Required": 20,
         "Equipment Lvl Required": 3,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Eraser",
         "Role": "Caster",
         "Faction": "Demons",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "X",
         "Caster": "O",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Dark Weakness",
         "Skill Level Required": 6,
         "Hero Lvl Required": 40,
         "Equipment Lvl Required": 5,
         },
         "Faction Mark": "V",
         "Role Mark": ""
        },
        {
         "Hero": "Gassar",
         "Role": "Rogue",
         "Faction": "Dwarves",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "O",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "X",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Wild Fire",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "V",
         "Role Mark": ""
        },
        {
         "Hero": "Gatekeeper",
         "Role": "Tank",
         "Faction": "Demons",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "O",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "X",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Rage of the Abyss",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "V",
         "Role Mark": ""
        },
        {
         "Hero": "Grok",
         "Role": "Tank",
         "Faction": "Kobolds",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "O",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "X",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Enraging Strike",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "V",
         "Role Mark": ""
        },
        {
         "Hero": "Hargrim",
         "Role": "Healer ",
         "Faction": "Dwarves",
         "Campaign": "Light",
         "Removal": "Removes Friendly",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "O",
         "Boss": "",
         "Dwarf": "O",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Hilia",
         "Role": "Healer ",
         "Faction": "Ra'Archne",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "O",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "X",
         "Skill":{
         "Skill Name": "Mimicry",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "V",
         "Role Mark": ""
        },
        {
         "Hero": "Infernus",
         "Role": "Ranged",
         "Faction": "Demons",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "O",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Jagg",
         "Role": "Melee",
         "Faction": "Kobolds",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "O",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "O",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Kage",
         "Role": "Rogue",
         "Faction": "Elves",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "O?",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "X?",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Kharannah",
         "Role": "Healer ",
         "Faction": "Dragonkin",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "O",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "X",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Healing Light",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "V",
         "Role Mark": ""
        },
        {
         "Hero": "Khshaat",
         "Role": "Caster",
         "Faction": "Ra'Archne",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "O",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": " ",
         "Skill":{
         "Skill Name": "Ra'Archne Taboo",
         "Skill Level Required": 6,
         "Hero Lvl Required": 40,
         "Equipment Lvl Required": 5,
         },
         "Faction Mark": "V",
         "Role Mark": ""
        },
        {
         "Hero": "Kobolock",
         "Role": "Healer ",
         "Faction": "Kobolds",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "O",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "X",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Drink Poison!",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "V",
         "Role Mark": ""
        },
        {
         "Hero": "Last Guardian",
         "Role": "Boss",
         "Faction": "",
         "Campaign": "",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "XO?",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Lucky",
         "Role": "Healer ",
         "Faction": "Shaggy Pygmies",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "O",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Maedb",
         "Role": "Rogue",
         "Faction": "Druids",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "X",
         "Ranged": "",
         "Rogue": "O",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Myrddin",
         "Role": "Caster",
         "Faction": "Druids",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "O",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "O",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Ra'Archne Queen",
         "Role": "Boss",
         "Faction": "Ra'Archne",
         "Campaign": "Dark",
         "Removal": "Removes Self",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "O",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Raarspit",
         "Role": "Ranged",
         "Faction": "Ra'Archne",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "O",
         "Rogue": " X",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "O",
         "Skill":{
         "Skill Name": "Poison Squirt",
         "Skill Level Required": 6,
         "Hero Lvl Required": 40,
         "Equipment Lvl Required": 5,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Rizer",
         "Role": "Rogue",
         "Faction": "Ra'Archne",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "O",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "O",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Rogar",
         "Role": "Tank",
         "Faction": "Dragonkin",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "O",
         "Melee": "X",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "O",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Bastion of Faith",
         "Skill Level Required": 4,
         "Hero Lvl Required": 20,
         "Equipment Lvl Required": 3,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Rok",
         "Role": "Caster",
         "Faction": "Beastmen",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "O",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "X",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Frost Spike",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "V",
         "Role Mark": ""
        },
        {
         "Hero": "Roland",
         "Role": "Boss",
         "Faction": "Knights of the Council",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "O",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Sandariel",
         "Role": "Boss",
         "Faction": "Wild Elves",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "O",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Seven Knives",
         "Role": "Ranged",
         "Faction": "Barbarians",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "O",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "O",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Knife Throw",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Sharazar",
         "Role": "Rogue",
         "Faction": "Changelings",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "O",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Shni",
         "Role": "Rogue",
         "Faction": "Kobolds",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "XO",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "O",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Kobold Camouflage",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Silver Moon",
         "Role": "Healer ",
         "Faction": "Barbarians",
         "Campaign": "Light",
         "Removal": "Removes Friendly",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "O",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Soothsayer",
         "Role": "Caster",
         "Faction": "Kobolds",
         "Campaign": "Dark",
         "Removal": "Removes Kobold",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "O",
         "Healer": "X",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": " ",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Anger of Flies",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Succubus",
         "Role": "Rogue",
         "Faction": "Demons",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "O",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "O",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Swamp Killer",
         "Role": "Rogue",
         "Faction": "Barbarians",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "XO",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "O",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Killer Strike",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Tahit",
         "Role": "Melee",
         "Faction": "Ra'Archne",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "O",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "X",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "O",
         "Skill":{
         "Skill Name": "Flurry of Spikes",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Taneda",
         "Role": "Melee",
         "Faction": "Elves",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "O",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "X",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "O",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Way of the Sword",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Torak",
         "Role": "Ranged",
         "Faction": "Kobolds",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "O",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "O",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Troddar",
         "Role": "Tank",
         "Faction": "Dwarves",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "O",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "O",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Trorin",
         "Role": "Boss",
         "Faction": "Dwarves",
         "Campaign": "Light",
         "Removal": "Removes Friendly?",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "",
         "Boss": "O",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Tsuna",
         "Role": "Rogue",
         "Faction": "Beastmen",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "O",
         "Caster": "",
         "Healer": "",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "O",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        },
        {
         "Hero": "Velundar",
         "Role": "Caster",
         "Faction": "Dwarves",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "X",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "O",
         "Healer": "",
         "Boss": "",
         "Dwarf": "X",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Curse Rune",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Velundar",
         "Role": "Caster",
         "Faction": "Dwarves",
         "Campaign": "Light",
         "Removal": "",
         "Tank": "X",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "O",
         "Healer": "",
         "Boss": "",
         "Dwarf": "X",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "Earthquake Rune",
         "Skill Level Required": 5,
         "Hero Lvl Required": 30,
         "Equipment Lvl Required": 4,
         },
         "Faction Mark": "V",
         "Role Mark": ""
        },
        {
         "Hero": "Wyrm Priest",
         "Role": "Boss",
         "Faction": "Kobolds",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "X",
         "Healer": "",
         "Boss": "O",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "O",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "THE WYRM",
         "Skill Level Required": 4,
         "Hero Lvl Required": 20,
         "Equipment Lvl Required": 3,
         },
         "Faction Mark": "",
         "Role Mark": "V"
        },
        {
         "Hero": "Xaart",
         "Role": "Healer ",
         "Faction": "Demons",
         "Campaign": "Dark",
         "Removal": "",
         "Tank": "",
         "Melee": "",
         "Ranged": "",
         "Rogue": "",
         "Caster": "",
         "Healer": "O",
         "Boss": "",
         "Dwarf": "",
         "Arekhon": "",
         "Barbarians": "",
         "Beastmen": "",
         "Demons": "",
         "Dragonkin": "",
         "Druids": "",
         "Elves": "",
         "Kobolds": "",
         "Ra'Archne": "",
         "Skill":{
         "Skill Name": "",
         "Skill Level Required": null,
         "Hero Lvl Required": null,
         "Equipment Lvl Required": null,
         },
         "Faction Mark": "",
         "Role Mark": ""
        }
      ],
  marks: [],
  cardOpenIndex: 999,
  cardIsOpen: false,
  //filters
  Role: "",
  RoleList:['Tank','Melee',	'Ranged',	'Rogue',	'Caster',	'Healer', 'Boss'],
  Campaign:"",
  CampaignList:['Light', 'Dark'],
  Hero: "",
  Faction: "",
  FactionList:['Arekhon_Undead','Barbarians','Beastmen','Changelings', 'Dark_Elves', 'Demons', 'Dragonkin','Druids','Dwarves', 'Elves','Knights_of_the_Council', 'Kobolds',"Ra'Archne", "Shaggy Pygmies", "Wild_Elves"],
  noFactionIcon:['Changelings', 'Dark_Elves', 'Knights_of_the_Council', "Shaggy Pygmies", "Wild_Elves"],

}},
methods:{
  uploadData(){
    for (var i = 0; i < this.markData.length; i++) {
      db.collection('marks').add(this.markData[i])
    }
  },
  // blurField(e){
  //   // return e.replace(/_/g, " ")
  // },
  checkIcon(e){
    console.log(e);
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
    console.log('cleared', event);
    if(event === undefined){
      this[section] = '';
    }
  }
},
computed: {
  filteredMarks () {
    const { Hero, Faction, Role, Campaign } = this
    // console.log(Hero, Faction, Role, Campaign, marks);
    return this.marks
      .filter(mark => mark.Hero.toLowerCase().indexOf(Hero.toLowerCase()) > -1)
      .filter(mark => Faction != '' ? mark.Faction === Faction : mark)
      .filter(mark => Role != '' ? mark.Role === Role : mark)
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
    marks: db.collection('marks').orderBy('Hero')
  }
},
}
</script>

<style lang="scss">

.flex-auto{
  flex:0 1 auto!important;
}
.searchResults .v-avatar, .enlarge.v-avatar{
  border-radius: 50%;
  overflow: hidden;
  img{
    transform: scale(1.5,1.5);
  }
}
.home{
  min-height: 100vh;

  .top{
    .navTitle{
      margin-left: 10px;
      color: #fff;
      text-align: left;
      h1{
        font-size: 45px;
        margin-top: 8px;
      }
    }
    img.logo{
      margin-top: 10px;
      margin-right: 20px;
      max-width: 100px;
    }
    .v-text-field__details{
      display: none!important;
    }
    .v-input__slot{
      margin: 0!important;
    }
  }

  .filters{
    .search{

    }
    .factions{
      max-width: 200px
    }
    .campaigns{
      max-width: 200px
    }
    .v-select__slot, {
      .v-input__append-inner:last-child{
        display: none;
      }
    }
  }

  .marks{
    color: #fff;
    .mark{
      width: 175px;
      max-width: 175px;
      height: 100%;
      margin: 20px;
      border-radius: 6px;
      img{
        width: 100%;
      }
      .campaign{
        width: 30px;
      }
      .text{

      }
    }
  }

.card {
      background: rgba(26,58,100,1);
    // background: -moz-linear-gradient(45deg, rgba(26,58,100,1) 0%, rgba(44,118,171,1) 100%);
    // background: -webkit-gradient(left bottom, right top, color-stop(0%, rgba(26,58,100,1)), color-stop(100%, rgba(44,118,171,1)));
    // background: -webkit-linear-gradient(45deg, rgba(26,58,100,1) 0%, rgba(44,118,171,1) 100%);
    // background: -o-linear-gradient(45deg, rgba(26,58,100,1) 0%, rgba(44,118,171,1) 100%);
    // background: -ms-linear-gradient(45deg, rgba(26,58,100,1) 0%, rgba(44,118,171,1) 100%);
    // background: linear-gradient(45deg, rgba(26,58,100,1) 0%, rgba(44,118,171,1) 100%);
    transition: all 1s ease;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, .07);
    position: relative;
    width: 100%;
    left:0;
    top: 0;
    width: 175px;
    &.open {
      background-color: rgba(0,0,0,.5);
      padding: 18px 32px;
      border-radius: 5px;
      cursor: default;
      position: fixed;
      // top: 0;
      // left: 5%;
      width:800px;
      height: 400px;

      // position: absolute;
      left: 50%;
      margin-left: -400px;
      top: 50%;
      margin-top: -200px;
      z-index: 999999999;

      mark-spell {
        opacity: 1;
        transition: opacity 0.5s ease;
        transition-delay: .3s;
        height: auto;
      }
    }
    cursor: pointer;
    mark-spell {
      transition: none;
      opacity: 0;
      height: 0;
      overflow: hidden;
    }
  }



}
</style>
