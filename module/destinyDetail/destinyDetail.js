/*
* @author KaySaith
* @date 2018-02-01
*/

import { UIKit } from '../../common/uikit'
import { Global } from '../../common/global'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'

const guanYinBox = wx.createImage()
const guanYinBoxBackground = Utils.Image(UIKit.imageSrc.guanYinBoxBackground)
const zhouGongBox = wx.createImage()
const zhouGongBoxBackground = Utils.Image(UIKit.imageSrc.zhouGongBoxBackground)

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
  top: -Component.ScreenSize.height * 0.3 + Component.adaptingIPhoneXTop
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
    prodTop + (prodTop * (Math.random() + 4.8)),
    prodTop + (prodTop * (Math.random() + 4.8)),
    prodTop + (prodTop * (Math.random() + 4.8)),
    prodTop + (prodTop * (Math.random() + 4.8)),
    prodTop + (prodTop * (Math.random() + 4.8)),
    prodTop + (prodTop * (Math.random() + 4.8)),
    prodTop + (prodTop * (Math.random() + 4.8)),
    prodTop + (prodTop * (Math.random() + 4.8)),
    prodTop + (prodTop * (Math.random() + 4.8)),
    prodTop + (prodTop * (Math.random() + 4.8))
  ]

export class DestinyDetail {

  static draw(context, boxType, prodHorizontalOffset) {
    var image = guanYinBox
    image.src = Global.serverImages.guanYinBox
    var background = guanYinBoxBackground
    // 用来记录当前签筒类型的变量, 用来从服务端获取签语的类型判断
    Global.currentBoxType = boxType
    if (boxType == Global.BoxType.zhouGong) {
      image = zhouGongBox
      image.src = Global.serverImages.zhouGongBox
      background = zhouGongBoxBackground
    }

    Utils.drawText(context, {
      text: "Condensate heart eyes closed for 10 seconds /nand then focus myself in my heart you want to come up /nwith one's content, and then shake the mobile /nphone can begin to pray",
      textColor: UIKit.color.title,
      centerY: Component.ScreenSize.height * 0.15,
      lineHeight: 35
    })
    
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

function drawProds(context, offset, imageSrc) {
  if (Math.abs(offset) > 20) {
    if (offset > 0) offset = 20
    else if (offset < 0) offset = -20
  }
  for (var index = 0; index < 10; index++) {
    const prodImage = wx.createImage()
    prodImage.src = Global.serverImages.prod
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