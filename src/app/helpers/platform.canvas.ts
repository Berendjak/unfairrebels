import {XMovingObject } from './x.moving.object.canvas';

export class CanvasPlatform extends XMovingObject {
  public isCheckpoint: boolean;
  public hasPassed: boolean;
  public finish: boolean;

  constructor(ctx, width, height, x, y, color, isCheckpoint, hasPassed, finish){
    super(ctx, width, height, x, y, color);
    this.isCheckpoint = isCheckpoint;
    this.hasPassed = hasPassed;
    this.finish = finish;
  }

  public newPos(dir) {
    switch (dir) {
      case 'right':
        this.x += this.speedrightX;
        break;
      case 'left':
        this.x += this.speedleftX;
        break;
      case 'both':
        this.x += this.speedleftX + this.speedrightX;
        break;
    }
  }
}
