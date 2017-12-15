import { Component } from '@angular/core';

import {
  CONSTANT,
  ThemeItem,
} from '../../providers/constant';
import { CoreService } from '../../providers/core-service';

@Component({
  selector: 'select-theme',
  templateUrl: 'select-theme.html'
})
export class SelectTheme {
  constructor(
    public coreService: CoreService,
  ) {}

  themeItem: ThemeItem;

  ngOnInit() {
    this.initVals();
  }

  initVals() {
    this.themeItem = this.coreService.themeService.themeItem;
  }

  selectTheme(index) {
    this.coreService.themeService.setCurrentColor(this.themeItem.colors[index]);
  }
}
