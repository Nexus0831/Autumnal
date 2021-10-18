<template>
  <div id="doughnut-chart">
    <DoughnutChartComponent
      :chart-data="chartDate"
      :options="chartOption"
      class="chart-component"
    />
    <div class="total-container">
      <span class="total-title">
        Total
      </span>
      <span class="total-count">
        {{ total }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import { ChartData, ChartOptions } from 'chart.js';
import { Counter } from '@/interface/interface';
import DoughnutChartComponent from '@/components/DoughnutChartComponent.vue';

@Component({
  components: { DoughnutChartComponent },
})
export default class DoughnutChart extends Vue {
  private data:number[] = [];

  private colors:string[] = [];

  private names:string[] = [];

  private total = 0;

  chartDate: ChartData = {};

  dataClean() {
    this.names = [];
    this.data = [];
    this.colors = [];
    this.total = 0;
  }

  dataIsSet() {
    this.$store.state.group.counters.forEach((e: Counter) => {
      this.data.push(e.count);
      this.colors.push(e.backgroundColor);
      this.names.push(e.name);
      this.total += e.count;
    });
    // this.chartDate.labels = this.names;
    this.chartDate = {
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
    animation: {
      duration: 0,
    },
    hover: {
      animationDuration: 0,
    },
    responsiveAnimationDuration: 0,
    legend: {
      display: false,
      labels: {
        fontColor: 'white',
      },
    },
  }
}

</script>

<style lang="stylus" scoped>
  #doughnut-chart
    width 100%
    color #FFFFFF
    display flex
    align-items center
    justify-content center
    position relative
    /*z-index 999*/
    /*background-color #FFFFFF*/

    .chart-component
      width 100%
      z-index 888
      position relative

    .total-container
      display flex
      position absolute
      z-index 999
      align-items center
      justify-content center
      flex-flow column

      .total-title
        font-weight 500
        font-size 3.5vw

      .total-count
        font-weight 500
        font-size 5vw
</style>
