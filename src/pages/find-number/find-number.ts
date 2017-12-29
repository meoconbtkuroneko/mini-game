import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, AlertController, ModalController } from 'ionic-angular';
import { AnywhereService } from '../../providers/anywhere-service';
import { CONSTANT } from '../../providers/constant';
import { FindNumberLevelComponent } from '../../components/find-number-level/find-number-level';
import * as _ from 'lodash';
/**
 * Generated class for the FindNumberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

const COUNT_WIDTH = 7;
const COUNT_HEIGHT = 15;

const GAME_LEVEL = {
  EASY: 'easy',
  HARD: 'hard',
  CHALLENGE: 'challenge',
  SUPER_EYES: 'super-eyes',
}

@Component({
  selector: 'page-find-number',
  templateUrl: 'find-number.html',
})
export class FindNumberPage {
  allNumbers: Array < FindNumberItem > ;
  countWidth = COUNT_WIDTH;
  countHeight = COUNT_HEIGHT;
  maxValue = 100;
  windowWidth;
  windowHeight;
  count = 0;
  time;
  timeInterval;
  currentId = 'currentId';
  isNightMode;
  gameLevel;
  itemDimention;
  paddingTop = 20;
  paddingLeft = 10;

  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertController: AlertController,
    private anywhereService: AnywhereService,
    public modalController: ModalController,
  ) {
    this.isNightMode = localStorage.getItem(CONSTANT.NIGHT_MODE) === 'true';
    this.gameLevel = GAME_LEVEL.CHALLENGE;
    this.modalController.create(FindNumberLevelComponent).present();
  }

  ionViewDidEnter() {
    console.log("ngAfterViewInit")
    // this.nightMode(this.isNightMode);
    // this.startGame();
  }

  startGame() {
    this.clearTimeInterval();
    this.allNumbers = [];
    this.randomValue();
    this.drawAll();
    this.timeInterval = this.countDown();
  }

  clearTimeInterval() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
      this.timeInterval = undefined;
    }
  }

  randomValue() {
    let random;
    let temp;
    for (let i = 0; i < this.maxValue; i++) {
      if (this.allNumbers[i] === undefined) {
        this.allNumbers[i] = new FindNumberItem(i + 1);
      }
      random = Common.random(this.maxValue);
      temp = this.allNumbers[random];
      if (temp === undefined) {
        temp = new FindNumberItem(random > this.maxValue ? this.maxValue : random + 1);
      }
      this.allNumbers[random] = this.allNumbers[0];
      this.allNumbers[0] = temp;
    }
  }

  drawAll() {
    let dimen = this.content.getContentDimensions();
    this.windowWidth = dimen.contentWidth - 20;
    this.windowHeight = dimen.contentHeight - 40;
    console.log("content", dimen.contentWidth, dimen.contentHeight)
    this.itemDimention = this.getItemDimention();
    let el = document.querySelector('#' + this.currentId);
    el.innerHTML = '';
    let item;
    for (let i = 0; i < this.allNumbers.length; i++) {
      item = this.allNumbers[i];
      el.appendChild(this.createHtml(item, i));
    }
  }

  createHtml(item: FindNumberItem, index) {
    let containerCeil = document.createElement('div');
    containerCeil.classList.add('container-ceil');
    containerCeil.style.boxSizing = 'border-box';
    containerCeil.style.width = item.getPx(this.itemDimention.width);
    containerCeil.style.height = item.getPx(this.itemDimention.height);
    containerCeil.style.textAlign = item.generateCenter();
    containerCeil.style.paddingTop = item.getPx(this.itemDimention.top / 2);
    containerCeil.style.paddingBottom = item.getPx(this.itemDimention.top / 2);
    containerCeil.style.paddingLeft = item.getPx(this.itemDimention.left / 2);
    containerCeil.style.paddingRight = item.getPx(this.itemDimention.left / 2);
    if (!item.left && !item.top) {
      item.left = this.windowWidth / 2 - this.itemDimention.width / 2;
      item.top = this.windowHeight / 2 - this.itemDimention.height / 2;
    }
    containerCeil.style.left = item.getPx(item.left);
    containerCeil.style.top = item.getPx(item.top);
    setTimeout(() => {
      let x = index % this.countWidth;
      item.left = this.paddingLeft + x * (this.itemDimention.width + (2 * this.itemDimention.left));
      let y = Math.floor(index / this.countWidth);
      item.top = this.paddingTop + (this.itemDimention.height + 2 * (this.itemDimention.top)) * y +
        item.generateVerticalAlign(this.itemDimention.top * 2);
      if (index === this.maxValue - 2) {
        item.left = Common.random(this.windowWidth / 2 - this.itemDimention.width);
      }
      if (index === this.maxValue - 1) {
        item.left = this.windowWidth / 2 + Common.random(this.windowWidth / 2 - this.itemDimention.width);
      }
      containerCeil.style.left = item.getPx(item.left);
      containerCeil.style.top = item.getPx(item.top);
    }, 10);

    let text = document.createElement('span');
    text.classList.add('text');
    text.setAttribute('id', 'text-' + item.number);
    if (item.number > 9) {
      text.innerHTML = item.number + '';
    } else {
      text.innerHTML = item.number + '&nbsp';
    }

    if (!item.color) {
      text.style.color = item.generateColor();
    } else {
      text.style.color = item.color;
    }

    if (this.gameLevel !== GAME_LEVEL.EASY) {
      let random = Common.random(360);
      text.style.transform = 'rotate(' + random + 'deg)';
    }

    if (this.gameLevel === GAME_LEVEL.CHALLENGE) {
      let fontClass = ['small', 'normal', 'large'];
      let random = Common.random(fontClass.length);
      text.classList.add(fontClass[random]);
    }

    const cover = document.createElement('span');
    cover.classList.add('cover');
    cover.setAttribute('id', 'cover-' + item.number);
    if (item.selected) {
      cover.classList.add('activate');
    }

    text.appendChild(cover);
    text.addEventListener('click', (event) => {
      this.onClick(event, item);
    });

    containerCeil.appendChild(text);
    return containerCeil;
  }


  getItemDimention() {
    let itemWidth = Math.round(this.windowWidth / COUNT_WIDTH);
    let itemHeight = Math.round(this.windowHeight / COUNT_HEIGHT);
    let left = Math.round(10 * itemWidth / 100);
    let top = Math.round(10 * itemHeight / 100);
    let width = itemWidth - 2 * left;
    let height = itemHeight - 2 * top;
    console.log("initItemWidth", itemWidth, itemHeight, left, top, width, height)
    return {
      width: width,
      height: height,
      left: left,
      top: top
    }
  }

  onClick = (event, item: FindNumberItem) => {
    if (item.selected || item.number !== (this.count + 1)) {
      return;
    }
    this.count++;
    item.setSelected();
    let cover = event.srcElement.querySelector('.cover');
    cover.classList.add('activate');
    if (this.gameLevel === GAME_LEVEL.SUPER_EYES) {
      setTimeout(() => {
        this.randomValue();
        this.drawAll();
      }, 250)
    }
    if (this.count === this.maxValue) {
      this.winGame();
    }
  }

  winGame() {
    this.clearTimeInterval();
    this.alertController.create({
      title: CONSTANT.MESSAGE.STR_WIN,
      message: 'Congratulation! You win the game in ' + this.time,
      buttons: [{
        role: 'cancel',
        text: CONSTANT.MESSAGE.STR_OK
      }]
    }).present()
  }

  countDown() {
    let totalSecond = 0;
    let hh = 0;
    let mm = 0;
    let ss = 0;
    return setInterval(() => {
      ++totalSecond;
      if (totalSecond === 60) {
        totalSecond = 0;
        ss = 0;
        mm++;
        if (mm === 60) {
          totalSecond = 0;
          mm = 0;
          hh++;
        }
      } else {
        ss++;
      }

      let hhStr = hh.toString();
      if (hhStr.length < 2) {
        hhStr = '0' + hh;
      }
      let mmStr = mm.toString();
      if (mmStr.length < 2) {
        mmStr = '0' + mm;
      }

      let ssStr = ss.toString();
      if (ssStr.length < 2) {
        ssStr = '0' + ss;
      }

      this.time = hhStr + ':' + mmStr + ':' + ssStr;
    }, 1000)
  }

  nightMode(isOn: boolean) {
    let className = 'night-mode';
    let classList = this.content.getElementRef().nativeElement.classList;
    if (isOn) {
      if (!classList.contains(className)) {
        classList.add(className);
      }
    } else {
      classList.remove(className);
    }
  }

  replay() {
    this.anywhereService.showConfirm(
      CONSTANT.MESSAGE.STR_REPLAY_TITLE,
      CONSTANT.MESSAGE.STR_REPLAY_MESSAGE,
      CONSTANT.MESSAGE.STR_YES,
      CONSTANT.MESSAGE.STR_NO,
      () => {
        this.startGame();
      })
  }

  settings() {
    this.alertController.create({
      title: CONSTANT.MESSAGE.STR_SETTING_TITLE,
      inputs: [{
        checked: this.isNightMode,
        type: 'checkbox',
        label: CONSTANT.MESSAGE.NIGHT_MODE,
        value: '1',
      }],
      buttons: [{
        text: CONSTANT.MESSAGE.STR_OK,
        handler: (data) => {
          console.log("datadatadata", data);
          this.isNightMode = parseInt(data[0], 10) ? true : false;
          localStorage.setItem(CONSTANT.NIGHT_MODE, this.isNightMode);
          this.nightMode(this.isNightMode);
        }
      }]
    }).present()
  }

  find() {
    let index = _.findIndex(this.allNumbers, {
      number: this.count + 1
    })
    console.log("index", index);
    if (index < 0) {
      return;
    }
    let item = this.allNumbers[index];
    let el = document.getElementById('text-' + item.number);
    if (!el) {
      return;
    }
    el.classList.add('highlight');
    setTimeout(() => {
      el.classList.remove('highlight');
    }, 400);
  }
}

export class FindNumberItem {
  number: number;
  selected: boolean;
  color: string;
  left: number;
  top: number;

  constructor(number, options ? ) {
    this.number = number;
  }

  getPx(number: number) {
    return number + 'px';
  }

  generateCenter() {
    let alignArr = ['left', 'center', 'right'];
    let random = Math.floor(Math.random() * alignArr.length);
    return alignArr[random];
  }

  generateVerticalAlign(max: number) {
    let alignArr = [];
    let length = max;
    alignArr.push(length);
    for (let i = -length; i < length; i += 3) {
      alignArr.push(i);
    }
    let random = Math.floor(Math.random() * alignArr.length);
    return alignArr[random];
  }

  generateColor() {
    let colorArr = [
      '#ff0000', '#ff4000', '#ff8000', '#ffbf00', '#ffff00', '#bfff00', '#00ff00', '#00ffbf', '#00ffff', '#00bfff',
      '#0080ff', '#0000ff', '#8000ff', '#bf00ff', '#ff00ff', '#ff00bf', '#ff0080', '#ff0040', ' #009900', '#804000'
    ]
    this.color = colorArr[Common.random(colorArr.length)];
    // let maxColor = 255;
    // this.color = 'rgb(' +
    //   Common.random(maxColor) + ',' +
    //   Common.random(maxColor) + ',' +
    //   Common.random(maxColor) + ')';
    return this.color;
  }

  setSelected() {
    this.selected = true;
  }
}

export const Common = {
  random(max) {
    return Math.floor(Math.random() * max);
  }
}
