import React, { Component, PropTypes } from 'react'
import HeatedSeatStep from './HeatedSeatStep'

import classNames from 'classnames/bind'
import styles from './HeatedSeatButton.scss'

let cx = classNames.bind(styles)

export default class HeatedSeatButton extends Component {
  static propTypes = {
    direction: PropTypes.string
  };

  static defaultProps = {
    direction: 'left'
  };

  state = {
    steps: 0
  };

  handleClick = () => {
    let steps = ++this.state.steps

    if (steps > 3) {
      steps = 0
    }

    this.setState({ steps })
  };

  renderSteps () {
    let steps = []
    for (let i = 0; i < this.state.steps; i++) {
      steps.push(<HeatedSeatStep key={ i } />)
    }
    return steps
  }

  render () {
    const { direction } = this.props
    const classes = cx({
      button: true,
      left: direction === 'left',
      right: direction === 'right',
      on: this.state.step > 1
    })

    return (
      <div className={ classes } onClick={ this.handleClick }>
        <div className={ styles.steps }>
          { this.renderSteps() }
        </div>
      </div>
    )
  }

}

export default HeatedSeatButton
