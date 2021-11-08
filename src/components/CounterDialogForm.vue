<template>
  <div id="counter-dialog-form" @click.self="$emit('dialog-close')">
    <div class="surface">
      <div class="dialog-form-title">
        Counter
      </div>
      <div class="dialog-form-title error" v-if="!validate">
        ItemNameが空です
      </div>
      <div class="dialog-form-input">
        <MaterialInput
          idName="ItemName"
          labelText="ItemName"
          :value="textValue"
          @change-action="itemNameChangeAction"
        />
      </div>
      <div class="color-list">
        <!-- 1行12色で表示 -->
        <div
          class="color-value-text"
          v-bind:style="{
            color: counterCreateFields.backgroundColor === ''
            ?
            'rgba(255, 255, 255, 0.7)' : counterCreateFields.backgroundColor
          }"
        >
          {{
            counterCreateFields.backgroundColor === ""
            ?
            "Color ※未選択の場合はカラーパレットからランダムに設定されます" : counterCreateFields.backgroundColor
          }}
        </div>
        <div class="color-list-container">
          <template v-for="color in colorList">
            <div class="color-box" :key="color.backgroundColor">
              <div
                :class="[
                  selectedColors.includes(color.backgroundColor)
                  ?
                  'color-selected-contents' : 'color-contents'
                ]"
                v-bind:style="{ backgroundColor: color.backgroundColor, color: color.textColor}"
                @click="colorClickAction(color.backgroundColor, color.textColor)"
              >
              </div>
            </div>
          </template>
        </div>
      </div>
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
import { Counter } from '@/interface/interface';
import colors from '@/assets/colors';
import { mapState } from 'vuex';

  @Component({
    components: {
      MaterialInput,
      Button,
    },
    computed: {
      ...mapState([
        'counterCreateFields',
        'group',
      ]),
    },
  })
export default class CounterDialogForm extends Vue {
    @Prop() private validMessage!: string;

    @Prop() private textValue!: string;

    @Prop() private validate!: boolean;

    colorList = colors;

    selectedColors: string[] = [];

    created() {
      this.$store.state.group.counters.forEach((e: Counter) => {
        this.selectedColors.push(e.backgroundColor);
      });
    }

    itemNameChangeAction(itemName: string) {
      this.$store.commit('SET_COUNTER_CREATE_FIELDS_ITEM_NAME', itemName);
    }

    colorClickAction(backgroundColor: string, textColor: string) {
      this.$store.commit('SET_COUNTER_CREATE_FIELDS_BACK_GROUND_COLOR', backgroundColor);
      this.$store.commit('SET_COUNTER_CREATE_FIELDS_TEXT_COLOR', textColor);
    }
}
</script>

<style lang="stylus" scoped>
  #counter-dialog-form
    /*--- style ---*/
    position fixed
    left 0
    top 0
    background-color rgba(0, 0, 0, 0.3)
    width 100%
    height calc(100vh + 20px)
    z-index 9999
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

    .color-list
      width 100%

    .color-value-text
      font-size 1rem
      line-height 1
      padding 0 24px 12px

    .color-list-container
      padding 0 24px 24px
      display grid
      grid-auto-flow column
      grid-template-rows: repeat(12, 1fr);
      grid-template-columns: repeat(17, 1fr);

    .color-box
      width 100%
      padding-top 100%
      position relative
      transition all 0.2s

      &:hover
        cursor pointer
        transform scale(0.8, 0.8)

    .color-contents
      top 0
      bottom 0
      left 0
      right 0
      position absolute
      width 100%

    .color-selected-contents
      top 0
      bottom 0
      left 0
      right 0
      position absolute
      width 100%
      visibility hidden

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
