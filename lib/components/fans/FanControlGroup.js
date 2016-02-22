import React from 'react'

import FanAutoButton from './FanAutoButton'
import FanACButton from './FanACButton'
import FanCircButton from './FanCircButton'

import styles from './FanControlGroup.scss'

const FanControlGroup = ({ actions, airCirculation, bootSequence }) => {
  const activate = bootSequence.stage === 2
  return (
    <div className={ styles.wrapper }>
      <FanAutoButton activate={ activate } active={ airCirculation.autoMode } onClick={ actions.toggleAuto } />
      <FanACButton activate={ activate } active={ airCirculation.ac } onClick={ actions.toggleAC } />
      <FanCircButton activate={ activate } active={ airCirculation.airRecirculation } onClick={ actions.toggleAirRecirculation } />
    </div>
  )
}

export default FanControlGroup
