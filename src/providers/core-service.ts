import { Injectable } from '@angular/core';
import { AnywhereService } from './anywhere-service';
import { ThemeService } from './theme-service';
import { Events, Platform } from 'ionic-angular';

/*
  Generated class for the CoreService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CoreService {

  constructor(
    public anywhereService: AnywhereService,
    public themeService: ThemeService,
    public events: Events,
    public platform: Platform,
  ) {}
}
