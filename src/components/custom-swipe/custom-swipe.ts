import {
  Directive,
  Input,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Gesture } from 'ionic-angular/gestures/gesture';
import { CONSTANT } from '../../providers/constant';

@Directive({
  selector: '[custom-swipe]' // Attribute selector
})
export class CustomSwipe {
  @Output() onCustomSwipe = new EventEmitter();

  private el: HTMLElement;
  private swipeGesture: Gesture;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngOnInit() {
    this.swipeGesture = new Gesture(this.el, {
      recognizers: [
        [Hammer.Swipe, { direction: Hammer.DIRECTION_ALL }]
      ]
    });
    this.swipeGesture.listen();
    this.swipeGesture.on('swipeleft', e => {
      this.emitEvent(2); //CONSTANT.DIRECTION_CODE
    });
    this.swipeGesture.on('swiperight', e => {
      this.emitEvent(4); //CONSTANT.DIRECTION_CODE
    });
    this.swipeGesture.on('swipeup', e => {
      this.emitEvent(8); //CONSTANT.DIRECTION_CODE
    });
    this.swipeGesture.on('swipedown', e => {
      this.emitEvent(16); //CONSTANT.DIRECTION_CODE
    });
  }

  emitEvent(data) {
    this.onCustomSwipe.emit(data);
  }

  ngOnDestroy() {
    this.swipeGesture.destroy();
  }
}
