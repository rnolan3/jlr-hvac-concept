/* eslint no-console: 0 */

/**
 * Air Circulation Action Creators
 *
 * These action creators return an action type and the changed settings to
 * the store.
 *
 * These action creators interface with `carIndiactor`.
 *
 */

import * as types from '../constants/ActionTypes'
import { setAirFlowDirectionStatus } from '../utils/airflow'

/**
 * Toggle Air Recirculation setting.
 * @param  {Boolean} airCirculationSetting Turn air recirculation on or off.
 * @return {Object}       Returns action type and setting.
 */
export function toggleAirRecirculation (airCirculationSetting) {
  carIndicator.setStatus('airRecirculation', airCirculationSetting)
  return { type: types.TOGGLE_AIR_RECIRCULATION, airCirculationSetting }
}

/**
 * Toggles the Air Conditioning setting (e.g. on or off).
 * @return {Object}   Returns the toggle ac action type.
 */
export function toggleAC () {
  carIndicator.setStatus('Fan', !carIndicator.status.fan)
  carIndicator.setStatus('ACCommand', !carIndicator.status.fan)
  return { type: types.TOGGLE_AC }
}

/**
 * Toggle auto mode.
 * @param  {Boolean} autoState Auto climate control's next state
 * @return {Object}  Returns TURN_AUTO_ON or TURN_AUTO_OFF action type, and
 *                           automatic climate control settings
 */
export function toggleAuto (autoState) {
  let action, autoSettings = {}

  // Turn auto mode on
  if (autoState) {
    action = types.TURN_AUTO_ON
    // TODO: Change airflow direction from an int value to the fan direction key value pattern.
    autoSettings = {
      fanSpeed: carIndicator.status.fanSpeed,
      airflowDirection: carIndicator.status.airflowDirection,
      airRecirculation: carIndicator.status.airRecirculation,
      targetTemperatureRight: carIndicator.status.targetTemperatureRight,
      targetTemperatureLeft: carIndicator.status.targetTemperatureLeft,
      defrostMax: carIndicator.extras.defrostMax
    }

    carIndicator.setStatus('fanSpeed', 0)

    setAirFlowDirectionStatus(0)

    carIndicator.setStatus('Fan', true)
    carIndicator.setStatus('ACCommand', true)
    carIndicator.setStatus('airRecirculation', false)
    carIndicator.setStatus('RecircReq', 0)
    carIndicator.extras.controlAuto = true
  } else {
    action = types.TURN_AUTO_OFF
    carIndicator.extras.controlAuto = false
  }

  try {
    sendRVIHVAC('hvac/control_auto', carIndicator.extras.controlAuto)
    sendRVIHVAC('hvac/defrost_max', carIndicator.extras.defrostMax)
  } catch (e) {
    console.log('Toggle auto:', e)
  }

  return { type: action, autoSettings }
}
