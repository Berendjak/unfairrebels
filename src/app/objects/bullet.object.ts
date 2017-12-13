import { XMovingObject } from '../helpers/x.moving.canvas';

export class BulletObject extends XMovingObject {
  public velocity: number;

  constructor(params, speedLeftX, speedRightX, velocity) {
    super(params);
    this.speedLeftX = speedLeftX;
    this.speedRightX = speedRightX;
    this.velocity = velocity;
  }

  public newPosX() {
    this.x += this.velocity;
    super.newPosX('both');
  }
}
