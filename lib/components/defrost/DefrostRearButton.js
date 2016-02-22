import React from 'react'
import DefrostButton from './DefrostButton'

import styles from './DefrostRearButton.scss'

const DefrostRearButton = (props) => {
  return (<DefrostButton { ...props } icon={ styles.icon } />)
}

export default DefrostRearButton
