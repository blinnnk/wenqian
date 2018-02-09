/*
* @author KaySaith
* @date 2018-02-01
*/

import { UIKit } from '../../common/uikit'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'

const guanYinBox = wx.createImage()
guanYinBox.src = UIKit.imageSrc.guanYinBox

const guanYinBoxBackground = wx.createImage()
guanYinBoxBackground.src = UIKit.imageSrc.guanYinBoxBackground

const zhouGongBox = wx.createImage()
zhouGongBox.src = UIKit.imageSrc.zhouGongBox

const zhouGongBoxBackground = wx.createImage()
zhouGongBoxBackground.src = UIKit.imageSrc.zhouGongBoxBackground

const boxRect = {
  width: Component.ScreenSize.width,
  height: Component.ScreenSize.width * 1.5,
  left: 0,
  top: Component.ScreenSize.height
}

const prodWidth = Component.ScreenSize.width * 0.22
const prodRect = {
  width: prodWidth,
  height: prodWidth * 5,
  left: Component.ScreenSize.width * 0.19,
  top: -600
}

const prodTop = Component.ScreenSize.height * 0.1
const randomLeft =
  [
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.39,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.39,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.39,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.39,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.39,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.39,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.39,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.39,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.39,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.39
  ]
const randomTop =
  [
    prodTop + (prodTop * (Math.random() + 5.8)),
    prodTop + (prodTop * (Math.random() + 5.8)),
    prodTop + (prodTop * (Math.random() + 5.8)),
    prodTop + (prodTop * (Math.random() + 5.8)),
    prodTop + (prodTop * (Math.random() + 5.8)),
    prodTop + (prodTop * (Math.random() + 5.8)),
    prodTop + (prodTop * (Math.random() + 5.8)),
    prodTop + (prodTop * (Math.random() + 5.8)),
    prodTop + (prodTop * (Math.random() + 5.8)),
    prodTop + (prodTop * (Math.random() + 5.8))
  ]

if (typeof BoxType == "undefined") {
  var BoxType = {}
  BoxType.guanYin = 0
  BoxType.zhouGong = 1
}

export var CurrentBoxType = BoxType.guanYin

export class DestinyDetail {

  static BoxType = BoxType

  static draw(context, boxType, prodHorizontalOffset) {
    var image = guanYinBox
    var background = guanYinBoxBackground
    // 用来记录当前签筒类型的变量, 用来从服务端获取签语的类型判断
    CurrentBoxType = boxType
    if (boxType == BoxType.zhouGong) {
      image = zhouGongBox
      background = zhouGongBoxBackground
    } 

    Utils.drawText(
      context,
      "Condensate heart eyes closed for 10 seconds /nand then focus myself in my heart you want to come up /nwith one's content, and then shake the mobile /nphone can begin to pray",
      UIKit.color.title,
      Component.ScreenSize.height * 0.15,
      35
    )
    Component.addBackButton(context)

    Utils.drawImageAndMoveToTopWithAnimation(
      context,
      background,
      boxRect,
      2,
      Component.ScreenSize.height * 0.5
    )

    drawProds(context, prodHorizontalOffset)

    Utils.drawImageAndMoveToTopWithAnimation(
      context,
      image,
      boxRect,
      2,
      Component.ScreenSize.height * 0.5
    )
  }
}

function drawProds(context, offset) {
  if (Math.abs(offset) > 20) {
    if(offset > 0) offset = 20
    else if (offset < 0) offset = -20
  }
  for (var index = 0; index < 10; index++) {
    const prodImage = wx.createImage()
    prodImage.src = UIKit.imageSrc.prod
    prodRect.left = randomLeft[index] - offset

    Utils.drawImageAndMoveToBottomWithAnimation(
      context, 
      prodImage, 
      prodRect,
      0.00005,
      randomTop[index]
    )
  }
}