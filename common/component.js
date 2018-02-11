/*
* @author KaySaith
* @date 2018-02-01
*/

import { UIKit } from 'uikit'
import { Global } from 'global'
import { Utils } from '../util/utils'
import { NetUtils } from '../util/netUtils'
import { Api } from '../common/api'

// 落叶动画用到的参数
let leafSrc =
  [
    UIKit.imageSrc.leaf,
    UIKit.imageSrc.leaf1,
    UIKit.imageSrc.leaf2,
    UIKit.imageSrc.leaf,
    UIKit.imageSrc.leaf1
  ]
var leafY = 0
var leafX = 0
let fallingLeafCount = 5

var myTempID = null

// 摇晃判断
var accelerometerX = [0]
var accelerometerY = [0]
var accelerometerZ = [0]
var isShakingPhone = false

const Canvas = wx.createCanvas()

// 适配 iPhoneX 的齐刘海
var adaptingIPhoneXTop = 0
Utils.isIPhoneX(function () {
  adaptingIPhoneXTop = 30
})

const backButtonRect = {
  width: UIKit.size.buttonWidth,
  height: UIKit.size.buttonHeight,
  left: Canvas.width * 2 * 0.065,
  top: Canvas.width * 2 * 0.1 + adaptingIPhoneXTop
}

const backImage = Utils.Image(UIKit.imageSrc.back)

// 通用组件方法
export class Component {

  static Canvas = Canvas

  static isShakingPhone(param = { onShaking: Function, onEnd: Function }) {
    wx.onAccelerometerChange((value) => {
      accelerometerX.push(value.x)
      accelerometerY.push(value.y)
      accelerometerZ.push(value.z)
      if (accelerometerX.length == 3) accelerometerX.splice(0, 1)
      if (accelerometerY.length == 3) accelerometerY.splice(0, 1)
      if (accelerometerZ.length == 3) accelerometerZ.splice(0, 1)

      // 判断 X轴方向 用户开始主观加速移动
      var accelerMeterXValue =
        accelerometerX[0] != 0 && Math.abs(accelerometerX[1] - accelerometerX[0]) > 1 ?
          accelerometerX[1] - accelerometerX[0] : 0

      // 判断 X轴方向 用户开始主观加速移动
      var accelerMeterYValue =
        accelerometerY[0] != 0 && Math.abs(accelerometerY[1] - accelerometerY[0]) > 1 ?
          accelerometerY[1] - accelerometerY[0] : 0

      // 判断 X轴方向 用户开始主观加速移动
      var accelerMeterZValue =
        accelerometerZ[0] != 0 && Math.abs(accelerometerZ[1] - accelerometerZ[0]) > 1 ?
          accelerometerZ[1] - accelerometerZ[0] : 0

      if (accelerMeterXValue * accelerMeterYValue * accelerMeterZValue != 0) {
        isShakingPhone = true
        if (typeof param.onShaking === 'function') param.onShaking()
      } else {
        if (
          isShakingPhone == true &&
          Math.abs(value.x) + Math.abs(value.y) + Math.abs(value.z) < 1.5
        ) {
          if (typeof param.onEnd === 'function') {
            param.onEnd()
            isShakingPhone = false
          }
        }
      }
    })
  }

  static adaptingIPhoneXTop = adaptingIPhoneXTop

  static canvas = Canvas

  static ScreenSize = {
    width: Canvas.width * 2,
    height: Canvas.height * 2
  }

  static backButtonRect = backButtonRect

  static addBackButton(context) {
    Utils.drawCustomImage(context, backImage, backButtonRect)
  }

  // 两倍视图解决 retina 的文字清晰度问题
  static adaptingRetina() {
    Canvas.width = Canvas.width * 2
    Canvas.height = Canvas.height * 2
  }

  // 画副标题的文字
  static drawDescriptionText(context) {
    context.fillStyle = UIKit.color.title
    context.font = '24px avenir'
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    context.fillText(
      'they determined that Cloyd had ovarian cysts',
      context.canvas.width / 2,
      (context.canvas.height + UIKit.size.logo) / 2 - 50,
      context.canvas.width
    )

    context.fillText(
      'gave her pain medications that helped her feel better',
      context.canvas.width / 2,
      (context.canvas.height + UIKit.size.logo) / 2 - 50 + 36,
      context.canvas.width
    )
  }

  // 画落叶的函数
  static fallingLeaf(context) {
    for (var index = 0; index < fallingLeafCount; index++) {
      const leafImage = wx.createImage()
      leafY += 1
      // X轴的动画算法
      leafX = context.canvas.width / 2 * (1.75 - index % 2) *
        Math.sin(2 * leafY / context.canvas.height * (index % 2) / 2 * Math.PI) *
        (leafY / context.canvas.height + 0.3)

      leafImage.src = leafSrc[index]

      context.drawImage(
        leafImage,
        300 + 50 * index + leafX,
        150 + 20 * index + leafY * (index * 0.5 + 2) * 0.2,
        UIKit.size.leaf,
        UIKit.size.leaf
      )
    }

    if (leafY >= context.canvas.height * 3 || leafX >= context.canvas.width) {
      leafY = 0
      leafX = 0
    }
  }

  // 画背景的方法
  static drawBackground(context) {
    var gradient =
      context.createLinearGradient(0, 0, context.canvas.width, context.canvas.height)
    gradient.addColorStop(0, '#d8cec5')
    gradient.addColorStop(0.5, '#faf7f3')
    gradient.addColorStop(1, '#e8e3dd')

    context.fillStyle = gradient
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }

  static getUserAgent(holdResponse) {
    // 初次设定 TempID
    const setTempID = (hasRequired) => {
      if (hasRequired == true) wx.setStorage({ key: 'tempID', data: myTempID })
    }
    /*
    * 从微信获取唯一的标识 - 这个 code 是临时的这里通过方
    * 法制作成唯一的会随着清理缓存而消失.
    */
    var initTempID = () => {
      var hasRequired = false
      if (myTempID == null) {
        wx.login({
          success: (result) => {
            hasRequired = true
            myTempID = result.code
          },
          complete: () => setTempID(hasRequired)
        })
      }
    }

    // 初次从缓存中获取 ID 如果没有就当成注册生成一个
    wx.getStorage({
      key: 'tempID',
      success: (result) => {
        myTempID = result.data
        if (typeof holdResponse === 'function') holdResponse(myTempID)
      },
      fail: () => Utils.retry(() => initTempID())
    })
  }

  static updateUserAgent(callback) {
    // 生成用户相关信息 `UserAgent`
    Component.getUserAgent((code) => {
      NetUtils.getToken({
        url: Api.token,
        tempCode: code,
        response: (userAgent) => {
          Global.userAgent = userAgent
          if (typeof callback === 'function') callback(userAgent)
        }
      })
    })
  }

  static updateCDTime(callback) {
    NetUtils.getResultWithApi({
      url: Api.userInfo,
      apiParameters: {
        noncestr: Date.now()
      },
      response: (result) => {
        Global.userAgent.cd = result.data.cd
        if (typeof callback === 'function') callback(result.data.cd)
      }
    }) 
  }
}