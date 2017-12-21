import { XMovingObject } from '../helpers/x.moving.canvas';

export class BulletObject extends XMovingObject {
  public velocity: number;
  public img = new Image();

  constructor(params, speedLeftX, speedRightX, velocity) {
    super(params);
    this.width = 40;
    this.height = 3;
    this.speedLeftX = speedLeftX;
    this.speedRightX = speedRightX;
    this.velocity = velocity;
    this.img.src = '../../assets/images/props/bullet.png';
  }

  public newPosX() {
    this.x += this.velocity;
    super.newPosX('both');
  }
}
