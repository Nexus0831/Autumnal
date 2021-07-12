<template>
  <button
    class="contained-button"
    @click.stop="(event) => clickAction(event, rippleColor)"
    @click.capture.stop="$emit('click-action')"
    @mouseover="hoverIn"
    @mouseout="hoverOut"
    v-bind:style="{ backgroundColor: nowBackgroundColor }"
  >
    {{ buttonText }}
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
export default class ContainedButton extends Vue {
  @Prop() private buttonText!: string;

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
.contained-button
  overflow hidden
  position relative
  user-select none
  border 0
  outline 0 !important
  margin 8px
  box-shadow 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12)
  padding 8px 16px
  font-size 0.875rem
  min-width 64px
  box-sizing border-box
  min-height 36px
  font-weight 500
  line-height 1.5
  border-radius 4px
  letter-spacing 0.02857em
  text-transform uppercase
  transition all 0.3s

  &:hover
    cursor pointer
</style>
