/*
* @author KaySaith
* @date 2018-02-01
*/

import { UIKit } from '../../common/uikit'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'

let prodImage = wx.createImage()
prodImage.src = UIKit.imageSrc.prod

let moveDistance = Component.ScreenSize.height * 2

let prodWidth = Component.ScreenSize.width * 0.32
let prodRect = {
  width: prodWidth,
  height: prodWidth * 5,
  left: (Component.ScreenSize.width - prodWidth) / 2,
  top: moveDistance
}

let prodNameImage = wx.createImage()
prodNameImage.src = UIKit.imageSrc.prodName1

let adaptingTop = Math.max(300, Component.ScreenSize.height - prodRect.height + 100)
let prodNameRect = {
  width: prodRect.width,
  height: prodRect.width,
  left: prodRect.left,
  top: adaptingTop + prodRect.height * 0.056
}

let buttonLeft = (Component.ScreenSize.width - UIKit.size.roundRectButtonWidth) / 2
let buttonRect = { 
  left: buttonLeft, 
  top: adaptingTop - 80, 
  width: UIKit.size.roundRectButtonWidth, 
  height: UIKit.size.roundRectButtonHeight 
}

export class ProdDetail {

  static buttonRect = buttonRect

  static draw(context) {
    Utils.drawImageAndMoveToTopWithAnimation(
      context,
      prodImage,
      prodRect,
      5,
      Math.min(moveDistance - 300, prodRect.height - 100 + Component.ScreenSize.height),
      function() {
        Utils.drawCustomImage(context, prodNameImage, prodNameRect)
      }
    )

    Component.addBackButton(context)

    Utils.drawText(context, 
    'Police had to trudge through two to three feet /nof debris to get to 94-year-old Robert Libby: soiled /nadult diapers, garbage and thousands of beer cans',
      UIKit.color.title,
      Component.ScreenSize.height * 0.15,
      35
    )

    Utils.drawRoundRect(
      context, 
      6, 
      buttonRect, 
      UIKit.size.roundRectButtonHeight, 
      UIKit.color.title,
      'Check Prod Detail'
    )
  }
}