<template>
  <div id="navigation">
    <div class="v-top-nav" v-show="$mq == 'md' || $mq =='lg'">
      <router-link v-for="(nav, index) in navigation" :key="index" :to="nav.path">
        <v-btn :flat="$route.path != nav.path" :color="$route.path === nav.path ? 'light-blue lighten-4' : 'white'">
          <v-icon>{{nav.icon}}</v-icon>  {{nav.name}}
        </v-btn>
      </router-link>
    </div>


    <v-bottom-nav
        v-show="$mq == 'xs' || $mq =='sm'"
        :active.sync="current"
        :value="true"
        fixed
        color="light-blue lighten-4"
        >
        <router-link v-for="(nav, index) in navigation" :key="index" :to="nav.path">
          <v-btn
            :color="current == index ? 'indigo darken-4' : 'white'"
            :class="current == index ? 'light-green accent-4' : null"
            flat
            block
            :value="index"
          >
            <span>{{nav.name}}</span>
            <v-icon>{{nav.icon}}</v-icon>
          </v-btn>
        </router-link>
        </v-bottom-nav>

  </div>
</template>

<script>
export default {
  name: 'navigation',
  data (){
    return{
      // mark: []
      current: 9,
      navigation:[
        {
          name: 'Place Marks',
          icon: 'vertical_align_bottom',
          path: '/'
        },
        {
          name: 'Remove Marks',
          icon: 'not_interested',
          path: '/remove-marks'
        },
        {
          name: 'Learn About Marks',
          icon: 'help',
          path: '/learn-about-marks'
        },
      ]
    }
  },
  methods: {
    getIndex(){
      for (var i = 0; i < this.navigation.length; i++) {
          // console.log('nav', this.$route, this.$route.path, this.navigation[i].path, this.$route.path === this.navigation[i].path);
          if(this.$route.path === this.navigation[i].path){
            this.current = i;
          }
      }
    }

  },
  created(){
    this.getIndex()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#navigation{
  .v-top-nav a{
    text-decoration: none!important;
    &.router-link-exact-active .v-btn__content{
      color:#242e53!important;
    }
  }
  .v-bottom-nav{
    background: rgba(26,58,100,.8)!important;
    a{
      text-decoration: none!important;
    }
    .v-btn.v-btn--active{
      background-color: #64dd17!important;
      border-color: #64dd17!important;
    }
  }
}

</style>
