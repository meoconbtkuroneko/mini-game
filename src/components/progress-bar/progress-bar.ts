import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

/**
 * Generated class for the ProgressBar component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBar {

  @Input() minutes: number;
  @Input() reset: boolean;
  @Input() stop: boolean;

  @Output() finish = new EventEmitter();

  timer;
  totalSeconds: number;
  percent: number;

  constructor() {}

  ngOnChanges(changes) {
    if (changes.minutes || (changes.reset && this.reset)) {
      this.initVals();
      setTimeout(() => {
        this.countDown();
      }, 1000);
    }

    if (changes.stop && this.stop) {
      this.stopTimer();
      this.emitFinish();
    }
  }

  initVals() {
    this.totalSeconds = this.minutes * 60;
  }

  // Dong ho dem nguoc
  countDown() {
    this.timer = setTimeout(() => {
      this.totalSeconds = this.totalSeconds - 1;
      if (this.totalSeconds >= 0) {
        this.countDown();
        this.calPercent();
      } else {
        this.emitFinish();
      }
    }, 1000);
  }

  calPercent() {
    return this.percent = this.totalSeconds / (this.minutes * 60) * 100;
  }

  emitFinish() {
    this.finish.emit(this.totalSeconds);
  }

  // Ngung tinh gio
  stopTimer() {
    clearTimeout(this.timer);
  }

}
