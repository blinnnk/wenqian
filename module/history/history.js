/*
* @author shangqi
* @date 2018-01-31
*/
import Controller from '../../util/controller'
// import { drawBackground } from '../../common/component'
import { drawCustomImage } from '../../util/utils'
import { adaptingRetina } from '../../common/component'
import { Utils } from '../../util/utils'

let GantryX1 = 0
let CloudX1 = 300
let TextX1 = 420
let CloudX2 = 720
let RoyalRalaceX = 430

let gantryImage = wx.createImage()
gantryImage.src = 'sources/image/history/Gantry-01.png'
var firstGantryX = GantryX1
var recordingGantryX = GantryX1

let yunImage = wx.createImage()
yunImage.src = 'sources/image/history/yun-01.png'
var firstCloudX = CloudX1
var recordingCloudX = CloudX1

let textImage = wx.createImage()
textImage.src = 'sources/image/history/text-01.png'
var firstTextX = TextX1
var recordingTextX = TextX1

let yunImage2 = wx.createImage()
yunImage2.src = 'sources/image/history/yun-02.png'
var firstCloudX2 = CloudX2
var recordingCloudX2 = CloudX2

let royalRalaceImage = wx.createImage()
royalRalaceImage.src = 'sources/image/history/royal_ralace.jpg'
var firstRoyalRalaceX = RoyalRalaceX
var recordingRoyalRalaceX = RoyalRalaceX

// 界面主函数
export default class History {
  constructor(canvas) {
    this.drawBackground(canvas)
    this.pageTouchMove(canvas)
    this.screenWidth = canvas.width
    this.screenHeight = canvas.height
    this.draw(canvas)
  }

  drawBackground(canvas) {


  }

  draw(canvas) {
    var GantryWidth = 1271 / (1080 / canvas.height)

    let GantryRect = {
      top: 0,
      left: firstGantryX,
      width: GantryWidth,
      height: canvas.height
    }
    let yunRect = {
      top: 500,
      left: firstCloudX,
      width: 117,
      height: 50
    }
    let textRect = {
      top: 280,
      left: firstTextX,
      width: 253,
      height: 640
    }
    let yunRect2 = {
      top: 700,
      left: firstCloudX2,
      width: 180,
      height: 69
    }
    console.log(canvas.height)
    var royalRalaceTop = canvas.height - 352
    let royalRalaceRect = {
      top: royalRalaceTop,
      left: firstRoyalRalaceX,
      width: 820,
      height: 352
    }

    new Controller(
      canvas,
      function (context) {
        Utils.drawCustomImage(context, royalRalaceImage, royalRalaceRect)
        Utils.drawCustomImage(context, gantryImage, GantryRect)
        Utils.drawCustomImage(context, yunImage, yunRect)
        Utils.drawCustomImage(context, textImage, textRect)
        Utils.drawCustomImage(context, yunImage2, yunRect2)
        
      }.bind(this)
    )
  }

  pageTouchMove(canvas) {
    var clientX = 0
    wx.onTouchStart(function (event) {
      clientX = event.changedTouches[0].clientX  // 手指刚开始移动时x轴坐标
    })

    wx.onTouchMove(function (event) {
      var moveClientX = event.changedTouches[0].clientX // 手指移动过程中X轴坐标
      var moveX = moveClientX - clientX // 手指移动的距离
      firstGantryX = recordingGantryX + moveX // 龙门的x轴坐标
      firstCloudX = recordingCloudX + moveX
      firstTextX = recordingTextX + moveX
      firstCloudX2 = recordingCloudX2 + moveX
      firstRoyalRalaceX = recordingRoyalRalaceX + moveX
      if (firstGantryX >= 0) {
        firstGantryX = GantryX1
        firstCloudX = CloudX1
        firstTextX = TextX1
        firstCloudX2 = CloudX2
        firstRoyalRalaceX = RoyalRalaceX
      }
      this.draw(canvas) // 移动过程绘制龙门
    }.bind(this))

    wx.onTouchEnd(function (event) {
      recordingGantryX = firstGantryX
      recordingCloudX = firstCloudX
      recordingTextX = firstTextX
      recordingCloudX2 = firstCloudX2
      recordingRoyalRalaceX = firstRoyalRalaceX
    }.bind(this))
  }
}