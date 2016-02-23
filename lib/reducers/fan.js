import * as types from '../constants/ActionTypes'
import { toggleSetting, setKey } from '../utils/immutable'

/**
 * Fan direction and speed settings
 * @type {Object}
 */
const initialState = {
  airflowDirectionUp: false,
  airflowDirectionDown: false,
  airflowDirectionForward: false,
  fanSpeed: 3
}

export default function fan (state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_MAX_DEFROST:
    case types.TOGGLE_FRONT_DEFROST:
      let fanSpeed = (action.defrostMax || action.defrostFront) ? 10 : state.fanSpeed
      return Object.assign({}, state, {
        fanSpeed: fanSpeed,
        prevSpeed: state.fanSpeed
      })

    case types.TOGGLE_FAN_DIR_FORWARD:
      return toggleSetting(state, 'airflowDirectionForward')

    case types.TOGGLE_FAN_DIR_DOWN:
      return toggleSetting(state, 'airflowDirectionDown')

    case types.TOGGLE_FAN_DIR_UP:
      return toggleSetting(state, 'airflowDirectionUp')

    case types.SET_FAN_SPEED:
      return setKey(state, 'fanSpeed', action.fanSpeed)

    case types.TURN_AUTO_ON:
      return Object.assign({}, state, {
        fanSpeed: action.autoSettings.fanSpeed
      })

    default:
      return state
  }
}
