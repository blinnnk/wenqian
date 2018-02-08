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
import { DestinyDetail } from 'module/destinyDetail/destinyDetail'
import { ProdDetail } from 'module/destinyDetail/prodDetail'
import { Interpolator } from 'util/animation'

// 调整 Canvas 尺寸来解决 Retina 屏幕下的文字和图片虚边问题
Component.adaptingRetina()

// 背景音乐
let sound = new Music()

if (typeof PageName == "undefined") {
  var PageName = {}
  PageName.home = 0
  PageName.history = 1
  PageName.destiny = 2
  PageName.guanYinDetail = 3
  PageName.zhouGongDetail = 4
  PageName.prodDetail = 5
  PageName.poemDetail = 6
}

var currentPage = PageName.home
var touchMoveX = 0
var lastMoveX = 0
var touchDirection = UIKit.direction.left
var isTriggingEdge = false

var prodHorizontalOffset = 0

// 主界面的刷新帧控制器
new Controller(
  Canvas, 
  function(context, animation) {
    switch (currentPage) {
      case PageName.home:
        HomePage.draw(context)
        // 设置首页按钮的点击跳转事件
        clickToLoadPage(
          HomePage.destinyRect, 
          PageName.destiny
        )
        clickToLoadPage(
          HomePage.historyRect, 
          PageName.history
        )
        break
      case PageName.history:
        drawHistoryPage(context)
        clickToLoadPage(
          Component.backButtonRect, 
          PageName.home
        )
        break
      case PageName.guanYinDetail:
        DestinyDetail.drawDestinyDetailPage(
          context, 
          DestinyDetail.BoxType.guanYin,
          prodHorizontalOffset
        )
        clickToLoadPage(
          Component.backButtonRect, 
          PageName.destiny
        )
        break
      case PageName.zhouGongDetail:
        DestinyDetail.drawDestinyDetailPage(
          context, 
          DestinyDetail.BoxType.zhouGong,
          prodHorizontalOffset
        )
        clickToLoadPage(
          Component.backButtonRect, 
          PageName.destiny
        )
        break
      case PageName.prodDetail:
        ProdDetail.draw(context)
        clickToLoadPage(
          Component.backButtonRect,
          PageName.destiny
        )
        clickToLoadPage(
          ProdDetail.buttonRect,
          PageName.poemDetail
        )
        break
      case PageName.poemDetail: 
        drawPoemDetailPage(context)
        clickToLoadPage(
          Component.backButtonRect,
          PageName.prodDetail
        )
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
        clickToLoadPage(
          Component.backButtonRect, 
          PageName.home
        )
        clickToLoadPage(
          DestinyPage.boxRect, 
          PageName.guanYinDetail
        )
        clickToLoadPage(
          DestinyPage.loveBoxRect, 
          PageName.zhouGongDetail
        )
        break
      default:
        HomePage.draw(context)
    }
  }
) 

// 监听屏幕上的手指事件用来做点击和滑动的兼容
Utils.touchPointListener()

// 监听陀螺仪的倾斜角度
Utils.addCompassListener(function(offset) {
  prodHorizontalOffset = offset
})

// 摇晃手机的监听并判断是否处在可以求签的界面触发对应的事件
Component.isShakingPhone(
  // 持续摇晃的回调
  function() {
    if (
      currentPage == PageName.guanYinDetail ||
      currentPage == PageName.zhouGongDetail
    ) {
      sound.playShakingProd()
    }
  },
  // 摇晃结束的回调
  function() {
    resetGeneralParameters()
    currentPage = PageName.prodDetail
    sound.playAmazingSoundEffect()
  }
)

// 通过在 Canvas 上面的点击区域来判断点击事件
function clickToLoadPage(clickRect, targetPageName) {
  Utils.onClick(
    clickRect,
    function () {
      resetGeneralParameters()
      // 不同点击事件设定不同的点击音效
      if (
        currentPage == PageName.destiny &&
        targetPageName != PageName.home
      ) {
        sound.playBells()
      } else {
        sound.playClickSoundEffect()
      }
      currentPage = targetPageName
    }
  )
}

// 用来做通用常量或变量的参数在更换页面后恢复初始数值
function resetGeneralParameters() {
  Interpolator.recovery()
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

function drawPoemDetailPage(context) {
  context.fillStyle = "black"
  context.fillRect(200, 200, 200, 500)
}

// 后台到前台后恢复事件
wx.onShow(
  function () {
    sound.playBackgroundMusic()
  new Controller(Canvas)
  }
)
