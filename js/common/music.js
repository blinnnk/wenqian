/*
* @author KaySaith
* @date 2018-01-30
*/

let instance


export default class Music {
  constructor() {
    if (instance)
      return instance

    instance = this

    this.backgroundMusic = wx.createInnerAudioContext()
    this.backgroundMusic.loop = true
    this.backgroundMusic.src = 'audio/bgm.mp3'

    this.playBackgroundMusic()
  }

  playBackgroundMusic() {
    this.backgroundMusic.play()
  }

}