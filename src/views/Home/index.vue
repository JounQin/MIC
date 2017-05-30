<template lang="pug">
  div
    mic-header
    hi-swiper(:infinity="true")
      li(v-for="{link, img} of banners")
        router-link(:to="link")
          img.img-full(:src="img | imgPath")
</template>
<script>
  import MicHeader from './MicHeader'
  import HiSwiper from 'components/HiSwiper'

  import {mapGetters} from 'vuex'

  export default {
    name: 'home',
    async asyncData({store}) {
      await store.dispatch('fetchUser')
      await store.dispatch('fetchBanners')
    },
    computed: {
      ...mapGetters(['banners'])
    },
    components: {
      MicHeader,
      HiSwiper
    }
  }
</script>
