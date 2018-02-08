import { Component } from '../../common/component'
import { Canvas } from '../../common/component'
import { UIKit } from '../../common/uikit'

let ScreenWidth = Component.ScreenSize.width
let ScreenHeight = Component.ScreenSize.height

export default class historySize {
  constructor() {
    // this.initSize()
  }
  initSize() {
    this.a = 0
    this.GantryX1 = 0 - this.a
    this.GantryX2 = ScreenWidth * 5.2 - this.a
    this.dragoncolumnX1 = ScreenWidth * 3.62 - this.a
    this.dragoncolumnX2 = ScreenWidth * 12.6 - this.a
    this.CloudX1 = ScreenWidth * 0.42 - this.a
    this.TextX1 = ScreenWidth * 0.9 - this.a
    this.TextX2 = ScreenWidth * 3.3 - this.a
    this.TextX3 = ScreenWidth * 4.8 - this.a
    this.TextX4 = ScreenWidth * 6.9 - this.a
    this.TextX5 = ScreenWidth * 8.2 - this.a
    this.TextX6 = ScreenWidth * 10.5 - this.a
    this.TextX7 = ScreenWidth * 13.5 - this.a
    this.CloudX2 = ScreenWidth - this.a
    this.CloudX3 = ScreenWidth * 1.45 - this.a
    this.CloudX4 = ScreenWidth * 1.95 - this.a
    this.CloudX5 = ScreenWidth * 2.95 - this.a
    this.CloudX6 = ScreenWidth * 3.2 - this.a
    this.CloudX7 = ScreenWidth * 4.3 - this.a
    this.CloudX8 = ScreenWidth * 5.18 - this.a
    this.CloudX9 = ScreenWidth * 5.65 - this.a
    this.CloudX10 = ScreenWidth * 5.25 - this.a
    this.CloudX11 = ScreenWidth * 5.75 - this.a
    this.CloudX12 = ScreenWidth * 7.05 - this.a
    this.CloudX13 = ScreenWidth * 7.5 - this.a
    this.CloudX14 = ScreenWidth * 8.2 - this.a
    this.CloudX15 = ScreenWidth * 8.4 - this.a
    this.CloudX16 = ScreenWidth * 8.7 - this.a
    this.CloudX17 = ScreenWidth * 10.2 - this.a
    this.CloudX18 = ScreenWidth * 10.8 - this.a
    this.CloudX19 = ScreenWidth * 10.8 - this.a
    this.CloudX20 = ScreenWidth * 13 - this.a
    this.RoyalRalaceX = ScreenWidth * 0.74 - this.a
    this.TempleX = ScreenWidth * 2.9 - this.a
    this.LotteryX = ScreenWidth * 4 - this.a
    this.LeafX = ScreenWidth * 3.7 - this.a
    this.CharacterX1 = ScreenWidth * 5.55 - this.a
    this.CharacterX2 = ScreenWidth * 8.3 - this.a
    this.CharacterX3 = ScreenWidth * 10.7 - this.a
    this.CharacterX4 = ScreenWidth * 13.7 - this.a
    this.EverythingIsGoodX = ScreenWidth * 12.6 - this.a
    this.HardworkX = ScreenWidth * 12.78 - this.a
  }
  initRect() {
    this.backButtonRect = {
      width: UIKit.size.buttonWidth,
      height: UIKit.size.buttonHeight,
      left: ScreenWidth * 0.065,
      top: ScreenWidth * 0.1
    }
    var gantryWidth = 1271 / (1080 / ScreenHeight)
    this.gantryRect = {
      top: 0,
      left: this.gantryX1,
      width: gantryWidth,
      height: Canvas.height * 2
    }
    var gantry2Width = 1456 / (1080 / ScreenHeight)
    this.gantry2Rect = {
      top: 0,
      left: this.gantryX2,
      width: gantry2Width,
      height: Canvas.height * 2
    }   
    this.dragoncolumn1Rect = {
      top: 0,
      left: this.dragoncolumnX1,
      width: ScreenWidth * 0.24,
      height: ScreenHeight
    }
    this.dragoncolumn2Rect = {
      top: 0,
      left: this.dragoncolumnX2,
      width: ScreenWidth * 0.24,
      height: ScreenHeight
    }
    this.EverythingIsGoodRect = {
      top: ScreenHeight - ScreenWidth * 0.75,
      left: this.EverythingIsGoodX,
      width: ScreenWidth * 0.38,
      height: ScreenWidth * 0.75
    }
    this.HardworkRect = {
      top: ScreenHeight - ScreenWidth * 0.56,
      left: this.HardworkX,
      width: ScreenWidth * 0.25,
      height: ScreenWidth * 0.56
    }
    this.cloudRect = {
      top: ScreenHeight * 0.4,
      left: this.CloudX1,
      width: ScreenWidth * 0.16,
      height: ScreenWidth * 0.07
    }
    this.cloudRect2 = {
      top: ScreenHeight * 0.54,
      left: this.CloudX2,
      width: ScreenWidth * 0.25,
      height: ScreenWidth * 0.09
    }
    this.cloudRect3 = {
      top: ScreenHeight - ScreenWidth * 0.2,
      left: this.CloudX3,
      width: ScreenWidth * 0.64,
      height: ScreenWidth * 0.2
    }
    this.cloudRect4 = {
      top: ScreenHeight * 0.7,
      left: this.CloudX4,
      width: ScreenWidth * 0.54,
      height: ScreenWidth * 0.21
    }
    this.cloudRect5 = {
      top: ScreenHeight * 0.04,
      left: this.CloudX5,
      width: ScreenWidth * 0.54,
      height: ScreenWidth * 0.21
    }
    this.cloudRect6 = {
      top: 0,
      left: this.CloudX6,
      width: ScreenWidth * 0.69,
      height: ScreenWidth * 0.18
    }
    this.cloudRect7 = {
      top: ScreenHeight * 0.15,
      left: this.CloudX7,
      width: ScreenWidth * 0.25,
      height: ScreenWidth * 0.1
    }
    this.cloudRect8 = {
      top: ScreenHeight * 0.01,
      left: this.CloudX8,
      width: ScreenWidth * 0.64,
      height: ScreenWidth * 0.27
    }
    this.cloudRect9 = {
      top: 0,
      left: this.CloudX9,
      width: ScreenWidth * 0.43,
      height: ScreenWidth * 0.12
    }  
    this.cloudRect10 = {
      top: ScreenHeight * 0.7,
      left: this.CloudX10,
      width: ScreenWidth * 0.44,
      height: ScreenWidth * 0.17
    }  
    this.cloudRect11 = {
      top: ScreenHeight * 0.73,
      left: this.CloudX11,
      width: ScreenWidth * 0.44,
      height: ScreenWidth * 0.17
    }    
    this.cloudRect12 = {
      top: ScreenHeight - ScreenWidth * 0.24,
      left: this.CloudX12,
      width: ScreenWidth * 0.64,
      height: ScreenWidth * 0.24
    } 
    this.cloudRect13 = {
      top: ScreenHeight - ScreenWidth * 0.16 - 80,
      left: this.CloudX13,
      width: ScreenWidth * 0.37,
      height: ScreenWidth * 0.16
    }    
    this.cloudRect14 = {
      top: ScreenHeight * 0.77,
      left: this.CloudX14,
      width: ScreenWidth * 0.44,
      height: ScreenWidth * 0.17
    }  
    this.cloudRect15 = {
      top: 0,
      left: this.CloudX15,
      width: ScreenWidth * 0.54,
      height: ScreenWidth * 0.13
    }  
    this.cloudRect16 = {
      top: ScreenHeight * 0.08,
      left: this.CloudX16,
      width: ScreenWidth * 0.54,
      height: ScreenWidth * 0.23
    }    
    this.cloudRect17 = {
      top: 0,
      left: this.CloudX17,
      width: ScreenWidth * 0.69,
      height: ScreenWidth * 0.18
    } 
    this.cloudRect18 = {
      top: ScreenHeight * 0.2,
      left: this.CloudX18,
      width: ScreenWidth * 0.4,
      height: ScreenWidth * 0.17
    }  
    this.cloudRect19 = {
      top: ScreenHeight - ScreenWidth * 0.19,
      left: this.CloudX19,
      width: ScreenWidth * 1.24,
      height: ScreenWidth * 0.19
    }    
    this.cloudRect20 = {
      top: ScreenHeight - ScreenWidth * 0.13,
      left: this.CloudX20,
      width: ScreenWidth * 0.45,
      height: ScreenWidth * 0.13
    }  
    this.royalRalaceRect = {
      top: ScreenHeight - ScreenWidth * 0.42,
      left: this.RoyalRalaceX,
      width: ScreenWidth,
      height: ScreenWidth * 0.42
    }
    this.templeRect = {
      top: ScreenHeight * 0.7,
      left: this.TempleX,
      width: ScreenWidth * 0.79,
      height: ScreenWidth * 0.53
    }
    this.lotteryRect = {
      top: ScreenHeight - ScreenWidth * 0.77 - 50,
      left: this.LotteryX,
      width: ScreenWidth * 0.36,
      height: ScreenWidth * 0.77
    }
    this.leafRect = {
      top: ScreenHeight - ScreenWidth * 0.115,
      left: this.LeafX,
      width: ScreenWidth * 0.82,
      height: ScreenWidth * 0.115
    }
    this.character1Rect = {
      top: ScreenHeight *0.3,
      left: this.CharacterX1,
      width: ScreenWidth * 0.475,
      height: ScreenWidth * 0.81
    }
    this.character2Rect = {
      top: ScreenHeight * 0.3,
      left: this.CharacterX2,
      width: ScreenWidth * 0.74,
      height: ScreenWidth * 0.85
    }
    this.character3Rect = {
      top: ScreenHeight * 0.3,
      left: this.CharacterX3,
      width: ScreenWidth * 1.7,
      height: ScreenWidth * 0.94
    }
    this.character4Rect = {
      top: ScreenHeight * 0.3,
      left: this.CharacterX4,
      width: ScreenWidth * 1.3,
      height: ScreenWidth * 0.84
    }
    this.text1 = '求签至迟产生於唐朝末年的道观中,後来几乎遍及一切神庙、宫观和寺院。求签活动是什麽时候开始的,具体年月不大容易确定。但最迟应当出现於唐末。'
    this.text1ColumnNumber = 16
    this.text1Rect = {
      top: ScreenHeight * 0.22,
      left: this.TextX1
    }
    this.text2 = '五代时，宰相卢多逊，年幼时，取得一签，回家给他父亲看，签词是：「身出中书堂，须因天水白。登仙五十二，终为蓬海客。」父亲很高兴，认为是吉兆，便将签留下。後来卢真的做了宰相。签中的话竟然一字不差。（参看宋  释文莹《玉壶清话》卷三。）五代时间很短，卢多逊实生於唐末，他幼时废坛上已有古签筒，足见签的出现尚在此前。'
    this.text2ColumnNumber = 12
    this.text2Rect = {
      top: ScreenHeight * 0.22,
      left: this.TextX2
    }
    this.text3 = '产生於道观中的签，後来被普遍采纳，佛教寺院，民间的神庙，也都摆上签，供人抽取。'
    this.text3ColumnNumber = 16
    this.text3Rect = {
      top: ScreenHeight * 0.22,
      left: this.TextX3
    } 
    this.text4 = '签是依於神示的，某某签条上的辞句被认为是该神的教导、启示、预言，因此签皆以神名，称某某（神）灵签。中国民众崇拜多神，所以签的种类也极其繁多。从理论上说，有多少神有专庙或专殿，就有多少签。在有关玄帝的道书中，也存有玄帝灵签 。现今的神庙宫观，不少置有签，其签也皆以该宫观神庙及寺院的神明为称。'
    this.text4ColumnNumber = 17
    this.text4Rect = {
      top: ScreenHeight * 0.22,
      left: this.TextX4
    } 
    this.text5 = '对签的信赖程度与对神灵的虔信程度成正比：明代真武大帝信仰极盛，人们对其灵签的信赖也特别地深。明顾起元《客座赘语》卷七《玄帝灵签》云'
    this.text5ColumnNumber = 17
    this.text5Rect = {
      top: ScreenHeight * 0.22,
      left: this.TextX5
    } 
    this.text6 = '北门桥有玄帝庙，相传圣像乃南唐北城门楼上所供奉的，移像於今庙，庙有签，灵验不可胜纪。人竭诚祈之，往往洞人心腹之隐与祸福之应，如面语者。余生平凡有祈，靡不奇中。乙酉，余一四岁女偶病，祈之，报云：「小口阴人多病厄，定归骸骨到荒丘。」已而果(圽)(mò,义同殁)。庚子余病，三月祈之，报以「宜勿药候时」。四月祈之，「病宜增，骨瘦且如柴」，已而果然。五月祈之，报云「而今渐有佳消息」，是月病果小减。六月祈之，报云「枯木重荣」，此月肌肉果复生，骎骎向平善矣。余尝谓帝之报我，其应如响，迄今不敢忘冥佑也。它友人祈者，尤多奇应。'
    this.text6ColumnNumber = 17
    this.text6Rect = {
      top: ScreenHeight * 0.22,
      left: this.TextX6
    } 
    this.text7 = '这种灵验究竟应当如保解释，且置勿论，这儿只想指出，因神之威信而增加了对签的信赖，而签的灵验又加固了对神的信仰。如此循环，使灵签的信仰在社会上根深蒂固，流传不绝。'
    this.text7ColumnNumber = 17
    this.text7Rect = {
      top: ScreenHeight * 0.22,
      left: this.TextX7
    } 
  }
}
