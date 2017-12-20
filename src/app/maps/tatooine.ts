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
      // new PlatformObject({ctx: this.ctx, x: -30,        y: 300,  width: 30,    height: 15,   color: '#ffdb5b'}),
      new PlatformObject({ctx: this.ctx, x: 0,           y: 450,  width: 80,    height: 15,   color: '#ffdb5b'}),
      new PlatformObject({ctx: this.ctx, x: 120,         y: 380,  width: 80,    height: 15,   color: '#ffdb5b'}),
        // trap 0
      new PlatformObject({ctx: this.ctx, x: 360,         y: 240 , width: 80,    height: 15,   color: '#ffdb5b'}),
        // trap 1
      new PlatformObject({ctx: this.ctx, x: 820,         y: 170 , width: 110,   height: 15,   color: '#ffdb5b'}),
      new PlatformObject({ctx: this.ctx, x: 520,         y: 649 , width: 110,   height: 15,   color: '#ffdb5b'}),
        // trap 2
      new PlatformObject({ctx: this.ctx, x: 520,         y: 700 , width: 110,   height: 15,   color: '#ffdb5b'}),

      new PlatformObject({ctx: this.ctx, x: 820,         y: 565 , width: 60,    height: 15,   color: '#ffdb5b'}),
        // trap 3
      new PlatformObject({ctx: this.ctx, x: 940,         y: 565,  width: 60,    height: 15,   color: '#ffdb5b'}),
        // stijle helling
      new PlatformObject({ctx: this.ctx, x: 960,         y: 420,  width: 20,    height: 15,   color: '#ffdb5b'}),
      new PlatformObject({ctx: this.ctx, x: 1150,        y: 200,  width: 15,    height: 350,  color: '#ffdb5b'}),

      new PlatformObject({ctx: this.ctx, x: 1350,        y: 200,  width: 15,    height: 115,  color: '#ffdb5b'}),
      new PlatformObject({ctx: this.ctx, x: 1350,        y: 400,  width: 15,    height: 150,  color: '#ffdb5b'}),
        // trap 4
      new PlatformObject({ctx: this.ctx, x: 1365,        y: -150,   width: 15,     height: 465, color: 'ffdb5b'}),

      new PlatformObject({ctx: this.ctx, x: 1275,        y: 200,  width: 75,    height: 15,   color: '#ffdb5b'}),
      new PlatformObject({ctx: this.ctx, x: 1150,        y: 250,  width: 75,    height: 15,   color: '#ffdb5b'}),
      new PlatformObject({ctx: this.ctx, x: 1255,        y: 300,  width: 95,    height: 15,   color: '#ffdb5b'}),
      new PlatformObject({ctx: this.ctx, x: 1255,        y: 400,  width: 95,    height: 15,   color: 'blue'}),
        // trap 5/6
      new PlatformObject({ctx: this.ctx, x: 1255,        y: 400,  width: 95,    height: 15,   color: '#ffdb5b'}),
      new PlatformObject({ctx: this.ctx, x: 1350,        y: 450,  width: 200,   height: 15,   color: '#ffdb5b'}),
        // trap 7
      new PlatformObject({ctx: this.ctx, x: 1550,        y: 450,  width: 70,    height: 15,   color: '#ffdb5b'}),
      new PlatformObject({ctx: this.ctx, x: 1550,        y: 300,  width: 140,   height: 15,   color: '#ffdb5b'}),
        // trap 8
      new PlatformObject({ctx: this.ctx, x: 1700,        y: 450,  width: 70,    height: 15,   color: '#ffdb5b'}),
    ],
    trapObjects: [
     // 0
      new TrapObject({ctx: this.ctx, x: 240,         y: 310 ,  width: 80,    height: 15,   color: '#ffdb5b'}),
      new TrapObject({ctx: this.ctx, x: 480,         y: 170 ,  width: 80,    height: 15,   color: '#ffdb5b'}),
      new TrapObject({ctx: this.ctx, x: 730,         y: 600 ,  width: 80,    height: 15,   color: '#ffdb5b'}),
      new TrapObject({ctx: this.ctx, x: 880,         y: 565 ,  width: 60,    height: 15,   color: '#ffdb5b'}),
      new TrapObject({ctx: this.ctx, x: 990,         y: 220 ,  width: 20,    height: 15,   color: '#ffdb5b'}),
     // 5
      new TrapObject({ctx: this.ctx, x: 1350,        y: 190,   width: 15,    height: 450,  color: '#ffdb5b'}),
      new TrapObject({ctx: this.ctx, x: 1350,        y: 190,   width: 15,    height: 5,    color: 'red'}),
      new TrapObject({ctx: this.ctx, x: 1630,        y: 450,   width: 70,    height: 15,   color: '#ffdb5b'}),
      new TrapObject({ctx: this.ctx, x: 1700,        y: 300,   width: 70,    height: 15,   color: '#ffdb5b'}),




    ],
    checkpointObjects: [
      new CheckpointObject({ctx: this.ctx, x: 300,  y: 260}),
      new CheckpointObject({ctx: this.ctx, x: 960,  y: 420}),
      new CheckpointObject({ctx: this.ctx, x: 1550, y: 290}),
    ],
    jumpObjects: [
      // new JumpObject({ctx: this.ctx, x: 300, y: 200, width: 50, height: 50, color: 'yellow'})
    ],
    enemyObjects: [
       // new EnemyObject({ctx: this.ctx, x: 1500, y: 400, width: 50, height: 50, color: 'red'}),
      // new EnemyObject({ctx: this.ctx, x: 1500, y: 200, width: 50, height: 50, color: 'red'})
    ],

    finishObject: new FinishObject({ctx: this.ctx, x: 1700, y: 450, width: 10, height: 60, color: 'white'})
  };
}

