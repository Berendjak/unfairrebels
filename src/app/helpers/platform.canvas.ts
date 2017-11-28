import {CanvasObject} from './object.canvas';

export class CanvasPlatform extends CanvasObject {
  constructor(ctx, width, height, x, y, color){
    super(ctx, width, height, x, y, color);
  }
}
