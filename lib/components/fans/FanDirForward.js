import React from 'react'
import FanDirArrow from './FanDirArrow'

import classNames from 'classnames/bind'
import styles from './FanDirForward.scss'

let cx = classNames.bind(styles)

const FanDirForward = ({ active, onClick }) => {
  const classes = cx({
    base: true,
    on: active
  })

  return (
    <button
      className={ classes }
      onClick={ onClick }>
      <FanDirArrow className={ styles.arrow } direction="left" />
    </button>)
}

export default FanDirForward
