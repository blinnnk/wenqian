/*
* @author KaySaith
* @date 2018-02-01
*/

import { UIKit } from '../../common/uikit'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'
import { Presenter } from './presenter'
import { Image } from '../../common/element'


const destinyImage = Image()
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
  top: Component.ScreenSize.height * 0.9 - 50 - 178,
  width: UIKit.size.roundRectButtonWidth,
  height: UIKit.size.roundRectButtonHeight
}

const saveButtonRect = {
  left: buttonLeft,
  top: Component.ScreenSize.height * 0.9 - 50 - 50,
  width: UIKit.size.roundRectButtonWidth,
  height: UIKit.size.roundRectButtonHeight
}

export class PoemDetail {

  static explanationButtonRect = buttonRect
  static saveButtonRect = saveButtonRect

  static savePoemImageToAlbum() {
    if (destinyImage.src === '') wx.showToast({ title: '还没有生成图片' })
    else Utils.saveImageToAlbum(destinyImage.src)
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
      text: 'Police had to trudge through two to three feet /nof debris to get to 94-year-old Robert Libby: soiled /n adult diapers, garbage and thousands of beer cans',
      textColor: UIKit.color.title,
      centerY: destinyImageRect.top + destinyImageRect.height + 100,
      lineHeight: 35
    })

    Utils.drawRoundRect(context, {
      strokeWidth: 6,
      rect: buttonRect,
      radius: UIKit.size.roundRectButtonHeight,
      strokeColor: UIKit.color.title,
      text: 'EXPLANATION $0.99'
    })

    Utils.drawRoundRect(context, {
      strokeWidth: 6,
      rect: saveButtonRect,
      radius: UIKit.size.roundRectButtonHeight,
      text: 'SAVE TO ALBUM',
      strokeColor: UIKit.color.title
    })
  }

  static updatePoemImage() {
    Presenter.setSrcOf(destinyImage)
  }
}