<template>
  <button
    class="text-button"
    @click.stop="(event) => clickAction(event, rippleColor)"
    @click.capture.stop="$emit('click-action')"
    @mouseover="hoverIn"
    @mouseout="hoverOut"
    v-bind:style="{ backgroundColor: backgroundColor}"
  >
    {{ buttonText }}
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import rippleEffect from '@/functions/ripple';

@Component({
  methods: {
    clickAction: (event, rippleColor) => {
      rippleEffect(event, rippleColor);
    },
  },
})
export default class Button extends Vue {
  @Prop() private buttonText!: string;

  @Prop() private rippleColor!: string;

  @Prop() private hoverColor!: string;

  private backgroundColor = 'transparent';

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hoverIn() {
    this.backgroundColor = this.hoverColor;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hoverOut() {
    this.backgroundColor = 'transparent';
  }
}

</script>

<style lang="stylus" scoped>
.text-button
  color #fff
  background-color transparent
  border 0
  outline 0 !important
  font-weight 500
  line-height 1.5
  letter-spacing: 0.02857em;
  padding 8px 16px
  border-radius 4
  min-height 36px
  min-width 64px
  transition all 0.3s
  overflow hidden
  position relative
  user-select none

  &:hover
    cursor pointer
</style>
