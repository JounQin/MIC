function getTitle(vm) {
  const {title} = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

const serverTitleMixin = {
  created() {
    const title = getTitle(this)
    if (title) {
      this.$ssrContext.title = `Made-in-China.com | ${title}`
    }
  }
}

const clientTitleMixin = {
  mounted() {
    const title = getTitle(this)
    if (title) {
      document.title = `Made-in-China.com | ${title}`
    }
  }
}

export default __SERVER__ ? serverTitleMixin : clientTitleMixin
