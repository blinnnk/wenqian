/*
* @author KaySaith
* @date 2018-01-31
*/

import CustomImage from '../util/customImage'

// Button 的枚举类型
if (typeof ButtonType == "undefined") {
  var ButtonType = {
    History: 'sources/image/watchHistory.png',
    Destiny: 'sources/image/requireDestiny.png'
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
    new CustomImage(context, rect).drawHomeButtonBackground()
    new CustomImage(context, rect).drawImage(buttonType)
  }
}