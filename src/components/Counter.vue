<template>
  <div
    class="counter"
    v-bind:style="{ backgroundColor: backgroundColor, color: textColor }"
    @click.stop="(event) => rippleEvent(event, textColor)"
    @click="addAction"
  >
    <div class="counter-name-container">
      <span class="counter-name">
        {{ name }}
      </span>
    </div>
    <span class="counter-count">
      {{ count }}
    </span>
    <div class="counter-icons">
      <MaterialIcon
        class="counter-icon"
        title="カウントを-1"
        icon="remove"
        v-bind:style="{ color: textColor }"
        rippleColor="rgba(255, 255, 255, 0.5)"
        :hoverColor="[ textColor === '#ffffff' ? '#000000DE' : '#ffffff' ]"
        @click-action="minusAction"
      />
      <MaterialIcon
        class="counter-icon"
        title="カウンター情報を編集"
        icon="edit"
        v-bind:style="{ color: textColor }"
        rippleColor="rgba(255, 255, 255, 0.5)"
        :hoverColor="[ textColor === '#ffffff' ? '#000000DE' : '#ffffff' ]"
        @click-action="editAction"
      />
      <template v-if="isGraphic">
        <MaterialIcon
          class="counter-icon"
          title="グラフの集計対象から外す(現在は集計対象)"
          icon="visibility"
          v-bind:style="{ color: textColor }"
          rippleColor="rgba(255, 255, 255, 0.5)"
          :hoverColor="[ textColor === '#ffffff' ? '#000000DE' : '#ffffff' ]"
          @click-action="offGraphic"
        />
      </template>
      <template v-else>
        <MaterialIcon
          class="counter-icon"
          title="グラフの集計対象に加える(現在は集計外)"
          icon="visibility_off"
          v-bind:style="{ color: textColor }"
          rippleColor="rgba(255, 255, 255, 0.5)"
          :hoverColor="[ textColor === '#ffffff' ? '#000000DE' : '#ffffff' ]"
          @click-action="onGraphic"
        />
      </template>
      <MaterialIcon
        class="counter-icon"
        title="カウンターを削除"
        icon="delete"
        style="color: #b00020"
        rippleColor="rgba(176, 0, 32, 0.5)"
        hoverColor="#e33353"
        @click-action="alertOpen"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MaterialIcon from '@/components/MaterialIcon.vue';
import rippleEffect from '@/functions/ripple';
import { mapState } from 'vuex';

@Component({
  components: { MaterialIcon },
  computed: {
    ...mapState([
      'isProcessing',
    ]),
  },
  methods: {
    rippleEvent: (event, color) => {
      rippleEffect(event, color);
    },
  },
})
export default class counter extends Vue {
  @Prop() private name!: string;

  @Prop() private backgroundColor!: string;

  @Prop() private textColor!: string;

  @Prop() private keyNumber!: number;

  @Prop() private count!: number;

  @Prop() private isGraphic!: boolean;

  addAction() {
    this.$store.dispatch(
      'addOnceCount',
      { groupKey: this.$route.params.key, counterKey: this.keyNumber },
    );
  }

  editAction() {
    this.$emit('update-action', this.keyNumber);
  }

  offGraphic() {
    this.$store.dispatch(
      'offGraphic',
      { groupKey: this.$route.params.key, counterKey: this.keyNumber },
    );
  }

  onGraphic() {
    this.$store.dispatch(
      'onGraphic',
      { groupKey: this.$route.params.key, counterKey: this.keyNumber },
    );
  }

  alertOpen() {
    this.$store.commit('SET_COUNTER_ALERT_ID', this.keyNumber);
  }

  minusAction() {
    this.$store.dispatch(
      'oneLessCount',
      { groupKey: this.$route.params.key, counterKey: this.keyNumber },
    );
  }
}
</script>

<style scoped lang="stylus">
.counter
  /*-- style --*/
  top 0
  bottom 0
  left 0
  right 0
  position absolute
  width 100%
  border-radius 5px
  outline none
  overflow hidden
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.12)
  /*-- end --*/

  &:hover
    cursor pointer

  &:focus
    tap-highlight-color: rgba(0, 0, 0, 0);

  /*-- layout --*/
  display grid
  grid-template-rows 5% 20% 45% 30%
  grid-template-columns 3% 94% 3%
  /*-- end --*/

  .counter-name-container
    /*-- layout --*/
    display inline-flex
    align-items center
    vertical-align middle
    justify-content center
    grid-row 2 / 3
    grid-column 2 / 3
    max-width 100%
    /*-- end --*/

  .counter-name
    /*-- style --*/
    font-weight bold
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    width 100%
    text-align center

    @media (max-width 619px)
      font-size 14px
    @media (min-width 619px)
      font-size 16px
    @media (min-width 1024px)
      font-size 18px
    /*-- end */

  .counter-count
    /*-- style --*/
    font-weight 500
    @media (max-width 619px)
      font-size 36px
    @media (min-width 619px)
      font-size 42px
    @media (min-width 1024px)
      font-size 48px
    /*-- end */

    /*-- layout --*/
    display inline-flex
    align-items center
    vertical-align middle
    justify-content center
    grid-row 3 / 4
    grid-column 2 / 3
    /*-- end --*/

    &::selection
      background-color transparent

  .counter-icons
    /*-- layout --*/
    display inline-flex
    align-items center
    justify-content:space-between
    grid-row 4 / 5
    grid-column 2 / 3
    /*-- end --*/
    .counter-icon
      @media (max-width 619px)
        width 20% !important
</style>
