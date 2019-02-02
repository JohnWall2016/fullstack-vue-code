import Vue from 'vue';
import App from './app-complete/App.vue';
import store from './app-complete/store';

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
