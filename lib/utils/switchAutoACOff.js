export default function switchAutoACOff () {
  try {
    carIndicator.extras.controlAuto = false
    sendRVIHVAC('hvac/control_auto', carIndicator.extras.controlAuto)
  } catch (e) {
    console.log(e)
  }
}
