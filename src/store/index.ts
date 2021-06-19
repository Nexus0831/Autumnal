import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    groups: [
      {
        key: '1',
        groupName: '敵A',
        lastUpdate: '2021/5/10',
        detail: 'これは敵Aのカウントグループです',
        counters: [
          {
            key: 1,
            name: 'アイテム1',
            color: '#2196f3',
            count: 5,
          },
          {
            key: 2,
            name: 'アイテム2',
            color: '#ffeb3b',
            count: 12,
          },
          {
            key: 3,
            name: 'アイテム3',
            color: '#4caf50',
            count: 999,
          },
          {
            key: 4,
            name: 'アイテム4',
            color: '#9c27b0',
            count: 89,
          },
          {
            key: 5,
            name: 'アイテム5',
            color: '#e91e63',
            count: 0,
          },
        ],
      },
      {
        key: '2',
        groupName: '敵B',
        lastUpdate: '2021/5/12',
        detail: 'これは敵Bのカウントグループです',
        counters: [
          {
            key: 1,
            name: 'アイテム1',
            color: '#2196f3',
            count: 5,
          },
          {
            key: 2,
            name: 'アイテム2',
            color: '#ffeb3b',
            count: 12,
          },
          {
            key: 3,
            name: 'アイテム3',
            color: '#4caf50',
            count: 999,
          },
        ],
      },
      {
        key: '3',
        groupName: '敵C',
        lastUpdate: '2021/5/16',
        detail: 'これは敵Cのカウントグループです',
        counters: [
          {
            key: 1,
            name: 'アイテム1',
            color: '#2196f3',
            count: 5,
          },
          {
            key: 2,
            name: 'アイテム2',
            color: '#ffeb3b',
            count: 12,
          },
        ],
      },
    ],
    group: {},
    isDialogOpen: false,
    groupCreateFields: {
      key: '',
      groupName: '',
      lastUpdate: '',
      detail: '',
      validate: true,
    },
  },
  getters: {
    getGroup: (state) => (key: string) => {
      const group = state.groups.filter((e) => e.key === key);
      return group[0];
    },
  },
  mutations: {
    // グループに値をセット
    SET_GROUP: (state, group) => {
      state.group = group;
    },
    SET_IS_DIALOG_OPEN: (state, isOpen) => {
      state.isDialogOpen = isOpen;
    },
    // *-- group作成用fieldのset --*
    SET_GROUP_CREATE_FIELDS_KEY: (state, key) => {
      state.groupCreateFields.key = key;
    },
    SET_GROUP_CREATE_FIELDS_GROUP_NAME: (state, groupName) => {
      state.groupCreateFields.groupName = groupName;
    },
    SET_GROUP_CREATE_FIELDS_LAST_UPDATE: (state, lastUpdate) => {
      state.groupCreateFields.lastUpdate = lastUpdate;
    },
    SET_GROUP_CREATE_FIELDS_DETAIL: (state, detail) => {
      state.groupCreateFields.detail = detail;
    },
    SET_GROUP_CREATE_FIELDS_VALIDATE: (state, validate) => {
      state.groupCreateFields.validate = validate;
    },
    // *-- end --*
  },
  actions: {
    // count画面にURLに直接アクセスした際にもデータを表示できるようにする
    groupRead: (context, key) => {
      context.state.groups.forEach((item) => {
        if (item.key === key) {
          context.commit('SET_GROUP', item);
        }
      });
    },
    groupFieldsClear: (context) => {
      context.commit('SET_GROUP_CREATE_FIELDS_KEY', '');
      context.commit('SET_GROUP_CREATE_FIELDS_GROUP_NAME', '');
      context.commit('SET_GROUP_CREATE_FIELDS_DETAIL', '');
      context.commit('SET_GROUP_CREATE_FIELDS_LAST_UPDATE', '');
      context.commit('SET_GROUP_CREATE_FIELDS_VALIDATE', true);
    },
  },
  modules: {
  },
});
