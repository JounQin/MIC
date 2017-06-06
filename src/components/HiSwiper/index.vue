<template lang="pug">
  div(:class="$style.container", v-touch="{methods: true}")
    ol.list-unstyled(:class="[$style.list, {[$style.transition]: transition}]",
    :style="{transform}", ref="list", @transitionend="transitionEnd")
      li(v-if="lastItem", :class="Array.from(lastItem.classList)", v-html="lastItem.innerHTML")
      slot
      li(v-if="firstItem", :class="Array.from(firstItem.classList)", v-html="firstItem.innerHTML")
    ul.list-unstyled(:class="$style.lineControl")
      li(v-for="i in realSize", :class="{[$style.current]: controlIndex === i - 1}", :style="{width: 100 / (infinity ? size - 2 : size) + '%'}")
</template>
<script>
  import {throttle} from 'lodash'

  import {intervalVal, on, off} from 'utils'

  export default {
    name: 'HiSwiper',
    props: {
      infinity: {
        type: Boolean,
        default: false
      },
      threshold: {
        type: Number,
        default: 20
      },
      autoInterval: {
        type: Number,
        validator(val) {
          return !val || val >= 1500
        }
      }
    },
    data() {
      return {
        translateX: 0,
        translateStart: 0,
        transition: false,
        index: 0,
        width: 0,
        size: 0,
        realSize: 0,
        firstItem: null,
        lastItem: null,
        autoTimeout: null
      }
    },
    computed: {
      transform() {
        return `translate3d(${this.translateX}px,0,0)`
      },
      indexTranslateX() {
        return -this.index * this.width
      },
      controlIndex() {
        const {index} = this
        if (!this.infinity) return index
        const {size} = this
        return index ? index === size - 1 ? 0 : index - 1 : size - 3
      }
    },
    watch: {
      index() {
        this.resetTranslateX()
      }
    },
    mounted() {
      const {infinity} = this
      const {list} = this.$refs
      this.index = +infinity

      on(window, 'resize', this.resize = throttle(() => {
        this.width = list.clientWidth
        this.resetTranslateX()
      }), 300)

      this.resize()

      const {children} = list

      const size = children.length

      this.realSize = size
      this.size = infinity ? size + 2 : size

      if (infinity) {
        this.firstItem = children[0]
        this.lastItem = children[size - 1]
      }

      this.autoPlay(this.index + 1)
    },
    destroyed() {
      off(window, 'resize', this.resize)
      this.resize = null
    },
    methods: {
      resetTranslateX() {
        this.translateX = this.indexTranslateX
      },
      moveStart() {
        this.transition = false
        this.translateStart = this.translateX
        clearTimeout(this.autoTimeout)
      },
      moving(e) {
        this.translateX = this.translateStart + e.changedX
      },
      moveEnd() {
        const {indexTranslateX, threshold, translateX} = this

        if (indexTranslateX === translateX) return

        let {index} = this

        if (indexTranslateX - threshold > translateX) {
          index++
        } else if (indexTranslateX + threshold < translateX) {
          index--
        }

        this.transition = true
        this.index = intervalVal(0, this.size - 1, index)
        this.resetTranslateX()
      },
      transitionEnd() {
        this.transition = false

        let {index, size} = this

        const isLast = index === size - 1

        if (!this.infinity) return this.autoPlay(isLast ? 0 : index + 1)

        if (!index) {
          index = size - 2
        } else if (isLast) {
          index = 1
        }

        this.index = index
        this.autoPlay(index + 1)
      },
      autoPlay(index) {
        if (!this.autoInterval) return
        this.autoTimeout = setTimeout(() => {
          this.transition = true
          this.index = index
        }, this.autoInterval)
      }
    }
  }
</script>
<style lang="stylus" module>
  .container
    max-width 100%
    overflow hidden

  .list
    font-size 0
    white-space nowrap

    &.transition
      transition transform .3s

    > li
      display inline-block
      width 100%

  .line-control
    font-size 0
    background-color $back-color

    > li
      display inline-block
      height 2px

      &.current
        background-color $highlight-color
</style>
