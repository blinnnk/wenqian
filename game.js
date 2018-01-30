/*
* @author KaySaith
* @date 2018-01-30
*/

import Main from './js/main'
import Music from './js/common/music'

let backgroundMusic = new Music()
new Main()
// 后台恢复前台后继续播放背景音乐
wx.onShow(function () {
  backgroundMusic.playBackgroundMusic()
  new Main()
})
