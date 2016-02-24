/* eslint no-console: 0  */
import * as types from '../constants/ActionTypes'
import { setKey } from '../utils/immutable'

/**
 * Target temperature settings
 * @type {Object}
 */
const initialState = {
  targetLeft: 25,
  targetRight: 21
}

export default function temperature (state = initialState, action) {
  switch (action.type) {
    case types.SET_TARGET_TEMPERATURE:
      return setKey(state, 'target' + action.side, action.deg)

    default:
      return state
  }
}
