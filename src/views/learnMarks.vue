<template>
<v-container id="learnMarks">
  <v-layout align-center justify-center>
    <v-flex class="card" md7 xs12 sm10>
      <h1>Why Marks</h1>
      <p>This app was created because I love the game, it's got great heros, fun gameplay and it gives me alot to look forward to. Marks are super weird to wrap your head around, because mostly the game doesn't tell you about them until you level up.</p>
      <p>I wanted to know who I could buy/farm/level to get the result I wanted, this was my first attempt at maling that happen. My goal is to add more features to help me, you, everyone... play better.</p>

      <h1>Community</h1>
      <p>Huuuuuge thanks to several <a href="https://discord.gg/MS766gJ">AOM Discord</a> community members: </p>
      <p>
        Pulcho#0425,
        ftb_hodor#5928,
        Amenton#2312,
        Anatoly Kopyrin#9035
      </p>

      <h2>Resources</h2>
      <iframe  src="https://www.youtube.com/embed/NRv609IAm8k" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      <v-btn color="blue" href="http://ageofmagicgame.wikia.com/wiki/Marks">Age of Magic Wiki: Marks</v-btn>
      <br>
      <v-btn href="https://docs.google.com/spreadsheets/d/15BYII79l2Dt30yiihl617nNShq35hBoSx-WbyiNioJo/edit" color="light-yellow lighten-4"><v-icon>description</v-icon> Age of Magic - Marks</v-btn>
      <br>
      <v-btn href="https://docs.google.com/spreadsheets/d/1l2dQTVSWvZV03yHuq-CJXwY2j_iVtHJzYQKQULnphdI/edit?usp=sharing" color="light-yellow lighten-4"><v-icon>description</v-icon> Age of Magic - Marks: Amenton</v-btn>

    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'learnMarks',
  data (){
    return{
}},
methods:{

},
computed: {

},
filters:{

},

}
</script>

<style lang="scss">
#learnMarks{
  color: #fff;
  text-align: center;
  .card{
    padding: 18px;
    background: rgba(26,58,100,.75);
  }
  iframe{
    width: 100%;
    height: auto;
  }
}

</style>
