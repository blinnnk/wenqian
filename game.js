import Main from './js/main'
import Music from './js/common/music'


let bgmMusic = new Music()
new Main()
// 后台恢复前台后继续播放背景音乐
wx.onShow(function () {
  bgmMusic.playBgm()
  new Main()
})
