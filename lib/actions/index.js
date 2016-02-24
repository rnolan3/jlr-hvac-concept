import * as airCirculation from './AirCirculationActions'
import * as bootSequence from './BootSequenceActions'
import * as defrost from './DefrostActions'
import * as fan from './FanActions'
import * as temperature from './TemperatureActions'

export default Object.assign(airCirculation, bootSequence, defrost, fan, temperature)
