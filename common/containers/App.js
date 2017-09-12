// import { connect } from 'react-redux'
// import Counter from '../components/counter'
// import * as CounterActions from '../actions'
// import { bindActionCreators } from 'redux'

// const mapStateToProps = (state) => ({
//   counter: state.counter
// })

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(CounterActions, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Counter)

import { connect } from 'react-redux'
import Page from '../components/Page'
import * as PageActions from '../actions/page'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => ({
  counter: state.counter
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(PageActions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page))
