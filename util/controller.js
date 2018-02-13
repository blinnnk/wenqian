/*
* @author KaySaith
* @date 2018-01-30
*/

import { Component } from '../common/component'
import { Utils } from '../util/utils'

export const Controller = (onDraw) => {
  (function drawDetail() {
    let animation = requestAnimationFrame(drawDetail)
    if (typeof onDraw === 'function')
      Utils.sequentialExecution({
        early: (hasFinished) => {
          Component.context.clearRect(
            0, 0,
            Component.ScreenSize.width,
            Component.ScreenSize.height
          )
          hasFinished()
        },
        later: () => {
          Component.drawBackground(Component.context)
          onDraw(Component.context, animation)
        }
      })
  })()
}
