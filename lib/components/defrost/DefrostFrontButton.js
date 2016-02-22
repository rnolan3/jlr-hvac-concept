import React from 'react'
import DefrostButton from './DefrostButton'

import styles from './DefrostFrontButton.scss'

const DefrostFrontButton = (props) => {
  return (<DefrostButton { ...props } icon={ styles.icon } />)
}

export default DefrostFrontButton
