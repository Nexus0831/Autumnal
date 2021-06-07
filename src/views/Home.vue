<template>
  <div class="home">
    <HomeView />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeView from '@/components/HomeView.vue';
// @ is an alias to /src
  @Component({
    components: {
      HomeView,
    },
  })
export default class Home extends Vue {}
</script>
