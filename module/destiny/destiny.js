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
let loveBoxLeft = Component.ScreenSize.width * 1.05

var currentLeft = 0
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

let zhouGongImage = wx.createImage()
zhouGongImage.src = UIKit.imageSrc.zhougong

let guanyinImage = wx.createImage()
guanyinImage.src = UIKit.imageSrc.guanyin

let titleSize = 240
let titleRect = {
  width: titleSize,
  height: titleSize,
  left: Component.ScreenSize.width - titleSize - 50,
  top: 80 + Component.adaptingIPhoneXTop
}


export class DestinyPage {

  static boxRect = boxRect
  static loveBoxRect = loveBoxRect

  static draw(
    context, 
    touchMoveX
    ) {
      
    // 添加回退按钮
    Component.addBackButton(context)
    // 移动距离赋值
    boxRect.left = boxLeft + touchMoveX
    shadowRect.left = shadowLeft + touchMoveX
    loveBoxRect.left = loveBoxLeft + touchMoveX
    loveShadowRect.left = loveShadowLeft + touchMoveX
    // 根据当前的 Offset 来更新签筒的名字
    if (boxRect.left < -Component.ScreenSize.width / 2.5) {
      Utils.drawCustomImage(context, zhouGongImage, titleRect)
    } else {
      Utils.drawCustomImage(context, guanyinImage, titleRect)
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