import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_status: false
  },
  getters: {
    login_status: state => {
      return state.login_status
    }
  },
  mutations: {
    change_login_status: (state, status) => (state.login_status = status),
  },
  actions: {
    changeAnsyc_login_status(context, status) {
      context.commit('change_login_status', status)
    }
  }
})

