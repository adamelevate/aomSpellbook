import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import removeMarks from './views/removeMarks.vue'
import learnMarks from './views/learnMarks.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/remove-marks',
      name: 'removeMarks',
      component: removeMarks
    },
    {
      path: '/learn-about-marks',
      name: 'learnMarks',
      component: learnMarks
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
