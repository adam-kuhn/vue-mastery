import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import Register from './views/Register.vue'
import LoginUser from './views/LoginUser.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      // the meta property allows us to add custom attributes to the view route property
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: LoginUser
    }
  ]
})
// next must be called to resolve the function
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  // matched provides us a record arrays that match our "to" route
  console.log('matched', to.matched) // this should only ever be 1 route
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next('/') // user is not logged in so navigate to home
    }
  }
  next() // no argument means navigate to our "to" route
}
)

export default router
