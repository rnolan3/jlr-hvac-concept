import React, { Component, PropTypes } from 'react'

import classNames from 'classnames/bind'
import styles from './StandardButton.scss'

let cx = classNames.bind(styles)

export default class StardButton extends Component {
  static propTypes = {
    activate: PropTypes.bool,
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    value: PropTypes.string
  };

  state = {
    activted: false
  };

  componentDidMount () {
    this.refs.bar.addEventListener('webkitTransitionEnd', this.handleTransitionEnd)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.activate) {
      const metrics = this.refs.button.getBoundingClientRect()
      const parentMetrics = this.refs.button.parentNode.parentNode.getBoundingClientRect()

      this.setState({
        top: metrics.bottom - parentMetrics.top
      })
    }
  }

  handleTransitionEnd = () => {
    this.setState({
      activated: true
    })
  };

  handleClick = () => {
    const { active, onClick } = this.props
    if (typeof onClick === 'function') {
      onClick(!active)
    }
  };

  render () {
    const { active, children, className, value } = this.props
    const { top } = this.state
    const classes = cx({
      activated: this.state.activated,
      base: true,
      on: active
    }, className)

    return (
      <button className={ classes } onClick={ this.handleClick } ref="button">
        <div className={ styles.value }>{ children || value  }</div>
        <i className={ styles.bar } ref="bar" style={ { top } } />
      </button>
    )
  }
}
