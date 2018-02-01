/*
* @author KaySaith
* @date 2018-02-01
*/

// 通用的画图方法
export function drawCustomImage(context, image, rect) {
  context.drawImage(
    image,
    rect.left,
    rect.top,
    rect.width,
    rect.height
  )
}

/*
* @description
* 抽象了一个向左移动内容的动画函数, 封装的参数比较多着重介绍
* @param
* [maxMoveDistance] 最大移动距离, 这个值决定动画的最大距离. 到达后停止
* [callback] 当动画停止的时候触发的函数
*/
var moveX = 0
export function drawImageAndMoveToLeftWithAnimation(
  context, 
  image, 
  rect, 
  speed, 
  maxMoveDistance,
  callback
  ) {
  moveX += speed
  context.drawImage(
    image,
    rect.left - moveX,
    rect.top,
    rect.width,
    rect.height)
  if (moveX >= maxMoveDistance) {
    moveX = maxMoveDistance
    if (typeof callback === 'function') {
      callback()
    }
  }
}