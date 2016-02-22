import React from 'react'

import classNames from 'classnames/bind'
import styles from './FanDirArrow.scss'

let cx = classNames.bind(styles)

const FanDirArrow = ({ className, on, direction }) => {
  const classes = cx({
    button: true,
    on: on,
    left: direction === 'left',
    down: direction === 'down',
    up: direction === 'up'
  }, className)

  return (<div className={ classes }></div>)
}

export default FanDirArrow
