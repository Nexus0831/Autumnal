<template>
  <div id="create-container">
    <div
      class="create-button"
      @click="rippleEvent"
      @click.capture="$emit('click-action')"
    >
      <i class="material-icons">add</i>
      Create New MindMap
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import rippleEffect from '@/functions/ripple';

@Component({
  methods: {
    rippleEvent: (event) => {
      rippleEffect(event, 'rgba(255, 255, 255, 0.5)');
    },
  },
})
export default class CreateButton extends Vue {
}
</script>

<style lang="stylus" scoped>
  #create-container
    /*--- position ---*/
    grid-row 1 / 2
    grid-column 1 / 2
    /*--- end ---*/

    /*--- layout ---*/
    display flex
    justify-content center
    /*--- end ---*/

  .create-button
    /*--- style ---*/
    font-size 20px
    font-weight 400
    height 40px
    width 260px
    border-radius 4px
    transition background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms
    text-transform uppercase
    overflow hidden
    position relative
    user-select none
    z-index 10
    /*--- end ---*/

    /*--- layout ---*/
    display flex
    justify-content center
    align-items center
    /*--- end ---*/

    &:hover
      background-color rgba(255, 255, 255, 0.08)
      cursor pointer
</style>
