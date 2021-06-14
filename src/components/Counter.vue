<template>
  <div
    class="counter"
    v-bind:style="{ backgroundColor: backgroundColor }"
  >
    <div class="counter-name">
      {{ name }}
    </div>
    <span class="counter-count">
      {{ count }}
    </span>
    <div class="counter-icons">
      <MaterialIcon
        icon="edit"
        style="color: #FFF"
        rippleColor="rgba(255, 255, 255, 0.5)"
        hoverColor="rgba(255, 255, 255, 0.2)"
      />
      <MaterialIcon
        icon="delete"
        style="color: #B00020"
        rippleColor="rgba(176, 0, 32, 0.5)"
        hoverColor="rgba(176, 0, 32, 0.2)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MaterialIcon from '@/components/MaterialIcon.vue';

@Component({
  components: { MaterialIcon },
})
export default class counter extends Vue {
  @Prop() private name!: string;

  @Prop() private backgroundColor!: string;

  @Prop() private keyNumber!: number;

  @Prop() private count!: number;
}
</script>

<style scoped lang="stylus">
.counter
  /*-- style --*/
  width 124px
  height 124px
  border-radius 5px
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.12)
  /*-- end --*/

  /*-- layout --*/
  display grid
  grid-template-rows 8px 24px 52px 40px
  grid-template-columns 8px 1fr 8px
  /*-- end --*/

  .counter-name
    /*-- style --*/
    color #424242
    font-weight bold
    text-shadow: 1px  1px 0.5px #ffffff,
      -1px  1px 0.5px #ffffff,
      1px -1px 0.5px #ffffff,
      -1px -1px 0.5px #ffffff,
      1px  0px 0.5px #ffffff,
      0px  1px 0.5px #ffffff,
      -1px  0px 0.5px #ffffff,
      0px -1px 0.5px #ffffff
    /*-webkit-text-stroke 0.5px #FFFFFF*/
    /*-- end */

    /*-- layout --*/
    display inline-flex
    align-items center
    vertical-align middle
    justify-content center
    grid-row 2 / 3
    grid-column 2 / 3
    /*-- end --*/

  .counter-count
    /*-- style --*/
    color #424242
    font-weight 500
    font-size 48px
    text-shadow: 1px  1px 0.5px #ffffff,
      -1px  1px 0.5px #ffffff,
      1px -1px 0.5px #ffffff,
      -1px -1px 0.5px #ffffff,
      1px  0px 0.5px #ffffff,
      0px  1px 0.5px #ffffff,
      -1px  0px 0.5px #ffffff,
      0px -1px 0.5px #ffffff
    /*-- end */

    /*-- layout --*/
    display inline-flex
    align-items center
    vertical-align middle
    justify-content center
    grid-row 3 / 4
    grid-column 2 / 3
    /*-- end --*/
  .counter-icons
    /*-- layout --*/
    display inline-flex
    align-items center
    justify-content:space-between
    grid-row 4 / 5
    grid-column 2 / 3
    /*-- end --*/
</style>
