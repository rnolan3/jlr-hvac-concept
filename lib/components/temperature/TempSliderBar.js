import React, { Component, PropTypes } from 'react'
import TempSliderHandle from './TempSliderHandle'

import classNames from 'classnames/bind'
import styles from './TempSliderBar.scss'

let cx = classNames.bind(styles)

export default class TempSliderBar extends Component {
  static propTypes = {
    direction: PropTypes.string,
    dragging: PropTypes.bool,
    perc: PropTypes.number,
    value: PropTypes.number
  };
  
  state = {
    activate: false,
    transitionDuration: 1000
  };

  componentDidMount () {
    this.activate()
  }

  activate = () => {
    setTimeout(() => {
      this.setState({ activate: true })
      setTimeout(() => {
        this.setState({ transitionDuration: 25 })
      }, this.state.transitionDuration + 1)
    }, 1)
  };

  render () {
    const { dragging, direction, perc, value } = this.props
    const heatOpacity = dragging ? perc / 100 : 0
    const heatStyle = { opacity: heatOpacity }

    const barClasses = cx({
      bar: true,
      left: direction !== 'right',
      right: direction === 'right'
    })

    const height = this.state.activate ? perc : 0

    return (
      <div className={ barClasses } style={ { transitionDuration: this.state.transitionDuration + 'ms', height: `${ height }%` } }>
        <div className={ styles.heatBar } style={ heatStyle } />
        <div className={ styles.barTrim } />
        <TempSliderHandle
          direction={ direction }
          perc={ perc }
          value={ value } />
      </div>
    )
  }
}
