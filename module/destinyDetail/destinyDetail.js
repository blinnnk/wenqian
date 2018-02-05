/*
* @author KaySaith
* @date 2018-02-01
*/

import { UIKit } from '../../common/uikit'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'

let guanYinBox = wx.createImage()
guanYinBox.src = UIKit.imageSrc.guanYinBox

let guanYinBoxBackground = wx.createImage()
guanYinBoxBackground.src = UIKit.imageSrc.guanYinBoxBackground

let zhouGongBox = wx.createImage()
zhouGongBox.src = UIKit.imageSrc.zhouGongBox

let zhouGongBoxBackground = wx.createImage()
zhouGongBoxBackground.src = UIKit.imageSrc.zhouGongBoxBackground

let boxRect = {
  width: Component.ScreenSize.width,
  height: Component.ScreenSize.width * 1.5,
  left: 0,
  top: Component.ScreenSize.height
}

let prodWidth = Component.ScreenSize.width * 0.22
let prodRect = {
  width: prodWidth,
  height: prodWidth * 5,
  left: Component.ScreenSize.width * 0.17,
  top: -600
}

let prodTop = Component.ScreenSize.height * 0.1
let randomLeft =
  [
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.45,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.45,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.45,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.45,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.45,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.45,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.45,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.45,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.45,
    prodRect.left + Math.random() * Component.ScreenSize.width * 0.45
  ]
let randomTop =
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
  BoxType.guanYin = 'guanyin'
  BoxType.zhouGong = 'zhougong'
}

export class DestinyDetail {
  static BoxType = BoxType

  static drawDestinyDetailPage(context, boxType) {
    var image = guanYinBox
    var background = guanYinBoxBackground
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
      Component.ScreenSize.height * 0.5,
      function() {
        drawProds(context)
      }
    )

    Utils.drawImageAndMoveToTopWithAnimation(
      context,
      image,
      boxRect,
      2,
      Component.ScreenSize.height * 0.5
    )
  }
}

function drawProds(context) {

  for (var index = 0; index < 10; index++) {
    let prodImage = wx.createImage()
    prodImage.src = UIKit.imageSrc.prod
    prodRect.left = randomLeft[index]

    Utils.drawImageAndMoveToBottomWithAnimation(
      context, 
      prodImage, 
      prodRect,
      0.00005,
      randomTop[index]
    )
  }
}