import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Message} from 'element-ui';
import App from './App.vue';
import router from './router';

import '@/styles/commit.less';

Vue.use(ElementUI);


Vue.prototype.axios=axios;

axios.interceptors.request.use((config) => {
  // 获取token
  const token = window.localStorage.getItem('token');
  // 在请求头中携带token
  config.headers.authorization = `Bearer ${token}` 
  return config;
})

router.beforeEach((to,from,next)=>{
  const token = window.localStorage.getItem('token');
  if(token){
    next();
  }else{
    if(to.path ==='/login'){
      next();
    }else{
      Message.error('请登录后进入');
      // this.$router.push('/login')
      return next({'path':'/login'})
    }
  }
})


Vue.config.productionTip = false

// 创建vue实例对象 挂载dom 把路由 和 app顶级组件传入 渲染进入dom容器中
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

