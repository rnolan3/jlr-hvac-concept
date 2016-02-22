export default function drawArc (elem, size, radius, startAngle, endAngle) {
  let elemMetrics = elem.getBoundingClientRect
  let ctx = elem.getContext('2d')

  ctx.clearRect(0, 0, elemMetrics.height, elemMetrics.width)
  ctx.beginPath()
  ctx.arc(elemMetrics.width / 2, elemMetrics.height / 2, radius, startAngle, endAngle)
  ctx.strokeStyle = 'white'
  ctx.lineWidth = size
  ctx.lineCap = 'round'
  ctx.stroke()
}
