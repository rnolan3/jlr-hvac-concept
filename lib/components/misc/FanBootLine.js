import React, { Component, PropTypes } from 'react'

import styles from './FanBootLine.scss'
import classNames from 'classnames/bind'

let cx = classNames.bind(styles)

export default class FanBootLine extends Component {
  static propTypes = {
    bootStage: PropTypes.number.isRequired,
    onComplete: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.onComplete()
    this.refs.line.addEventListener('webkitTransitionEnd', () => {
      this.props.onComplete()
    })
  }

  render () {
    const classes = cx({
      line: true,
      active: this.props.bootStage >= 1,
      complete: this.props.bootStage >= 3
    })

    return <div className={ classes } ref="line" />
  }
}
