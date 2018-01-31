/*
* @author KaySaith
* @date 2018-01-31
*/

import CustomImage from '../util/customImage'

let titleColor = '#6f6351'
let logoSize = 300

export default class HomeLogoView {
  constructor(screenSize, context) {
    this.initLogo(screenSize, context)
  }

  initLogo(screenSize, context) {

    drawBackground()
    
    let rect = {
      left: (screenSize.width - logoSize) / 2,
      top: (screenSize.height - logoSize) / 2 - 100,
      width: logoSize,
      height: logoSize
    }
    new CustomImage(context, rect).drawLogo()

    drawDescriptionText()

    function drawDescriptionText() {
      context.fillStyle = titleColor
      context.font = '24px avenir'
      context.textBaseline = 'middle'
      context.textAlign = 'center'
      context.fillText(
        'they determined that Cloyd had ovarian cysts',
        screenSize.width / 2,
        (screenSize.height + logoSize) / 2 - 50,
        screenSize.width
      )

      context.fillText(
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