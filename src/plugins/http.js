import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = (__SERVER__ ? INNER_SERVER : SERVER_PREFIX) + 'api'

if (__SERVER__) {
  Vue.mixin({
    beforeCreate() {
      Object.defineProperty(this, '$http', {value: this.$vnode && this.$ssrContext.axios})
    }
  })
} else {
  Object.defineProperty(Vue.prototype, '$http', {value: axios})
}
