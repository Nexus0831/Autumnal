<template>
  <div id="login">
    <div class="header-content card-texture">
      <div class="content-title">
        ドロップアイテムを楽にカウントしてみませんか？
        <span class="content-body">
          Autumnalを使えばそれが可能です
        </span>
        <div class="button-container">
          <ContainedButton
            class="button"
            buttonText="Googleアカウントでログイン"
            style="color: #FFF"
            rippleColor="rgba(255, 255, 255, 0.5)"
            hoverColor="#a31545"
            backgroundColor="#e91e63"
            @click-action="signInAction"
          />
        </div>
      </div>
    </div>
    <div class="main-content">
      <template v-for="commitment in commitments">
        <div :key="commitment.title" class="commitment-container">
          <div class="commitment-title">
            {{ commitment.title }}
          </div>
          <div class="commitment-body">
            {{ commitment.body}}
          </div>
        </div>
      </template>
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
  commitments = [
    {
      title: '綺麗に管理',
      body: 'Autumnalではカウントグループを作成し、敵ごとにドロップアイテムのカウントを行う事ができます。',
    },
    {
      title: '204色',
      body: 'カウンターの色をマテリアルカラーを基準とした204色から選択可能です。\nただし同じ色を選択することはできません。\n選ぶのが面倒な時はランダム選択機能に頼るのがいいでしょう。',
    },
    {
      title: '一目で分かる',
      body: 'カウントデータを元に2種類のグラフを表示します。\nグラフに反映するカウントを選択することもできます。',
    },
    {
      title: '上振れ？下振れ？',
      body: 'カウントデータを元に各カウンターの確率を表示します。\nあなたの運を冷静に判断する助けになるでしょう。',
    },
    {
      title: '足跡は思い出に',
      body: '「いつ、どれを、どのくらい」カウントしたのか記録を自動で作成します。\nあなたの努力をビジュアル化してくれます。',
    },
    {
      title: 'もう消えない',
      body: 'Autumnalではカウントデータをデータベースに保存します。\nあなたが意図して消さない限りカウントデータが消えることはありません安心してください。',
    },
  ];

  signInAction() {
    this.$store.dispatch('signIn', this.$router).then();
  }
}
</script>

<style lang="stylus" scoped>
  #login
    display grid
    grid-template-rows 200px 12px 1fr
    grid-template-columns 1fr
    .header-content
      /** style start **/
      background-color #424242
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 2px 1px -1px rgba(0, 0, 0, 0.12)
      border-radius 4px
      overflow hidden
      position relative
      margin -24px -24px 0px
      /** style end **/
      /** layout start **/
      display grid
      grid-template-rows 12px 1fr 12px
      grid-template-columns 12px 1fr 12px
      /** layout end **/
      /** position start **/
      grid-row 1 / 2
      grid-column 1 / 2
      /** position end **/

    .content-title
      /** style start **/
      color #e91e63
      padding 0 12px
      @media (max-width 619px)
        font-size 24px
      @media (min-width 619px)
        font-size 32px
      @media (min-width 1024px)
        font-size 42px
      line-height 1.2
      letterSpacing -0.035em
      font-weight bold
      height 100%
      /** style end **/
      /** layout start **/
      display flex
      flex-direction column
      justify-content center
      align-items center
      /** layout end **/
      /** position start **/
      grid-row 2 / 3
      grid-column 1 / 4
      /** position end **/
    .content-body
      /** style start **/
      color #ffffff
      padding 12px
      @media (max-width 619px)
        font-size 16px
      @media (min-width 619px)
        font-size 24px
      font-weight normal
      /** style end **/
      /** layout start **/
      /** layout end **/
      /** position start **/
      /** position end **/
    .button-container
      /*--- style ---*/
      /*-- end --*/
      /*--- layout ---*/
      display flex
      justify-content center
      align-items center
      flex-direction column
      /*--- end ---*/
    .main-content
      display grid
      @media (max-width 619px)
        grid-template-columns repeat(1, 1fr)
        grid-template-rows repeat(6, 250px)
      @media (min-width 619px)
        grid-template-columns repeat(2, 1fr)
        grid-template-rows repeat(3, 250px)
      @media (min-width 1024px)
        grid-template-columns repeat(3, 1fr)
        grid-template-rows repeat(2, 300px)
      grid-gap 12px
      grid-row 3 / 4
      grid-column 1 / 2
    .commitment-container
      width 100%
      display grid
      grid-template-rows 12px 48px 12px 1fr 12px
      grid-template-columns 12px 1fr 12px
    .commitment-title
      font-size 32px
      display flex
      color #ffffff
      font-weight bold
      align-items center
      justify-content center
      position relative
      grid-row 2 / 3
      grid-column 2 / 3

      &::after
        content ""
        display inline-block
        width 100%
        height 3px
        background-color #e91e63
        position absolute
        bottom 0
        /*align-items center*/
        /*justify-content center*/
    .commitment-body
      font-size 20px
      grid-row 4 / 5
      grid-column 2 / 3
      white-space pre-line
</style>
