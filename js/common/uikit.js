/*
* @author shangqi
* @date 2018-01-31
* @description 帧动画播放
*/

export default class PlayGif {
  constructor(canvas) {
    this.timer = null
    this.addTouchLogo(canvas)
  }

  // 绘制并播放动画 canvas：canvas对象  frameArray：图片数组  isloop：是否循环
  playFrameAnimation(canvas, frameArray, isloop) {
    var frameArray = frameArray // 赋值图片列表
    var frameArrayLength = frameArray.length // 获取图片数组长度
    
    var index = 0 // 图片下标序列号
    
    setTimeout(function () {
      let frameContext = canvas.getContext('2d')
      let image = wx.createImage()

      this.timer = setInterval(function () {
        image.src = frameArray[index]
        image.onload = function () {
          frameContext.clearRect(0, 0, 150, 150); // 绘制之前清除画布
          frameContext.drawImage(image, 0, 0, 150, 150) // 绘制图片
        } 

        index += 1 
        
        // 第一次动画播放完毕
        if (index == frameArrayLength) {
          if (isloop) {
            index = 0
          }else{
            clearInterval(this.timer)
          }
        }
      }.bind(this), 50)
    }.bind(this), 500)
  }

  // 停止动画
  stopFrameAnimation() {
    clearInterval(this.timer)
  }

  // 监听触发事件
  addTouchLogo(canvas) {
    wx.onTouchStart(function() {
      var frameArray = []
      for (var i = 0; i < 19; i++) {
        let frame = 'image/explosion' + (i + 1) + '.png'
        frameArray.push(frame)
      }

      this.playFrameAnimation(canvas, frameArray, true)

      // 5s后停止
      setTimeout(function () {
        this.stopFrameAnimation()
      }.bind(this), 5000)
    }.bind(this))
  }
}