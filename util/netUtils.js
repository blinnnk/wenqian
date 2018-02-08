/*
* @author KaySaith
* @date 2018-02-08
*/


export class NetUtils {
  // 解析 `Api Url` 返回一个可用的 `Json` 值
  static getNetFile(url, hold) {
    wx.request({
      url: url,
      data: {
        noncestr: Date.now()
      },
      success: function (result) {
        if (typeof hold === "function") {
          // 这里的 `key` 值暂时写死了 `image`
          hold(result.data.image)
        }
      }
    })
  }

  // 通过网络地址把文件下载到本地的 `tempFilePath`
  static downloadFile(url, hold, finishCallback) {
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
        complete: function() {
          if (typeof finishCallback === 'function') {
            finishCallback(isSuccess)
          }
        }
      }
    )
  }

  // 通过 `Api Url` 获取 文件的网络地址并保存本地 返回本地的 `tempPathFile` 路径
  static getLocalPathByDownloadingNetFile(api, holdTempPath, finishCallback) {
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
          }
        )
      }
    )
  }
}