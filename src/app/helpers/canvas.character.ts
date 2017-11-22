import { MovingObject } from './canvas.moving.object';

export class Character extends MovingObject{
  public moveup() {
    if (this.y >= 600) {
      this.gravitySpeed = -20;
    }
  }

  public movedown() {
    this.speedY = 2;
  }

  public moveleft() {
    this.speedleftX = -5;
  }

  public moveright() {
    this.speedrightX = 5;
  }

}
