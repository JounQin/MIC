<template lang="pug">
  div(:class="$style.container", v-touch="{methods: true}")
    ol.list-unstyled(:class="[$style.list, {[$style.transition]: transition}]",
    :style="{transform}", ref="list", @transitionend="transitionEnd")
      li(v-if="lastItem", :class="Array.from(lastItem.classList)", v-html="lastItem.innerHTML")
      slot
      li(v-if="firstItem", :class="Array.from(firstItem.classList)", v-html="firstItem.innerHTML")
</template>
<script>
  import {intervalVal} from 'utils'

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
        firstItem: null,
        lastItem: null
      }
    },
    computed: {
      transform() {
        return `translate3d(${this.translateX}px,0,0)`
      },
      indexTranslateX() {
        return -this.index * this.width
      }
    },
    mounted() {
      const {infinity} = this
      const {list} = this.$refs
      this.index = +infinity
      this.width = list.clientWidth
      this.resetTranslateX()

      const {children} = list

      const size = children.length

      this.size = infinity ? size + 2 : size

      if (!infinity) return

      this.firstItem = children[0]
      this.lastItem = children[size - 1]
    },
    methods: {
      resetTranslateX() {
        this.translateX = this.indexTranslateX
      },
      moveStart() {
        this.transition = false
        this.translateStart = this.translateX
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

        this.index = intervalVal(0, this.size - 1, index)
        this.transition = true
        this.resetTranslateX()
      },
      transitionEnd() {
        this.transition = false

        if (!this.infinity) return

        let {index, size} = this

        if (!index) {
          index = size - 2
        } else if (index === size - 1) {
          index = 1
        }

        this.index = index
        this.resetTranslateX()
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
</style>
