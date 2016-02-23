import * as types from '../constants/ActionTypes'

/**
 *
 * Boot Sequence Action Creators
 *
 */

/**
 * Triggers an event to the boot sequence reducer to advance the boot sequence
 * process. This is critical in creating choreographed onload animations.
 * @return {Object} Returns an action type.
 */
export function advanceBootSequence () {
  return { type: types.ADVANCE_BOOT_SEQUENCE }
}
