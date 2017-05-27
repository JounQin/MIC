import vm from 'vm'
import axios from 'axios'
import encoding from 'encoding'
import Router from 'koa-router'
import {Random} from 'mockjs'

const JSONP_CALLBACK = 'jsonpCallback'

const parseJsonp = ({data}, convert) =>
  vm.runInNewContext(`const ${JSONP_CALLBACK} = v => v; ${convert ? encoding.convert(data, 'utf8', 'gbk') : data}`)

const LINK_PREFIX = 'https://m.made-in-china.com/special/'

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
    })).map(({word}) => word) : []
  })
  .get('/fetch-banners', async ctx => {
    ctx.body = [{
      link: 'happy-children-s-day',
      img: '8f4j00dvsQYupaJDio/made-in-china.jpg'
    }, {
      link: 'new-star-products',
      img: '8f4j00DBvtbdgqbLVp/made-in-china.jpg'
    }, {
      link: 'green-furnishing',
      img: '8f4j00bCZaKpVMrDWn/made-in-china.jpg'
    }, {
      link: 'outdoor-vehicle',
      img: '8f4j00bMSEIzidZPhV/made-in-china.jpg'
    }].map(banner => {
      banner.link = LINK_PREFIX + banner.link
      return banner
    })
  })

export default app => app.use(router.routes()).use(router.allowedMethods())
