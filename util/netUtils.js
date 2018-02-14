/*
* @author KaySaith
* @date 2018-02-08
*/

import { Global } from '../common/global'
import { Api } from '../common/api'
import { Utils } from '../util/utils'

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
  static downloadFile(param = { 
    url: String, 
    response: Function, 
    complete: Function, 
    fail: Function,
    taskStatus: Function
  }) {
    var isSuccess = false
    const downloadTask = wx.downloadFile({
      url: param.url,
      success: (result) => {
        isSuccess = true
        if (typeof param.response === 'function') 
          param.response(result.tempFilePath)
      },
      fail: () => { if (typeof param.fail === 'function') param.fail() },
      complete: () => { if (typeof param.complete === 'function') param.complete(isSuccess) }
    })

    downloadTask.onProgressUpdate((result) => {
      /*
      * @param result
      * [progress] 进度
      * [totalBytesExpectedToWrite] 总大小
      * [totalBytesWritten] 当前下载大小
      */
      if (typeof param.taskStatus === 'function') param.taskStatus(result)
    })
  }

  static getLocalImageFromServer(parameters = {
    holdImages: Function, 
    downloadListener: Function,
  }) {
    
    requestFromServer() 
    
    var allImageSize = 0
    var finishedSize = 0
    var images = {}

    function requestFromServer() {
      // 访问接口获取图片地址
      NetUtils.getResultWithApi({
        url: Api.serverImage,
        response: (result) => {
          // 先获取全部图片的尺寸及字典的 `key` 值
          for (var objectKey in result.data.images) {
            allImageSize += result.data.images[objectKey].size
            finishedSize = allImageSize
          }
          var count = 0
          // 下载图片并存储图片的名字地址到数组对象里面
          for (var objectKey in result.data.images) {
            downloadFile(
              // 这个函数内部会判断是否需要下载的逻辑
              objectKey, 
              result.data.images[objectKey].url, 
              (element) => {
                count += 1
                if (count == Object.keys(result.data.images).length) {
                  // 在循环完毕后回调传出全部的对象
                  if (typeof parameters.holdImages === 'function')
                    parameters.holdImages(images)
                }
              }
            )
          }
        }
      })
    }

    function downloadFile(key, imagePath, getElement) {
      // 检查本地是否已经有存储的对应的 `Key` 值得图片
      checkLocalFileByKey(key, (isSuccess) => {
        if (isSuccess == false) {
          var currentSize = 0
          NetUtils.downloadFile({
            url: imagePath,
            response: (tempFilePath) => {
              wx.setStorage({
                key: key,
                data: tempFilePath,
              })
            },
            complete: (isSuccess) => { if (isSuccess == true) checkLocalFileByKey(key) },
            taskStatus: (status) => {
              // 计算当前总下载进度的百分比
              finishedSize -= status.totalBytesWritten - currentSize
              currentSize = status.totalBytesWritten
              var percent = (((allImageSize - finishedSize) / allImageSize) * 100).toFixed(2) + '%'
              // 绑定回调函数事件
              if (typeof parameters.downloadListener === 'function')
                parameters.downloadListener(percent)
            }
          })
        } else {
          if (typeof parameters.downloadListener === 'function') parameters.downloadListener('100.00%')
        }
      })

      function checkLocalFileByKey(key, callback) {
        // 先检查本地缓存中是否存在该图片如果没有再释放回调函数
        var isSuccess = false
        wx.getStorage({
          key: key,
          success: function (result) {
            isSuccess = true
            if (typeof getElement === 'function') getElement(images[key] = result.data)
          },
          complete: () => { if (typeof callback === 'function') callback(isSuccess) }
        })
      }
    }
  }
}