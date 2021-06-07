import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    groups:[
      {
        id: '1',
        groupName: '敵A',
        lastUpdate: '2021/5/10',
        detail: 'これは敵Aのカウントグループです',
        counters: []
      },
      {
        id: '2',
        groupName: '敵B',
        lastUpdate: '2021/5/12',
        detail: 'これは敵Bのカウントグループです',
        counters: []
      },
      {
        id: '3',
        groupName: '敵C',
        lastUpdate: '2021/5/16',
        detail: 'これは敵Cのカウントグループです',
        counters: []
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
