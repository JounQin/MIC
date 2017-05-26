import vm from 'vm'
import _axios from 'axios'
import encoding from 'encoding'
import Router from 'koa-router'
import {Random} from 'mockjs'

const JSONP_CALLBACK = 'jsonpCallback'

const parseJsonp = ({data}, convert) =>
  vm.runInNewContext(`const ${JSONP_CALLBACK} = v => v; ${convert ? encoding.convert(data, 'utf8', 'gbk') : data}`)

const axios = _axios.create({
  headers: {
    Host: null
  }
})

const router = new Router({prefix: '/api'})
  .get('/fetch-user', async ctx => {
    const {cookies} = ctx
    const userId = cookies.get('userId')
    ctx.body = {
      userId,
      userName: userId && cookies.get('userName'),
      unreadMsg: userId && Random.boolean()
    }
  })
  .get('/search-suggest', async ctx => {
    const {keyword} = ctx.query || ''
    const url = 'https://keywordsuggestions.made-in-china.com/suggest/getEnProdSuggest.do'
    ctx.body = keyword.trim() ? parseJsonp(await axios.get(url, {
      params: {
        count: 5,
        kind: 5,
        call: JSONP_CALLBACK,
        param: encodeURIComponent(keyword)
      }
    })) : []
  })

export default app => app.use(router.routes()).use(router.allowedMethods())
