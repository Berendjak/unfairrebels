import { XMovingObject } from './x.moving.canvas';
import { BulletObject } from '../objects/bullet.object';

export class ShootingCanvas extends XMovingObject {
  public img = new Image();
  public fireSpeed: number;

  public intervalData: any;
  public interval: any;
  public bullets = [];
  public bulletY: number;

  constructor(params, fireSpeed = -7.5, public fireBurst = 1000) {
    super(params);
    this.fireSpeed = fireSpeed;
    this.intervalData = () => this.bullet(this.bulletY);
    this.interval = setInterval(this.intervalData, fireBurst);
  }

  public bullet(y) {
    this.bullets.push(new BulletObject({ctx: this.ctx, x:  parseInt(this.x.toString(), 10), y: y}, this.speedLeftX, this.speedRightX, this.fireSpeed));
  }
}
