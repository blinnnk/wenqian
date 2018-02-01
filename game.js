/*
* @author KaySaith
* @date 2018-01-30
*/

import Main from 'module/home/home'
import Music from 'util/music'

let canvas = wx.createCanvas()
// 两倍视图解决 retina 的文字清晰度问题
canvas.width = canvas.width * 2
canvas.height = canvas.height * 2

// 屏幕的高宽
let ScreenSize = {
  width: canvas.width,
  height: canvas.height
}

// 背景音乐
let backgroundMusic = new Music()

let logoImage = wx.createImage()
logoImage.src = 'sources/image/wenqianLogo.png'

let logoSize = 300
let logoRect = {
  left: (ScreenSize.width - logoSize) / 2,
  top: (ScreenSize.height - logoSize) / 2 - 100,
  width: logoSize,
  height: logoSize
}

let titleColor = '#6f6351'


let buttonLeft = ScreenSize.width * 0.2
let buttonRect = {
  top: ScreenSize.height - 200,
  left: buttonLeft,
  width: 162,
  height: 80
}

let buttonBackgroundImage = wx.createImage()
buttonBackgroundImage.src = 'sources/image/buttonBackground.png'

let historyImage = wx.createImage()
historyImage.src = 'sources/image/watchHistory.png'

let destinyImage = wx.createImage()
destinyImage.src = 'sources/image/requireDestiny.png'

let redDotImage = wx.createImage()
redDotImage.src = 'sources/image/redDot.png'

let redDotSize = 30
let redDotRect = {
  width: redDotSize,
  height: redDotSize,
  left: (ScreenSize.width - redDotSize) / 2,
  top: ScreenSize.height - 175
}

let branchImage = wx.createImage()
branchImage.src = 'sources/image/branch.png'

let branchSize = 480
let branchRect = {
  width: branchSize,
  height: branchSize,
  left: ScreenSize.width,
  top: 30
}

let leafImage = wx.createImage()
leafImage.src = 'sources/image/leaf.png'
let leafSize = 66

var branchMoveX = 0

var leafY = 0
var leafX = 0

// 主界面
new Main(canvas, function(context, animation) {

  drawBackground(context)
  // 画 Logo
  context.drawImage(
    logoImage, 
    logoRect.left, 
    logoRect.top, 
    logoRect.width, 
    logoRect.height)
  drawDescriptionText(context)

  // 画按钮的背景笔墨
  context.drawImage(
    buttonBackgroundImage, 
    buttonRect.left, 
    buttonRect.top, 
    buttonRect.width, 
    buttonRect.height)

  // 画寻史按钮
  context.drawImage(
    historyImage,
    buttonRect.left,
    buttonRect.top,
    buttonRect.width,
    buttonRect.height)

  // 画求签的背景笔墨
  context.drawImage(
    buttonBackgroundImage,
    ScreenSize.width - buttonLeft - buttonRect.width,
    buttonRect.top,
    buttonRect.width,
    buttonRect.height)

  // 画求签按钮
  context.drawImage(
    destinyImage,
    ScreenSize.width - buttonLeft - buttonRect.width,
    buttonRect.top,
    buttonRect.width,
    buttonRect.height)  

  // 画按钮之间的红色小点
  context.drawImage(
    redDotImage,
    redDotRect.left,
    redDotRect.top,
    redDotRect.width,
    redDotRect.height
  )

  // 画树枝并做动画
  branchMoveX += 5
  context.drawImage(
    branchImage,
    branchRect.left - branchMoveX,
    branchRect.top,
    branchRect.width,
    branchRect.height
  )
  if (branchMoveX >= branchSize) {
    branchMoveX = branchSize
    fallingLeaf()
  }

  function fallingLeaf() {
    leafX += 1
    leafY += 1
    context.drawImage(
      leafImage,
      300 + leafX,
      100 + leafY,
      leafSize,
      leafSize
    )
    if (leafY >= ScreenSize.height || leafX >= ScreenSize.width) {
      leafY = 0
      leafX = 0
    }
  }

})

function drawBackground(context) {
  var gradient = context.createLinearGradient(0, 0, ScreenSize.width, ScreenSize.height)
  gradient.addColorStop(0, '#dbd8d5')
  gradient.addColorStop(0.5, '#ffffff')
  gradient.addColorStop(1, '#eae8e6')

  context.fillStyle = gradient
  context.fillRect(0, 0, ScreenSize.width, ScreenSize.height)
}

function drawDescriptionText(context) {
  context.fillStyle = titleColor
  context.font = '24px avenir'
  context.textBaseline = 'middle'
  context.textAlign = 'center'
  context.fillText(
    'they determined that Cloyd had ovarian cysts',
    ScreenSize.width / 2,
    (ScreenSize.height + logoSize) / 2 - 50,
    ScreenSize.width
  )

  context.fillText(
    'gave her pain medications that helped her feel better',
    ScreenSize.width / 2,
    (ScreenSize.height + logoSize) / 2 - 50 + 36,
    ScreenSize.width
  )
}

// 后台恢复前台后继续播放背景音乐
wx.onShow(function () {
  backgroundMusic.playBackgroundMusic()
  new Main(canvas, ScreenSize)
})
