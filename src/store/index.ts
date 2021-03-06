import Vue from 'vue';
import Vuex from 'vuex';
import colors from '@/assets/colors';
import { Group, Counter, CountRecord } from '@/interface/interface';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    groups: [],
    group: {
      key: '',
      groupName: '',
      detail: '',
      lastUpdate: '',
      counters: [],
      records: [],
    },
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
      backgroundColor: '',
      textColor: '',
      validate: true,
    },
    alertId: '',
    counterAlertId: '',
    user: {
      uid: '',
    },
    isSignIn: false,
    isProcessing: false,
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
    SET_COUNTER_CREATE_FIELDS_BACK_GROUND_COLOR: (state, backgroundColor) => {
      state.counterCreateFields.backgroundColor = backgroundColor;
    },
    SET_COUNTER_CREATE_FIELDS_TEXT_COLOR: (state, textColor) => {
      state.counterCreateFields.textColor = textColor;
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
    SET_IS_PROCESSING: (state, isProcessing) => {
      state.isProcessing = isProcessing;
    },
  },
  actions: {
    // count画面にURLに直接アクセスした際にもデータを表示できるようにする
    groupRead: (context, key) => {
      if (context.state.user.uid !== '') {
        firebase.database().ref(`/users/${context.state.user.uid}/groups/${key}`)
          .once('value').then((snapshot) => {
            const counters:Record<string, unknown>[] = [];
            const records:Record<string, unknown>[] = [];

            if (typeof snapshot.val().counters !== 'undefined') {
              const cos = Object.entries(snapshot.val().counters)
                .map(([id, value]) => ({ key: id, value }));

              cos.forEach((counter: any) => {
                counters.push({ key: counter.key, ...counter.value });
              });
            }

            if (typeof snapshot.val().records !== 'undefined') {
              const rec = Object.entries(snapshot.val().records)
                .map(([id, value]) => ({ key: id, value }));

              rec.forEach((record: any) => {
                records.push({ key: record.key, ...record.value });
              });
            }

            const group = {
              key: snapshot.key,
              groupName: snapshot.val().groupName,
              detail: snapshot.val().detail,
              lastUpdate: snapshot.val().lastUpdate,
              counters,
              records,
            };
            context.commit('SET_GROUP', group);
          });
      }
    },
    groupsRead: (context) => {
      firebase.database().ref(`/users/${context.state.user.uid}/groups`)
        .once('value').then((snapshot) => {
          const groups: Record<string, unknown>[] = [];

          snapshot.forEach((item: any) => {
            groups.push({
              key: item.key,
              groupName: item.val().groupName,
              detail: item.val().detail,
              lastUpdate: item.val().lastUpdate,
            });
          });

          context.commit('SET_GROUPS', groups);
        })
        .catch(() => {
          context.commit('SET_GROUPS', []);
        });
    },
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
            context.dispatch('groupsRead').then();
          });
      } else {
        context.commit('SET_GROUP_CREATE_FIELDS_VALIDATE', false);
      }
    },
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
          context.dispatch('groupsRead').then();
        });
      } else {
        context.commit('SET_GROUP_CREATE_FIELDS_VALIDATE', false);
      }
    },
    groupDelete: (context, key) => {
      firebase.database().ref(`/users/${context.state.user.uid}/groups/${key}`).remove().then(() => {
        context.dispatch('groupsRead').then();
      });
    },
    /* eslint-enable no-param-reassign */
    groupSubmit: (context) => {
      if (context.state.groupCreateFields.key === '') {
        context.dispatch('groupCreate').then();
      } else {
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
    counterCreate: (context, key) => {
      if (context.state.counterCreateFields.itemName !== '') {
        let counterBackgroundColor = '';
        let counterTextColor = '';
        if (context.state.counterCreateFields.backgroundColor === '') {
          let colorList = colors;

          context.state.group.counters.forEach((item: any) => {
            colorList = colorList.filter((c) => c.backgroundColor !== item.backgroundColor);
          });

          const colorSet = colorList[(Math.floor(Math.random() * colorList.length))];
          counterBackgroundColor = colorSet.backgroundColor;
          counterTextColor = colorSet.textColor;
        } else {
          counterBackgroundColor = context.state.counterCreateFields.backgroundColor;
          counterTextColor = context.state.counterCreateFields.textColor;
        }

        const data: Record<string, unknown> = {
          name: context.state.counterCreateFields.itemName,
          backgroundColor: counterBackgroundColor,
          textColor: counterTextColor,
          count: 0,
          isGraphic: true,
        };

        firebase.database().ref(`/users/${context.state.user.uid}/groups/${key}/counters`).push().update(data)
          .then(() => {
            context.commit('SET_IS_COUNTER_DIALOG_OPEN', false);
            context.dispatch('counterFieldsClear').then();
            context.dispatch('groupRead', key).then();
          });
      } else {
        context.commit('SET_COUNTER_CREATE_FIELDS_VALIDATE', false);
      }
    },
    /* eslint-disable no-param-reassign */
    counterUpdate: (context, keys) => {
      if (context.state.counterCreateFields.itemName !== '') {
        firebase.database().ref(`/users/${context.state.user.uid}/groups/${keys.groupKey}/counters/${keys.counterKey}`)
          .update({
            name: context.state.counterCreateFields.itemName,
            backgroundColor: context.state.counterCreateFields.backgroundColor,
            textColor: context.state.counterCreateFields.textColor,
          }).then(() => {
            context.commit('SET_IS_COUNTER_DIALOG_OPEN', false);
            context.dispatch('counterFieldsClear').then();
            context.dispatch('groupRead', keys.groupKey).then();
          });
      } else {
        context.commit('SET_COUNTER_CREATE_FIELDS_VALIDATE', false);
      }
    },
    counterDelete: async (context, keys) => {
      const records: CountRecord[] = context.state.group.records
        .filter((r: any) => r.counterKey === keys.counterKey);
      await firebase.database().ref(`/users/${context.state.user.uid}/groups/${keys.groupKey}/counters/${keys.counterKey}`)
        .remove().then();
      await records.forEach((record: CountRecord) => {
        firebase.database().ref(`/users/${context.state.user.uid}/groups/${keys.groupKey}/records/${record.key}`)
          .remove().then();
      });
      context.dispatch('groupRead', keys.groupKey).then();
    },
    /* eslint-enable no-param-reassign */
    counterSubmit: (context, key) => {
      if (context.state.counterCreateFields.key === '') {
        context.dispatch('counterCreate', key).then();
      } else {
        context.dispatch('counterUpdate', { groupKey: key, counterKey: context.state.counterCreateFields.key }).then();
      }
    },
    counterFieldsClear: (context) => {
      context.commit('SET_COUNTER_CREATE_FIELDS_KEY', '');
      context.commit('SET_COUNTER_CREATE_FIELDS_ITEM_NAME', '');
      context.commit('SET_COUNTER_CREATE_FIELDS_BACK_GROUND_COLOR', '');
      context.commit('SET_COUNTER_CREATE_FIELDS_TEXT_COLOR', '');
      context.commit('SET_COUNTER_CREATE_FIELDS_VALIDATE', true);
    },
    /* eslint-disable no-param-reassign */
    addOnceCount: async (context, keys) => {
      // 対象のカウントを検索
      context.commit('SET_IS_PROCESSING', true);
      const counter: Counter = context.state.group.counters
        .filter((e: any) => e.key === keys.counterKey)[0];
      // データベースのカウンターのカウントを更新
      await firebase.database().ref(`/users/${context.state.user.uid}/groups/${keys.groupKey}/counters/${keys.counterKey}`)
        .update({
          count: counter.count + 1,
        }).then(() => {
          context.dispatch('groupRead', keys.groupKey).then();
        });

      // 対象のレコードを検索
      // レコードが存在するか検索
      const nowDate = new Date().toLocaleDateString('ja-JP');
      const record: CountRecord = context.state.group.records
        .filter((e: any) => e.counterKey === keys.counterKey && e.date === nowDate)[0];
      // console.log(record);
      if (record === undefined) {
        const data: Record<string, unknown> = {
          date: nowDate,
          counterKey: counter.key,
          count: 1,
        };
        // ない場合は作成
        await firebase.database().ref(`/users/${context.state.user.uid}/groups/${keys.groupKey}/records`)
          .push().update(data)
          .then(() => {
            context.dispatch('groupRead', keys.groupKey).then(() => {
              context.commit('SET_IS_PROCESSING', false);
            });
          });
      } else {
        // ある場合は更新
        await firebase.database().ref(`/users/${context.state.user.uid}/groups/${keys.groupKey}/records/${record.key}`)
          .update({
            count: record.count + 1,
          }).then(() => {
            context.dispatch('groupRead', keys.groupKey).then(() => {
              context.commit('SET_IS_PROCESSING', false);
            });
          });
      }
    },
    oneLessCount: async (context, keys) => {
      context.commit('SET_IS_PROCESSING', true);
      const counter: Counter = context.state.group.counters
        .filter((e: any) => e.key === keys.counterKey)[0];
      if (counter.count > 0) {
        await firebase.database().ref(`/users/${context.state.user.uid}/groups/${keys.groupKey}/counters/${keys.counterKey}`)
          .update({
            count: counter.count - 1,
          }).then(() => {
            context.dispatch('groupRead', keys.groupKey).then();
          });
      }
      // 対象のレコードを検索
      const nowDate = new Date().toLocaleDateString('ja-JP');
      const record: CountRecord = context.state.group.records
        .filter((e: any) => e.counterKey === keys.counterKey && e.date === nowDate)[0];
      // レコードが存在するか検索
      // TODO: マイナス時に0になったらレコードを削除する。
      if (record !== undefined && record.count - 1 > 0) {
        await firebase.database().ref(`/users/${context.state.user.uid}/groups/${keys.groupKey}/records/${record.key}`)
          .update({
            count: record.count - 1,
          }).then(() => {
            context.dispatch('groupRead', keys.groupKey).then();
          });
      } else if (record !== undefined && record.count - 1 <= 0) {
        await firebase.database().ref(`/users/${context.state.user.uid}/groups/${keys.groupKey}/records/${record.key}`)
          .remove().then(() => {
            context.dispatch('groupRead', keys.groupKey).then();
          });
      }
      context.commit('SET_IS_PROCESSING', false);
    },
    offGraphic: (context, keys) => {
      firebase.database().ref(`/users/${context.state.user.uid}/groups/${keys.groupKey}/counters/${keys.counterKey}`)
        .update({
          isGraphic: false,
        }).then(() => {
          context.dispatch('groupRead', keys.groupKey).then();
        });
    },
    onGraphic: (context, keys) => {
      firebase.database().ref(`/users/${context.state.user.uid}/groups/${keys.groupKey}/counters/${keys.counterKey}`)
        .update({
          isGraphic: true,
        }).then(() => {
          context.dispatch('groupRead', keys.groupKey).then();
        });
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
