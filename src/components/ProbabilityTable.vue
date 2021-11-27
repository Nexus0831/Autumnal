<template>
  <div id="probability-table">
    <template v-for="datum in data">
      <div :key="datum.color" class="percentage-container">
        <div class="percentage-box" :style="{backgroundColor: datum.color}"/>
        {{ datum.percent }}%
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Counter, Percentage } from '@/interface/interface';
import { mapState } from 'vuex';

  @Component({
    computed: {
      ...mapState([
        'group',
      ]),
    },
  })
export default class ProbabilityTable extends Vue {
    private data:Percentage[] = [];

    private sum = 0;

    dataClean() {
      this.data = [];
      this.sum = 0;
    }

    dataIsSet() {
      this.$store.state.group.counters.forEach((e: Counter) => {
        if (e.isGraphic) {
          this.sum += e.count;
        }
      });
      this.$store.state.group.counters.forEach((e: Counter) => {
        if (e.isGraphic) {
          console.log(e.count);
          console.log(this.sum);
          const percentage = ((e.count / this.sum) * 100).toFixed(1);
          const datum:Percentage = {
            color: e.backgroundColor,
            percent: percentage === 'NaN' ? '0.0' : percentage,
          };
          this.data.push(datum);
        }
      });
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
}

</script>

<style lang="stylus" scoped>
  #probability-table
    /*--- style ---*/
    /*--- end ---*/

    /*--- layout ---*/
    display flex
    align-items center
    justify-content center
    gap 8px
    flex-wrap wrap
    /*--- end ---*/
    .percentage-container
      display flex
      align-items center
      justify-content center
      gap 5px

    .percentage-box
      width 16px
      height 16px
</style>
