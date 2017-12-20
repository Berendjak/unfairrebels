import { ShootingCanvas } from '../helpers/shooting.canvas';

const gravity = 0.01;

export class EnemyMovingObject extends ShootingCanvas {
  public img = new Image();
  public gravitySpeed: number;
  public yDistance: number;

  constructor(params) {
    super(params);
    this.img.src = '../../assets/images/props/fighter.png';
    this.width = 115;
    this.height = 100;
    this.gravitySpeed = -1;
    this.yDistance = 0;
    this.bulletY = this.y + (this.height / 2);
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
}
