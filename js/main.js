import Music from 'common/music'

new Music()

const canvas = wx.createCanvas()
// 两倍视图解决 retina 的文字清晰度问题
canvas.width = canvas.width * 2
canvas.height = canvas.height * 2

// 屏幕的高宽
let screenWidth = canvas.width
let screenHeight = canvas.height
let titleColor = '#6f6351'

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.initMainContext()
    this.initLogo()
  }

  initMainContext() {
    let context = canvas.getContext('2d')
    var gradient = context.createLinearGradient(0, 0, screenHeight, screenHeight)
    gradient.addColorStop(0, '#dbd8d5')
    gradient.addColorStop(0.5, '#ffffff')
    gradient.addColorStop(1, '#eae8e6')

    context.fillStyle = gradient
    context.fillRect(0, 0, screenWidth, screenHeight)
  }

  initLogo() {
    let logoContext = canvas.getContext('2d')
    let logoImage = wx.createImage()
    let logoSize = 300
    let logoLeft = (screenWidth - logoSize) / 2
    let logoTop = (screenHeight - logoSize) / 2 - 100

    logoImage.src = 'image/wenqianLogo.png'

    logoImage.onload = function () {
      logoContext.drawImage(logoImage, logoLeft, logoTop, logoSize, logoSize)
    }

    logoContext.fillStyle = titleColor
    logoContext.font = '24px avenir'
    logoContext.textBaseline = 'middle'
    logoContext.textAlign = 'center'
    logoContext.fillText(
      'they determined that Cloyd had ovarian cysts',
      screenWidth / 2,
      (screenHeight + logoSize) / 2 - 50,
      screenWidth
    )

    logoContext.fillText(
      'gave her pain medications that helped her feel better',
      screenWidth / 2,
      (screenHeight + logoSize) / 2 - 50 + 36,
      screenWidth
    )
  }
}