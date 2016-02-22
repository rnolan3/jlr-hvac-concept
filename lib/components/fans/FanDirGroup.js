import React from 'react'

import FanDirDown from './FanDirDown'
import FanDirForward from './FanDirForward'
import FanDirUp from './FanDirUp'

import styles from './FanDirGroup.scss'
import classNames from 'classnames'

export const FanDirGroup = ({ actions, className, fan }) => {
  const classes = classNames(styles.base, className)
  return (
    <div className={ classes }>
      <FanDirDown
        active={ fan.airflowDirectionDown }
        onClick={ actions.toggleFanDirDown } />
      <FanDirForward
        active={ fan.airflowDirectionForward }
        onClick={ actions.toggleFanDirForward } />
      <FanDirUp
        active={ fan.airflowDirectionUp }
        onClick={ actions.toggleFanDirUp } />
    </div>
  )
}

export default FanDirGroup
