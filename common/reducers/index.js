import { combineReducers } from 'redux'
import counter from './counter'
import page from './page'
import essay from './essay'

const rootReducer = combineReducers({
  counter,
  page,
  essay
})

export default rootReducer
