/*
* @author KaySaith
* @date 2018-01-30
*/

import { Component } from '../common/component'

export const Controller = (onDraw) => {
  (function drawDetail() {
    let animation = requestAnimationFrame(drawDetail)
    if (typeof onDraw === 'function')
      Component.context.clearRect(
        0, 0,
        Component.ScreenSize.width,
        Component.ScreenSize.height
      )
      Component.drawBackground(Component.context)
      onDraw(Component.context, animation)
  })()
}