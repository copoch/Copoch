import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home'
import About from './About'
import Topics from './Topics'

const Page = ({}) => (
  <Router>
    <Header />

    <hr />

    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
    <Route path='/topics' component={Topics} />
  </Router>
)

Page.propTypes = {

}

export default Page
