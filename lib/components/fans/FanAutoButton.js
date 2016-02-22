import React from 'react'
import StandardButton from '../misc/StandardButton'

import styles from './FanAutoButton.scss'

const FanAutoButton = (props) => {
  return (
    <StandardButton { ...props }
      className={ styles.base }
      value="Auto" />
  )
}

export default FanAutoButton
