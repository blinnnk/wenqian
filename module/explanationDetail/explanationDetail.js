/*
* @author shangqi
* @date 2018-02-08
*/

import { Component } from '../../common/component'
import { Canvas } from '../../common/component'
import { Utils } from '../../util/utils'
import { UIKit } from '../../common/uikit'

const screenWidth = Component.ScreenSize.width
const screenHeight = Component.ScreenSize.height

var signNumber = '九十三' // 第多少签传值 大写
var signType = 0 // 0观音签　１周公签
var signIndex = 0 // 签号 小写
var rows = [] // 记录内容行数
const titleMarginTop = 60 // title的margin-top值
const titleHight = 50 // title的高度
const textWidth = 35 // 内容文字宽度
const textHeight = 50 // 每行内容的高度
var touchMoveY = 0 // 上下移动的距离
var lastMoveY = 0 // 记录上次移动的距离
const paddingSize = 40 // 页面的padding值
var pageHeight = 0 // 页面总高度
var totalRows = 0 // 页面总行数

// 计算每行显示多少字
var contentWidth = screenWidth - 150 - paddingSize
const eachLineNumber = Math.floor(contentWidth / textWidth) 

// 根据状态显示周公/观音签
const signImage = wx.createImage()
if (signType == 0) {
  signImage.src = UIKit.imageSrc.guanYinSign
} else if (signType == 1) {
  signImage.src = UIKit.imageSrc.zhouGongSign
}

// 观音灵签rect
const guanYinRect = {
  top: 56,
  left: 56,
  width: 78,
  height: 300
}

// 蒙层图片
const maskImage = wx.createImage()
maskImage.src = 'sources/image/solveSign/bg.png'

// 背景rect
const backgroundRect = {
  top: 0,
  left: 0,
  width: screenWidth,
  height: screenHeight
}

// 圆点rect
const dotsRect = {
  top: 380,
  left: 95,
  radius: 4,
  color: '#6e624c'
}

// 第多少签
const textChapter = '第' + signNumber + '签详解'
const textColumnNumber = 20
const textChapterRect = {
  top: 428,
  left: 95,
  color: '#6e624c'
}

var solveSignList = [] // 定义内容数组
const solveSignListLength = solveSignList.length // 获取数据的长度

export class ExplanationDetail {
  static draw(context) {
    Utils.drawCustomImage(context, signImage, guanYinRect) //灵签
    Utils.drawCircle(context, dotsRect) // 圆点
    Utils.drawVerticalColumnText(context, textChapter, textChapterRect, textColumnNumber) // 第多少签

    //获取每个text的行数
    for (var index = 0; index < solveSignListLength; index++) {
      
      // 计算这个title上面有多少行text
      var cumulativeNumberRows = 0;
      for (var rowIndex = 0; rowIndex < index; rowIndex++) {
        cumulativeNumberRows += rows[rowIndex]
      }

      // 计算每个title的top值
      var titleTop = titleHight * index + titleMarginTop * (index + 1) + cumulativeNumberRows * textHeight + touchMoveY
      // 计算每个text的top值
      var textTop = titleHight * (index + 1) + titleMarginTop * (index + 1) + cumulativeNumberRows * textHeight + touchMoveY

      drawTitle(context, solveSignList[index].title, 150, titleTop) // 绘制标题
      drawText(context, solveSignList[index].text, 150, textTop) // 绘制内容
    }
    
    Utils.drawCustomImage(context, maskImage, backgroundRect) // 背景图
  }

  static RequestSignData(signType, signIndex) { // 请求解签数据
    signType = signType // 赋值上面signType
    wx.request({
      url: 'https://lotsapitest.naonaola.com/lot/explain?type=' + signType + '&index=' + signIndex,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        if (data.statusCode == 200) {
          solveSignList = data.data.content
          // 计算每个详解的行数并添加到rows数组中
          for (var contentIndex = 0; contentIndex < solveSignList.length; contentIndex++) {
            var row = Math.ceil(solveSignList[contentIndex].text.length / eachLineNumber)
            totalRows += row // text总行数    
            rows.push(row)
          }
          // 计算页面总高度
          pageHeight = titleMarginTop * (solveSignListLength + 1) + titleHight * solveSignListLength + totalRows * textHeight
        }
      }
    })
  }
}

// 绘制title
function drawTitle(context, text, textLeft, titleTop) {
  context.font = "bold 32px 宋体";
  context.fillStyle = UIKit.color.title
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
  var left = textLeft
  var remainder = 0 // 每一行的第几个
  var top = textTop
  for (var textIndex = 0; textIndex < text.length; textIndex++) {
    remainder = textIndex % eachLineNumber
    textLeft = left + remainder * textWidth
    column = parseInt(textIndex / eachLineNumber)
    textTop = top + column * textHeight
    context.fillText(text[textIndex], textLeft, textTop);
  }
}

// 页面滚动
Utils.touchMoveXDistance(
  function (distance) {
    touchMoveY = distance.y + lastMoveY
    
    // 边界判断, 累计移动的距离超出了屏幕最大或最小距离就重置
    if (pageHeight > Component.ScreenSize.height){// 当内容页面大于屏幕高度时
      if (touchMoveY < -(pageHeight - Component.ScreenSize.height)) {
        touchMoveY = -(pageHeight - Component.ScreenSize.height)
      } else if (touchMoveY > 0) {
        touchMoveY = 0
      }
    }else {
      touchMoveY = 0
    }
  },
  function () {
    // 滑动结束后记录上次移动的距离
    lastMoveY = touchMoveY
  }
)
