import {
  Component,
  Input,
} from '@angular/core';

import { CONSTANT } from '../../providers/constant';

/**
 * Generated class for the Background component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'background',
  templateUrl: 'background.html'
})
export class Background {
  @Input() name;
  pathImage: string = CONSTANT.PATH_IMAGE;
}
