import { CanvasObject } from './object.canvas';

const gravity = 1;

export class YMovingObject extends CanvasObject{
  public speedY: number;
  public gravitySpeed: number;

  constructor(ctx, width, height, x, y, color){
    super(ctx, width, height, x, y, color);
    this.speedY = 0;
    this.gravitySpeed = 0;
  }

  public newPos(colFloor, floor) {
    if (this.y + this.height > floor && this.gravitySpeed >= 0) {
      this.gravitySpeed = 0;
    } else if (this.gravitySpeed < 20 && !colFloor) {
      this.gravitySpeed += gravity;
    }
  }
}
