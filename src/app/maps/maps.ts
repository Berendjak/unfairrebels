import { CanvasPlatform } from '../helpers/platform.canvas';

export class Maps {

  public notMovingGameObjects = [
    // Platform
    new CanvasPlatform(this.ctx, 999999, 20, 0, 700, 'black', false, false, false),
    new CanvasPlatform(this.ctx, 150, 20, 0, 300, 'black', false, false, false),
    new CanvasPlatform(this.ctx, 500, 20, 200, 300, 'black', false, false, false),
    new CanvasPlatform(this.ctx, 200, 20, 550, 400, 'blue', false, false, false),
    new CanvasPlatform(this.ctx, 600, 20, 700, 100, 'black', false, false, false),
    new CanvasPlatform(this.ctx, 200, 20, 700, 600, 'red', false, false, false),

    // Checkpoints
    new CanvasPlatform(this.ctx, 10, 50, 200, 150, 'blue', true, false, false),
    new CanvasPlatform(this.ctx, 10, 150, 400, 250, 'brown', true, false, false),

    // Finish
    new CanvasPlatform(this.ctx, 10, 50, 800, 50, 'pink', false, false, true),
  ];

  constructor(public ctx) {
    // Sorts notMovingGameObjects by y (ascending)
    this.notMovingGameObjects.sort((a: any, b: any) => {
      if (a.y < b.y) {
        return -1;
      } else if (a.y > b.y) {
        return 1;
      } else {
        return 0;
      }
    });
    this.drawAll();
  }

  // Draws all map objects
  public drawAll(){
    for (const obj of Object.keys(this.notMovingGameObjects)) {
      this.notMovingGameObjects[obj].draw();
    }
  }
}



