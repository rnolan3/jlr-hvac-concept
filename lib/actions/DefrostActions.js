/* eslint no-console: 0 */

/**
 * Defrost Action Creators
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
 * Toggles the max defrost setting.
 * @param  {Object} on  Declare the max defrost setting (on or off).
 * @return {Object}    Returns Max Defrost action type and setting.
 */
export function toggleMaxDefrost (on) {
  if (on) {
    carIndicator.setStatus('fanSpeed', 5)
    // Send new state to car.
    carIndicator.setStatus('FrontBlwrSpeedCmd', 15)

    setAirFlowDirectionStatus(4)

    try {
      carIndicator.setStatus('rearDefrost', true)
    } catch (err) {
      console.log(err,'rearDefrost setStatus failed')
    }

    try {
      carIndicator.setStatus('frontDefrost', true)
    } catch (err) {
      console.log(err, 'frontDefrost setStatus failed')
    }
  }

  try {
    sendRVIHVAC('hvac/defrost_max', carIndicator.extras.defrostMax)
  } catch (err) {
    console.log(err)
  }

  return { type: types.TOGGLE_MAX_DEFROST, defrostMax: on }
}

/**
 * Toggles the front defrost setting.
 * @param  {Boolean} on  Declare the front defrost setting (on or off).
 * @return {Object}     Returns Front Defrost action type and setting.
 */
export function toggleFrontDefrost (on) {
  try {
    carIndicator.setStatus('frontDefrost', !carIndicator.status.frontDefrost)
  } catch (err) {
    console.log(err, 'setStatus frontDefrost failed')
  }

  if (carIndicator.extras.defrostMax && !carIndicator.status.frontDefrost) {
    carIndicator.extras.defrostMax = false
    sendRVIHVAC('hvac/defrost_max', carIndicator.extras.defrostMax)
  }

  return { type: types.TOGGLE_FRONT_DEFROST, defrostFront: on }
}

/**
 * Toggles the rear defrost setting.
 * @param  {Boolean} on Declare the rear defrost setting (on or off).
 * @return {Object}     Returns Rear Defrost action type and setting.
 */
export function toggleRearDefrost (on) {
  try {
    carIndicator.setStatus('rearDefrost', !carIndicator.status.rearDefrost)
  } catch (err) {
    console.log(err, 'setStatus rearDefrost failed')
  }

  if (carIndicator.extras.defrostMax && !carIndicator.status.rearDefrost) {
    carIndicator.extras.defrostMax = false
    sendRVIHVAC('hvac/defrost_max', carIndicator.extras.defrostMax)
  }

  return { type: types.TOGGLE_REAR_DEFROST, defrostRear: on  }
}
