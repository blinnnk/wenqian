/*
* @author KaySaith
* @date 2018-02-01
*/

import { UIKit } from '../../common/uikit'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'

let boxImage = wx.createImage()
boxImage.src = UIKit.imageSrc.box
let boxRect = {
  width: Component.ScreenSize.width * 0.9,
  height: Component.ScreenSize.width * 0.9,
  left: Component.ScreenSize.width * 0.05,
  top: (Component.ScreenSize.height - Component.ScreenSize.width * 0.9) / 2.6,
}

let shadowImage = wx.createImage()
shadowImage.src = UIKit.imageSrc.shadow
let shadowRect = {
  width: Component.ScreenSize.width * 0.5,
  height: Component.ScreenSize.width * 0.5,
  left: boxRect.left + Component.ScreenSize.width * 0.35,
  top: boxRect.top + boxRect.height - Component.ScreenSize.height * 0.08
}

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

  static draw(context) {

    Utils.drawCustomImage(context, backImage, backButtonRect)

    Utils.drawImageAndMoveOvalPathWithAnimation(
      context,
      boxImage,
      boxRect,
      0.05,
      30,
      20
    )
    Utils.drawCustomImage(context, shadowImage, shadowRect)

    Utils.drawText(
      context,
      "I especially like to eat salmon and put it down. /n So I painted this series of food illustrations. /n This is just one of them. There's more I will /n do as soon as possible",
      UIKit.color.title,
      Component.ScreenSize.height - boxRect.top,
      35
    )
  }

}