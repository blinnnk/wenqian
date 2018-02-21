/*
* @author KaySaith
* @date 2018-02-01
*/

import { Interpolator } from '../util/animation'
import { Rect, Image } from '../common/element'

let moveX = 0
let moveValue = 0
let gearValue = 0

let startX = 0
let startY = 0

let currentTouchX = 0
let currentTouchY = 0
let currentMoveX = 0
let currentMoveY = 0
let isClickEvent = false

const degree = [0]
// 陀螺仪的水平偏移度数
let horizontalOffset = 0
const buttonTextSize = 30

let retryTimes = 3
let isRetrying = false

const corner = {
  topLeft: 1,
  topRight: 2,
  bottomLeft: 3,
  bottomRight: 4
}


// 工具
export class Utils {

  static getLocalImageByDrawingContent(param = {
    key: String,
    onDraw: Function,
    holdInfo: Function,
    isSmallImage: Boolean
  }) {
    param.isSmallImage = param.isSmallImage != null
    // 先从本地缓存取
    wx.getStorage({
      key: param.key,
      success: function(result) {
        if (typeof param.holdInfo === 'function')
          param.holdInfo(result.data)
      },
      fail: draContentAsImage
    })

    // 如果取不到就画
    function draContentAsImage() {
      const offScreenCanvas = wx.createCanvas()
      offScreenCanvas.width = offScreenCanvas.width * 2
      offScreenCanvas.height = offScreenCanvas.height * 2
      const offScreenContext = offScreenCanvas.getContext('2d')
      if (typeof param.onDraw === 'function') {
        let destScale = param.isSmallImage === true ? 0.5 : 1
        param.onDraw(offScreenContext, (rect) => {
          let tempFilePath = offScreenCanvas.toTempFilePathSync({
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
            destWidth: rect.width,
            destHeight: rect.height * destScale
          })
          const info =  { path: tempFilePath, width: rect.width, height: rect.height }
          // 画好后存到本地缓存
          wx.setStorage({
            key: param.key,
            data: info,
          })
          // 返回本地缓存路径
          if (typeof param.holdInfo === 'function')
            param.holdInfo(info)
        })
      }
    }
  }

  static convertTimeWithMillsecond(millsecond) {
    const totalSecond = millsecond / 1000
    const totalMinute = Math.floor(totalSecond / 60)

    let hour = Math.floor(totalMinute / 60)
    let minute = totalMinute - hour * 60
    let second = Math.floor(totalSecond - totalMinute * 60)

    if (hour < 10) hour = '0' + hour
    if (minute < 10) minute = '0' + minute
    if (second < 10) second = '0' + second

    return '' + hour + ' : ' + minute + ' : ' + second
  }

  static saveImageToAlbum(localSrc) {
    wx.saveImageToPhotosAlbum({
      filePath: localSrc,
      success: () => wx.showToast({ title: '正在保存' }),
      complete: () => wx.showToast({ title: '保存相册成功' })
    })
  }

  /*
  * @description
  * 画圆角矩形的工具函数
  * [strokeWidth] Stroke 的宽度
  * 圆角矩形会是全圆角矩形, 高度就是 radius * 2
  */
  static drawRoundRect(context, param = {
    strokeWidth: Number,
    rect: Rect,
    radius: Number,
    strokeColor: String,
    text: String
  }) {
    context.beginPath()
    context.strokeStyle = param.strokeColor
    context.lineWidth = param.strokeWidth
    context.lineCap = 'round'

    let buttonHeight = 0
    if (param.rect.height > param.radius * 2) buttonHeight = param.rect.height - param.radius * 2;

    /*
    * 这里重新修订了距离顶部的距离修复点击区域问题, 因为 `Radius` 偏移出去的高度不会
    * 计算为高度. 在 `Canvas` 里面接受区域预定的时候回出现偏移.
    */

    [
      corner.topLeft,
      corner.topRight,
      corner.bottomLeft,
      corner.bottomRight
    ].forEach(it => {

      let modulus = 0
      if (it === corner.topLeft || it === corner.topRight) modulus = 1
      else modulus = 0

      let heightModulus = 0
      if (it === corner.topRight || it === corner.bottomLeft) heightModulus = 1
      else heightModulus = 0

      context.arc(
        param.rect.left + param.rect.width * modulus,
        param.rect.top + buttonHeight * heightModulus + param.radius,
        param.radius,
        convertAngel(180 + 90 * it),
        convertAngel(180 + 90 * (it + 1)),
        false
      )
    })

    context.closePath()
    context.stroke()
    context.restore()

    Utils.drawText(context, {
      text: param.text,
      textColor: param.strokeColor,
      centerY:
      param.rect.top + (buttonHeight + param.radius - buttonTextSize) / 2 - param.strokeWidth + param.radius,
      lineHeight: 0,
      textSize: '' + buttonTextSize + '',
      isBold: true
    })
  }

  static drawRound(context, param = {
    color: String,
    rect: Rect,
    radius: Number,
    strokeWidth: null
  }) {
    context.beginPath()
    context.strokeStyle = param.color
    context.fillStyle = param.color
    context.arc(
      param.rect.left,
      param.rect.top,
      param.radius,
      convertAngel(0),
      convertAngel(360),
      false
    )
    context.closePath()
    param.strokeWidth == null ? context.fill() :
    (() => {
      context.lineCap = 'round'
      context.lineWidth = param.strokeWidth
      context.stroke()
    })()
    context.restore()
  }

  // 罗盘监听
  static addCompassListener(callback) {
    wx.onCompassChange((value) => {
      degree.push(value.direction)
      if (degree.length === 3) degree.splice(0, 1)
      const calculateValue = degree[1] - degree[0]
      if (degree[0] !== 0) horizontalOffset += calculateValue
      if (typeof callback === 'function') callback(horizontalOffset)
    })
  }

  /*
  * @description
  * 这个函数用来监听手指事件并判断是点击事件还是滑动事件
  */
  static resolveGestureConflict() {
    // 获取点击的 Point 用来处理点击事件
    wx.onTouchStart((event) => {
      currentTouchX = event.touches[0].clientX * 2
      currentTouchY = event.touches[0].clientY * 2
    })

    // 获取点击的 Point 用来处理点击事件
    wx.onTouchMove((event) => {
      currentMoveX = event.touches[0].clientX * 2 - currentTouchX
      currentMoveY = event.touches[0].clientY * 2 - currentTouchY
    })

    wx.onTouchEnd((event) => {
      if (
        Math.abs(currentMoveX) < 2
        || Math.abs(currentMoveY) < 2
        || currentMoveX === 0
        || currentMoveY === 0
      ) {
        isClickEvent = true
      }
      // 初始化用来判断是点击还是滑动的值
      currentMoveX = 0
      currentMoveY = 0
      setTimeout(() => isClickEvent = false, 50)
    })
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
      if (typeof callback === 'function') callback()
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
    const accelerateValue =
      Interpolator.accelerateInterpolator(speed, maxMoveDistance)
    context.drawImage(
      image,
      rect.left,
      rect.top - accelerateValue,
      rect.width,
      rect.height
    )
    if (accelerateValue === maxMoveDistance) {
      if (typeof callback === 'function') callback()
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
    const accelerateValue =
      Interpolator.accelerateInterpolator(speed, maxMoveDistance)
    context.drawImage(
      image,
      rect.left,
      rect.top + accelerateValue,
      rect.width,
      rect.height
    )
    if (accelerateValue === maxMoveDistance) {
      if (typeof callback === 'function') callback()
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
      rect.width + 12 * gearValue,
      rect.height + 12 * gearValue)

    if (typeof callback === 'function') callback()
  }

  // Canvas 点击事件
  static onClick(rect, callback) {
    if (isClickEvent === false) return
    checkRectContainsPointOrElse(currentTouchX, currentTouchY, rect, callback)
  }

  static eraseTouchEvent(...rectArguments) {
    for (let index in rectArguments) {
      checkRectContainsPointOrElse(
        currentTouchX,
        currentTouchY,
        rectArguments[index],
        () => { currentTouchX = 0; currentTouchY = 0 }
      )
    }
  }

  // 画副标题的文字
  static drawText(context, param = {
    text: String,
    textColor: String,
    centerY: null,
    lineHeight: null,
    textSize: null,
    isBold: Boolean
  }) {
    param.isBold = param.isBold ? 'bold' : ''
    param.textSize = param.textSize == null ? '24px' : param.textSize
    param.centerY = param.centerY == null ? 0 : param.centerY
    param.lineHeight = param.lineHeight == null ? 0 : param.lineHeight

    context.fillStyle = param.textColor
    context.font = param.isBold + param.textSize + ' Avenir-Book'
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    let newText = param.text.split('/n')
    for (const index in newText) {
      context.fillText(
        newText[index],
        context.canvas.width / 2,
        param.centerY + param.lineHeight * index
      )
    }
  }

  static isIPhoneX(callback) {
    wx.getSystemInfo({
      success: (res) => {
        if (res.model.indexOf('iPhone X') !== -1) {
          if (typeof callback === 'function') callback()
        }
      }
    })
  }

  static touchMoveXDistance(param = { onMoving: Function, onEnd: Function }) {
    const distance = {x: 0, y: 0}
    wx.onTouchStart((event) => {
      startX = event.touches[0].clientX
      startY = event.touches[0].clientY
    })

    wx.onTouchMove((event) => {
      distance.x = (event.touches[0].clientX - startX) * 2
      distance.y = (event.touches[0].clientY - startY) * 2
      if (typeof param.onMoving === 'function') param.onMoving(distance)
    })

    wx.onTouchEnd((event) => {
      // 松手后归位
      startX = 0
      startY = 0
      if (typeof param.onEnd === 'function') param.onEnd()
    })
  }
  // 利用 JavaScript ES6 的新特性实现的顺序执行函数
  static sequentialExecution(param = { early: Function, later: Function, final: Function }) {
    function step1(resolve, reject) {
      if (typeof param.early === 'function')
        param.early(hasFinished => resolve('finish'))
    }

    function step2(resolve, reject) {
      if (typeof param.later === 'function')
        param.later(hasFinished => resolve('finish'))
    }

    function step3(resolve, reject) {
      if (typeof param.final === 'function')
        param.final(hasFinished => resolve('finish'))
    }
    // 用 `Promise` 函数特性严格切分时机
    new Promise(step1).then(() => {
      return new Promise(step2).then(() => {
        return new Promise(step3)
      })
    })
  }

  static Image(src) {
    let image = Image()
    image.src = src
    return image
  }

  static retry(callback) {
    if (isRetrying) return
    let retry = setInterval(() => {
      isRetrying = true
      retryTimes -= 1
      if (typeof callback === 'function') callback()
      if (retryTimes <= 0) {
        wx.showModal({
          title: '连接失败',
          content: '重试 3 次依旧失败请检查网络',
        })
        clearInterval(retry)
        isRetrying = false
        retryTimes = 3
      }
      // 这个打印要长期保留, 出现网络问题需要随时定位到这里 by KaySaith
      console.log(retryTimes + 'retry')
    }, 3000)
  }

  static drawSingleText(
    context,
    param = {
    text: String,
    color: String,
    font: String,
    lineSpace: Number,
    textSpace: Number,
    textSize: Number,
    maxWidth: Number,
    left: Number,
    top: Number,
    textMeasuredWidth: Array,
    getTotalHeight: Function,
    }
  ) {

    context.fillStyle = param.color
    param.textSize = param.textSize == null ? 24 : param.textSize
    context.font = param.textSize + 'px' + param.font
    context.textBaseline = 'middle'
    context.textAlign = 'left'
    param.maxWidth = param.maxWidth == null ? context.canvas.width : param.maxWidth
    param.lineSpace = param.lineSpace == null ? 0 : param.lineSpace
    param.textSpace = param.textSpace == null ? 0 : param.textSpace
    let currentRowTop = 0
    let currentRowWidth = 0

    // 如果在绘制前提前计算好每个字的宽度传对象进这个方法会节省性能
    if (param.textMeasuredWidth == null) {
      param.textMeasuredWidth =
        Utils.measureEachText(context, param.text, param.textSize, param.font)
    }

    for (let item in param.text) {
      if (param.text.hasOwnProperty(item)) {
        context.fillText(
          param.text[item],
          param.left + currentRowWidth,
          param.top + currentRowTop
        )
        if (currentRowWidth >= param.maxWidth - param.textSize) {
          currentRowTop += param.textSize + param.lineSpace
          currentRowWidth = 0
        } else {
          currentRowWidth += param.textMeasuredWidth[item] + param.textSpace
        }

        if (item == param.text.lastIndex()) {
          if (typeof param.getTotalHeight === 'function')
            param.getTotalHeight(currentRowTop + param.textSize)
        }
      }
    }
  }

  static drawVerticalText(
    context,
    param = {
      text: String,
      color: String,
      font: String,
      lineSpace: Number,
      textSpace: Number,
      textSize: Number,
      maxHeight: Number,
      left: Number,
      top: Number,
      textMeasuredWidth: Array,
      getContentWidth: Function
    }
  ) {

    context.fillStyle = param.color
    param.textSize = param.textSize == null ? 24 : param.textSize
    context.font = param.textSize + 'px' + param.font
    context.textBaseline = 'middle'
    context.textAlign = 'left'
    param.maxHeight = param.maxHeight == null ? context.canvas.width : param.maxHeight
    param.lineSpace = param.lineSpace == null ? 0 : param.lineSpace
    param.textSpace = param.textSpace == null ? 0 : param.textSpace
    let currentRowTop = 0
    let currentRowWidth = 0

    // 如果在绘制前提前计算好每个字的宽度传对象进这个方法会节省性能
    if (param.textMeasuredWidth == null) {
      param.textMeasuredWidth =
        Utils.measureEachText(context, param.text, param.textSize, param.font)
    }

    for (const item in param.text) {
      if (param.text.hasOwnProperty(item)) {
        context.fillText(
          param.text[item],
          param.left + currentRowWidth,
          param.top + currentRowTop
        )
        if (currentRowTop >= param.maxHeight - param.textSize) {
          currentRowWidth += param.textMeasuredWidth[item] + param.textSpace
          currentRowTop = 0
        } else {
          currentRowTop += param.textSize + param.lineSpace
        }
      }
      if (item == param.text.lastIndex()) {
        if (typeof param.getContentWidth === 'function') param.getContentWidth(currentRowWidth)
      }
    }
  }

  static measureEachText(context, text, textSize, font) {
    const array = []
    context.font = textSize + 'px' + font
    for (const index in text) {
      array.push(context.measureText(text[index]).width)
    }
    return array
  }

  static convertNumberToChineseCharacters(numbers) {
    const charactersArray = []
    const stringNumber = Utils.toString(numbers)
    for (let index in stringNumber) {
      let current = Utils.convertSingleNumberToCharacter(stringNumber[index])
      if (stringNumber.length >= 2) {
        if (stringNumber[index] === 0) {
          if (index !== stringNumber.lastIndex()) current = '零'
          else current = '拾'
        }
      }
      charactersArray.push(current)
    }

    if (stringNumber.length === 2) charactersArray.splice(1, 0, '拾')

    if (stringNumber.length === 3) {
      charactersArray.splice(1, 0, '佰')
      if (stringNumber[stringNumber.length - 2] !== 0)
        charactersArray.splice(3, 0, '拾')
      removeLastZero(stringNumber)
    }

    function removeLastZero(array) {
      if (array.last() === 0)  charactersArray.pop()
    }

    return charactersArray.join('')
  }

  static convertSingleNumberToCharacter(number) {
    const numbers = {
      1: '壹',
      2: '贰',
      3: '叁',
      4: '肆',
      5: '伍',
      6: '陆',
      7: '柒',
      8: '捌',
      9: '玖',
      0: '拾'
    }
    return numbers[number]
  }

  static toString(number) {
    return '' + number
  }

}

function checkRectContainsPointOrElse(x, y, rect, callback) {
  if (
    x > rect.left
    && x < rect.left + rect.width
    && y > rect.top
    && y < rect.top + rect.height
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