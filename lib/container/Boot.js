import React, { Component, PropTypes } from 'react'
import styles from './Boot.scss'

export default class Boot extends Component {
  static propTypes = {
    gridCount: PropTypes.number,
    transitionOutDelay: PropTypes.number
  };

  static defaultProps = {
    gridCount: 40,
    transitionOutDelay: 8200
  };

  renderGrid () {
    let row = []
    for (let i = 1; i <= this.props.gridCount; i++) {
      row.push(<div className={ styles['row' + i] } key={ i } />)
    }
    return row
  }

  render () {
    return (
      <div>
        { this.renderGrid() }
      </div>
    )
  }
}
