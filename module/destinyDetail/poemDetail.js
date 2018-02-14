/*
* @author KaySaith
* @date 2018-02-01
*/

import { UIKit } from '../../common/uikit'
import { Global } from '../../common/global'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'
import { NetUtils } from '../../util/netUtils'
import { Api } from '../../common/api'

const destinyImage = wx.createImage()
const destinyImageRect = {
  left: 0,
  top: 200,
  width: Component.ScreenSize.width,
  height: Component.ScreenSize.width
}

const buttonLeft =
  (Component.ScreenSize.width - UIKit.size.roundRectButtonWidth) / 2
const buttonRect = {
  left: buttonLeft,
  top: Component.ScreenSize.height * 0.9 - 50 - 128,
  width: UIKit.size.roundRectButtonWidth,
  height: UIKit.size.roundRectButtonHeight
}

const saveButtonRect = {
  left: buttonLeft,
  top: Component.ScreenSize.height * 0.9 - 50,
  width: UIKit.size.roundRectButtonWidth,
  height: UIKit.size.roundRectButtonHeight
}

export class PoemDetail {

  static explanationButtonRect = buttonRect
  static saveButtonRect = saveButtonRect

  static savePoemImageToAlbum() {
    if (destinyImage.src == '') wx.showToast({ title: '还没有生成图片' })
    else Utils.saveImageToAlbum(destinyImage.src)
  }

  static getPoemImage() {
    // 先校验本地是否有缓存
    wx.getStorage({
      key: 'prodImage',
      success: function(result) {
        console.log('fuck shit' + result.data)
        // 如果有本地缓存文件就校验是否是我们需要取的那一只
        if (result.data.boxType == Global.currentBoxType && result.data.prodIndex == Global.prodInfo.index) 
          destinyImage.src = result.data.localPath
        // 如果不是就从新拉取并保存在本地
        else getLocalImageFromServer()
      },
      fail: () => getLocalImageFromServer()
    })
    function getLocalImageFromServer() {
      console.log('hey baby')
      // 显示 Loading
      wx.showLoading({ title: '正在生成签语' })
      NetUtils.downloadFile({
        url: Global.prodInfo.src,
        response: (localSrc) => {
          wx.setStorage({
            key: 'prodImage',
            data: { boxType: Global.currentBoxType, prodIndex: Global.prodInfo.index, localPath: localSrc },
          })
          destinyImage.src = localSrc
        },
        // 调用成功后的回调
        complete: (isSuccsee) => {
          if (isSuccsee == true) wx.hideLoading()
          else wx.showToast({ title: '加载图片失败' })
        },
        // 接口调用失败重新拉取
        fail: () => Utils.retry(() => Global.getPoemImage())
      })
    }
  }
  static draw(context) {

    Component.addBackButton(context)

    Utils.drawImageAndMoveOvalPathWithAnimation(
      context,
      destinyImage,
      destinyImageRect,
      0.02, 30, 20
    )

    Utils.drawText(context, {
      text: 'Police had to trudge through two to three feet /nof debris to get to 94-year-old Robert Libby: soiled /nadult diapers, garbage and thousands of beer cans',
      textColor: UIKit.color.title,
      centerY: destinyImageRect.top + destinyImageRect.height + 100,
      lineHeight: 35
    })

    Utils.drawRoundRect(
      context,
      6,
      buttonRect,
      UIKit.size.roundRectButtonHeight,
      UIKit.color.title,
      'EXPLANATION $0.99'
    )

    Utils.drawRoundRect(
      context,
      6,
      saveButtonRect,
      UIKit.size.roundRectButtonHeight,
      UIKit.color.title,
      'SAVE TO ALBUM'
    )
  }
}