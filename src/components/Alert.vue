<template>
  <div id="alert" @click.self.stop="closeAlert">
    <div class="surface">
      <div class="alert-title">カウントグループ {{ title }}を削除しますか？</div>
      <div class="alert-body">
        本当にこのカウントグループを削除しますか？
        <br>
        削除したカウントグループは復元できないので注意してください
      </div>
      <div class="button-container">
        <Button
          buttonText="DELETE"
          style="color: #B00020"
          rippleColor="rgba(176, 0, 32, 0.5)"
          hoverColor="rgba(176, 0, 32, 0.2)"
          @click-action="alertAction"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Button from '@/components/Button.vue';

@Component({
  components: {
    Button,
  },
})
export default class Alert extends Vue {
  @Prop() private title!: string;

  closeAlert() {
    this.$store.commit('SET_ALERT_ID', '');
  }

  alertAction() {
    this.closeAlert();
    this.$emit('alert-action');
  }
}

</script>

<style lang="stylus" scoped>
#alert
  /*--- style ---*/
  position fixed
  left 0
  top 0
  background-color rgba(0, 0, 0, 0.3)
  width 100%
  height calc(100vh + 20px)
  z-index 200
  /*--- end ---*/

  /*--- layout ---*/
  display flex
  justify-content center
  align-items center
  /*--- end ---*/

  &:hover
    cursor default

  .surface
    /*--- style ---*/
    background-color #424242
    max-height: calc(100% - 96px);
    width 80%
    max-width 600px
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
      0px 24px 38px 3px rgba(0, 0, 0, 0.14),
      0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    border-radius 4px
    margin 48px
    position relative
    overflow-y auto
    /*--- end --- */

    /*--- layout ---*/
    display flex
    flex-direction column
    /*--- end ---*/

  .alert-title
    /*--- style ---*/
    font-size 1.25rem
    font-weight 500
    letter-spacing: 0.0075em;
    line-height 1.6
    margin 0
    padding 24px 24px 20px
    /*--- end ---*/

  .alert-body
    /*--- style ---*/
    color rgba(255, 255, 255, 0.7)
    font-size 1rem
    font-weight 400
    letter-spacing: 0.00938em;
    line-height 1.5
    padding 0 24px 24px
    overflow-y auto
    /*--- end ---*/

  .button-container
    /*--- style ---*/
    margin 8px 12px
    /*--- end ---*/

    /*--- layout ---*/
    display flex
    align-items center
    justify-content flex-end
    /*--- end ---*/

.alert-enter-active, .alert-leave-active
  will-change opacity
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

.alert-enter, .alert-leave-to
  opacity: 0
</style>
