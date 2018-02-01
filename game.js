/*
* @author KaySaith
* @date 2018-01-30
*/

import Controller from 'util/controller'
import Music from 'util/music'
import { UISize } from 'common/uikit'
import { UIColor } from 'common/uikit'
import { ImageSrc } from 'common/uikit'
import { drawDescriptionText } from 'common/component'
import { fallingLeaf } from 'common/component'
import { canvas } from 'common/component'
import { adaptingRetina } from 'common/component'
import { drawCustomImage } from 'util/utils'
import { drawImageAndMoveToLeftWithAnimation } from 'util/utils'

// 调整 Canvas 尺寸来解决 Retina 屏幕下的文字和图片虚边问题
adaptingRetina()

// 背景音乐
let backgroundMusic = new Music()

// UI 的参数
let logoRect = {
  left: (canvas.width - UISize.logo) / 2,
  top: (canvas.height - UISize.logo) / 2 - 100,
  width: UISize.logo,
  height: UISize.logo
}

let buttonLeft = canvas.width * 0.2
let buttonTop = canvas.height - 200

let buttonLeftRect = {
  top: buttonTop,
  left: buttonLeft,
  width: UISize.buttonWidth,
  height: UISize.buttonHeight
}

let buttonRightRect = {
  top: buttonTop,
  left: canvas.width - buttonLeft - UISize.buttonWidth,
  width: UISize.buttonWidth,
  height: UISize.buttonHeight
}

let redDotRect = {
  width: UISize.redDot,
  height: UISize.redDot,
  left: (canvas.width - UISize.redDot) / 2,
  top: canvas.height - 175
}

let branchRect = {
  width: UISize.branch,
  height: UISize.branch,
  left: canvas.width,
  top: 30
}

// 主页的图片对象
let logoImage = wx.createImage()
logoImage.src = ImageSrc.logo

let buttonBackgroundImage = wx.createImage()
buttonBackgroundImage.src = ImageSrc.buttonBackground

let historyImage = wx.createImage()
historyImage.src = ImageSrc.history

let destinyImage = wx.createImage()
destinyImage.src = ImageSrc.destiny

let redDotImage = wx.createImage()
redDotImage.src = ImageSrc.redDot

let branchImage = wx.createImage()
branchImage.src = ImageSrc.branch


// 主界面的内容
new Controller(
  canvas, 
  function(context, animation) {
    // 画 Logo 图
    drawCustomImage(context, logoImage, logoRect)
    // 画副标题
    drawDescriptionText(context)
    // 画按钮的背景笔墨
    drawCustomImage(context, buttonBackgroundImage, buttonLeftRect)
    // 画寻史按钮
    drawCustomImage(context, historyImage, buttonLeftRect)
    // 画求签的背景笔墨
    drawCustomImage(context, buttonBackgroundImage, buttonRightRect)
    // 画求签按钮
    drawCustomImage(context, destinyImage, buttonRightRect) 
    // 画按钮之间的红色小点
    drawCustomImage(context, redDotImage, redDotRect) 
    // 画树枝并做动画
    drawImageAndMoveToLeftWithAnimation(
      context, 
      branchImage, 
      branchRect, 
      5,
      UISize.branch,
      function() {
        // 画树叶的下落动画
        fallingLeaf(context)
      }
    )
  }
)

// 后台恢复前台后恢复相关事件
wx.onShow(
  function () {
  backgroundMusic.playBackgroundMusic()
  new Controller(canvas)
  }
)
