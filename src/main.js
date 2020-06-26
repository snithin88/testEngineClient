
import './css/style.css';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueSidebarMenu from 'vue-sidebar-menu';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';

//  import "@plugins/echarts";

Vue.use(BootstrapVue);
Vue.use(VueSidebarMenu);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
