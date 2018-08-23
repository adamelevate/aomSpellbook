import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import router from './router'
import store from '@/store'
import VueFire from 'vuefire'
import VueMq from 'vue-mq'

import App from './App.vue'

Vue.use(VueMq,{
  xs: 600,
  sm: 960,
  md: 1264,
  lg: 1904,
  xl: 'infinity'
})






Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
