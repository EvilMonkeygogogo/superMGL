import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'

import '@/styles/commit.less'

Vue.use(ElementUI);


Vue.config.productionTip = false

// 创建vue实例对象 挂载dom 把路由 和 app顶级组件传入 渲染进入dom容器中
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
