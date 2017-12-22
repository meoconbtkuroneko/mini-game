import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Like2048 } from '../pages/like2048/like2048';
import { TicToe } from '../pages/tic-toe/tic-toe';
import { FindNumberPage } from '../pages/find-number/find-number';
import { FindCardPage } from '../pages/find-card/find-card';

import { Background } from '../components/background/background';
import { SelectTheme } from '../components/select-theme/select-theme';
import { ProgressBar } from '../components/progress-bar/progress-bar';
import { GridCard } from '../components/grid-card/grid-card';
import { ButtonReplay } from '../components/button-replay/button-replay';

import { LoopByNumber } from '../pipes/loop-by-number';

import { AnywhereService } from '../providers/anywhere-service';
import { CoreService } from '../providers/core-service';
import { ThemeService } from '../providers/theme-service';

import { CustomSwipe } from '../components/custom-swipe/custom-swipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Like2048,
    TicToe,
    FindNumberPage,
    FindCardPage,
    Background,
    SelectTheme,
    ProgressBar,
    GridCard,
    ButtonReplay,
    LoopByNumber,
    CustomSwipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Like2048,
    TicToe,
    FindNumberPage,
    FindCardPage,
    Background,
    SelectTheme,
    ProgressBar,
    GridCard,
    ButtonReplay,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AnywhereService,
    CoreService,
    ThemeService,
  ]
})
export class AppModule {}
