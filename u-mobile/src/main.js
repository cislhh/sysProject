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
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
