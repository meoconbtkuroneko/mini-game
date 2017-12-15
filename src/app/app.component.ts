import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';
// import { Like2048 } from '../pages/like2048/like2048';
import { TicToe } from '../pages/tic-toe/tic-toe';
import { CoreService } from '../providers/core-service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TicToe;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    coreService: CoreService,
  ) {
    coreService.themeService.initTheme();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
