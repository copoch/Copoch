import { connect } from 'react-redux'
import Home from '../components/Home'
import * as HomeActions from '../actions/home.action'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => ({
  counter: state.counter
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(HomeActions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
