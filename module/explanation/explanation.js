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

export class Explanation {
  static draw(context) {
    context.fillStyle = "black"
    context.fillRect(100, 100, 550, 200)
    
    Component.addBackButton(context)
  }

  static getExplanation() {
    // 显示 `Loading`
    wx.showLoading({ title: '正在生成签语' })
    NetUtils.getResultWithApi({
      url: Api.explanation,
      response: (result) => {
        wx.hideLoading()
        console.log('fuck1' + result.data.content)
      },
      apiParameters: {
        noncestr: Date.now(),
        type: Global.currentBoxType,
        index: 1,
      },
      fail: () => Utils.retry(() => Explanation.getExplanation())
    })
  }
}
