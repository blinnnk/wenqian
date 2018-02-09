/*
* @author shangqi
* @date 2018-02-08
*/

import { Component } from '../../common/component'
import { Canvas } from '../../common/component'
import { Utils } from '../../util/utils'
import { UIKit } from '../../common/uikit'

let screenWidth = Component.ScreenSize.width
let screenHeight = Component.ScreenSize.height

var signNumber = '九十三' // 第多少签传值 大写
var signType = 0 // 0观音签　１周公签
var signIndex = 33 // 签号 小写
var rows = [] // 记录内容行数
let titleMarginTop = 60 // title的margin-top值
let titleHight = 50 // title的高度
let textWidth = 35 // 内容文字宽度
let textHeight = 50 // 每行内容的高度
var touchMoveY = 0 // 上下移动的距离
var lastMoveY = 0 // 记录上次移动的距离
var touchDirection = UIKit.direction.top  // 移动方向
var isTriggingEdge = false // 是否允许滑动
let paddingSize = 40 // 页面的padding值
var pageHeight = 0 // 页面总高度


var contentWidth = screenWidth * 0.8 - paddingSize
let eachLineNumber = Math.floor(contentWidth / textWidth)

// 根据状态显示周公/观音签
let signImage = wx.createImage()
if (signType == 0) {
  signImage.src = 'sources/image/solveSign/GuanyinSign.png'
} else if (signType == 1) {
  signImage.src = 'sources/image/solveSign/ZhongGong.png'
}

// 观音灵签rect
let guanYinRect = {
  top: screenWidth * 0.06,
  left: screenWidth * 0.06,
  width: screenWidth * 0.1,
  height: screenWidth * 0.4
}

// 背景图片
let backgroundImage = wx.createImage()
backgroundImage.src = 'sources/image/solveSign/bg.png'

// 背景rect
let backgroundRect = {
  top: 0,
  left: 0,
  width: screenWidth,
  height: screenHeight
}  

// 圆点rect
let dotsRect = {
  top: screenWidth * 0.06 + screenWidth * 0.4 + 24,
  left: screenWidth * 0.06 + (screenWidth * 0.1) / 2,
  radius: 4,
  color: '#6e624c'
}

//第多少签
let textChapter = '第' + signNumber + '签详解'
let textColumnNumber = 20
let textChapterRect = {
  top: dotsRect.top + 8 + 20,
  left: dotsRect.left,
  color: '#6e624c'
}

var solveSignList = []
wx.request({
  url: 'https://lotsapitest.naonaola.com/lot/explain?type=' + signType +'&index='+ signIndex,
  method: 'GET',
  dataType:'json',
  success:function(data){
    if (data.statusCode == 200) {     
      solveSignList = data.data.content
      // 计算每个详解的行数并添加到rows数组中
      for (var h = 0; h < solveSignList.length; h++) {
        var row = Math.ceil(solveSignList[h].text.length / eachLineNumber)
        rows.push(row)
      }
    }
  }
})

export class SolveSignPage {
  static draw(context) {
    Utils.drawCustomImage(context, signImage, guanYinRect) //灵签
    Utils.drawCircle(context, dotsRect) // 圆点
    Utils.drawVerticalColumnText(context, textChapter, textChapterRect, textColumnNumber) // 第多少签
    let solveSignListLength = solveSignList.length // 获取数据的长度
    // 获取页面总行数
    var totalRows = 0
    for (var p = 0; p < rows.length; p++) {
      totalRows += rows[p]
    }
    // 计算页面总高度
    pageHeight = titleMarginTop * (solveSignListLength + 1) + titleHight * solveSignListLength + totalRows * textHeight

    //获取每个text的行数
    for (var index = 0; index < solveSignListLength; index++) {
      var rowAdd = 0;
      // 计算这个title上面有多少行text
      for (var i = 0; i < index; i++) {
        rowAdd += rows[i]
      }

      // 计算每个title的top值
      var titleTop = titleHight * index + titleMarginTop * (index + 1) + rowAdd * textHeight + touchMoveY
      // 计算每个text的top值
      var textTop = titleHight * (index + 1) + titleMarginTop * (index + 1) + rowAdd *  textHeight + touchMoveY
      drawTextTitle(context, solveSignList[index].title, screenWidth * 0.2, titleTop) // 绘制标题
      drawText(context, solveSignList[index].text, screenWidth * 0.2, textTop) // 绘制内容
    }

    Utils.drawCustomImage(context, backgroundImage, backgroundRect) // 背景图
  }
}

// 绘制title
function drawTextTitle(context, text, textLeft, titleTop) {
  context.font = "bold 32px 宋体";
  context.fillStyle = "#6f6351";
  context.textAlign = "left";
  context.textBaseline = 'top'
  context.fillText(text, textLeft, titleTop);
}
// 绘制内容并文字折行
function drawText(context, text, textLeft, textTop) {
  context.font = "32px 宋体";
  context.fillStyle = "#000000";
  context.textAlign = "left";
  context.textBaseline = 'top'

  var column = 0 // 第几行
  var Left = textLeft 
  let remainder = 0 // 每一行的第几个
  var Top = textTop
  for (var textIndex = 0; textIndex < text.length; textIndex++) {  
    remainder = textIndex % eachLineNumber
    textLeft = Left + remainder * textWidth
    column = parseInt(textIndex / eachLineNumber)
    textTop = Top + column * textHeight
    context.fillText(text[textIndex], textLeft, textTop);
  }
}

// 上下滑动
Utils.touchMoveXDistance(
  function (distance) {
    touchMoveY = distance.y + lastMoveY

    // 边界判断, 累计移动的距离超出了屏幕最大或最小距离就重置
    if (touchMoveY < -(pageHeight - Component.ScreenSize.height)) {
      touchMoveY = -(pageHeight - Component.ScreenSize.height)
    } else if (touchMoveY > 0) {
      touchMoveY = 0
    } 
  },
  function () {
    // 滑动结束后记录上次移动的距离
    lastMoveY = touchMoveY
  }
)