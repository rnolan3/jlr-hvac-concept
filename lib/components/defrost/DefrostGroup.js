import React from 'react'

import DefrostFrontButton from './DefrostFrontButton'
import DefrostMaxButton from './DefrostMaxButton'
import DefrostRearButton from './DefrostRearButton'

import styles from './DefrostGroup.scss'

const DefrostGroup = ({ actions, bootSequence, defrost }) => {
  const activate = bootSequence.stage === 2
  return (
    <div className={ styles.buttonGroup }>
      <DefrostMaxButton activate={ activate } active={ defrost.defrostMax } onClick={ actions.toggleMaxDefrost } />
      <DefrostFrontButton activate={ activate } active={ defrost.defrostFront }  onClick={ actions.toggleFrontDefrost } />
      <DefrostRearButton activate={ activate } active={ defrost.defrostRear }  onClick={ actions.toggleRearDefrost } />
    </div>
  )
}

export default DefrostGroup
