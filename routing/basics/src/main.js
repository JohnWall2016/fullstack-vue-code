import Vue from 'vue';
import App from './app/app-complete';
import { router } from './app/app-complete';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
