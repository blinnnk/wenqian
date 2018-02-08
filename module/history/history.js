/*
* @author shangqi
* @date 2018-01-31
*/
import HistorySize from 'historySize'
import HistoryImage from 'historyImage'
import { Component } from '../../common/component'
import { Canvas } from '../../common/component'
import { Utils } from '../../util/utils'
import { UIKit } from '../../common/uikit'

//初始化size值
var historySize = new HistorySize()
historySize.initSize()
historySize.initRect()

//创建图片
var historyImage = new HistoryImage()
historyImage.creatImage()

let screenWidth = Component.ScreenSize.width
let screenHeight = Component.ScreenSize.height
let isOnEdge = false

// 界面主函数
export class HistoryPage {
  static draw(context, touchMoveX, direction, triggerEdgeCallback) {    
    if (
      (historySize.gantryRect.left < historySize.gantryX1 || direction == UIKit.direction.left) && 
      (historySize.character4Rect.left > -(screenWidth * 0.3) || direction == UIKit.direction.right)) {  
      isOnEdge = false
      historySize.gantryRect.left = historySize.gantryX1 + touchMoveX
      historySize.gantry2Rect.left = historySize.gantryX2 + touchMoveX
      historySize.cloudRect.left = historySize.cloudX1 + touchMoveX
      historySize.cloudRect2.left = historySize.cloudX2 + touchMoveX
      historySize.cloudRect3.left = historySize.cloudX3 + touchMoveX
      historySize.cloudRect4.left = historySize.cloudX4 + touchMoveX
      historySize.cloudRect5.left = historySize.cloudX5 + touchMoveX
      historySize.cloudRect6.left = historySize.cloudX6 + touchMoveX
      historySize.cloudRect7.left = historySize.cloudX7 + touchMoveX
      historySize.cloudRect8.left = historySize.cloudX8 + touchMoveX
      historySize.cloudRect9.left = historySize.cloudX9 + touchMoveX
      historySize.cloudRect10.left = historySize.cloudX10 + touchMoveX
      historySize.cloudRect11.left = historySize.cloudX11 + touchMoveX
      historySize.cloudRect12.left = historySize.cloudX12 + touchMoveX
      historySize.cloudRect13.left = historySize.cloudX13 + touchMoveX
      historySize.cloudRect14.left = historySize.cloudX14 + touchMoveX
      historySize.cloudRect15.left = historySize.cloudX15 + touchMoveX
      historySize.cloudRect16.left = historySize.cloudX16 + touchMoveX
      historySize.cloudRect17.left = historySize.cloudX17 + touchMoveX
      historySize.cloudRect18.left = historySize.cloudX18 + touchMoveX
      historySize.cloudRect19.left = historySize.cloudX19 + touchMoveX
      historySize.cloudRect20.left = historySize.CloudX20 + touchMoveX
      historySize.text1Rect.left = historySize.textX1 + touchMoveX
      historySize.text2Rect.left = historySize.textX2 + touchMoveX
      historySize.text3Rect.left = historySize.textX3 + touchMoveX
      historySize.text4Rect.left = historySize.textX4 + touchMoveX
      historySize.text5Rect.left = historySize.textX5 + touchMoveX
      historySize.text6Rect.left = historySize.textX6 + touchMoveX
      historySize.text7Rect.left = historySize.textX7 + touchMoveX
      historySize.royalRalaceRect.left = historySize.royalRalaceX + touchMoveX
      historySize.templeRect.left = historySize.templeX + touchMoveX
      historySize.dragoncolumn1Rect.left = historySize.dragoncolumnX1 + touchMoveX
      historySize.dragoncolumn2Rect.left = historySize.dragoncolumnX2 + touchMoveX
      historySize.lotteryRect.left = historySize.lotteryX + touchMoveX
      historySize.leafRect.left = historySize.leafX + touchMoveX
      historySize.character1Rect.left = historySize.characterX1 + touchMoveX
      historySize.character2Rect.left = historySize.characterX2 + touchMoveX
      historySize.character3Rect.left = historySize.characterX3 + touchMoveX
      historySize.character4Rect.left = historySize.characterX4 + touchMoveX
      historySize.EverythingIsGoodRect.left = historySize.everythingIsGoodX + touchMoveX
      historySize.HardworkRect.left = historySize.hardworkX + touchMoveX 
    } else if (historySize.gantryRect.left > historySize.gantryX1) {
      historySize.gantryRect.left = historySize.gantryX1
      historySize.gantry2Rect.left = historySize.gantryX2
      historySize.cloudRect.left = historySize.cloudX1
      historySize.cloudRect2.left = historySize.CloudX2
      historySize.cloudRect3.left = historySize.cloudX3
      historySize.cloudRect4.left = historySize.cloudX4
      historySize.cloudRect5.left = historySize.cloudX5
      historySize.cloudRect6.left = historySize.cloudX6
      historySize.cloudRect7.left = historySize.cloudX7
      historySize.cloudRect8.left = historySize.cloudX8
      historySize.cloudRect9.left = historySize.cloudX9
      historySize.cloudRect10.left = historySize.cloudX10
      historySize.cloudRect11.left = historySize.cloudX11
      historySize.cloudRect12.left = historySize.cloudX12
      historySize.cloudRect13.left = historySize.cloudX13
      historySize.cloudRect14.left = historySize.cloudX14
      historySize.cloudRect15.left = historySize.cloudX15
      historySize.cloudRect16.left = historySize.cloudX16
      historySize.cloudRect17.left = historySize.cloudX17
      historySize.cloudRect18.left = historySize.cloudX18
      historySize.cloudRect19.left = historySize.cloudX19
      historySize.cloudRect20.left = historySize.cloudX20
      historySize.text1Rect.left = historySize. textX1
      historySize.text2Rect.left = historySize.textX2
      historySize.text3Rect.left = historySize.textX3
      historySize.text4Rect.left = historySize.textX4
      historySize.text5Rect.left = historySize.textX5
      historySize.text6Rect.left = historySize.textX6
      historySize.text7Rect.left = historySize.textX7
      historySize.royalRalaceRect.left = historySize.royalRalaceX
      historySize.templeRect.left = historySize.templeX
      historySize.dragoncolumn1Rect.left = historySize.dragoncolumnX1 
      historySize.dragoncolumn2Rect.left = historySize.dragoncolumnX2
      historySize.lotteryRect.left = historySize.lotteryX
      historySize.leafRect.left = historySize.leafX
      historySize.character1Rect.left = historySize.characterX1
      historySize.character2Rect.left = historySize.characterX2
      historySize.character3Rect.left = historySize.characterX3
      historySize.character4Rect.left = historySize.characterX4
      historySize.EverythingIsGoodRect.left = historySize.everythingIsGoodX
      historySize.HardworkRect.left = historySize.hardworkX
      isOnEdge = 1
    }else if (historySize.character4Rect.left < -(screenWidth * 0.3)) {
      historySize.character4Rect.left = -(screenWidth * 0.3)
      isOnEdge = 2
    }  

    if (typeof triggerEdgeCallback === 'function') {
      triggerEdgeCallback(isOnEdge)
    }

    context.fillStyle = '#fffbf8'
    context.fillRect(0, 0, Canvas.width * 2, Canvas.height * 2)//绘制背景色
    Utils.drawCustomImage(context, historyImage.cloudImage4, historySize.cloudRect4) // 云4
    Utils.drawCustomImage(context, historyImage.royalRalaceImage, historySize.royalRalaceRect) // 皇宫
    Utils.drawCustomImage(context, historyImage.gantryImage, historySize.gantryRect) // 龙门1  
    Utils.drawCustomImage(context, historyImage.cloudImage, historySize.cloudRect) // 云1
    Utils.drawCustomImage(context, historyImage.cloudImage2, historySize.cloudRect2) // 云2
    Utils.drawCustomImage(context, historyImage.cloudImage3, historySize.cloudRect3) // 云3
    Utils.drawCustomImage(context, historyImage.cloudImage5, historySize.cloudRect5) // 云5   
    Utils.drawCustomImage(context, historyImage.templeImage, historySize.templeRect) // 学堂
    Utils.drawCustomImage(context, historyImage.dragoncolumn1Image, historySize.dragoncolumn1Rect) // 龙柱1
    Utils.drawCustomImage(context, historyImage.cloudImage6, historySize.cloudRect6) // 云6
    Utils.drawCustomImage(context, historyImage.leafImage, historySize.leafRect) // 叶子
    Utils.drawCustomImage(context, historyImage.lotteryImage, historySize.lotteryRect) // 抽签
    Utils.drawCustomImage(context, historyImage.cloudImage7, historySize.cloudRect7) // 云6
    Utils.drawCustomImage(context, historyImage.character1Image, historySize.character1Rect) // 人物1
    Utils.drawCustomImage(context, historyImage.cloudImage10, historySize.cloudRect10) // 云10
    Utils.drawCustomImage(context, historyImage.gantry2Image, historySize.gantry2Rect) // 龙门2
    Utils.drawCustomImage(context, historyImage.cloudImage8, historySize.cloudRect8) // 云8
    Utils.drawCustomImage(context, historyImage.cloudImage9, historySize.cloudRect9) // 云9
    Utils.drawCustomImage(context, historyImage.cloudImage11, historySize.cloudRect11) // 云11
    Utils.drawCustomImage(context, historyImage.cloudImage13, historySize.cloudRect13) // 云13
    Utils.drawCustomImage(context, historyImage.cloudImage12, historySize.cloudRect12) // 云12
    Utils.drawCustomImage(context, historyImage.cloudImage15, historySize.cloudRect15) // 云15
    Utils.drawCustomImage(context, historyImage.cloudImage16, historySize.cloudRect16) // 云16
    Utils.drawCustomImage(context, historyImage.character2Image, historySize.character2Rect) // 人物2
    Utils.drawCustomImage(context, historyImage.cloudImage14, historySize.cloudRect14) // 云14
    Utils.drawCustomImage(context, historyImage.cloudImage17, historySize.cloudRect17) // 云17
    Utils.drawCustomImage(context, historyImage.cloudImage18, historySize.cloudRect18) // 云18
    Utils.drawCustomImage(context, historyImage.cloudImage19, historySize.cloudRect19) // 云19
    Utils.drawCustomImage(context, historyImage.character3Image, historySize.character3Rect) // 人物3
    Utils.drawCustomImage(context, historyImage.dragoncolumn2Image, historySize.dragoncolumn2Rect) // 龙柱2   
    Utils.drawCustomImage(context, historyImage.HardworkImage, historySize.HardworkRect) // 万事皆顺泰
    Utils.drawCustomImage(context, historyImage.EverythingIsGoodImage, historySize.EverythingIsGoodRect) // 苦练成才
    Utils.drawCustomImage(context, historyImage.cloudImage20, historySize.cloudRect20) // 云20
    Utils.drawCustomImage(context, historyImage.character4Image, historySize.character4Rect) // 人物4
    Utils.drawVerticalColumnText(context, historySize.text1, historySize.text1Rect, historySize.text1ColumnNumber) // text 1
    Utils.drawVerticalColumnText(context, historySize.text2, historySize.text2Rect, historySize.text2ColumnNumber) // text 2
    Utils.drawVerticalColumnText(context, historySize.text3, historySize.text3Rect, historySize.text3ColumnNumber) // text 3
    Utils.drawVerticalColumnText(context, historySize.text4, historySize.text4Rect, historySize.text4ColumnNumber) // text 4
    Utils.drawVerticalColumnText(context, historySize.text5, historySize.text5Rect, historySize.text5ColumnNumber) // text 5
    Utils.drawVerticalColumnText(context, historySize.text6, historySize.text6Rect, historySize.text6ColumnNumber) // text 6
    Utils.drawVerticalColumnText(context, historySize.text7, historySize.text7Rect, historySize.text7ColumnNumber) // text 7
    Utils.drawCustomImage(context, historyImage.backImage, historySize.backButtonRect) // 返回button
  }
}
