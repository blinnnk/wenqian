/*
* @author KaySaith
* @date 2018-02-11
*/

import { UIKit } from '../../common/uikit'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'
import { NetUtils } from '../../util/netUtils'
import { Api } from '../../common/api'
import { Global } from '../../common/global'

const typeImage = Utils.Image(UIKit.imageSrc.zhouGongType)
const typeImageRect = {
  left: 60,
  top: 200,
  width: 60,
  height: 240
}

const maxWidth = 
  Component.ScreenSize.width - (typeImageRect.left * 2 + typeImageRect.width + 70)
const contentTop = 200
const contentLeft = 170
const spaceBetweenTitleAndContent = 20

const dotTop = typeImageRect.top + typeImageRect.height + 30
const dotLeft = typeImageRect.left + typeImageRect.width / 2

const prodIndexLeft = typeImageRect.left + (typeImageRect.width - UIKit.textSize.title) / 2

var content = null
var eachTitleTextWidth = []
var eachContentTextWidth = []

export class Explanation {

  static draw(context, touchMoveY, getContentHeight) {

    Component.addBackButton(context)
    Utils.drawCustomImage(context, typeImage, typeImageRect)
    Utils.drawRound(context, {
      color: UIKit.color.title,
      rect: { left: dotLeft, top: dotTop },
      radius: 10
    })

    Utils.drawSingleText(context, {
      text: '第' + Utils.convertNumberToChineseCharacters(Global.prodInfo.index) + '签详解',
      color: UIKit.color.title,
      font: UIKit.font.title,
      maxWidth: UIKit.textSize.title,
      textSize: UIKit.textSize.title,
      lineSpace: 0,
      textSpace: 5,
      left: prodIndexLeft,
      top: dotTop + 50
    }) 

    if (content == null) return
    var contentTotalHeight = contentTop
    for (var index in content) {

      Utils.drawSingleText(context, {
        text: content[index].title,
        color: UIKit.color.title,
        font: UIKit.font.title,
        maxWidth: maxWidth,
        textSize: UIKit.textSize.title,
        lineSpace: 0,
        textSpace: 5,
        left: contentLeft,
        top: contentTotalHeight + touchMoveY,
        textMeasuredWidth: eachTitleTextWidth[index],
        getTotalHeight: (totalHeight) => {
          contentTotalHeight += totalHeight + spaceBetweenTitleAndContent
        }
      })
      Utils.drawSingleText(context, {
        text: content[index].text,
        color: UIKit.color.title,
        font: UIKit.font.content,
        maxWidth: maxWidth,
        textSize: UIKit.textSize.content,
        lineSpace: 8,
        textSpace: -8,
        left: contentLeft,
        top: contentTotalHeight + touchMoveY,
        textMeasuredWidth: eachContentTextWidth[index],
        getTotalHeight: (totalHeight) => {
          contentTotalHeight += totalHeight + 50
        }
      }) 

      if (index == content.lastIndex()) {
        // 这个值传出去用来控制手指上下滚动事件边界的限制
        if (typeof getContentHeight === 'function') 
          getContentHeight(contentTotalHeight)
      }
    }
  }

  static getExplanation() {
    wx.showLoading({ title: '正在生成签语' })
    NetUtils.getResultWithApi({
      url: Api.explanation,
      response: (result) => {
        wx.hideLoading()
        content = result.data.content
        // 在这里提前计算好每个文字的宽度较少绘制时计算的压力
        for (var index in content) {
          eachTitleTextWidth.push(
            Utils.measureEachText(Component.context, content[index].title)
          )
          eachContentTextWidth.push(
            Utils.measureEachText(Component.context, content[index].text)
          )
        }
      },
      apiParameters: {
        noncestr: Date.now(),
        type: Global.currentBoxType,
        index: Global.prodInfo.index,
      },
      fail: () => Utils.retry(() => Explanation.getExplanation())
    })
  }
}
