import * as types from '../constants/ActionTypes'

const initialState = {
  defrostFront: false,
  defrostRear: false,
  defrostMax: false
}

export default function defrost (state = initialState, action) {
  switch (action.type) {
    case types.SET_FAN_SPEED:
      return Object.assign({}, state, {
        defrostMax: false
      })

    case types.TOGGLE_MAX_DEFROST:
      let isMaxOn = action.defrostMax === true
      return Object.assign({}, state, {
        defrostFront: isMaxOn,
        defrostRear: isMaxOn,
        defrostMax: action.defrostMax
      })

    case types.TOGGLE_FRONT_DEFROST:
      return Object.assign({}, state, {
        defrostFront: action.defrostFront,
        defrostMax: false
      })

    case types.TOGGLE_REAR_DEFROST:
      return Object.assign({}, state, {
        defrostRear: action.defrostRear,
        defrostMax: false
      })

    case types.TURN_AUTO_ON:
      return Object.assign({}, state, {
        defrostFront: action.autoSettings.defrostMax,
        defrostRear: action.autoSettings.defrostMax,
        defrostMax: action.autoSettings.defrostMax
      })

    default:
      return state
  }
}
