import Vue from 'vue';
import Router from 'vue-router';
import scenario from './components/scenario.vue';
import configurator from './components/configurator.vue';
import executor from './components/executor.vue';
import home from './components/home.vue';
import displayscenario from './components/displayscenario.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/scenario',
      name: 'scenario',
      component: scenario,
    },
    {
      path: '/configurator',
      name: 'configurator',
      component: configurator,
    },
    {
      path: '/executor',
      name: 'executor',
      component: executor,
    },
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/displayscenario',
      name: 'displayscenario',
      component: displayscenario,
    },

  ],
});
