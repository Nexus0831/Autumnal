<template>
  <div id="count">
    test{{ this.$route.params.id }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class CountView extends Vue {}
</script>

<style scoped lang="stylus">

</style>
