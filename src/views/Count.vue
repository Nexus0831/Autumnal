<template>
  <div class="count">
    <CountView />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CountView from '@/components/CountView.vue';
  // @ is an alias to /src
  @Component({
    components: {
      CountView,
    },
  })
export default class Count extends Vue {}
</script>
