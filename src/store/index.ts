import Vue from 'vue';
import Vuex from 'vuex';
import colors from '@/assets/colors';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    groups: [
      {
        key: '1',
        groupName: '敵A',
        detail: 'これは敵Aのカウントグループです',
        lastUpdate: '2021/5/10',
        counters: [
          {
            key: 1,
            name: 'アイテム1',
            backgroundColor: '#2196f3',
            textColor: '#ffffff',
            count: 5,
          },
          {
            key: 2,
            name: 'アイテム2',
            backgroundColor: '#ffeb3b',
            textColor: '#000000DE',
            count: 12,
          },
          {
            key: 3,
            name: 'アイテム3',
            backgroundColor: '#4caf50',
            textColor: '#000000DE',
            count: 999,
          },
          {
            key: 4,
            name: 'アイテム4',
            backgroundColor: '#9c27b0',
            textColor: '#ffffff',
            count: 89,
          },
          {
            key: 5,
            name: 'アイテム5',
            backgroundColor: '#e91e63',
            textColor: '#ffffff',
            count: 0,
          },
          {
            key: 6,
            name: 'アイテム名が長すぎるとどうなるのか実験するためのアイテム名',
            backgroundColor: '#546e7a',
            textColor: '#ffffff',
            count: 0,
          },
        ],
      },
      {
        key: '2',
        groupName: '敵B',
        detail: 'これは敵Bのカウントグループです',
        lastUpdate: '2021/5/12',
        counters: [
          {
            key: 1,
            name: 'アイテム1',
            backgroundColor: '#2196f3',
            textColor: '#ffffff',
            count: 5,
          },
          {
            key: 2,
            name: 'アイテム2',
            backgroundColor: '#ffeb3b',
            textColor: '#000000DE',
            count: 12,
          },
          {
            key: 3,
            name: 'アイテム3',
            backgroundColor: '#4caf50',
            textColor: '#000000DE',
            count: 999,
          },
        ],
      },
      {
        key: '3',
        groupName: '敵C',
        detail: 'これは敵Cのカウントグループです',
        lastUpdate: '2021/5/16',
        counters: [
          {
            key: 1,
            name: 'アイテム1',
            backgroundColor: '#2196f3',
            textColor: '#ffffff',
            count: 5,
          },
          {
            key: 2,
            name: 'アイテム2',
            backgroundColor: '#ffeb3b',
            textColor: '#000000DE',
            count: 12,
          },
        ],
      },
    ],
    group: {},
    isDialogOpen: false,
    isCounterDialogOpen: false,
    groupCreateFields: {
      key: '',
      groupName: '',
      lastUpdate: '',
      detail: '',
      validate: true,
    },
    counterCreateFields: {
      key: '',
      itemName: '',
      validate: true,
    },
    alertId: '',
    counterAlertId: '',
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
    // SET_GROUPS: (state, groups) => {
    //   state.groups = groups;
    // },
    SET_IS_DIALOG_OPEN: (state, isOpen) => {
      state.isDialogOpen = isOpen;
    },
    SET_IS_COUNTER_DIALOG_OPEN: (state, isOpen) => {
      state.isCounterDialogOpen = isOpen;
    },
    SET_ALERT_ID: (state, key) => {
      state.alertId = key;
    },
    SET_COUNTER_ALERT_ID: (state, key) => {
      state.counterAlertId = key;
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

    // *-- counter作成用fieldのset --*
    SET_COUNTER_CREATE_FIELDS_KEY: (state, key) => {
      state.counterCreateFields.key = key;
    },
    SET_COUNTER_CREATE_FIELDS_ITEM_NAME: (state, itemName) => {
      state.counterCreateFields.itemName = itemName;
    },
    SET_COUNTER_CREATE_FIELDS_VALIDATE: (state, validate) => {
      state.counterCreateFields.validate = validate;
    },
    // *-- end --*

    // groupにcounterを追加
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
    // TODO Prototype
    groupCreate: (context) => {
      if (context.state.groupCreateFields.groupName !== '') {
        // const uid: string = context.state.user.uid;
        const nowDate = new Date();
        // 試しのデータ 本番ではkeyとcountersがないそしてobjectをつける
        const data = {
          key: `${context.state.groups.length + 1}`,
          groupName: context.state.groupCreateFields.groupName,
          detail: context.state.groupCreateFields.detail,
          lastUpdate: `${nowDate.getFullYear()}/${nowDate.getMonth() + 1}/${nowDate.getDate()}`,
          counters: [],
        };

        context.state.groups.push(data);

        context.commit('SET_IS_DIALOG_OPEN', false);
        context.dispatch('groupFieldsClear').then();
        // context.dispatch('mindMapRead').then();
      } else {
        context.commit('SET_GROUP_CREATE_FIELDS_VALIDATE', false);
      }
    },
    // TODO Prototype
    groupUpdate: (context, key) => {
      console.log(key);
      console.log(context.state.groupCreateFields);
      context.commit('SET_IS_DIALOG_OPEN', false);
      context.dispatch('groupFieldsClear').then();
    },
    // TODO Prototype
    groupDelete: (context, key) => {
      console.log(`Delete: ${key}`);
    },
    groupSubmit: (context) => {
      // const key: string = context.state.groupCreateFields.key;
      if (context.state.groupCreateFields.key === '') {
        context.dispatch('groupCreate').then();
      } else {
        // console.log('update');
        context.dispatch('groupUpdate', context.state.groupCreateFields.key).then();
      }
    },
    groupFieldsClear: (context) => {
      context.commit('SET_GROUP_CREATE_FIELDS_KEY', '');
      context.commit('SET_GROUP_CREATE_FIELDS_GROUP_NAME', '');
      context.commit('SET_GROUP_CREATE_FIELDS_DETAIL', '');
      context.commit('SET_GROUP_CREATE_FIELDS_LAST_UPDATE', '');
      context.commit('SET_GROUP_CREATE_FIELDS_VALIDATE', true);
    },
    // TODO Prototype
    counterCreate: (context, key) => {
      if (context.state.counterCreateFields.itemName !== '') {
        // HUEをランダムに取得
        let colorList = colors;
        // すでにcounterに存在するHUEを削除したカラーリストを作る。
        context.state.groups.filter((e) => e.key === key)[0].counters.forEach((item) => {
          colorList = colorList.filter((c) => c.backgroundColor !== item.backgroundColor);
        });

        const color = colorList[(Math.floor(Math.random() * colorList.length))];
        const counter = {
          key: context.state.groups.filter((e) => e.key === key)[0].counters.length + 1,
          name: context.state.counterCreateFields.itemName,
          backgroundColor: color.backgroundColor,
          textColor: color.textColor,
          count: 0,
        };

        context.state.groups.filter((e) => e.key === key)[0].counters.push(counter);

        context.commit('SET_IS_COUNTER_DIALOG_OPEN', false);
        context.dispatch('counterFieldsClear').then();
        // context.dispatch('mindMapRead').then();
      } else {
        context.commit('SET_COUNTER_CREATE_FIELDS_VALIDATE', false);
      }
    },
    // TODO Prototype
    counterUpdate: (context, key) => {
      console.log(key);
      console.log(context.state.counterCreateFields.itemName);
      context.commit('SET_IS_COUNTER_DIALOG_OPEN', false);
      context.dispatch('counterFieldsClear').then();
    },
    // TODO Prototype
    counterSubmit: (context, key) => {
      if (context.state.counterCreateFields.key === '') {
        context.dispatch('counterCreate', key).then();
      } else {
        // console.log('update');
        context.dispatch('counterUpdate', context.state.counterCreateFields.key).then();
      }
    },
    // TODO Prototype
    counterDelete: (context, key) => {
      console.log(`Counter Delete: ${key}`);
    },
    counterFieldsClear: (context) => {
      context.commit('SET_COUNTER_CREATE_FIELDS_KEY', '');
      context.commit('SET_COUNTER_CREATE_FIELDS_ITEM_NAME', '');
      context.commit('SET_COUNTER_CREATE_FIELDS_VALIDATE', true);
    },
    /* eslint-disable no-param-reassign */
    // TODO Prototype
    addOnceCount: (context, keys) => {
      context.state.groups.filter((e) => e.key === keys.groupKey)[0]
        .counters.filter((e) => e.key === keys.counterKey)[0].count += 1;
    },
    // TODO Prototype
    oneLessCount: (context, keys) => {
      context.state.groups.filter((e) => e.key === keys.groupKey)[0]
        .counters.filter((e) => e.key === keys.counterKey)[0].count -= 1;
    },
    /* eslint-enable no-param-reassign */
  },
  modules: {
  },
});
