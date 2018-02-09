/*
* @author KaySaith
* @date 2018-01-30
*/

import Controller from 'util/controller'
import Music from 'util/music'
import { PageName } from 'common/uikit'
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


// 调整 Canvas 尺寸来解决 Retina 屏幕下的文字和图片虚边问题
Component.adaptingRetina()

// 初始化软件的时候更新用户信息
Component.updateUserAgent()

// 声音管理器
const sound = new Music()

// 常用的变量
var currentPage = PageName.home
var touchMoveX = 0
var lastMoveX = 0

// 首页各个按钮的点击区域
const buttonRect = {
  back: Component.backButtonRect,
  destiny: HomePage.destinyRect,
  history: HomePage.historyRect,
  prod: ProdDetail.buttonRect,
  explanation: PoemDetail.explanationButtonRect,
  guanYin: DestinyPage.boxRect,
  zhouGong: DestinyPage.loveBoxRect,
  save: PoemDetail.saveButtonRect
}

// 主界面的刷新帧的控制器
new Controller(Canvas, (context) => {
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
    // 签筒的选择的界面
    case PageName.destiny:
      setBlockStatus(Component.userAgent.cd > 0)
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
})

// 监听屏幕上的手指事件用来做点击和滑动的兼容
Utils.touchPointListener()

// 监听陀螺仪的倾斜角度
var prodHorizontalOffset = 0
Utils.addCompassListener((offset) => prodHorizontalOffset = offset)

// 摇晃手机的监听并判断是否处在可以求签的界面触发对应的事件
Component.isShakingPhone({
  onShaking: () => {
    // 持续摇晃的回调
    executeByCurrentPage(
      () => {
        sound.playShakingProd()
        // 摇晃过程中增加震动来提升用户体验
        wx.vibrateLong()
      },
      PageName.guanYinDetail,
      PageName.zhouGongDetail
    )
  },
  onEnd: () => {
    // 摇晃结束的回调
    executeByCurrentPage(
      () => {
        // 检查如果有网络才可以进入到签详细界面
        NetUtils.checkNetWorkStatus(() => {
          // 摇晃结束后拉取网络数据签子的基础信息
          ProdDetail.getPoemInfo()
          // 顺序执行刷新界面的方式
          Utils.sequentialExecution({
            early: () => resetGeneralParameters(),
            later: () => currentPage = PageName.prodDetail
          })
          sound.playAmazingSoundEffect()
          Component.updateUserAgent()
        })
      },
      PageName.guanYinDetail,
      PageName.zhouGongDetail
    )
  }
})

// 通过在 `Canvas` 上面的点击区域来判断点击事件
function clickToLoadPage(clickRect, targetPageName) {
  // 事件类型判断
  const event = {
    condition: (current, target, callback) => {
      if (currentPage == current && targetPageName == target) {
        if (typeof callback === 'function') callback()
      }
    }
  }
  // 点击事件
  Utils.onClick(clickRect,
    () => {
      resetGeneralParameters()
      // 不同点击事件设定不同的点击音效
      if(
        targetPageName == PageName.guanYinDetail ||
        targetPageName == PageName.zhouGongDetail
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
        wx.showLoading({ title: '正在计算冷却时间' })
        Component.updateUserAgent((userAgent) => {
          wx.hideLoading()
          DestinyPage.initLockTime(userAgent.cd)
        })
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
    // 关闭点击事件的区域
    buttonRect.guanYin = 0
    buttonRect.zhouGong = 0
    Utils.eraseTouchEvent(DestinyPage.boxRect, DestinyPage.loveBoxRect)
  } else {
    if (Component.userAgent.cd == 0 && hasPlayedUnlockSound == false) {
      sound.playUnlockSoundEffect()
      hasPlayedUnlockSound = true
    }
    // 恢复点击事件的区域
    buttonRect.guanYin = DestinyPage.boxRect
    buttonRect.zhouGong = DestinyPage.loveBoxRect
  }
}


// 用来做通用常量或变量的参数在更换页面后恢复初始数值
function resetGeneralParameters() {
  Interpolator.recovery()
}

// 滑动屏幕的事件捕捉
Utils.touchMoveXDistance({
  onMoving: (distance) => {
    touchMoveX = distance.x + lastMoveX
    // 边界判断, 累计移动的距离超出了屏幕最大或最小距离就重置
    if (touchMoveX < -Component.ScreenSize.width)
      touchMoveX = -Component.ScreenSize.width
    else if (touchMoveX > 0) touchMoveX = 0
  },
  // 滑动结束后记录上次移动的距离
  onEnd: () => lastMoveX = touchMoveX
})

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
  () => {
    sound.playBackgroundMusic()
    new Controller(Canvas)
    Component.updateUserAgent()
  }
)
