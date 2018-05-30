import { XMovingObject } from '../helpers/x.moving.canvas';

const gravity = 0.5;

export class TrapObject extends XMovingObject {
  public gravitySpeed: number;
  public isTouched = false;

  constructor(params) {
    super(params)
    this.gravitySpeed = 0;
  }

  public draw() {
    if (this.isTouched){
      this.newPosY();
    }
    super.draw();
  }

  public newPosY() {
    if (this.gravitySpeed >= 0) {
      this.gravitySpeed += gravity;
    }
    this.y += this.gravitySpeed;
  }
}
