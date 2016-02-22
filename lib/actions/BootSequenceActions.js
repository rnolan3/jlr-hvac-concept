import * as types from '../constants/ActionTypes'

export function advanceBootSequence () {
  return { type: types.ADVANCE_BOOT_SEQUENCE }
}
