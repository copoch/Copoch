import { connect } from 'react-redux'
import Page from '../components/Page'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => ({
  essay: state.essay
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page))

