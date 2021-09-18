import Vue from 'vue';
import Vuex from 'vuex';
import colors from '@/assets/colors';
// import { group } from '@/interface/interface';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    groups: [],
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
    user: {
      uid: '',
    },
    isSignIn: false,
  },
  getters: {
    getGroup: (state) => (key: string) => state.groups.filter((e: any) => e.key === key)[0],
  },
  mutations: {
    // グループに値をセット
    SET_GROUP: (state, group) => {
      state.group = group;
    },
    SET_GROUPS: (state, groups) => {
      state.groups = groups;
    },
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
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_IS_SIGN_IN: (state, isSignIn) => {
      state.isSignIn = isSignIn;
    },
  },
  actions: {
    // count画面にURLに直接アクセスした際にもデータを表示できるようにする
    groupRead: (context) => {
      firebase.database().ref(`/users/${context.state.user.uid}/groups`)
        .once('value').then((snapshot) => {
          const groups: Record<string, unknown>[] = [];

          snapshot.forEach((item) => {
            groups.push({ key: item.key, ...item.val() });
          });

          context.commit('SET_GROUPS', groups);
        })
        .catch(() => {
          context.commit('SET_GROUPS', []);
        });
    },
    // TODO Prototype
    groupCreate: (context) => {
      if (context.state.groupCreateFields.groupName !== '') {
        const nowDate = new Date();
        const data: Record<string, unknown> = {
          groupName: context.state.groupCreateFields.groupName,
          detail: context.state.groupCreateFields.detail,
          lastUpdate: `${nowDate.getFullYear()}/${nowDate.getMonth() + 1}/${nowDate.getDate()}`,
        };

        firebase.database().ref(`/users/${context.state.user.uid}/groups`).push().update(data)
          .then(() => {
            context.commit('SET_IS_DIALOG_OPEN', false);
            context.dispatch('groupFieldsClear').then();
            context.dispatch('groupRead').then();
          });
      } else {
        context.commit('SET_GROUP_CREATE_FIELDS_VALIDATE', false);
      }
    },
    // TODO Prototype
    /* eslint-disable no-param-reassign */
    groupUpdate: (context, key) => {
      if (context.state.groupCreateFields.groupName !== '') {
        const nowDate = new Date();
        firebase.database().ref(`/users/${context.state.user.uid}/groups/${key}`).update({
          groupName: context.state.groupCreateFields.groupName,
          detail: context.state.groupCreateFields.detail,
          lastUpdate: `${nowDate.getFullYear()}/${nowDate.getMonth() + 1}/${nowDate.getDate()}`,
        }).then(() => {
          context.commit('SET_IS_DIALOG_OPEN', false);
          context.dispatch('groupFieldsClear');
          context.dispatch('groupRead').then();
        });
      } else {
        context.commit('SET_GROUP_CREATE_FIELDS_VALIDATE', false);
      }
    },
    // TODO Prototype
    groupDelete: (context, key) => {
      firebase.database().ref(`/users/${context.state.user.uid}/groups/${key}`).remove().then(() => {
        context.dispatch('groupRead').then();
      });
    },
    /* eslint-enable no-param-reassign */
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
      // if (context.state.counterCreateFields.itemName !== '') {
      //   // HUEをランダムに取得
      //   let colorList = colors;
      //   // すでにcounterに存在するHUEを削除したカラーリストを作る。
      //   context.state.groups.filter((e) => e.key === key)[0].counters.forEach((item) => {
      //     colorList = colorList.filter((c) => c.backgroundColor !== item.backgroundColor);
      //   });
      //
      //   const color = colorList[(Math.floor(Math.random() * colorList.length))];
      //   const counter = {
      //     key: context.state.groups.filter((e) => e.key === key)[0].counters.length + 1,
      //     name: context.state.counterCreateFields.itemName,
      //     backgroundColor: color.backgroundColor,
      //     textColor: color.textColor,
      //     count: 0,
      //   };
      //
      //   context.state.groups.filter((e) => e.key === key)[0].counters.push(counter);
      //
      //   context.commit('SET_IS_COUNTER_DIALOG_OPEN', false);
      //   context.dispatch('counterFieldsClear').then();
      //   // context.dispatch('mindMapRead').then();
      // } else {
      //   context.commit('SET_COUNTER_CREATE_FIELDS_VALIDATE', false);
      // }
      console.log('create');
    },
    // TODO Prototype
    /* eslint-disable no-param-reassign */
    counterUpdate: (context, keys) => {
      // console.log(key);
      // console.log(context.state.counterCreateFields.itemName);
      // context.state.groups.filter((e) => e.key === keys.groupKey)[0]
      //   .counters.filter((e) => e.key === keys.counterKey)[0]
      //   .name = context.state.counterCreateFields.itemName;
      // context.commit('SET_IS_COUNTER_DIALOG_OPEN', false);
      // context.dispatch('counterFieldsClear').then();
      console.log('update');
    },
    // TODO Prototype
    counterDelete: (context, keys) => {
      // context.state.groups.filter((e) => e.key === keys.groupKey)[0]
      //   .counters = context.state.groups.filter((e) => e.key === keys.groupKey)[0]
      //     .counters.filter((e) => e.key !== keys.counterKey);
      console.log('delete');
    },
    /* eslint-enable no-param-reassign */
    // TODO Prototype
    counterSubmit: (context, key) => {
      if (context.state.counterCreateFields.key === '') {
        context.dispatch('counterCreate', key).then();
      } else {
        // console.log('update');
        context.dispatch('counterUpdate', { groupKey: key, counterKey: context.state.counterCreateFields.key }).then();
      }
    },
    counterFieldsClear: (context) => {
      context.commit('SET_COUNTER_CREATE_FIELDS_KEY', '');
      context.commit('SET_COUNTER_CREATE_FIELDS_ITEM_NAME', '');
      context.commit('SET_COUNTER_CREATE_FIELDS_VALIDATE', true);
    },
    /* eslint-disable no-param-reassign */
    // TODO Prototype
    addOnceCount: (context, keys) => {
      // context.state.groups.filter((e) => e.key === keys.groupKey)[0]
      //   .counters.filter((e) => e.key === keys.counterKey)[0].count += 1;
      console.log('add');
    },
    // TODO Prototype
    oneLessCount: (context, keys) => {
      // context.state.groups.filter((e) => e.key === keys.groupKey)[0]
      //   .counters.filter((e) => e.key === keys.counterKey)[0].count -= 1;
      console.log('less');
    },
    /* eslint-enable no-param-reassign */
    signIn: (context, router) => {
      firebase.auth().languageCode = 'ja';
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then((result) => {
        context.commit('SET_USER', result.user);
        router.push('/');
      }).catch((error) => { console.log(error); });
    },
  },
  modules: {
  },
});
