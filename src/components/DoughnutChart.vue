<template>
  <div id="doughnut-chart">
    <DoughnutChartComponent
      :chart-data="chartDate"
      :options="chartOption"
    />
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
      count: 999,
    },
  ];

  private datas:number[] = [];

  private colors:string[] = [];

  private names:string[] = [];

  created() {
    this.items.forEach((e) => {
      this.datas.push(e.count);
      this.colors.push(e.backgroundColor);
      this.names.push(e.name);
    });
  }

  chartDate: ChartData = {
    labels: this.names,
    datasets: [
      {
        type: 'doughnut',
        label: '',
        data: this.datas,
        backgroundColor: this.colors,
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
    width 800px
    height 800px
    background-color #FFFFFF
</style>
