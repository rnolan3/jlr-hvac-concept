import React from 'react'
import FanDirArrow from './FanDirArrow'

import classNames from 'classnames/bind'
import styles from './FanDirDown.scss'

let cx = classNames.bind(styles)

const FanDirDown = ({ active, onClick }) => {
  const classes = cx({
    base: true,
    on: active
  })

  return (
    <button
      className={ classes }
      onClick={ onClick }>
      <FanDirArrow className={ styles.arrow } direction="down" />
    </button>
  )
}

export default FanDirDown
