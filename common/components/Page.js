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
import ShopCart from '../subapps/shopping-cart'

const Page = (props) => (
  <div>
    <Header />

    <ShopCart />

    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/topics' component={Topics} />
      <Route path='/about' component={About} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

// Page.propTypes = {

// }

export default Page
