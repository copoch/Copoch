import React from 'react'
import Koa from 'koa'
import qs from 'qs'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import configureStore from '../common/store/configureStore'
import { fetchCounter } from '../common/api/counter'
import App from '../common/containers/App'

const app = new Koa()
const port = 9999

const handleRender = async (ctx) => {
  const apiResult = await fetchCounter()
  const request = ctx.request
  const params = qs.parse(request.querystring)
  const counter = parseInt(params.counter, 10) || apiResult || 0
  //
  const preloadedState = { counter }
  const store = configureStore(preloadedState)

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const finalState = store.getState()

  ctx.body = renderFullPage(html, finalState)
}

const renderFullPage = (html, preloadedState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.use(handleRender);

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})

