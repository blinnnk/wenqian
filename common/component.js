/*
* @author KaySaith
* @date 2018-02-01
*/

import { UISize } from 'uikit'
import { UIColor } from 'uikit'
import { ImageSrc } from 'uikit'

export let canvas = wx.createCanvas()

export function adaptingRetina() {
  // 两倍视图解决 retina 的文字清晰度问题
  canvas.width = canvas.width * 2
  canvas.height = canvas.height * 2
}

// 画副标题的文字
export function drawDescriptionText(context) {
  context.fillStyle = UIColor.title
  context.font = '24px avenir'
  context.textBaseline = 'middle'
  context.textAlign = 'center'
  context.fillText(
    'they determined that Cloyd had ovarian cysts',
    context.canvas.width / 2,
    (context.canvas.height + UISize.logo) / 2 - 50,
    context.canvas.width
  )

  context.fillText(
    'gave her pain medications that helped her feel better',
    context.canvas.width / 2,
    (context.canvas.height + UISize.logo) / 2 - 50 + 36,
    context.canvas.width
  )
}

// 落叶动画的相关参数
let leafSrc = 
[ImageSrc.leaf, ImageSrc.leaf1, ImageSrc.leaf2, ImageSrc.leaf, ImageSrc.leaf1]
var leafY = 0
var leafX = 0
let fallingLeafCount = 5

export function fallingLeaf(context) {
  for (var index = 0; index < fallingLeafCount; index++) {
    let leafImage = wx.createImage()
    leafY += 1
    // X轴的动画算法
    leafX = context.canvas.width / 2 * (1.75 - index % 2) *
      Math.sin(2 * leafY / context.canvas.height * (index % 2) / 2 * Math.PI) *
      (leafY / context.canvas.height + 0.3)

    leafImage.src = leafSrc[index]

    context.drawImage(
      leafImage,
      300 + 50 * index + leafX,
      150 + 20 * index + leafY * (index * 0.5 + 2) * 0.2,
      UISize.leaf,
      UISize.leaf
    )
  }
  if (leafY >= context.canvas.height * 3 || leafX >= context.canvas.width) {
    leafY = 0
    leafX = 0
  }
}

// 画背景的方法
export function drawBackground(context) {
  var gradient = 
  context.createLinearGradient(0, 0, context.canvas.width, context.canvas.height)
  gradient.addColorStop(0, '#dbd8d5')
  gradient.addColorStop(0.5, '#ffffff')
  gradient.addColorStop(1, '#eae8e6')

  context.fillStyle = gradient
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}