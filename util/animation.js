/*
* @author KaySaith
* @date 2018-02-05
*/

let accelerateValue = 0
let speedValue = 0

export class Interpolator {
  // 初始化数值
  static recovery() {
    accelerateValue = 0
    speedValue = 0
  }
  /*
  * @description
  * 加速度插值器
  * [speed] 加速度的常量值越大越快
  * [maxAnimationValue] 加速度累计值到达后停止动画
  */ 
  static accelerateInterpolator(speed, maxAnimationValue) {
    speedValue += speed
    let animationValue = accelerateValue += speedValue
    if (animationValue >= maxAnimationValue) {
      animationValue = maxAnimationValue
      speedValue = 0
    }
    return animationValue
  }
}