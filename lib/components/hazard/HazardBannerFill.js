import React from 'react'

import classNames from 'classnames'
import styles from './HazardBannerFill.scss'

const HazardBannerFill = ({ className }) => {
  return (
    <div className={ classNames(styles.banner, className) } />
  )
}

export default HazardBannerFill
