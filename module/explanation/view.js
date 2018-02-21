/*
* @author KaySaith
* @date 2018-02-11
*/

import { UIKit } from '../../common/uikit'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'
import { Global } from '../../common/global'
import { Presenter } from 'presenter'
import { Model } from 'model'


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

let model

export class Explanation {

  static draw(context, touchMoveY, getContentHeight) {

    Component.addBackButton(context)
    Utils.drawCustomImage(context, typeImage, typeImageRect)
    if (Global.currentBoxType === Global.BoxType.guanYin)
      typeImage.src = UIKit.imageSrc.guanYinType
    else typeImage.src = UIKit.imageSrc.zhouGongType

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

    let contentTotalHeight = contentTop
    // 画所有段落
    Presenter.content.forEach (item => {
      model = Model(item)
      // 画标题
      Utils.drawSingleText(context, {
        text: model.title,
        color: UIKit.color.title,
        font: UIKit.font.title,
        maxWidth: maxWidth,
        textSize: UIKit.textSize.title,
        lineSpace: 0,
        textSpace: 5,
        left: contentLeft,
        top: contentTotalHeight + touchMoveY,
        textMeasuredWidth: model.eachTitleTextWidth,
        getTotalHeight: (totalHeight) => {
          contentTotalHeight += totalHeight + spaceBetweenTitleAndContent
        }
      })
      // 画正文
      Utils.drawSingleText(context, {
        text: model.text,
        color: UIKit.color.title,
        font: UIKit.font.content,
        maxWidth: maxWidth,
        textSize: UIKit.textSize.content,
        lineSpace: 8,
        textSpace: 0,
        left: contentLeft,
        top: contentTotalHeight + touchMoveY,
        textMeasuredWidth: model.eachContentTextWidth,
        getTotalHeight: (totalHeight) => contentTotalHeight += totalHeight + 50
      })

      if (item === Presenter.content.last()) {
        // 这个值传出去用来控制手指上下滚动事件边界的限制
        if (typeof getContentHeight === 'function') getContentHeight(contentTotalHeight)
      }
    })
  }
  // 更新数据内容
  static updateContent() {
    Presenter.getExplanation()
  }
}
