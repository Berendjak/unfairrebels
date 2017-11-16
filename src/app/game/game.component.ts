import {AfterViewInit, Component, HostListener, ViewEncapsulation} from '@angular/core';

import {AppComponent, Character} from '../app.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
  encapsulation: ViewEncapsulation.None
})

export class GameComponent implements AfterViewInit {
  constructor( private canvas: AppComponent) {}

  public character: Character;

  ngAfterViewInit() {
    this.character = new Character(this.canvas.ctx, 30, 30, 'red', 10, 120);
    this.canvas.startGame(this.character);
  }

  @HostListener('document:keydown', ['$event'])
  public Controls(event: KeyboardEvent) {
    console.log(event.keyCode);

    if (event.keyCode === 38){
      this.character.moveup();
    }
    if (event.keyCode === 39){
      this.character.moveright();
    }
  }

  @HostListener('document:keyup', ['$event'])
  public ControlsStop(event: KeyboardEvent) {
    console.log(event.keyCode);

    if (event.keyCode === 38){

    }
    if (event.keyCode === 39){
      this.character.moveright();
    }
  }
}
