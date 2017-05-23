<template lang="pug">
  #app
    hi-loading(v-if="progress")
    hi-progress(:progress="progress")
    header(:class="$style.header")
      nav
        router-link(to="/", :class="$style.logo")
          img(src="~assets/logo.png", :srcset="`${require('assets/logo@2x.png')} 2x`" alt="Made-in-China.com logo")
        .pull-right(:class="$style.operations")
          a.iconfont.icon-download(href="//service.made-in-china.com/bulletin/function/4992.htm" target="_blank")
          span.iconfont.icon-menu
      div(:class="$style.search")
        input(placeholder="Search Products", autocomplete="off")
        span.iconfont.icon-search
    transition(:name="transition")
      keep-alive
        router-view(v-if="keepAlive")
    transition(:name="transition")
      router-view(v-if="!keepAlive")
</template>
<script>
  import {mapGetters} from 'vuex'

  import HiLoading from 'HiLoading'
  import HiProgress from 'HiProgress'

  export default {
    name: 'app',
    data: () => ({transition: 'slide-fade'}),
    computed: {
      ...mapGetters(['progress']),
      keepAlive() {
        const {$route} = this
        const keepAlive = $route.meta.keepAlive
        return keepAlive == null ? !Object.keys({...$route.params, ...$route.query}).length : keepAlive
      }
    },
    components: {
      HiLoading,
      HiProgress
    }
  }
</script>
<style src="styles/app.styl" lang="stylus"></style>
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

    :global(.iconfont)
      line-height 1
      font-size 20px
      transform none

      &:last-child
        relative()
        margin-left 10px
        margin-right 3px

        &:after
          absolute()
          top -1px
          right -4px
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
</style>
