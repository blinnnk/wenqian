/*
* @author KaySaith
* @date 2018-02-02
*/

import { UIKit } from '../../common/uikit'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'

let ScreenSize = Component.ScreenSize

// UI 的参数
let logoRect = {
  left: (ScreenSize.width - UIKit.size.logo) / 2,
  top: (ScreenSize.height - UIKit.size.logo) / 2 - 100,
  width: UIKit.size.logo,
  height: UIKit.size.logo
}

let buttonLeft = ScreenSize.width * 0.2
let buttonTop = ScreenSize.height - 200

let redDotRect = {
  width: UIKit.size.redDot,
  height: UIKit.size.redDot,
  left: (ScreenSize.width - UIKit.size.redDot) / 2,
  top: ScreenSize.height - 175
}

let adaptingIPhoneXTop = 0
// 适配 iPhoneX 的齐刘海
Utils.isIPhoneX(function () {
  adaptingIPhoneXTop = 30
})

let branchRect = {
  width: UIKit.size.branch,
  height: UIKit.size.branch,
  left: ScreenSize.width,
  top: 30 + adaptingIPhoneXTop
}

let historyRect = {
  top: buttonTop,
  left: buttonLeft,
  width: UIKit.size.buttonWidth,
  height: UIKit.size.buttonHeight
}

let destinyRect = {
  top: buttonTop,
  left: ScreenSize.width - buttonLeft - UIKit.size.buttonWidth,
  width: UIKit.size.buttonWidth,
  height: UIKit.size.buttonHeight
}

// 主页的图片对象
let logoImage = wx.createImage()
logoImage.src = UIKit.imageSrc.logo

let buttonBackgroundImage = wx.createImage()
buttonBackgroundImage.src = UIKit.imageSrc.buttonBackground

let historyImage = wx.createImage()
historyImage.src = UIKit.imageSrc.history

let destinyImage = wx.createImage()
destinyImage.src = UIKit.imageSrc.destiny

let redDotImage = wx.createImage()
redDotImage.src = UIKit.imageSrc.redDot

let branchImage = wx.createImage()
branchImage.src = UIKit.imageSrc.branch

export class HomePage {

  static historyRect = historyRect
  static destinyRect = destinyRect

  // 画首页的布局和动画
  static draw(context) {
    
    // 画 Logo 图
    Utils.drawCustomImage(context, logoImage, logoRect)
    // 画副标题
    Utils.drawText(context, {
      text: 'Police had to trudge through two to three feet /nof debris to get to amazing Robert Libby',
      textColor: UIKit.color.title,
      centerY: (context.canvas.height + UIKit.size.logo) / 2 - 50,
      lineHeight: 35
    })
    // 画按钮的背景笔墨
    Utils.drawCustomImage(context, buttonBackgroundImage, historyRect)
    // 画寻史按钮
    Utils.drawCustomImage(context, historyImage, historyRect)
    // 画求签的背景笔墨
    Utils.drawCustomImage(context, buttonBackgroundImage, destinyRect)
    // 画求签按钮
    Utils.drawCustomImage(context, destinyImage, destinyRect)
    // 画按钮之间的红色小点
    Utils.drawCustomImage(context, redDotImage, redDotRect)
    // 画树枝并做动画
    Utils.drawImageAndMoveToLeftWithAnimation(
      context,
      branchImage,
      branchRect,
      5,
      UIKit.size.branch,
      function () {
        // 画树叶的下落动画
        Component.fallingLeaf(context)
      }
    )
  }
}
