import React from 'react'

import DefrostFrontButton from './DefrostFrontButton'
import DefrostMaxButton from './DefrostMaxButton'
import DefrostRearButton from './DefrostRearButton'

import styles from './DefrostGroup.scss'

const DefrostGroup = ({ actions, defrost }) => {
  return (
    <div className={ styles.buttonGroup }>
      <DefrostMaxButton active={ defrost.defrostMax } onClick={ actions.toggleMaxDefrost } />
      <DefrostFrontButton active={ defrost.defrostFront }  onClick={ actions.toggleFrontDefrost } />
      <DefrostRearButton active={ defrost.defrostRear }  onClick={ actions.toggleRearDefrost } />
    </div>
  )
}

export default DefrostGroup
