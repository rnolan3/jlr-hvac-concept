import React from 'react'

import styles from './HeatedSeatStep.scss'

const HeatedSeatStep = () => {
  return (
    <div className={ styles.wrapper }>
      <svg
        className={ styles.line }
        height="67px"
        version="1.1"
        viewBox="0 0 8 67"
        width="18px"
        xmlns="http://www.w3.org/2000/svg" >
        <path
          d="M4.15365626,0 C-6.02934374,22 14.3396563,44 4.15365626,67"
          id="orange_wave"
          stroke="#ff604b"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
          />
      </svg>
    </div>
  )
}

export default HeatedSeatStep
