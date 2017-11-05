import Vue from 'vue'
import Vuex from 'vuex'
import list from './modules/list'
import raiders from './modules/raiders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    list,
    raiders
  }
})
