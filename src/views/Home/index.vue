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
    .light-bg(:class="$style.request")
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
    .light-bg(:class="$style.business")
      h4 Startup New Business by
      div(:class="$style.businessItemsContainer")
        div(:class="$style.businessItems")
          div(:class="$style.businessItem")
            router-link(to="/start-up/?startupType=mp")
              h5 Most Popular in your country
              img(src="https://www.micstatic.com/mt/img/business/mostpopular/2.jpg")
          div(:class="$style.businessItem")
            router-link(to="/start-up/?startupType=lm")
              h5 Low MOQ quick start
              img(src="https://www.micstatic.com/mt/img/business/lowmoq/2.jpg")
            router-link(to="/start-up/?startupType=mc")
              h5 Most collect by visitors
              img(src="https://www.micstatic.com/mt/img/business/mostcollect/2.jpg")
    .light-bg(:class="$style.like")
      h4 Product You May Like
      ul.list-unstyled(:class="$style.products")
        li(v-for="i of 10")
          router-link(to="/product/Automatic-Plastic-Screw-Loader-Machine-686102772.html")
            div(:class="$style.imgWrapper")
              img.img-full(src="https://image.made-in-china.com/43f34j00ejdEykUFwAcf/Indoor-Advertising-Full-Color-LED-Display-Screen.jpg")
            div Automatic Plastic Screw Loader Machine
</template>
<script>
  import MicHeader from './MicHeader'
  import HiSwiper from 'components/HiSwiper'

  import {mapGetters} from 'vuex'

  export default {
    name: 'home',
    asyncData: ({store}) => Promise.all([store.dispatch('fetchUser'), store.dispatch('fetchBanners')]),
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

  .business
    padding 10px 0 20px

    > h4
      margin-left 15px

  .business-items-container
    relative()
    padding-top 70%

  .business-items
    absolute(top bottom)
    left 10px
    right 10px

  .business-item
    display inline-block
    width 50%
    height 100%
    overflow hidden

    > a
      relative()
      display block
      padding 5px 15px 10px
      height 100%
      background-color #ecede6

      > h5
        font-size 15px

      > img
        absolute(left bottom)
        width 100%

    &:last-child
      padding-left 3px

      > a
        height 50%

        > img
          width 50%
          left auto
          right 10px
          bottom 10px

        &:first-child
          background-color #e0edf8

        &:last-child
          background-color #e4edf3
          margin-top 3px

  .like > h4
    margin-top 0
    margin-left 15px

  .products
    border-top 1px solid $border-color

    > li
      display inline-block
      width 50%
      padding 10px 10px 20px
      border-bottom 1px solid $border-color
      border-right 1px solid $border-color

      &:nth-child(2n)
        border-right-width 0

      @media only screen and (min-width: $threshold)
        width 25%

        &:nth-child(4n + 2)
          border-right-width 1px

      .img-wrapper
        relative()
        padding-top 100%

      img
        absolute(top right bottom left)
        margin-left auto
        margin-right auto

        + div
          margin 0 5px
          line-clamp(2)
</style>
