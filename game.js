/*
* @author KaySaith
* @date 2018-01-30
*/
import './js/libs/weapp-adapter'
import Main from './js/main'
import Music from './js/common/music'
import PlayGif from './js/common/uikit'

let backgroundMusic = new Music()
new Main()


// 后台恢复前台后继续播放背景音乐
wx.onShow(function () {
  backgroundMusic.playBackgroundMusic()
  new Main()
})

//点击页面触发帧动画
new PlayGif();