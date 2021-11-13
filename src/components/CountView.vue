<template>
  <div id="count">
    <div class="group-name-area">
      {{ group.groupName }}
    </div>
    <div class="counter-area card-texture">
      <div class="counter-container">
        <div class="counter-box">
          <CreateCounterButton
            icon="add"
            style="color: #FFF"
            rippleColor="rgba(255, 255, 255, 0.2)"
            hoverColor="#303030"
            backgroundColor="#424242"
            @click-action="dialogOpen"
          />
        </div>
        <template v-for="counter in group.counters">
          <div :key="counter.key" class="counter-box">
            <Counter
              :key="counter.key"
              :key-number="counter.key"
              :name="counter.name"
              :background-color="counter.backgroundColor"
              :text-color="counter.textColor"
              :count="counter.count"
              :is-graphic="counter.isGraphic"
              @update-action="dialogEditOpen"
              :style="{ pointerEvents: isProcessing ? 'none' : 'auto' }"
            />
          </div>
          <transition name="alert" :key="counter.key">
            <Alert
              :title="`カウンター「${counter.name}」を削除しますか？`"
              :message="`カウンターを削除すると対応したレコードも削除され一度削除すると復元はできません`"
              v-if="counterAlertId === counter.key"
              @alert-action="deleteAction(counter.key)"
              @alert-close="alertClose"
            />
          </transition>
        </template>
      </div>
    </div>
    <div class="graph-area card-texture">
      <DoughnutChart
        class="doughnut-chart"
      />
      <BarChart
        class="bar-chart"
      />
      <RecordTable
        class="record-table"
        :records="group.records"
      />
    </div>
    <transition name="fade">
      <CounterDialogForm
        v-if="isCounterDialogOpen"
        :validate="counterCreateFields.validate"
        @submit-action="submitAction"
        @dialog-close="dialogClose"
        :textValue="textValue"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import CreateCounterButton from '@/components/CreateCounterButton.vue';
import Counter from '@/components/Counter.vue';
import { Counter as counter } from '@/interface/interface';
import Alert from '@/components/Alert.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';
import BarChart from '@/components/BarChart.vue';
import CounterDialogForm from '@/components/CounterDialogForm.vue';
import RecordTable from '@/components/RecordTable.vue';

@Component({
  components: {
    RecordTable,
    CounterDialogForm,
    BarChart,
    DoughnutChart,
    Alert,
    Counter,
    CreateCounterButton,
  },
  computed: {
    ...mapState([
      'group',
      'groups',
      'isCounterDialogOpen',
      'counterCreateFields',
      'counterAlertId',
      'isProcessing',
    ]),
  },
  methods: {
    ...mapActions([
      'counterDelete',
    ]),
  },
})
export default class CountView extends Vue {
  textValue = '';

  mounted() {
    this.$store.dispatch('groupRead', this.$route.params.key);

    this.$store.watch(
      (state) => state.user.uid,
      () => {
        this.$store.dispatch('groupRead', this.$route.params.key);
      },
    );
  }

  submitAction() {
    this.$store.dispatch('counterSubmit', this.$route.params.key);
  }

  deleteAction(key: string) {
    this.$store.dispatch('counterDelete', { groupKey: this.$route.params.key, counterKey: key });
  }

  dialogOpen() {
    this.textValue = '';
    this.$store.commit('SET_IS_COUNTER_DIALOG_OPEN', true);
  }

  dialogClose() {
    this.$store.commit('SET_IS_COUNTER_DIALOG_OPEN', false);
    this.$store.dispatch('counterFieldsClear');
  }

  dialogEditOpen(key: string) {
    const counterValues = this.$store.state.group.counters.filter(
      (e: counter) => e.key === key,
    )[0];
    this.textValue = counterValues.name;

    this.$store.commit('SET_COUNTER_CREATE_FIELDS_KEY', key);
    this.$store.commit('SET_COUNTER_CREATE_FIELDS_BACK_GROUND_COLOR', counterValues.backgroundColor);
    this.$store.commit('SET_COUNTER_CREATE_FIELDS_TEXT_COLOR', counterValues.textColor);
    this.$store.commit('SET_IS_COUNTER_DIALOG_OPEN', true);
  }

  alertClose() {
    this.$store.commit('SET_COUNTER_ALERT_ID', '');
  }
}
</script>

<style scoped lang="stylus">
#count
  display grid

  grid-template-rows 28px 12px 1fr 12px

  .group-name-area
    display flex
    align-items center
    justify-content center
    color #FFFFFF
    font-weight 500
    font-size 28px
    grid-row 1 / 2

  .counter-area
    display grid
    grid-template-rows 12px 1fr
    grid-template-columns 12px 1fr 12px
    grid-row 3 / 4

    .counter-container
      display grid
      grid-row 2 / 3
      grid-column 2 / 3
      width 100%

      /* TODO: ここでカウンターの要素数を変更 */
      @media (max-width 619px)
        grid-template-columns: repeat(auto-fill, @width / 3);
      @media (min-width 619px)
        grid-template-columns: repeat(auto-fill, @width / 5);
      @media (min-width 1024px)
        grid-template-columns: repeat(auto-fill, @width / 8);
      @media (min-width 1400px)
        grid-template-columns: repeat(auto-fill, @width / 12);

      .counter-box
        width 96%
        padding-top 96%
        margin-bottom 12px
        tap-highlight-color: rgba(0, 0, 0, 0);
        position relative

  .graph-area
    display grid
    @media (max-width 619px)
      grid-template-rows 8px 1fr 8px 1fr 8px auto 8px
      grid-template-columns 2% 96% 2%
    @media (min-width 619px)
      grid-template-rows 12px 1fr 12px auto 12px
      grid-template-columns 2% 47% 2% 47% 2%

    grid-row 5 / 6

    .doughnut-chart
      grid-row 2 / 3
      grid-column 2 / 3

    .bar-chart
      @media (max-width 619px)
        grid-row 4 / 5
        grid-column 2 / 3
      @media (min-width 619px)
        grid-row 2 / 3
        grid-column 4 / 5

    .record-table
      @media (max-width 619px)
        grid-row 6 / 7
        grid-column 2 / 3
      @media (min-width 619px)
        grid-row 4 / 5
        grid-column 2 / 5

  .card-texture
    background-color #424242
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 2px 1px -1px rgba(0, 0, 0, 0.12)
    border-radius 4px
    overflow hidden
    position relative
</style>
