import { PlatformObject } from '../objects/platform.object';
import { TrapObject } from '../objects/trap.object';
import { CheckpointObject } from '../objects/checkpoint.object';
import { FinishObject } from '../objects/finish.object';
import { EnemyMovingObject } from '../objects/enemy.moving.object';
import { JumpObject } from '../objects/jump.object';

export class Hoth {
  constructor(public ctx) { }

  public nabooObjects = {
    platformObjects: [
      new PlatformObject({ctx: this.ctx, x: 0,          y: 100,  width: 150,  height: 15,  color: '#0bef85'}),
      new PlatformObject({ctx: this.ctx, x: 900,        y: 350,  width: 150,  height: 15,  color: '#02aaff'}),
      new PlatformObject({ctx: this.ctx, x: 1300,       y: 350,  width: 50,   height: 15,   color: '#02aaff'}),
      new PlatformObject({ctx: this.ctx, x: 1450,       y: 250,  width: 50,   height: 15,   color: '#02aaff'}),
      new PlatformObject({ctx: this.ctx, x: 1500,       y: 150,  width: 150,  height: 15,   color: '#02aaff'}),
      new PlatformObject({ctx: this.ctx, x: 1050,       y: 135,  width: 160,  height: 15,   color: '#02aaff'}),
      new PlatformObject({ctx: this.ctx, x: 1800,       y: 350,  width: 50,   height: 15,   color: '#02aaff'}),
      new PlatformObject({ctx: this.ctx, x: 1850,       y: 350,  width: 50,   height: 15,   color: '#02aaff'}),
      new PlatformObject({ctx: this.ctx, x: 1900,       y: 350,  width: 50,   height: 15,   color: '#02aaff'}),
      new PlatformObject({ctx: this.ctx, x: 2000,       y: 200, width: 100,   height: 15,   color: '#0bef85'}),
      new PlatformObject({ctx: this.ctx, x: 850,        y: 250,  width: 50,   height: 15,   color: '#02aaff'}),
    ],
    trapObjects: [
      new TrapObject({ctx: this.ctx, x: 350,        y: 550,  width: 50,   height: 15,   color: '#02aaff'}),
      new TrapObject({ctx: this.ctx, x: 400,        y: 550,  width: 50,   height: 15,   color: '#02aaff'}),
      // new TrapObject({ctx: this.ctx, x: 0,          y: 600,  width: 1500, height: 15,   color: 'brown'}),
      new TrapObject({ctx: this.ctx, x: 1350,       y: 250,  width: 50,   height: 15,   color: '#02aaff'}),
      new TrapObject({ctx: this.ctx, x: 1400,       y: 250,  width: 50,   height: 15,   color: '#02aaff'}),
      new TrapObject({ctx: this.ctx, x: 500,        y: 450,  width: 50,   height: 15,   color: '#02aaff'}),
      new TrapObject({ctx: this.ctx, x: 550,        y: 450,  width: 50,   height: 15,   color: '#02aaff'}),
      new TrapObject({ctx: this.ctx, x: 600,        y: 350,  width: 50,   height: 15,   color: '#02aaff'}),
      new TrapObject({ctx: this.ctx, x: 700,        y: 350,  width: 50,   height: 15,   color: '#02aaff'}),
      new TrapObject({ctx: this.ctx, x: 750,        y: 250,  width: 50,   height: 15,   color: '#02aaff'}),
      new TrapObject({ctx: this.ctx, x: 800,        y: 250,  width: 50,   height: 15,   color: '#02aaff'}),
      new TrapObject({ctx: this.ctx, x: 1650,       y: 250,  width: 50,   height: 15,   color: '#02aaff'}),
      new TrapObject({ctx: this.ctx, x: 1700,       y: 250,  width: 50,   height: 15,   color: '#02aaff'}),
      new TrapObject({ctx: this.ctx, x: 1750,       y: 250,  width: 50,   height: 15,   color: '#02aaff'}),
      new TrapObject({ctx: this.ctx, x: 1200,       y: 350,  width: 50,   height: 15,   color: '#02aaff'}),
      new TrapObject({ctx: this.ctx, x: 1250,       y: 350,  width: 50,   height: 15,   color: '#02aaff'}),
    ],
    jumpObjects: [
      new JumpObject({ctx: this.ctx, x: 300,        y: 550,  width: 50,   height: 15,   color: '#02aaff'}),
      new JumpObject({ctx: this.ctx, x: 450,        y: 450,  width: 50,   height: 15,   color: '#02aaff'}),
      new JumpObject({ctx: this.ctx, x: 650,        y: 350,  width: 50,   height: 15,   color: '#02aaff'}),

],
    checkpointObjects: [
      new CheckpointObject({ctx: this.ctx, x: 1150,   y: 4}),
    ],
    enemyMovingObjects: [
      new EnemyMovingObject({ctx: this.ctx, x: 450, y: 200}),
      new EnemyMovingObject({ctx: this.ctx, x: 1050, y: 250}),
      new EnemyMovingObject({ctx: this.ctx, x: 1800, y: 100})
    ],
    enemyObjects: [

    ],
    finishObject: new FinishObject({ctx: this.ctx, x: 2050, y: 100})
  };
}
