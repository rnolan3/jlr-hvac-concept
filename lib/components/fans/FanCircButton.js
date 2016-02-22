import React from 'react'
import StandardButton from '../misc/StandardButton'

import styles from './FanCircButton.scss'

const FanCircButton = ({ active, onClick }) => {
  return (
    <StandardButton active={ active } onClick={ onClick }>
      <span className={ styles.icon } />
    </StandardButton>
  )
}

export default FanCircButton
