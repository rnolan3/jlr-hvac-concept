/*
 * Copyright (c) 2013, Intel Corporation, Jaguar Land Rover
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NOTE:
 * When it came to the airflow direction, the next setting state is passed
 * instead basing the next state a DOM node class.
 *
 *
 */

/* eslint no-console: 0 */

/**
 * Sets AirflowDirection status to all the corresponding signals.
 * @method setAirFlowDirectionStatus
 * @param newStatus {Integer} a new AirflowDirection status value
 */
export function setAirFlowDirectionStatus (newStatus) {
  carIndicator.setStatus('airflowDirection', newStatus)
  // Send new state to car.
  carIndicator.setStatus('FLHSDistrCmd', newStatus)
  carIndicator.setStatus('FRHSDistrCmd', newStatus)
}

/**
 * Changes the status of AirflowDirection.
 * @method changeAirflowDirectionStatus
 * @param button {Boolean} AirflowDirection button
 * @param currentStatus {Integer} current status of AirflowDirection
 * @param value {Integer} AirflowDirection button value
 * @return newStatus {Integer} a new status of AirflowDirection
 */
function changeAirflowDirectionStatus (buttonIsOn, currentStatus, value) {
  let newStatus

  if (buttonIsOn) {
    newStatus = currentStatus + value
  } else {
    newStatus = currentStatus - value
  }
  return newStatus
}

export function handleAirflowDirection (buttonIsOn, buttonChangeByValue) {
  let currentStatus = carIndicator.status.airflowDirection

  if (carIndicator.status.fanSpeed == 0) {
    carIndicator.setStatus('fanSpeed', 3)
  }

  if ((currentStatus >= 0) && (currentStatus <= 7)) {// && (carIndicator.status.fanSpeed !== 0)) {
    let newStatus = changeAirflowDirectionStatus(buttonIsOn, currentStatus, buttonChangeByValue)
    setAirFlowDirectionStatus(newStatus)

    if (newStatus == 0) {
      carIndicator.setStatus('fanSpeed', 0)
    }
  }
}

export function switchAutoACOff () {
  try {
    carIndicator.extras.controlAuto = false
    sendRVIHVAC('hvac/control_auto', carIndicator.extras.controlAuto)
  } catch (e) {
    console.log(e)
  }
}
