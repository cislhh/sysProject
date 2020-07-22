// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import "./assets/css/reset.css"

import store from './store'
// import axios from "axios"
// Vue.prototype.$http = axios

//设定一个服务器地址，用于服务器上传
Vue.prototype.$imgUrl = "http://localhost:3000"

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
