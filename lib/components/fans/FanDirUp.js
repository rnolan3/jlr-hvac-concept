import React from 'react'
import FanDirArrow from './FanDirArrow'

import classNames from 'classnames/bind'
import styles from './FanDirUp.scss'

let cx = classNames.bind(styles)

const FanDirUp = ({ active, onClick }) => {
  const classes = cx({
    base2: true,
    on: active
  })

  return (
    <button
      className={ classes }
      onClick={ onClick }>
      <FanDirArrow className={ styles.arrow } direction="up" />
    </button>
  )
}

export default FanDirUp
