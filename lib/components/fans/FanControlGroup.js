import React from 'react'

import FanAutoButton from './FanAutoButton'
import FanACButton from './FanACButton'
import FanCircButton from './FanCircButton'

import styles from './FanControlGroup.scss'

const FanControlGroup = ({ actions, airCirculation }) => {
  return (
    <div className={ styles.wrapper }>
      <FanAutoButton active={ airCirculation.autoMode } onClick={ actions.toggleAuto } />
      <FanACButton active={ airCirculation.ac } onClick={ actions.toggleAC } />
      <FanCircButton active={ airCirculation.airRecirculation } onClick={ actions.toggleAirRecirculation } />
    </div>
  )
}

export default FanControlGroup
