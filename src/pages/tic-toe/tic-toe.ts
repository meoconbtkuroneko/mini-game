import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TicToe page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tic-toe',
  templateUrl: 'tic-toe.html',
})
export class TicToe {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.initGame();
  }

  arrVal: Array < Array < ItemTicToe > > ;
  size: number = 15;
  first: boolean = true;
  maxToWin: number = 5;
  win: boolean;

  initGame() {
    this.arrVal = [];
    for (let i = 0; i < this.size; i++) {
      this.arrVal[i] = new Array < ItemTicToe > (this.size);
      for (let j = 0; j < this.size; j++) {
        this.arrVal[i][j] = new ItemTicToe(false);
      }
    }
  }

  clickItem(i, j) {
    if (this.arrVal[i][j].click || this.win) {
      return;
    }
    this.arrVal[i][j].setClick(true);
    this.arrVal[i][j].setTurn(this.first);
    this.first = !this.first;
    console.log("clickItem 222", i, j, this.arrVal[i][j]);
    this.toggleWin(this.checkWin());
    console.log("winwinwinwinwinwin", this.win);
  }

  checkWin() {
    let row: Array < ItemTicToe > ;

    // Hang ngang
    for (let i = 0; i < this.size; i++) {
      row = this.arrVal[i];
      if (this.checkWinRow(row)) {
        return true;
      }
    }

    // Hang doc
    for (let i = 0; i < this.size; i++) {
      row = [];
      for (let j = 0; j < this.size; j++) {
        row.push(this.arrVal[j][i])
      }
      if (this.checkWinRow(row)) {
        return true;
      }
    }

    // hang cheo
    // Top Right
    if (this.checkTopRight(this.arrVal)) {
      return true;
    }

    // Bottom Left
    let arrFromBottomLeft = this.reverseFromBottomLeft(this.arrVal);
    if (this.checkTopRight(arrFromBottomLeft)) {
      return true;
    }

    // Top Left
    let arrFromRight = this.reverseFromRight();
    if (this.checkTopRight(arrFromRight)) {
      return true;
    }

    // Bottom Right
    arrFromBottomLeft = this.reverseFromBottomLeft(arrFromRight);
    if (this.checkTopRight(arrFromBottomLeft)) {
      return true;
    }
  }

  // Kiem tra cac hang cheo Top Right
  checkTopRight(arr) {
    let row: Array < ItemTicToe > ;
    for (let i = 0; i < this.size; i++) {
      row = [];
      for (let j = 0; j < this.size; j++) {
        if ((j + i) < this.size) {
          row.push(arr[j][j + i]);
        }
      }
      if (this.checkWinRow(row)) {
        return true;
      }
      // console.log("row", row);
    }
  }

  reverseFromBottomLeft(arr) {
    let rs: Array < Array < ItemTicToe >> = [];
    for (let i = 0; i < this.size; i++) {
      rs[i] = [];
      for (let j = 0; j < this.size; j++) {
        rs[i][j] = arr[j][i];
      }
    }
    return rs;
  }

  reverseFromRight() {
    let rs: Array < Array < ItemTicToe >> = [];
    for (let i = 0; i < this.size; i++) {
      rs[i] = [];
      for (let j = 0; j < this.size; j++) {
        rs[i][j] = this.arrVal[i][this.size - 1 - j];
      }
    }
    return rs;
  }

  checkWinRow(row: Array < ItemTicToe > ) {
    let count: number = this.resetCount();
    let length = row.length;
    if (length < this.maxToWin) {
      return;
    }

    for (let i = 0; i < length - 1; i++) {
      if (!row[i].click) {
        continue;
      };

      if (row[i].turn === row[i + 1].turn) {
        count++;
        row[i].setWin(true);
        row[i + 1].setWin(true);
      } else {
        count = this.resetCount();
        for (let i in row) {
          row[i].reset();
        }
      }

      if (count >= this.maxToWin) {
        return true;
      }
    }
  }

  resetCount() {
    return 1;
  }

  resetGame() {
    this.toggleWin(false);
  }

  toggleWin(win: boolean) {
    this.win = win;
  }

  replay() {
    this.resetGame();
    this.initGame();
  }
}

class ItemTicToe {
  turn: string;
  win: boolean;
  constructor(public click: boolean) {
    this.click = click;
  }

  setClick(click: boolean) {
    this.click = click;
  }

  setWin(win: boolean) {
    this.win = win;
  }

  setTurn(isFirst: boolean) {
    if (isFirst) {
      this.turn = 'x';
    } else {
      this.turn = 'o';
    }
  }

  reset() {
    this.setWin(false);
  }
}

class CaroWinArr {
  arr5 = [1, 1, 1, 1, 1];
  arr4 = [
    [0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0]
  ];
  arr3 = [
    [1, 1, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0],
    [1, 1, 0, 0, 1],
    [1, 1, ]
  ]
}
