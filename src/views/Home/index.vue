<template lang="pug">
  mic-header
</template>
<script>
  import MicHeader from './MicHeader'

  export default {
    name: 'home',
    async asyncData({store}) {
      await store.dispatch('fetchUser')
    },
    components: {
      MicHeader
    }
  }
</script>

