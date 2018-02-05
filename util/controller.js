/*
* @author KaySaith
* @date 2018-01-30
*/

import { Component } from '../common/component'

export default class Controller {
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
        // 画背景色放到每个页面draw()里面，分开画因为history页面背景色不一样   @shangqi
        // Component.drawBackground(context)
        onDraw(context, animation)
      }
    }
  }
}
