<template lang="pug">
  div(:class="$style.container", v-touch="{methods: true}")
    ol.list-unstyled(:class="[$style.list, {[$style.transition]: transition}]",
    :style="{transform}", ref="list", @transitionend="transitionEnd")
      li(v-if="lastItem", :class="Array.from(lastItem.classList)", v-html="lastItem.innerHTML")
      slot
      li(v-if="firstItem", :class="Array.from(firstItem.classList)", v-html="firstItem.innerHTML")
    ol.list-unstyled(v-if="controlType !== 'none'", :class="$style[`${controlType}Control`]")
      li(v-for="i in actualSize",
      :class="{[$style.current]: controlIndex === i - 1}",
      :style="controlType === 'line' && {width: 100 / (infinity ? size - 2 : size) + '%'}",
      @click="toggleControlIndex(i - 1 + +infinity)")
</template>
<script>
  import {throttle} from 'lodash'

  import {intervalVal, on, off} from 'utils'

  const CONTROL_TYPES = ['none', 'line', 'point']

  export default {
    name: 'hi-swiper',
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
        validator: val => !val || val >= 1500
      },
      controlType: {
        type: String,
        default: CONTROL_TYPES[0],
        validator: val => CONTROL_TYPES.includes(val)
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
        actualSize: 0,
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
    created() {
      const {infinity} = this
      this.index = +infinity
      const size = this.actualSize = this.$slots.default.length
      this.size = infinity ? size + 2 : size
    },
    mounted() {
      const {list} = this.$refs

      on(window, 'resize', this.resize = throttle(() => {
        this.width = list.clientWidth
        this.resetTranslateX()
      }, 300))

      this.resize()

      if (this.infinity) {
        this.firstItem = list.children[0]
        this.lastItem = list.children[this.actualSize - 1]
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
      },
      toggleControlIndex(index) {
        if (this.index === index) return
        clearTimeout(this.autoTimeout)
        this.transition = true
        this.index = index
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

  .line-control, .point-control
    font-size 0

    > li
      display inline-block

      &.current
        background-color $highlight-color

  .line-control
    background-color $back-color

    > li
      height 2px

  .point-control
    text-align center
    margin-bottom 8px

    > li
      size 7px
      border-radius 50%
      background-color $remark-lighter-color

      + li
        margin-left 8px
</style>
