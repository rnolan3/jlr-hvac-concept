/* eslint no-console: 0 */
import * as types from '../constants/ActionTypes'

export function toggleMaxDefrost (on) {
  if (on) {
    carIndicator.setStatus('fanSpeed', 5)
    // Send new state to car.
    carIndicator.setStatus('FrontBlwrSpeedCmd', 15)

  //  setAirFlowDirectionStatus(4)

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
