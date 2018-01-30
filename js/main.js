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

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.initLogo(0)
    this.addTouchListener()
  }

  initLogo(moveX) { 
    let logoImage = wx.createImage()
    let logoSize = 300
    let logoLeft = (ScreenSize.width - logoSize) / 2
    let logoTop = (ScreenSize.height - logoSize) / 2 - 100

    logoImage.src = 'image/wenqianLogo.png'

    logoImage.onload = function () {
      logoContext.clearRect(0, 0, ScreenSize.width, ScreenSize.height)
      drawBackground()
      logoContext.drawImage(logoImage, logoLeft + moveX, logoTop, logoSize, logoSize)
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

  addTouchListener() {
    var startX = 0
    var moveX = 0
    wx.onTouchStart(function(event) {
      startX = event.touches[0].clientX
      console.log(startX)
    }.bind(this))

    wx.onTouchMove(function (event) {
      moveX = event.touches[0].clientX - startX
      this.initLogo(moveX)
      console.log(event.touches[0].moveX)
    }.bind(this))

    wx.onTouchEnd(function(event) {
      // 松手后归位
      this.initLogo(0)
      console.log('finish')
    }.bind(this))
  }
}