import { CanvasPlatform } from '../helpers/platform.canvas';

export class Maps {

  public notMovingGameObjects = [
    // Platform
    new CanvasPlatform(this.ctx, 999999, 20, -500, 700, 'black', false, false, false),
    new CanvasPlatform(this.ctx, 150, 20, 0, 300, 'black', false, false, false),
    new CanvasPlatform(this.ctx, 500, 20, 200, 300, 'black', false, false, false),
    new CanvasPlatform(this.ctx, 200, 20, 550, 400, 'blue', false, false, false),
    new CanvasPlatform(this.ctx, 600, 20, 700, 100, 'black', false, false, false),
    new CanvasPlatform(this.ctx, 200, 20, 700, 600, 'red', false, false, false),

    // Checkpoints
    new CanvasPlatform(this.ctx, 10, 50, 500, 150, 'blue', true, false, false),


    // Finish
    new CanvasPlatform(this.ctx, 10, 50, 200, 500, 'pink', false, false, true),
  ];

  constructor(public ctx) {
    this.drawAll();
  }

  // Draws all map objects
  public drawAll() {
    for (const obj of Object.keys(this.notMovingGameObjects)) {
      this.notMovingGameObjects[obj].draw();
    }
  }
  public newPosAll(dir) {
    for (const obj of this.notMovingGameObjects) {
      obj.newPos(dir);
    }
  }
}



