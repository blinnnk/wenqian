/*
* @author KaySaith
* @date 2018-01-30
*/

export default class CustomImage {
  constructor(context, rect) {
    this.context = context
    this.rect = rect
  }

  drawCustomImage(context, rect, src) {
    let image = wx.createImage()
    image.src = src
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

  drawImage(src) {
    this.drawCustomImage(this.context, this.rect, src)
  }

  drawLogo() {
    this.drawCustomImage(this.context, this.rect, 'sources/image/wenqianLogo.png')
  }

  drawBranch() {
    this.drawCustomImage(this.context, this.rect, 'sources/image/branch.png')
  }

  drawRedDot() {
    this.drawCustomImage(this.context, this.rect, 'sources/image/redDot.png')
  }

  drawHomeButtonBackground() {
    this.drawCustomImage(this.context, this.rect, 'sources/image/buttonBackground.png')
  }
}