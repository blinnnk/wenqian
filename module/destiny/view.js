/*
* @author KaySaith
* @date 2018-02-01
*/

import { UIKit } from '../../common/uikit'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'
import { Touch } from '../../common/launch'
import { Global } from '../../common/global'

const boxSize = Component.ScreenSize.width * 0.9
const shadowSize = Component.ScreenSize.width * 0.5
const boxTop = (Component.ScreenSize.height - boxSize) / 2.6
const boxLeft = Component.ScreenSize.width * 0.05
const loveBoxLeft = Component.ScreenSize.width * 1.05

var currentLeft = 0

const shadowImage = Utils.Image(UIKit.imageSrc.shadow)
const boxImage = wx.createImage()
const loveBoxImage = wx.createImage()
const loveShadowImage = Utils.Image(UIKit.imageSrc.shadow)

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

const zhouGongImage = Utils.Image(UIKit.imageSrc.zhougong)
const guanyinImage = Utils.Image(UIKit.imageSrc.guanyin)

const titleSize = 240
const titleRect = {
  width: titleSize,
  height: titleSize,
  left: Component.ScreenSize.width - titleSize - 50,
  top: 80 + Component.adaptingIPhoneXTop
}

const timeBackgroundWidth = 580 * 0.8
const timeBackgroundImage = Utils.Image(UIKit.imageSrc.timeBackground)

const timeBackgroundRect = {
  left: (Component.ScreenSize.width - timeBackgroundWidth) / 2,
  top: Component.ScreenSize.height / 2 - 100,
  width: timeBackgroundWidth,
  height: 170 * 0.8
}

// 计算倒计时的参数
var currentTime
var isBlockStatus = false
var countDownInterval = null

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
    
    boxImage.src = Global.serverImages.box
    loveBoxImage.src = Global.serverImages.loveBox
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
    Utils.drawText(context, {
      text: "I especially like to eat salmon and put it down. /n So I painted this series of food illustrations. /n This is just one of them. There's more I will /n do as soon as possible",
      textColor: UIKit.color.title,
      lineHeight: 35,
      testSize: '96px',
      centerY: Component.ScreenSize.height - boxRect.top
    })

    Touch.maxVerticalOffset = Component.ScreenSize.width
  }

  /*
  * @description 生成倒计时锁的样式和功能, 因为这个倒计时锁的时间计算点
  * 是服务器时间, 这里面有多种场景的重新校验。例如, 页面切换, 后台到前台等。
  * 没有使用长连接，所以在每次进入界面前的触发点进行再次校验.
  */
  static initLockTime(currentLockTime, callback) {
    if (currentLockTime <= 0) {
      isBlockStatus = false
      if (countDownInterval != null) {
        clearInterval(countDownInterval)
        countDownInterval = null
      }
      return
    } else {
      // 如果再次出发函数的时候还在倒计时状态就不用重新执行下面的内容
      if (isBlockStatus) return
      // 开始执行倒计时的样式刷新和节点判断
      countDownInterval = setInterval(
        () => {
          if (currentLockTime <= 0) {
            // 当倒计时结束后从服务器更新本地的冷却时间
            Component.updateUserAgent()
            isBlockStatus = false
            // 关闭 `Interval`
            clearInterval(countDownInterval)
          } else {
            isBlockStatus = true
            currentTime = Utils.convertTimeWithMillsecond(currentLockTime)
            currentLockTime -= 1000
          }
        },
        1000
      )
    }
  }
}

// 绘制倒计时阻拦按钮
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
    timeBackgroundRect.top + 58
  )
}