<template>
  <div id="home">
    <CreateButton @click-action="dialogOpen"/>
    <div id="cards">
      <template v-for="item in groups">
        <Card
          :id="item.key"
          :key="item.key"
          :keyNumber="item.key"
          :title="item.groupName"
          :body="item.detail"
          :date="item.lastUpdate"
          @update-action="dialogEditOpen"
        />
<!--        <transition name="alert" :key="item.key">-->
<!--          <Alert-->
<!--            :title="item.title"-->
<!--            v-if="alertId === item.key"-->
<!--            @alert-action="mindMapDelete(item.key)"-->
<!--          />-->
<!--        </transition>-->
      </template>
    </div>
    <transition name="fade">
      <DialogForm
        v-if="isDialogOpen"
        formTitle="Create Group"
        validMessage="Heyブラザー！TitleとBodyが空だぜ！"
        :validate="groupCreateFields.validate"
        :fields="fields"
        @submit-action="groupSubmit"
        @dialog-close="dialogClose"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import Card from './Card.vue';
import CreateButton from './CreateButton.vue';
import Alert from './Alert.vue';
import DialogForm from './DialogForm.vue';

  @Component({
    components: {
      DialogForm,
      Card,
      CreateButton,
    },
    computed: {
      ...mapState([
        'groups',
        'groupCreateFields',
        'isDialogOpen',
      ]),
    },
    methods: {
      ...mapActions([
        'groupSubmit',
      ]),
    },
  })
export default class HomeView extends Vue {
    fields = [
      {
        label: 'groupName',
        value: '',
        changeAction: (groupName: string) => {
          this.$store.commit('SET_GROUP_CREATE_FIELDS_GROUP_NAME', groupName);
        },
      },
      {
        label: 'detail',
        value: '',
        changeAction: (detail: string) => {
          this.$store.commit('SET_GROUP_CREATE_FIELDS_DETAIL', detail);
        },
      },
    ];
    //   mounted() {
    //     this.$store.dispatch('mindMapRead').then();
    //     this.$store.watch(
    //       state => state.user.uid,
    //       () => {
    //         this.$store.dispatch('mindMapRead').then();
    //       },
    //     );
    //   }

    dialogOpen() {
      this.fields.forEach((e) => {
        e.value = '';
      });
      this.$store.commit('SET_IS_DIALOG_OPEN', true);
    }

    dialogEditOpen(key: string) {
      const group = this.$store.getters.getGroup(key);
      this.fields[0].value = group.groupName;
      this.fields[1].value = group.detail;
      this.$store.commit('SET_GROUP_CREATE_FIELDS_KEY', key);
      this.$store.commit('SET_IS_DIALOG_OPEN', true);
    }

    dialogClose() {
      this.$store.commit('SET_IS_DIALOG_OPEN', false);
      this.$store.dispatch('groupFieldsClear');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  #home
    display grid
    grid-template-rows 52px 1fr
    grid-template-columns 1fr
  #cards
    display grid
    grid-row 2 / 3
    grid-column 1 / 2
    @media (max-width 619px)
      grid-template-columns: 1fr;
      grid-row-gap: 20px;
    @media (min-width 619px)
      grid-template-columns: 49% 49%;
      grid-row-gap: 16px;
      grid-column-gap: 2%;
    @media (min-width 1024px)
      grid-template-columns: 32% 32% 32%;
      grid-row-gap: 20px;
      grid-column-gap: 2%;
</style>
