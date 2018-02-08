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

let ScreenWidth = Component.ScreenSize.width
let ScreenHeight = Component.ScreenSize.height
let isOnEdge = false

// 界面主函数
export class HistoryPage {
  static draw(context, touchMoveX, direction, triggerEdgeCallback) {    
    if (
      (historySize.gantryRect.left <= historySize.GantryX1 || direction == UIKit.direction.left) && 
      (historySize.character4Rect.left > -(ScreenWidth * 0.3) || direction == UIKit.direction.right)){  
      isOnEdge = false
      historySize.gantryRect.left = historySize.GantryX1 + touchMoveX
      historySize.gantry2Rect.left = historySize.GantryX2 + touchMoveX
      historySize.cloudRect.left = historySize.CloudX1 + touchMoveX
      historySize.cloudRect2.left = historySize.CloudX2 + touchMoveX
      historySize.cloudRect3.left = historySize.CloudX3 + touchMoveX
      historySize.cloudRect4.left = historySize.CloudX4 + touchMoveX
      historySize.cloudRect5.left = historySize.CloudX5 + touchMoveX
      historySize.cloudRect6.left = historySize.CloudX6 + touchMoveX
      historySize.cloudRect7.left = historySize.CloudX7 + touchMoveX
      historySize.cloudRect8.left = historySize.CloudX8 + touchMoveX
      historySize.cloudRect9.left = historySize.CloudX9 + touchMoveX
      historySize.cloudRect10.left = historySize.CloudX10 + touchMoveX
      historySize.cloudRect11.left = historySize.CloudX11 + touchMoveX
      historySize.cloudRect12.left = historySize.CloudX12 + touchMoveX
      historySize.cloudRect13.left = historySize.CloudX13 + touchMoveX
      historySize.cloudRect14.left = historySize.CloudX14 + touchMoveX
      historySize.cloudRect15.left = historySize.CloudX15 + touchMoveX
      historySize.cloudRect16.left = historySize.CloudX16 + touchMoveX
      historySize.cloudRect17.left = historySize.CloudX17 + touchMoveX
      historySize.cloudRect18.left = historySize.CloudX18 + touchMoveX
      historySize.cloudRect19.left = historySize.CloudX19 + touchMoveX
      historySize.cloudRect20.left = historySize.CloudX20 + touchMoveX
      historySize.text1Rect.left = historySize.TextX1 + touchMoveX
      historySize.text2Rect.left = historySize.TextX2 + touchMoveX
      historySize.text3Rect.left = historySize.TextX3 + touchMoveX
      historySize.text4Rect.left = historySize.TextX4 + touchMoveX
      historySize.text5Rect.left = historySize.TextX5 + touchMoveX
      historySize.text6Rect.left = historySize.TextX6 + touchMoveX
      historySize.text7Rect.left = historySize.TextX7 + touchMoveX
      historySize.royalRalaceRect.left = historySize.RoyalRalaceX + touchMoveX
      historySize.templeRect.left = historySize.TempleX + touchMoveX
      historySize.dragoncolumn1Rect.left = historySize.dragoncolumnX1 + touchMoveX
      historySize.dragoncolumn2Rect.left = historySize.dragoncolumnX2 + touchMoveX
      historySize.lotteryRect.left = historySize.LotteryX + touchMoveX
      historySize.leafRect.left = historySize.LeafX + touchMoveX
      historySize.character1Rect.left = historySize.CharacterX1 + touchMoveX
      historySize.character2Rect.left = historySize.CharacterX2 + touchMoveX
      historySize.character3Rect.left = historySize.CharacterX3 + touchMoveX
      historySize.character4Rect.left = historySize.CharacterX4 + touchMoveX
      historySize.EverythingIsGoodRect.left = historySize.EverythingIsGoodX + touchMoveX
      historySize.HardworkRect.left = historySize.HardworkX + touchMoveX 
    } else if(historySize.gantryRect.left > historySize.GantryX1) {
      historySize.gantryRect.left = historySize.GantryX1
      historySize.gantry2Rect.left = historySize.GantryX2
      historySize.cloudRect.left = historySize.CloudX1
      historySize.cloudRect2.left = historySize.CloudX2
      historySize.cloudRect3.left = historySize.CloudX3
      historySize.cloudRect4.left = historySize.CloudX4
      historySize.cloudRect5.left = historySize.CloudX5
      historySize.cloudRect6.left = historySize.CloudX6
      historySize.cloudRect7.left = historySize.CloudX7
      historySize.cloudRect8.left = historySize.CloudX8
      historySize.cloudRect9.left = historySize.CloudX9
      historySize.cloudRect10.left = historySize.CloudX10
      historySize.cloudRect11.left = historySize.CloudX11
      historySize.cloudRect12.left = historySize.CloudX12
      historySize.cloudRect13.left = historySize.CloudX13
      historySize.cloudRect14.left = historySize.CloudX14
      historySize.cloudRect15.left = historySize.CloudX15
      historySize.cloudRect16.left = historySize.CloudX16
      historySize.cloudRect17.left = historySize.CloudX17
      historySize.cloudRect18.left = historySize.CloudX18
      historySize.cloudRect19.left = historySize.CloudX19
      historySize.cloudRect20.left = historySize.CloudX20
      historySize.text1Rect.left = historySize. TextX1
      historySize.text2Rect.left = historySize.TextX2
      historySize.text3Rect.left = historySize.TextX3
      historySize.text4Rect.left = historySize.TextX4
      historySize.text5Rect.left = historySize.TextX5
      historySize.text6Rect.left = historySize.TextX6
      historySize.text7Rect.left = historySize.TextX7
      historySize.royalRalaceRect.left = historySize.RoyalRalaceX
      historySize.templeRect.left = historySize.TempleX
      historySize.dragoncolumn1Rect.left = historySize.dragoncolumnX1 
      historySize.dragoncolumn2Rect.left = historySize.dragoncolumnX2
      historySize.lotteryRect.left = historySize.LotteryX
      historySize.leafRect.left = historySize.LeafX
      historySize.character1Rect.left = historySize.CharacterX1
      historySize.character2Rect.left = historySize.CharacterX2
      historySize.character3Rect.left = historySize.CharacterX3
      historySize.character4Rect.left = historySize.CharacterX4
      historySize.EverythingIsGoodRect.left = historySize.EverythingIsGoodX
      historySize.HardworkRect.left = historySize.HardworkX
      isOnEdge = true
    }
    // else if (historySize.character4Rect.left < -(ScreenWidth * 0.3)) {
    //   historySize.character4Rect.left = -(ScreenWidth * 0.3)
    //   isOnEdge = 2
    // }  
    if (typeof triggerEdgeCallback === 'function') {
      triggerEdgeCallback(isOnEdge)
    }

    //绘制背景色
    context.fillStyle = '#fffbf8'
    context.fillRect(0, 0, Canvas.width*2, Canvas.height*2)
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
