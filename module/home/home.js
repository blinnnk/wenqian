/*
* @author KaySaith
* @date 2018-01-30
*/

import Button from '../../common/homeButton'
import LogoView from '../../common/homeLogoView'
import CustomImage from '../../util/customImage'

let redDotSize = 30
let branchSize = 480

export default class Main {
  constructor(canvas, screenSize) {
    this.context = canvas.getContext('2d')
    this.logoView = new LogoView(screenSize, this.context)
    this.watchHistoryButton = new Button(screenSize, this.context).initHistoryButton()
    this.watchHistoryButton = new Button(screenSize, this.context).initDestinyButton()

    this.branchRect = {
      width: branchSize,
      height: branchSize,
      left: screenSize.width - branchSize,
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