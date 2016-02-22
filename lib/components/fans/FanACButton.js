import React from 'react'
import StandardButton from '../misc/StandardButton'

const FanACButton = (props) => {
  return (
    <StandardButton { ...props } value="A/C" />
  )
}

export default FanACButton
