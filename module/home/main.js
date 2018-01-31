/*
* @author KaySaith
* @date 2018-01-30
*/

import Button from '../../common/homeButton'
import LogoView from '../../common/homeLogoView'
import playGif from '../../util/uikit'

let canvas = wx.createCanvas()
new playGif(canvas)
// 两倍视图解决 retina 的文字清晰度问题
canvas.width = canvas.width * 2
canvas.height = canvas.height * 2

// 屏幕的高宽
let ScreenSize = {
  width: canvas.width,
  height: canvas.height
}

// 界面主函数

export default class Main {
  constructor() {
    this.logoView = new LogoView(canvas, ScreenSize)
    this.watchHistoryButton = new Button(canvas).initHistoryButton()
    this.watchHistoryButton = new Button(canvas).initDestinyButton()
  }
}