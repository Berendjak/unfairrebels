import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
  encapsulation: ViewEncapsulation.None
})

export class GameComponent implements AfterViewInit {
  constructor(private appComponent: AppComponent) {}

  ngAfterViewInit() {
    this.appComponent.startGame();
  }

}
