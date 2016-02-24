import React, { Component, PropTypes } from 'react'
import TempSliderBar from './TempSliderBar'
import TempSliderRail from './TempSliderRail'

import shallowCompare from 'react-addons-shallow-compare'
import classNames from 'classnames/bind'
import styles from './TempSlider.scss'

let cx = classNames.bind(styles)

export default class TempSlider extends Component {

  static propTypes = {
    className: PropTypes.string,
    direction: PropTypes.string,
    label: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  };

  static defaultProps = {
    direction: 'left',
    dragging: false,
    min: 16,
    max: 28
  };

  state = {
    perc: this.props.value ? this.props.value / this.props.max * 100 : 0
  };

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this.props, nextProps) ||
      shallowCompare(this.state, nextState)
  }

  handleTouch = (event) => {
    let offset = this.refs.slider.getBoundingClientRect()
    let touch = event.touches.item(0)
    let perc = (offset.bottom - touch.pageY) / offset.height

    if (perc > 1) {
      perc = 1
    } else if (perc < 0) {
      perc = 0
    }

    let value = perc * (this.props.max - this.props.min) + this.props.min

    this.setState({
      dragging: true,
      perc: perc * 100
    })

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(Math.floor(value))
    }
  };

  handleTouchEnd = () => {
    this.setState({ dragging: false })
  };

  render () {
    const { direction, label, value } = this.props
    const classes = cx({
      wrapper: true,
      sliderRight: direction === 'right',
      sliderLeft: direction === 'left'
    }, this.props.className)

    return (
      <div className={ classes }
        onTouchEnd={ this.handleTouchEnd }
        onTouchMove={ this.handleTouch }
        onTouchStart={ this.handleTouch }
        ref="slider">
        <div className={ styles.label }>{ label }</div>
        <TempSliderRail direction={ direction } />
        <TempSliderBar { ...this.state }
          direction={ direction }
          value={ value } />
      </div>
    )
  }

}
