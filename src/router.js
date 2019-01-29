import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: ()=>import('./views/Logins/login.vue')
    },
    {
      path: '/',
      name: 'index',
      component:()=>import('./views/index/index.vue'),
      children:[
        {
          path:'',
          name:'home',
          component:()=>import('./views/home/home.vue')
        },
        {
          path:'/adduser',
          name:'adduser',
          component:()=>import('./views/adduser/adduser.vue')
        },
        {
          path:'/passup',
          name:'passup',
          component:()=>import('./views/passup/passup.vue')
        }
      ]
    }
  ]
})
