import Vue from 'vue'

import {pick, omit} from 'lodash'

const RouterLink = Vue.component('router-link')

const ROUTER_PROPS = ['to', 'replace', 'append', 'tag', 'exact', 'events', 'exact-active-class']

export default {
  functional: true,
  render(h, {children, data, props}) {
    const isNormalLink = /^(https?:)?\/\//.test(props.to)
    const attrs = omit(props, ROUTER_PROPS)
    const classes = [data.staticClass, data.class]
    return h(isNormalLink ? 'a' : RouterLink, isNormalLink ? {
      class: classes,
      attrs: {
        href: props.to,
        ...attrs
      }
    } : {
      attrs,
      props: pick(props, ROUTER_PROPS),
      class: classes
    }, children)
  }
}
