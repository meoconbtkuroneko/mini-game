import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the AnywhereService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AnywhereService {
  constructor(
    public alertController: AlertController
  ) {}

  // thay doi vi tri cac phan tu trong mang
  shuffleArray(array) {
    var j, x, i;
    for (i = array.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = array[i - 1];
      array[i - 1] = array[j];
      array[j] = x;
    }
    return array;
  }

  // chuyen doi phut thanh gio de hien thi
  convertToTime(seconds) {
    let m: any = Math.floor(seconds / 60);
    let s: any = seconds % 60;
    m = m.toString().length < 2 ? '0' + m : m;
    s = s.toString().length < 2 ? '0' + s : s;
    return m + ':' + s;
  }

  showConfirm(
    title: string, question: string,
    yesString: string, noString ? : string,
    handleYes ? , handleNo ?
  ) {
    let confirm = this.alertController.create({
      title: title,
      message: question + '?',
      buttons: [{
        text: yesString,
        handler: () => {
          if (handleYes) {
            handleYes();
          }
        }
      }, {
        role: 'cancel',
        text: noString || "Hủy",
        handler: () => {
          if (handleNo) {
            handleNo();
          }
        }
      }]
    });
    confirm.present();
    return confirm;
  }
}
