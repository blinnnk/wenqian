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
    this.backgroundMusic.src = 'sources/audio/bgm.mp3'

    this.playBackgroundMusic()

    this.clickSoundEffect = wx.createInnerAudioContext()
    this.clickSoundEffect.obeyMuteSwitch = false
    this.clickSoundEffect.src = 'sources/audio/click.wav'

    this.bellsSoundEffect = wx.createInnerAudioContext()
    this.bellsSoundEffect.obeyMuteSwitch = false
    this.bellsSoundEffect.src = 'sources/audio/bells.mp3'

    this.shakingProd = wx.createInnerAudioContext()
    this.shakingProd.obeyMuteSwitch = false
    this.shakingProd.src = 'sources/audio/prod.wav'

    this.amazing = wx.createInnerAudioContext()
    this.amazing.obeyMuteSwitch = false
    this.amazing.src = 'sources/audio/amazing.wav'

    this.unlockSoundEffect = wx.createInnerAudioContext()
    this.unlockSoundEffect.obeyMuteSwitch = false
    this.unlockSoundEffect.src = 'sources/audio/unlock.wav'
  }

  playBackgroundMusic() {
    this.backgroundMusic.play()
  }

  playClickSoundEffect() {
    this.clickSoundEffect.play()
  }

  playBells() {
    this.bellsSoundEffect.seek(0)
    this.bellsSoundEffect.play()
  }

  playShakingProd() {
    this.shakingProd.play()
  }

  playAmazingSoundEffect() {
    this.amazing.play()
  }

  playUnlockSoundEffect() {
    this.unlockSoundEffect.play()
  }

}