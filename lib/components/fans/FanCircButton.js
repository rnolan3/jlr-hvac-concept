import React from 'react'
import StandardButton from '../misc/StandardButton'

import styles from './FanCircButton.scss'

const FanCircButton = (props) => {
  return (
    <StandardButton { ...props }>
      <span className={ styles.icon } />
    </StandardButton>
  )
}

export default FanCircButton
