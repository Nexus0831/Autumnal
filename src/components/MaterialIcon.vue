<template>
  <div id="icon" :style="{ backgroundColor: color }">
    <div
      class="icon-graphy"
      @click.stop="(event) => clickEffect(event, rippleColor)"
      @click.capture.stop="$emit('click-action')"
      @mouseover="hoverIn"
      @mouseout="hoverOut"
    >
      <i class="material-icons" :style="{ fontSize: size }">
        {{ icon }}
      </i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import rippleEffect from '@/functions/ripple';

@Component({
  methods: {
    clickEffect(event, rippleColor) {
      rippleEffect(event, rippleColor);
    },
  },
})
export default class MaterialIcon extends Vue {
  @Prop() private icon!: string;

  @Prop() private rippleColor!: string;

  @Prop() private hoverColor!: string;

  @Prop() private size!: string;

  private color = 'inherit';

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hoverIn() {
    this.color = this.hoverColor;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hoverOut() {
    this.color = 'inherit';
  }
}
</script>

<style scoped lang="stylus">

#icon
  user-select none
  border-radius 50%
  padding 3px
  display inline-flex
  transition all 0.3s
  justify-content center
  align-items center

.icon-graphy
  /*--- attr ---*/
  /*--- end ---*/

  /*--- style ---*/
  border-radius 50%
  height 100%
  width 100%
  overflow hidden
  position relative
  /*--- end ---*/

  /*--- layout ---*/
  display flex
  justify-content center
  align-items center
  /*--- end ---*/

  &:hover
    cursor pointer

.material-icons
  @media (max-width 400px)
    font-size 20px
  @media (min-width 400px)
    font-size 24px
</style>
