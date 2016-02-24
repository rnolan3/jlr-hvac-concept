import { combineReducers } from 'redux'
import airCirculation from './airCirculation'
import bootSequence from './bootSequence'
import defrost from './defrost'
import fan from './fan'
import temperature from './temperature'

const rootReducer = combineReducers({
  airCirculation,
  bootSequence,
  defrost,
  fan,
  temperature
})

export default rootReducer
