import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import router from './router'
import store from './store'
// import Vuetify from 'vuetify'
import VueFire from 'vuefire'
import VueMq from 'vue-mq'
import firebase from 'firebase/app'
import 'firebase/firestore'


Vue.use(VueMq,{
  xs: 600,
  sm: 960,
  md: 1264,
  lg: 1904,
  xl: 'infinity'
})

Vue.use(VueFire)
firebase.initializeApp({
  projectId: 'aom-spellbook',
  databaseURL: 'https://aom-spellbook.firebaseio.com'
})
export const db = firebase.firestore()
const settings = {timestampsInSnapshots: true};
db.settings(settings);


import App from './App.vue'





/* <script src="https://www.gstatic.com/firebasejs/5.3.1/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAXrFz8SevfWHTovl-qsZbWKaRLxqF8bSo",
    authDomain: "aom-spellbook.firebaseapp.com",
    databaseURL: "https://aom-spellbook.firebaseio.com",
    projectId: "aom-spellbook",
    storageBucket: "aom-spellbook.appspot.com",
    messagingSenderId: "859002716487"
  };
  firebase.initializeApp(config);
</script> */


// explicit installation required in module environments
// Vue.use(Vuetify)
Vue.use(VueFire)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
