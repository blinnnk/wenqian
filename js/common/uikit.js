/*
* @author shangqi
* @date 2018-01-31
* @description 帧动画播放
*/

export default class PlayGif {
  constructor() {
    this.timer = null
    this.addTouchLogo()
  }

  //是否循环动画
  isLoop(isloop){
    return isloop
  }

  //绘制并播放动画
  playFrameAnimation(frameArr, isloop) {
    let that = this // this赋值
    var isloop = that.isLoop(isloop) // 是否循环
    var frameArr = frameArr // 赋值图片列表
    var frameArrLength = frameArr.length // 获取图片数组长度
    
    var serialNumber = 0 // 图片下标序列号
    let unitNumber = 1 // 递增序列号

    setTimeout(function () {
      let contentText = canvas.getContext('2d')
      let image = wx.createImage()

      that.timer = setInterval(function () {
        image.src = frameArr[serialNumber]
        image.onload = function () {
          contentText.clearRect(0, 0, 150, 150); // 绘制之前清除画布
          contentText.drawImage(image, 0, 0, 150, 150) // 绘制图片
        } 

        serialNumber += unitNumber 
        
        //第一次动画播放完毕
        if (serialNumber == frameArrLength) {
          if (isloop) {
            serialNumber = 0
          }else{
            clearInterval(that.timer)
          }
        }
      }, 50)
    },500)
  }
  //停止动画
  stopFrameAnimation() {
    clearInterval(this.timer)
  }
  
  //监听触发事件
  addTouchLogo() {
    var that = this

    wx.onTouchStart(function() {
      var frameArr = []
      for (var i = 0; i < 19; i++) {
        let frame = 'image/explosion' + (i + 1) + '.png'
        frameArr.push(frame)
      }
      that.playFrameAnimation(frameArr, true)

      //5s后停止
      setTimeout(function () {
        that.stopFrameAnimation()
      }, 5000)
    })

  }
}