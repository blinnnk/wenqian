/*
* @author KaySaith
* @date 2018-01-30
*/

import Button from './common/homeButton'

let canvas = wx.createCanvas()
// 两倍视图解决 retina 的文字清晰度问题
canvas.width = canvas.width * 2
canvas.height = canvas.height * 2

// 屏幕的高宽
let ScreenSize = {
  width: canvas.width,
  height: canvas.height
}

let titleColor = '#6f6351'
let context = canvas.getContext('2d')
let logoContext = canvas.getContext('2d')

// 界面主函数

export default class Main {
  constructor() {
    this.initLogo()
    this.watchHistoryButton = new Button(canvas).initHistoryButton()
    this.watchHistoryButton = new Button(canvas).initDestinyButton()
  }

  initLogo() {

    let logoImage = wx.createImage()
    let logoSize = 300
    let logoLeft = (ScreenSize.width - logoSize) / 2
    let logoTop = (ScreenSize.height - logoSize) / 2 - 100

    logoImage.src = 'image/wenqianLogo.png'

    logoImage.onload = function () {
      logoContext.clearRect(0, 0, ScreenSize.width, logoSize)
      drawBackground()
      logoContext.drawImage(
        logoImage, 
        logoLeft, 
        logoTop, 
        logoSize, 
        logoSize
        )
      drawDescriptionText()
    }

    function drawDescriptionText() {
      logoContext.fillStyle = titleColor
      logoContext.font = '24px avenir'
      logoContext.textBaseline = 'middle'
      logoContext.textAlign = 'center'
      logoContext.fillText(
        'they determined that Cloyd had ovarian cysts',
        ScreenSize.width / 2,
        (ScreenSize.height + logoSize) / 2 - 50,
        ScreenSize.width
      )

      logoContext.fillText(
        'gave her pain medications that helped her feel better',
        ScreenSize.width / 2,
        (ScreenSize.height + logoSize) / 2 - 50 + 36,
        ScreenSize.width
      )
    }

    function drawBackground() {
      var gradient = context.createLinearGradient(0, 0, ScreenSize.width, ScreenSize.height)
      gradient.addColorStop(0, '#dbd8d5')
      gradient.addColorStop(0.5, '#ffffff')
      gradient.addColorStop(1, '#eae8e6')

      context.fillStyle = gradient
      context.fillRect(0, 0, ScreenSize.width, ScreenSize.height)
    }
  }
  
}