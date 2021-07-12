import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import './registerServiceWorker';
import router from './router';
import store from './store';
import config from './config/firebase';
import App from './App.vue';

Vue.config.productionTip = false;
firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
