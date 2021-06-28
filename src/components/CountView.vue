<template>
  <div id="count">
<!--    test{{ this.$route.params.key }}-->
    <div class="counter-area card-texture">
      <div class="counter-container">
        <template v-for="counter in group.counters">
          <Counter
            :key="counter.key"
            :key-number="counter.key"
            :name="counter.name"
            :background-color="counter.color"
            :count="counter.count"
            @update-action="dialogEditOpen"
          />
        </template>
        <CreateCounterButton
          icon="add"
          style="color: #FFF"
          rippleColor="rgba(255, 255, 255, 0.2)"
          hoverColor="#303030"
          backgroundColor="#424242"
          @click-action="dialogOpen"
        />
      </div>
    </div>
    <div class="graph-area card-texture">
      ここにはグラフを表示
    </div>
    <transition name="fade">
      <DialogForm
        v-if="isCounterDialogOpen"
        formTitle="Counter"
        validMessage="ItemNameが空です"
        :validate="counterCreateFields.validate"
        :fields="fields"
        @submit-action="submitAction"
        @dialog-close="dialogClose"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CreateCounterButton from '@/components/CreateCounterButton.vue';
import Counter from '@/components/Counter.vue';
import { mapState } from 'vuex';
import DialogForm from '@/components/DialogForm.vue';
// eslint-disable-next-line import/named
import { counter } from '@/interface/interface';

@Component({
  components: {
    DialogForm,
    Counter,
    CreateCounterButton,
  },
  computed: {
    ...mapState([
      'group',
      'isCounterDialogOpen',
      'counterCreateFields',
    ]),
  },
})
export default class CountView extends Vue {
  fields = [
    {
      label: 'ItemName',
      value: '',
      changeAction: (itemName: string) => {
        this.$store.commit('SET_COUNTER_CREATE_FIELDS_ITEM_NAME', itemName);
      },
    },
  ];

  mounted() {
    // groupを読み込み
    this.$store.dispatch('groupRead', this.$route.params.key).then();
  }

  submitAction() {
    this.$store.dispatch('counterSubmit', this.$route.params.key);
  }

  dialogOpen() {
    this.fields.forEach((e) => {
      e.value = '';
    });
    this.$store.commit('SET_IS_COUNTER_DIALOG_OPEN', true);
  }

  dialogClose() {
    this.$store.commit('SET_IS_COUNTER_DIALOG_OPEN', false);
    this.$store.dispatch('counterFieldsClear');
  }

  dialogEditOpen(key: string) {
    this.fields[0].value = this.$store.state.group.counters.filter(
      (e: counter) => e.key === key,
    )[0].name;
    this.$store.commit('SET_COUNTER_CREATE_FIELDS_KEY', key);
    this.$store.commit('SET_IS_COUNTER_DIALOG_OPEN', true);
  }
}
</script>

<style scoped lang="stylus">
#count
  display grid
  /*height 100%*/
  /*grid-template-columns 1fr 12px 30%*/

  @media (max-width 619px)
    grid-template-rows 1fr 12px 480px
  @media (min-width 619px)
    grid-template-rows 1fr 12px 240px
  @media (min-width 1024px)
    grid-template-columns 1fr 12px 30%

  .counter-area
    display grid
    grid-template-rows 12px 1fr 12px
    grid-template-columns 12px 1fr 12px

    @media (max-width 619px)
      grid-row 1 / 2
    @media (min-width 619px)
      grid-row 1 / 2
    @media (min-width 1024px)
      grid-column 1 / 2

    .counter-container
      display grid
      grid-row 2 / 3
      grid-column 2 / 3
      grid-template-columns: repeat(auto-fill, minmax(124px, 124px));
      /*grid-template-rows: repeat(auto-fill, minmax(112px, 112px));*/
      /* flex-wrap wrap*/
      gap 12px

  .graph-area
    display grid
    grid-template-rows 12px 1fr 12px
    grid-template-columns 12px 1fr 12px

    @media (max-width 619px)
      grid-row 3 / 4
    @media (min-width 619px)
      grid-row 3 / 4
    @media (min-width 1024px)
      grid-row 1 / 2
      grid-column 3 / 4

  .card-texture
    background-color #424242
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 2px 1px -1px rgba(0, 0, 0, 0.12)
    border-radius 4px
    overflow hidden
    position relative
</style>
