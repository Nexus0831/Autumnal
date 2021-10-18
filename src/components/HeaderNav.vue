<template>
  <div class="nav">
    <div class="left-container"></div>
    <div class="center-container">
      <router-link to="/" class="title">Autumnal</router-link>
    </div>
    <div v-if="isSignIn" class="right-container">
      <div class="display-name">
        {{ user.email }}
      </div>
    </div>
    <div v-else class="right-container">
      <Button
        buttonText="LOGIN"
        style="color: #ffffff"
        rippleColor="rgba(255, 255, 255, 0.5)"
        hoverColor="rgba(255, 255, 255, 0.2)"
        @click-action="signIn"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import { mapState, mapActions } from 'vuex';

@Component({
  components: {
    Button,
  },
  computed: {
    ...mapState([
      'isSignIn',
      'user',
    ]),
  },
  methods: {
    ...mapActions([
      'signIn',
    ]),
  },
})
export default class HeaderNav extends Vue {}
</script>

<style lang="stylus" scoped>
  .nav
    /* --- layout --- */
    display flex
    justify-content center
    align-items center
    /* --- end --- */
    /* --- style --- */
    position fixed
    z-index 99999
    width 100%
    height 50px
    background-color #303030
    box-shadow 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12)
    /* --- end --- */
    .left-container
      width 25%
    .center-container
      /*--- style ---*/
      width 50%
      /*--- end ---*/
      /*--- layout ---*/
      display flex
      justify-content center
      align-items center
      /*--- end ---*/
      .title
        font-size 24px
        font-weight 500
        color #e91e63
        text-decoration none
        line-height 1.6
        letter-spacing 0.0075em
        &:hover
          cursor pointer
    .right-container
      /*--- style ---*/
      width 25%
      /*--- end ---*/
      /*--- layout ---*/
      display flex
      justify-content center
      align-items center
      /*--- end ---*/
      .display-name
        font-weight 500
        line-height 1.6
        letter-spacing 0.0075em
</style>
