<template>
  <div id="bar-chart">
    <BarChartComponent
      :chart-data="chartDate"
      :options="chartOption"
      class="bar-component"
    />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import { ChartData, ChartOptions } from 'chart.js';
import { Counter } from '@/interface/interface';
import BarChartComponent from '@/components/BarChartComponent.vue';

  @Component({
    components: { BarChartComponent },
  })
export default class DoughnutChart extends Vue {
    private data:number[] = [];

    private colors:string[] = [];

    private names:string[] = [];

    chartDate: ChartData = {};

    dataClean() {
      this.names = [];
      this.data = [];
      this.colors = [];
    }

    dataIsSet() {
      this.$store.state.group.counters.forEach((e: Counter) => {
        this.data.push(e.count);
        this.colors.push(e.backgroundColor);
        this.names.push(e.name);
      });
      // this.chartDate.labels = this.names;
      this.chartDate = {
        labels: this.names,
        datasets: [
          {
            type: 'bar',
            label: '',
            data: this.data,
            backgroundColor: this.colors,
            borderColor: this.colors,
            borderWidth: 2,
            barPercentage: 0.5,
            // hoverOffset: 4,
          },
        ],
      };
    }

    created() {
      this.$store.watch(
        (state) => state.group,
        () => {
          this.dataClean();
          this.dataIsSet();
        },
      );
    }

    chartOption: ChartOptions = {
      responsive: true,
      legend: {
        labels: {
          fontColor: 'rgb(255, 255, 255)',
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: 'white',
          },
          gridLines: {
            color: 'rgba(255, 255, 255, 0.5)',
            drawBorder: false,
          },
        }],
        xAxes: [{
          gridLines: {
            display: false,
          },
        }],
      },
    }
}

</script>

<style lang="stylus" scoped>
  #bar-chart
    width 100%
    height 100%
    color #FFFFFF
    display flex
    align-items center
    justify-content center
    /*z-index 999*/
    /*background-color #FFFFFF*/

    .bar-component
      width 100%
      z-index 888
      position relative
</style>
