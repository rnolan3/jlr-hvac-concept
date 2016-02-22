import { combineReducers } from 'redux'
import airCirculation from './airCirculation'
import bootSequence from './bootSequence'
import defrost from './defrost'
import fan from './fan'

const rootReducer = combineReducers({
  airCirculation,
  bootSequence,
  defrost,
  fan
})

export default rootReducer
