/*
* @author KaySaith
* @date 2018-02-01
*/

import { UIKit } from '../../common/uikit'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'
import { NetUtils } from '../../util/netUtils'
import { Api } from '../../common/api'

let destinyImage = wx.createImage()
let destinyImageRect = {
  left: 0,
  top: 200,
  width: Component.ScreenSize.width,
  height: Component.ScreenSize.width
}

let buttonLeft = 
  (Component.ScreenSize.width - UIKit.size.roundRectButtonWidth) / 2
let buttonRect = {
  left: buttonLeft,
  top: Component.ScreenSize.height * 0.9 - 50 - 128,
  width: UIKit.size.roundRectButtonWidth,
  height: UIKit.size.roundRectButtonHeight
}

let saveButtonRect = {
  left: buttonLeft,
  top: Component.ScreenSize.height * 0.9 - 50,
  width: UIKit.size.roundRectButtonWidth,
  height: UIKit.size.roundRectButtonHeight
}

export class PoemDetail {

  static explanationButtonRect = buttonRect

  static getPoemImage() {
    // 显示 Loading
    wx.showLoading({
      title: '正在生成签语',
      mask: true
    })
    NetUtils.getLocalPathByDownloadingNetFile(
      Api.destinyPoem,
      function (localSrc) {
        destinyImage.src = localSrc
      },
      function (isSuccsee) {
        // 调用成功后的回调
        if (isSuccsee == true) {
          wx.hideLoading()
        } else {
          wx.showToast({
            title: '加载图片失败',
          })
        }
      }
    )
  }
  static draw(context) {
    Utils.drawCustomImage(
      context,
      destinyImage,
      destinyImageRect
    )

    Utils.drawText(context,
      'Police had to trudge through two to three feet /nof debris to get to 94-year-old Robert Libby: soiled /nadult diapers, garbage and thousands of beer cans',
      UIKit.color.title,
      destinyImageRect.top + destinyImageRect.height + 100,
      35
    )

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