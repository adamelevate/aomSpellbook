import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.config.devtools = true;


export default new Vuex.Store({
  state: {
    triggers:[],
    marks:[],
    removeMarks:[]
  },
  mutations: {
    setTriggers: (state, data) => {
      console.log('set Tiggers', data);
      state.triggers = data;
    },
    setMarks: (state, data) => {
      console.log('set Marks', data);
      state.marks = data;
    },
    setRemoveMarks: (state, data) => {
      console.log('set remove MArka', data);
      state.removeMarks = data ;
    },
  },
  getters: {
    getTriggers: state => state.triggers,
    getMarks: state => state.marks,
    getRemoveMarks: state => state.removeMarks,
  }
})
