// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
Vue.config.productionTip = false
//引入外部样式
import './assets/css/common.css'
import './assets/css/global.css'
import 'mint-ui/lib/style.css'
// import 'adaptive.js/js/adaptive.js'


import registerAllGlobalCom from './config/globalCom/globalCom.js'
import initMixin from './config/Mixin/setMixin.js'
import initPrototype from './config/prototype/setPrototype.js'
import MintUI from 'mint-ui'
import FastClick from 'fastclick'

FastClick.attach(document.body);
require('es6-promise').polyfill();
(function () {
  registerAllGlobalCom();
  initMixin();
  initPrototype();
})()

import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
Vue.use(VueSocketio, socketio('http://127.0.0.1:8090'));//与服务端链接
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
