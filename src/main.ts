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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.commit('SET_USER', user);
    store.commit('SET_IS_SIGN_IN', true);
    console.log('on_login');

    if (router.currentRoute.path === '/login') {
      router.push('/');
    }
  } else {
    store.commit('SET_IS_SIGN_IN', false);
    console.log('no_login');
    if (router.currentRoute.path !== '/login') {
      router.push('/login');
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
