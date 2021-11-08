<template>
  <button
    class="ccb"
    @click="(event) => clickAction(event, rippleColor)"
    @click.capture.stop="$emit('click-action')"
    @mouseover="hoverIn"
    @mouseout="hoverOut"
    v-bind:style="{ backgroundColor: nowBackgroundColor }"
  >
    <span class="icon-container">
      <i class="material-icons fab-icon">{{ icon }}</i>
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import rippleEffect from '@/functions/ripple';

@Component({
  methods: {
    clickAction: (event, rippleColor) => {
      rippleEffect(event, rippleColor);
    },
  },
})
export default class CreateCounterButton extends Vue {
  @Prop() private icon!: string;

  @Prop() private rippleColor!: string;

  @Prop() private hoverColor!: string;

  @Prop() private backgroundColor!: string;

  private nowBackgroundColor = 'transparent';

  mounted() {
    this.nowBackgroundColor = this.backgroundColor;
  }

  hoverIn() {
    this.nowBackgroundColor = this.hoverColor;
  }

  hoverOut() {
    this.nowBackgroundColor = this.backgroundColor;
  }
}
</script>

<style lang="stylus" scoped>
.ccb
  /*--- style ---*/
  /*-- style --*/
  top 0
  bottom 0
  left 0
  right 0
  position absolute
  width 100%
  padding 0
  border 0
  cursor pointer
  outline none
  overflow hidden
  user-select none
  text-decoration none
  font-size 0.875em
  box-sizing border-box
  min-width 0px
  min-height 36px
  transition background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms
  box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12)
  font-weight 500
  line-height 1.5
  border-radius 5px
  letter-spacing 0.02857em
  text-transform uppercase
  /*--- end ---*/

  /*--- layout ---*/
  display inline-flex
  align-items center
  vertical-align middle
  justify-content center
  /*--- end *---*/

  .icon-container
    width 100%
    display inherit
    align-items inherit
    justify-content inherit

  .fab-icon
    /*--- style ---*/
    width 1em
    height 1em
    overflow hidden
    font-size 56px
    user-select none
    flex-shrink 0
    /*--- end ---*/
</style>
