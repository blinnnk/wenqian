/*
* @author KaySaith
* @date 2018-02-08
*/

import { Global } from '../common/global'

export class NetUtils {

  static checkNetWorkStatus(callback) {
    var isSuccess = false
    wx.showLoading({ title: '正在生成' })
    wx.getNetworkType({
      success: (result) => {
        isSuccess = true
        if (result.networkType == 'none') {
          wx.showModal({
            title: '检查网络连接',
            content: '目前查找不到网络, 请检查当前网络是否可用',
          })
        } 
        else { if (typeof callback === 'function') callback() }
      },
      complete: () => { if (isSuccess == true) wx.hideLoading() }
    })
  }

  /*
  * 解析 `Api Url` 返回一个可用的 `Json` 值
  * 目前这个方法和问签的业务耦合比较大不适合转移到不同的项目
  */
  static getResultWithApi(
    param = { 
      url: String, 
      response: Function, 
      apiParameters: {},
      fail: Function, 
      complete: Function
    }
  ) {
    var isSuccess = false
    wx.request({
      url: param.url,
      data: param.apiParameters,
      header: { 'X-Lot-Token': Global.userAgent.token},
      success: (result) => {
        isSuccess = true
        if (typeof param.response === "function") {
          // 这里的 `key` 值暂时写死了 `image`
          param.response(result)
          // 和 Server 联合调试会持续监测一段时间 这个打印保留 By KaySaith
          console.info(result)
        }
      },
      complete: () => { if (typeof param.complete === 'function') param.complete(isSuccess) },
      fail: () => { if (typeof param.fail === 'function') param.fail() }
    })
  }

  static getToken(param = { 
    url: String, 
    tempCode: String, 
    response: Function, 
    complete: Function
  }) {
    var isSuccess = false
    wx.request({
      url: param.url,
      data: {
        noncestr: Date.now(),
        code: param.tempCode
      },
      method: 'post',
      success: (result) => {
        isSuccess = true
        if (typeof param.response === "function") param.response(result.data)
      },
      complete: () => { if (typeof param.complete === 'function') param.complete(isSuccess) }
    })
  }

  // 通过网络地址把文件下载到本地的 `tempFilePath`
  static downloadFile(param = { url: String, response: Function, complete: Function, fail: Function}) {
    var isSuccess = false
    wx.downloadFile({
      url: param.url,
      success: (result) => {
        isSuccess = true
        if (typeof param.response === 'function') param.response(result.tempFilePath)
      },
      fail: () => { if (typeof param.fail === 'function') param.fail() },
      complete: () => { if (typeof param.complete === 'function') param.complete(isSuccess) }
    })
  }

  // 通过 `Api Url` 获取 文件的网络地址并保存本地 返回本地的 `tempPathFile` 路径
  static getLocalPathByDownloadingFile(param = { api: String, response: response, type: 0, complete: Function, fail: Function }) {
    NetUtils.getResultWithApi({
      url: param.api,
      // 解析返回网络地址
      response: (src) => { NetUtils.downloadFile (
        src,
        // 解析返回本地文件临时路径
        (tempFileSrc) => { if (typeof param.response === 'function') param.response(tempFileSrc) },
        // 调用结束后的回调
        (isSuccess) => { if (typeof param.complete === 'function') param.complete(isSuccess) },
        () => { if (typeof param.fail === 'function') param.fail() }
      )},
      boxType: param.type
    })
  }
}