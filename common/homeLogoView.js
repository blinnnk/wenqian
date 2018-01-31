/*
* @author KaySaith
* @date 2018-01-31
*/

let titleColor = '#6f6351'

export default class HomeLogoView {
  constructor(canvas, screenSize) {
    this.initLogo(canvas, screenSize)
  }

  initLogo(canvas, screenSize) {
    let context = canvas.getContext('2d')
    let logoContext = canvas.getContext('2d')

    let logoImage = wx.createImage()
    let logoSize = 300
    let logoLeft = (screenSize.width - logoSize) / 2
    let logoTop = (screenSize.height - logoSize) / 2 - 100

    logoImage.src = 'sources/image/wenqianLogo.png'

    logoImage.onload = function () {
      logoContext.clearRect(0, 0, screenSize.width, logoSize)
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
        screenSize.width / 2,
        (screenSize.height + logoSize) / 2 - 50,
        screenSize.width
      )

      logoContext.fillText(
        'gave her pain medications that helped her feel better',
        screenSize.width / 2,
        (screenSize.height + logoSize) / 2 - 50 + 36,
        screenSize.width
      )
    }

    function drawBackground() {
      var gradient = context.createLinearGradient(0, 0, screenSize.width, screenSize.height)
      gradient.addColorStop(0, '#dbd8d5')
      gradient.addColorStop(0.5, '#ffffff')
      gradient.addColorStop(1, '#eae8e6')

      context.fillStyle = gradient
      context.fillRect(0, 0, screenSize.width, screenSize.height)
    }
  }
}