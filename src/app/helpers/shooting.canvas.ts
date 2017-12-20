import { XMovingObject } from './x.moving.canvas';
import { BulletObject } from '../objects/bullet.object';

export class ShootingCanvas extends XMovingObject {
  public img = new Image();
  public fireSpeed: number;

  public interval;
  public bullets = [];
  public bulletY: number;

  constructor(params, fireSpeed = -7.5, fireBurst = 1000) {
    super(params);
    this.fireSpeed = fireSpeed;
    this.interval = setInterval(() => this.bullet(this.bulletY), fireBurst);
  }

  public bullet(y) {
    this.bullets.push(new BulletObject({ctx: this.ctx, x:  parseInt(this.x.toString(), 10), y: y, width: 40, height: 3}, this.speedLeftX, this.speedRightX, this.fireSpeed));
  }
}
