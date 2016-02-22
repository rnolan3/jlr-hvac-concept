import React from 'react'

import classNames from 'classnames/bind'
import styles from './HazardIndicator.scss'

let cx = classNames.bind(styles)

const HazardIndicator = ({ active, onClick }) => {

  // Indicator attributes
  const indicatorClasses = cx({
    indicator: true,
    indicatorActive: active
  })

  // Label attributes
  const label = 'Hazard On'
  const labelClasses = cx({
    label: true,
    visibleLabel: active
  })

  // Halo attributes
  const haloClasses = cx({
    halo: true,
    visibleHalo: active
  })

  return (
    <div className={ styles.wrapper } onClick={ onClick }>
      <div className={ indicatorClasses } />
      <div className={ labelClasses }>{ label }</div>
      <div className={ haloClasses } />
    </div>
  )
}

export default HazardIndicator
