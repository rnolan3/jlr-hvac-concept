import * as airCirculation from './AirCirculationActions'
import * as bootSequence from './BootSequenceActions'
import * as defrost from './DefrostActions'
import * as fan from './FanActions'

export default Object.assign(airCirculation, bootSequence, defrost, fan)
