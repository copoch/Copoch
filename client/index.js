import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'
import {
  BrowserRouter as Router
} from 'react-router-dom'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
