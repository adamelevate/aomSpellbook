import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import router from './router'
import store from '@/store'
import VueFire from 'vuefire'
import VueMq from 'vue-mq'
import firebase from 'firebase/app'
import 'firebase/firestore'

import App from './App.vue'

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




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
