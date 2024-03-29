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
import { Image } from '../../common/element'


const prodImage = Image()
const prodNameImage = Image()

const moveDistance = Component.ScreenSize.height * 2

const prodWidth = Component.ScreenSize.width * 0.32
const prodRect = {
  width: prodWidth,
  height: prodWidth * 5,
  left: (Component.ScreenSize.width - prodWidth) / 2,
  top: moveDistance
}

const adaptingTop = Math.max(300, Component.ScreenSize.height - prodRect.height + 100)
const prodNameRect = {
  width: prodRect.width,
  height: prodRect.width,
  left: prodRect.left,
  top: adaptingTop + prodRect.height * 0.056
}

const buttonLeft = (Component.ScreenSize.width - UIKit.size.roundRectButtonWidth) / 2
const buttonRect = {
  left: buttonLeft,
  top: adaptingTop - 130,
  width: UIKit.size.roundRectButtonWidth,
  height: UIKit.size.roundRectButtonHeight
}

export class ProdDetail {

  static buttonRect = buttonRect

  static getProdInfo(callback) {
    NetUtils.getResultWithApi({
      url: Api.destinyPoem,
      apiParameters: {
        noncestr: Date.now(),
        type: Global.currentBoxType
      },
      response: (result) => {
        Global.prodInfo = 
        { src: result.data.image, xj: result.data.xj, index: result.data.index }
        prodNameImage.src = prodTypeImageSrc(result.data.xj)
      },
      complete: (isSuccess) => {
        if (isSuccess) {
          if (typeof callback === 'function') callback() 
        } else Utils.retry(ProdDetail.getProdInfo) 
      },
      fail: () => Utils.retry(ProdDetail.getProdInfo) 
    })
  }

  static draw(context) {

    prodImage.src = Global.serverImages.prod

    Utils.drawImageAndMoveToTopWithAnimation(
      context,
      prodImage,
      prodRect,
      5,
      Math.min(moveDistance - 300, prodRect.height - 100 + Component.ScreenSize.height),
      () => Utils.drawCustomImage(context, prodNameImage, prodNameRect)
    )

    Component.addBackButton(context)

    Utils.drawText(context,{
      text: 'Police had to trudge through two to three feet /nof debris to get to 94-year-old Robert Libby: soiled /n adult diapers, garbage and thousands of beer cans',
      textColor: UIKit.color.title,
      centerY: Component.ScreenSize.height * 0.15,
      lineHeight: 35
    })

    Utils.drawRoundRect(context, {
      strokeWidth: 6,
      radius: UIKit.size.roundRectButtonHeight,
      strokeColor: UIKit.color.title,
      rect: buttonRect,
      text: 'Check Prod Detail'
    })
  }
}

const prodTypeImageSrc = (name) => {
  const src = {
    '上上签': UIKit.prodType.prodName1,
    '下下签': UIKit.prodType.prodName16,
    '上签': UIKit.prodType.prodName2,
    '上中签': UIKit.prodType.prodName3,
    '中签': UIKit.prodType.prodName4,
    '中上签': UIKit.prodType.prodName5,
    '中中签': UIKit.prodType.prodName6,
    '中下签': UIKit.prodType.prodName7,
    '下签': UIKit.prodType.prodName8,
    '大吉': UIKit.prodType.prodName9,
    '上吉签': UIKit.prodType.prodName10,
    '中吉签': UIKit.prodType.prodName11,
    '上平签': UIKit.prodType.prodName12,
    '中平签': UIKit.prodType.prodName13,
    '平中签': UIKit.prodType.prodName14,
    '平平签': UIKit.prodType.prodName15
  }
  return src[name]
}