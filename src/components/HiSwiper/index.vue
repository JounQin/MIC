<template lang="pug">
  div(:class="$style.container", v-touch="{methods: true}")
    ol.list-unstyled(:class="$style.list", :style="{transform}")
      slot
</template>
<script>
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
    methods: {
      moveStart() {
        this.translateStart = this.translateX
      },
      moving(e) {
        this.translateX = this.translateStart + e.changedX
      },
      moveEnd() {

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

    > li
      display inline-block
</style>
