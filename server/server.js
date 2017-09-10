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
import App from '../common/containers/App'
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
import { insertDocuments, findDocuments } from './db'
import router from './router'

import { blog as blogApi } from './api'

const app = new Koa()
const port = 9999
const compiler = webpack(webpackConfig)

// shorthand
const join = path.join

// app.use(koaMiddleware({
//   compiler,
//   dev: {
//     noInfo: true,
//     publicPath: webpackConfig.output.publicPath,
//     stats: {
//       colors: true
//     }
//   }
// }))

// const handleRender = async (ctx) => {
//   const insertResult = await insertDocuments({
//     api: 'mtop.copoch.website.queryBlogList',
//     params: {
//       title: 'hello',
//       content: '你好，世界！！！'
//     }
//   })

//   if (insertResult.status) {
//     const findResult = await findDocuments({
//       api: 'mtop.copoch.website.queryBlogList',
//       params: {
//         title: 'hello',
//         content: '你好，世界！！！'
//       }
//     })
//   }

  // const apiResult = await fetchCounter()
  // const request = ctx.request

  // if (request.path !== '/' ) {
  //   return
  // }

  // const params = qs.parse(request.querystring)
  // const counter = parseInt(params.counter, 10) || apiResult || 0
  // //
  // const preloadedState = { counter }
  // const store = configureStore(preloadedState)

  // const html = renderToString(
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // )

  // const finalState = store.getState()

  // ctx.body = renderFullPage(html, finalState)
// }

// const renderFullPage = (html, preloadedState) => {
//   return `
//     <!doctype html>
//     <html>
//       <head>
//         <meta charset="utf-8" />
//         <title>Redux Universal</title>
//       </head>
//       <body>
//         <div id="app">${html}</div>
//         <script>
//           window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
//         </script>
//         <script src="/static/main.js"></script>
//       </body>
//     </html>
//     `
// }

app.use(logger())
// app.use(handleRender);
app.use(koaBody({
  multipart: true
}))
app.use(koaStatic(join(__dirname, 'public')))
app.use(koaViews(join(__dirname, 'views'), {
  map: {
    html: 'ejs'
  }
}))

app.keys = ['hello', 'world']
app.use(session(app))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})

