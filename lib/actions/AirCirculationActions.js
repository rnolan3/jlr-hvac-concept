import * as types from '../constants/ActionTypes'
import { setAirFlowDirectionStatus } from '../utils/airflow'

export function toggleAirRecirculation (isOn) {
  carIndicator.setStatus('airRecirculation', isOn)
  return { type: types.TOGGLE_AIR_RECIRCULATION, isOn }
}

export function toggleAC () {
  carIndicator.setStatus('Fan', !carIndicator.status.fan)
  carIndicator.setStatus('ACCommand', !carIndicator.status.fan)
  return { type: types.TOGGLE_AC }
}

export function toggleAuto (toggleAuto) {
  let action, autoSettings = {}

  if (toggleAuto) {
    action = types.TURN_AUTO_ON
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
