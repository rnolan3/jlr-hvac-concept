import React from 'react'
import DefrostButton from './DefrostButton'

import styles from './DefrostRearButton.scss'

const DefrostRearButton = ({ active, onClick }) => {
  return (<DefrostButton
    active={ active }
    icon={ styles.icon }
    onClick={ onClick } />)
}

export default DefrostRearButton
