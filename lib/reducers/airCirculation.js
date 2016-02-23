/* eslint no-console: 0  */
import * as types from '../constants/ActionTypes'
import { toggleSetting, setKey } from '../utils/immutable'

/**
 * Air circulation settings
 * @type {Object}
 */
const initialState = {
  ac: false,
  autoMode: false,
  airRecirculation: false,
  targetTemperatureRight: 0,
  targetTemperatureLeft: 0
}

export default function airCirculation (state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_MAX_DEFROST:
    case types.SET_FAN_SPEED:
      return Object.assign({}, state, {
        autoMode: false
      })

    case types.TOGGLE_AIR_RECIRCULATION:
      return setKey(state, 'airRecirculation', action.airCirculationSetting)

    case types.TOGGLE_AC:
      return toggleSetting(state, 'ac')

    case types.TURN_AUTO_ON:
      let autoSettings = action.autoSettings
      return Object.assign({}, state, {
        autoMode: true,
        airRecirculation: autoSettings.airRecirculation
      })

    case types.TURN_AUTO_OFF:
      return Object.assign({}, state, {
        autoMode: false
      })

    default:
      return state
  }
}
