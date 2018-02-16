/*
 * @author KaySaith
 * @date 2018-02-16
 * @ description
 * 把微信小程序的定制方法全部用接口的类型中专到这里, 日
 * 后如需要夸平台只需重新实现这些方法
 */

export class WeChat {

  // 罗盘的监听
  static startAccelerometer() {
    wx.startAccelerometer()
  }

  static stopAccelerometer() {
    wx.stopAccelerometer()
  }

  // 手机震动
  static vibrateLong() {
    wx.vibrateLong()
  }

  // 显示 `Loading` 状态
  static showLoading(param = { title: String, hasMask: Boolean }) {
    wx.showLoading({
      title: title,
      mask: hasMask
    })
  }

  static hideLoading() {
    wx.hideLoading()
  }

  // 后台回到前台的回调
  static onShow(callback) {
    if (typeof  callback === 'function') wx.onShow(callback)
  }
}