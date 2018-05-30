import { PlatformObject } from '../objects/platform.object';
import { TrapObject } from '../objects/trap.object';
import { CheckpointObject } from '../objects/checkpoint.object';
import { FinishObject } from '../objects/finish.object';
import { EnemyMovingObject } from '../objects/enemy.moving.object';
import { JumpObject } from '../objects/jump.object';
import { EnemyObject } from '../objects/enemy.object';

export class Tatooine {
  constructor(public ctx) {}

  public tatooineObjects = {
    platformObjects: [
      new PlatformObject({ctx: this.ctx, x: 0,    y: 480,  width: 80,    height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 120,  y: 410,  width: 80,    height: 15,   color: '#bf9287'}),
        // trap 0
      new PlatformObject({ctx: this.ctx, x: 360,  y: 270 , width: 80,    height: 15,   color: '#bf9287'}),
        // trap 1
      new PlatformObject({ctx: this.ctx, x: 820,  y: 220 , width: 110,   height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 520,  y: 649 , width: 110,   height: 15,   color: 'yellow'}),
        // trap 2
      new PlatformObject({ctx: this.ctx, x: 520,  y: 700 , width: 110,   height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 820,  y: 565 , width: 60,    height: 15,   color: '#bf9287'}),
        // trap 3
      new PlatformObject({ctx: this.ctx, x: 940,  y: 565,  width: 60,    height: 15,   color: '#bf9287'}),
        // stijle helling
      new PlatformObject({ctx: this.ctx, x: 960,  y: 420,  width: 20,    height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 1150, y: 200,  width: 15,    height: 350,  color: '#bf9287'}),

      new PlatformObject({ctx: this.ctx, x: 1350, y: 200,  width: 15,    height: 115,  color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 1350, y: 400,  width: 15,    height: 150,  color: '#bf9287'}),
        // trap 4
      new PlatformObject({ctx: this.ctx, x: 1365, y: -150, width: 15,    height: 465,  color: '#bf9287'}),
        // jump 0
      new PlatformObject({ctx: this.ctx, x: 1150, y: 250,  width: 45,    height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 1255, y: 300,  width: 95,    height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 1255, y: 400,  width: 95,    height: 15,   color: '#bf9287'}),
        // trap 5/6
      new PlatformObject({ctx: this.ctx, x: 1255, y: 400,  width: 95,    height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 1275, y: 200,  width: 75,    height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 1350, y: 480,  width: 200,   height: 15,   color: '#bf9287'}),
        // trap 7
      new PlatformObject({ctx: this.ctx, x: 1550, y: 480,  width: 70,    height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 1700, y: 380,  width: 140,   height: 15,   color: '#bf9287'}),
        // trap 8
      new PlatformObject({ctx: this.ctx, x: 1690, y: 480,  width: 140,   height: 15,   color: '#bf9287'}),
        // trap 9
      new PlatformObject({ctx: this.ctx, x: 1920, y: 480,  width: 140,   height: 15,   color: '#bf9287'}),
        // trap 10
      new PlatformObject({ctx: this.ctx, x: 1920, y: 480,  width: 140,   height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 1980, y: 350,  width: 140,   height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 2280, y: 150,  width: 140,   height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 2180, y: 270,  width: 140,   height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 2120, y: 480,  width: 140,   height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 2950, y: 480,  width: 200,   height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 3250, y: 100,  width: 15,    height: 395,  color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 3190, y: 150,  width: 60,    height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 3150, y: 298,  width: 100,   height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 3165, y: 420,  width: 85,    height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 3250, y: 260,  width: 40,    height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 3250, y: 390,  width: 75,    height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 3260, y: 480,  width: 140,   height: 15,   color: '#bf9287'}),
      new PlatformObject({ctx: this.ctx, x: 3720, y: 480,  width: 500,   height: 15,   color: '#bf9287'}),

    ],
    trapObjects: [
     // 0
      new TrapObject({ctx: this.ctx, x: 240,  y: 340 ,  width: 80,    height: 15,   color: '#bf9287'}),
      new TrapObject({ctx: this.ctx, x: 480,  y: 170 ,  width: 80,    height: 15,   color: '#bf9287'}),
      new TrapObject({ctx: this.ctx, x: 730,  y: 600 ,  width: 80,    height: 15,   color: '#bf9287'}),
      new TrapObject({ctx: this.ctx, x: 880,  y: 565 ,  width: 60,    height: 15,   color: '#bf9287'}),
      new TrapObject({ctx: this.ctx, x: 990,  y: 220 ,  width: 20,    height: 15,   color: '#bf9287'}),
     // 5
      new TrapObject({ctx: this.ctx, x: 1350, y: 190,   width: 15,    height: 450,  color: '#bf9287'}),
      new TrapObject({ctx: this.ctx, x: 1350, y: 190,   width: 15,    height: 5,    color: 'red'}),
      new TrapObject({ctx: this.ctx, x: 1620, y: 480,   width: 70,    height: 15,   color: '#bf9287'}),
      new TrapObject({ctx: this.ctx, x: 1840, y: 380,   width: 70,    height: 15,   color: '#bf9287'}),
      new TrapObject({ctx: this.ctx, x: 1830, y: 480,   width: 90,    height: 15,   color: '#bf9287'}),
      // 10
      new TrapObject({ctx: this.ctx, x: 2060, y: 480,   width: 70,    height: 15,   color: '#bf9287'}),
      new TrapObject({ctx: this.ctx, x: 2300, y: 480,   width: 70,    height: 15,   color: '#bf9287'}),
      new TrapObject({ctx: this.ctx, x: 3150, y: 480,   width: 120,   height: 15,   color: '#bf9287'}),
      new TrapObject({ctx: this.ctx, x: 3470, y: 480,   width: 250,   height: 15,   color: '#bf9287'}),

      new TrapObject({ctx: this.ctx, x: 3400, y: 470,   width: 70,    height: 20,   color: '#e0b9b1'}),
    ],
    checkpointObjects: [
      new CheckpointObject({ctx: this.ctx, x: 400,   y: 155}),
      new CheckpointObject({ctx: this.ctx, x: 960,   y: 450}),
      new CheckpointObject({ctx: this.ctx, x: 1980,  y: 365}),
      new CheckpointObject({ctx: this.ctx, x: 3000,  y: 365}),
    ],
    jumpObjects: [
      new JumpObject({ctx: this.ctx, x: 2500, y: 200,  width: 50,   height: 15,   color: '#e0b9b1'}),
      new JumpObject({ctx: this.ctx, x: 2700, y: 200,  width: 50,   height: 15,   color: '#e0b9b1'}),

      new JumpObject({ctx: this.ctx, x: 2570, y: 350,  width: 50,   height: 15,   color: '#e0b9b1'}),
      new JumpObject({ctx: this.ctx, x: 2770, y: 350,  width: 50,   height: 15,   color: '#e0b9b1'}),


      new JumpObject({ctx: this.ctx, x: 2500, y: 480,  width: 50,   height: 15,   color: '#e0b9b1'}),
      new JumpObject({ctx: this.ctx, x: 2700, y: 480,  width: 50,   height: 15,   color: '#e0b9b1'}),
      new JumpObject({ctx: this.ctx, x: 2900, y: 480,  width: 50,   height: 15,   color: '#c99a8f'}),

      new JumpObject({ctx: this.ctx, x: 3400, y: 480,  width: 70,   height: 15,   color: '#e0b9b1'}),

    ],

    enemyMovingObjects: [
       new EnemyMovingObject({ctx: this.ctx, x: 3700, y: 200}),
    ],

    enemyObjects: [

      new EnemyObject({ctx: this.ctx, x: 2400, y: 380})
    ],

    finishObject: new FinishObject({ctx: this.ctx, x: 3900, y: 380}),


  };
}

