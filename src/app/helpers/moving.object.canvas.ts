import { CanvasObject } from './object.canvas';

const gravity = 1;

export class MovingObject extends CanvasObject{
  public speedleftX: number;
  public speedrightX: number;
  public speedY: number;
  public gravitySpeed: number;

  constructor(ctx, width, height, x, y, color){
    super(ctx, width, height, x, y, color);
    this.speedleftX = 0;
    this.speedrightX = 0;
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

  public stopright() {
    this.speedrightX = 0;
  }
  public stopleft() {
    this.speedleftX = 0;
  }
}
