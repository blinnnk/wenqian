/*
* @author KaySaith
* @date 2018-01-30
* @description
* 这是一个公用的播放音效的类方法
*/

let instance


export default class Music {
  constructor() {
    if (instance)
      return instance

    instance = this

    this.backgroundMusic = wx.createInnerAudioContext()
    this.backgroundMusic.loop = true
    // this.backgroundMusic.src = 'sources/audio/bgm.mp3'

    this.playBackgroundMusic()
  }

  playBackgroundMusic() {
    this.backgroundMusic.play()
  }

}