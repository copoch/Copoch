import React from 'react'
import KoaRouter from 'koa-router'
import qs from 'qs'
// import { register, login } from '../db/models/Account'
import { fetchCounter } from '../../common/api/counter'
import { fetchDemo } from '../../common/api/essay'
import configureStore from '../../common/store/configureStore'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import {
  StaticRouter as Router
} from 'react-router'

import Index from '../../common/containers'
import { Blog } from '../subapps'

const appMap = {
  'index': Index,
  'blog': Blog
}

const router = new KoaRouter()
const generateMarkup = (markup, store, entry) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Redux Universal</title>
      </head>
      <body>
        <div id="app">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/${entry}.js"></script>
      </body>
    </html>
  `
}
const render = async (ctx, getInitData = () => {}) => {
  const app = ctx.params.app
  const AppIndex = appMap[app]
  const demoData = await getInitData()
  const preloadedState = { initData: demoData }
  const store = configureStore(preloadedState)
  const context = {}
  const markup = renderToString(
    <Provider store={store}>
      <Router
        location={ctx.url}
        context={context}>
        <AppIndex />
      </Router>
    </Provider>
  )

  if (context.url) {
    ctx.status = 301
    ctx.redirect(context.url)
    ctx.body = 'Redirecting to ' + context.url
  } else {
    ctx.status = 200
    ctx.body = generateMarkup(markup, store, app)
  }
}

router
  .get('/', (ctx, next) => {
    ctx.params.app = 'index'
    return render(ctx, async () => {
      const request = ctx.request
      const params = qs.parse(request.querystring)
      let counter = parseInt(params.counter, 10)

      if (!counter) {
        counter = await fetchCounter()
        !counter && (counter =  0)
      }

      return await counter
    })
  })
  .get('/:app', (ctx, next) => {
    return render(ctx, fetchDemo)
  })
  // .get('/register', (ctx, next) => {
  //   return ctx.render('register', {
  //     title: '注册页面',
  //     flashMessage: ''
  //   })
  // })
  // .post('/register', async (ctx, next) => {
  //   const {phone, password, confirmPassword} = ctx.request.body

  //   if (!phone || !password) {
  //     ctx.throw(400)
  //     return
  //   }

  //   if (password !== confirmPassword) {
  //     ctx.throw(400, '两次输入密码不一致')
  //     return
  //   }

  //   const {status, message} = await register(phone, password)

  //   return ctx.render('register', {
  //     title: '注册页面',
  //     flashMessage: message
  //   })
  // })
  // .get('/login', (ctx, next) => {
  //   if (!ctx.session.isLogin) {
  //     ctx.session.isLogin = false
  //   }

  //   return ctx.render('login', {
  //     title: '登录页面',
  //     flashMessage: '',
  //     isLogin: ctx.session.isLogin
  //   })
  // })
  // .post('/login', async (ctx, next) => {
  //   const {phone, password} = ctx.request.body

  //   if (!phone || !password) {
  //     ctx.throw(400)
  //     return
  //   }

  //   const {status, message} = await login(phone, password)
  //   const isLogin = status && true || false

  //   ctx.session.isLogin = isLogin

  //   return ctx.render('login', {
  //     title: '登录页面',
  //     flashMessage: message,
  //     isLogin
  //   })
  // })

export default router
