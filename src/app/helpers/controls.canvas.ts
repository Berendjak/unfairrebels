import { Injectable } from '@angular/core';

@Injectable()
export class Controls {
  public Move(event: KeyboardEvent, character, col, gameObjects, ceil, speedLeft, speedRight) {
    if (!event.altKey) {
      if ((event.keyCode === 38 || event.keyCode === 32) && col) {
        character.moveUp(ceil);
      }
      if (event.keyCode === 39) {
        for (const obj of gameObjects) {
          obj.moveRight(speedLeft);
        }
      }
      if ((event.keyCode === 37)) {
        for (const obj of gameObjects) {
          obj.moveLeft(speedRight);
        }
      }
    }
  }

  public StopMove(event: KeyboardEvent, gameObjects) {
    if (event.keyCode === 39) {
      for (const obj of gameObjects) {
        obj.stopRight();
      }
    }
    if (event.keyCode === 37) {
      for (const obj of gameObjects) {
        obj.stopLeft();
      }
    }
  }
}
