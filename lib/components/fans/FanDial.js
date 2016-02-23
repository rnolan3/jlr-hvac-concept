import React, { Component, PropTypes } from 'react'
import Dial from '../misc/Dial'
import FanDirGroup from '../fans/FanDirGroup'

import CSSTransitionGroup from 'react-addons-css-transition-group'

import styles from './FanDial.scss'

export default class FanDial extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    bootSequence: PropTypes.object.isRequired,
    fan: PropTypes.object.isRequired
  };

  handleDialChange = (value) => {
    this.props.actions.setFanSpeed(value)
  };

  renderFanDir () {
    const { actions, bootSequence, fan } = this.props
    if (bootSequence.stage >= 3) {
      return (<FanDirGroup
        actions={ actions }
        fan={ fan } />)
    }
  }

  render () {
    const { actions, fan } = this.props
    return (
      <div className={ styles.wrapper }>
        <Dial
          className={ styles.speedDial }
          defaultValue={ fan.fanSpeed }
          handleClassName={ styles.speedHandle }
          onChange={ this.handleDialChange }
          onInit={ actions.advanceBootSequence } />
        <CSSTransitionGroup
          transitionAppear
          transitionAppearTimeout={ 90000 }
          transitionEnterTimeout={ 1000 }
          transitionLeaveTimeout={ 1000 }
          transitionName="simpleFade">
          { this.renderFanDir() }
        </CSSTransitionGroup>
      </div>
    )
  }
}
