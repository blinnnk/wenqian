/*
* @author KaySaith
* @date 2018-02-01
*/

import { UIKit } from '../../common/uikit'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'

const boxSize = Component.ScreenSize.width * 0.9
const shadowSize = Component.ScreenSize.width * 0.5
const boxTop = (Component.ScreenSize.height - boxSize) / 2.6
const boxLeft = Component.ScreenSize.width * 0.05
const loveBoxLeft = Component.ScreenSize.width * 1.05

var currentLeft = 0
const shadowImage = wx.createImage()
shadowImage.src = UIKit.imageSrc.shadow

const boxImage = wx.createImage()
boxImage.src = UIKit.imageSrc.box

const loveBoxImage = wx.createImage()
loveBoxImage.src = UIKit.imageSrc.loveBox

const loveShadowImage = wx.createImage()
loveShadowImage.src = UIKit.imageSrc.shadow

const boxRect = {
  width: boxSize,
  height: boxSize,
  left: boxLeft,
  top: boxTop,
}

const shadowTop = boxRect.top + boxRect.height - Component.ScreenSize.height * 0.08

const shadowRect = {
  width: shadowSize,
  height: shadowSize,
  left: shadowLeft,
  top: shadowTop
}
const shadowLeft = boxRect.left + Component.ScreenSize.width * 0.35

const loveBoxRect = {
  width: boxSize,
  height: boxSize,
  left: loveBoxLeft,
  top: boxTop,
}

const loveShadowRect = {
  width: shadowSize,
  height: shadowSize,
  left: loveShadowLeft,
  top: shadowTop
}
const loveShadowLeft = loveBoxRect.left + Component.ScreenSize.width * 0.35

const zhouGongImage = wx.createImage()
zhouGongImage.src = UIKit.imageSrc.zhougong

const guanyinImage = wx.createImage()
guanyinImage.src = UIKit.imageSrc.guanyin

const titleSize = 240
const titleRect = {
  width: titleSize,
  height: titleSize,
  left: Component.ScreenSize.width - titleSize - 50,
  top: 80 + Component.adaptingIPhoneXTop
}

let timeBackgroundWidth = 580 * 0.8
let timeBackgroundImage = wx.createImage()
timeBackgroundImage.src = UIKit.imageSrc.timeBackground
let timeBackgroundRect = {
  left: (Component.ScreenSize.width - timeBackgroundWidth) / 2,
  top: Component.ScreenSize.height / 2 - 100,
  width: timeBackgroundWidth,
  height: 170 * 0.8
}

var isBlockStatus = false

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

    // 不同的解锁状态签筒有不同的动画样式
    if (isBlockStatus == false) {
      // 观音签筒
      Utils.drawImageAndMoveOvalPathWithAnimation(
        context,
        boxImage,
        boxRect,
        0.02,
        30,
        20
      )

      // 周公签筒
      Utils.drawImageAndMoveOvalPathWithAnimation(
        context,
        loveBoxImage,
        loveBoxRect,
        0.01,
        100,
        20
      )
    } else {
      // 没有动画的观音签筒
      Utils.drawCustomImage(
        context,
        boxImage,
        boxRect
      )
      // 没有动画的周公签筒
      Utils.drawCustomImage(
        context,
        loveBoxImage,
        loveBoxRect
      )
      // 添加倒计时的按钮样式
      showCountDownUnlockButton(context)
    }

    // 签筒的影子
    Utils.drawCustomImage(context, shadowImage, shadowRect)
    Utils.drawCustomImage(context, loveShadowImage, loveShadowRect)

    // 描述文字
    Utils.drawText(
      context,
      "I especially like to eat salmon and put it down. /n So I painted this series of food illustrations. /n This is just one of them. There's more I will /n do as soon as possible",
      UIKit.color.title,
      Component.ScreenSize.height - boxRect.top,
      35
    )
  }

  static setBlockStatus() {
    isBlockStatus = true
  }

  static setUnlockStatus() {
    isBlockStatus = false
  }

  static setLockTimeValue(value) {
    LockTime = value
    DestinyPage.setBlockStatus()
  }

  static initLockTime(singleLockTime) {
    var isSuccess = false
    wx.showLoading({
      title: '正在加载'
    })
    var time = new Date()

    wx.getStorage({
      key: 'time',
      success: function (result) {
        isSuccess = true
        if (result.data <= 0) {
          LockTime = 0
        } else {
          LockTime = singleLockTime - (time.getTime() - result.data)
        }
      },
      complete: function () {
        if (isSuccess == true) {
          wx.hideLoading() 
        } else {
          setTimeout(function() {
            wx.hideLoading()
          }, 2000)
        }
      }
    })

    setInterval(function () {
      LockTime -= 1000
      if (LockTime <= 0) {
        isBlockStatus = false
        // 时间倒计时完毕后初始化存入缓存的计时值
        wx.setStorage({
          key: 'time',
          data: 0,
        })
      } else {
        isBlockStatus = true
      }
      currentTime = Utils.convertTimeWithMillsecond(LockTime)
    }, 1000)

  }
}


// 这个时间
export var LockTime = 0
var currentTime = ''

function showCountDownUnlockButton(context) {
  Utils.drawCustomImage(
    context,
    timeBackgroundImage,
    timeBackgroundRect
  )

  context.fillStyle = UIKit.color.opacity5
  context.font = 'bold 54px avenir'
  context.fillText(
    '' + currentTime,
    context.canvas.width / 2,
    timeBackgroundRect.top + 54
  )
}