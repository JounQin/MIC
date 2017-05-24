import Router from 'koa-router'
import {Random} from 'mockjs'

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

export default app => app.use(router.routes()).use(router.allowedMethods())
