/* eslint no-console: 0 */

/**
 * Fan Action Creators
 *
 * These action creators return an action type and the changed settings to
 * the store.
 *
 * These action creators interface with `carIndiactor`.
 *
 */

import * as types from '../constants/ActionTypes'
import { handleAirflowDirection } from '../utils/airflow'

const DIRECTION_DOWN = 1
const DIRECTION_FORWARD = 2
const DIRECTION_UP = 4

/**
 * Sets the fan speed.
 * @param {Integer} fanSpeed Fan speed setting. Range from 0 to 10.
 * @return {Object} Returns Fan Speed action type and fan speed setting.
 */
export function setFanSpeed (fanSpeed) {
  if (fanSpeed === 0) {
    carIndicator.setStatus('airflowDirection', 0)
  } else {
    try {
      carIndicator.extras.controlAuto = false
      sendRVIHVAC('hvac/control_auto', carIndicator.extras.controlAuto)
    } catch (e) {
      console.log(e)
    }
  }

  return { type: types.SET_FAN_SPEED, fanSpeed }
}

/**
 * Toggle forward fan vents
 * @param  {Boolean} on
 * @return {Object}    Returns fan forward action type.
 */
export function toggleFanDirForward (on) {
  handleAirflowDirection(on, DIRECTION_FORWARD)
  return { type: types.TOGGLE_FAN_DIR_FORWARD }
}

/**
 * Toggle down fan vents
 * @param  {Boolean} on
 * @return {Object}    Returns fan down action type.
 */
export function toggleFanDirDown (on) {
  handleAirflowDirection(on, DIRECTION_DOWN)
  return { type: types.TOGGLE_FAN_DIR_DOWN }
}

/**
 * Toggle up fan vents
 * @param  {Boolean} on
 * @return {Object}    Returns fan up action type.
 */
export function toggleFanDirUp (on) {
  handleAirflowDirection(on, DIRECTION_UP)
  return { type: types.TOGGLE_FAN_DIR_UP }
}
