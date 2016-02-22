import React from 'react'

import classNames from 'classnames'
import styles from './HazardMarker.scss'

const HazardMarker = ({ id, className }) => {
  return (<div className={ classNames(styles['marker-' + id], className) } />)
}

export default HazardMarker
