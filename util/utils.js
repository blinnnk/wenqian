/*
* @author KaySaith
* @date 2018-02-01
*/


import { Interpolator } from '../util/animation'

var moveX = 0
var moveY = 0
var moveValue = 0
var gearValue = 0

var startX = 0
var startY = 0

var currentTouchX = 0
var currentTouchY = 0
var currentMoveX = 0
var currentMoveY = 0
var isClickEvent = false

var degree = [0]
// 陀螺仪的水平偏移度数
var horizontalOffset = 0
var buttonTextSize = 32

// 工具
export class Utils {

  /*
  * @description
  * 画圆角矩形的工具函数
  * [strokeWidth] Stroke 的宽度
  * 圆角矩形会是全圆角矩形, 高度就是 radius * 2
  */
  static drawRoundRect(context, strokeWidth, rect, radius, strokeColor, text) {
    context.beginPath()
    context.strokeStyle = strokeColor
    context.lineWidth = strokeWidth
    context.lineCap = 'round'
    
    var buttonHeight = 0
    if (rect.height > radius * 2) {
      buttonHeight = rect.height - radius * 2
    }

    for (var index = 0; index < 4; index++) {
      var modulus = 0
      if (index == 1 || index == 2) {
        modulus = 1
      } else {
        modulus = 0
      }
      var heightModulus = 0
      if (index == 2 || index == 3) {
        heightModulus = 1
      } else {
        heightModulus = 0
      }
      context.arc(
        rect.left + rect.width * modulus,
        rect.top + buttonHeight * heightModulus,
        radius,
        convertAngel(180 + 90 * index),
        convertAngel(180 + 90 * (index + 1)),
        false
      )
    }
    context.closePath()
    context.stroke()
    Utils.drawText(
      context,
      text,
      strokeColor,
      rect.top + (buttonHeight + radius - buttonTextSize) / 2 - strokeWidth,
      0,
      '' + buttonTextSize + '',
      true
    )
    context.restore()
    
  }

  // 罗盘监听
  static addCompassListener(callback) {
    wx.onCompassChange(function (value) {
      degree.push(value.direction)
      if (degree.length == 3) {
        degree.splice(0, 1)
      }
      var calculateValue = degree[1] - degree[0]
      if (degree[0] != 0) {
        horizontalOffset += calculateValue
      }
      if (typeof callback === 'function') {
        callback(horizontalOffset)
      }
    })
  }

  /*
  * @description
  * 这个函数用来监听手指事件并判断是点击事件还是滑动事件
  */
  static touchPointListener() {
    // 获取点击的 Point 用来处理点击事件
    wx.onTouchStart(function (event) {
      currentTouchX = event.touches[0].clientX * 2
      currentTouchY = event.touches[0].clientY * 2
    })

    // 获取点击的 Point 用来处理点击事件
    wx.onTouchMove(function (event) {
      currentMoveX = event.touches[0].clientX * 2 - currentTouchX
      currentMoveY = event.touches[0].clientY * 2 - currentTouchY
    })

    wx.onTouchEnd(
      function (event) {
        if (
          Math.abs(currentMoveX) < 2 || 
          Math.abs(currentMoveY) < 2 ||
          currentMoveX == 0 ||
          currentMoveY == 0
        ) {
          isClickEvent = true
        }
        // 初始化用来判断是点击还是滑动的值
        currentMoveX = 0
        currentMoveY = 0
      }
    )
  }
  
  // 通用的画图方法
  static drawCustomImage(context, image, rect) {
    context.drawImage(
      image,
      rect.left,
      rect.top,
      rect.width,
      rect.height
    )
  }

  /*
  * @description
  * 抽象了一个向左移动内容的动画函数, 封装的参数比较多着重介绍
  * @param
  * [maxMoveDistance] 最大移动距离, 这个值决定动画的最大距离. 到达后停止
  * [callback] 当动画停止的时候触发的函数
  */

  static drawImageAndMoveToLeftWithAnimation(
    context,
    image,
    rect,
    speed,
    maxMoveDistance,
    callback
  ) {
    moveX += speed
    context.drawImage(
      image,
      rect.left - moveX,
      rect.top,
      rect.width,
      rect.height)
    if (moveX >= maxMoveDistance) {
      moveX = maxMoveDistance
      if (typeof callback === 'function') {
        callback()
      }
    }
  }

  static drawImageAndMoveToTopWithAnimation(
    context,
    image,
    rect,
    speed,
    maxMoveDistance,
    callback
  ) {
    var accelerateValue = 
      Interpolator.accelerateInterpolator(speed, maxMoveDistance)
    context.drawImage(
      image,
      rect.left,
      rect.top - accelerateValue,
      rect.width,
      rect.height
    )
    if (accelerateValue == maxMoveDistance) {
      if (typeof callback === 'function') {
        callback()
      }
    } 
  }

  static drawImageAndMoveToBottomWithAnimation(
    context,
    image,
    rect,
    speed,
    maxMoveDistance,
    callback
  ) {
    var accelerateValue = 
      Interpolator.accelerateInterpolator(speed, maxMoveDistance)
    context.drawImage(
      image,
      rect.left,
      rect.top + accelerateValue,
      rect.width,
      rect.height
    )
    if (accelerateValue == maxMoveDistance) {
      if (typeof callback === 'function') {
        callback()
      }
    }
  }

  static drawImageAndMoveOvalPathWithAnimation(
    context,
    image,
    rect,
    speed,
    horizontalRadius,
    verticalRadius,
    callback
  ) {
    // 这个是速度变化的系数值越大加减速度的程度就越大
    let gearDegree = 0.2
    moveValue += speed
    gearValue = 2 * (1 + gearDegree * Math.sin(moveValue))
    context.drawImage(
      image,
      rect.left + horizontalRadius * Math.cos(gearValue),
      rect.top + verticalRadius * Math.sin(gearValue),
      rect.width + 10 * gearValue,
      rect.height + 10 * gearValue)

    if (typeof callback === 'function') {
      callback()
    }
  }

  // Canvas 点击事件
  static onClick(rect, callback) {
    if (isClickEvent == false) return
    checkRectContainsPointOrElse(currentTouchX, currentTouchY, rect, callback)
  }

  // 画副标题的文字
  static drawText(
    context, 
    text, 
    color,
    centerY,
    lineHeight,
    textSize = '24px',
    isBold = false
    ) {
    var bold = ''
    if (isBold == true) {
      bold = 'bold'
    }
    context.fillStyle = color
    context.font = '' + bold + textSize + ' avenir'
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    let newText = text.split('/n')
    for (var index = 0; index < newText.length; index++) {
      context.fillText(
        newText[index],
        context.canvas.width / 2,
        centerY + lineHeight * index
      )
    }
  }

  static isIPhoneX(callback) {
    var isIPhoneX = false
    wx.getSystemInfo({
      success: function (res) {
        if (res.model.indexOf('iPhone X') != -1) {
          if (typeof callback === 'function') {
            callback()
          }
        }
      }
    })
  }

  static touchMoveXDistance(movingCallback, endCallback) {
    var distance = {
      x: 0,
      y: 0
    }
    wx.onTouchStart(function (event) {
      startX = event.touches[0].clientX
      startY = event.touches[0].clientY
    })

    wx.onTouchMove(function (event) {
      distance.x = (event.touches[0].clientX - startX) * 2
      distance.y = (event.touches[0].clientY - startY) * 2
      if (typeof movingCallback === 'function') {
        movingCallback(distance)
      }
    })

    wx.onTouchEnd(function (event) {
      // 松手后归位
      startX = 0
      startY = 0
      if (typeof endCallback === 'function') {
        endCallback()
      }
    })
  }
}

function checkRectContainsPointOrElse(x, y, rect, callback) {
  if (
    x > rect.left &&
    x < rect.left + rect.width &&
    y > rect.top &&
    y < rect.top + rect.height
  ) {
    // 回调事件
    if (typeof callback === 'function') {
      callback()
      // 点击回调结束后恢复初始的点击 Point 的值
      currentTouchX = 0
      currentTouchY = 0
      isClickEvent = false
    }
  }
}

function convertAngel(degrees) {
  return (Math.PI * degrees) / 180
}