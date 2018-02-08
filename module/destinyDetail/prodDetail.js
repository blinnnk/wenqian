/*
* @author KaySaith
* @date 2018-02-01
*/

import { UIKit } from '../../common/uikit'
import { Component } from '../../common/component'
import { Utils } from '../../util/utils'
import { NetUtils } from '../../util/netUtils'
import { Api } from '../../common/api'
import { CurrentBoxType } from '../../module/destinyDetail/destinyDetail'

const prodImage = wx.createImage()
prodImage.src = UIKit.imageSrc.prod

const moveDistance = Component.ScreenSize.height * 2

const prodWidth = Component.ScreenSize.width * 0.32
const prodRect = {
  width: prodWidth,
  height: prodWidth * 5,
  left: (Component.ScreenSize.width - prodWidth) / 2,
  top: moveDistance
}

const prodNameImage = wx.createImage()
prodNameImage.src = UIKit.prodType.prodName1

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
  top: adaptingTop - 80, 
  width: UIKit.size.roundRectButtonWidth, 
  height: UIKit.size.roundRectButtonHeight 
}

/*
* 因为网络返回的接口中 签的类型和图片一起返回, 这里设计成在这个页面解析出
* 图片的网络参数数据, 在这里主要使用签的类型 [xj] 上上签,中签...
* 把网络 Src 传入到 PoemDetail 进行本地路径转换, 有点耦合但是接口这么给
* 的这样子设计效率是最高的. 故此.
*/
export var ProdInfo = {
  src: '',
  xj: ''
}

export class ProdDetail {

  static buttonRect = buttonRect
  
  static getPoemInfo() {
    NetUtils.getApiInfo(
      Api.destinyPoem,
      function (info) {
        ProdInfo = info
        prodNameImage.src = getCurrentProdTypeImageSrc(info.xj)
      },
      CurrentBoxType,
      function(isSuccess) {
        if (isSuccess == true) {
          wx.showToast({
            title: ProdInfo.xj,
          })
        }
      }
    )
  }

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

function getCurrentProdTypeImageSrc(xj) {
  var src = ''
  switch (xj) {
    case '上上签':
      src = UIKit.prodType.prodName1
      break
    case '上签':
      src = UIKit.prodType.prodName2
      break
    case '上中签':
      src = UIKit.prodType.prodName3
      break
    case '中签':
      src = UIKit.prodType.prodName4
      break
    case '中上签':
      src = UIKit.prodType.prodName5
      break
    case '中中签':
      src = UIKit.prodType.prodName6
      break
    case '中下签':
      src = UIKit.prodType.prodName7
      break
    case '下签':
      src = UIKit.prodType.prodName8
      break
    case '大吉':
      src = UIKit.prodType.prodName9
      break
    case '上吉':
      src = UIKit.prodType.prodName10
      break
    case '中吉':
      src = UIKit.prodType.prodName11
    case '上平签':
      src = UIKit.prodType.prodName12
      break
    case '中平签':
      src = UIKit.prodType.prodName13
      break
    case '平中签':
      src = UIKit.prodType.prodName14
      break
    case '平平签':
      src = UIKit.prodType.prodName15
      break
    default:
      src = ''
      break
  }
  return src
}