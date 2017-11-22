import { CanvasObject } from './canvas.object';

const gravity = 1;

export class MovingObject extends CanvasObject{
  public speedleftX: number;
  public speedrightX: number;
  public speedY: number;
  public gravitySpeed;

  constructor(ctx, width, height, x, y, color){
    super(ctx, width, height, x, y, color);
    this.speedleftX = 0;
    this.speedrightX = 0;
    this.speedY = 0;
    this.gravitySpeed = 0;
  }

  public newPos() {
    if (this.y >= 600 && this.gravitySpeed >= 0) {
       console.log(this.gravitySpeed);
      this.gravitySpeed = 0;
    } else if (this.gravitySpeed < 10) {
      this.gravitySpeed += gravity;
    }

    this.x += this.speedleftX + this.speedrightX;
    this.y += this.speedY + this.gravitySpeed;
  }
  
  public update() {
    this.newPos();
  }

  public stopright() {
    this.speedrightX = 0;
  }
  public stopleft() {
    this.speedleftX = 0;
  }
}
