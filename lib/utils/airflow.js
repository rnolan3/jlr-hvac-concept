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
    newStatus = currentStatus - value
  } else {
    newStatus = currentStatus + value
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
