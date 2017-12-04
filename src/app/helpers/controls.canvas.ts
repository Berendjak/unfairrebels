import { Injectable } from '@angular/core';

@Injectable()
export class Controls {
  public Move(event: KeyboardEvent, character, col, gameObjects, ceil, speedLeft, speedRight) {
    if (!event.altKey) {
      if (event.keyCode === 38 && col) {
        character.moveup(ceil);
      }
      if (event.keyCode === 39) {
        for (const obj of gameObjects) {
          obj.moveright(speedLeft);
        }
      }
      if (event.keyCode === 37) {
        for (const obj of gameObjects) {
          obj.moveleft(speedRight);
        }
      }
    }
  }

  public StopMove(event: KeyboardEvent, gameObjects) {
    if (event.keyCode === 39) {
      for (const obj of gameObjects) {
        obj.stopright();
      }
    }
    if (event.keyCode === 37) {
      for (const obj of gameObjects) {
        obj.stopleft();
      }
    }
  }
}
