<template>
  <div id="icon">
    <div
      class="icon-graphy"
      @click.stop="(event) => clickEffect(event, rippleColor)"
      @click.capture.stop="$emit('click-action')"
      v-bind:style="{ color: color}"
    >
      <i class="material-icons">{{ icon }}</i>
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

  private color = 'inherit';

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // hoverIn() {
  //   this.color = this.hoverColor;
  // }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // hoverOut() {
  //   this.color = 'inherit';
  // }
}
</script>

<style scoped lang="stylus">

#icon
  user-select none
  border-radius 50%
  transition all 0.3s
  height 40px
  width 40px

.icon-graphy
  /*--- attr ---*/
  /*--- end ---*/

  /*--- style ---*/
  border-radius 50%
  height 100%
  width 100%
  overflow hidden
  position relative
  transition  all 0.2s
  /*--- end ---*/

  /*--- layout ---*/
  display flex
  justify-content center
  align-items center
  /*--- end ---*/

  &:hover
    cursor pointer
    transform scale(1.5, 1.5)
</style>
