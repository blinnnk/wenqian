/*
* @author KaySaith
* @date 2018-01-30
*/

import Main from 'main'
import Music from './util/music'


let backgroundMusic = new Music()

new Main()

// 后台恢复前台后继续播放背景音乐
wx.onShow(function () {
  backgroundMusic.playBackgroundMusic()
  new Main()
})
