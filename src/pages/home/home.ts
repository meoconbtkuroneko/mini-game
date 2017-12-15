import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as _ from 'lodash';

import {
  CONSTANT,
  Item,
  MyTheme,
} from '../../providers/constant';

import { CoreService } from '../../providers/core-service';
import { Like2048 } from '../../pages/like2048/like2048';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends MyTheme {

  currentCardArr: any = [];
  imagePath = CONSTANT.PATH_IMAGE;

  arrFlower = [
    new Item('blossom'),
    new Item('rose'),
    new Item('orchid'),
    new Item('forget'),
    new Item('lotus'),
    new Item('sunflower'),
  ];

  initMinutes: number = 5;
  totalSeconds: number = 60;
  win: boolean;
  fail: boolean;
  star: number;

  reset: boolean;
  stop: boolean;

  constructor(
    public navCtrl: NavController,
    public coreService: CoreService,
  ) {
    super(coreService);
    this.init();
    this.toggleSubscribeWin(true);
  }

  init() {
    let tempArr: Item;
    this.currentCardArr = [];
    for (let i in this.arrFlower) {
      tempArr = _.cloneDeep(this.arrFlower[i]);
      this.currentCardArr.push(tempArr);
      tempArr = _.cloneDeep(this.arrFlower[i]);
      this.currentCardArr.push(tempArr);
    }
    this.currentCardArr = this.coreService.anywhereService.shuffleArray(this.currentCardArr);
    console.log("this.currentCardArr", this.currentCardArr);
    this.resetProgress();
  }

  resetProgress() {
    this.toggleReset(true);
    setTimeout(() => {
      this.toggleReset(false);
    }, 200);
  }

  toggleReset(reset: boolean) {
    this.reset = reset;
  }

  toggleSubscribeWin(isSubscribe: boolean) {
    if (isSubscribe) {
      this.coreService.events.subscribe(
        CONSTANT.EVENT_NAME.WIN,
        this._handleSubscribeWin
      );
    } else {
      this.coreService.events.unsubscribe(
        CONSTANT.EVENT_NAME.WIN,
        this._handleSubscribeWin
      );
    }
  }

  private _handleSubscribeWin = (data) => {
    this.toggleStop(true);
    setTimeout(() => {
      this.toggleStop(false);
    }, 200);
    this.toggleWin(true);
  }

  // Tinh diem cho nguoi choi
  rate() {
    let initSecond = this.initMinutes * 60;
    let percent = Math.round(this.totalSeconds / initSecond * 100);
    if (percent > 66) {
      return this.star = 3;
    };

    if (percent > 33) {
      return this.star = 2;
    }

    return this.star = 1;
  }

  toggleStop(stop: boolean) {
    this.stop = stop;
  }

  toggleWin(win: boolean) {
    this.win = win;
  }

  // Choi lai
  replay() {
    this.resetAll()
    this.init();
  }

  resetAll() {
    this.toggleWin(false);
    this.toggleFail(false);
  }

  toggleFail(fail: boolean) {
    this.fail = fail;
  }


  homePage() {
    this.navCtrl.push(Like2048);

  }

  finishCountDown(leftSeconds) {
    console.log("finishCountDown", leftSeconds);
    this.totalSeconds = leftSeconds;
    if (this.totalSeconds < 1) {
      return this.toggleFail(true);
    }
    this.rate();
  }

  ngOnDestroy() {
    this.toggleSubscribeWin(false);
  }
}
