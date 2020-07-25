// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入清除默认样式文件
import './assets/css/reset.css';
//全局引入阿里图标库
import './assets/icon-font/iconfont.css';
//全局引入动画库
import "./assets/css/animate.min.css";
//引入rem.js文件
import remScale from './assets/js/remScale'

import store from './store'

//设定一个服务器地址，用于服务器上传
Vue.prototype.$imgUrl = "http://localhost:3000"

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
