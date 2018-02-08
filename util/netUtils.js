/*
* @author KaySaith
* @date 2018-02-08
*/


export class NetUtils {
  // 解析 `Api Url` 返回一个可用的 `Json` 值
  // 目前这个方法和问签的业务耦合比较大不适合转移到不同的项目
  static getNetFile(url, hold, boxType, complete) {
    var isSuccess = false
    wx.request({
      url: url,
      data: {
        noncestr: Date.now(),
        type: boxType
      },
      success: function (result) {
        isSuccess = true
        if (typeof hold === "function") {
          // 这里的 `key` 值暂时写死了 `image`
          hold({ 
            src: result.data.image, 
            xj: result.data.xj
            })
          // 和 Server 联合调试会持续监测一段时间 这个打印保留 By KaySaith
          console.info(result)
        }
      },
      complete: function() {
        if (typeof complete === 'function') {
          complete(isSuccess)
        }
      }
    })
  }

  // 通过网络地址把文件下载到本地的 `tempFilePath`
  static downloadFile(url, hold, finishCallback, failCallback) {
    var isSuccess = false
    wx.downloadFile(
      {
        url: url,
        success: function (result) {
          isSuccess = true
          if (typeof hold === 'function') {
            hold(result.tempFilePath)
          }
        },
        fail: function() {
          if (typeof failCallback === 'function') {
            failCallback()
          }
        },
        complete: function() {
          if (typeof finishCallback === 'function') {
            finishCallback(isSuccess)
          }
        }
      }
    )
  }

  // 通过 `Api Url` 获取 文件的网络地址并保存本地 返回本地的 `tempPathFile` 路径
  static getLocalPathByDownloadingNetFile(
    api,
    holdTempPath, 
    boxType,
    finishCallback, 
    failCallback
    ) {
    NetUtils.getNetFile(
      api,
      function (src) {
        // 解析返回网络地址
        NetUtils.downloadFile(
          src,
          function (tempFileSrc) {
            // 解析返回本地文件临时路径
            if (typeof holdTempPath === 'function') {
              holdTempPath(tempFileSrc)
            }
          },
          function(isSuccess) {
            // 调用结束后的回调
            if (typeof finishCallback === 'function') {
              finishCallback(isSuccess)
            }
          },
          function() {
            if (typeof failCallback === 'function') {
              failCallback()
            }
          }
        )
      },
      boxType
    )
  }
}