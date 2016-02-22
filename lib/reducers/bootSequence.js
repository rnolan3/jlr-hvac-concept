import * as types from '../constants/ActionTypes'

const initialState = {
  stage: 0
}

export default function bootSequence (state = initialState, action) {
  switch (action.type) {
    case types.ADVANCE_BOOT_SEQUENCE:
      return Object.assign({}, state, { stage: ++state.stage })

    default:
      return state
  }
}
