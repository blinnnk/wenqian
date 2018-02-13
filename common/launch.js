/*
* @author KaySaith
* @date 2018-02-12
* @description 挂在到全局的函数, 这里主要放置扩展类函数为主
*/

import { Utils } from '../util/utils'
import { Component } from '../common/component'

export var Touch = {
  moveX: 0,
  lastX: 0,
  moveY: 0,
  lastY: 0,
  maxVerticalOffset: 0
}

export var ProdHorizontalOffset = 0

function addGestureListener() {
  // 滑动屏幕的事件捕捉
  Utils.touchMoveXDistance({
    onMoving: (distance) => {
      Touch.moveX = distance.x + Touch.lastX
      Touch.moveY = distance.y + Touch.lastY
      // 边界判断, 累计移动的距离超出了屏幕最大或最小距离就重置
      if (Touch.moveX < -Component.ScreenSize.width) {
        Touch.moveX = -Component.ScreenSize.width
      }
      else if (Touch.moveX > 0) Touch.moveX = 0
      if (Touch.maxVerticalOffset > Component.ScreenSize.height) {
        Touch.maxVerticalOffset -= Component.ScreenSize.height
      }
      if (Touch.moveY < -Touch.maxVerticalOffset) {
        Touch.moveY = -Touch.maxVerticalOffset
      }
      else if (Touch.moveY > 0) Touch.moveY = 0
    },
    // 滑动结束后记录上次移动的距离
    onEnd: () => {
      Touch.lastX = Touch.moveX
      Touch.lastY = Touch.moveY
    }
  })
}

function addCompassListener() {
  // 监听陀螺仪的倾斜角度
  Utils.addCompassListener((offset) => ProdHorizontalOffset = offset)
}

(() => {
  addCompassListener()
  addGestureListener()
  // 调整 `Canvas` 尺寸来解决 `Retina` 屏幕下的文字和图片虚边问题
  Component.adaptingRetina()

  // 监听屏幕上的手指事件用来做点击和滑动的兼容
  Utils.resolveGestureConflict()
})()