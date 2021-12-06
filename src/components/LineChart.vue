<template>
  <div id="line-chart">
    <LineChartComponent
      :chart-data="chartDate"
      :options="chartOption"
      class="line-component"
    />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import { ChartData, ChartOptions } from 'chart.js';
import { Counter, CountRecord } from '@/interface/interface';
import LineChartComponent from '@/components/LineChartComponent.vue';

  @Component({
    components: { LineChartComponent },
  })
export default class LineChart extends Vue {
    private data:any[] = [];

    private labels:string[] = [];

    chartDate: ChartData = {};

    dataClean() {
      this.data = [];
      this.labels = [];
    }

    dataIsSet() {
      this.$store.state.group.records.forEach((e: CountRecord) => {
        if (!this.labels.includes(e.date)) {
          this.labels.push(e.date);
        }
      });

      this.$store.state.group.counters.forEach((e: Counter) => {
        if (e.isGraphic) {
          const rcData:any = [];
          this.$store.state.group.records.forEach((c: CountRecord) => {
            if (e.key === c.counterKey) {
              const rc = {
                t: c.date,
                y: c.count,
              };
              rcData.push(rc);
            }
          });
          const set = {
            label: e.name,
            backgroundColor: e.backgroundColor,
            borderColor: e.backgroundColor,
            fill: false,
            data: rcData,
          };
          this.data.push(set);
        }
      });

      this.chartDate = {
        labels: this.labels,
        datasets: this.data,
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
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: { day: 'YYYY/MM/DD' },
            parser: 'YYYY/MM/DD',
          },
          gridLines: {
            display: false,
          },
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: 'white',
            stepSize: 1,
          },
          gridLines: {
            color: 'rgba(255, 255, 255, 0.5)',
            drawBorder: false,
          },
        }],
      },
      elements: {
        line: {
          tension: 0,
        },
      },
    }
}

</script>

<style lang="stylus" scoped>
  #line-chart
    width 100%
    color #FFFFFF
    display flex
    align-items center
    justify-content center

    .line-component
      width 100%
      z-index 888
      position relative
</style>
