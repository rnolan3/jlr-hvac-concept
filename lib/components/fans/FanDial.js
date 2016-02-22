import React, { Component, PropTypes } from 'react'
import Dial from '../misc/Dial'
import FanDirGroup from '../fans/FanDirGroup'

import styles from './FanDial.scss'

export default class FanDial extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    fan: PropTypes.object.isRequired
  };

  handleDialChange = (value) => {
    this.props.actions.setFanSpeed(value)
  };

  render () {
    const { actions, fan } = this.props
    return (
      <div className={ styles.wrapper }>
        <Dial
          className={ styles.speedDial }
          defaultValue={ fan.fanSpeed }
          handleClassName={ styles.speedHandle }
          onChange={ this.handleDialChange } />
        <FanDirGroup
          actions={ actions }
          fan={ fan } />
      </div>
    )
  }
}
