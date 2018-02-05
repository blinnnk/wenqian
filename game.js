/*
* @author KaySaith
* @date 2018-01-30
*/

import Controller from 'util/controller'
import Music from 'util/music'
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

var currentTouchX = 0
var currentTouchY = 0
var hasPlayedSound = false

// 主界面的内容
new Controller(
  Canvas, 
  function(context, animation) {
    switch (currentPage) {
      case PageName.home:
        HomePage.draw(context)
        // 设置首页按钮的点击跳转事件
        clickToLoadPage(HomePage.destinyRect, PageName.home, PageName.destiny)
        clickToLoadPage(HomePage.historyRect, PageName.home, PageName.history)
        break
      case PageName.history:
        drawHistoryPage(context)
        clickToLoadPage(DestinyPage.backButtonRect, PageName.history, PageName.home)
        break
      case PageName.destiny:
        DestinyPage.draw(
          context, 
          touchMoveX, 
          touchDirection, 
          function(isOnEdge) {
            isTriggingEdge = isOnEdge
          }
        )
        clickToLoadPage(DestinyPage.backButtonRect, PageName.destiny, PageName.home)
        break
      default:
        HomePage.draw(context)
    }
  }
)

// 通过在 Canvas 上面的点击区域来判断点击事件
function clickToLoadPage(clickRect, currentPageName, targetPageName) {
  Utils.dynamicClick(
    currentTouchX,
    currentTouchY,
    clickRect,
    function () {
      if (currentPage == currentPageName) {
        sound.playClickSoundEffect()
      }
      currentPage = targetPageName
    }
  )
}

// 滑动屏幕的事件捕捉
Utils.touchMoveXDistance(
  function(distance) {
    // 滑动方向获取
    if (distance.x > 0) {
      touchDirection = UIKit.direction.right
    } else if (distance.x < 0){
      touchDirection = UIKit.direction.left
    }

    if (isTriggingEdge == false) {
      touchMoveX = distance.x + lastMoveX
    }
  },
  function() {
    // 滑动结束后记录上次移动的距离
    lastMoveX = touchMoveX
  }
)

function drawHistoryPage(context) {
  context.fillStyle = "blue"
  context.fillRect(0, 0, 200, 200)
}

wx.onTouchStart(function (event) {
  currentTouchX = event.touches[0].clientX * 2
  currentTouchY = event.touches[0].clientY * 2
})

// 后台到前台后恢复相关事件
wx.onShow(
  function () {
    sound.playBackgroundMusic()
  new Controller(Canvas)
  }
)
