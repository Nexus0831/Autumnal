<template>
  <div id="doughnut-chart">
    <DoughnutChartComponent
      :chart-data="chartDate"
      :options="chartOption"
      class="chart-component"
    />
    <div class="total-container">
      <Span class="total-count">
        {{ total }}
      </Span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ChartData, ChartOptions } from 'chart.js';
import { counter } from '@/interface/interface';
import DoughnutChartComponent from '@/components/DoughnutChartComponent.vue';

@Component({
  components: { DoughnutChartComponent },
})
export default class DoughnutChart extends Vue {
  // @Prop() private items!: string;
  private items = [
    {
      key: 1,
      name: 'アイテム1',
      backgroundColor: '#2196f3',
      textColor: '#ffffff',
      count: 5,
    },
    {
      key: 2,
      name: 'アイテム2',
      backgroundColor: '#ffeb3b',
      textColor: '#000000DE',
      count: 12,
    },
    {
      key: 3,
      name: 'アイテム3',
      backgroundColor: '#4caf50',
      textColor: '#000000DE',
      count: 99,
    },
    {
      key: 4,
      name: 'アイテム4',
      backgroundColor: '#9c27b0',
      textColor: '#ffffff',
      count: 89,
    },
    {
      key: 5,
      name: 'アイテム5',
      backgroundColor: '#e91e63',
      textColor: '#ffffff',
      count: 12,
    },
    {
      key: 6,
      // name: 'アイテム名が長すぎるとどうなるのか実験するためのアイテム名',
      name: 'item 6',
      backgroundColor: '#546e7a',
      textColor: '#ffffff',
      count: 9,
    },
  ];

  private data:number[] = [];

  private colors:string[] = [];

  private names:string[] = [];

  private total = 0;

  created() {
    this.items.forEach((e) => {
      this.data.push(e.count);
      this.colors.push(e.backgroundColor);
      this.names.push(e.name);
      this.total += e.count;
    });
  }

  chartDate: ChartData = {
    labels: this.names,
    datasets: [
      {
        type: 'doughnut',
        label: '',
        data: this.data,
        backgroundColor: this.colors,
        borderColor: 'rgba(0, 0, 0, 0)',
        // hoverOffset: 4,
      },
    ],
  };

  chartOption: ChartOptions = {
    responsive: true,
  }
}

</script>

<style lang="stylus" scoped>
  #doughnut-chart
    width 100%
    height 100%
    color #FFFFFF
    display flex
    align-items center
    justify-content center
    /*z-index 999*/
    /*background-color #FFFFFF*/

    .chart-component
      width 100%
      z-index 888
      position relative

    .total-container
      /*display flex*/
      position absolute
      z-index 999

      .total-count
        font-weight 500
        font-size 64px
</style>
