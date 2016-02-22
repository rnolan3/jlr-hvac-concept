import React from 'react'
import DefrostButton from './DefrostButton'

import styles from './DefrostMaxButton.scss'

const DefrostMaxButton = ({ active, onClick }) => {
  return (<DefrostButton
    active={ active }
    icon={ styles.icon }
    onClick={ onClick } />)
}

export default DefrostMaxButton
