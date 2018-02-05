/*
* @author KaySaith
* @date 2018-01-30
*/

import Controller from 'util/controller'
import Music from 'util/music'
import History from 'module/history/history'
import { UIKit } from 'common/uikit'
import { Component } from 'common/component'
import { Utils } from 'util/utils'
import { Canvas } from 'common/component'
import { HomePage } from 'module/home/home'
import { DestinyPage } from 'module/destiny/destiny'

// 调整 Canvas 尺寸来解决 Retina 屏幕下的文字和图片虚边问题
Component.adaptingRetina()

// 背景音乐
let sound = new Music()

if (typeof PageName == "undefined") {
  var PageName = {}
  PageName.home = 0
  PageName.history = 1
  PageName.destiny = 2
}

var currentPage = PageName.home
var touchMoveX = 0
var lastMoveX = 0
var touchDirection = UIKit.direction.left
var isTriggingEdge = false

// new History(Canvas)
// 主界面的内容
new Controller(
  Canvas,
  function (context, animation) {
    switch (currentPage) {
      case PageName.home:
        HomePage.draw(context)
        break
      case PageName.history:
        drawHistoryPage(context)
        break
      case PageName.destiny:
        DestinyPage.draw(
          context,
          touchMoveX,
          touchDirection,
          function (isOnEdge) {
            isTriggingEdge = isOnEdge
          }
        )
        break
      default:
        HomePage.draw(context)
    }
  }
)

// 滑动屏幕的事件捕捉
Utils.touchMoveXDistance(
  function (distance) {
    // 开始滑动动态刷新这个值
    if (distance.x > 0) {
      touchDirection = UIKit.direction.right
    } else {
      touchDirection = UIKit.direction.left
    }
    console.log(isTriggingEdge)
    if (isTriggingEdge == false) {
      touchMoveX = distance.x + lastMoveX
    }
  },
  function () {
    // 滑动结束后记录上次移动的距离
    lastMoveX = touchMoveX
  }
)

function drawHistoryPage(context) {
  context.fillStyle = "blue"
  context.fillRect(0, 0, 200, 200)
}

// 返回按钮点击事件
Utils.onclick(
  DestinyPage.backButtonRect,
  function () {
    sound.playClickSoundEffect()
    currentPage = PageName.home
  }
)

// 查看寻史界面点击事件
Utils.onclick(
  HomePage.historyRect,
  function () {
    sound.playClickSoundEffect()
    currentPage = PageName.history
  }
)

// 查看求签界面点击事件
Utils.onclick(
  HomePage.destinyRect,
  function () {
    sound.playClickSoundEffect()
    currentPage = PageName.destiny
  }
)

// 后台到前台后恢复相关事件
wx.onShow(
  function () {
    sound.playBackgroundMusic()
    new Controller(Canvas)
  }
)