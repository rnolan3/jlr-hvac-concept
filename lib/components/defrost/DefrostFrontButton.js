import React from 'react'
import DefrostButton from './DefrostButton'

import styles from './DefrostFrontButton.scss'

const DefrostFrontButton = ({ active, onClick }) => {
  return (<DefrostButton
    active={ active }
    icon={ styles.icon }
    onClick={ onClick } />)
}

export default DefrostFrontButton
