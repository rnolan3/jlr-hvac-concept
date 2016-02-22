import React from 'react'
import StandardButton from '../misc/StandardButton'

import styles from './FanAutoButton.scss'

const FanAutoButton = ({ active, onClick }) => {
  return (<StandardButton active={ active }
    className={ styles.base }
    onClick={ onClick }
    value="Auto" />)
}

export default FanAutoButton
