<template lang="pug">
  #app
    .mask(v-if="mask", @click="clickMask")
    hi-loading(v-if="progress")
    hi-progress(:progress="progress")
    transition(:name="transition")
      keep-alive
        router-view(v-if="keepAlive")
    transition(:name="transition")
      router-view(v-if="!keepAlive")
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'

  import HiLoading from 'HiLoading'
  import HiProgress from 'HiProgress'

  export default {
    name: 'app',
    data: () => ({transition: 'slide-fade'}),
    computed: {
      ...mapGetters(['progress', 'mask']),
      keepAlive() {
        const {$route} = this
        const keepAlive = $route.meta.keepAlive
        return keepAlive == null ? !Object.keys({...$route.params, ...$route.query}).length : keepAlive
      }
    },
    methods: {
      ...mapActions(['clickMask'])
    },
    components: {
      HiLoading,
      HiProgress
    }
  }
</script>
<style src="styles/app.styl" lang="stylus"></style>
