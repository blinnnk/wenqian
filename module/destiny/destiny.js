/*
* @author KaySaith
* @date 2018-02-01
*/

import { UIKit } from '../../common/uikit'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'

let boxSize = Component.ScreenSize.width * 0.9
let shadowSize = Component.ScreenSize.width * 0.5
let boxTop = (Component.ScreenSize.height - boxSize) / 2.6
let boxLeft = Component.ScreenSize.width * 0.05
let loveBoxLeft = Component.ScreenSize.width * 0.05 + boxSize
var currentLeft = 0
var isOnEdge = false

let shadowImage = wx.createImage()
shadowImage.src = UIKit.imageSrc.shadow

let boxImage = wx.createImage()
boxImage.src = UIKit.imageSrc.box

let loveBoxImage = wx.createImage()
loveBoxImage.src = UIKit.imageSrc.loveBox

let loveShadowImage = wx.createImage()
loveShadowImage.src = UIKit.imageSrc.shadow

let boxRect = {
  width: boxSize,
  height: boxSize,
  left: boxLeft,
  top: boxTop,
}

let shadowTop = boxRect.top + boxRect.height - Component.ScreenSize.height * 0.08

let shadowRect = {
  width: shadowSize,
  height: shadowSize,
  left: shadowLeft,
  top: shadowTop
}
let shadowLeft = boxRect.left + Component.ScreenSize.width * 0.35

let loveBoxRect = {
  width: boxSize,
  height: boxSize,
  left: loveBoxLeft,
  top: boxTop,
}

let loveShadowRect = {
  width: shadowSize,
  height: shadowSize,
  left: loveShadowLeft,
  top: shadowTop
}
let loveShadowLeft = loveBoxRect.left + Component.ScreenSize.width * 0.35

var adaptingIPhoneXTop = 0
// 适配 iPhoneX 的齐刘海
Utils.isIPhoneX(function () {
  adaptingIPhoneXTop = 30
})

let backButtonRect = {
  width: UIKit.size.buttonWidth,
  height: UIKit.size.buttonHeight,
  left: Component.ScreenSize.width * 0.065,
  top: Component.ScreenSize.width * 0.1 + adaptingIPhoneXTop
}
let backImage = wx.createImage()
backImage.src = UIKit.imageSrc.back


export class DestinyPage {

  static backButtonRect = backButtonRect

  static draw(context, touchMoveX, direction, triggerEdgeCallback) {
    // 画背景色放到每个页面draw()里面，分开画因为history页面背景色不一样   @shangqi
    Component.drawBackground(context)

    Utils.drawCustomImage(context, backImage, backButtonRect)
    // 设定左右的边界滑动限制
    if (
      (boxRect.left <= boxLeft || direction == UIKit.direction.left) && 
      (loveBoxRect.left > boxLeft || direction == UIKit.direction.right)) {
      boxRect.left = boxLeft + touchMoveX
      shadowRect.left = shadowLeft + touchMoveX
      loveBoxRect.left = loveBoxLeft + touchMoveX
      loveShadowRect.left = loveShadowLeft + touchMoveX
      isOnEdge = false
    } else {
      isOnEdge = true
    }
    // 传递是否触发边界的回调
    if (typeof triggerEdgeCallback === 'function') {
      triggerEdgeCallback(isOnEdge)
    }

    Utils.drawImageAndMoveOvalPathWithAnimation(
      context,
      boxImage,
      boxRect,
      0.02,
      30,
      20
    )
    Utils.drawCustomImage(context, shadowImage, shadowRect)

    // 情感签筒
    Utils.drawImageAndMoveOvalPathWithAnimation(
      context,
      loveBoxImage,
      loveBoxRect,
      0.01,
      100,
      20
    )
    Utils.drawCustomImage(context, loveShadowImage, loveShadowRect)

    Utils.drawText(
      context,
      "I especially like to eat salmon and put it down. /n So I painted this series of food illustrations. /n This is just one of them. There's more I will /n do as soon as possible",
      UIKit.color.title,
      Component.ScreenSize.height - boxRect.top,
      35
    )
  }

}