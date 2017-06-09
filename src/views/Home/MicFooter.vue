<template lang="pug">
  footer.text-center(:class="$style.footer")
    div(:class="$style.links")
      router-link(to="/about")
        span About
      router-link(to="/terms")
        span Terms
      router-link(to="/privacy")
        span Privacy
      router-link(to="/contact")
        span Contact
    div(:class="$style.links")
      router-link(to="/about")
        span Hot Products
      router-link(to="/privacy")
        span Hot Products Price
      router-link(to="/contact")
        span Wholesale Hot Products
    div(:class="$style.copyright") Copyright © 2017 Focus Technology Co., Ltd. All Rights Reserved.
</template>
<script>

</script>
<style lang="stylus" module>
  .footer
    margin-top 25px
    padding-bottom 25px

  .links
    + .links
      margin-top 10px

      a
        padding-left 0
        padding-right 0

    a
      padding-left 10px
      padding-right 10px
      color $primary-color

      span
        display inline-block
        scaleSize($smaller-size)

      + a
        border-left 1px solid $border-color

  .copyright
    relative()
    display block
    left 50%
    margin-top 2px
    scaleSize($smaller-size,, translate3d(-50%, 0, 0))
    width (14 / 12 * 100) %
    color $icon-color
    white-space nowrap
</style>
