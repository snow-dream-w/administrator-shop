import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css';
import { Row, Col,Menu,Submenu,Icon,MenuItem } from 'iview';

Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Menu', Menu);
Vue.component('Submenu', Submenu);
Vue.component('Icon', Icon);
Vue.component('MenuItem', MenuItem);

import axios from 'axios'
import VueAxios from 'vue-axios'

// 配置axios基础地址
axios.defaults.baseURL = "http://localhost:3000";
axios.interceptors.request.use((config) => {
  config.withCredentials = true
  return config
}, (error) => {
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
