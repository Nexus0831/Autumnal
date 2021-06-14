<template>
  <div id="count">
<!--    test{{ this.$route.params.id }}-->
    <div class="counter-area card-texture">
      <div class="counter-container">
        <template v-for="counter in counters">
          <Counter
            :key="counter.id"
            :key-number="counter.id"
            :name="counter.name"
            :background-color="counter.color"
            :count="counter.count"
          />
        </template>
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
import Counter from '@/components/Counter.vue';

@Component({
  components: { Counter, CreateCounterButton },
})
export default class CountView extends Vue {
  private counters = [
    {
      id: 1,
      name: 'アイテム1',
      color: '#2196f3',
      count: 5,
    },
    {
      id: 2,
      name: 'アイテム2',
      color: '#ffeb3b',
      count: 12,
    },
    {
      id: 3,
      name: 'アイテム3',
      color: '#4caf50',
      count: 999,
    },
    {
      id: 4,
      name: 'アイテム4',
      color: '#9c27b0',
      count: 89,
    },
    {
      id: 5,
      name: 'アイテム5',
      color: '#e91e63',
      count: 0,
    },
  ]
}
</script>

<style scoped lang="stylus">
#count
  display grid
  /*height 100%*/
  /*grid-template-columns 1fr 12px 30%*/

  @media (max-width 619px)
    grid-template-rows 1fr 12px 480px
  @media (min-width 619px)
    grid-template-rows 1fr 12px 240px
  @media (min-width 1024px)
    grid-template-columns 1fr 12px 30%

  .counter-area
    display grid
    grid-template-rows 12px 1fr 12px
    grid-template-columns 12px 1fr 12px

    @media (max-width 619px)
      grid-row 1 / 2
    @media (min-width 619px)
      grid-row 1 / 2
    @media (min-width 1024px)
      grid-column 1 / 2

    .counter-container
      display grid
      grid-row 2 / 3
      grid-column 2 / 3
      grid-template-columns: repeat(auto-fill, minmax(124px, 124px));
      /*grid-template-rows: repeat(auto-fill, minmax(112px, 112px));*/
      /* flex-wrap wrap*/
      gap 12px

  .graph-area
    display grid
    grid-template-rows 12px 1fr 12px
    grid-template-columns 12px 1fr 12px

    @media (max-width 619px)
      grid-row 3 / 4
    @media (min-width 619px)
      grid-row 3 / 4
    @media (min-width 1024px)
      grid-row 1 / 2
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
