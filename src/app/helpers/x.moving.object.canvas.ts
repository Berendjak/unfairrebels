import { CanvasObject } from './object.canvas';

export class XMovingObject extends CanvasObject{
  public speedleftX: number;
  public speedrightX: number;

  constructor(ctx, width, height, x, y, color){
    super(ctx, width, height, x, y, color);
    this.speedleftX = 0;
    this.speedrightX = 0;
  }

  public moveleft(speed) {
    this.speedleftX = speed;
  }
  public moveright(speed) {
    this.speedrightX = speed;
  }
  public stopright()  { this.speedrightX = 0; }
  public stopleft()   { this.speedleftX = 0; }
}
