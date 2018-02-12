/*
* @author KaySaith
* @date 2018-02-12
* @description `mvp` 结构把网络逻辑计算逻辑从 `view` 中抽离
*/

import { Utils } from '../../util/utils'
import { NetUtils } from '../../util/netUtils'
import { Api } from '../../common/api'
import { Global } from '../../common/global'

export class Presenter {

  static content = null

  static getExplanation() {
    wx.showLoading({ title: '正在生成签语' })
    NetUtils.getResultWithApi({
      url: Api.explanation,
      response: (result) => {
        wx.hideLoading()
        Presenter.content = result.data.content
      },
      apiParameters: {
        noncestr: Date.now(),
        type: Global.currentBoxType,
        index: Global.prodInfo.index,
      },
      fail: () => Utils.retry(() => Presenter.getExplanation())
    })
  }
}
