import { Component, ElementRef, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

/**
 * Generated class for the FindNumberLevelComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */

const GAME_MODE = {
  SINGLE_MODE: 'single-mode',
  TIME_MODE: 'time-mode',
  TWO_PLAYER: 'two-player',
  ODD_EVEN: 'odd-even',
}
@Component({
  selector: 'find-number-level',
  templateUrl: 'find-number-level.html'
})
export class FindNumberLevelComponent {
  @ViewChild(Content) content: Content;
  gameMode = GAME_MODE;
  constructor() {}

  ionViewDidEnter() {
    let arrEl = this.content.getElementRef().nativeElement.querySelectorAll('.mode');
    console.log("arrEl", arrEl);
    let max = 0;
    for (let item of arrEl) {
      max = Math.max(item.offsetHeight, max);
    }
    for (let item of arrEl) {
      item.style.height = max + 'px';
    }
  }

  selectGameMode(item) {
    console.log("kkkkkkkk", item)
  }
}
