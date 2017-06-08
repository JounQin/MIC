<template lang="pug">
  div
    mic-header
    hi-swiper(:class="$style.banners", :infinity="true", :autoInterval="2000", controlType="line")
      li(v-for="{link, img} of banners")
        router-link(:to="link")
          img.img-full(:src="img | imgPath")
    hi-swiper.light-bg( :infinity="true", controlType="point")
      li
        ul.list-unstyled.clearfix(:class="$style.categories")
          li
            span.iconfont.icon-category(:style="{backgroundColor: '#29a8e1'}")
            div All Categories
          li
            span.iconfont.icon-package(:style="{backgroundColor: '#f3aa28'}")
            div Packaging & Printing
          li
            span.iconfont.icon-pot(:style="{backgroundColor: '#7ace57'}")
            div Light Industry & Daily Use
          li
            span.iconfont.icon-decoration(:style="{backgroundColor: '#ec6b2a'}")
            div Construction & Decoration
      li
        ul.list-unstyled.clearfix(:class="$style.categories")
          li
            span.iconfont.icon-electric(:style="{backgroundColor: '#9e86f0'}")
            div Electrical & Electronics
          li
            span.iconfont.icon-pad(:style="{backgroundColor: '#22c6af'}")
            div Consumer Electronics
          li
            span.iconfont.icon-setting(:style="{backgroundColor: '#3dbff5'}")
            div Industrial Equipment & Components
          li
            span.iconfont.icon-machinery(:style="{backgroundColor: '#f3aa28'}")
            div Machinery
      li
        ul.list-unstyled.clearfix(:class="$style.categories")
          li
            span.iconfont.icon-light(:style="{backgroundColor: '#f3aa28'}")
            div Lights & Lighting
          li
            span.iconfont.icon-apparel(:style="{backgroundColor: '#fc5896'}")
            div Apparel & Accessories
          li
            span.iconfont.icon-transport(:style="{backgroundColor: '#3cbfd5'}")
            div Transport
          li
            span.iconfont.icon-wheel(:style="{backgroundColor: '#29a8e1'}")
            div Auto, Motorcycle Parts & Accessories
    div(:class="$style.request")
      h5 Post One Request, Get Multiple Quotes
      ol.list-unstyled
        li
          span.iconfont.icon-question
          div Telling us buying need
        li
          span.iconfont.icon-arrow-right
        li
          span.iconfont.icon-message
          div Receive quotations
        li
          span.iconfont.icon-arrow-right
        li
          span.iconfont.icon-handshake
          div Deal with supplier
      router-link.btn.btn-highlight(to="/") Post Souring Request
</template>
<script>
  import MicHeader from './MicHeader'
  import HiSwiper from 'components/HiSwiper'

  import {mapGetters} from 'vuex'

  export default {
    name: 'home',
    async asyncData({store}) {
      await store.dispatch('fetchUser')
      await store.dispatch('fetchBanners')
    },
    computed: {
      ...mapGetters(['banners'])
    },
    components: {
      MicHeader,
      HiSwiper
    }
  }
</script>
<style lang="stylus" module>
  .banners img
    width 100%
    min-height 150px

  .categories > li
    display inline-block
    float left
    width 25%

    :global(.iconfont)
      relative()
      display block
      size 50px
      margin 10px auto
      border-radius 50%

      &:before
        middleCenter()
        color $reverse-color
        font-size 24px

      + div
        scaleSize($smaller-size)
        margin-bottom 7px
        height 32px
        font-size $common-size
        text-align center
        color $primary-color
        line-clamp 2

  .request
    text-align center
    margin-top 10px
    margin-bottom 10px
    padding 10px 15px 20px
    background-color $back-light-color

    > h5
      font-size $primary-size
      color $active-link-color

    > ol > li
      display inline-block
      width 30%
      vertical-align middle
      color $icon-color

      :global(.iconfont)
        font-size 36px

        + :last-child
          margin-top 2px
          line-clamp 2

      &:nth-child(2n)
        width 5%

        :global(.iconfont)
          font-size 20px

    > :global(.btn)
      margin-top 20px
      padding 8px 24px
      font-size $primary-size
      border-radius 5px
</style>
