import React, { Component, PropTypes } from 'react'

import classNames from 'classnames/bind'
import styles from './Dial.scss'

let cx = classNames.bind(styles)

const max = Math.max
const min = Math.min

const requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame

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
    barSize: 27,
    canvasSize: 480,
    defaultValue: 0,
    fanSpeedHigh: 750,
    fanSpeedLow: 1400,
    max: 10,
    min: 0,
    maxArc: 120
  };

  state = {
    activate: false,
    deg: (this.props.defaultValue + this.props.min) / (this.props.max - this.props.min) * 100,
    dragging: false,
    transitionDuration: 18,
    value: this.props.defaultValue
  };

  componentDidMount () {
    const metrics = this.refs.bar.getBoundingClientRect()
    this.canvasSize2 = metrics.height / 2
    this.borderCtx = this.refs.border.getContext('2d')
    this.barCtx = this.refs.bar.getContext('2d')

    this.animateBg()
    this.animateArc(this.barCtx, this.state.deg, 0, {
      size: this.props.barSize,
      color: '#fff'
    }, 1)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.defaultValue !== this.state.value) {
      let deg = this.calculateDeg(nextProps.defaultValue)

      this.setState({
        deg: deg,
        value: nextProps.defaultValue
      })

      this.animateArc(this.barCtx, deg, this.state.deg, {
        size: this.props.barSize,
        color: '#fff'
      }, deg > this.state.deg ? 1 : -1)
    }
  }

  animateArc = (ctx, endPerc = 360, current = 0, styles, direction = 1, steps = 4) => {
    let next = current + (steps * direction)

    this.clearCanvas(this.barCtx)
    this.drawArc(ctx, current, styles)

    this.setState({
      deg: current
    })

    if ((next < endPerc && direction === 1) || (next > endPerc && direction === -1)) {
      requestAnimationFrame(() => this.animateArc(ctx, endPerc, next, styles, direction))
    } else if ((current < endPerc && direction === 1) || (current > endPerc && direction === -1)) {
      requestAnimationFrame(() => this.animateArc(ctx, endPerc, endPerc, styles, direction))
    }
  };

  animateBg = (current = 0) => {
    let rangeLine = current < this.props.maxArc - 15 ? current : this.props.maxArc - 15
    let styles = {
      color: 'rgba(255, 255, 255, .2)',
      size: 4,
      shim: 46
    }
    let arcSize = this.canvasSize2 - styles.size - (styles.shim || 0)
    let endAngle1 = current * (Math.PI / 180)
    let endAngle2 = current * (Math.PI / 180) + (Math.PI)
    this.clearCanvas(this.borderCtx)

    this.borderCtx.beginPath()
    this.borderCtx.arc(this.canvasSize2, this.canvasSize2, arcSize, 0, endAngle1)
    this.borderCtx.strokeStyle = styles.color
    this.borderCtx.lineWidth = styles.size
    this.borderCtx.lineCap = 'round'
    this.borderCtx.setLineDash([ 0 ])
    this.borderCtx.stroke()

    this.borderCtx.beginPath()
    this.borderCtx.arc(this.canvasSize2, this.canvasSize2, arcSize, Math.PI, endAngle2)
    this.borderCtx.strokeStyle = styles.color
    this.borderCtx.lineWidth = styles.size
    this.borderCtx.lineCap = 'round'
    this.borderCtx.setLineDash([ 0 ])
    this.borderCtx.stroke()

    this.drawArc(this.borderCtx, rangeLine, {
      color: 'rgba(255, 255, 255, .2)',
      lineDash: [ 5, 10 ],
      shim: 56,
      size: 5
    })

    if (current < 358) {
      requestAnimationFrame(() => this.animateBg(current + 7))
    } else if (typeof this.props.onInit === 'function') {
      this.props.onInit()
    }
  };

  clearCanvas = (ctx) => {
    const { canvasSize } = this.props
    ctx.clearRect(0, 0, canvasSize, canvasSize)
  };

  calculateDeg = (deg) => {
    return (deg + this.props.min) / (this.props.max - this.props.min) * 100
  };

  drawArc = (ctx, degrees, styles) => {
    if (degrees === 0) {
      degrees = 1
    }

    let arcSize = this.canvasSize2 - styles.size - (styles.shim || 0)
    let relStartAngle = (-90 + this.props.angleOffset)
    let startAngle = relStartAngle * (Math.PI / 180)
    let endAngle = (relStartAngle + degrees) * (Math.PI / 180)

    ctx.beginPath()
    ctx.arc(this.canvasSize2, this.canvasSize2, arcSize, startAngle, endAngle)
    ctx.strokeStyle = styles.color
    ctx.lineWidth = styles.size
    ctx.lineCap = 'round'

    if (styles.lineDash) {
      ctx.setLineDash(styles.lineDash)
    }

    ctx.stroke()
  };

  PI2 = 2 * Math.PI;
  x = 0;
  y = 0;
  w2 = 0;

  //angleArc = this.props.maxArc;
  angleOffset = this.props.angleOffset * Math.PI / 180;
  angleArc = this.props.maxArc * Math.PI / 180;

  handleTouchMove = (event) => {
    const offset = this.refs.dial.getBoundingClientRect()
    this.x = offset.left
    this.y = offset.top
    this.w2 = offset.width / 2

    let touch = event.touches.item(0)
    let v = this.xy2val(touch.pageX, touch.pageY)
    let degrees = this.calculateDeg(v)

    this.renderBar(degrees)
    this.setState({ value: v, deg: degrees, dragging: true })

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.state.value)
    }
  };

  handleTouchEnd = () => {
    this.setState({ dragging: false })
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

  renderBar = (degrees) => {
    const { barSize } = this.props
    const styles = { color: '#fff', size: barSize }
    this.clearCanvas(this.barCtx)
    this.drawArc(this.barCtx, degrees, styles)
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
    const { value, deg, dragging } = this.state
    const classes = cx({
      dial: true,
      dragging: dragging
    })

    return (
      <div className={ classes }
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
        <div className={ styles.progress } style={ { transform: `translate(-50%, -50%) rotate(${ deg + this.props.angleOffset }deg)` } }>
          <div className={ styles.handle } />
          { this.renderLabel() }
        </div>
      </div>
    )
  }
}
