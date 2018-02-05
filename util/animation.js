/*
* @author KaySaith
* @date 2018-02-05
*/

var accelerateValue = 0
var speedValue = 0

export class Interpolator {
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