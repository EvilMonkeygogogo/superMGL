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
          path:'', //主页系统信息
          name:'home',
          component:()=>import('./views/home/home.vue')
        },
        {
          path:'/setting', //系统配置
          name:'setting',
          component:()=>import('./views/setting/setting.vue')
        },
        {
          path:'rootg', //权限管理
          name:'rootg',
          component:()=>import('./views/rootg/rootg.vue')
        },
        {
          path:'/adduser',  //添加用户
          name:'adduser',
          component:()=>import('./views/adduser/adduser.vue')
        },
        {
          path:'/passup',   //密码修改
          name:'passup',
          component:()=>import('./views/passup/passup.vue')
        },
        {
          path:'/goods',    //商品管理
          name:'goods',
          component:()=>import('./views/goods/goods.vue')
        },
        {
          path:'/addgoods',   //添加商品
          name:'addgoods',
          component:()=>import('./views/addgoods/addgoods.vue')
        },
        {
          path:'/usermanage',    //账号管理
          name:'usermanage',
          component:()=>import('./views/usermanage/usermanage.vue')
        },
        {
          path:'/tongji',    //销售统计
          name:'tongji',
          component:()=>import('./views/tongji/tongji.vue')
        },
        {
          path:'/fenlei',    //管理分类
          name:'fenlei',
          component:()=>import('./views/fenlei/fenlei.vue')
        },
        {
          path:'/addfenlei',    //添加分类
          name:'addfenlei',
          component:()=>import('./views/addfenlei/addfenlei.vue')
        },
        {
          path:'/personal',    //个人中心
          name:'personal',
          component:()=>import('./views/person/person.vue')
        },
      ]
    }
  ]
})
