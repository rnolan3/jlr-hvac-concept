import React, { Component, PropTypes } from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'

import HazardMarker from './HazardMarker'
import HazardIndicator from './HazardIndicator'
import HazardBannerFill from './HazardBannerFill'

import classNames from 'classnames/bind'
import styles from './HazardButton.scss'

let cx = classNames.bind(styles)

export default class HazardButton extends Component {
  static propTypes = {
    hazardTimerInterval: PropTypes.number,
    markers: PropTypes.number,
    value: PropTypes.string
  };

  static defaultProps = {
    hazardTimerInterval: 400,
    markers: 9,
    value: ''
  };

  state = {
    on: false
  };

  handleClick = () => {
    let { on } = this.state

    if (on) {
      // Lights OFF
      carIndicator.setStatus('DirectionIndicationINST',     0 )
      carIndicator.setStatus('DirectionIndicationMS',       0 )
      carIndicator.setStatus('UB_DirectionIndicationINST',  1 ) // this fails because no translation is set up...
      carIndicator.setStatus('UB_DirectionIndicationMS',    1 ) // this fails because no translation is set up...
      clearInterval(this._blink)
      this.setState({ on: false, blinking: false })
    } else {
      carIndicator.setStatus('DirectionIndicationINST',     3 )
      carIndicator.setStatus('DirectionIndicationMS',       3 )
      // TODO: Missing translation for UB_DirectionIndicationINST and UB_DirectionIndicationMS
      carIndicator.setStatus('UB_DirectionIndicationINST',  1 ) // this fails because no translation is set up...
      carIndicator.setStatus('UB_DirectionIndicationMS',    1 ) // this fails because no translation is set up...
      this.setState({ on: true, blinking: true })
    }
  };

  renderSideMarkers () {
    let markers = []

    if (this.state.on) {
      for (let i = 1; i <= this.props.markers; i++) {
        markers.push(<HazardMarker id={ i } key={ i } />)
      }
    }

    return (
      <CSSTransitionGroup
        transitionEnterTimeout={ 1000 }
        transitionLeaveTimeout={ 1000 }
        transitionName="markerExplode">
        { markers }
      </CSSTransitionGroup>
    )
  }

  renderHazardBackground () {
    return (
      <CSSTransitionGroup
        transitionEnterTimeout={ 1000 }
        transitionLeaveTimeout={ 1000 }
        transitionName="hazardBannerFill">
        { this.state.on && <HazardBannerFill /> }
      </CSSTransitionGroup>
    )
  }

  renderButton () {
    return (<HazardIndicator
      active={ this.state.on }
      onClick={ this.handleClick } />)
  }

  render () {
    let classes = cx({
      container: true,
      containerDiffuse: this.state.on
    })

    return (
      <div className={ classes }>
        { this.renderSideMarkers('left') }
        { this.renderHazardBackground() }
        { this.renderButton() }
      </div>
    )
  }
}
