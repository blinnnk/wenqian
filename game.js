/*
* @author KaySaith
* @date 2018-01-30
*/

import 'common/extension'
import 'common/launch'
import Controller from 'util/controller'
import Music from 'util/music'
import { PageName, UIKit } from 'common/uikit'
import { Global } from 'common/global'
import { Component } from 'common/component'
import { Utils } from 'util/utils'
import { NetUtils } from 'util/netUtils'
import { HomePage } from 'module/home/home'
import { DestinyPage } from 'module/destiny/destiny'
import { Explanation } from 'module/explanation/view'
import { DestinyDetail } from 'module/destinyDetail/destinyDetail'
import { ProdDetail } from 'module/destinyDetail/prodDetail'
import { PoemDetail } from 'module/destinyDetail/poemDetail'
import { History } from 'module/history/view'
import { Interpolator } from 'util/animation'
import { Touch, ProdHorizontalOffset } from 'common/launch'

// 声音管理器
const sound = new Music()
var controller
var currentPage = PageName.home

Utils.sequentialExecution({
  // 启动软件的时候更新用户信息
  early: (hasFinished) => {
    Component.updateUserAgent((userAgent) => hasFinished())
  },
  // 主界面的刷新帧的控制器, 时机切开是保证界面显示的时候百分百有 `token` 及相关信息
  later: () => controller =
    new Controller((context) => showPage(currentPage, context))
})

// 摇晃手机的监听并判断是否处在可以求签的界面触发对应的事件
Component.isShakingPhone({
  onShaking: () => {
    onDestinyDetailPage(() => {
      sound.playShakingProd()
      wx.vibrateLong() // 摇晃过程中增加震动来提升用户体验
    })
  },
  onEnd: () => {
    onDestinyDetailPage(() => {
      // 检查如果有网络才可以进入到签详细界面
      NetUtils.checkNetWorkStatus(() => {
        // 摇晃结束后拉取网络数据签子的基础信息
        ProdDetail.getProdInfo()
        // 顺序执行刷新界面的方式
        Utils.sequentialExecution({
          early: (hasFinished) => {
            resetGeneralParameters()
            hasFinished()
          },
          later: () => currentPage = PageName.prodDetail
        })
        sound.playAmazingSoundEffect()
        Component.updateCDTime()
      })
    })
  }
})

// 通过在 `Canvas` 上面的点击区域来判断点击事件
function clickToLoadPage(clickRect, targetPageName) {
  // 事件类型判断
  const event = {
    condition: (param = { current: null, target: String, do: Function }) => {
      param.current = param.current == null ? currentPage : param.current
      if (currentPage == param.current && targetPageName == param.target) {
        if (typeof param.do === 'function') param.do()
      }
    },
    setClickSoundEffect: () => {
      targetPageName == PageName.guanYinDetail ||
        targetPageName == PageName.zhouGongDetail ?
        sound.playBells() : sound.playClickSoundEffect()
    }
  }
  // 点击事件
  Utils.onClick(clickRect, () => {
    resetGeneralParameters()
    // 不同点击事件设定不同的点击音效
    event.setClickSoundEffect()
    // 加载签语网络图片并显示
    event.condition({
      current: PageName.prodDetai,
      target: PageName.poemDetail,
      do: () => PoemDetail.getPoemImage()
    })
    // 拉取解签的内容
    event.condition({
      target: PageName.explanationDetail,
      do: () => Explanation.updateContent()
    })
    // 点击保存按钮把签语图片保存到本地相册
    event.condition({
      current: PageName.poemDetail,
      target: PageName.poemDetail,
      do: () => PoemDetail.savePoemImageToAlbum()
    })
    // 每次进入选签筒的界面需要先校验是否更新冷却时间的状态
    event.condition({
      target: PageName.destiny,
      do: () => {
        wx.showLoading({ title: '正在计算冷却时间' })
        Component.updateCDTime((cdTime) => {
          wx.hideLoading()
          DestinyPage.initLockTime(cdTime)
        })
      }
    })
    // 根据点击事件的 `targetPageName` 执行刷新界面
    currentPage = targetPageName
  })
}

// 后台到前台后恢复事件
wx.onShow(() => {
  sound.playBackgroundMusic()
  controller
  if (Global.userAgent != null)
    Component.updateCDTime((cdTime) => DestinyPage.initLockTime(cdTime))
})

// —————— 以下为 `game.js` 页面的私有工具方法 —————————

// 用来做通用常量或变量的参数在更换页面后恢复数值
const resetGeneralParameters = () => {
  Interpolator.recovery()
  Touch.moveX = 0
  Touch.moveY = 0
}

// 封装的判断当前页面名字的高阶函数
function executeByCurrentPage(callback, ...pageArguments) {
  for (var index in pageArguments) {
    if (currentPage == pageArguments[index]) {
      if (typeof callback === 'function') callback()
    }
  }
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
    if (Global.userAgent.cd == 0 && hasPlayedUnlockSound == false) {
      sound.playUnlockSoundEffect()
      hasPlayedUnlockSound = true
    }
    // 恢复点击事件的区域
    buttonRect.guanYin = DestinyPage.boxRect
    buttonRect.zhouGong = DestinyPage.loveBoxRect
  }
}

function onDestinyDetailPage(callback) {
  executeByCurrentPage(
    () => { if (typeof callback === 'function') callback() },
    PageName.guanYinDetail,
    PageName.zhouGongDetail
  )
}

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

/* 
* 各个页面的绘制函数, PS: 使用命令对象代替switch语句
* 都知道 `Swith` 不好， 冗长及不安全
*/
function showPage(name, context) {
  const names = {
    'home': () => Pages.home(context),
    'history': () => Pages.history(context),
    'destiny': () => Pages.destiny(context),
    'guanYin': () => Pages.guanYin(context),
    'zhouGong': () => Pages.zhouGong(context),
    'prodDetail': () => Pages.prod(context),
    'poemDetail': () => Pages.poem(context),
    'explanation': () => Pages.explanation(context),
  }
  if (typeof names[name] !== 'function') return
  return names[name]()
}

const Pages = {
  home: (context) => {
    HomePage.draw(context)
    clickToLoadPage(buttonRect.destiny, PageName.destiny)
    clickToLoadPage(buttonRect.history, PageName.history)
  },
  history: (context) => {
    History.draw(context, Touch.moveX)
    clickToLoadPage(buttonRect.back, PageName.home)
  },
  destiny: (context) => {
    setBlockStatus(Global.userAgent.cd > 0)
    DestinyPage.draw(context, Touch.moveX)
    clickToLoadPage(buttonRect.back, PageName.home)
    clickToLoadPage(buttonRect.guanYin, PageName.guanYinDetail)
    clickToLoadPage(buttonRect.zhouGong, PageName.zhouGongDetail)
  },
  guanYin: (context) => {
    DestinyDetail.draw(context, Global.BoxType.guanYin, ProdHorizontalOffset)
    clickToLoadPage(buttonRect.back, PageName.destiny)
  },
  zhouGong: (context) => {
    DestinyDetail.draw(context, Global.BoxType.zhouGong, ProdHorizontalOffset)
    clickToLoadPage(buttonRect.back, PageName.destiny)
  },
  prod: (context) => {
    ProdDetail.draw(context)
    clickToLoadPage(buttonRect.back, PageName.destiny)
    clickToLoadPage(buttonRect.prod, PageName.poemDetail)
  },
  poem: (context) => {
    PoemDetail.draw(context)
    clickToLoadPage(buttonRect.back, PageName.prodDetail)
    clickToLoadPage(buttonRect.explanation, PageName.explanationDetail)
    clickToLoadPage(buttonRect.save, PageName.poemDetail)
  },
  explanation: (context) => {
    Explanation.draw(context, Touch.moveY, (totalHeight) => {
      Touch.explanationHeight = totalHeight
    })
    clickToLoadPage(buttonRect.back, PageName.poemDetail)
  }
}