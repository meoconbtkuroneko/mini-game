import {
  Component,
  Input,
} from '@angular/core';

import { CoreService } from '../../providers/core-service';
import {
  CONSTANT,
  ItemFindCard,
  MyTheme,
} from '../../providers/constant';

@Component({
  selector: 'grid-card',
  templateUrl: 'grid-card.html'
})
export class GridCard extends MyTheme {
  constructor(
    public coreService: CoreService
  ) {
    super(coreService);
  }

  @Input() cardsArr;
  @Input() reset: boolean;

  count: number = 0;
  pathImage: string = CONSTANT.PATH_IMAGE;

  ngOnChanges(changes) {
    if (changes.reset && this.reset) {
      this.resetCount();
    }
  }

  // Nhan vao hinh
  clickedItem(item: ItemFindCard, index: number) {
    if (item.count || item.check) {
      return;
    }
    this.cardsArr[index].clearSetOffClick();
    this.count++;
    if (this.count > 1 && this.count % 2 !== 0) {
      this.hideAllWithoutIndex(index);
    }
    this.cardsArr[index].setClick(true);
    this.cardsArr[index].setCount(this.count);
    if (this.count % 2 !== 0) {
      return;
    }
    let rs = this.checkItem();
    if (rs.same) {
      this.cardsArr[rs.firstIndex] = rs.firstItem;
      this.cardsArr[rs.secondIndex] = rs.secondItem;
      this.cardsArr[rs.firstIndex].setCheck(true);
      this.cardsArr[rs.secondIndex].setCheck(true);
      this.cardsArr[rs.firstIndex].setClick(false);
      this.cardsArr[rs.secondIndex].setClick(false);
    } else {
      // Khong trung nhau
      this.resetItem(rs.firstIndex);
      this.resetItem(rs.secondIndex);
      this.rolbackCount();
    }
    this.checkWin();
  }

  // Dong tat ca cac hinh ngoai tru hinh o vi tri index
  hideAllWithoutIndex(index) {
    for (let i in this.cardsArr) {
      if (i === index) {
        continue;
      }
      this.cardsArr[i].clearSetOffClick();
      this.cardsArr[i].setClick(false);
    }
  }

  // Kiem tra xem 2 hinh anh co trung nhau hay khong
  checkItem() {
    let tempItem: ItemFindCard;
    let rs: any = {
      firstItem: ItemFindCard,
      secondItem: ItemFindCard,
    };
    for (let i in this.cardsArr) {
      tempItem = this.cardsArr[i];
      if (tempItem.check) {
        continue;
      }

      if (tempItem.count === (this.count - 1)) {
        rs.firstItem = tempItem;
        rs.firstIndex = i;
        continue;
      }

      if (tempItem.count === this.count) {
        rs.secondItem = tempItem;
        rs.secondIndex = i;
        continue;
      }
    }
    rs.same = rs.firstItem.name === rs.secondItem.name;
    return rs;
  }

  // Dat lai cac gia tri cho phan tu trong mang
  resetItem(index) {
    this.cardsArr[index].setOffClick();
    this.cardsArr[index].setCount(undefined);
  }

  // Dieu chinh bo dem
  rolbackCount() {
    this.count = this.count - 2;
  }

  // Kiem tra xem da hoan thanh hay chua
  checkWin() {
    if (this.count !== this.cardsArr.length) {
      return;
    }
    this.coreService.events.publish(CONSTANT.EVENT_NAME.WIN);
  }

  resetCount() {
    this.count = 0;
  }
}
