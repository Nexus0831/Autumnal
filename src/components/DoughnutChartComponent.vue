<script lang="ts">
import {
  Component, Mixins, Prop, Watch,
} from 'vue-property-decorator';
import Chart from 'chart.js';
import { Doughnut, mixins } from 'vue-chartjs';

@Component({})
export default class DoughnutChartComponent extends Mixins(
  Doughnut,
  mixins.reactiveProp,
) {
  @Prop() public chartData!: Chart.ChartData;

  @Prop() public options!: Chart.ChartOptions;

  mounted(): void {
    if (this.chartData) {
      this.renderChart(this.chartData, this.options);
    }
  }

  // @Watch('chartData')
  // onChangeData(): void {
  //   if (this.chartData) {
  //     this.renderChart(this.chartData, this.options);
  //   }
  // }
}
</script>
