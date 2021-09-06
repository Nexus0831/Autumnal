<template>
  <div id="dialog-form" @click.self="$emit('dialog-close')">
    <div class="surface">
      <div class="dialog-form-title">{{ formTitle }}</div>
      <div class="dialog-form-title error" v-if="!validate">
        {{ validMessage }}
      </div>
      <template v-for="field in fields">
        <div class="dialog-form-input" :key="field.label">
          <MaterialInput
            :idName="field.label"
            :labelText="field.label"
            :value="field.value"
            @change-action="field.changeAction"
          />
        </div>
      </template>
      <div class="button-container">
        <Button
          buttonText="CANCEL"
          style="color: #FFF"
          rippleColor="rgba(255, 255, 255, 0.5)"
          hoverColor="rgba(255, 255, 255, 0.08)"
          @click-action="$emit('dialog-close')"
        />
        <Button
          buttonText="SUBMIT"
          style="color: #e91e63"
          rippleColor="rgba(233, 30, 99, 0.5)"
          hoverColor="rgba(233, 30, 99, 0.2)"
          @click-action="$emit('submit-action')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialInput from '@/components/MaterialInput.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {
    MaterialInput,
    Button,
  },
})
export default class DialogForm extends Vue {
  @Prop() private formTitle!: string;

  @Prop() private validMessage!: string;

  // eslint-disable-next-line @typescript-eslint/ban-types
  @Prop() private fields!: Array<object>;

  @Prop() private validate!: boolean;
}
</script>

<style lang="stylus" scoped>
#dialog-form
  /*--- style ---*/
  position fixed
  left 0
  top 0
  background-color rgba(0, 0, 0, 0.3)
  width 100%
  height calc(100vh + 20px)
  z-index 100
  backdrop-filter blur(6px)
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

  .dialog-form-title
    /*--- style ---*/
    font-size 1.25rem
    font-weight 500
    letter-spacing: 0.0075em;
    line-height 1.6
    margin 0
    padding 24px 24px 20px
    text-align center
    /*--- end ---*/

  .error
    /*--- style ---*/
    color #B00020
    /*--- end ---*/

  .dialog-form-input
    /*--- style ---*/
    padding 0 24px 24px
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
</style>
