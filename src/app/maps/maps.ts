import { CanvasPlatform } from '../helpers/canvas.platform';

export class Maps {

  public notMovingGameObjects = [
    new CanvasPlatform(this.ctx, 99999, 5, 0, 700, 'blue'),
    new CanvasPlatform(this.ctx, 600, 20, 0, 300, 'black'),
    new CanvasPlatform(this.ctx, 600, 20, 700, 75, 'black'),
    new CanvasPlatform(this.ctx, 200, 20, 700, 600, 'red'),
    new CanvasPlatform(this.ctx, 200, 20, 550, 400, 'blue'),

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



