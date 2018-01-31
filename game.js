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

// 主界面
new Main(canvas, ScreenSize)

// 后台恢复前台后继续播放背景音乐
wx.onShow(function () {
  backgroundMusic.playBackgroundMusic()
  new Main(canvas, ScreenSize)
})
