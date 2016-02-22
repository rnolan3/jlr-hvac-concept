import React, { Component } from 'react'
import Boot from './Boot'
import Hvac from './HVAC'

export default class App extends Component {
  state = {
    loaded: false
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ loaded: true })
    }, 250)
  }

  renderHvac () {
    if (this.state.loaded) {
      return <Hvac />
    }
  }

  render () {
    return (
      <div>
        <Boot />
        { this.renderHvac() }
      </div>
    )
  }
}

//

export default App
