/* eslint no-console: 0 */

/**
 * Target Temperature Action Creators
 *
 * These action creators return an action type and the changed setting to
 * the store.
 *
 * These action creators interface with `carIndiactor`.
 *
 */

import * as types from '../constants/ActionTypes'

/**
 * Set the target temperature in a dual climate system.
 * @param {String} side Value must be 'Left' or 'Right'
 * @param {Integer} deg  Desired temperature in celsius
 */
function setTargetTemperature (side, deg) {
  try {
    carIndicator.setStatus('FrontTSet' + side + 'Cmd', deg)
  } catch (err) {
    console.log(err, 'FrontTSet' + side + 'Cmd carIndicator.setStatus failed')
  }

  try {
    carIndicator.setStatus('targetTemperature' + side + '', deg)
  } catch (err) {
    console.log(err, 'targetTemperature' + side + ' carIndicator.setStatus failed')
  }

  return { type: types.SET_TARGET_TEMPERATURE, side, deg }
}

export function setTargetTemperatureLeft (deg) {
  return setTargetTemperature('Left', deg)
}

export function setTargetTemperatureRight (deg) {
  return setTargetTemperature('Right', deg)
}
