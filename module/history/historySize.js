import { Component } from '../../common/component'
import { Canvas } from '../../common/component'
import { UIKit } from '../../common/uikit'

let screenWidth = Component.ScreenSize.width
let screenHeight = Component.ScreenSize.height

export default class historySize {
  initSize() {
    this.gantryX1 = 0
    this.gantryX2 = screenWidth * 5.2
    this.dragoncolumnX1 = screenWidth * 3.62
    this.dragoncolumnX2 = screenWidth * 12.6
    this.cloudX1 = screenWidth * 0.42
    this.textX1 = screenWidth * 0.9
    this.textX2 = screenWidth * 3.3
    this.textX3 = screenWidth * 4.8
    this.textX4 = screenWidth * 6.9
    this.textX5 = screenWidth * 8.2
    this.textX6 = screenWidth * 10.5
    this.textX7 = screenWidth * 13.5
    this.cloudX2 = screenWidth
    this.cloudX3 = screenWidth * 1.45
    this.cloudX4 = screenWidth * 1.95
    this.cloudX5 = screenWidth * 2.95
    this.cloudX6 = screenWidth * 3.2
    this.cloudX7 = screenWidth * 4.3
    this.cloudX8 = screenWidth * 5.18
    this.cloudX9 = screenWidth * 5.65
    this.cloudX10 = screenWidth * 5.25
    this.cloudX11 = screenWidth * 5.75
    this.cloudX12 = screenWidth * 7.05
    this.cloudX13 = screenWidth * 7.5
    this.cloudX14 = screenWidth * 8.2
    this.cloudX15 = screenWidth * 8.4
    this.cloudX16 = screenWidth * 8.7
    this.cloudX17 = screenWidth * 10.2
    this.cloudX18 = screenWidth * 10.8
    this.cloudX19 = screenWidth * 10.8
    this.cloudX20 = screenWidth * 13
    this.royalRalaceX = screenWidth * 0.74
    this.templeX = screenWidth * 2.9
    this.lotteryX = screenWidth * 4
    this.leafX = screenWidth * 3.7
    this.characterX1 = screenWidth * 5.55
    this.characterX2 = screenWidth * 8.3
    this.characterX3 = screenWidth * 10.7
    this.characterX4 = screenWidth * 13.7
    this.everythingIsGoodX = screenWidth * 12.6
    this.hardworkX = screenWidth * 12.78
  }
  initRect() {
    this.backButtonRect = {
      width: UIKit.size.buttonWidth,
      height: UIKit.size.buttonHeight,
      left: screenWidth * 0.065,
      top: screenWidth * 0.1
    }
    var gantryWidth = 1271 / (1080 / screenHeight)
    this.gantryRect = {
      top: 0,
      left: this.gantryX1,
      width: gantryWidth,
      height: Canvas.height * 2
    }
    var gantry2Width = 1456 / (1080 / screenHeight)
    this.gantry2Rect = {
      top: 0,
      left: this.gantryX2,
      width: gantry2Width,
      height: Canvas.height * 2
    }   
    this.dragoncolumn1Rect = {
      top: 0,
      left: this.dragoncolumnX1,
      width: screenWidth * 0.24,
      height: screenHeight
    }
    this.dragoncolumn2Rect = {
      top: 0,
      left: this.dragoncolumnX2,
      width: screenWidth * 0.24,
      height: screenHeight
    }
    this.EverythingIsGoodRect = {
      top: screenHeight - screenWidth * 0.75,
      left: this.everythingIsGoodX,
      width: screenWidth * 0.38,
      height: screenWidth * 0.75
    }
    this.HardworkRect = {
      top: screenHeight - screenWidth * 0.56,
      left: this.hardworkX,
      width: screenWidth * 0.25,
      height: screenWidth * 0.56
    }
    this.cloudRect = {
      top: screenHeight * 0.4,
      left: this.cloudX1,
      width: screenWidth * 0.16,
      height: screenWidth * 0.07
    }
    this.cloudRect2 = {
      top: screenHeight * 0.54,
      left: this.cloudX2,
      width: screenWidth * 0.25,
      height: screenWidth * 0.09
    }
    this.cloudRect3 = {
      top: screenHeight - screenWidth * 0.2,
      left: this.cloudX3,
      width: screenWidth * 0.64,
      height: screenWidth * 0.2
    }
    this.cloudRect4 = {
      top: screenHeight * 0.7,
      left: this.cloudX4,
      width: screenWidth * 0.54,
      height: screenWidth * 0.21
    }
    this.cloudRect5 = {
      top: screenHeight * 0.04,
      left: this.cloudX5,
      width: screenWidth * 0.54,
      height: screenWidth * 0.21
    }
    this.cloudRect6 = {
      top: 0,
      left: this.cloudX6,
      width: screenWidth * 0.69,
      height: screenWidth * 0.18
    }
    this.cloudRect7 = {
      top: screenHeight * 0.15,
      left: this.cloudX7,
      width: screenWidth * 0.25,
      height: screenWidth * 0.1
    }
    this.cloudRect8 = {
      top: screenHeight * 0.01,
      left: this.cloudX8,
      width: screenWidth * 0.64,
      height: screenWidth * 0.27
    }
    this.cloudRect9 = {
      top: 0,
      left: this.cloudX9,
      width: screenWidth * 0.43,
      height: screenWidth * 0.12
    }  
    this.cloudRect10 = {
      top: screenHeight * 0.7,
      left: this.cloudX10,
      width: screenWidth * 0.44,
      height: screenWidth * 0.17
    }  
    this.cloudRect11 = {
      top: screenHeight * 0.73,
      left: this.cloudX11,
      width: screenWidth * 0.44,
      height: screenWidth * 0.17
    }    
    this.cloudRect12 = {
      top: screenHeight - screenWidth * 0.24,
      left: this.cloudX12,
      width: screenWidth * 0.64,
      height: screenWidth * 0.24
    } 
    this.cloudRect13 = {
      top: screenHeight - screenWidth * 0.16 - 80,
      left: this.cloudX13,
      width: screenWidth * 0.37,
      height: screenWidth * 0.16
    }    
    this.cloudRect14 = {
      top: screenHeight * 0.77,
      left: this.cloudX14,
      width: screenWidth * 0.44,
      height: screenWidth * 0.17
    }  
    this.cloudRect15 = {
      top: 0,
      left: this.cloudX15,
      width: screenWidth * 0.54,
      height: screenWidth * 0.13
    }  
    this.cloudRect16 = {
      top: screenHeight * 0.08,
      left: this.cloudX16,
      width: screenWidth * 0.54,
      height: screenWidth * 0.23
    }    
    this.cloudRect17 = {
      top: 0,
      left: this.cloudX17,
      width: screenWidth * 0.69,
      height: screenWidth * 0.18
    } 
    this.cloudRect18 = {
      top: screenHeight * 0.2,
      left: this.cloudX18,
      width: screenWidth * 0.4,
      height: screenWidth * 0.17
    }  
    this.cloudRect19 = {
      top: screenHeight - screenWidth * 0.19,
      left: this.cloudX19,
      width: screenWidth * 1.24,
      height: screenWidth * 0.19
    }    
    this.cloudRect20 = {
      top: screenHeight - screenWidth * 0.13,
      left: this.cloudX20,
      width: screenWidth * 0.45,
      height: screenWidth * 0.13
    }  
    this.royalRalaceRect = {
      top: screenHeight - screenWidth * 0.42,
      left: this.royalRalaceX,
      width: screenWidth,
      height: screenWidth * 0.42
    }
    this.templeRect = {
      top: screenHeight * 0.7,
      left: this.templeX,
      width: screenWidth * 0.79,
      height: screenWidth * 0.53
    }
    this.lotteryRect = {
      top: screenHeight - screenWidth * 0.77 - 50,
      left: this.lotteryX,
      width: screenWidth * 0.36,
      height: screenWidth * 0.77
    }
    this.leafRect = {
      top: screenHeight - screenWidth * 0.115,
      left: this.leafX,
      width: screenWidth * 0.82,
      height: screenWidth * 0.115
    }
    this.character1Rect = {
      top: screenHeight *0.3,
      left: this.characterX1,
      width: screenWidth * 0.475,
      height: screenWidth * 0.81
    }
    this.character2Rect = {
      top: screenHeight * 0.3,
      left: this.characterX2,
      width: screenWidth * 0.74,
      height: screenWidth * 0.85
    }
    this.character3Rect = {
      top: screenHeight * 0.3,
      left: this.characterX3,
      width: screenWidth * 1.7,
      height: screenWidth * 0.94
    }
    this.character4Rect = {
      top: screenHeight * 0.3,
      left: this.characterX4,
      width: screenWidth * 1.3,
      height: screenWidth * 0.84
    }
    this.text1 = '求签至迟产生於唐朝末年的道观中,後来几乎遍及一切神庙、宫观和寺院。求签活动是什麽时候开始的,具体年月不大容易确定。但最迟应当出现於唐末。'
    this.text1ColumnNumber = 16
    this.text1Rect = {
      top: screenHeight * 0.22,
      left: this.textX1
    }
    this.text2 = '五代时，宰相卢多逊，年幼时，取得一签，回家给他父亲看，签词是：「身出中书堂，须因天水白。登仙五十二，终为蓬海客。」父亲很高兴，认为是吉兆，便将签留下。後来卢真的做了宰相。签中的话竟然一字不差。（参看宋  释文莹《玉壶清话》卷三。）五代时间很短，卢多逊实生於唐末，他幼时废坛上已有古签筒，足见签的出现尚在此前。'
    this.text2ColumnNumber = 12
    this.text2Rect = {
      top: screenHeight * 0.22,
      left: this.textX2
    }
    this.text3 = '产生於道观中的签，後来被普遍采纳，佛教寺院，民间的神庙，也都摆上签，供人抽取。'
    this.text3ColumnNumber = 16
    this.text3Rect = {
      top: screenHeight * 0.22,
      left: this.textX3
    } 
    this.text4 = '签是依於神示的，某某签条上的辞句被认为是该神的教导、启示、预言，因此签皆以神名，称某某（神）灵签。中国民众崇拜多神，所以签的种类也极其繁多。从理论上说，有多少神有专庙或专殿，就有多少签。在有关玄帝的道书中，也存有玄帝灵签 。现今的神庙宫观，不少置有签，其签也皆以该宫观神庙及寺院的神明为称。'
    this.text4ColumnNumber = 17
    this.text4Rect = {
      top: screenHeight * 0.22,
      left: this.textX4
    } 
    this.text5 = '对签的信赖程度与对神灵的虔信程度成正比：明代真武大帝信仰极盛，人们对其灵签的信赖也特别地深。明顾起元《客座赘语》卷七《玄帝灵签》云'
    this.text5ColumnNumber = 17
    this.text5Rect = {
      top: screenHeight * 0.22,
      left: this.textX5
    } 
    this.text6 = '北门桥有玄帝庙，相传圣像乃南唐北城门楼上所供奉的，移像於今庙，庙有签，灵验不可胜纪。人竭诚祈之，往往洞人心腹之隐与祸福之应，如面语者。余生平凡有祈，靡不奇中。乙酉，余一四岁女偶病，祈之，报云：「小口阴人多病厄，定归骸骨到荒丘。」已而果(圽)(mò,义同殁)。庚子余病，三月祈之，报以「宜勿药候时」。四月祈之，「病宜增，骨瘦且如柴」，已而果然。五月祈之，报云「而今渐有佳消息」，是月病果小减。六月祈之，报云「枯木重荣」，此月肌肉果复生，骎骎向平善矣。余尝谓帝之报我，其应如响，迄今不敢忘冥佑也。它友人祈者，尤多奇应。'
    this.text6ColumnNumber = 17
    this.text6Rect = {
      top: screenHeight * 0.22,
      left: this.textX6
    } 
    this.text7 = '这种灵验究竟应当如保解释，且置勿论，这儿只想指出，因神之威信而增加了对签的信赖，而签的灵验又加固了对神的信仰。如此循环，使灵签的信仰在社会上根深蒂固，流传不绝。'
    this.text7ColumnNumber = 17
    this.text7Rect = {
      top: screenHeight * 0.22,
      left: this.textX7
    } 
  }
}
