import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css';
import { Row, Col,Menu,Submenu,Icon,MenuItem ,Dropdown,DropdownMenu,DropdownItem,Breadcrumb,BreadcrumbItem} from 'iview';

Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Menu', Menu);
Vue.component('Submenu', Submenu);
Vue.component('Icon', Icon);
Vue.component('MenuItem', MenuItem);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('DropdownMenu', Breadcrumb);
Vue.component('DropdownItem', BreadcrumbItem);

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
