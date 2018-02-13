/*
* @author KaySaith
* @date 2018-02-11
*/

var userAgent = null
/*
* 因为网络返回的接口中 签的类型和图片一起返回, 这里设计成在这个页面解析出
* 图片的网络参数数据, 在这里主要使用签的类型 [xj] 上上签,中签...
* 把网络 Src 传入到 PoemDetail 进行本地路径转换, 有点耦合但是接口这么给
* 的这样子设计效率是最高的. 故此.
*/
var prodInfo = {
  src: '',
  xj: '',
  index: 0
}

var BoxType = {
  guanYin: 0,
  zhouGong: 1
}

var currentBoxType = BoxType.guanYin

export class Global {
  static BoxType = BoxType
  static userAgent = userAgent
  static prodInfo = prodInfo
  static currentBoxType = currentBoxType 
  static serverImages = {}
}