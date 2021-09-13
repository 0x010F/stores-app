import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: loadView('Home'),
      meta: { title: 'Home', icon : 'mdi mdi-home-outline' }
    },
    {
      path: '/acknowledgement',
      name: 'acknowledgement',
      component: loadView('Acknowledgement'),
      meta: { title: 'Acknowledgement' }
    },
    {
      path: '/issue',
      name: 'issue',
      component: loadView('Issue'),
      meta: { title: 'Issue' }
    },
    {
      path: '/request',
      name: 'request',
      component: loadView('Request'),
      meta: { title: 'Request', icon : 'mdi mdi-home-outline' }
    },
    {
      path: '/vendor',
      name: 'vendor',
      component: loadView('Stock_req'),
      meta: { title: 'Stock_req', icon : 'mdi mdi-home-outline' }
    },
  ]
})
