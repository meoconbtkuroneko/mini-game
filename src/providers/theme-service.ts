import { Injectable } from '@angular/core';

import {
  CONSTANT,
  ThemeItem
} from './constant';


import { Platform, Events } from 'ionic-angular';

import * as _ from 'lodash';

@Injectable()
export class ThemeService {
  themeColorsArr;
  indexThemeItem: number;
  themeItem: ThemeItem;
  currentColor: string;
  constructor(
    public platform: Platform,
    public events: Events,
  ) {}

  initTheme() {
    this.themeColorsArr = CONSTANT.THEME_COLOR_ARR;
    this.indexThemeItem = Math.floor(Math.random() * this.themeColorsArr.length);
    this.themeItem = this.themeColorsArr[this.indexThemeItem];
    this.currentColor = this.themeItem.colors[0];
  }

  setThemeByName(name: string) {
    let tempThemeItem = _.find(this.themeColorsArr, {
      id: name
    });
    tempThemeItem && (
      this.themeItem = _.cloneDeep(tempThemeItem));
  }

  setCurrentColor(color: string) {
    let exist = this.themeItem.colors.indexOf(color) > -1;
    exist && (this.currentColor = color);
    this.broadcastChangeThemeColor();
  }

  broadcastChangeThemeColor() {
    this.events.publish(CONSTANT.EVENT_NAME.CHANGE_THEME_COLOR);
  }
}
