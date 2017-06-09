<template lang="pug">
  div
    mic-header
    hi-swiper(:class="$style.banners", :infinity="true", :autoInterval="2000", controlType="line")
      li(v-for="{link, img} of banners")
        router-link(:to="'https://m.made-in-china.com/special/' + link")
          img.img-full(:src="img + '/made-in-china.jpg' | imgPath")
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
        .clearfix(:class="$style.businessItems")
          div(:class="$style.businessItem")
            router-link(to="https://m.made-in-china.com/start-up/?startupType=mp")
              h5 Most Popular in your country
              img(:src="recommendations.mostPopular")
          div(:class="$style.businessItem")
            router-link(to="https://m.made-in-china.com/start-up/?startupType=lm")
              h5 Low MOQ quick start
              img(:src="recommendations.lowMoq")
            router-link(to="https://m.made-in-china.com/start-up/?startupType=mc")
              h5 Most collect by visitors
              img(:src="recommendations.mostCollect")
    .light-bg(:class="$style.like")
      h4 Product You May Like
      ul.clearfix.list-unstyled.border-t(:class="$style.products")
        li(v-for="{link, img, title} of recommendations.products")
          router-link(:to="`https://m.made-in-china.com/product/${link}.html`")
            div(:class="$style.imgWrapper")
              img.img-full(v-lazy="`https://image.made-in-china.com/${img}.jpg`")
            div {{ title }}
    mic-footer
</template>
<script>
  import MicHeader from './MicHeader'
  import HiSwiper from 'components/HiSwiper'
  import MicFooter from './MicFooter'

  import {mapGetters} from 'vuex'

  export default {
    name: 'home',
    asyncData: ({store}) => Promise.all([
      store.dispatch('fetchUser'),
      store.dispatch('fetchBanners'),
      store.dispatch('fetchRecommendations')
    ]),
    computed: {
      ...mapGetters(['banners', 'recommendations'])
    },
    components: {
      MicHeader,
      HiSwiper,
      MicFooter
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
    float left

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

  .products > li
    relative()
    display inline-block
    width 50%
    padding 10px 10px 20px
    border1px-b()
    float left

    &:nth-child(2n + 1):before
      absolute(top right bottom left)
      content ''
      border1px-r()

    @media only screen and (min-width: $threshold)
      width 25%

      &:nth-child(4n + 2):before
        absolute(top right bottom left)
        content ''
        border1px-r()

    img
      absolute(top right bottom left)
      margin auto

  .img-wrapper
    relative()
    padding-top 100%

    + div
      margin 20px 5px 0
      height 32px
      line-clamp 2
</style>
