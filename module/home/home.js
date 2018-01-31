/*
* @author KaySaith
* @date 2018-01-30
*/

import Button from '../../common/homeButton'
import LogoView from '../../common/homeLogoView'
import CustomImage from '../../util/customImage'

let redDotSize = 30

export default class Main {
  constructor(canvas, screenSize) {
    this.context = canvas.getContext('2d')
    this.logoView = new LogoView(screenSize, this.context)
    this.watchHistoryButton = new Button(canvas).initHistoryButton()
    this.watchHistoryButton = new Button(canvas).initDestinyButton()

    this.branchRect = {
      width: 480,
      height: 480,
      left: screenSize.width - 480,
      top: 30
    }
    new CustomImage(this.context, this.branchRect).drawBranch()

    this.redDotRect = {
      width: redDotSize,
      height: redDotSize,
      left: (screenSize.width - redDotSize) / 2,
      top: screenSize.height - 175
    }
    new CustomImage(this.context, this.redDotRect).drawRedDot()
  }
}