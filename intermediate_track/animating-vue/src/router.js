import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import List from './views/List.vue'
import Drawer from './views/Drawer.vue'
import Cards from './views/Cards.vue'
import Stagger from './views/Stagger.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/drawer',
      name: 'drawer',
      component: Drawer
    },
    {
      path: '/cards',
      name: 'cards',
      component: Cards
    },
    {
      path: '/simple',
      name: 'simple',
      component: () =>
        import(/* webpackChunkName: "simple" */ './views/Simple.vue')
    },
    {
      path: '/stagger',
      name: 'stagger',
      component: Stagger
    },
    // no real reason for using one import method over the other in these examples
    {
      path: '/state',
      name: 'state',
      component: () =>
        import(/* webpackChunkName: "simple" */ './views/State.vue')
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () =>
        import(/* webpackChunkName: "simple" */ './views/Timeline.vue')
    },
    {
      path: '/nested-timeline',
      name: 'nested-timeline',
      component: () =>
        import(/* webpackChunkName: "simple" */ './views/NestedTimelines.vue')
    },
  ]
})
