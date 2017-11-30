import {CanvasObject} from './object.canvas';

export class CanvasPlatform extends CanvasObject {
  public isCheckpoint: boolean;
  public hasPassed: boolean;
  public finish: boolean;

  constructor(ctx, width, height, x, y, color, isCheckpoint, hasPassed, finish){
    super(ctx, width, height, x, y, color);
    this.isCheckpoint = isCheckpoint;
    this.hasPassed = hasPassed;
    this.finish = finish;

  }
}
