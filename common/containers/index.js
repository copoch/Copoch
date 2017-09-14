import { connect } from 'react-redux'
import Page from '../components/Page'
import * as PageActions from '../actions/page'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => ({
  counter: state.initData
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(PageActions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page))
