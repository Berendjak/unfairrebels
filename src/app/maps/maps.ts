import { PlatformObject } from '../objects/platform.object';
import { Tatooine } from './tatooine';
import { FinishObject } from '../objects/finish.object';
import { Params } from '@angular/router';
import {EnemyMovingObject} from "../objects/enemy.moving.object";


export class Maps {
  public maps = [
    new Tatooine(this.ctx).tatooineObjects
  ];

  public allObjects = [];
  public xMovingObjects = [];

  public yDesc = [];
  public yAsc  = [];
  public xDesc = [];
  public xAsc  = [];

  public outline = [
    new PlatformObject({ctx: this.ctx, x: -1000,    y: -200, width: 999999, height: 1}),
    new PlatformObject({ctx: this.ctx, x: -1000,    y: 800,  width: 999999, height: 1}),
    new PlatformObject({ctx: this.ctx, x: -1000,    y: -200, width: 1,      height: 1000}),
    new PlatformObject({ctx: this.ctx, x: 999999,   y: -200, width: 1,      height: 1000}),
  ];
  public platformObjects    = [];
  public trapObjects        = [];
  public checkpointObjects  = [];
  public enemyMovingObjects = [];
  public enemyObjects       = [];
  public jumpObjects        = [];
  public finishObject: FinishObject;

  public shootingObjects    = [];

  public level = 0;

  constructor(public ctx, private activeRoute) {
    this.activeRoute.params.subscribe((params: Params) => {
      if (params.level <= this.maps.length - 1 && params.level > 0)
      this.level = params.level;
    });
    this.filler();
    this.sorter();
  }

  public filler() {
    this.platformObjects = this.maps[this.level].platformObjects;
    this.trapObjects = this.maps[this.level].trapObjects;
    this.checkpointObjects = this.maps[this.level].checkpointObjects;
    this.enemyMovingObjects = this.maps[this.level].enemyMovingObjects;
    this.enemyObjects = this.maps[this.level].enemyObjects;
    this.jumpObjects = this.maps[this.level].jumpObjects;
    this.finishObject = this.maps[this.level].finishObject;
    this.shootingObjects = this.enemyMovingObjects.concat(this.enemyObjects);

    this.xMovingObjects = this.platformObjects
      .concat(this.checkpointObjects, this.finishObject, this.jumpObjects, this.enemyObjects, this.outline);
    this.allObjects = this.xMovingObjects
      .concat(this.trapObjects, this.enemyMovingObjects);
  }
  public sorter() {
    this.yDesc = this.allObjects.slice();
    this.yAsc  = this.allObjects.slice();
    this.xDesc = this.allObjects.slice();
    this.xAsc  = this.allObjects.slice();
    this.yDesc.sort((a: any, b: any) => {
      if (a.y > b.y) {
        return -1;
      } else if (a.y < b.y) {
        return 1;
      } else {
        return 0;
      }
    });
    this.yAsc.sort((a: any, b: any) => {
      if (a.y < b.y) {
        return -1;
      } else if (a.y > b.y) {
        return 1;
      } else {
        return 0;
      }
    });
    this.xDesc.sort((a: any, b: any) => {
      if (a.x > b.x) {
        return -1;
      } else if (a.x < b.x) {
        return 1;
      } else {
        return 0;
      }
    });
    this.xAsc.sort((a: any, b: any) => {
      if (a.x < b.x) {
        return -1;
      } else if (a.x > b.x) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  public drawAll(canvas) {
    // Draws all objects visible in the canvas
    for (const obj of this.allObjects) {
      if ((obj.x < canvas.width &&
        obj.x + obj.width > 0 &&
        obj.y < canvas.height &&
        obj.y + obj.height > 0) || obj.isTouched) {
        obj.draw();
      }
    } for (const obj of this.shootingObjects) {
      if (obj.bullets[obj.bullets.length - 1]) {
        for (const bul of obj.bullets) {
          // If the bullet does not yet exist in the array, add it
          if (!this.allObjects.includes(bul) && bul.x + bul.width > 0) {
            bul.newPosX('both');
            this.allObjects.push(bul);
            // If out of screen delete from allObjects array
          } else if (this.allObjects.includes(bul) && (bul.velocity < 0 && (bul.x + bul.width <= 0 || bul.x > canvas.width)) || (bul.velocity > 0 && bul.x > canvas.width)) {
            this.allObjects.splice(this.allObjects.indexOf(bul));
          }
        }
      }
      if (obj.intervalOn && obj.x > canvas.width || obj.x < 0) {
        obj.intervalOn = false;
        clearInterval(obj.interval);
      } else if (!obj.intervalOn && obj.x < canvas.width && obj.x > 0) {
        clearInterval(obj.interval);
        obj.intervalOn = true;
        setInterval(obj.intervalData, obj.fireBurst);
      }
    }
    this.sorter();
  }

  public newPosAll(dir) {
    for (const obj of this.allObjects) {
      obj.newPosX(dir);
    } for (const obj of this.enemyMovingObjects) {
      obj.newPosY();
    }
  }
}



