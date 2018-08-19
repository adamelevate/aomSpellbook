import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    triggers:[]
  },
  mutations: {
    setTriggers: (state, data) => {
      state.triggers = data;
    },
  },
  getters: {
    triggers: state => state.triggers,
  }
})
