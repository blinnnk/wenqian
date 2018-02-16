/*
 * @author KaySaith
 * @date 2018-02-16
 */

import { NetUtils } from '../../util/netUtils'
import { Global } from '../../common/global'
import { Utils } from '../../util/utils'

export class Presenter {

  static setSrcOf(image) {
    // 先校验本地是否有缓存
    wx.getStorage({
      key: 'prodImage',
      success: function(result) {
        // 如果有本地缓存文件就校验是否是我们需要取的那一只
        if (
          result.data.boxType === Global.currentBoxType
          && result.data.prodIndex === Global.prodInfo.index
        )
          image.src = result.data.localPath
        // 如果不是就从新拉取并保存在本地
        else getLocalImageFromServer()
      },
      fail: () => Utils.retry(getLocalImageFromServer)
    })
    function getLocalImageFromServer() {
      // 显示 Loading
      wx.showLoading({ title: '正在生成签语' })
      NetUtils.downloadFile({
        url: Global.prodInfo.src,
        response: (localSrc) => {
          wx.setStorage({
            key: 'prodImage',
            data: { boxType: Global.currentBoxType, prodIndex: Global.prodInfo.index, localPath: localSrc },
          })
          image.src = localSrc
        },
        // 调用成功后的回调
        complete: (isSuccess) => {
          if (isSuccess) wx.hideLoading()
          else wx.showToast({ title: '加载图片失败' })
        },
        // 接口调用失败重新拉取
        fail: () => Utils.retry(Presenter.setSrcOf)
      })
    }
  }
}