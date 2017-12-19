import { ObjectCanvas } from './object.canvas';

export class XMovingObject extends ObjectCanvas{
  public speedLeftX:  number;
  public speedRightX: number;

  constructor(params){
    super(params);
    this.speedLeftX   = 0;
    this.speedRightX  = 0;
  }


  public moveLeft(speed)  { this.speedLeftX   = speed; }
  public moveRight(speed) { this.speedRightX  = speed; }
  public stopRight()      { this.speedRightX  = 0; }
  public stopLeft()       { this.speedLeftX   = 0; }

  public newPosX(dir) {
    switch (dir) {
      case 'right':
        this.x += this.speedRightX;
        break;
      case 'left':
        this.x += this.speedLeftX;
        break;
      case 'both':
        this.x += this.speedLeftX + this.speedRightX;
        break;
    }
  }
}
