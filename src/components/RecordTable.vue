<template>
  <table id="record-table">
    <thead class="record-thead">
      <tr class="record-tr" v-bind:style="{ backgroundColor: '#303030' }">
        <th class="record-th-left">カウント日</th>
        <th class="record-th-right">アイテム名</th>
        <th class="record-th-right">個数</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="record in group.records">
        <tr
          :key="record.key"
          class="record-tr"
          v-bind:style="{
            backgroundColor: group.counters
              .find((e) => e.key === record.counterKey).backgroundColor,
            color: group.counters
              .find((e) => e.key === record.counterKey).textColor,
          }"
        >
          <th class="record-th-left">
            {{ record.date }}
          </th>
          <th class="record-th-right">
            {{ group.counters.find((e) => e.key === record.counterKey).name }}
          </th>
          <th class="record-th-right">
            {{ record.count }}
          </th>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CountRecord } from '@/interface/interface';
import { mapState } from 'vuex';

@Component({
  computed: {
    ...mapState([
      'group',
    ]),
  },
})
export default class RecordTable extends Vue {
}

</script>

<style lang="stylus" scoped>
  #record-table
    display table
    width 100%
    border-collapse collapse
    border-spacing 0
    min-width 650px
    .record-thead
      display table-header-group
    .record-tr
      color inherit
      display table-row
      vertical-align middle
      outline 0
    .record-th-left
      font-weight 500
      font-size 0.875rem
      line-height 1.5rem
      letter-spacing 0.01071em
      display table-cell
      vertical-align inherit
      border-bottom 1px solid rgb(81, 81, 81)
      text-align left
      padding 16px
      /*background-color #303030*/
    .record-th-right
      font-weight 500
      font-size 0.875rem
      line-height 1.5rem
      letter-spacing 0.01071em
      display table-cell
      vertical-align inherit
      border-bottom 1px solid rgb(81, 81, 81)
      text-align right
      padding 16px
      flex-direction: row-reverse;
</style>
