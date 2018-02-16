/*
* @author KaySaith
* @date 2018-02-13
*/

import { UIKit } from '../../common/uikit'
import { Global } from '../../common/global'
import { Utils } from '../../util/utils'
import { Component } from '../../common/component'
import { Image } from '../../common/element'


const godnessHeaderImage = Image()
const godnessHeaderImageLeft = 350
const godnessHeaderImageRect = {
  left: godnessHeaderImageLeft,
  top: Component.ScreenSize.height - 1024,
  width: 1024,
  height: 1024
}

const godnessImage = Image()
const godnessImageLeft = godnessHeaderImageLeft + 800
const godnessImageRect = {
  left: godnessImageLeft,
  top: 0,
  width: 1024,
  height: 1024
}

const textContent1 = Image()
const textContent2 = Image()

let textContent1Info = null
let textContent2Info = null


const maxHeight = Component.ScreenSize.height * 0.42
const textTop = Component.ScreenSize.height * 0.15

export class History {
  static draw(context, touchMoveX) {

    Component.addBackButton(context)

    godnessHeaderImage.src = Global.serverImages.godnessHeader
    godnessHeaderImageRect.left = touchMoveX * 0.55
    Utils.drawCustomImage(
      context,
      godnessHeaderImage,
      godnessHeaderImageRect
    ) 

    godnessImage.src = Global.serverImages.godness
    godnessImageRect.left = godnessImageLeft + touchMoveX * 1.2 - 100
    Utils.drawCustomImage(
      context,
      godnessImage,
      godnessImageRect
    )

    if (textContent1Info === null) {
      convertTextToImageObject({
        key: 'historyImage1',
        text: '求簽至遲產生於唐朝末年的道觀中，後來幾乎遍及壹切神廟、宮觀和寺院中。簽多以所依托的神靈命名，簽是依於神示的，某某簽條上的辭句被認為是該神的教導、啟示、預言，因此簽皆以神名，稱某某神靈簽。從理論上說，有多少神有專廟或專殿，就有多少簽。',
        callback: (info) => textContent1Info = info
      })
    }

    if (textContent2Info === null) {
      convertTextToImageObject({
        key: 'historyImage2',
        text: '北門橋有玄帝廟，相傳聖像乃南唐北城門樓上所供奉的，移像於今廟，廟有簽，靈驗不可勝紀。人竭誠祈之往往洞人心腹之隱與禍福之應，如面語者。余生平凡有祈，靡不奇中 。',
        callback: (info) => textContent2Info = info
      })
    }

    if (textContent1Info !== null && textContent2Info !== null) {

      textContent1.src = textContent1Info.path
      Utils.drawCustomImage(context, textContent1, {
        left: 100 + touchMoveX * 0.75,
        top: textTop,
        width: textContent1Info.width,
        height: textContent1Info.height
      })

      textContent2.src = textContent2Info.path
      Utils.drawCustomImage(context, textContent2, {
        left: Component.ScreenSize.width * 0.9 + touchMoveX * 0.74,
        top: textTop,
        width: textContent2Info.width,
        height: textContent2Info.height
      })
    }
  }
}

function convertTextToImageObject (param = { text: String, callback: Function, key: String }) {
  Utils.getLocalImageByDrawingContent({
    key: param.key,
    onDraw: (context, hasFinish) => {
      Utils.drawVerticalText(context, {
        text: param.text,
        color: UIKit.color.title,
        font: UIKit.font.title,
        lineSpace: 3,
        textSpace: 10,
        textSize: UIKit.textSize.title,
        maxHeight: maxHeight,
        left: 0,
        top: UIKit.textSize.title,
        getContentWidth: (contentWidth) => {
          hasFinish({
            top: 0,
            left: 0,
            width: contentWidth,
            height: maxHeight + UIKit.textSize.title
          })
        }
      })
    },
    holdInfo: (info) => { if (typeof param.callback === 'function') param.callback(info) }
  })
}