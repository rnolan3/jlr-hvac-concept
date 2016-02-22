import React, { Component, PropTypes } from 'react'
import StandardButton from '../misc/StandardButton'

import classNames from 'classnames'
import styles from './DefrostButton.scss'

const {
  bool,
  func,
  string
} = PropTypes

export default class DefrostButton extends Component {
  static propTypes = {
    activate: bool,
    active: bool,
    icon: string,
    onClick: func
  };

  handleClick = () => {
    const { active, onClick } = this.props
    if (typeof this.props.onClick === 'function') {
      onClick(!active)
    }
  };

  render () {
    const iconClasses = classNames(styles.icon, this.props.icon)
    return (
      <StandardButton activate={ this.props.activate } active={ this.props.active } onClick={ this.handleClick }>
        <span className={ iconClasses } />
      </StandardButton>
    )
  }
}
