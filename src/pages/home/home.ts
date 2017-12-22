import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import { CONSTANT } from '../../providers/constant';
import * as _ from 'lodash';

// import { CoreService } from '../../providers/core-service';
import { Like2048 } from '../../pages/like2048/like2048';
import { TicToe } from '../../pages/tic-toe/tic-toe';
import { FindCardPage } from '../../pages/find-card/find-card';
import { FindNumberPage } from '../../pages/find-number/find-number';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  allGames = [
    new GameItem({ id: 1, name: 'Find Number', component: FindNumberPage }),
    new GameItem({ id: 2, name: '2048', component: Like2048 }),
    new GameItem({ id: 3, name: 'Tic Toe', component: TicToe }),
    new GameItem({ id: 4, name: 'Find Card', component: FindCardPage }),
  ]
  constructor(
    private navController: NavController,
    // private coreService: CoreService,
  ) {
    this.goToGame(this.allGames[0]);
  }

  goToGame(item: GameItem) {
    if (!item) {
      return;
    }
    this.navController.push(item.component)
  }
}

export class GameItem {
  id: number;
  name: string;
  component;

  constructor(data ? ) {
    data = data || {};
    this.id = data.id || 0;
    this.name = data.name || 'New Game';
    this.component = data.component;
  }
}
