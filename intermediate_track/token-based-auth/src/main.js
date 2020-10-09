import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'

import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    // allow for automatic login
    const userString = localStorage.getItem('user')
    console.log('us', userString)
    if (userString) {
      // grabs user information from local storage and
      // sets vuex to the relevant data
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }
    // this protects against a user from trying to force there way into the app with there own token
    // if the server reponse with an un authorized error (i.e token is not valid) then logout the user
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 400) { // BE errors aren't working so use 400 instead of 401
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App)
}).$mount('#app')
