<template>
<!--  <div class="card" @click="clickAction">-->
  <div class="card" @click="clickAction">
    <div class="card-title">
      {{ title }}
    </div>
    <div class="card-date">
      Last: {{ date }}
    </div>
    <div class="card-body">
      {{ body }}
    </div>
<!--    <div class="icon-container">-->
<!--      <MaterialIcon-->
<!--        icon="delete"-->
<!--        style="color: #B00020"-->
<!--        rippleColor="rgba(176, 0, 32, 0.5)"-->
<!--        hoverColor="rgba(176, 0, 32, 0.2)"-->
<!--        @click-action="alertOpen"-->
<!--      />-->
<!--      <MaterialIcon-->
<!--        icon="edit"-->
<!--        style="color: #FFF"-->
<!--        rippleColor="rgba(255, 255, 255, 0.5)"-->
<!--        hoverColor="rgba(255, 255, 255, 0.2)"-->
<!--        @click-action="editAction"-->
<!--      />-->
<!--    </div>-->
    <div class="icon-container">
      <MaterialIcon
        icon="delete"
        style="color: #B00020"
        rippleColor="rgba(176, 0, 32, 0.5)"
        hoverColor="rgba(176, 0, 32, 0.2)"
        @click-action="alertOpen"
      />
      <MaterialIcon
        icon="edit"
        style="color: #FFF"
        rippleColor="rgba(255, 255, 255, 0.5)"
        hoverColor="rgba(255, 255, 255, 0.2)"
        @click-action="editAction"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import rippleEffect from '@/functions/ripple';
import MaterialIcon from './MaterialIcon.vue';

@Component({
  components: {
    MaterialIcon,
  },
  methods: {
    rippleEvent: (event) => {
      rippleEffect(event, 'rgba(32, 32, 32, 0.5)');
    },
  },
})
export default class Card extends Vue {
  @Prop() private title!: string;

  @Prop() private date!: string;

  @Prop() private body!: string;

  @Prop() private keyNumber!: string;

  clickAction() {
    this.$router.push({ path: `/count/${this.keyNumber}` });
  }

  alertOpen() {
    this.$store.commit('SET_ALERT_ID', this.keyNumber);
  }

  editAction() {
    this.$emit('update-action', this.keyNumber);
  }
}
</script>

<style lang="stylus">
  .card
    /*--- style ---*/
    background-color #424242
    height 180px
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 2px 1px -1px rgba(0, 0, 0, 0.12)
    border-radius 4px
    transition all .3s
    overflow hidden
    position relative
    /*--- end --- */

    /*--- layout ---*/
    display grid
    grid-template-rows 16px 32px 4px 24px 4px 1fr 12px 32px 8px
    grid-template-columns 16px 1fr 16px
    /*position absolute*/
    /*--- end ---*/

    &:hover
      background-color #3b3b3b
      cursor pointer

  .card-title
    /*--- style ---*/
    font-size 24px
    font-weight 400
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    user-select none
    z-index 10
    /*--- end ---*/

    /*--- position ---*/
    grid-row 2 / 3
    grid-column 2 / 3
    /*--- end ---*/

    /*--- layout ---*/
    /*display flex*/
    /*align-items center*/
    padding-top 3px
    /*--- end ---*/

  .card-date
    /*--- style ---*/
    font-size 16px
    font-weight 500
    overflow hidden
    text-overflow ellipsis
    user-select none
    white-space nowrap
    z-index 10
    /*--- end ---*/

    /*--- position ---*/
    grid-row 4 / 5
    grid-column 2 / 3
    /*--- end ---*/

  .card-body
    /*--- style ---*/
    font-size 16px
    font-weight 400
    overflow hidden
    text-overflow ellipsis
    user-select none
    white-space nowrap
    z-index 10
    /*--- end ---*/

    /*--- position ---*/
    grid-row 6 / 7
    grid-column 2 / 3
    /*--- end ---*/

  .icon-container
    /*--- style ---*/
    display flex
    align-items center
    flex-direction row-reverse
    /*--- end ---*/

    /*--- position ---*/
    grid-row 8 / 9
    grid-column 2 / 3
    /*--- end ---*/
</style>
