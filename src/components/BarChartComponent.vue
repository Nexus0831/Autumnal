<script lang="ts">
import {
  Component, Mixins, Prop, Watch,
} from 'vue-property-decorator';
import Chart from 'chart.js';
import { Bar, mixins } from 'vue-chartjs';

  @Component({})
export default class DoughnutChartComponent extends Mixins(
  Bar,
  mixins.reactiveProp,
) {
    @Prop() public chartData!: Chart.ChartData;

    @Prop() public options!: Chart.ChartOptions;

    mounted(): void {
      this.renderChart(this.chartData, this.options);
    }

    load() {
      this.renderChart(this.chartData, this.options);
    }

    @Watch('chartData')
    onChangeData(): void {
      this.load();
    }
}
</script>
