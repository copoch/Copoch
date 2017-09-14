import { connect } from 'react-redux'
import Home from '../components/Home'
import * as HomeActions from '../actions'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => ({
  counter: state.initData
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(HomeActions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
