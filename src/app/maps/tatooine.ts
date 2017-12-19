import { PlatformObject } from '../objects/platform.object';
import { TrapObject } from '../objects/trap.object';
import { CheckpointObject } from '../objects/checkpoint.object';
import { FinishObject } from '../objects/finish.object';
import { EnemyObject } from '../objects/enemy.object';
import { JumpObject } from '../objects/jump.object';

export class Tatooine {
  constructor(public ctx) {}

  public tatooineObjects = {
    platformObjects: [
      new PlatformObject({ctx: this.ctx, x: 0,   y: 300,  width: 150,    height: 20,   color: 'black'}),
      new PlatformObject({ctx: this.ctx, x: 200, y: 300,  width: 500,    height: 20,   color: 'black'}),
      new PlatformObject({ctx: this.ctx, x: 550, y: 400,  width: 200,    height: 20,   color: 'blue'}),
      new PlatformObject({ctx: this.ctx, x: 700, y: 100,  width: 600,    height: 20,   color: 'black'}),
      new PlatformObject({ctx: this.ctx, x: 700, y: 600,  width: 200,    height: 20,   color: 'blue'}),
    ],
    trapObjects: [
      new TrapObject({ctx: this.ctx, x: 500, y: 500, width: 20, height: 20, color: 'black'}),
    ],
    checkpointObjects: [
      new CheckpointObject({ctx: this.ctx, x: 500, y: 150, width: 30, height: 150}),
      new CheckpointObject({ctx: this.ctx, x: 600, y: 150, width: 30, height: 150}),
    ],
    jumpObjects: [
      new JumpObject({ctx: this.ctx, x: 300, y: 200, width: 50, height: 50, color: 'yellow'})
    ],
    enemyObjects: [
      new EnemyObject({ctx: this.ctx, x: 900, y: 400, width: 50, height: 50, color: 'red'})
    ],
    finishObject: new FinishObject({ctx: this.ctx, x: 780, y: 500})
  };
}

