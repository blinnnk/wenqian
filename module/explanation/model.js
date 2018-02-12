/*
* @author KaySaith
* @date 2018-02-12
* @description `mvp` 结构把网络逻辑计算逻辑从 `view` 中抽离
*/

import { Utils } from '../../util/utils'
import { Component } from '../../common/component'
import { UIKit } from '../../common/uikit'

export function Model(data) {
  var model = {
    title: data.title,
    text: data.text,
    eachTitleTextWidth: [],
    eachContentTextWidth: []
  }
  // 在这里提前计算好每个文字的宽度较少绘制时计算的压力
  model.eachTitleTextWidth = 
    Utils.measureEachText(Component.context, data.title, UIKit.textSize.title, UIKit.font.title)
  model.eachContentTextWidth = 
    Utils.measureEachText(Component.context, data.text, UIKit.textSize.content, UIKit.font.content)
  return model
}
