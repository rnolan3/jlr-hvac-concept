import React from 'react'

import classNames from 'classnames/bind'
import styles from './TempSliderRail.scss'

let cx = classNames.bind(styles)

const TempSliderRail = ({ direction }) => {
  const classes = cx({
    rail: true,
    left: direction !== 'right',
    right: direction === 'right'
  })

  return (<div className={ classes } />)
}

export default TempSliderRail
