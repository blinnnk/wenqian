/*
* @author KaySaith
* @date 2018-01-30
*/

import Controller from 'util/controller'
import Music from 'util/music'
import { UIKit } from 'common/uikit'
import { Component } from 'common/component'
import { Utils } from 'util/utils'
import { NetUtils } from 'util/netUtils'
import { Canvas } from 'common/component'
import { HomePage } from 'module/home/home'
import { DestinyPage } from 'module/destiny/destiny'
import { DestinyDetail } from 'module/destinyDetail/destinyDetail'
import { ProdDetail } from 'module/destinyDetail/prodDetail'
import { PoemDetail } from 'module/destinyDetail/poemDetail'
import { Interpolator } from 'util/animation'
import { Api } from 'common/api'

// 调整 Canvas 尺寸来解决 Retina 屏幕下的文字和图片虚边问题
Component.adaptingRetina()

// 声音管理器
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
  PageName.explanationDetail = 7
}

var currentPage = PageName.home
var touchMoveX = 0
var lastMoveX = 0
var prodHorizontalOffset = 0

// 首页各个按钮的点击区域
var buttonRect = {
  back: Component.backButtonRect,
  destiny: HomePage.destinyRect,
  history: HomePage.historyRect,
  prod: ProdDetail.buttonRect,
  explanation: PoemDetail.explanationButtonRect,
  guanYin: DestinyPage.boxRect,
  zhouGong: DestinyPage.loveBoxRect,
  save: PoemDetail.saveButtonRect
}

// 从服务器获取的冷却时间
var currentLockTime = 10 * 1000
wx.getStorage({
  key: 'cdTime',
  success: function(result) {
    currentLockTime = result.data
  },
})

// 主界面的刷新帧控制器
new Controller(
  Canvas, 
  function(context, animation) {
    switch (currentPage) {
      case PageName.home:
        HomePage.draw(context)
        // 设置首页按钮的点击跳转事件
        clickToLoadPage(buttonRect.destiny, PageName.destiny)
        clickToLoadPage(buttonRect.history, PageName.history)
        break
      case PageName.history:
        drawHistoryPage(context)
        clickToLoadPage(buttonRect.back, PageName.home)
        break
      case PageName.guanYinDetail:
        DestinyDetail.draw(
          context, 
          DestinyDetail.BoxType.guanYin,
          prodHorizontalOffset
        )
        clickToLoadPage(buttonRect.back, PageName.destiny)
        break
      case PageName.zhouGongDetail:
        DestinyDetail.draw(
          context, 
          DestinyDetail.BoxType.zhouGong,
          prodHorizontalOffset
        )
        clickToLoadPage(buttonRect.back, PageName.destiny)
        break
      case PageName.prodDetail:
        ProdDetail.draw(context)
        clickToLoadPage(buttonRect.back, PageName.destiny)
        clickToLoadPage(buttonRect.prod, PageName.poemDetail)
        break
      // 古诗的签语界面
      case PageName.poemDetail: 
        PoemDetail.draw(context)
        clickToLoadPage(buttonRect.back, PageName.prodDetail)
        clickToLoadPage(buttonRect.explanation, PageName.explanationDetail)
        clickToLoadPage(buttonRect.save, PageName.poemDetail)
        break
      // 签筒的选择界面
      case PageName.destiny:
        // 当前冷却时间的数值判断是否可用
        setBlockStatus(currentLockTime > 0)
        DestinyPage.draw(context, touchMoveX)
        clickToLoadPage(buttonRect.back, PageName.home)
        clickToLoadPage(buttonRect.guanYin, PageName.guanYinDetail)
        clickToLoadPage(buttonRect.zhouGong, PageName.zhouGongDetail)
        break
      case PageName.explanationDetail:
        drawExplanationDetail(context)
        clickToLoadPage(buttonRect.back, PageName.poemDetail)
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
    executeByCurrentPage(
      function() {
        sound.playShakingProd()
        // 摇晃过程中增加震动来提升用户体验
        wx.vibrateLong()
      },
      PageName.guanYinDetail, 
      PageName.zhouGongDetail
    )
  },
  // 摇晃结束的回调
  function() {
    executeByCurrentPage(
      function () {
        // 检查如果有网络才可以进入到签详细界面
        NetUtils.checkNetWorkStatus(function () {
          // 摇晃结束后拉取网络数据签子的基础信息
          ProdDetail.getPoemInfo()
          // 显示界面
          resetGeneralParameters()
          currentPage = PageName.prodDetail
          sound.playAmazingSoundEffect()
          DestinyPage.initLockTime(currentLockTime)
        })
      },
      PageName.guanYinDetail,
      PageName.zhouGongDetail
    )
  }
)

// 生成用户相关信息 `UserAgent`
Component.getUserAgent((code) => {
  NetUtils.getToken(
    Api.token, 
    code,
    (userAgent) => {
      Component.userAgent = userAgent
      wx.setStorage({
        key: 'cdTime',
        data: userAgent.cd,
      })
      console.log(Component.userAgent)
    }
  )
})

// 通过在 Canvas 上面的点击区域来判断点击事件
function clickToLoadPage(clickRect, targetPageName) {

  const event = {
    condition: (current, target, callback) => {
      if (
        currentPage == current &&
        targetPageName == target
      ) {
        if (typeof callback === 'function') {
          callback()
        }
      }
    }
  }

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

      // 加载签语网络图片并显示
      event.condition(
        PageName.prodDetail,
        PageName.poemDetail,
        () => PoemDetail.getPoemImage()
      )

      // 点击保存按钮把签语图片保存到本地相册
      event.condition(
        PageName.poemDetail,
        PageName.poemDetail,
        () => PoemDetail.savePoemImageToAlbum()
      )

      if (targetPageName == PageName.destiny) {
        DestinyPage.initLockTime(currentLockTime)
      }

      currentPage = targetPageName
    }
  )
}

var hasPlayedUnlockSound = false
// 使用限制设定开关点击事件
function setBlockStatus(isBlocking) {
  if (isBlocking == true) {
    hasPlayedUnlockSound = false
    buttonRect.guanYin = 0
    buttonRect.zhouGong = 0
    Utils.eraseTouchEvent(DestinyPage.boxRect, DestinyPage.loveBoxRect)
  } else {
    if (currentLockTime == 0 && hasPlayedUnlockSound == false) {
      sound.playUnlockSoundEffect()
      hasPlayedUnlockSound = true
    }
    buttonRect.guanYin = DestinyPage.boxRect
    buttonRect.zhouGong = DestinyPage.loveBoxRect
  }
}


// 用来做通用常量或变量的参数在更换页面后恢复初始数值
function resetGeneralParameters() {
  Interpolator.recovery()
}

// 滑动屏幕的事件捕捉
Utils.touchMoveXDistance(
  function(distance) {
    touchMoveX = distance.x + lastMoveX
    // 边界判断, 累计移动的距离超出了屏幕最大或最小距离就重置
    if (touchMoveX < -Component.ScreenSize.width) {
      touchMoveX = -Component.ScreenSize.width
    } else if (touchMoveX > 0) {
      touchMoveX = 0
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

function drawExplanationDetail(context) {
  context.fillStyle = "black"
  context.fillRect(100, 100, 500, 600)
}

// 封装的判断当前页面名字的高阶函数
function executeByCurrentPage(callback, ...pageArguments) {
  for (var index = 0; index < pageArguments.length; index++) {
    if (currentPage == pageArguments[index]) {
      if (typeof callback === 'function') {
        callback()
      }
    }
  }
}

// 后台到前台后恢复事件
wx.onShow(
  function () {
    sound.playBackgroundMusic()
  new Controller(Canvas)
  }
)
