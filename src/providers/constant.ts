export const CONSTANT = {
  THEME_COLOR_ARR: [{
      id: 'blossom',
      colors: ['#daa4a2', '#d95473', '#cf415b', '#a82d41']
    }, {
      id: 'rose',
      colors: ['#af1811', '#a01117', '#324b36', '#153412']
    },
    {
      id: 'orchid',
      colors: ['#c25c83', '#8a163b', '#560010', '#6e707f']
    },
    {
      id: 'forget',
      colors: ['#43b3ff', '#f3ca10', '#5e6c48', '#423a6b']
    },
    {
      id: 'lotus',
      colors: ['#c51f75', '#96104b', '#6b512c', '#34605f']
    }, {
      id: 'sunflower',
      colors: ['#fbb40c', '#481303', '#2c1002', '#43410e']
    }
  ],
  PATH_IMAGE: '/assets/images/',
  EVENT_NAME: {
    WIN: 'win',
    FAIL: 'fail',
    RESET: 'reset',
    STOP_TIMER: 'stopTimer',
    CHANGE_THEME_COLOR: 'changeThemeColor',
  },
  DIRECTION_CODE: {
    1: 'none',
    2: 'left',
    4: 'right',
    8: 'up',
    16: 'down',
    6: 'horizontal',
    24: 'vertical',
    30: 'all',
  }
};


export class Item {
  constructor(
    public name: string,
    public check ? : boolean,
    public first ? : boolean,
    public second ? : boolean,
    public click ? : boolean,
    public count ? : number,
  ) {
    this.name = name;
    this.check = check;
    this.first = first;
    this.second = second;
    this.click = click;
    this.count = count;
  }

  cancelOffClick;

  setName(name) {
    return this.name = name;
  }
  setCheck(check) {
    return this.check = check;
  }
  setFirst(first) {
    return this.first = first;
  }
  setSecond(second) {
    return this.second = second;
  }
  setClick(click) {
    return this.click = click;
  }
  setCount(count) {
    return this.count = count;
  }
  setOffClick() {
    this.cancelOffClick = setTimeout(() => {
      this.setClick(false);
    }, 600);
  }

  clearSetOffClick() {
    clearTimeout(this.cancelOffClick);
  }

  getName() {
    return this.name;
  }
  getCheck() {
    return this.check;
  }
  getFirst() {
    return this.first;
  }
  getSecond() {
    return this.second;
  }
  getClick() {
    return this.click;
  }
  getCount() {
    return this.count;
  }
}

export class ThemeItem {

  constructor(
    public id: number,
    public colors: Array < any > ,
  ) {
    this.id = id;
    this.colors = [];
    for (let i in colors) {
      this.colors.push(_.cloneDeep(colors[i]));
    }
  }
}


import { CoreService } from './core-service';
import * as _ from 'lodash';

export class MyTheme {

  constructor(
    public coreService: CoreService,
  ) {
    this.toggleSubscribeChangeThemeColor(true);
  }

  themeItem: ThemeItem;
  currentColor: string;
  pathImage: string;

  ngOnInit() {
    console.log("ngOnInit");
    this.themeItem = this.coreService.themeService.themeItem;
    this.currentColor = this.coreService.themeService.currentColor;
    this.pathImage = CONSTANT.PATH_IMAGE;
  }

  toggleSubscribeChangeThemeColor(isSubscibe: boolean) {
    if (isSubscibe) {
      this.coreService.events.subscribe(
        CONSTANT.EVENT_NAME.CHANGE_THEME_COLOR,
        this._handleSubscribeChangeThemeColor
      );
    } else {
      this.coreService.events.unsubscribe(
        CONSTANT.EVENT_NAME.CHANGE_THEME_COLOR,
        this._handleSubscribeChangeThemeColor
      );
    }
  }

  _handleSubscribeChangeThemeColor = (data) => {
    this.currentColor = this.coreService.themeService.currentColor;
  }

  ngOnDestroy() {
    this.toggleSubscribeChangeThemeColor(false);
  }
}
