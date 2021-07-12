<template>
  <div id="login">
    <div class="login-container">
      <div class="title-container">
        <span class="title">
          Login
        </span>
      </div>
      <div class="button-container">
        <ContainedButton
          class="button"
          buttonText="Googleアカウントでログイン"
          style="color: #FFF"
          rippleColor="rgba(255, 255, 255, 0.5)"
          hoverColor="#a31545"
          backgroundColor="#e91e63"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContainedButton from '@/components/ContainedButton.vue';

  @Component({
    components: {
      ContainedButton,
    },
  })
export default class Login extends Vue {
  // signInAction() {
  //   this.$store.dispatch('signIn', this.$router).then();
  //   @click-action="signInAction"
  // }
}
</script>

<style lang="stylus" scoped>
  #login
    /*--- style ---*/
    height 100%
    width 100%
    /*--- end ---*/
    /*--- layout ---*/
    display flex
    justify-content center
    align-items center
    flex-direction column
    /*--- end ---*/
  .login-container
    /*--- style ---*/
    @media (max-width 619px)
      height 200px
      width 350px
    @media (min-width 619px)
      height 250px
      width 500px
    @media (min-width 1024px)
      height 300px
      width 600px
    background-color #424242
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 2px 1px -1px rgba(0, 0, 0, 0.12)
    border-radius 4px
    /*-- end --*/
    /*--- layout ---*/
    display grid
    grid-template-columns 12px 1fr 12px
    grid-template-rows 12px 68px 1fr 12px
    /*--- end ---*/
    .title-container
      /*--- style ---*/
      grid-column 2 / 3
      grid-row 2 / 3
      /*-- end --*/
      /*--- layout ---*/
      display flex
      justify-content center
      align-items center
      flex-direction column
      /*--- end ---*/

      .title
        font-weight 500
        font-size 48px

    .button-container
      /*--- style ---*/
      grid-column 2 / 3
      grid-row 3 / 4
      /*-- end --*/
      /*--- layout ---*/
      display flex
      justify-content center
      align-items center
      flex-direction column
      /*--- end ---*/
</style>
