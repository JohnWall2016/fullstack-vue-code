import Vue from 'vue';
import App from './app-complete/App.vue';
import router from './app-complete/router';
import store from './app-complete/store';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
