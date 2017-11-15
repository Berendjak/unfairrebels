import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {AppComponent} from '../app.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
  encapsulation: ViewEncapsulation.None
})

export class GameComponent implements OnInit {
  constructor(private canvas: AppComponent) {}

  ngOnInit() {
    // this.canvas.startGame();
  }
  // Functions
}
