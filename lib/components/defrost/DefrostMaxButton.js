import React from 'react'
import DefrostButton from './DefrostButton'

import styles from './DefrostMaxButton.scss'

const DefrostMaxButton = (props) => {
  return (<DefrostButton { ...props } icon={ styles.icon } />)
}

export default DefrostMaxButton
