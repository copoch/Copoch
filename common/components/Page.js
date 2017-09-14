import React from 'react'
import PropTypes from 'prop-types'
import {
  Route,
  Switch
} from 'react-router-dom'
import Header from './Header'
import NotFound from './NotFound'
import Home from '../containers/HomeContainer'
import About from './About'
import Topics from './Topics'
import Blog from '../subapps/blog'

const Page = (props) => (
  <div>
    <Header />

    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/blog' component={Blog} />
      <Route path='/topics' component={Topics} />
      <Route path='/about' component={About} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

// Page.propTypes = {

// }

export default Page
