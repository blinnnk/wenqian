/*
* @author KaySaith
* @date 2018-01-30
*/

export default class Main {
  constructor(canvas, onDraw) {
    this.drawFrame(canvas, onDraw)
  }

  drawFrame(canvas, onDraw) {
    let context = canvas.getContext('2d')
    drawDetail()
    function drawDetail() {
      let animation = requestAnimationFrame(drawDetail)
      if (typeof onDraw === 'function') {
        context.clearRect(0, 0, canvas.width, canvas.height)
        onDraw(context, animation)
      }
    }
  }
}