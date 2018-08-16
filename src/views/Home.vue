<template>
  <div class="home">

    <v-layout row align-center justify-space-between class="top">
      <v-flex class="flex-auto">
        <img class="logo" src="@/assets/logo.png" alt="">
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex class="flex-auto navTitle">
        <h1 class="">Marks</h1>
        <span class="subtitle">Extra Damage... if you plan well.</span>
      </v-flex>
    </v-layout>

    <v-layout class="filters" align-center justify-center row>
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

      <v-flex class="roles flex-auto">
        <v-btn v-if="Role" class="selectedFilter" @click="Role = ''" flat color="yellow lighten-2">
          <v-avatar size="24">
            <img :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/roles/Icon_Role_'+Role+'.png'">
          </v-avatar>
          <span class="selectText">
            {{ Role}}
          </span>
        </v-btn>
        <v-select
              v-if="!Role"
              v-model="Role"
              :items="RoleList"
              dark
              outline
              color="blue-grey lighten-2"
              label="Role"
              clearable

              single-line
              @change="resetFilter($event, 'Role')"
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


    <v-layout class="marks" row wrap v-if="marks != undefined && marks.length > 0" :class="{'dektop':$mq == 'md' || $mq == 'lg' || $mq == 'xl'}">
      <v-flex class="mark" v-for="(mark, index) in filteredMarks" :key="index" v-if="mark.Skill.Name">
        <div class="card elevation-3" @click="showDialog(mark)" :class="{'active': dialogMark == mark}">
          <!-- Show in filters -->
          <img class="portrait" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/heros/'+mark.Hero+'.jpg'">
          <v-layout class="text" align-center justify-start>
            <v-flex class="flex-auto">
              <img v-if="mark.Campaign != ''" class="campaign" :src="'https://s3.us-east-2.amazonaws.com/aom-spellbook/campaign/'+mark.Campaign+'.png'">
              <v-avatar v-else color="grey" size="20">
                <span>?</span>
              </v-avatar>
            </v-flex>
            <v-flex class="flex-auto">
              <strong class="hero-name">{{mark.Skill.Name}}</strong>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" :width="checkWidth($mq)" :fullscreen="$mq == 'xs' || $mq == 'sm'">
      <v-card v-if="dialog">
        <mark-spell :mark="dialogMark" @closeCard="hideDialog"></mark-spell>
      </v-card>
    </v-dialog>


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
         "RaArchne": "",
         "Skill":{
         "Name": "Burning of Souls",
         "SkillLevel": 3,
         "HeroLevel": 10,
         "EquipmentLevel": 2,
         },
         "FactionMark": "",
         "RoleMark": "V"},
        {
         "Hero": "Abyss_Hound",
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
         "RaArchne": "",
         "Skill":{
         "Name": "Assassin of the Abyss",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "O",
         "Skill":{
         "Name": "Chitin Shield",
         "SkillLevel": 4,
         "HeroLevel": 20,
         "EquipmentLevel": 3,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "",
         "Skill":{
         "Name": "Dwarf Bolt",
         "SkillLevel": 4,
         "HeroLevel": 20,
         "EquipmentLevel": 3,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "",
         "Skill":{
         "Name": "Berserker Rage",
         "SkillLevel": 4,
         "HeroLevel": 20,
         "EquipmentLevel": 3,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
        },
        {
         "Hero": "Arekhon_Axe_Thrower",
         "Role": "Ranged",
         "Faction": "Arekon_Undead",
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
        },
        {
         "Hero": "Arekhon_Guard",
         "Role": "Tank",
         "Faction": "Arekon_Undead",
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
         "RaArchne": "",
         "Skill":{
         "Name": "Arekhon Battle Cry",
         "SkillLevel": 6,
         "HeroLevel": 40,
         "EquipmentLevel": 5,
         },
         "FactionMark": "V",
         "RoleMark": ""
        },
        {
         "Hero": "Arekhon_Shadow",
         "Role": "Rogue",
         "Faction": "Arekon_Undead",
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
         "RaArchne": "",
         "Skill":{
         "Name": "Shadow Judgement",
         "SkillLevel": 4,
         "HeroLevel": 20,
         "EquipmentLevel": 3,
         },
         "FactionMark": "",
         "RoleMark": "V"
        },
        {
         "Hero": "Arekhon_Spear",
         "Role": "Melee",
         "Faction": "Arekon_Undead",
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "Arc of Steel",
         "SkillLevel": 4,
         "HeroLevel": 20,
         "EquipmentLevel": 3,
         },
         "FactionMark": "",
         "RoleMark": "V"
        },
        {
         "Hero": "Azariel",
         "Role": "Healer ",
         "Faction": "Dark_Elves",
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "Swamp Curse",
         "SkillLevel": 6,
         "HeroLevel": 40,
         "EquipmentLevel": 5,
         },
         "FactionMark": "V",
         "RoleMark": ""
        },
        {
         "Hero": "Blood_Emperor",
         "Role": "Boss",
         "Faction": "Arekon_Undead",
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
         "RaArchne": "",
         "Skill":{
         "Name": "Mark of Arekhon",
         "SkillLevel": 4,
         "HeroLevel": 20,
         "EquipmentLevel": 3,
         },
         "FactionMark": "",
         "RoleMark": "V"
        },
        {
         "Hero": "Blood_Mage",
         "Role": "Caster",
         "Faction": "Arekon_Undead",
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
         "RaArchne": "",
         "Skill":{
         "Name": "Rivers of Blood",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "V",
         "RoleMark": ""
        },
        {
         "Hero": "Blood_Priest",
         "Role": "Healer ",
         "Faction": "Arekon_Undead",
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
         "RaArchne": "",
         "Skill":{
         "Name": "Cry of the Void",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "Red Fury",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "V",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "Dark Flame",
         "SkillLevel": 4,
         "HeroLevel": 20,
         "EquipmentLevel": 3,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "",
         "Skill":{
         "Name": "Dark Weakness",
         "SkillLevel": 6,
         "HeroLevel": 40,
         "EquipmentLevel": 5,
         },
         "FactionMark": "V",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "Wild Fire",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "V",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "Rage of the Abyss",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "V",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "Enraging Strike",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "V",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "X",
         "Skill":{
         "Name": "Mimicry",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "V",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "Healing Light",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "V",
         "RoleMark": ""
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
         "RaArchne": " ",
         "Skill":{
         "Name": "Ra'Archne Taboo",
         "SkillLevel": 6,
         "HeroLevel": 40,
         "EquipmentLevel": 5,
         },
         "FactionMark": "V",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "Drink Poison!",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "V",
         "RoleMark": ""
        },
        {
         "Hero": "Last_Guardian",
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
        },
        {
         "Hero": "Lucky",
         "Role": "Healer ",
         "Faction": "Shaggy_Pygmies",
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
        },
        {
         "Hero": "Ra'Archne_Queen",
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "O",
         "Skill":{
         "Name": "Poison Squirt",
         "SkillLevel": 6,
         "HeroLevel": 40,
         "EquipmentLevel": 5,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "O",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "Bastion of Faith",
         "SkillLevel": 4,
         "HeroLevel": 20,
         "EquipmentLevel": 3,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "",
         "Skill":{
         "Name": "Frost Spike",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "V",
         "RoleMark": ""
        },
        {
         "Hero": "Roland",
         "Role": "Boss",
         "Faction": "Knights_of_the _Council",
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
        },
        {
         "Hero": "Sandariel",
         "Role": "Boss",
         "Faction": "Wild_Elves",
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
        },
        {
         "Hero": "Seven_Knives",
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
         "RaArchne": "",
         "Skill":{
         "Name": "Knife Throw",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "Kobold Camouflage",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "",
         "RoleMark": "V"
        },
        {
         "Hero": "Silver_Moon",
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
        },
        {
         "Hero": "Soothsayer_Zytima",
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
         "RaArchne": "",
         "Skill":{
         "Name": "Anger of Flies",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
        },
        {
         "Hero": "Swamp_Killer",
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
         "RaArchne": "",
         "Skill":{
         "Name": "Killer Strike",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "O",
         "Skill":{
         "Name": "Flurry of Spikes",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "",
         "Skill":{
         "Name": "Way of the Sword",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "Curse Rune",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "",
         "Skill":{
         "Name": "Earthquake Rune",
         "SkillLevel": 5,
         "HeroLevel": 30,
         "EquipmentLevel": 4,
         },
         "FactionMark": "V",
         "RoleMark": ""
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
         "RaArchne": "",
         "Skill":{
         "Name": "THE WYRM",
         "SkillLevel": 4,
         "HeroLevel": 20,
         "EquipmentLevel": 3,
         },
         "FactionMark": "",
         "RoleMark": "V"
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
         "RaArchne": "",
         "Skill":{
         "Name": "",
         "SkillLevel": null,
         "HeroLevel": null,
         "EquipmentLevel": null,
         },
         "FactionMark": "",
         "RoleMark": ""
        }
      ],
  marks: [],
  dialog: false,
  dialogMark: [],
  //filters
  Role: "",
  RoleList:['Tank','Melee',	'Ranged',	'Rogue',	'Caster',	'Healer', 'Boss'],
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
      text-align: right;
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
        margin: 20px;
      }
    }
    .mark{
      width: 175px;
      max-width: 175px;
      margin: 10px;
      border-radius: 6px;
      .card{
        width: 175px;
        background: rgba(26,58,100,.4);
        transition: all .5s ease;
        &:hover{
          transform: scale(1.2,1.2);
        }
        &.active{
          opacity: .2;
          border: 3px solid #fff;
        }
        .v-avatar{
            margin-right: 5px;
        }
        img{
          width: 100%;
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



}
</style>
