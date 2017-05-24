<template lang="pug">
  header(:class="$style.header")
    nav
      router-link(to="/", :class="$style.logo")
        img(src="~assets/logo.png", :srcset="`${require('assets/logo@2x.png')} 2x`" alt="Made-in-China.com logo")
      .pull-right(:class="$style.operations")
        a.iconfont.icon-download(href="//service.made-in-china.com/bulletin/function/4992.htm" target="_blank")
        span.iconfont.icon-menu(:class="{active: unreadMsg}", @click="menuActive = !menuActive")
          div(:class="$style.menus", v-show="menuActive")
            div(:class="$style.menuHeader")
              template(v-if="userId")
                router-link.active(to="/member") {{ userName }}
                router-link.pull-right(to="/logout") Sign Out
              template(v-else)
                router-link(to="/login") Sign In
                router-link.pull-right(to="/register") Join Free
            ul.list-unstyled(:class="$style.menuList")
              li
                router-link.iconfont.icon-home(to="/") Home
              li
                router-link.iconfont.icon-message(:class="{active: unreadMsg}", to="/messages") Messages
              li
                router-link.iconfont.icon-target(to="/quotations") Quotations
              li
                router-link.iconfont.icon-star(to="/favourites") Favourites
              li
                router-link.iconfont.icon-global(to="/en") English
              li
                a.iconfont.icon-mobile(href="//service.made-in-china.com/bulletin/function/4992.htm" target="_blank") APP
              li
                router-link.iconfont.icon-pc(to="/pc") PC Site
    div(:class="$style.search")
      input(placeholder="Search Products", autocomplete="off")
      span.iconfont.icon-search
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        menuActive: false
      }
    },
    computed: {
      ...mapGetters(['userId', 'userName', 'unreadMsg'])
    }
  }
</script>
<style lang="stylus" module>
  .header
    padding 15px 10px 10px

    nav
      margin-bottom 15px

  .logo
    display inline-block
    font-size 0
    vertical-align middle

    img
      size 185px 42px

  .operations
    line-height 42px

    > :global(.iconfont)
      line-height 1
      transform none
      cursor pointer

      &:before
        font-size 20px

      &:last-child
        relative()
        margin-left 10px
        margin-right 3px

        &:global(.active):after
          absolute()
          top -6px
          right -6px
          border-radius 50%
          content ''
          size 6px
          background-color $highlight-color

  .search
    display table
    height 35px
    border-radius 4px
    background-color $bg-color

    input
      display table-cell
      size 100%
      border 0
      outline 0
      padding 7px 10px
      background-color transparent

      + span
        display table-cell
        width 1%
        vertical-align middle
        padding 0 19px
        color $reverse-color
        background-color $highlight-color
        border-top-right-radius 4px
        border-bottom-right-radius 4px

  .menus
    absolute()
    top 25px
    right -3px
    width 200px
    background-color $reverse-color
    box-shadow 1px 1px 2px $border-color, -1px 1px 2px $border-color

  .menu-header
    padding 16px 20px
    border-bottom 1px solid $border-color

    > a:global(.active)
      color $active-link-color

  .menu-list
    margin 0
    padding 5px 0

    > li > a
      display block
      padding 10px 20px

      &:before
        font-size 20px
        margin-right 20px

      &:global(.icon-message)
        relative()

        &:global(.active):after
          absolute()
          right 20px
          top 50%
          content ''
          size 8px
          border-radius 50%
          background-color $highlight-color
          transform translate3d(0, -50%, 0)
</style>
