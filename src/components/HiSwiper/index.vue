<template lang="pug">
  div(:class="$style.container")
    ol.list-unstyled(:class="$style.list", :style="{transform}")
      slot
</template>
<script>
  import {on} from 'utils'

  export default {
    name: 'HiSwiper',
    data() {
      return {
        translateX: 0,
        translateStart: 0
      }
    },
    computed: {
      transform() {
        return `translate3d(${this.translateX}px,0,0)`
      }
    },
    mounted() {
      on(this.$el, 'scroll', e => {
        console.log('scrolling')
      })
    }
  }
</script>
<style lang="stylus" module>
  .container
    max-width 100%
    overflow-x auto
    overflow-y hidden

  .list
    font-size 0
    white-space nowrap

    > li
      display inline-block
</style>
