/*
* @author KaySaith
* @date 2018-02-12
* @description 挂在到全局的函数, 这里主要放置扩展类函数为主
*/

(() => {
  /*—————— Array Extension ——————*/

  Array.prototype.lastIndex = function () {
    if (this.length < 0) return
    return this.length - 1
  }

  Array.prototype.last = function () {
    if (this.length < 0) return
    return this[this.length - 1]
  }

  // 获取数字数组中的最大项
  Array.prototype.max = function () {
    return this.sortNum(1)[0]
  }

})()