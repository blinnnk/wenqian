/*
* @author KaySaith
* @date 2018-02-01
*/

var moveX = 0
var moveValue = 0
var gearValue = 0

var startX = 0
var startY = 0

export class Utils {
  
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

  static drawImageAndMoveOvalPathWithAnimation(
    context,
    image,
    rect,
    speed,
    horizontalRadius,
    verticalRadius
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
  }

  // Canvas 点击事件
  static onclick(rect, callback) {
    wx.onTouchStart(function (event) {
      let x = event.touches[0].clientX * 2
      let y = event.touches[0].clientY * 2
      checkRectContainsPointOrElse(x, y, rect, callback)
    })
  }

  static dynamicClick(x, y, rect, callback) {
    checkRectContainsPointOrElse(x, y, rect, callback)
  }

  // 画副标题的文字
  static drawText(
    context, 
    text, 
    color,
    centerY,
    lineHeight
    ) {
    context.fillStyle = color
    context.font = '24px avenir'
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
    }
  }
}