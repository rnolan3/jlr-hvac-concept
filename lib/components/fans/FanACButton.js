import React from 'react'
import StandardButton from '../misc/StandardButton'

const FanACButton = ({ active, onClick }) => {
  return (
    <StandardButton active={ active }
      onClick={ onClick }
      value="A/C" />
  )
}

export default FanACButton
