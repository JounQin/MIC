<template lang="pug">
  header(:class="$style.header")
    nav(:class="{active: searchActive}")
      router-link(to="/", :class="$style.logo")
        img(src="~assets/logo.png", :srcset="`${require('assets/logo@2x.png')} 2x`" alt="Made-in-China.com logo")
      .pull-right(:class="$style.operations")
        a.iconfont.icon-download(href="//service.made-in-china.com/bulletin/function/4992.htm" target="_blank")
        span.iconfont.icon-menu(:class="{active: unreadMsg}", @click.stop="menuActive = !menuActive")
          transition(:enter-active-class="$style.menuEnter", :leave-active-class="$style.menuLeave")
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
      transition(:enter-class="$style.searchTypeEnter",
      :enter-active-class="$style.searchTypeEnterActive",
      :leave-active-class="$style.searchTypeLeaveActive",
      :leave-to-class="$style.searchTypeLeaveTo")
        span(:class="[$style.searchType, {active: searchTypesActive}]", v-show="searchActive", @click.stop="searchTypesActive = !searchTypesActive")
          span.iconfont(:class="`icon-${({products: 'package', suppliers: 'people'})[activeSearchType]}`")
          div(:class="$style.searchTypes", v-show="searchTypesActive")
            ul.list-unstyled
              li(@click="activeSearchType = 'products'")
                span.iconfont.icon-package
                | Products
                span.iconfont.icon-correct.pull-right(v-if="activeSearchType === 'products'")
              li(@click="activeSearchType = 'suppliers'")
                span.iconfont.icon-people
                | Suppliers
                span.iconfont.icon-correct.pull-right(v-if="activeSearchType === 'suppliers'")
      input(placeholder="Search Products", autocomplete="off", @focus="searchActive = true; searchTypesActive = false", @click.stop="", v-model="keyword", ref="search")
      span.iconfont.icon-wrong(v-if="keyword", @click.stop="keyword = null; $refs.search.focus()")
      span.iconfont.icon-search
    transition-group.list-unstyled(tag="ul",
    :class="$style.suggestions",
    :enter-class="$style.suggestionEnter",
    :enter-active-class="$style.suggestionEnterActive",
    :leave-class="$style.suggestionLeave",
    :leave-active-class="$style.suggestionLeaveActive")
      li(v-for="(suggestion, index) of suggestions", :key="index") {{ suggestion }}
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import {debounce} from 'lodash'

  import {on} from 'utils'

  export default {
    data() {
      return {
        menuActive: false,
        searchActive: false,
        searchTypesActive: false,
        activeSearchType: 'products',
        keyword: null,
        suggestCache: {},
        suggestions: [],
        suggestionsCache: []
      }
    },
    computed: {
      ...mapGetters(['userId', 'userName', 'unreadMsg'])
    },
    watch: {
      searchActive(searchActive) {
        this.toggleMask(searchActive)
        searchActive ? this.enterTimeout(this.suggestionsCache) : (this.suggestionsCache = [...this.suggestions])
      },
      keyword(keyword) {
        keyword = keyword && keyword.trim()
        keyword ? this.suggest(keyword) : this.leaveTimeout()
      }
    },
    mounted() {
      on(document, 'click', () => {
        this.menuActive = false
        this.searchActive = false
        this.searchTypesActive = false
        this.leaveTimeout()
      })
    },
    methods: {
      ...mapActions(['toggleMask']),
      suggest: debounce(async function (keyword) {
        const {suggestCache} = this
        let cache = suggestCache[keyword]
        cache = cache || (suggestCache[keyword] = (await this.$http.get('/search-suggest', {
          params: {keyword}
        })).data)
        this.enterTimeout(cache)
      }, 500),
      enterTimeout(cache) {
        const length = this.suggestions.length
        this.suggestions = cache.slice(0, length)
        if (cache.length <= length) return
        cache.forEach((suggestion, index) => {
          index < length || setTimeout(() => this.suggestions.push(suggestion), 100 * (index - length))
        })
      },
      leaveTimeout() {
        const {suggestions} = this
        if (!suggestions) return
        suggestions.forEach((suggestion, index) => setTimeout(() => suggestions.splice(-1, 1), 50 * index))
      }
    }
  }
</script>
<style lang="stylus" module>
  .header
    position relative
    padding 15px 10px 10px
    background-color $back-light-color
    z-index 101

    nav
      margin-bottom 15px
      transition margin-top .5s

      &:global(.active)
        margin-top -57px

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
      font-size $common-size
      padding 7px 10px
      background-color transparent

    > span
      display table-cell
      vertical-align middle

      &:before
        font-size 20px

      &:last-child
        width 1%
        padding 0 15px
        line-height 1
        color $reverse-color
        background-color $highlight-color
        border-top-right-radius 4px
        border-bottom-right-radius 4px

      &:global(.icon-wrong)
        color $remark-color
        width 1%
        padding-right 5px

  .search-type
    width 1%
    max-width 0
    relative()
    border-right 1px solid $split-line-color
    overflow hidden
    padding-left 52px

    &:global(.active)
      overflow visible

    > span
      absolute(left)
      top 50%
      padding 0 10px
      padding-right 20px
      white-space nowrap
      transform translate3d(0, -50%, 0)

      &:before
        color $remark-color

      &:after
        absolute()
        top 50%
        right 5px
        content ''
        border 6px solid transparent
        border-top-color #7f7f7f
        transform translate3d(0, -25%, 0)

  .menus
    absolute()
    top 25px
    right -3px
    width 200px
    background-color $reverse-color
    box-shadow 0 2px 10px rgba($stress-color, .3)

  .menu-header
    padding 16px 20px
    border-bottom 1px solid $border-color

    > a:global(.active)
      color $active-link-color

  .menu-list
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

  $timingFunc = cubic-bezier(.15, .41, .6, .7)

  .menu-enter
    animation menu-enter .4s $timingFunc

  @keyframes menu-enter
    from
      opacity 0
      transform translate3d(0, -5px, 0)

    75%
      opacity 1
      transform translate3d(0, 5px, 0)

    to
      transform translate3d(0, 0, 0)

  .menu-leave
    animation menu-leave .4s $timingFunc

  @keyframes menu-leave
    from
      opacity 1
      transform translate3d(0, 0, 0)

    33%
      opacity .3
      transform translate3d(0, -5px, 0)

    to
      opacity 0
      transform translate3d(0, 5px, 0)

  .search-type-enter-active, .search-type-leave-active
    transition all .3s

  .search-type-enter, .search-type-leave-active
    padding-left 0

  .search-type-leave-active
    border-right 0

  .search-type-leave-to
    width 0

  .search-types
    absolute(left)
    top 30px
    font-size 0

    $types-bg-color = rgba($split-line-darker-color, .88)

    &:before
      content ''
      display inline-block
      border solid transparent
      border-width 10px 8px
      border-bottom-color $types-bg-color
      margin-left 20px

    > ul
      width 250px
      background-color $types-bg-color
      border-radius 4px

      > li
        padding 10px
        height 50px
        line-height 30px
        font-size $primary-size
        color $reverse-color

        + li
          border-top 1px solid $split-line-darker-color

        span
          &:first-child
            margin-right 10px

          &:before
            font-size 20px
            line-height 1

  .suggestions
    background-color $panel-bg-color
    margin 10px -10px -10px
    color $subtext-color

    > li
      padding 12px 18px

      + li
        border-top 1px solid $split-line-color

  .suggestion-enter, .suggestion-leave-active
    opacity 0
    height 0

  .suggestion-enter-active, .suggestion-leave-active
    transition all .3s cubic-bezier(.05, .58, .25, 1)
</style>
