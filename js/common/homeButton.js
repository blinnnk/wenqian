/*
* @author KaySaith
* @date 2018-01-31
*/

// Button 的枚举类型
if (typeof ButtonType == "undefined") {
  var ButtonType = {
    History: 'image/watchHistory.png',
    Destiny: 'image/requireDestiny.png'
  }
}

export default class HomeButton {
  constructor(canvas) {
    
    this.left = canvas.width * 0.2
    this.rect = {
      top: canvas.height - 200,
      left: this.left,
      width: 162,
      height: 80
    }
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    
  }

  initHistoryButton() {
    this.initButton(this.context, ButtonType.History, this.rect)
  }

  initDestinyButton() {
    this.rect.left = this.canvas.width - this.left - this.rect.width
    this.initButton(this.context, ButtonType.Destiny, this.rect)
  }

  initButton(context, buttonType, rect) {
    initBackground(context, rect)
    initiTextButton(context, rect, buttonType)

    function initiTextButton(context, rect, buttonType) {
      let image = wx.createImage()
      image.src = buttonType
      image.onload = function () {
        context.drawImage(
          image,
          rect.left,
          rect.top,
          rect.width,
          rect.height
        )
      }
    }
    
    function initBackground(context, rect) {
      let background = wx.createImage()
      background.src = 'image/buttonBackground.png'

      background.onload = function () {
        context.drawImage(
          background,
          rect.left,
          rect.top,
          rect.width,
          rect.height
        )
      }
    }
  }
}