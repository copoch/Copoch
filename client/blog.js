import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '../common/store/configureStore'
import Index from '../common/subapps/blog/containers'
import {
  BrowserRouter as Router
} from 'react-router-dom'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)

render(
  <Provider store={store}>
    <Router>
      <Index />
    </Router>
  </Provider>,
  document.getElementById('app')
)
