<template>
  <div id="count">
<!--    test{{ this.$route.params.id }}-->
    <div class="counter-area card-texture">
      <div class="counter-container">
        <CreateCounterButton
          icon="add"
          style="color: #FFF"
          rippleColor="rgba(255, 255, 255, 0.2)"
          hoverColor="#303030"
          backgroundColor="#424242"
        />
      </div>
    </div>
    <div class="graph-area card-texture">
      ここにはグラフを表示
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CreateCounterButton from '@/components/CreateCounterButton.vue';

@Component({
  components: { CreateCounterButton },
})
export default class CountView extends Vue {}
</script>

<style scoped lang="stylus">
#count
  display grid
  height 100%
  grid-template-columns 1fr 24px 30%

  .counter-area
    display grid
    grid-template-rows 12px 1fr 12px
    grid-template-columns 12px 1fr 12px
    grid-column 1 / 2

    .counter-container
      display grid
      grid-row 2 / 3
      grid-column 2 / 3
      grid-row-gap: 12px;
      grid-column-gap: 2%;

  .graph-area
    display grid
    grid-template-rows 12px 1fr 12px
    grid-template-columns 12px 1fr 12px
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
