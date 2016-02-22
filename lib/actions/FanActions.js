import * as types from '../constants/ActionTypes'
import { handleAirflowDirection } from '../utils/airflow'

const DIRECTION_DOWN = 1
const DIRECTION_FORWARD = 2
const DIRECTION_UP = 4

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

export function toggleFanDirForward (on) {
  handleAirflowDirection(on, DIRECTION_FORWARD)
  return { type: types.TOGGLE_FAN_DIR_FORWARD }
}

export function toggleFanDirDown (on) {
  handleAirflowDirection(on, DIRECTION_DOWN)
  return { type: types.TOGGLE_FAN_DIR_DOWN }
}

export function toggleFanDirUp (on) {
  handleAirflowDirection(on, DIRECTION_UP)
  return { type: types.TOGGLE_FAN_DIR_UP }
}
