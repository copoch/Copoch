import { combineReducers } from 'redux'
import counter from './counter'
import page from './page'

const rootReducer = combineReducers({
  counter,
  page
})

export default rootReducer
