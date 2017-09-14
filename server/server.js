import React from 'react'
import Koa from 'koa'
import qs from 'qs'
import path from 'path'
import fs from 'fs'
import os from 'os'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import configureStore from '../common/store/configureStore'
import { fetchCounter } from '../common/api/counter'
import { fetchDemo } from '../common/api/essay'
// import App from '../common/containers/App'
import webpack from 'webpack'
import webpackConfig from '../webpack.config'
import koaMiddleware from 'koa-webpack';
import session from 'koa-session';
import rawBody from 'raw-body';
import auth from 'koa-basic-auth'
import mount from 'koa-mount'
import co from 'co'
import koaBody from 'koa-body'
import koaStatic from 'koa-static'
import compose from 'koa-compose'
import koaCSRF from 'koa-csrf'
import logger from 'koa-logger'
import koaViews from 'koa-views'
import parseurl from 'parseurl'

//
import {
  StaticRouter as Router
} from 'react-router'

// import Index from '../common/containers'
import router from './route'
import { Blog } from './subapps'

const appMap = {
  '/blog': Blog
}
const app = new Koa()
const port = 9999
const compiler = webpack(webpackConfig)

// shorthand
const join = path.join

app.use(koaMiddleware({
  compiler,
  dev: {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true
    }
  }
}))

const initRender = async (ctx) => {
  const request = ctx.request

  const params = qs.parse(request.querystring)

  console.log(request.url, parseurl(request))
  let counter = parseInt(params.counter, 10)

  if (!counter) {
    counter = await fetchCounter()
    !counter && (counter =  0)
  }

  const demoData = await fetchDemo()
  const preloadedState = { counter, essay: demoData }
  const store = configureStore(preloadedState)
  const context = {}
  const markup = renderToString(
    <Provider store={store}>
      <Router
        location={ctx.url}
        context={context}>
        <App />
      </Router>
    </Provider>
  )

  if (context.url) {
    ctx.status = 301
    ctx.redirect(context.url)
    ctx.body = 'Redirecting to ' + context.url
  } else {
    ctx.status = 200
    ctx.body = `
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
          <script src="/static/main.js"></script>
        </body>
      </html>
    `
  }
}

app.use(logger())
// app.use(initRender);
// app.use(koaBody({
//   multipart: true
// }))
// app.use(koaStatic(join(__dirname, 'public')))
// app.use(koaViews(join(__dirname, 'views')), {
//   map: {
//     html: 'ejs'
//   }
// })
// app.keys = ['hello', 'world']
// app.use(session(app))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})

