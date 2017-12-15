import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CoreService } from '../../providers/core-service';
import { CONSTANT } from '../../providers/constant';

import * as _ from 'lodash';

@Component({
  selector: 'page-like2048',
  templateUrl: 'like2048.html',
})
export class Like2048 {
  constructor(
    public navCtrl: NavController,
    public coreService: CoreService,
  ) {}

  row1: Array < Item2048 > ;
  row2: Array < Item2048 > ;
  row3: Array < Item2048 > ;
  row4: Array < Item2048 > ;

  numbersRows: any = {};
  previousNumbersRows: any;
  zeroNumbersArr: Array < ZeroNumberItem > ;
  randomItem: ZeroNumberItem;

  fail: boolean;
  oldVal: number;
  newVal: number;

  direction: string;


  ngOnInit() {
    this.initGame();
  }

  // this.initTest();
  initGame() {
    this.initVals();
    this.listZeroNumbers();
    this.generateNumber();
    this.generateNumber();
  }
  initTest() {
    this.numbersRows['row' + 1] = [];
    this.numbersRows['row' + 1].push(new Item2048(32));
    this.numbersRows['row' + 1].push(new Item2048(2));
    this.numbersRows['row' + 1].push(new Item2048(8));
    this.numbersRows['row' + 1].push(new Item2048(0));

    this.numbersRows['row' + 2] = [];
    this.numbersRows['row' + 2].push(new Item2048(128));
    this.numbersRows['row' + 2].push(new Item2048(32));
    this.numbersRows['row' + 2].push(new Item2048(0));
    this.numbersRows['row' + 2].push(new Item2048(2));

    this.numbersRows['row' + 3] = [];
    this.numbersRows['row' + 3].push(new Item2048(1024));
    this.numbersRows['row' + 3].push(new Item2048(512));
    this.numbersRows['row' + 3].push(new Item2048(0));
    this.numbersRows['row' + 3].push(new Item2048(0));

    this.numbersRows['row' + 4] = [];
    this.numbersRows['row' + 4].push(new Item2048(32));
    this.numbersRows['row' + 4].push(new Item2048(4));
    this.numbersRows['row' + 4].push(new Item2048(8));
    this.numbersRows['row' + 4].push(new Item2048(0));

    this.listZeroNumbers();
    this.previousNumbersRows = undefined;
    this.randomItem = undefined;
  }

  initVals() {
    for (let i = 1; i < 5; i++) {
      this.numbersRows['row' + i] = [];
      for (let j = 0; j < 4; j++) {
        this.numbersRows['row' + i].push(new Item2048(0));
      }
    }
    this.zeroNumbersArr = [];
    this.previousNumbersRows = undefined;
    this.randomItem = undefined;
  }

  listZeroNumbers() {
    this.zeroNumbersArr = [];
    for (let i in this.numbersRows) {
      for (let j = 0; j < this.numbersRows[i].length; j++) {
        if (this.numbersRows[i][j].val == 0) {
          this.addZeroNumber(new ZeroNumberItem(i, j))
        }
      }
    }
  }

  addZeroNumber(zeroItem: ZeroNumberItem) {
    this.zeroNumbersArr = _.unionWith(this.zeroNumbersArr, [zeroItem], _.isEqual);
  }

  removeZeroNumber(zeroItem: ZeroNumberItem) {
    _.remove(this.zeroNumbersArr, (o: ZeroNumberItem) => {
      return (o.rowName === zeroItem.rowName) && (o.index === zeroItem.index);
    })
  }


  generateNumber() {
    this.increaseProbabilityEdge();
    this.randomItem = this.randomCeil();
    if (!this.randomItem) {
      return;
    }
    let generateVal = this.randomValForCeil();
    this.numbersRows[this.randomItem.rowName][this.randomItem.index] =
      _.cloneDeep(generateVal);
    this.toggleFail(this.checkFail());
  }

  // Tang xac suat cho cac o o ngoai ria
  increaseProbabilityEdge() {
    let tempZeroNumbersArr = _.cloneDeep(this.zeroNumbersArr);
    tempZeroNumbersArr = _.pullAllWith(tempZeroNumbersArr, [
        new ZeroNumberItem('row2', 1),
        new ZeroNumberItem('row2', 2),
        new ZeroNumberItem('row3', 1),
        new ZeroNumberItem('row3', 2)
      ],
      _.isEqual
    );
    this.zeroNumbersArr = this.zeroNumbersArr.concat(tempZeroNumbersArr).concat(tempZeroNumbersArr);
  }

  randomCeil() {
    let zeroLength = this.zeroNumbersArr.length;
    let randomIndex = Math.round(Math.random() * (zeroLength - 1));
    let zeroItemReplace = this.zeroNumbersArr[randomIndex];
    return zeroItemReplace;
  }

  randomValForCeil() {
    let randomVal = Math.random() < 0.9 ? 2 : 4;
    let generateVal = new Item2048(randomVal);
    return generateVal;
  }

  toggleFail(fail: boolean) {
    this.fail = fail;
  }

  checkFail() {
    this.listZeroNumbers();
    if (this.zeroNumbersArr.length === 0) {
      for (let i = 1; i <= Object.keys(this.numbersRows).length; i++) {
        let row = this.numbersRows['row' + i];
        let nextRow = this.numbersRows['row' + (i + 1)];
        for (let j = 0; j < row.length; j++) {
          if (nextRow && (row[j].val === nextRow[j].val)) {
            return false;
          }

          if (row[j + 1] && (row[j].val === row[j + 1].val)) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }

  swipeEvent(direction) {
    this.direction = CONSTANT.DIRECTION_CODE[direction];
    this.mergeNumber(this.direction);
  }


  mergeNumber(direction) {
    if (this.fail) {
      return;
    }
    let tempArr;
    let tempNumbersRows: any = {};
    if (direction === 'up' || direction === 'down') {
      tempNumbersRows = this.convertToHorizontal(this.numbersRows);
    } else {
      tempNumbersRows = _.cloneDeep(this.numbersRows);
    }

    let rs = this.mergeAllRows(tempNumbersRows, direction);

    if (direction === 'up' || direction === 'down') {
      rs = this.convertToHorizontal(rs);
    }

    this.previousNumbersRows = _.cloneDeep(this.numbersRows);
    this.numbersRows = _.cloneDeep(rs);
    this.listZeroNumbers();
    this.generateNumber();
    console.log("this.numbersRows", this.numbersRows);
  }

  convertToHorizontal(numbersRows) {
    let currentNumbersRows = _.cloneDeep(numbersRows);
    let tempNumbersRows: any = {};
    for (let i = 0; i < 4; i++) {
      tempNumbersRows['row' + (i + 1)] = [];
      for (let j = 0; j < 4; j++) {
        tempNumbersRows['row' + (i + 1)]
          .push(currentNumbersRows['row' + (j + 1)][i]);
      }
    }
    return tempNumbersRows;
  }

  checkHasChange() {
    if (!this.previousNumbersRows) return true;

  }

  mergeAllRows(numbersRows, direction: string) {
    let currentNumberRows = _.cloneDeep(numbersRows);
    let currentRowName;
    let currentRow: Array < Item2048 > ;
    for (let rowName: number = 1; rowName < 5; rowName++) {
      currentRowName = 'row' + rowName;
      currentRow = currentNumberRows[currentRowName];
      if (direction === 'right' || direction === 'down') {
        currentRow.reverse();
      }

      currentRow = this.mergeRow(currentRow, currentRowName);

      if (direction === 'right' || direction === 'down') {
        currentRow.reverse();
      }
    }
    return currentNumberRows;
  }

  // mergeRow(row: Array < Item2048 > , rowName: string) {
  //   let count = row.length;
  //   let i: number;
  //   let k: number;
  //   let countZero: number = 0;
  //   for (let i = 0; i < count; i++) {
  //     k = i + 1;
  //     if (this.checkHasVal(row[i].val)) {
  //       while (k < count) {
  //         if (this.checkHasVal(row[k].val)) {
  //           break;
  //         }
  //         k++;
  //       }
  //     } else {
  //       this.removeZeroVal(row, i);
  //       continue;
  //     }

  //     console.log("kkkkkkkkkkkkkkkkkk", rowName, k);
  //     if (k < count) {
  //       if (row[i].val === row[k].val) {
  //         row[i].val *= 2;
  //         row[i].setAdd();
  //         row[k].setRemove();
  //         row[k].val = 0;
  //       }
  //     }
  //   }

  //   // while (i < count) {
  //   //   row[i].resetAll();
  //   //   if (!this.checkHasVal(row[i].val)) {

  //   //     continue;
  //   //   }

  //   //   if ((i + 1) < count && !this.checkHasVal(row[i + 1].val)) {
  //   //     this.removeZeroVal(row, i + 1);
  //   //     --count;
  //   //     continue;
  //   //   }

  //   //   if ((i + 1) === count) {
  //   //     break;
  //   //   }

  //   //   if (row[i].val === row[i + 1].val) {
  //   //     row[i].val *= 2;
  //   //     row[i].setAdd();
  //   //     row[i + 1].setRemove();
  //   //     row[i + 1].val = 0;
  //   //   };

  //   //   i++;
  //   // }
  //   console.log("rowrow", row);
  //   return row;
  // }

  mergeRow(row: Array < Item2048 > , rowName: string) {
    let count = row.length;
    let i = 0;

    while (i < count) {
      row[i].resetAll();
      if (!this.checkHasVal(row[i].val)) {
        this.removeZeroVal(row, i);
        --count;
        continue;
      }

      if ((i + 1) < count && !this.checkHasVal(row[i + 1].val)) {
        this.removeZeroVal(row, i + 1);
        --count;
        continue;
      }

      if ((i + 1) === count) {
        break;
      }

      if (row[i].val === row[i + 1].val) {
        row[i].val *= 2;
        row[i].setAdd();
        row[i + 1].setRemove();
        row[i + 1].val = 0;
        console.log("row[i + 1]", rowName, i + 1, row[i + 1]);
      };

      i++;
    }
    console.log("rowrow", row);
    return row;
  }

  checkHasVal(val) {
    return val ? true : false;
  }

  removeZeroVal(arr, index) {
    arr.splice(index, 1);
    arr.push(new Item2048(0));
    return arr;
  }

  rollback() {
    this.numbersRows = _.cloneDeep(this.previousNumbersRows);
    this.previousNumbersRows = undefined;
  }

  replay() {
    if (this.fail) {
      this.toggleFail(false);
      this.initGame();
      return;
    }
    this.coreService.anywhereService.showConfirm(
      "2048",
      'Bạn có muốn chơi lại từ đầu',
      'Chơi',
      'Hủy',
      () => {
        this.toggleFail(false);
        this.initGame();
      })
  }
}

export class Item2048 {
  add: boolean;
  remove: boolean;
  constructor(public val: number) {
    this.val = val;
  }

  setAdd() {
    this.add = true;
  }

  setRemove() {
    this.remove = true;
  }

  resetAll() {
    this.add = false;
    // this.remove = false;
  }
}

export class ZeroNumberItem {
  constructor(
    public rowName: string,
    public index: number
  ) {
    this.rowName = rowName;
    this.index = index;
  }
}
