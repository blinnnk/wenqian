/*
* @author shangqi
* @date 2018-01-31
*/
import { Component } from '../../common/component'
import { Canvas } from '../../common/component'
import { Utils } from '../../util/utils'
import { UIKit } from '../../common/uikit'

let ScreenWidth = Component.ScreenSize.width
let ScreenHeight = Component.ScreenSize.height
var isOnEdge = false

let GantryX1 = 0
let CloudX1 = ScreenWidth * 0.42
let TextX1 = ScreenWidth * 0.58
let CloudX2 = ScreenWidth
let RoyalRalaceX = ScreenWidth * 0.74

var GantryWidth = 1271 / (1080 / ScreenHeight)
let GantryRect = {
  top: 0,
  left: GantryX1,
  width: GantryWidth,
  height: Canvas.height * 2
}
let cloudRect = {
  top: ScreenHeight * 0.4,
  left: CloudX1,
  width: ScreenWidth * 0.16,
  height: ScreenWidth * 0.07
}
let textRect = {
  top: ScreenHeight * 0.22,
  left: TextX1,
  width: ScreenWidth * 0.35,
  height: ScreenWidth * 0.88
}
let cloudRect2 = {
  top: ScreenHeight * 0.54,
  left: CloudX2,
  width: ScreenWidth * 0.25,
  height: ScreenWidth * 0.09
}
let royalRalaceRect = {
  top: ScreenHeight - ScreenWidth * 0.42,
  left: RoyalRalaceX,
  width: ScreenWidth,
  height: ScreenWidth * 0.42
}

let gantryImage = wx.createImage()
gantryImage.src = 'sources/image/history/Gantry-01.png'

let cloudImage = wx.createImage()
cloudImage.src = 'sources/image/history/yun-01.png'

let textImage = wx.createImage()
textImage.src = 'sources/image/history/text-01.png'

let cloudImage2 = wx.createImage()
cloudImage2.src = 'sources/image/history/yun-02.png'

let royalRalaceImage = wx.createImage()
royalRalaceImage.src = 'sources/image/history/royal_ralace.jpg'

let backImage = wx.createImage()
backImage.src = 'sources/image/backArrow.png'

let backButtonRect = {
  width: UIKit.size.buttonWidth,
  height: UIKit.size.buttonHeight,
  left: ScreenWidth * 0.065,
  top: ScreenWidth * 0.1
}

// 界面主函数
export class HistoryPage {
  static draw(context, touchMoveX, direction, triggerEdgeCallback) {    
    if (GantryRect.left < GantryX1 || direction == UIKit.direction.left){
      GantryRect.left = GantryX1 + touchMoveX
      cloudRect.left = CloudX1 + touchMoveX
      cloudRect2.left = CloudX2 + touchMoveX
      textRect.left = TextX1 + touchMoveX
      royalRalaceRect.left = RoyalRalaceX + touchMoveX
      isOnEdge = false
    }else{
      GantryRect.left = GantryX1
      cloudRect.left = CloudX1
      cloudRect2.left = CloudX2
      textRect.left = TextX1
      royalRalaceRect.left = RoyalRalaceX
      isOnEdge = true
    }  

    if (typeof triggerEdgeCallback === 'function') {
      triggerEdgeCallback(isOnEdge, GantryRect.left)
    }
    //绘制背景色
    context.fillStyle = '#fffbf8'
    context.fillRect(0, 0, Canvas.width*2, Canvas.height*2)
    Utils.drawCustomImage(context, royalRalaceImage, royalRalaceRect)
    Utils.drawCustomImage(context, gantryImage, GantryRect) 
    Utils.drawCustomImage(context, cloudImage, cloudRect)
    Utils.drawCustomImage(context, textImage, textRect)
    Utils.drawCustomImage(context, cloudImage2, cloudRect2)
    Utils.drawCustomImage(context, backImage, backButtonRect)
  }
}