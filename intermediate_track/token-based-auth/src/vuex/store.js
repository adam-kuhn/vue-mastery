import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { user: null },
  mutations: {
    SET_USER_DATA (state, user) {
      state.user = user
      // save user data to local storage
      localStorage.setItem('user', JSON.stringify(user))
      // add JWT to axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
    },
    CLEAR_USER_DATA (state) {
      // clear user data from vuex
      // state.user = null
      // // clear local storage
      // localStorage.removeItem('user')
      // axios.defaults.headers.common['Authorization'] = null

      // CLEANER MORE SCALABLE SOLUTION
      localStorage.removeItem('user')
      location.reload() // this forces the page to reload and thereby clear all axios headers
      // we defined, and all vuex stores
    }
  },
  actions: {
    async register ({ commit }, userCredntials) {
      const { data } = await axios.post('//localhost:3000/register', userCredntials)
      commit('SET_USER_DATA', data)
    },
    async login ({ commit }, userCredntials) {
      const { data } = await axios.post('//localhost:3000/login', userCredntials)
      commit('SET_USER_DATA', data)
    },
    // .then() just for fun
    logout ({ commit }) {
      commit('CLEAR_USER_DATA')
    }
  },
  getters: {
    loggedIn (state) {
      return !!state.user
    }
  }
})
