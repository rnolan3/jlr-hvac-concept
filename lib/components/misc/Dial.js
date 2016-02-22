import React, { Component, PropTypes } from 'react'

import styles from './Dial.scss'

const max = Math.max
const min = Math.min

export default class Dial extends Component {
  static propTypes = {
    angleOffset: PropTypes.number,
    barSize: PropTypes.number,
    canvasSize: PropTypes.number,
    className: PropTypes.string,
    defaultValue: PropTypes.number,
    fanSpeedHigh: PropTypes.number,
    fanSpeedLow: PropTypes.number,
    max: PropTypes.number,
    maxArc: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func,
    onInit: PropTypes.func
  };

  static defaultProps = {
    angleOffset: -55,
    barSize: 22,
    canvasSize: 442,
    defaultValue: 0,
    fanSpeedHigh: 450,
    fanSpeedLow: 1000,
    max: 10,
    min: 0,
    maxArc: 120
  };

  state = {
    activate: false,
    deg: (this.props.defaultValue + this.props.min) / (this.props.max - this.props.min) * 100 + this.props.angleOffset,
    transitionDuration: 1000,
    value: this.props.defaultValue
  };

  componentDidMount () {
    this.animateDial()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.defaultValue !== this.state.value) {
      this.setState({
        deg: (nextProps.defaultValue + nextProps.min) / (nextProps.max - nextProps.min) * 100 + this.props.angleOffset,
        value: nextProps.defaultValue
      })

      this.animateDial()
    }
  }

  animateDial = () => {
    const metrics = this.refs.bar.getBoundingClientRect()
    this.canvasSize2 = metrics.height / 2

    let borderStyles = {
      color: 'rgba(255, 255, 255, .4)',
      size: 4,
      shim: 4
    }
    let nextDegree = this.props.angleOffset
    let maxDegree = (this.props.max + this.props.min) / (this.props.max - this.props.min) * 100 + this.props.angleOffset
    let animateBar = setInterval(() => {
      ++nextDegree

      if (nextDegree <= this.state.deg) {
        this.renderBar(nextDegree)
      }

      this.drawArc(this.refs.border, nextDegree, borderStyles)

      if (nextDegree >= maxDegree) {
        clearInterval(animateBar)
      }
    }, 5)
  };

  PI2 = 2 * Math.PI;
  x = 0;
  y = 0;
  w2 = 0;

  //angleArc = this.props.maxArc;
  angleOffset = this.props.angleOffset * Math.PI / 180;
  angleArc = this.props.maxArc * Math.PI / 180;

  startAngle = (-90 + this.props.angleOffset) * (Math.PI / 180);

  handleTouchMove = (event) => {
    const offset = this.refs.dial.getBoundingClientRect()
    this.x = offset.left
    this.y = offset.top
    this.w2 = offset.width / 2

    let touch = event.touches.item(0)
    let v = this.xy2val(touch.pageX, touch.pageY)
    let degrees =  (v + this.props.min) / (this.props.max - this.props.min) * 100 + this.props.angleOffset

    this.renderBar(degrees)
    this.setState({ value: v, deg: degrees })
  };

  handleTouchEnd = () => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.state.value)
    }
  };

  xy2val = (x, y) => {
    let a, ret

    a = Math.atan2(
      x - (this.x + this.w2),
      - (y - this.y - this.w2)
    ) - this.angleOffset

    if (this.angleArc != this.PI2 && (a < 0) && (a > -0.5)) {
      // if isset angleArc option, set to min if .5 under min
      a = 0
    } else if (a < 0) {
      a += this.PI2
    }

    ret = (a * (this.props.max - this.props.min) / this.angleArc) + this.props.min
    ret = max(min(ret, this.props.max), this.props.min)
    return ret
  };

  drawArc = (ref, degrees, styles) => {
    const { canvasSize } = this.props

    let ctx = ref.getContext('2d')
    let arcSize = this.canvasSize2 - styles.size + (styles.shim || 0)
    let endAngle = (-89 + degrees) * (Math.PI / 180)

    ctx.clearRect(0, 0, canvasSize, canvasSize)
    ctx.beginPath()
    ctx.arc(this.canvasSize2, this.canvasSize2, arcSize, this.startAngle, endAngle)
    ctx.strokeStyle = styles.color
    ctx.lineWidth = styles.size
    ctx.lineCap = 'round'
    ctx.stroke()
  };

  renderBar = (degrees) => {
    const { barSize } = this.props
    const styles = { color: '#fff', size: barSize }
    this.drawArc(this.refs.bar, degrees, styles)
  };

  renderLabel () {
    const { fanSpeedHigh, fanSpeedLow } = this.props
    const range = fanSpeedHigh - fanSpeedLow
    const perc = (this.state.value / this.props.max)
    const speed = perc > 0 ? perc * range + fanSpeedLow : 0

    return (
      <div className={ styles.label }>
        <div className={ styles.fan } style={ { animationDuration: `${ speed }ms` } } />
      </div>
    )
  }

  render () {
    const { canvasSize } = this.props
    const { value, deg } = this.state

    return (
      <div className={ styles.dial }
        onTouchEnd={ this.handleTouchEnd }
        onTouchMove={ this.handleTouchMove }
        ref="dial">
        <canvas
          className={ styles.barCanvas }
          height={ canvasSize }
          ref="bar"
          width={ canvasSize } />
        <canvas
          className={ styles.barCanvas }
          height={ canvasSize }
          ref="border"
          width={ canvasSize } />
        <h1 style={ { display: 'none' } }>{ Math.floor(value) }</h1>
        <div className={ styles.progress } style={ { transform: `translate(-50%, -50%) rotate(${ deg }deg)` } }>
          <div className={ styles.handle } />
          { this.renderLabel() }
        </div>
      </div>
    )
  }
}
