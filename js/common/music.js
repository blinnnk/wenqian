let instance

/**
 * 音效管理
 */
export default class Music {
  constructor() {
    if (instance)
      return instance

    instance = this

    this.bgmAudio = wx.createInnerAudioContext()
    this.bgmAudio.loop = true
    this.bgmAudio.src = 'audio/bgm.mp3'

    this.playBgm()
  }

  playBgm() {
    this.bgmAudio.play()
  }

}