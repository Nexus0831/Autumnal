<template>
  <div class="login">
    <LoginView />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginView from '@/components/LoginView.vue';
// @ is an alias to /src
  @Component({
    components: {
      LoginView,
    },
  })
export default class Login extends Vue {}
</script>
