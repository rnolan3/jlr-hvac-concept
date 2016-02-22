import React, { Component, PropTypes } from 'react'

import classNames from 'classnames/bind'
import styles from './FanSpeedControl.scss'

let cx = classNames.bind(styles)

export default class FanSpeedControl extends Component {

  static propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.object,
    options: PropTypes.number
  };

  static defaultProps = {
    label: 'Fan Speed',
    options: 4
  };

  state = {
    active: 0
  };

  handleDrag = (event) => {
    let touch = event.touches.item(0)
    let fanSpeed = 0
    this.dragging = true

    for (let i = 0; i < this.props.options; i++) {
      let offset = this.refs[`option${ i }`].getBoundingClientRect()

      if (touch.pageX >= offset.left) {
        fanSpeed = i + 1
      }
    }

    this.setState({ fanSpeed })

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(fanSpeed)
    }
  };

  renderSpeedOptions () {
    let speedOptions = []
    let classes

    for (let i = 0; i < this.props.options; i++) {
      classes = cx({
        option: true,
        active: this.state.fanSpeed > i
      })

      speedOptions.push(
        <div
          className={ classes }
          key={ i }
          ref={ `option${ i }` } />)
    }

    return speedOptions
  }

  render () {
    const { label } = this.props
    return (
      <div className={ styles.wrapper }
        onTouchMove={ this.handleDrag }
        onTouchStart={ this.handleDrag }>
        { this.renderSpeedOptions() }
        <div className={ styles.label }>
          { label }
        </div>
      </div>
    )
  }
}
