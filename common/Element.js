/*
 * @date 2018/02/16
 * @author KaySaith
 * @description
 * 这里增加的对象类型是用来做函数参数类型声明用的
 */


export class Rect {
  constructor (param = {left: 0, top: 0, width: 0, height: 0}) {
    this.left = param.left
    this.top = param.top
    this.width = param.width
    this.height = param.height
  }
}

export const Image = () => wx.createImage()