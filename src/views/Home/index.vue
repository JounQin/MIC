<template lang="pug">
  div
    mic-header
    hi-swiper(:class="$style.banners", :infinity="true", :autoInterval="2000", controlType="line")
      li(v-for="{link, img} of banners")
        router-link(:to="link")
          img.img-full(:src="img | imgPath")
    hi-swiper.light-bg(controlType="point")
      li
        ul.list-unstyled.clearfix(:class="$style.categories")
          li
            span.iconfont.icon-category(:style="{backgroundColor: '#29a8e1'}")
            div All Categories
          li
            span.iconfont.icon-package(:style="{backgroundColor: '#f3aa28'}")
            div Packaging
              br
              | & Printing
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
        display -webkit-box
        white-space pre-wrap
        word-wrap break-word
        overflow hidden
        text-overflow ellipsis
        -webkit-line-clamp 2
        -webkit-box-orient vertical
        -webkit-box-pack center
</style>
