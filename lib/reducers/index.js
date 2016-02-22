import { combineReducers } from 'redux'
import airCirculation from './airCirculation'
import defrost from './defrost'
import fan from './fan'

const rootReducer = combineReducers({
  airCirculation,
  defrost,
  fan
})

export default rootReducer
