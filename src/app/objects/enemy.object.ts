import { XMovingObject } from '../helpers/x.moving.canvas';
import { BulletObject } from './bullet.object';

const gravity = 0.01;

export class EnemyObject extends XMovingObject {
  public img = new Image();
  public gravitySpeed: number;
  public yDistance: number;
  public fireSpeed: number;

  public interval;
  public bullets = [];

  constructor(params, fireBurst = 1000, fireSpeed = -7.5) {
    super(params);
    this.img.src = '../../assets/images/props/fighter.png';
    this.fireSpeed = fireSpeed;
    this.gravitySpeed = -1;
    this.yDistance = 0;
    this.interval = setInterval(() => this.bullet(), fireBurst);
  }

  public newPosY() {
    if (this.gravitySpeed < 0 && this.yDistance > -100 && this.yDistance > -50) {
      this.gravitySpeed -= gravity;
      this.yDistance += this.gravitySpeed;
    } else if (this.yDistance < -50 && this.yDistance > -100) {
      this.gravitySpeed += gravity;
      this.yDistance += this.gravitySpeed;
    } else if (this.yDistance < -100) {
      this.gravitySpeed = 1;
      this.yDistance = 0;
    } else if (this.gravitySpeed > 0 && this.yDistance < 50) {
      this.gravitySpeed += gravity;
      this.yDistance += this.gravitySpeed;
    } else if (this.yDistance > 50 && this.yDistance < 100) {
      this.gravitySpeed -= gravity;
      this.yDistance += this.gravitySpeed;
    } else if (this.yDistance > 100) {
      this.gravitySpeed = -1;
      this.yDistance = 0;
    }
    this.y += this.gravitySpeed;
  }

  public bullet() {
    this.bullets.push(new BulletObject({ctx: this.ctx, x: parseInt(this.x.toString(), 10), y: this.y + (this.height / 2), width: 40, height: 3}, this.speedLeftX, this.speedRightX, this.fireSpeed));
  }
}
